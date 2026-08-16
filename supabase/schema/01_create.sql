-- =============================================================================
-- 01_CREATE — All CREATE TABLE statements
-- Safe to run on a fresh database: uses CREATE TABLE IF NOT EXISTS throughout.
-- Run this FIRST before any other schema file.
-- =============================================================================


-- ── ac_pages ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ac_pages (
  id          TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company     TEXT        NOT NULL DEFAULT 'default',
  industry    TEXT        NOT NULL DEFAULT 'b2b',
  label       TEXT        NOT NULL DEFAULT '',
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ── ac_heroes ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ac_heroes (
  id           TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company      TEXT        NOT NULL DEFAULT 'default',
  industry     TEXT        NOT NULL DEFAULT 'b2b',
  page_id      TEXT        NOT NULL DEFAULT '',
  -- singular (kept for backwards compat)
  title        TEXT        DEFAULT '',
  subtitle     TEXT        DEFAULT '',
  description  TEXT        DEFAULT '',
  -- arrays (primary going forward)
  titles       TEXT[]      DEFAULT '{}',
  subtitles    TEXT[]      DEFAULT '{}',
  descriptions TEXT[]      DEFAULT '{}',
  images       TEXT[]      DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ── ac_sections ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ac_sections (
  id             TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company        TEXT        NOT NULL DEFAULT 'default',
  industry       TEXT        NOT NULL DEFAULT 'b2b',
  page_id        TEXT        NOT NULL DEFAULT '',
  section_number INTEGER     DEFAULT 1,
  -- singular (kept for backwards compat)
  title          TEXT        DEFAULT '',
  subtitle       TEXT        DEFAULT '',
  description    TEXT        DEFAULT '',
  -- arrays (primary going forward)
  titles         TEXT[]      DEFAULT '{}',
  subtitles      TEXT[]      DEFAULT '{}',
  descriptions   TEXT[]      DEFAULT '{}',
  images         TEXT[]      DEFAULT '{}',
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── ac_settings ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ac_settings (
  id         TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company    TEXT        NOT NULL DEFAULT 'default',
  key        TEXT        NOT NULL DEFAULT '',
  value      TEXT        DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (company, key)
);


-- ── ac_users (CMS team management — NOT linked to auth.users) ────────────────

CREATE TABLE IF NOT EXISTS public.ac_users (
  id         TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company    TEXT        NOT NULL DEFAULT 'default',
  name       TEXT        NOT NULL DEFAULT '',
  email      TEXT        NOT NULL DEFAULT '',
  phone      TEXT        DEFAULT '',
  role       TEXT        NOT NULL DEFAULT 'Viewer', -- Admin | Manager | Editor | Viewer
  status     TEXT        NOT NULL DEFAULT 'Active', -- Active | Inactive | Pending
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ── ac_destinations ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ac_destinations (
  id                TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company           TEXT        NOT NULL DEFAULT 'default',
  industry          TEXT        NOT NULL DEFAULT 'travel',
  client_name       TEXT        DEFAULT '',
  country           TEXT        DEFAULT '',
  city              TEXT        DEFAULT '',
  continent         TEXT[]      DEFAULT '{}',
  category          TEXT[]      DEFAULT '{}',
  title             TEXT        DEFAULT '',
  tagline           TEXT        DEFAULT '',
  description       TEXT        DEFAULT '',
  overview_title    TEXT        DEFAULT '',
  overview_subtitle TEXT        DEFAULT '',
  overview_body     TEXT        DEFAULT '',
  image_urls        TEXT[]      DEFAULT '{}',
  image_collages    TEXT[]      DEFAULT '{}',
  population_title  TEXT DEFAULT '', population_subtitle TEXT DEFAULT '', population_body TEXT DEFAULT '',
  economy_title     TEXT DEFAULT '', economy_subtitle    TEXT DEFAULT '', economy_body    TEXT DEFAULT '',
  currency_title    TEXT DEFAULT '', currency_subtitle   TEXT DEFAULT '', currency_body   TEXT DEFAULT '',
  weather_title     TEXT DEFAULT '', weather_subtitle    TEXT DEFAULT '', weather_body    TEXT DEFAULT '',
  food_title        TEXT DEFAULT '', food_subtitle       TEXT DEFAULT '', food_body       TEXT DEFAULT '',
  place_title       TEXT DEFAULT '', place_subtitle      TEXT DEFAULT '', place_body      TEXT DEFAULT '',
  whattowear_title  TEXT DEFAULT '', whattowear_subtitle TEXT DEFAULT '', whattowear_body TEXT DEFAULT '',
  flights_title     TEXT DEFAULT '', flights_subtitle    TEXT DEFAULT '', flights_body    TEXT DEFAULT '',
  health_title      TEXT DEFAULT '', health_subtitle     TEXT DEFAULT '', health_body     TEXT DEFAULT '',
  status            TEXT        DEFAULT 'Active',
  is_featured       BOOLEAN     DEFAULT FALSE,
  sort_order        INTEGER     DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);


-- ── ac_type_catalog ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ac_type_catalog (
  id          TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company     TEXT        NOT NULL DEFAULT 'default',
  industry    TEXT        NOT NULL DEFAULT '',
  type_key    TEXT        NOT NULL DEFAULT '',
  label       TEXT        DEFAULT '',
  subtitle    TEXT        DEFAULT '',
  tagline     TEXT        DEFAULT '',
  description TEXT        DEFAULT '',
  highlights  TEXT        DEFAULT '',
  image_url   TEXT        DEFAULT '',
  image_urls  TEXT[]      DEFAULT '{}',
  icon        TEXT        DEFAULT '',
  badge_text  TEXT        DEFAULT '',
  cta_label   TEXT        DEFAULT '',
  cta_href    TEXT        DEFAULT '',
  status      TEXT        DEFAULT 'Active',
  is_featured BOOLEAN     DEFAULT FALSE,
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (company, industry, type_key)
);


-- ── ac_contact (AtlasCreate business lead form) ──────────────────────────────

CREATE TABLE IF NOT EXISTS public.ac_contact (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL DEFAULT '',
  business_name TEXT        NOT NULL DEFAULT '',
  email         TEXT        NOT NULL DEFAULT '',
  phone         TEXT        DEFAULT '',
  industry      TEXT        NOT NULL DEFAULT '',
  website       TEXT        DEFAULT '',
  challenge     TEXT        NOT NULL DEFAULT '',
  intent        TEXT        NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);


-- ── ac_listings (universal — kept for data migration source only) ─────────────

CREATE TABLE IF NOT EXISTS public.ac_listings (
  id                TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company           TEXT        NOT NULL DEFAULT 'default',
  industry          TEXT        NOT NULL DEFAULT '',
  listing_type      TEXT        NOT NULL DEFAULT '',
  ref_id            TEXT,
  name              TEXT        NOT NULL DEFAULT '',
  title             TEXT        DEFAULT '',
  subtitle          TEXT        DEFAULT '',
  tagline           TEXT        DEFAULT '',
  slug              TEXT        DEFAULT '',
  description       TEXT        DEFAULT '',
  highlights        TEXT        DEFAULT '',
  itinerary         TEXT        DEFAULT '',
  requirements      TEXT        DEFAULT '',
  other_info        TEXT        DEFAULT '',
  additional_info   TEXT        DEFAULT '',
  cost_inclusions   TEXT        DEFAULT '',
  cost_exclusions   TEXT        DEFAULT '',
  terms_conditions  TEXT        DEFAULT '',
  price             TEXT        DEFAULT '',
  price_unit        TEXT        DEFAULT '',
  full_price        TEXT        DEFAULT '',
  original_price    TEXT        DEFAULT '',
  address           TEXT        DEFAULT '',
  location          TEXT        DEFAULT '',
  city              TEXT[]      DEFAULT '{}',
  state             TEXT        DEFAULT '',
  country           TEXT[]      DEFAULT '{}',
  image_url         TEXT        DEFAULT '',
  image_urls        TEXT[]      DEFAULT '{}',
  image_gallery     TEXT[]      DEFAULT '{}',
  category          TEXT[]      DEFAULT '{}',
  tags              TEXT[]      DEFAULT '{}',
  features          TEXT[]      DEFAULT '{}',
  amenities         TEXT[]      DEFAULT '{}',
  agent             TEXT        DEFAULT '',
  client_name       TEXT        DEFAULT '',
  status            TEXT        DEFAULT 'Active',
  featured          BOOLEAN     DEFAULT FALSE,
  is_recom          BOOLEAN     DEFAULT FALSE,
  is_featured       BOOLEAN     DEFAULT FALSE,
  sort_order        INTEGER     DEFAULT 0,
  cta_label         TEXT        DEFAULT '',
  cta_href          TEXT        DEFAULT '',
  star_category     TEXT        DEFAULT '',
  board_type        TEXT        DEFAULT '',
  check_in_time     TEXT        DEFAULT '',
  check_out_time    TEXT        DEFAULT '',
  total_rooms       INTEGER,
  room_types        TEXT[]      DEFAULT '{}',
  restaurants       TEXT        DEFAULT '',
  duration          TEXT        DEFAULT '',
  group_size_min    INTEGER,
  group_size_max    INTEGER,
  difficulty        TEXT        DEFAULT '',
  tour_type         TEXT        DEFAULT '',
  package_type      TEXT        DEFAULT '',
  departure_point   TEXT        DEFAULT '',
  departure_time    TEXT        DEFAULT '',
  departure_dates   TEXT        DEFAULT '',
  languages         TEXT[]      DEFAULT '{}',
  min_travelers     INTEGER,
  max_travelers     INTEGER,
  validity_period   TEXT        DEFAULT '',
  meals_included    TEXT        DEFAULT '',
  accommodation     TEXT        DEFAULT '',
  visa_type         TEXT        DEFAULT '',
  entry_type        TEXT        DEFAULT '',
  validity          TEXT        DEFAULT '',
  stay_duration     TEXT        DEFAULT '',
  processing_days   INTEGER,
  processing_type   TEXT        DEFAULT '',
  for_nationals     TEXT[]      DEFAULT '{}',
  transfer_type     TEXT        DEFAULT '',
  vehicle_type      TEXT        DEFAULT '',
  capacity          INTEGER,
  pickup_location   TEXT        DEFAULT '',
  dropoff_location  TEXT        DEFAULT '',
  flight_tracking   BOOLEAN     DEFAULT FALSE,
  meet_and_greet    BOOLEAN     DEFAULT FALSE,
  luggage_limit     TEXT        DEFAULT '',
  apartment_category TEXT       DEFAULT '',
  apartment_type    TEXT        DEFAULT '',
  bedrooms          INTEGER,
  bathrooms         INTEGER,
  sqft              INTEGER,
  floor_number      TEXT        DEFAULT '',
  building_name     TEXT        DEFAULT '',
  min_stay_nights   INTEGER,
  max_guests        INTEGER,
  parking           TEXT        DEFAULT '',
  discount_label    TEXT        DEFAULT '',
  valid_from        DATE,
  valid_until       DATE,
  promo_code        TEXT        DEFAULT '',
  applicable_to     TEXT[]      DEFAULT '{}',
  min_booking_value TEXT        DEFAULT '',
  max_redemptions   INTEGER,
  event_types       TEXT[]      DEFAULT '{}',
  setup_types       TEXT[]      DEFAULT '{}',
  av_equipment      TEXT        DEFAULT '',
  catering_options  TEXT        DEFAULT '',
  half_day_rate     TEXT        DEFAULT '',
  full_day_rate     TEXT        DEFAULT '',
  natural_light     BOOLEAN     DEFAULT FALSE,
  breakout_rooms    INTEGER,
  dedicated_host    BOOLEAN     DEFAULT FALSE,
  sku               TEXT        DEFAULT '',
  brand             TEXT        DEFAULT '',
  material          TEXT        DEFAULT '',
  dimensions        TEXT        DEFAULT '',
  weight            TEXT        DEFAULT '',
  stock_qty         INTEGER,
  shipping_info     TEXT        DEFAULT '',
  property_type     TEXT        DEFAULT '',
  beds              INTEGER,
  baths             INTEGER,
  lot_size          TEXT        DEFAULT '',
  floors            TEXT        DEFAULT '',
  actual_floor      TEXT        DEFAULT '',
  year_built        INTEGER,
  is_furnished      TEXT        DEFAULT '',
  lift_access       TEXT        DEFAULT '',
  vehicle_park      TEXT        DEFAULT '',
  approx            BOOLEAN     DEFAULT FALSE,
  price_negotiable  BOOLEAN     DEFAULT FALSE,
  property_documents TEXT[]     DEFAULT '{}',
  tenure            TEXT        DEFAULT '',
  possession        TEXT        DEFAULT '',
  facing            TEXT        DEFAULT '',
  maintenance_fee   TEXT        DEFAULT '',
  nearby            TEXT[]      DEFAULT '{}',
  interest_rate     TEXT        DEFAULT '',
  loan_term         TEXT        DEFAULT '',
  min_investment    TEXT        DEFAULT '',
  max_investment    TEXT        DEFAULT '',
  risk_level        TEXT        DEFAULT '',
  fund_type         TEXT        DEFAULT '',
  insurance_type    TEXT        DEFAULT '',
  coverage_amount   TEXT        DEFAULT '',
  premium           TEXT        DEFAULT '',
  return_rate       TEXT        DEFAULT '',
  lock_in_period    TEXT        DEFAULT '',
  tax_benefit       BOOLEAN     DEFAULT FALSE,
  regulated_by      TEXT        DEFAULT '',
  specialization    TEXT        DEFAULT '',
  qualification     TEXT        DEFAULT '',
  experience_years  INTEGER,
  consultation_fee  TEXT        DEFAULT '',
  availability      TEXT        DEFAULT '',
  hospital_affiliation TEXT     DEFAULT '',
  languages_spoken  TEXT[]      DEFAULT '{}',
  treatment_type    TEXT        DEFAULT '',
  recovery_time     TEXT        DEFAULT '',
  success_rate      TEXT        DEFAULT '',
  clinic_type       TEXT        DEFAULT '',
  telemedicine      BOOLEAN     DEFAULT FALSE,
  insurance_accepted BOOLEAN    DEFAULT FALSE,
  plan_type         TEXT        DEFAULT '',
  billing_cycle     TEXT        DEFAULT '',
  users_limit       TEXT        DEFAULT '',
  storage_limit     TEXT        DEFAULT '',
  api_calls_limit   TEXT        DEFAULT '',
  integration_type  TEXT        DEFAULT '',
  tech_stack        TEXT[]      DEFAULT '{}',
  trial_days        INTEGER,
  uptime_sla        TEXT        DEFAULT '',
  support_level     TEXT        DEFAULT '',
  is_open_source    BOOLEAN     DEFAULT FALSE,
  deployment        TEXT        DEFAULT '',
  make              TEXT        DEFAULT '',
  model             TEXT        DEFAULT '',
  model_year        INTEGER,
  mileage           TEXT        DEFAULT '',
  fuel_type         TEXT        DEFAULT '',
  transmission      TEXT        DEFAULT '',
  exterior_color    TEXT        DEFAULT '',
  interior_color    TEXT        DEFAULT '',
  engine_size       TEXT        DEFAULT '',
  drive_type        TEXT        DEFAULT '',
  condition         TEXT        DEFAULT '',
  vin               TEXT        DEFAULT '',
  wrap_type         TEXT        DEFAULT '',
  wrap_material     TEXT        DEFAULT '',
  warranty          TEXT        DEFAULT '',
  service_history   TEXT        DEFAULT '',
  no_of_owners      INTEGER,
  registration      TEXT        DEFAULT '',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);


-- ── ac_listings_travel (and 7 sibling industry tables) ───────────────────────
-- All 8 tables share the EXACT same column set as ac_listings plus every
-- industry-specific column. LIKE ... INCLUDING DEFAULTS INCLUDING CONSTRAINTS
-- copies all column definitions from the template table.

CREATE TABLE IF NOT EXISTS public.ac_listings_travel (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
CREATE TABLE IF NOT EXISTS public.ac_listings_realestate (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
CREATE TABLE IF NOT EXISTS public.ac_listings_healthcare (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
CREATE TABLE IF NOT EXISTS public.ac_listings_saas (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
CREATE TABLE IF NOT EXISTS public.ac_listings_retail (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
CREATE TABLE IF NOT EXISTS public.ac_listings_finance (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
CREATE TABLE IF NOT EXISTS public.ac_listings_automotive (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
CREATE TABLE IF NOT EXISTS public.ac_listings_b2c (LIKE public.ac_listings INCLUDING DEFAULTS INCLUDING CONSTRAINTS);


-- ── ac_profiles (Supabase Auth RBAC — separate from ac_users) ────────────────

CREATE TABLE IF NOT EXISTS public.ac_profiles (
  id         UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role       TEXT        NOT NULL DEFAULT 'client'
             CHECK (role IN ('super_admin', 'admin', 'staff', 'client')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
