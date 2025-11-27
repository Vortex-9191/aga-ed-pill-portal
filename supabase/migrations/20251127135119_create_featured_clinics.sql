-- ========================================
-- おすすめクリニック管理テーブル作成
-- ========================================
-- Supabase SQL Editorで実行してください

-- 1. featured_clinicsテーブルを作成
CREATE TABLE IF NOT EXISTS public.featured_clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  display_order integer NOT NULL DEFAULT 0,  -- 表示順序（小さいほど上に表示）
  section text NOT NULL DEFAULT 'top',       -- 表示セクション: 'top', 'pickup', 'recommended'
  start_date timestamp with time zone,        -- 表示開始日（nullなら即時）
  end_date timestamp with time zone,          -- 表示終了日（nullなら無期限）
  is_active boolean NOT NULL DEFAULT true,    -- 有効/無効フラグ
  label text,                                 -- ラベル: 'おすすめ', 'PR', '人気No.1' など
  custom_description text,                    -- カスタム説明文
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(clinic_id, section)                  -- 同じクリニックは同じセクションに1回のみ
);

-- 2. インデックスを作成
CREATE INDEX IF NOT EXISTS idx_featured_clinics_section ON public.featured_clinics(section);
CREATE INDEX IF NOT EXISTS idx_featured_clinics_order ON public.featured_clinics(display_order);
CREATE INDEX IF NOT EXISTS idx_featured_clinics_active ON public.featured_clinics(is_active);

-- 3. Row Level Securityを有効化
ALTER TABLE public.featured_clinics ENABLE ROW LEVEL SECURITY;

-- 4. 公開読み取りアクセスを許可
CREATE POLICY "Allow public read access to featured_clinics"
  ON public.featured_clinics FOR SELECT
  USING (true);

-- 5. 管理者のみが編集可能
CREATE POLICY "Allow insert for admin"
  ON public.featured_clinics FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

CREATE POLICY "Allow update for admin"
  ON public.featured_clinics FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

CREATE POLICY "Allow delete for admin"
  ON public.featured_clinics FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'tsukasa.okimori@gmail.com');

-- 6. updated_atトリガーを作成
CREATE TRIGGER set_featured_clinics_updated_at
  BEFORE UPDATE ON public.featured_clinics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 7. おすすめクリニックを取得するビューを作成
CREATE OR REPLACE VIEW public.featured_clinics_view AS
SELECT
  fc.id as featured_id,
  fc.display_order,
  fc.section,
  fc.label,
  fc.custom_description,
  fc.is_active,
  c.*
FROM public.featured_clinics fc
INNER JOIN public.clinics c ON fc.clinic_id = c.id
WHERE fc.is_active = true
  AND (fc.start_date IS NULL OR fc.start_date <= now())
  AND (fc.end_date IS NULL OR fc.end_date > now())
ORDER BY fc.display_order ASC;

-- 完了メッセージ
SELECT 'featured_clinicsテーブル作成完了' as status;
