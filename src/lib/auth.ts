import { createClient } from "@/lib/supabase/server";

export type UserProfile = {
  id: string;
  email: string;
  ruolo: "banchetto" | "user" | "coordinamento" | "admin" | null;
  nome_visualizzato: string | null;
};

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profilo } = await supabase
    .from("profili_utenti")
    .select("ruolo, nome_visualizzato")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? "",
    ruolo: profilo?.ruolo ?? null,
    nome_visualizzato: profilo?.nome_visualizzato ?? null,
  };
}
