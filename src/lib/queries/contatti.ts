import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type ContattoCompleto =
  Database["public"]["Views"]["vw_contatti_completi"]["Row"];

export type Municipio = Database["public"]["Enums"]["municipio_t"];
export type Fonte = Database["public"]["Enums"]["fonte_contatto_t"];
export type Categoria = Database["public"]["Enums"]["categoria_t"];

export type ContattiFilters = {
  q?: string;            // testo di ricerca (nome, cognome, email, telefono)
  municipio?: Municipio;
  fonte?: Fonte;
  categoria?: Categoria;
  page?: number;
  pageSize?: number;
};

export type ContattiResult = {
  rows: ContattoCompleto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getContatti(
  filters: ContattiFilters = {}
): Promise<ContattiResult> {
  const supabase = await createClient();

  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.max(10, Math.min(200, filters.pageSize ?? 50));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("vw_contatti_completi")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  // Ricerca testuale: cerca in nome, cognome, email, telefono
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

  if (filters.categoria) {
    query = query.contains("categorie_attive", [filters.categoria]);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Errore query contatti:", error);
    return { rows: [], total: 0, page, pageSize, totalPages: 0 };
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    rows: data ?? [],
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getContattoById(
  id: string
): Promise<ContattoCompleto | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vw_contatti_completi")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Errore getContattoById:", error);
    return null;
  }

  return data;
}
