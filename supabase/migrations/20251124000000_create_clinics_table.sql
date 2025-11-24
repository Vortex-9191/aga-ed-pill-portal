DROP TABLE IF EXISTS public.clinics CASCADE;

CREATE TABLE public.clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  no integer UNIQUE NOT NULL,
  clinic_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  address text NOT NULL,
  prefecture text NOT NULL,
  municipalities text NOT NULL,
  stations text,
  url text,
  featured_subjects text,
  clinic_spec text,
  corp_tel text,
  non_medical_response text,
  rating numeric,
  review_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  院長名 text,
  access_info text,
  ホームページ text,
  口コミ評価 numeric,
  口コミ件数 integer,
  休診日 text,
  備考 text,
  専門医 text,
  対応可能な疾患 text,
  専門的な治療 text,
  特徴 text,
  月曜 text,
  火曜 text,
  水曜 text,
  木曜 text,
  金曜 text,
  土曜 text,
  日曜 text,
  祝 text
);

CREATE INDEX IF NOT EXISTS idx_clinics_no ON public.clinics(no);
CREATE INDEX IF NOT EXISTS idx_clinics_stations ON public.clinics(stations);
CREATE INDEX IF NOT EXISTS idx_clinics_prefecture ON public.clinics(prefecture);
CREATE INDEX IF NOT EXISTS idx_clinics_municipalities ON public.clinics(municipalities);
CREATE INDEX IF NOT EXISTS idx_clinics_slug ON public.clinics(slug);

ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to clinics"
  ON public.clinics FOR SELECT
  USING (true);

CREATE POLICY "Allow insert for tsukasa.okimori@gmail.com"
  ON public.clinics FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

CREATE POLICY "Allow update for tsukasa.okimori@gmail.com"
  ON public.clinics FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

CREATE POLICY "Allow delete for tsukasa.okimori@gmail.com"
  ON public.clinics FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.clinics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
