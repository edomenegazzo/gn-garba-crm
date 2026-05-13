import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { checkRateLimit, maybeCleanup } from "@/lib/rate-limit";

const CAMPAGNA_SLUG = "basta_morti_colombo";

const ALLOWED_ORIGINS = [
  "https://nucleogarbatella.it",
  "https://www.nucleogarbatella.it",
  "https://gn-garbatella.vercel.app",
  "http://localhost:3000",
  "http://localhost:3100",
];

const MUNICIPIO_MAP: Record<string, string> = {
  municipio_viii: "VIII",
  municipio_ix: "IX",
  municipio_x: "X",
  altri_municipi_roma: "altro_roma",
  altri_comuni_lazio: "altro_lazio",
  resto_italia: "fuori_roma",
};

const CampagnaColomboSchema = z.object({
  // Dati anagrafici
  nome: z.string().trim().min(1).max(80),
  cognome: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email(),
  telefono: z
    .string()
    .trim()
    .min(9)
    .max(20)
    .regex(/^[+\d\s\-()]+$/, "telefono non valido"),
  anno_nascita: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear()),
  data_nascita: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
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
  consenso_privacy: z.literal(true, {
    error: "consenso privacy obbligatorio",
  }),
  // Risposte specifiche campagna
  risposte: z.object({
    trattamento_sicurezza: z.enum([
      "non_fatto_nulla",
      "municipio_si_e_mosso",
    ]),
    proposta_valida: z.enum([
      "guard_rail",
      "sensibilizzazione",
      "autovelox",
      "altro",
    ]),
    proposta_libera: z.string().trim().max(1000),
  }),
  // Honeypot
  _hp: z.string().max(0).optional(),
});

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
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

  // CORS
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: "Origine non autorizzata" },
      { status: 403, headers: corsHeaders }
    );
  }

  // Rate limit
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(ip);
  maybeCleanup();
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Troppe richieste, riprova più tardi" },
      { status: 429, headers: corsHeaders }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body non valido" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Honeypot silenzioso
  const bodyObj = body as Record<string, unknown>;
  if (bodyObj && typeof bodyObj._hp === "string" && bodyObj._hp.length > 0) {
    return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
  }

  // Validation
  const parsed = CampagnaColomboSchema.safeParse(body);
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
  const municipioDb = MUNICIPIO_MAP[data.municipio];

  // Costruisci data_nascita
  let dataNascita: string;
  let soloAnno: boolean;
  if (data.data_nascita) {
    dataNascita = data.data_nascita;
    soloAnno = false;
  } else {
    dataNascita = `${data.anno_nascita}-01-01`;
    soloAnno = true;
  }

  const supabase = createServiceRoleClient();
  const now = new Date().toISOString();

  // STEP 1: Upsert contatto
  const contattoPayload = {
    nome: data.nome,
    cognome: data.cognome,
    email: data.email,
    telefono: data.telefono,
    data_nascita: dataNascita,
    data_nascita_solo_anno: soloAnno,
    municipio: municipioDb,
    municipio_override: true,
    fonte: "form_online",
    fonte_dettaglio: "campagna_basta_morti_colombo",
    consenso_privacy: data.consenso_privacy,
    consenso_privacy_at: now,
    consenso_comunicazioni: false,
    consenso_comunicazioni_at: null,
  };

  const { data: contatto, error: upsertError } = await supabase
    .from("contatti")
    .upsert(contattoPayload, { onConflict: "email", ignoreDuplicates: false })
    .select("id")
    .single();

  if (upsertError || !contatto) {
    console.error("Errore upsert contatto campagna Colombo:", upsertError);
    return NextResponse.json(
      { error: "Errore salvataggio dati" },
      { status: 500, headers: corsHeaders }
    );
  }

  // STEP 2: Upsert risposte campagna (un contatto può aggiornare la propria risposta)
  const risposteRecord = {
    contatto_id: contatto.id,
    campagna_slug: CAMPAGNA_SLUG,
    risposte: data.risposte,
  };

  const { error: risposteError } = await supabase
    .from("risposte_campagna")
    .upsert(risposteRecord, { onConflict: "contatto_id,campagna_slug" });

  if (risposteError) {
    console.error("Errore upsert risposte campagna:", risposteError);
    // Caso degradato: contatto salvato ma risposte no. Loghiamo ma ritorniamo successo
    // (l'adesione del contatto al brand è il valore primario)
    return NextResponse.json(
      {
        success: true,
        message: "Contatto registrato (risposte non salvate)",
      },
      { status: 201, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    { success: true, message: "Adesione campagna registrata" },
    { status: 201, headers: corsHeaders }
  );
}
