-- ========================================
-- Complete Clinics Table Setup for Supabase
-- ========================================
-- このSQLをSupabase SQL Editorで実行してください
--
-- 手順:
-- 1. https://supabase.com/dashboard にアクセス
-- 2. プロジェクトを選択
-- 3. 左サイドバーから「SQL Editor」をクリック
-- 4. このファイルの内容全体をコピー&ペースト
-- 5. 「Run」をクリックして実行
-- ========================================

-- 1. 既存のポリシーを削除（存在する場合）
DROP POLICY IF EXISTS "Allow public read access to clinics" ON public.clinics;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.clinics;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.clinics;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.clinics;
DROP POLICY IF EXISTS "Allow insert for tsukasa.okimori@gmail.com" ON public.clinics;
DROP POLICY IF EXISTS "Allow update for tsukasa.okimori@gmail.com" ON public.clinics;
DROP POLICY IF EXISTS "Allow delete for tsukasa.okimori@gmail.com" ON public.clinics;

-- 2. トリガーを削除
DROP TRIGGER IF EXISTS set_updated_at ON public.clinics;

-- 3. 関数を削除
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- 4. テーブルを削除（既存のテーブルがある場合）
DROP TABLE IF EXISTS public.clinics CASCADE;

-- 5. clinicsテーブルを作成
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
  -- 追加カラム（AGAクリニックデータ用）
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

-- 6. インデックスを作成（検索パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_clinics_no ON public.clinics(no);
CREATE INDEX IF NOT EXISTS idx_clinics_stations ON public.clinics(stations);
CREATE INDEX IF NOT EXISTS idx_clinics_prefecture ON public.clinics(prefecture);
CREATE INDEX IF NOT EXISTS idx_clinics_municipalities ON public.clinics(municipalities);
CREATE INDEX IF NOT EXISTS idx_clinics_slug ON public.clinics(slug);

-- 7. Row Level Securityを有効化
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;

-- 8. 公開読み取りアクセスを許可
CREATE POLICY "Allow public read access to clinics"
  ON public.clinics FOR SELECT
  USING (true);

-- 9. tsukasa.okimori@gmail.comのみがINSERT/UPDATE/DELETEできるように設定
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

-- 10. updated_atトリガーを作成
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

-- 完了！
-- 次のステップ: インポートスクリプトを実行してデータをインポートしてください
