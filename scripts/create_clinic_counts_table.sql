-- Create clinic_counts table for pre-aggregated counts
CREATE TABLE IF NOT EXISTS clinic_counts (
  id SERIAL PRIMARY KEY,
  count_type TEXT NOT NULL, -- 'prefecture', 'municipality', 'station'
  prefecture TEXT,
  municipality TEXT,
  station TEXT,
  clinic_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(count_type, prefecture, municipality, station)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_clinic_counts_type_prefecture ON clinic_counts(count_type, prefecture);
CREATE INDEX IF NOT EXISTS idx_clinic_counts_type_prefecture_municipality ON clinic_counts(count_type, prefecture, municipality);
CREATE INDEX IF NOT EXISTS idx_clinic_counts_type_station ON clinic_counts(count_type, station);

-- Create function to refresh all clinic counts
CREATE OR REPLACE FUNCTION refresh_all_clinic_counts()
RETURNS VOID AS $$
BEGIN
  -- Delete old counts
  DELETE FROM clinic_counts;

  -- Insert prefecture counts
  INSERT INTO clinic_counts (count_type, prefecture, clinic_count)
  SELECT
    'prefecture'::TEXT,
    prefecture,
    COUNT(*)::INTEGER
  FROM clinics
  WHERE prefecture IS NOT NULL AND prefecture != ''
  GROUP BY prefecture
  ON CONFLICT (count_type, prefecture, municipality, station)
  DO UPDATE SET
    clinic_count = EXCLUDED.clinic_count,
    updated_at = NOW();

  -- Insert municipality counts
  INSERT INTO clinic_counts (count_type, prefecture, municipality, clinic_count)
  SELECT
    'municipality'::TEXT,
    prefecture,
    municipalities,
    COUNT(*)::INTEGER
  FROM clinics
  WHERE
    municipalities IS NOT NULL
    AND municipalities != ''
    AND prefecture IS NOT NULL
    AND prefecture != ''
  GROUP BY prefecture, municipalities
  ON CONFLICT (count_type, prefecture, municipality, station)
  DO UPDATE SET
    clinic_count = EXCLUDED.clinic_count,
    updated_at = NOW();

  -- Insert station counts with main prefecture
  INSERT INTO clinic_counts (count_type, prefecture, station, clinic_count)
  WITH station_split AS (
    SELECT
      c.prefecture,
      TRIM(unnest(string_to_array(c.stations, ','))) as station_name
    FROM clinics c
    WHERE c.stations IS NOT NULL AND c.stations != '' AND c.stations != '-'
      AND c.prefecture IS NOT NULL
  ),
  station_counts AS (
    SELECT
      station_name,
      prefecture,
      COUNT(*) as count_per_prefecture
    FROM station_split
    WHERE station_name != '' AND station_name != '-'
    GROUP BY station_name, prefecture
  ),
  main_prefecture AS (
    SELECT DISTINCT ON (station_name)
      station_name,
      prefecture,
      count_per_prefecture
    FROM station_counts
    ORDER BY station_name, count_per_prefecture DESC
  ),
  total_counts AS (
    SELECT
      station_name,
      COUNT(*) as total_count
    FROM station_split
    WHERE station_name != '' AND station_name != '-'
    GROUP BY station_name
  )
  SELECT
    'station'::TEXT,
    mp.prefecture,
    mp.station_name,
    tc.total_count::INTEGER
  FROM main_prefecture mp
  JOIN total_counts tc ON mp.station_name = tc.station_name
  ON CONFLICT (count_type, prefecture, municipality, station)
  DO UPDATE SET
    clinic_count = EXCLUDED.clinic_count,
    updated_at = NOW();

END;
$$ LANGUAGE plpgsql;

-- Create trigger function to refresh counts on clinic changes
CREATE OR REPLACE FUNCTION trigger_refresh_clinic_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Perform the count refresh asynchronously to avoid slowing down the main operation
  PERFORM refresh_all_clinic_counts();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on clinics table
DROP TRIGGER IF EXISTS refresh_counts_trigger ON clinics;
CREATE TRIGGER refresh_counts_trigger
AFTER INSERT OR UPDATE OR DELETE ON clinics
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_refresh_clinic_counts();

-- Initial population of counts
SELECT refresh_all_clinic_counts();

-- Grant permissions
GRANT SELECT ON clinic_counts TO anon;
GRANT SELECT ON clinic_counts TO authenticated;

-- Display summary
SELECT
  count_type,
  COUNT(*) as total_entries,
  SUM(clinic_count) as total_clinics
FROM clinic_counts
GROUP BY count_type
ORDER BY count_type;
