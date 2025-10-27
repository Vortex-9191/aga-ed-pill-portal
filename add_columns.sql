-- Add new columns to clinics table for scraped data

-- 院長名
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 院長名 TEXT;

-- アクセス（stationsとは別の詳細情報）
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS access_info TEXT;

-- ホームページ（urlとは別の可能性）
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS ホームページ TEXT;

-- 口コミ情報
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 口コミ評価 NUMERIC;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 口コミ件数 INTEGER;

-- 運営情報
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 休診日 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 備考 TEXT;

-- 専門情報
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 専門医 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 対応可能な疾患 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 専門的な治療 TEXT;

-- 特徴
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 特徴 TEXT;

-- 診療時間（曜日別）
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 月曜 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 火曜 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 水曜 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 木曜 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 金曜 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 土曜 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 日曜 TEXT;
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS 祝 TEXT;

-- Add slug column if not exists (for URL routing)
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_clinics_slug ON clinics(slug);
