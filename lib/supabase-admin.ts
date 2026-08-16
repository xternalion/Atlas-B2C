import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error(
        "Missing Supabase admin config: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
      );
    }

    client = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return client;
}

// Lazy proxy: the real client (and its env validation) is only created on
// first property access, so importing this module never throws during
// build-time page data collection — only when a route actually uses it.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseAdmin(), prop, receiver);
  },
});
