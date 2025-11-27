-- クリニックデータ更新用SQL（CSVから手動で主要データを更新）
-- Supabase SQL Editorまたは supabase db execute で実行

-- 既存のnon_medical_responseから駐車場情報を抽出してparkingカラムに設定
UPDATE public.clinics
SET parking = CASE
  WHEN non_medical_response LIKE '%駐車場あり%' THEN '駐車場あり'
  WHEN non_medical_response LIKE '%駐車場%' THEN '駐車場あり'
  ELSE NULL
END
WHERE non_medical_response IS NOT NULL;

-- 既存のnon_medical_responseから支払い方法を抽出してpayment_methodsカラムに設定
UPDATE public.clinics
SET payment_methods = CASE
  WHEN non_medical_response LIKE '%クレジット可%' THEN 'クレジット可'
  WHEN non_medical_response LIKE '%クレジット%' THEN 'クレジット可'
  ELSE NULL
END
WHERE non_medical_response IS NOT NULL;

-- 既存のfeaturesから女性対応を抽出
UPDATE public.clinics
SET female_treatment = CASE
  WHEN features LIKE '%女性対応%' THEN '対応可能'
  WHEN features LIKE '%女性治療: 対応可能%' THEN '対応可能'
  ELSE NULL
END
WHERE features IS NOT NULL;

-- 既存のfeaturesからスタッフ性別を抽出
UPDATE public.clinics
SET staff_gender = CASE
  WHEN features LIKE '%スタッフ: 男性%' THEN '男性'
  WHEN features LIKE '%スタッフ: 女性%' THEN '女性'
  WHEN features LIKE '%スタッフ: 男性・女性%' THEN '男性・女性'
  WHEN features LIKE '%男性・女性%' THEN '男性・女性'
  ELSE NULL
END
WHERE features IS NOT NULL;

-- 更新件数を確認
SELECT
  COUNT(*) FILTER (WHERE parking IS NOT NULL) as parking_count,
  COUNT(*) FILTER (WHERE payment_methods IS NOT NULL) as payment_count,
  COUNT(*) FILTER (WHERE female_treatment IS NOT NULL) as female_treatment_count,
  COUNT(*) FILTER (WHERE staff_gender IS NOT NULL) as staff_gender_count
FROM public.clinics;
