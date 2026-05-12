import { createClient } from "@/lib/supabase/server";
import type { ContattoCompleto, Municipio, Fonte } from "@/lib/queries/contatti";

export type ElettoriFilters = {
  q?: string;
  municipio?: Municipio;
  fonte?: Fonte;
  natoEntro?: string;  // YYYY-MM-DD, se valorizzato filtra solo maggiorenni a quella data
  natoDopo?: string;   // YYYY-MM-DD, se valorizzato filtra solo minorenni a quella data
  page?: number;
  pageSize?: number;
};

export type ElettoriResult = {
  rows: ContattoCompleto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ElettoriStats = {
  totale: number;
  maggiorenni: number;
  minorenni: number;
  municipio_viii: number;
  municipio_ix: number;
  municipio_x: number;
};

export async function getElettori(
  filters: ElettoriFilters = {}
): Promise<ElettoriResult> {
  const supabase = await createClient();
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.max(10, Math.min(200, filters.pageSize ?? 50));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("vw_contatti_completi")
    .select("*", { count: "exact" })
    .contains("categorie_attive", ["elettori"])
    .in("municipio", ["VIII", "IX", "X"])
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters.q && filters.q.trim().length > 0) {
    const q = filters.q.trim();
    query = query.or(
      `nome.ilike.%${q}%,cognome.ilike.%${q}%,email.ilike.%${q}%,telefono.ilike.%${q}%`
    );
  }

  if (filters.municipio) {
    query = query.eq("municipio", filters.municipio);
  }

  if (filters.fonte) {
    query = query.eq("fonte", filters.fonte);
  }

  if (filters.natoEntro) {
    query = query.lte("data_nascita", filters.natoEntro);
  }

  if (filters.natoDopo) {
    query = query.gt("data_nascita", filters.natoDopo);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Errore query elettori:", error);
    return { rows: [], total: 0, page, pageSize, totalPages: 0 };
  }

  const total = count ?? 0;
  return {
    rows: data ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getElettoriStats(dataRiferimento: string): Promise<ElettoriStats> {
  const supabase = await createClient();

  // Calcola la soglia: nato il (data_riferimento - 18 anni) o prima = maggiorenne
  const dataNascitaSoglia = new Date(dataRiferimento);
  dataNascitaSoglia.setFullYear(dataNascitaSoglia.getFullYear() - 18);
  const sogliaStr = dataNascitaSoglia.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("vw_contatti_completi")
    .select("data_nascita, municipio, categorie_attive")
    .contains("categorie_attive", ["elettori"])
    .in("municipio", ["VIII", "IX", "X"]);

  if (error || !data) {
    return {
      totale: 0,
      maggiorenni: 0,
      minorenni: 0,
      municipio_viii: 0,
      municipio_ix: 0,
      municipio_x: 0,
    };
  }

  let maggiorenni = 0;
  let minorenni = 0;
  let viii = 0;
  let ix = 0;
  let x = 0;

  for (const row of data) {
    if (row.data_nascita && row.data_nascita <= sogliaStr) {
      maggiorenni++;
    } else if (row.data_nascita) {
      minorenni++;
    }
    if (row.municipio === "VIII") viii++;
    else if (row.municipio === "IX") ix++;
    else if (row.municipio === "X") x++;
  }

  return {
    totale: data.length,
    maggiorenni,
    minorenni,
    municipio_viii: viii,
    municipio_ix: ix,
    municipio_x: x,
  };
}
