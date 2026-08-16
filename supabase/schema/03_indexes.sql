-- =============================================================================
-- 03_INDEXES — All CREATE INDEX statements
-- Safe to re-run: uses CREATE INDEX IF NOT EXISTS throughout.
-- Run AFTER 01_create.sql (and 02_alter.sql if applicable).
-- =============================================================================


-- ── ac_listings (universal) ──────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS ac_listings_ref_id_idx    ON public.ac_listings (ref_id);
CREATE INDEX IF NOT EXISTS ac_listings_scope_idx     ON public.ac_listings (company, industry, listing_type);
CREATE INDEX IF NOT EXISTS ac_listings_country_idx   ON public.ac_listings USING GIN (country);
CREATE INDEX IF NOT EXISTS ac_listings_city_idx      ON public.ac_listings USING GIN (city);


-- ── ac_users ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS ac_users_company_idx      ON public.ac_users (company);


-- ── ac_type_catalog ──────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS ac_type_catalog_scope_idx ON public.ac_type_catalog (company, industry);


-- ── ac_destinations ──────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS ac_destinations_scope_idx   ON public.ac_destinations (company, industry);
CREATE INDEX IF NOT EXISTS ac_destinations_country_idx ON public.ac_destinations (country);
CREATE INDEX IF NOT EXISTS ac_destinations_city_idx    ON public.ac_destinations (city);


-- ── ac_heroes ────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_heroes_industry_company ON public.ac_heroes (industry, company);
CREATE INDEX IF NOT EXISTS idx_heroes_page_company     ON public.ac_heroes (page_id, company);


-- ── ac_sections ──────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_sections_industry_company ON public.ac_sections (industry, company);
CREATE INDEX IF NOT EXISTS idx_sections_page_company     ON public.ac_sections (page_id, company, section_number);


-- ── ac_pages ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_pages_industry ON public.ac_pages (industry, sort_order);


-- ── ac_listings_travel ───────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_travel_scope    ON public.ac_listings_travel (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_travel_sort     ON public.ac_listings_travel (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_travel_featured ON public.ac_listings_travel (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_travel_slug     ON public.ac_listings_travel (company, slug);
CREATE INDEX IF NOT EXISTS idx_travel_tags     ON public.ac_listings_travel USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_travel_country  ON public.ac_listings_travel USING GIN (country);
CREATE INDEX IF NOT EXISTS idx_travel_city     ON public.ac_listings_travel USING GIN (city);
CREATE INDEX IF NOT EXISTS idx_travel_promos   ON public.ac_listings_travel (valid_from, valid_until) WHERE listing_type = 'promotions';


-- ── ac_listings_realestate ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_realestate_scope    ON public.ac_listings_realestate (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_realestate_sort     ON public.ac_listings_realestate (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_realestate_featured ON public.ac_listings_realestate (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_realestate_slug     ON public.ac_listings_realestate (company, slug);
CREATE INDEX IF NOT EXISTS idx_realestate_tags     ON public.ac_listings_realestate USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_realestate_country  ON public.ac_listings_realestate USING GIN (country);
CREATE INDEX IF NOT EXISTS idx_realestate_city     ON public.ac_listings_realestate USING GIN (city);


-- ── ac_listings_healthcare ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_healthcare_scope    ON public.ac_listings_healthcare (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_healthcare_sort     ON public.ac_listings_healthcare (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_healthcare_featured ON public.ac_listings_healthcare (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_healthcare_slug     ON public.ac_listings_healthcare (company, slug);
CREATE INDEX IF NOT EXISTS idx_healthcare_tags     ON public.ac_listings_healthcare USING GIN (tags);


-- ── ac_listings_saas ─────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_saas_scope    ON public.ac_listings_saas (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_saas_sort     ON public.ac_listings_saas (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_saas_featured ON public.ac_listings_saas (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_saas_slug     ON public.ac_listings_saas (company, slug);
CREATE INDEX IF NOT EXISTS idx_saas_tags     ON public.ac_listings_saas USING GIN (tags);


-- ── ac_listings_retail ───────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_retail_scope    ON public.ac_listings_retail (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_retail_sort     ON public.ac_listings_retail (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_retail_featured ON public.ac_listings_retail (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_retail_slug     ON public.ac_listings_retail (company, slug);
CREATE INDEX IF NOT EXISTS idx_retail_tags     ON public.ac_listings_retail USING GIN (tags);


-- ── ac_listings_finance ──────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_finance_scope    ON public.ac_listings_finance (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_finance_sort     ON public.ac_listings_finance (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_finance_featured ON public.ac_listings_finance (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_finance_slug     ON public.ac_listings_finance (company, slug);
CREATE INDEX IF NOT EXISTS idx_finance_tags     ON public.ac_listings_finance USING GIN (tags);


-- ── ac_listings_automotive ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_automotive_scope    ON public.ac_listings_automotive (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_automotive_sort     ON public.ac_listings_automotive (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_automotive_featured ON public.ac_listings_automotive (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_automotive_slug     ON public.ac_listings_automotive (company, slug);
CREATE INDEX IF NOT EXISTS idx_automotive_tags     ON public.ac_listings_automotive USING GIN (tags);


-- ── ac_listings_b2c ──────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_b2c_scope    ON public.ac_listings_b2c (company, listing_type, status);
CREATE INDEX IF NOT EXISTS idx_b2c_sort     ON public.ac_listings_b2c (listing_type, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_b2c_featured ON public.ac_listings_b2c (is_featured, sort_order) WHERE status = 'Active';
CREATE INDEX IF NOT EXISTS idx_b2c_slug     ON public.ac_listings_b2c (company, slug);
CREATE INDEX IF NOT EXISTS idx_b2c_tags     ON public.ac_listings_b2c USING GIN (tags);
