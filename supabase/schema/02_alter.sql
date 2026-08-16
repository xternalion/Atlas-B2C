-- =============================================================================
-- 02_ALTER — ADD COLUMN IF NOT EXISTS for tables that may already exist
-- Only needed if you ran an older schema. Safe to re-run (IF NOT EXISTS).
-- Run AFTER 01_create.sql.
--
-- NOTE: The 8 ac_listings_* tables are NOT altered here — 01_create.sql
--       creates them complete via LIKE ac_listings. If you already created
--       those tables with ac-listings-create.sql (the DO-block version),
--       they already have all columns too, so no ALTER is needed for them.
-- =============================================================================


-- ── ac_listings (universal table) ────────────────────────────────────────────
-- Only needed if ac_listings was created before the full column set was defined.

ALTER TABLE public.ac_listings
  ADD COLUMN IF NOT EXISTS ref_id             TEXT,
  ADD COLUMN IF NOT EXISTS name               TEXT    NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS title              TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS subtitle           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS tagline            TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS slug               TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS description        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS highlights         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS itinerary          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS requirements       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS other_info         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS additional_info    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS cost_inclusions    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS cost_exclusions    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS terms_conditions   TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS price              TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS price_unit         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS full_price         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS original_price     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS address            TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS location           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS city               TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS state              TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS country            TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS image_url          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS image_urls         TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS image_gallery      TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS category           TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tags               TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS features           TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS amenities          TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS agent              TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS client_name        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS featured           BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_recom           BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_featured        BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS sort_order         INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cta_label          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS cta_href           TEXT    DEFAULT '',
  -- Hotels
  ADD COLUMN IF NOT EXISTS star_category      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS board_type         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS check_in_time      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS check_out_time     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS total_rooms        INTEGER,
  ADD COLUMN IF NOT EXISTS room_types         TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS restaurants        TEXT    DEFAULT '',
  -- Tours / Packages
  ADD COLUMN IF NOT EXISTS duration           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS group_size_min     INTEGER,
  ADD COLUMN IF NOT EXISTS group_size_max     INTEGER,
  ADD COLUMN IF NOT EXISTS difficulty         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS tour_type          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS package_type       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS departure_point    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS departure_time     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS departure_dates    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS languages          TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS min_travelers      INTEGER,
  ADD COLUMN IF NOT EXISTS max_travelers      INTEGER,
  ADD COLUMN IF NOT EXISTS validity_period    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS meals_included     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS accommodation      TEXT    DEFAULT '',
  -- Visas
  ADD COLUMN IF NOT EXISTS visa_type          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS entry_type         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS validity           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS stay_duration      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS processing_days    INTEGER,
  ADD COLUMN IF NOT EXISTS processing_type    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS for_nationals      TEXT[]  DEFAULT '{}',
  -- Transfers
  ADD COLUMN IF NOT EXISTS transfer_type      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS vehicle_type       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS capacity           INTEGER,
  ADD COLUMN IF NOT EXISTS pickup_location    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS dropoff_location   TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS flight_tracking    BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS meet_and_greet     BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS luggage_limit      TEXT    DEFAULT '',
  -- Apartments
  ADD COLUMN IF NOT EXISTS apartment_category TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS apartment_type     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS bedrooms           INTEGER,
  ADD COLUMN IF NOT EXISTS bathrooms          INTEGER,
  ADD COLUMN IF NOT EXISTS sqft               INTEGER,
  ADD COLUMN IF NOT EXISTS floor_number       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS building_name      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS min_stay_nights    INTEGER,
  ADD COLUMN IF NOT EXISTS max_guests         INTEGER,
  ADD COLUMN IF NOT EXISTS parking            TEXT    DEFAULT '',
  -- Promotions
  ADD COLUMN IF NOT EXISTS discount_label     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS valid_from         DATE,
  ADD COLUMN IF NOT EXISTS valid_until        DATE,
  ADD COLUMN IF NOT EXISTS promo_code         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS applicable_to      TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS min_booking_value  TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS max_redemptions    INTEGER,
  -- Meetings / Corporate / Events
  ADD COLUMN IF NOT EXISTS event_types        TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS setup_types        TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS av_equipment       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS catering_options   TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS half_day_rate      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS full_day_rate      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS natural_light      BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS breakout_rooms     INTEGER,
  ADD COLUMN IF NOT EXISTS dedicated_host     BOOLEAN DEFAULT FALSE,
  -- Shop / Retail
  ADD COLUMN IF NOT EXISTS sku                TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS brand              TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS material           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS dimensions         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS weight             TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS stock_qty          INTEGER,
  ADD COLUMN IF NOT EXISTS shipping_info      TEXT    DEFAULT '',
  -- Real Estate
  ADD COLUMN IF NOT EXISTS property_type      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS beds               INTEGER,
  ADD COLUMN IF NOT EXISTS baths              INTEGER,
  ADD COLUMN IF NOT EXISTS lot_size           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS floors             TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS actual_floor       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS year_built         INTEGER,
  ADD COLUMN IF NOT EXISTS is_furnished       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS lift_access        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS vehicle_park       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS approx             BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS price_negotiable   BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS property_documents TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tenure             TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS possession         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS facing             TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS maintenance_fee    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS nearby             TEXT[]  DEFAULT '{}',
  -- Finance
  ADD COLUMN IF NOT EXISTS interest_rate      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS loan_term          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS min_investment     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS max_investment     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS risk_level         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS fund_type          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS insurance_type     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS coverage_amount    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS premium            TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS return_rate        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS lock_in_period     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS tax_benefit        BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS regulated_by       TEXT    DEFAULT '',
  -- Healthcare
  ADD COLUMN IF NOT EXISTS specialization     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS qualification      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS experience_years   INTEGER,
  ADD COLUMN IF NOT EXISTS consultation_fee   TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS availability       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS hospital_affiliation TEXT  DEFAULT '',
  ADD COLUMN IF NOT EXISTS languages_spoken   TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS treatment_type     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS recovery_time      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS success_rate       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS clinic_type        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS telemedicine       BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS insurance_accepted BOOLEAN DEFAULT FALSE,
  -- SaaS / Tech
  ADD COLUMN IF NOT EXISTS plan_type          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS billing_cycle      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS users_limit        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS storage_limit      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS api_calls_limit    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS integration_type   TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS tech_stack         TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS trial_days         INTEGER,
  ADD COLUMN IF NOT EXISTS uptime_sla         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS support_level      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS is_open_source     BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS deployment         TEXT    DEFAULT '',
  -- Automotive / Wrap
  ADD COLUMN IF NOT EXISTS make               TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS model              TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS model_year         INTEGER,
  ADD COLUMN IF NOT EXISTS mileage            TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS fuel_type          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS transmission       TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS exterior_color     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS interior_color     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS engine_size        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS drive_type         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS condition          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS vin                TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS wrap_type          TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS wrap_material      TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS warranty           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS service_history    TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS no_of_owners       INTEGER,
  ADD COLUMN IF NOT EXISTS registration       TEXT    DEFAULT '';


-- ── ac_pages ─────────────────────────────────────────────────────────────────

ALTER TABLE public.ac_pages
  ADD COLUMN IF NOT EXISTS company    TEXT        NOT NULL DEFAULT 'default',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();


-- ── ac_heroes — add array columns and backfill from singular fields ───────────

ALTER TABLE public.ac_heroes
  ADD COLUMN IF NOT EXISTS titles       TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS subtitles    TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS descriptions TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS images       TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMPTZ DEFAULT NOW();

UPDATE public.ac_heroes
SET
  titles       = CASE WHEN COALESCE(title, '')       <> '' THEN ARRAY[title]       ELSE '{}' END,
  subtitles    = CASE WHEN COALESCE(subtitle, '')    <> '' THEN ARRAY[subtitle]    ELSE '{}' END,
  descriptions = CASE WHEN COALESCE(description, '') <> '' THEN ARRAY[description] ELSE '{}' END
WHERE array_length(titles, 1) IS NULL OR array_length(titles, 1) = 0;


-- ── ac_sections — add array columns and backfill from singular fields ─────────

ALTER TABLE public.ac_sections
  ADD COLUMN IF NOT EXISTS titles       TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS subtitles    TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS descriptions TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS images       TEXT[]      DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMPTZ DEFAULT NOW();

UPDATE public.ac_sections
SET
  titles       = CASE WHEN COALESCE(title, '')       <> '' THEN ARRAY[title]       ELSE '{}' END,
  subtitles    = CASE WHEN COALESCE(subtitle, '')    <> '' THEN ARRAY[subtitle]    ELSE '{}' END,
  descriptions = CASE WHEN COALESCE(description, '') <> '' THEN ARRAY[description] ELSE '{}' END
WHERE array_length(titles, 1) IS NULL OR array_length(titles, 1) = 0;
