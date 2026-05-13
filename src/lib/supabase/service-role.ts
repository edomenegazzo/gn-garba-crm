import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase con privilegi SERVICE_ROLE.
 * USARE SOLO SU SERVER (route handlers, server actions).
 * MAI esporre nel client. Bypassa RLS — usare con cautela.
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Variabili d'ambiente mancanti: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY richieste"
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
