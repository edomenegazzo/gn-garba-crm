import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { checkRateLimit, maybeCleanup } from "@/lib/rate-limit";

// CORS: domini autorizzati
const ALLOWED_ORIGINS = [
  "https://nucleogarbatella.it",
  "https://www.nucleogarbatella.it",
  "https://gn-garbatella.vercel.app",
  // Per testing locale durante sviluppo del sito
  "http://localhost:3000",
  "http://localhost:3100",
];

// Mappa municipi: dai valori del form pubblico ai valori dell'enum DB
const MUNICIPIO_MAP: Record<string, string> = {
  municipio_viii: "VIII",
  municipio_ix: "IX",
  municipio_x: "X",
  altri_municipi_roma: "altro_roma",
  altri_comuni_lazio: "altro_lazio",
  resto_italia: "fuori_roma",
};

// Schema di validazione del payload
const ContattoSchema = z.object({
  nome: z.string().trim().min(1, "nome richiesto").max(80),
  cognome: z.string().trim().min(1, "cognome richiesto").max(80),
  email: z.string().trim().toLowerCase().email("email non valida"),
  telefono: z
    .string()
    .trim()
    .min(9, "telefono troppo corto")
    .max(20)
    .regex(/^[+\d\s\-()]+$/, "telefono contiene caratteri non validi"),
  anno_nascita: z
    .number()
    .int()
    .min(1900, "anno non valido")
    .max(new Date().getFullYear(), "anno non valido"),
  data_nascita: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "formato data non valido")
    .nullable()
    .optional(),
  municipio: z.enum([
    "municipio_viii",
    "municipio_ix",
    "municipio_x",
    "altri_municipi_roma",
    "altri_comuni_lazio",
    "resto_italia",
  ]),
  indirizzo_via: z.string().trim().max(120).optional().nullable(),
  indirizzo_civico: z.string().trim().max(10).optional().nullable(),
  cap: z
    .string()
    .trim()
    .regex(/^\d{5}$|^$/, "CAP deve essere 5 cifre")
    .optional()
    .nullable(),
  comune: z.string().trim().max(80).optional().nullable(),
  provincia: z.string().trim().max(80).optional().nullable(),
  consenso_privacy: z.literal(true, {
    error: "consenso privacy obbligatorio",
  }),
  consenso_newsletter: z.boolean().default(false),
  fonte: z.enum(["banchetto", "form_online", "sito_web", "evento", "social", "passaparola", "contatto_diretto", "altro"]).default("banchetto"),
  // Honeypot field — i bot tendono a riempirlo, gli umani no (è nascosto via CSS)
  _hp: z.string().max(0, "honeypot triggered").optional(),
});

function getClientIp(request: NextRequest): string {
  // Vercel passa l'IP reale nell'header x-forwarded-for
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function buildCorsHeaders(origin: string | null): Record<string, string> {
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: buildCorsHeaders(origin) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  // 1. CORS check
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: "Origine non autorizzata" },
      { status: 403, headers: corsHeaders }
    );
  }

  // 2. Rate limit per IP
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(ip);
  maybeCleanup();
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: "Troppe richieste, riprova più tardi",
        retryAt: new Date(rateCheck.resetAt).toISOString(),
      },
      { status: 429, headers: corsHeaders }
    );
  }

  // 3. Parse JSON body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body non valido" },
      { status: 400, headers: corsHeaders }
    );
  }

  // 4. Honeypot check (silenzioso: ritorniamo 200 OK fittizio)
  const bodyObj = body as Record<string, unknown>;
  if (bodyObj && typeof bodyObj._hp === "string" && bodyObj._hp.length > 0) {
    // Il bot crede di aver vinto, noi ignoriamo
    return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
  }

  // 5. Validazione con Zod
  const parsed = ContattoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Dati non validi",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: corsHeaders }
    );
  }

  const data = parsed.data;

  // 6. Mappa municipio form → enum DB
  const municipioDb = MUNICIPIO_MAP[data.municipio];
  if (!municipioDb) {
    return NextResponse.json(
      { error: "Municipio non riconosciuto" },
      { status: 400, headers: corsHeaders }
    );
  }

  // 7. Costruisci data_nascita
  let dataNascita: string;
  let soloAnno: boolean;
  if (data.data_nascita) {
    dataNascita = data.data_nascita;
    soloAnno = false;
  } else {
    // Solo anno fornito: salviamo come 1° gennaio + flag
    dataNascita = `${data.anno_nascita}-01-01`;
    soloAnno = true;
  }

  // 8. Upsert su Supabase
  const supabase = createServiceRoleClient();
  const now = new Date().toISOString();
  const payload = {
    nome: data.nome,
    cognome: data.cognome,
    email: data.email,
    telefono: data.telefono,
    data_nascita: dataNascita,
    data_nascita_solo_anno: soloAnno,
    municipio: municipioDb,
    municipio_override: true,
    indirizzo_via: data.indirizzo_via || null,
    indirizzo_civico: data.indirizzo_civico || null,
    cap: data.cap || null,
    citta: data.comune || null,
    provincia: data.provincia || null,
    fonte: data.fonte,
    consenso_privacy: data.consenso_privacy,
    consenso_privacy_at: data.consenso_privacy ? now : null,
    consenso_comunicazioni: data.consenso_newsletter,
    consenso_comunicazioni_at: data.consenso_newsletter ? now : null,
  };

  const { error: upsertError } = await supabase
    .from("contatti")
    .upsert(payload, { onConflict: "email", ignoreDuplicates: false })
    .select()
    .single();

  if (upsertError) {
    console.error("Errore upsert contatto:", upsertError);
    return NextResponse.json(
      { error: "Errore salvataggio dati" },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    { success: true, message: "Contatto registrato" },
    { status: 201, headers: corsHeaders }
  );
}
