-- ========================================
-- クリニック詳細カラム追加
-- ========================================
-- Supabase SQL Editorで実行してください

-- 営業時間（CSV形式のまま保存）
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS business_hours text;

-- カウンセリング料金
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS counseling_fee text;

-- 診察料
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS consultation_fee text;

-- 駐車場
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS parking text;

-- 支払い方法
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS payment_methods text;

-- スタッフ性別
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS staff_gender text;

-- 女性治療対応
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS female_treatment text;

-- 処方までの時間
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS prescription_time text;

-- おすすめポイント
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS recommended_points text;

-- コメント（詳細説明）
ALTER TABLE public.clinics ADD COLUMN IF NOT EXISTS comment text;

-- インデックス追加（検索用）
CREATE INDEX IF NOT EXISTS idx_clinics_business_hours ON public.clinics(business_hours);
CREATE INDEX IF NOT EXISTS idx_clinics_female_treatment ON public.clinics(female_treatment);

-- 完了メッセージ
SELECT 'カラム追加完了' as status;
