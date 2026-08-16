-- =============================================================================
-- 11_FIX_DUPLICATES_AND_IMAGES — Clean up ac_listings_travel duplicates
--
-- What happened:
-- 1. "transfers" (Rides.tsx) has 12 real rows duplicated once each (24 total) —
--    looks like the same seed ran twice (2026-05-10 and 2026-06-23).
-- 2. "tours" (Tours.tsx) has one duplicate: "Louvre Museum Guided Tour" was
--    submitted twice with two different uploaded images.
-- 3. "airlines" (Airline.tsx): 10_seed_airlines.sql added 12 rows without
--    realizing 7 airlines already existed in the table (added before this
--    session) with real local image references under /assets/flights/ — those
--    files existed in the old out/ static-export folder but were never copied
--    into public/, so they 404'd. That's the actual reason Airline.tsx looked
--    empty; it wasn't a missing-data problem. The files have now been copied
--    to public/assets/flights/. This script:
--      - deletes the 6 rows from 10_seed_airlines.sql that duplicate an
--        existing airline under a slightly different name (e.g. "Emirates"
--        vs "Emirates Airline"), keeping the original (now-working) rows
--      - fills in the 6 non-duplicate rows we added (British Airways, Gulf
--        Air, Malaysia Airlines, Oman Air, Singapore Airlines, Turkish
--        Airlines) with real local images: brand logo/photo where a matching
--        asset existed, otherwise a neutral generic airplane icon/photo
--        (never a fabricated/guessed remote URL)
--
-- Safe to run once. Re-running the DELETEs is a no-op if already applied;
-- re-running the UPDATEs just re-sets the same values.
-- =============================================================================

-- ── 1. Transfers: drop the duplicate batch, keep the original (2026-05-10) ──
DELETE FROM public.ac_listings_travel
WHERE listing_type = 'transfers'
  AND created_at = '2026-06-23T16:25:11.271531+00:00';

-- ── 2. Tours: drop one of the two "Louvre Museum Guided Tour" rows ──────────
DELETE FROM public.ac_listings_travel
WHERE id = 'd425a585-b1d0-4668-bb33-a0c7be7f7c49';

-- ── 3. Airlines: drop the 6 rows that duplicate a pre-existing airline ──────
DELETE FROM public.ac_listings_travel
WHERE listing_type = 'airlines'
  AND created_at = '2026-07-05T03:04:59.262222+00:00'
  AND title IN ('Air France', 'Emirates', 'Etihad Airways', 'Lufthansa', 'Qatar Airways', 'SriLankan Airlines');

-- ── 4. Airlines: give the remaining 6 new rows real local images ───────────
UPDATE public.ac_listings_travel
SET image_url = '/assets/flights/british.png',
    image_urls = ARRAY['/assets/flights/british-airways.jpg']
WHERE listing_type = 'airlines' AND title = 'British Airways';

UPDATE public.ac_listings_travel
SET image_url = '/assets/flights/singapore.png'
WHERE listing_type = 'airlines' AND title = 'Singapore Airlines';

UPDATE public.ac_listings_travel
SET image_url = '/assets/flights/airline.png',
    image_urls = ARRAY['/assets/flights/flight3.jpg']
WHERE listing_type = 'airlines' AND title = 'Gulf Air';

UPDATE public.ac_listings_travel
SET image_url = '/assets/flights/airline.png',
    image_urls = ARRAY['/assets/flights/flight5.jpg']
WHERE listing_type = 'airlines' AND title = 'Malaysia Airlines';

UPDATE public.ac_listings_travel
SET image_url = '/assets/flights/airline.png',
    image_urls = ARRAY['/assets/flights/flight6.jpg']
WHERE listing_type = 'airlines' AND title = 'Oman Air';

UPDATE public.ac_listings_travel
SET image_url = '/assets/flights/airline.png',
    image_urls = ARRAY['/assets/flights/janela-do-aviao.jpg']
WHERE listing_type = 'airlines' AND title = 'Turkish Airlines';
