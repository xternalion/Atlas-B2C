-- =============================================================================
-- 09_FIX_AC_PROFILES — Recreate ac_profiles + ac_get_role()
--
-- WHY THIS EXISTS:
-- Every ac_listings_* SELECT policy (04_functions_rls.sql) calls ac_get_role(),
-- which reads from public.ac_profiles. On the live "Private" Supabase project,
-- ac_profiles does not exist (PGRST205 "Could not find the table"), so
-- ac_get_role() throws on every call — which breaks EVERY read against
-- ac_listings_travel (hotels, tours, rides, airlines alike), not just one
-- listing_type. This file recreates exactly what 01_create.sql + 04_functions_rls.sql
-- already define, so it's safe to run even if some pieces already exist.
--
-- Run this in the Supabase SQL Editor for the PRIVATE project
-- (the one NEXT_PUBLIC_SUPABASE_URL points at), then re-run 04_functions_rls.sql's
-- policy block if needed. Safe to re-run.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.ac_profiles (
  id         UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role       TEXT        NOT NULL DEFAULT 'client'
             CHECK (role IN ('super_admin', 'admin', 'staff', 'client')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ac_profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.ac_get_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.ac_profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.ac_handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.ac_profiles (id, role)
  VALUES (NEW.id, 'client')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.ac_handle_new_user();

DROP POLICY IF EXISTS "ac_profiles: read own"           ON public.ac_profiles;
DROP POLICY IF EXISTS "ac_profiles: admin read all"     ON public.ac_profiles;
DROP POLICY IF EXISTS "ac_profiles: super_admin update" ON public.ac_profiles;

CREATE POLICY "ac_profiles: read own"
  ON public.ac_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "ac_profiles: admin read all"
  ON public.ac_profiles FOR SELECT
  USING (ac_get_role() IN ('admin', 'super_admin'));

CREATE POLICY "ac_profiles: super_admin update"
  ON public.ac_profiles FOR UPDATE
  USING (ac_get_role() = 'super_admin');
