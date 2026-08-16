-- =============================================================================
-- 06_LEGACY_MIGRATE — Old tables → ac_ tables
-- Migrates: hotels · tours · packages · experiences · rides · flights
--           destinations · hero · profiles · users · contact
--
-- company = 'atlas'   ← change this if your company slug is different
-- industry = 'travel' ← already set per table below
--
-- Old tables use SERIAL (integer) PKs → new tables get fresh UUID TEXT PKs.
-- Safe to re-run: ON CONFLICT (id) DO NOTHING is used where applicable.
-- Run AFTER 01_create.sql and 04_functions_rls.sql.
-- =============================================================================


-- ── 1. hotels → ac_listings_travel ──────────────────────────────────────────
-- Old columns: id(serial), title, subtitle, country(text), city(text),
--   neighborhood, address, hotel_type, star_rating(numeric), room_types[],
--   amenities[], highlights, check_in, check_out, tags(text), description,
--   price_per_night(numeric), image_urls(text[]), status, client_name

INSERT INTO public.ac_listings_travel (
  id, company, industry, listing_type,
  name, title, subtitle,
  country, city, address,
  highlights, description,
  price, price_unit,
  star_category, check_in_time, check_out_time,
  room_types, amenities, tags,
  image_urls,
  status, is_featured, sort_order,
  client_name,
  created_at, updated_at
)
SELECT
  gen_random_uuid()::TEXT,
  'atlas',
  'travel',
  'hotels',
  COALESCE(title, ''),
  COALESCE(title, ''),
  COALESCE(subtitle, ''),
  -- country and city: old table stores as TEXT, cast to TEXT[]
  CASE WHEN country IS NOT NULL AND country <> '' THEN ARRAY[country] ELSE '{}'::TEXT[] END,
  CASE WHEN city    IS NOT NULL AND city    <> '' THEN ARRAY[city]    ELSE '{}'::TEXT[] END,
  COALESCE(address, ''),
  COALESCE(highlights, ''),
  COALESCE(description, ''),
  COALESCE(price_per_night::TEXT, ''),
  '/night',
  COALESCE(star_rating::TEXT || ' Star', ''),
  COALESCE(check_in, ''),
  COALESCE(check_out, ''),
  COALESCE(room_types, '{}'),
  COALESCE(amenities, '{}'),
  -- tags stored as comma-separated text → split into array
  CASE
    WHEN tags IS NOT NULL AND tags <> ''
    THEN string_to_array(tags, ', ')
    ELSE '{}'::TEXT[]
  END,
  COALESCE(image_urls, '{}'),
  'Active',
  FALSE,
  0,
  '',
  NOW(), NOW()
FROM public.hotels;


-- ── 2. tours → ac_listings_travel ────────────────────────────────────────────
-- Old columns: id(serial), title, subtitle, country(text[]), city(text[]),
--   category(text[]), is_recom, highlights, description, itinerary, location,
--   other_info, price(text), additional_info, cost_inclusions, cost_exclusions,
--   terms_conditions, image_urls(text), status, client_name, duration,
--   group_size_min, group_size_max, difficulty, tour_type, departure_point,
--   departure_time, languages(text[]), image_urls_arr(text[]),
--   is_featured, sort_order

INSERT INTO public.ac_listings_travel (
  id, company, industry, listing_type,
  name, title, subtitle,
  country, city, category,
  is_recom, highlights, description,
  price,
  status, is_featured, sort_order,
  client_name,
  duration,
  languages, image_urls,
  created_at, updated_at
)
SELECT
  gen_random_uuid()::TEXT,
  'atlas',
  'travel',
  'tours',
  COALESCE(title, ''),
  COALESCE(title, ''),
  COALESCE(subtitle, ''),
  CASE WHEN country  IS NOT NULL AND country  <> '' THEN ARRAY[country]  ELSE '{}'::TEXT[] END,
  CASE WHEN city     IS NOT NULL AND city     <> '' THEN ARRAY[city]     ELSE '{}'::TEXT[] END,
  CASE WHEN category IS NOT NULL AND category <> '' THEN ARRAY[category] ELSE '{}'::TEXT[] END,
  FALSE,
  COALESCE(highlights, ''),
  COALESCE(description, ''),
  COALESCE(price::TEXT, ''),
  'Active',
  FALSE,
  0,
  '',
  '',
  '{}',
  COALESCE(image_urls, '{}'),
  NOW(), NOW()
FROM public.tours;


-- ── 3. packages → ac_listings_travel ─────────────────────────────────────────
-- Old columns: same core as tours +
--   duration, min_travelers, max_travelers, package_type, validity_period,
--   departure_dates, accommodation, meals_included

INSERT INTO public.ac_listings_travel (
  id, company, industry, listing_type,
  name, title, subtitle,
  country, city, category,
  is_recom, highlights, description,
  price, status, is_featured, sort_order,
  client_name, duration,
  languages, image_urls,
  created_at, updated_at
)
SELECT
  gen_random_uuid()::TEXT,
  'atlas',
  'travel',
  'packages',
  COALESCE(title, ''),
  COALESCE(title, ''),
  COALESCE(subtitle, ''),
  CASE WHEN country  IS NOT NULL AND country  <> '' THEN ARRAY[country]  ELSE '{}'::TEXT[] END,
  CASE WHEN city     IS NOT NULL AND city     <> '' THEN ARRAY[city]     ELSE '{}'::TEXT[] END,
  CASE WHEN category IS NOT NULL AND category <> '' THEN ARRAY[category] ELSE '{}'::TEXT[] END,
  FALSE,
  COALESCE(highlights, ''),
  COALESCE(description, ''),
  COALESCE(price::TEXT, ''),
  'Active',
  FALSE,
  0,
  '',
  '',
  '{}',
  COALESCE(image_urls, '{}'),
  NOW(), NOW()
FROM public.packages;


-- ── 4. experiences → ac_listings_travel ──────────────────────────────────────
-- Old columns: id(serial), title, subtitle, location, continent(text),
--   country(text), category(text), vibe(text), tags(text), description,
--   highlights, about_host, what_to_expect, price(numeric), duration,
--   group_size(text), languages(text), min_age, meeting_point, booking_notice,
--   cancellation_policy, rating, review_count, image_urls(text[])

INSERT INTO public.ac_listings_travel (
  id, company, industry, listing_type,
  name, title, subtitle,
  location, country, category, tags,
  description, highlights,
  other_info, additional_info,
  price, duration,
  group_size_max, languages,
  image_urls,
  status,
  created_at, updated_at
)
SELECT
  gen_random_uuid()::TEXT,
  'atlas',
  'travel',
  'experiences',
  COALESCE(title, ''),
  COALESCE(title, ''),
  COALESCE(subtitle, ''),
  COALESCE(location, ''),
  CASE WHEN country IS NOT NULL AND country <> '' THEN ARRAY[country] ELSE '{}'::TEXT[] END,
  -- category and vibe stored as TEXT → array
  CASE WHEN category IS NOT NULL AND category <> '' THEN ARRAY[category] ELSE '{}'::TEXT[] END,
  CASE WHEN tags IS NOT NULL AND tags <> '' THEN string_to_array(tags, ', ') ELSE '{}'::TEXT[] END,
  COALESCE(description, ''),
  COALESCE(highlights, ''),
  COALESCE(about_host, ''),
  COALESCE(array_to_string(what_to_expect, E'\n'), ''),
  COALESCE(price::TEXT, ''),
  COALESCE(duration, ''),
  CASE WHEN group_size ~ '^[0-9]+$' THEN group_size::INTEGER ELSE NULL END,
  CASE WHEN languages IS NOT NULL AND languages <> '' THEN string_to_array(languages, ', ') ELSE '{}'::TEXT[] END,
  COALESCE(image_urls, '{}'),
  'Active',
  NOW(), NOW()
FROM public.experiences;


-- ── 5. rides → ac_listings_travel (transfers) ────────────────────────────────
-- Old columns: id, title, subtitle, ride_type, tags(text), pickup, dropoff,
--   distance, vehicle_type, capacity(int), luggage, price(numeric), price_label,
--   duration, driver_languages(text), inclusions(text[]), advance_booking,
--   cancellation_policy, rating, review_count, description, image_urls(text[])

INSERT INTO public.ac_listings_travel (
  id, company, industry, listing_type,
  name, title, subtitle,
  tags,
  pickup_location, dropoff_location,
  vehicle_type, capacity, luggage_limit,
  price, price_unit, duration,
  languages,
  features,         -- inclusions → features
  description,
  other_info,       -- advance_booking + cancellation → other_info
  image_urls,
  transfer_type,
  status,
  created_at, updated_at
)
SELECT
  gen_random_uuid()::TEXT,
  'atlas',
  'travel',
  'transfers',
  COALESCE(title, ''),
  COALESCE(title, ''),
  COALESCE(subtitle, ''),
  CASE WHEN tags IS NOT NULL AND tags <> '' THEN string_to_array(tags, ', ') ELSE '{}'::TEXT[] END,
  COALESCE(pickup, ''),
  COALESCE(dropoff, ''),
  COALESCE(vehicle_type, ''),
  capacity,
  COALESCE(luggage, ''),
  COALESCE(price::TEXT, ''),
  COALESCE(price_label, ''),
  COALESCE(duration, ''),
  CASE WHEN driver_languages IS NOT NULL AND driver_languages <> '' THEN string_to_array(driver_languages, ', ') ELSE '{}'::TEXT[] END,
  COALESCE(inclusions, '{}'),
  COALESCE(description, ''),
  TRIM(
    COALESCE('Booking: ' || advance_booking, '') || E'\n' ||
    COALESCE('Cancellation: ' || cancellation_policy, '')
  ),
  COALESCE(image_urls, '{}'),
  COALESCE(ride_type, ''),         -- ride_type → transfer_type
  'Active',
  NOW(), NOW()
FROM public.rides;


-- ── 6. flights → ac_listings_travel ──────────────────────────────────────────
-- Assuming common column names. Adjust if your flights table differs.
-- If flights doesn't exist yet, this block is a no-op (the SELECT returns 0 rows).

DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'flights') THEN
    INSERT INTO public.ac_listings_travel (
      id, company, industry, listing_type,
      name, title,
      status,
      created_at, updated_at
    )
    SELECT
      gen_random_uuid()::TEXT,
      'atlas',
      'travel',
      'flights',
      COALESCE(title, ''),
      COALESCE(title, ''),
      'Active',
      NOW(), NOW()
    FROM public.flights;
  END IF;
END;
$$;


-- ── 7. destinations → ac_destinations ────────────────────────────────────────
-- Old columns: id(serial), title, subtitle, continent(text), country(text),
--   city(text), vibe(text), description, why_visit, highlights, tags(text),
--   best_time, duration, price_range, climate, languages, currency, visa_info,
--   image_urls(text[])

INSERT INTO public.ac_destinations (
  id, company, industry,
  country, city, continent,
  title, tagline, description,
  overview_title, overview_body,
  image_urls,
  status, is_featured, sort_order,
  created_at, updated_at
)
SELECT
  gen_random_uuid()::TEXT,
  'atlas',
  'travel',
  COALESCE(country, ''),
  COALESCE(city, ''),
  CASE WHEN continent IS NOT NULL AND continent <> '' THEN ARRAY[continent] ELSE '{}'::TEXT[] END,
  COALESCE(title, ''),
  COALESCE(subtitle, COALESCE(vibe, '')),
  COALESCE(description, ''),
  'Why Visit',
  COALESCE(why_visit, COALESCE(highlights, '')),
  COALESCE(image_urls, '{}'),
  'Active',
  FALSE,
  0,
  NOW(), NOW()
FROM public.destinations;


-- ── 8. hero → ac_heroes ──────────────────────────────────────────────────────
-- SKIPPED: column names in the old `hero` table are unknown.
-- Run this manually once you know the column names:
--
-- INSERT INTO public.ac_heroes (id, company, industry, page_id, title, subtitle, created_at, updated_at)
-- SELECT gen_random_uuid()::TEXT, 'atlas', 'travel', 'home',
--        COALESCE(<your_title_col>, ''), COALESCE(<your_subtitle_col>, ''), NOW(), NOW()
-- FROM public.hero;


-- ── 9. profiles → ac_profiles ────────────────────────────────────────────────
-- Old profiles table typically has: id(uuid), role(text), created_at.
-- Only rows where id exists in auth.users will succeed (FK constraint).
-- Adjust role mapping if your old roles differ from the new set.

DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
    INSERT INTO public.ac_profiles (id, role, created_at, updated_at)
    SELECT
      p.id,
      CASE
        WHEN LOWER(COALESCE(p.role, '')) IN ('super_admin', 'superadmin', 'super admin') THEN 'super_admin'
        WHEN LOWER(COALESCE(p.role, '')) IN ('admin', 'administrator')                  THEN 'admin'
        WHEN LOWER(COALESCE(p.role, '')) IN ('staff', 'manager', 'editor')              THEN 'staff'
        ELSE 'client'
      END,
      COALESCE(p.created_at, NOW()),
      NOW()
    FROM public.profiles p
    WHERE EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.id)
    ON CONFLICT (id) DO UPDATE
      SET role       = EXCLUDED.role,
          updated_at = NOW();
  END IF;
END;
$$;


-- ── 10. users → ac_users ─────────────────────────────────────────────────────
-- Old users table typically has: id, name/full_name, email, role, company,
--   status, created_at. Adjust column names if yours differ.

DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
    INSERT INTO public.ac_users (
      id, company, name, email, role, status, created_at, updated_at
    )
    SELECT
      gen_random_uuid()::TEXT,
      'atlas',
      COALESCE(email, ''),
      COALESCE(email, ''),
      CASE
        WHEN LOWER(COALESCE(role, '')) IN ('admin', 'administrator', 'super_admin') THEN 'Admin'
        WHEN LOWER(COALESCE(role, '')) IN ('manager')                               THEN 'Manager'
        WHEN LOWER(COALESCE(role, '')) IN ('editor', 'staff')                       THEN 'Editor'
        ELSE 'Viewer'
      END,
      'Active',
      COALESCE(created_at, NOW()),
      NOW()
    FROM public.users;
  END IF;
END;
$$;


-- ── 11. contact → ac_contact ─────────────────────────────────────────────────
-- Old columns: id, full_name, email, phone, best_reason, inquiry_subject,
--   inquiry_message, organization_id (+ industry, source_page, status added later)
-- Mapping: full_name → name, organization_id → business_name,
--   best_reason → intent, inquiry_message → challenge

INSERT INTO public.ac_contact (
  id, name, business_name, email, phone,
  industry, challenge, intent,
  created_at
)
SELECT
  gen_random_uuid(),
  COALESCE(full_name, ''),
  '',
  COALESCE(email, ''),
  COALESCE(phone, ''),
  'travel',
  COALESCE(inquiry_message, ''),
  '',
  COALESCE(created_at, NOW())
FROM public.contact;


-- =============================================================================
-- Verification — uncomment and run to confirm row counts after migration
-- =============================================================================

-- SELECT 'hotels'       AS source, COUNT(*) FROM public.hotels       UNION ALL
-- SELECT 'tours'        AS source, COUNT(*) FROM public.tours        UNION ALL
-- SELECT 'packages'     AS source, COUNT(*) FROM public.packages     UNION ALL
-- SELECT 'experiences'  AS source, COUNT(*) FROM public.experiences  UNION ALL
-- SELECT 'rides'        AS source, COUNT(*) FROM public.rides        UNION ALL
-- SELECT 'destinations' AS source, COUNT(*) FROM public.destinations UNION ALL
-- SELECT 'contact'      AS source, COUNT(*) FROM public.contact;

-- SELECT listing_type, COUNT(*) FROM public.ac_listings_travel GROUP BY listing_type ORDER BY listing_type;
-- SELECT company, industry, COUNT(*) FROM public.ac_destinations GROUP BY company, industry;
