-- Add new columns to clinics table with English names

-- Basic info
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS director_name TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS access_info TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS homepage_url TEXT;

-- Review info
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS rating NUMERIC;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS review_count INTEGER;

-- Operation info
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS closed_days TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS notes TEXT;

-- Specialist info
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS specialist_doctors TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS treatable_diseases TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS specialized_treatments TEXT;

-- Features
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS features TEXT;

-- Business hours (by weekday)
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_monday TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_tuesday TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_wednesday TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_thursday TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_friday TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_saturday TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_sunday TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS hours_holiday TEXT;

-- Add slug column if not exists (for URL routing)
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_clinics_slug ON clinics(slug);
