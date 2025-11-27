-- Add business_hours column to clinics table to store raw営業時間 from CSV
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS business_hours TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN clinics.business_hours IS 'Raw business hours from CSV in format: "10:00〜19:00 (月,火,水,木,金,土,日,祝)"';
