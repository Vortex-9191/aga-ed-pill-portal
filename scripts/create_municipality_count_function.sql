-- Create a PostgreSQL function to count clinics per municipality
-- This runs server-side and avoids client-side data limits

CREATE OR REPLACE FUNCTION get_municipality_counts()
RETURNS TABLE (
  prefecture text,
  municipality text,
  clinic_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.prefecture,
    c.municipalities as municipality,
    COUNT(*) as clinic_count
  FROM clinics c
  WHERE
    c.municipalities IS NOT NULL
    AND c.municipalities != ''
    AND c.prefecture IS NOT NULL
    AND c.prefecture != ''
  GROUP BY c.prefecture, c.municipalities
  ORDER BY c.prefecture, clinic_count DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute permission to anon role
GRANT EXECUTE ON FUNCTION get_municipality_counts() TO anon;
GRANT EXECUTE ON FUNCTION get_municipality_counts() TO authenticated;
