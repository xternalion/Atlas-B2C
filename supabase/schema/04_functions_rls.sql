-- =============================================================================
-- 04_FUNCTIONS_RLS — Auth functions, triggers, and Row Level Security
-- Run AFTER 01_create.sql (ac_profiles must exist before ac_get_role).
-- Policies use DROP ... IF EXISTS then CREATE so this file is safe to re-run.
--
-- SUPERSEDES: migrations/001_security_rls.sql (same content, cleaner source)
-- =============================================================================


-- ── ac_get_role() ────────────────────────────────────────────────────────────
-- Resolves the current user's RBAC role from ac_profiles.
-- SECURITY DEFINER = runs as function owner, bypasses RLS on ac_profiles itself.

CREATE OR REPLACE FUNCTION public.ac_get_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.ac_profiles WHERE id = auth.uid();
$$;


-- ── ac_handle_new_user() ─────────────────────────────────────────────────────
-- Auto-inserts a profile row (role = client) whenever a new auth user signs up.

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


-- =============================================================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE public.ac_profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_contact      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_settings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_pages        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_heroes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_sections     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_type_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ac_users        ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'ac_listings_travel','ac_listings_realestate','ac_listings_healthcare',
    'ac_listings_saas','ac_listings_retail','ac_listings_finance',
    'ac_listings_automotive','ac_listings_b2c'
  ]
  LOOP
    EXECUTE FORMAT('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
  END LOOP;
END;
$$;


-- =============================================================================
-- POLICIES
-- Each block: DROP IF EXISTS then CREATE (idempotent re-run).
-- =============================================================================


-- ── ac_profiles ──────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_profiles: read own"        ON public.ac_profiles;
DROP POLICY IF EXISTS "ac_profiles: admin read all"  ON public.ac_profiles;
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


-- ── ac_contact ───────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_contact: public insert" ON public.ac_contact;
DROP POLICY IF EXISTS "ac_contact: admin read"    ON public.ac_contact;
DROP POLICY IF EXISTS "ac_contact: admin delete"  ON public.ac_contact;

CREATE POLICY "ac_contact: public insert"
  ON public.ac_contact FOR INSERT
  WITH CHECK (true);

CREATE POLICY "ac_contact: admin read"
  ON public.ac_contact FOR SELECT
  USING (ac_get_role() IN ('admin', 'super_admin'));

CREATE POLICY "ac_contact: admin delete"
  ON public.ac_contact FOR DELETE
  USING (ac_get_role() IN ('admin', 'super_admin'));


-- ── ac_settings ──────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_settings: public read"  ON public.ac_settings;
DROP POLICY IF EXISTS "ac_settings: admin write"  ON public.ac_settings;

CREATE POLICY "ac_settings: public read"
  ON public.ac_settings FOR SELECT USING (true);

CREATE POLICY "ac_settings: admin write"
  ON public.ac_settings FOR ALL
  USING (ac_get_role() IN ('admin', 'super_admin'));


-- ── ac_pages ─────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_pages: public read"  ON public.ac_pages;
DROP POLICY IF EXISTS "ac_pages: admin write"  ON public.ac_pages;

CREATE POLICY "ac_pages: public read"
  ON public.ac_pages FOR SELECT USING (true);

CREATE POLICY "ac_pages: admin write"
  ON public.ac_pages FOR ALL
  USING (ac_get_role() IN ('admin', 'super_admin'));


-- ── ac_heroes ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_heroes: public read"  ON public.ac_heroes;
DROP POLICY IF EXISTS "ac_heroes: admin write"  ON public.ac_heroes;

CREATE POLICY "ac_heroes: public read"
  ON public.ac_heroes FOR SELECT USING (true);

CREATE POLICY "ac_heroes: admin write"
  ON public.ac_heroes FOR ALL
  USING (ac_get_role() IN ('admin', 'super_admin'));


-- ── ac_sections ──────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_sections: public read"  ON public.ac_sections;
DROP POLICY IF EXISTS "ac_sections: admin write"  ON public.ac_sections;

CREATE POLICY "ac_sections: public read"
  ON public.ac_sections FOR SELECT USING (true);

CREATE POLICY "ac_sections: admin write"
  ON public.ac_sections FOR ALL
  USING (ac_get_role() IN ('admin', 'super_admin'));


-- ── ac_destinations ──────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_destinations: public read active"  ON public.ac_destinations;
DROP POLICY IF EXISTS "ac_destinations: admin write"         ON public.ac_destinations;

CREATE POLICY "ac_destinations: public read active"
  ON public.ac_destinations FOR SELECT
  USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));

CREATE POLICY "ac_destinations: admin write"
  ON public.ac_destinations FOR ALL
  USING (ac_get_role() IN ('admin', 'super_admin'));


-- ── ac_type_catalog ──────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "ac_type_catalog: public read active"  ON public.ac_type_catalog;
DROP POLICY IF EXISTS "ac_type_catalog: admin write"         ON public.ac_type_catalog;

CREATE POLICY "ac_type_catalog: public read active"
  ON public.ac_type_catalog FOR SELECT
  USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));

CREATE POLICY "ac_type_catalog: admin write"
  ON public.ac_type_catalog FOR ALL
  USING (ac_get_role() IN ('admin', 'super_admin'));


-- ── ac_users (CMS team — internal only) ──────────────────────────────────────

DROP POLICY IF EXISTS "ac_users: admin full access"  ON public.ac_users;
DROP POLICY IF EXISTS "ac_users: staff read"         ON public.ac_users;

CREATE POLICY "ac_users: admin full access"
  ON public.ac_users FOR ALL
  USING (ac_get_role() IN ('admin', 'super_admin'));

CREATE POLICY "ac_users: staff read"
  ON public.ac_users FOR SELECT
  USING (ac_get_role() = 'staff');


-- ── ac_listings_* (8 industry tables) ────────────────────────────────────────
-- Public sees Active listings only. Admins see and write all statuses.

DROP POLICY IF EXISTS "travel: read active"        ON public.ac_listings_travel;
DROP POLICY IF EXISTS "travel: admin write"         ON public.ac_listings_travel;
DROP POLICY IF EXISTS "realestate: read active"     ON public.ac_listings_realestate;
DROP POLICY IF EXISTS "realestate: admin write"     ON public.ac_listings_realestate;
DROP POLICY IF EXISTS "healthcare: read active"     ON public.ac_listings_healthcare;
DROP POLICY IF EXISTS "healthcare: admin write"     ON public.ac_listings_healthcare;
DROP POLICY IF EXISTS "saas: read active"           ON public.ac_listings_saas;
DROP POLICY IF EXISTS "saas: admin write"           ON public.ac_listings_saas;
DROP POLICY IF EXISTS "retail: read active"         ON public.ac_listings_retail;
DROP POLICY IF EXISTS "retail: admin write"         ON public.ac_listings_retail;
DROP POLICY IF EXISTS "finance: read active"        ON public.ac_listings_finance;
DROP POLICY IF EXISTS "finance: admin write"        ON public.ac_listings_finance;
DROP POLICY IF EXISTS "automotive: read active"     ON public.ac_listings_automotive;
DROP POLICY IF EXISTS "automotive: admin write"     ON public.ac_listings_automotive;
DROP POLICY IF EXISTS "b2c: read active"            ON public.ac_listings_b2c;
DROP POLICY IF EXISTS "b2c: admin write"            ON public.ac_listings_b2c;

CREATE POLICY "travel: read active"    ON public.ac_listings_travel    FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "travel: admin write"    ON public.ac_listings_travel    FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "realestate: read active" ON public.ac_listings_realestate FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "realestate: admin write" ON public.ac_listings_realestate FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "healthcare: read active" ON public.ac_listings_healthcare FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "healthcare: admin write" ON public.ac_listings_healthcare FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "saas: read active"      ON public.ac_listings_saas      FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "saas: admin write"      ON public.ac_listings_saas      FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "retail: read active"    ON public.ac_listings_retail    FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "retail: admin write"    ON public.ac_listings_retail    FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "finance: read active"   ON public.ac_listings_finance   FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "finance: admin write"   ON public.ac_listings_finance   FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "automotive: read active" ON public.ac_listings_automotive FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "automotive: admin write" ON public.ac_listings_automotive FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "b2c: read active"       ON public.ac_listings_b2c       FOR SELECT USING (status = 'Active' OR ac_get_role() IN ('admin', 'super_admin'));
CREATE POLICY "b2c: admin write"       ON public.ac_listings_b2c       FOR ALL    USING (ac_get_role() IN ('admin', 'super_admin'));


-- =============================================================================
-- FINAL STEP — elevate your own account to super_admin
-- Get your UUID: Supabase Dashboard → Authentication → Users
-- Then run in a new SQL query (do NOT include this in a batch run):
--
-- UPDATE public.ac_profiles
-- SET role = 'super_admin'
-- WHERE id = 'YOUR-USER-UUID-HERE';
-- =============================================================================
