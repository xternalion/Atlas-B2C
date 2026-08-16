-- =============================================================================
-- 07_BILLING — Stripe subscription billing (guest checkout, no login required)
-- Safe to run on a fresh database: uses CREATE TABLE IF NOT EXISTS.
-- Run AFTER 04_functions_rls.sql (needs ac_get_role()).
-- =============================================================================


-- ── ac_subscriptions ─────────────────────────────────────────────────────────
-- One row per Stripe subscription. user_id is nullable because checkout is a
-- guest flow today; it can be backfilled if/when a customer login system ships.

CREATE TABLE IF NOT EXISTS public.ac_subscriptions (
  id                     TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id                UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  email                  TEXT        NOT NULL,
  name                   TEXT,
  tier                   TEXT        NOT NULL CHECK (tier IN ('free','basic','pro','enterprise')),
  status                 TEXT        NOT NULL DEFAULT 'incomplete',
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT        UNIQUE,
  stripe_price_id        TEXT,
  current_period_end     TIMESTAMPTZ,
  cancel_at_period_end   BOOLEAN     DEFAULT false,
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ac_subscriptions_email_idx ON public.ac_subscriptions(email);
CREATE INDEX IF NOT EXISTS ac_subscriptions_stripe_customer_idx ON public.ac_subscriptions(stripe_customer_id);

ALTER TABLE public.ac_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ac_subscriptions: read own"       ON public.ac_subscriptions;
DROP POLICY IF EXISTS "ac_subscriptions: admin read all" ON public.ac_subscriptions;

-- Harmless no-op today (no customer login exists yet) — future-proofs for when it does.
CREATE POLICY "ac_subscriptions: read own"
  ON public.ac_subscriptions FOR SELECT
  USING (auth.uid() = user_id OR email = (auth.jwt() ->> 'email'));

CREATE POLICY "ac_subscriptions: admin read all"
  ON public.ac_subscriptions FOR SELECT
  USING (ac_get_role() IN ('admin', 'super_admin'));

-- No public INSERT/UPDATE policy: all writes go through supabaseAdmin
-- (service role key bypasses RLS), matching every other ac_* table.
