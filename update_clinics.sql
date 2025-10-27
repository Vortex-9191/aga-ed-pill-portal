-- Step 1: Add new columns to clinics table (if not already done)
-- Run add_columns_en.sql first

-- Step 2: Create temporary table for CSV import
CREATE TABLE IF NOT EXISTS clinics_import (
  no INTEGER PRIMARY KEY,
  clinic_name TEXT,
  slug TEXT,
  address TEXT,
  prefecture TEXT,
  municipalities TEXT,
  stations TEXT,
  url TEXT,
  featured_subjects TEXT,
  clinic_spec TEXT,
  corp_tel TEXT,
  non_medical_response TEXT,
  director_name TEXT,
  access_info TEXT,
  homepage_url TEXT,
  rating NUMERIC,
  review_count INTEGER,
  closed_days TEXT,
  notes TEXT,
  specialist_doctors TEXT,
  treatable_diseases TEXT,
  specialized_treatments TEXT,
  features TEXT,
  hours_monday TEXT,
  hours_tuesday TEXT,
  hours_wednesday TEXT,
  hours_thursday TEXT,
  hours_friday TEXT,
  hours_saturday TEXT,
  hours_sunday TEXT,
  hours_holiday TEXT
);

-- Step 3: After importing CSV via Supabase UI to clinics_import table, run this:
-- (DO NOT RUN THIS UNTIL CSV IS IMPORTED!)

-- Update existing records
UPDATE clinics
SET
  clinic_name = ci.clinic_name,
  slug = ci.slug,
  address = ci.address,
  prefecture = ci.prefecture,
  municipalities = ci.municipalities,
  stations = ci.stations,
  url = ci.url,
  featured_subjects = ci.featured_subjects,
  clinic_spec = ci.clinic_spec,
  corp_tel = ci.corp_tel,
  non_medical_response = ci.non_medical_response,
  rating = ci.rating,
  review_count = ci.review_count,
  director_name = ci.director_name,
  access_info = ci.access_info,
  homepage_url = ci.homepage_url,
  closed_days = ci.closed_days,
  notes = ci.notes,
  specialist_doctors = ci.specialist_doctors,
  treatable_diseases = ci.treatable_diseases,
  specialized_treatments = ci.specialized_treatments,
  features = ci.features,
  hours_monday = ci.hours_monday,
  hours_tuesday = ci.hours_tuesday,
  hours_wednesday = ci.hours_wednesday,
  hours_thursday = ci.hours_thursday,
  hours_friday = ci.hours_friday,
  hours_saturday = ci.hours_saturday,
  hours_sunday = ci.hours_sunday,
  hours_holiday = ci.hours_holiday,
  updated_at = now()
FROM clinics_import ci
WHERE clinics.no = ci.no;

-- Step 4: Verify the update
SELECT COUNT(*) as updated_count
FROM clinics
WHERE rating IS NOT NULL OR director_name IS NOT NULL;

-- Step 5: Clean up (optional - run after verification)
-- DROP TABLE clinics_import;
