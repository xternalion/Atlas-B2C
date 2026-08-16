-- =============================================================================
-- 08_TRAVEL_BOOKINGS — AI-generated itineraries & booking confirmation
-- Safe to run on a fresh database: uses CREATE TABLE IF NOT EXISTS.
-- Run AFTER 04_functions_rls.sql (needs ac_get_role()).
-- =============================================================================


-- ── ac_itineraries ───────────────────────────────────────────────────────────
-- One row per AI-generated itinerary. user_id is nullable — guest flow today,
-- same pattern as ac_subscriptions (see 07_billing.sql).

CREATE TABLE IF NOT EXISTS public.ac_itineraries (
  id                TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id           UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  email             TEXT        NOT NULL,
  name              TEXT,
  prompt            TEXT        NOT NULL,
  itinerary_json    JSONB       NOT NULL DEFAULT '{}',
  pdf_url           TEXT,
  status            TEXT        NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','confirmed','cancelled')),
  flights_included  BOOLEAN     DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ac_itineraries_email_idx ON public.ac_itineraries(email);

ALTER TABLE public.ac_itineraries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ac_itineraries: read own"       ON public.ac_itineraries;
DROP POLICY IF EXISTS "ac_itineraries: admin read all" ON public.ac_itineraries;

-- Harmless no-op today (no customer login exists yet) — future-proofs for when it does.
CREATE POLICY "ac_itineraries: read own"
  ON public.ac_itineraries FOR SELECT
  USING (auth.uid() = user_id OR email = (auth.jwt() ->> 'email'));

CREATE POLICY "ac_itineraries: admin read all"
  ON public.ac_itineraries FOR SELECT
  USING (ac_get_role() IN ('admin', 'super_admin'));

-- No public INSERT/UPDATE policy: all writes go through supabaseAdmin
-- (service role key bypasses RLS), matching every other ac_* table.
