-- Rename Japanese column names to English for better code consistency
-- This migration renames all Japanese column names to their English equivalents

ALTER TABLE public.clinics
  RENAME COLUMN 院長名 TO director_name;

ALTER TABLE public.clinics
  RENAME COLUMN 専門医 TO specialist_doctors;

ALTER TABLE public.clinics
  RENAME COLUMN 対応可能な疾患 TO treatable_diseases;

ALTER TABLE public.clinics
  RENAME COLUMN 専門的な治療 TO specialized_treatments;

ALTER TABLE public.clinics
  RENAME COLUMN 特徴 TO features;

ALTER TABLE public.clinics
  RENAME COLUMN 月曜 TO hours_monday;

ALTER TABLE public.clinics
  RENAME COLUMN 火曜 TO hours_tuesday;

ALTER TABLE public.clinics
  RENAME COLUMN 水曜 TO hours_wednesday;

ALTER TABLE public.clinics
  RENAME COLUMN 木曜 TO hours_thursday;

ALTER TABLE public.clinics
  RENAME COLUMN 金曜 TO hours_friday;

ALTER TABLE public.clinics
  RENAME COLUMN 土曜 TO hours_saturday;

ALTER TABLE public.clinics
  RENAME COLUMN 日曜 TO hours_sunday;

ALTER TABLE public.clinics
  RENAME COLUMN 祝 TO hours_holiday;

ALTER TABLE public.clinics
  RENAME COLUMN ホームページ TO homepage_url;

ALTER TABLE public.clinics
  RENAME COLUMN 休診日 TO closed_days;

ALTER TABLE public.clinics
  RENAME COLUMN 備考 TO notes;

ALTER TABLE public.clinics
  RENAME COLUMN 口コミ評価 TO user_rating;

ALTER TABLE public.clinics
  RENAME COLUMN 口コミ件数 TO user_review_count;

-- Add comment to track migration
COMMENT ON TABLE public.clinics IS 'Clinic information with English column names (migrated on 2025-11-24)';
