-- =============================================================================
-- 05_DATA_MIGRATE — Move rows from ac_listings (universal) → ac_listings_*
-- Only run this if you have existing data in ac_listings that needs moving.
-- Safe to re-run: ON CONFLICT (id) DO NOTHING skips already-migrated rows.
-- Run AFTER 01_create.sql and 02_alter.sql.
-- =============================================================================


-- ── Travel ───────────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_travel (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, itinerary, requirements, other_info, additional_info,
  cost_inclusions, cost_exclusions, terms_conditions,
  price, price_unit, full_price, original_price,
  address, location, city, state, country,
  image_url, image_urls, image_gallery,
  category, tags, features, amenities,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  star_category, board_type, check_in_time, check_out_time,
  total_rooms, room_types, restaurants,
  duration, group_size_min, group_size_max, difficulty, tour_type, package_type,
  departure_point, departure_time, departure_dates, languages,
  min_travelers, max_travelers, validity_period, meals_included, accommodation,
  visa_type, entry_type, validity, stay_duration, processing_days, processing_type, for_nationals,
  transfer_type, vehicle_type, capacity, pickup_location, dropoff_location,
  flight_tracking, meet_and_greet, luggage_limit,
  apartment_category, apartment_type, bedrooms, bathrooms, sqft,
  floor_number, building_name, min_stay_nights, max_guests, parking,
  discount_label, valid_from, valid_until, promo_code, applicable_to,
  min_booking_value, max_redemptions,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, itinerary, requirements, other_info, additional_info,
  cost_inclusions, cost_exclusions, terms_conditions,
  price, price_unit, full_price, original_price,
  address, location,
  CASE WHEN city            IS NULL OR CAST(city            AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city            AS TEXT[]) END,
  state,
  CASE WHEN country         IS NULL OR CAST(country         AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country         AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls      IS NULL OR CAST(image_urls      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls      AS TEXT[]) END,
  CASE WHEN image_gallery   IS NULL OR CAST(image_gallery   AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery   AS TEXT[]) END,
  CASE WHEN category        IS NULL OR CAST(category        AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category        AS TEXT[]) END,
  CASE WHEN tags            IS NULL OR CAST(tags            AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags            AS TEXT[]) END,
  CASE WHEN features        IS NULL OR CAST(features        AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features        AS TEXT[]) END,
  CASE WHEN amenities       IS NULL OR CAST(amenities       AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(amenities       AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  star_category, board_type, check_in_time, check_out_time,
  CASE WHEN total_rooms     IS NULL THEN NULL ELSE total_rooms::INTEGER END,
  CASE WHEN room_types      IS NULL OR CAST(room_types      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(room_types      AS TEXT[]) END,
  restaurants, duration,
  CASE WHEN group_size_min  IS NULL THEN NULL ELSE group_size_min::INTEGER END,
  CASE WHEN group_size_max  IS NULL THEN NULL ELSE group_size_max::INTEGER END,
  difficulty, tour_type, package_type, departure_point, departure_time, departure_dates, languages,
  CASE WHEN min_travelers   IS NULL THEN NULL ELSE min_travelers::INTEGER END,
  CASE WHEN max_travelers   IS NULL THEN NULL ELSE max_travelers::INTEGER END,
  validity_period, meals_included, accommodation,
  visa_type, entry_type, validity, stay_duration, processing_days, processing_type,
  CASE WHEN for_nationals   IS NULL OR CAST(for_nationals   AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(for_nationals   AS TEXT[]) END,
  transfer_type, vehicle_type, capacity, pickup_location, dropoff_location,
  flight_tracking, meet_and_greet, luggage_limit,
  apartment_category, apartment_type,
  CASE WHEN bedrooms        IS NULL THEN NULL ELSE bedrooms::INTEGER END,
  CASE WHEN bathrooms       IS NULL THEN NULL ELSE bathrooms::INTEGER END,
  CASE WHEN sqft            IS NULL THEN NULL ELSE sqft::INTEGER END,
  floor_number, building_name,
  CASE WHEN min_stay_nights IS NULL THEN NULL ELSE min_stay_nights::INTEGER END,
  CASE WHEN max_guests      IS NULL THEN NULL ELSE max_guests::INTEGER END,
  parking, discount_label, valid_from, valid_until, promo_code, applicable_to,
  min_booking_value,
  CASE WHEN max_redemptions IS NULL THEN NULL ELSE max_redemptions::INTEGER END,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'travel'
ON CONFLICT (id) DO NOTHING;


-- ── Real Estate ───────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_realestate (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, other_info, additional_info, terms_conditions,
  price, price_unit, full_price, original_price,
  address, location, city, state, country,
  image_url, image_urls, image_gallery,
  category, tags, features, amenities,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  property_type, beds, baths, lot_size, floors, actual_floor, year_built,
  is_furnished, lift_access, vehicle_park, sqft, approx, price_negotiable,
  property_documents, tenure, possession, facing, maintenance_fee, nearby,
  apartment_category, apartment_type, bedrooms, bathrooms, floor_number, building_name, parking,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, other_info, additional_info, terms_conditions,
  price, price_unit, full_price, original_price,
  address, location,
  CASE WHEN city               IS NULL OR CAST(city               AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city               AS TEXT[]) END,
  state,
  CASE WHEN country            IS NULL OR CAST(country            AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country            AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls         IS NULL OR CAST(image_urls         AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls         AS TEXT[]) END,
  CASE WHEN image_gallery      IS NULL OR CAST(image_gallery      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery      AS TEXT[]) END,
  CASE WHEN category           IS NULL OR CAST(category           AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category           AS TEXT[]) END,
  CASE WHEN tags               IS NULL OR CAST(tags               AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags               AS TEXT[]) END,
  CASE WHEN features           IS NULL OR CAST(features           AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features           AS TEXT[]) END,
  CASE WHEN amenities          IS NULL OR CAST(amenities          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(amenities          AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  property_type,
  CASE WHEN beds               IS NULL THEN NULL ELSE beds::INTEGER END,
  CASE WHEN baths              IS NULL THEN NULL ELSE baths::INTEGER END,
  lot_size, floors, actual_floor,
  CASE WHEN year_built         IS NULL THEN NULL ELSE year_built::INTEGER END,
  is_furnished, lift_access, vehicle_park,
  CASE WHEN sqft               IS NULL THEN NULL ELSE sqft::INTEGER END,
  approx, price_negotiable,
  CASE WHEN property_documents IS NULL OR CAST(property_documents AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(property_documents AS TEXT[]) END,
  tenure, possession, facing, maintenance_fee,
  CASE WHEN nearby             IS NULL OR CAST(nearby             AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(nearby             AS TEXT[]) END,
  apartment_category, apartment_type,
  CASE WHEN bedrooms           IS NULL THEN NULL ELSE bedrooms::INTEGER END,
  CASE WHEN bathrooms          IS NULL THEN NULL ELSE bathrooms::INTEGER END,
  floor_number, building_name, parking,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'realestate'
ON CONFLICT (id) DO NOTHING;


-- ── Healthcare ────────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_healthcare (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location, city, state, country,
  image_url, image_urls, image_gallery,
  category, tags, features, amenities,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  specialization, qualification, experience_years, consultation_fee,
  availability, hospital_affiliation, languages_spoken,
  treatment_type, recovery_time, success_rate, clinic_type,
  telemedicine, insurance_accepted, duration,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location,
  CASE WHEN city          IS NULL OR CAST(city          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city          AS TEXT[]) END,
  state,
  CASE WHEN country       IS NULL OR CAST(country       AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country       AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls    IS NULL OR CAST(image_urls    AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls    AS TEXT[]) END,
  CASE WHEN image_gallery IS NULL OR CAST(image_gallery AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery AS TEXT[]) END,
  CASE WHEN category      IS NULL OR CAST(category      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category      AS TEXT[]) END,
  CASE WHEN tags          IS NULL OR CAST(tags          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags          AS TEXT[]) END,
  CASE WHEN features      IS NULL OR CAST(features      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features      AS TEXT[]) END,
  CASE WHEN amenities     IS NULL OR CAST(amenities     AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(amenities     AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  specialization, qualification, experience_years, consultation_fee,
  availability, hospital_affiliation, languages_spoken,
  treatment_type, recovery_time, success_rate, clinic_type,
  telemedicine, insurance_accepted, duration,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'healthcare'
ON CONFLICT (id) DO NOTHING;


-- ── SaaS ─────────────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_saas (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, other_info, additional_info,
  price, price_unit, full_price, original_price,
  city, country, image_url, image_urls, image_gallery,
  category, tags, features,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  plan_type, billing_cycle, users_limit, storage_limit, api_calls_limit,
  integration_type, tech_stack, trial_days, uptime_sla, support_level,
  is_open_source, deployment,
  discount_label, valid_from, valid_until, promo_code, min_booking_value, max_redemptions,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, other_info, additional_info,
  price, price_unit, full_price, original_price,
  CASE WHEN city          IS NULL OR CAST(city          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city          AS TEXT[]) END,
  CASE WHEN country       IS NULL OR CAST(country       AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country       AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls    IS NULL OR CAST(image_urls    AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls    AS TEXT[]) END,
  CASE WHEN image_gallery IS NULL OR CAST(image_gallery AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery AS TEXT[]) END,
  CASE WHEN category      IS NULL OR CAST(category      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category      AS TEXT[]) END,
  CASE WHEN tags          IS NULL OR CAST(tags          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags          AS TEXT[]) END,
  CASE WHEN features      IS NULL OR CAST(features      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features      AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  plan_type, billing_cycle, users_limit, storage_limit, api_calls_limit,
  integration_type,
  CASE WHEN tech_stack    IS NULL OR CAST(tech_stack    AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tech_stack    AS TEXT[]) END,
  trial_days, uptime_sla, support_level, is_open_source, deployment,
  discount_label, valid_from, valid_until, promo_code, min_booking_value,
  CASE WHEN max_redemptions IS NULL THEN NULL ELSE max_redemptions::INTEGER END,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'saas'
ON CONFLICT (id) DO NOTHING;


-- ── Retail ───────────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_retail (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location, city, country,
  image_url, image_urls, image_gallery,
  category, tags, features, amenities,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  sku, brand, material, dimensions, weight, stock_qty, shipping_info,
  discount_label, valid_from, valid_until, promo_code, applicable_to,
  min_booking_value, max_redemptions,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location,
  CASE WHEN city          IS NULL OR CAST(city          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city          AS TEXT[]) END,
  CASE WHEN country       IS NULL OR CAST(country       AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country       AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls    IS NULL OR CAST(image_urls    AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls    AS TEXT[]) END,
  CASE WHEN image_gallery IS NULL OR CAST(image_gallery AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery AS TEXT[]) END,
  CASE WHEN category      IS NULL OR CAST(category      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category      AS TEXT[]) END,
  CASE WHEN tags          IS NULL OR CAST(tags          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags          AS TEXT[]) END,
  CASE WHEN features      IS NULL OR CAST(features      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features      AS TEXT[]) END,
  CASE WHEN amenities     IS NULL OR CAST(amenities     AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(amenities     AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  sku, brand, material, dimensions, weight,
  CASE WHEN stock_qty       IS NULL THEN NULL ELSE stock_qty::INTEGER END,
  shipping_info, discount_label, valid_from, valid_until, promo_code, applicable_to,
  min_booking_value,
  CASE WHEN max_redemptions IS NULL THEN NULL ELSE max_redemptions::INTEGER END,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'retail'
ON CONFLICT (id) DO NOTHING;


-- ── Finance ───────────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_finance (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info, terms_conditions,
  price, price_unit, full_price, original_price,
  city, country, image_url, image_urls, image_gallery,
  category, tags, features,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  interest_rate, loan_term, min_investment, max_investment, risk_level, fund_type,
  insurance_type, coverage_amount, premium, return_rate, lock_in_period,
  tax_benefit, regulated_by, duration,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info, terms_conditions,
  price, price_unit, full_price, original_price,
  CASE WHEN city          IS NULL OR CAST(city          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city          AS TEXT[]) END,
  CASE WHEN country       IS NULL OR CAST(country       AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country       AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls    IS NULL OR CAST(image_urls    AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls    AS TEXT[]) END,
  CASE WHEN image_gallery IS NULL OR CAST(image_gallery AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery AS TEXT[]) END,
  CASE WHEN category      IS NULL OR CAST(category      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category      AS TEXT[]) END,
  CASE WHEN tags          IS NULL OR CAST(tags          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags          AS TEXT[]) END,
  CASE WHEN features      IS NULL OR CAST(features      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features      AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  interest_rate, loan_term, min_investment, max_investment, risk_level, fund_type,
  insurance_type, coverage_amount, premium, return_rate, lock_in_period,
  tax_benefit, regulated_by, duration,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'finance'
ON CONFLICT (id) DO NOTHING;


-- ── Automotive ───────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_automotive (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location, city, country,
  image_url, image_urls, image_gallery,
  category, tags, features, amenities,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  make, model, model_year, mileage, fuel_type, transmission,
  exterior_color, interior_color, engine_size, drive_type, condition, vin,
  no_of_owners, registration, service_history,
  wrap_type, wrap_material, warranty,
  sku, brand, material, dimensions, weight, stock_qty,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location,
  CASE WHEN city            IS NULL OR CAST(city            AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city            AS TEXT[]) END,
  CASE WHEN country         IS NULL OR CAST(country         AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country         AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls      IS NULL OR CAST(image_urls      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls      AS TEXT[]) END,
  CASE WHEN image_gallery   IS NULL OR CAST(image_gallery   AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery   AS TEXT[]) END,
  CASE WHEN category        IS NULL OR CAST(category        AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category        AS TEXT[]) END,
  CASE WHEN tags            IS NULL OR CAST(tags            AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags            AS TEXT[]) END,
  CASE WHEN features        IS NULL OR CAST(features        AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features        AS TEXT[]) END,
  CASE WHEN amenities       IS NULL OR CAST(amenities       AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(amenities       AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  make, model, model_year, mileage, fuel_type, transmission,
  exterior_color, interior_color, engine_size, drive_type, condition, vin,
  no_of_owners, registration, service_history,
  wrap_type, wrap_material, warranty,
  sku, brand, material, dimensions, weight,
  CASE WHEN stock_qty IS NULL THEN NULL ELSE stock_qty::INTEGER END,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'automotive'
ON CONFLICT (id) DO NOTHING;


-- ── B2C ──────────────────────────────────────────────────────────────────────

INSERT INTO public.ac_listings_b2c (
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location, city, country,
  image_url, image_urls, image_gallery,
  category, tags, features, amenities,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  sku, brand, material, dimensions, weight, stock_qty, shipping_info, duration,
  discount_label, valid_from, valid_until, promo_code, applicable_to,
  min_booking_value, max_redemptions,
  created_at, updated_at
)
SELECT
  id, company, industry, listing_type, ref_id,
  name, title, subtitle, tagline, slug, description,
  highlights, requirements, other_info, additional_info,
  price, price_unit, full_price, original_price,
  address, location,
  CASE WHEN city          IS NULL OR CAST(city          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(city          AS TEXT[]) END,
  CASE WHEN country       IS NULL OR CAST(country       AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(country       AS TEXT[]) END,
  image_url,
  CASE WHEN image_urls    IS NULL OR CAST(image_urls    AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_urls    AS TEXT[]) END,
  CASE WHEN image_gallery IS NULL OR CAST(image_gallery AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(image_gallery AS TEXT[]) END,
  CASE WHEN category      IS NULL OR CAST(category      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(category      AS TEXT[]) END,
  CASE WHEN tags          IS NULL OR CAST(tags          AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(tags          AS TEXT[]) END,
  CASE WHEN features      IS NULL OR CAST(features      AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(features      AS TEXT[]) END,
  CASE WHEN amenities     IS NULL OR CAST(amenities     AS TEXT) = '' THEN '{}'::TEXT[] ELSE CAST(amenities     AS TEXT[]) END,
  agent, client_name,
  status, featured, is_recom, is_featured, sort_order, cta_label, cta_href,
  sku, brand, material, dimensions, weight,
  CASE WHEN stock_qty         IS NULL THEN NULL ELSE stock_qty::INTEGER END,
  shipping_info, duration,
  discount_label, valid_from, valid_until, promo_code, applicable_to,
  min_booking_value,
  CASE WHEN max_redemptions   IS NULL THEN NULL ELSE max_redemptions::INTEGER END,
  created_at, updated_at
FROM public.ac_listings
WHERE industry = 'b2c'
ON CONFLICT (id) DO NOTHING;


-- ── Verification (uncomment to run after migration) ───────────────────────────

-- SELECT industry, COUNT(*) AS rows FROM (
--   SELECT 'travel'     AS industry FROM public.ac_listings_travel     UNION ALL
--   SELECT 'realestate' AS industry FROM public.ac_listings_realestate  UNION ALL
--   SELECT 'healthcare' AS industry FROM public.ac_listings_healthcare  UNION ALL
--   SELECT 'saas'       AS industry FROM public.ac_listings_saas        UNION ALL
--   SELECT 'retail'     AS industry FROM public.ac_listings_retail      UNION ALL
--   SELECT 'finance'    AS industry FROM public.ac_listings_finance     UNION ALL
--   SELECT 'automotive' AS industry FROM public.ac_listings_automotive  UNION ALL
--   SELECT 'b2c'        AS industry FROM public.ac_listings_b2c
-- ) t GROUP BY industry ORDER BY industry;
