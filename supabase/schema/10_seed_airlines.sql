-- =============================================================================
-- 10_SEED_AIRLINES — Dummy/sample rows for ac_listings_travel (listing_type='airlines')
--
-- Run this AFTER 09_fix_ac_profiles.sql (otherwise RLS will still block reads).
-- Powers components/Travel/Booking/Airline.tsx, which reads:
--   id, title, description, location, image_url, image_urls
-- for listing_type = 'airlines'.
--
-- image_url / image_urls are left empty on purpose. The airhex logo CDN used
-- in app/travel/flights/page.tsx (airlines_{code}_50_50_s.png) now returns 401 —
-- it moved behind an API key on their free tier, so that existing flight-results
-- page is currently showing broken logos too and needs a real fix separately.
-- Clearbit's logo API (the other common free option) was discontinued in 2024.
-- Rather than bake more dead links into your DB, add real logo/banner URLs
-- yourself the same way you did for ac_heroes (upload to R2, paste the
-- pub-*.r2.dev URL here) once you've picked a logo source.
-- Safe to re-run: there's no unique constraint on title, so re-running this
-- will duplicate rows — DELETE existing ones first if re-seeding.
-- =============================================================================

INSERT INTO public.ac_listings_travel
  (company, industry, listing_type, name, title, description, location, image_url, image_urls, status)
VALUES
  ('atlas', 'travel', 'airlines', 'SriLankan Airlines', 'SriLankan Airlines',
    'Sri Lanka''s national carrier, connecting Colombo to Asia, the Middle East, and Europe with warm island hospitality.',
    'Colombo, Sri Lanka', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Emirates', 'Emirates',
    'A global leader in luxury air travel, linking Dubai to over 140 cities with award-winning inflight service.',
    'Dubai, United Arab Emirates', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Qatar Airways', 'Qatar Airways',
    'Multi-award-winning airline flying from Doha''s Hamad International to six continents.',
    'Doha, Qatar', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Etihad Airways', 'Etihad Airways',
    'The UAE''s national airline, offering refined comfort from Abu Dhabi to destinations worldwide.',
    'Abu Dhabi, United Arab Emirates', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Singapore Airlines', 'Singapore Airlines',
    'Consistently rated among the world''s best airlines, renowned for service excellence out of Changi.',
    'Singapore', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Lufthansa', 'Lufthansa',
    'Germany''s flagship carrier, offering extensive European and long-haul connections from Frankfurt and Munich.',
    'Frankfurt, Germany', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Air France', 'Air France',
    'France''s national airline, bringing Parisian elegance to a global network from Charles de Gaulle.',
    'Paris, France', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'British Airways', 'British Airways',
    'The UK''s flag carrier, connecting London Heathrow to the world with a legacy of British service.',
    'London, United Kingdom', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Malaysia Airlines', 'Malaysia Airlines',
    'Malaysia''s national carrier, offering warm hospitality on routes across Asia, Australia, and beyond.',
    'Kuala Lumpur, Malaysia', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Turkish Airlines', 'Turkish Airlines',
    'One of the world''s most-connected airlines, bridging Europe, Asia, Africa, and the Americas via Istanbul.',
    'Istanbul, Turkey', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Oman Air', 'Oman Air',
    'The national airline of the Sultanate of Oman, offering a gateway between the Gulf and the world.',
    'Muscat, Oman', '', '{}', 'Active'),

  ('atlas', 'travel', 'airlines', 'Gulf Air', 'Gulf Air',
    'The national carrier of the Kingdom of Bahrain, serving the Gulf region and beyond since 1950.',
    'Manama, Bahrain', '', '{}', 'Active');
