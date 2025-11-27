export interface Clinic {
  id: string
  clinic_name: string
  slug: string
  address: string
  prefecture: string
  municipalities: string
  stations: string | null
  url: string | null
  featured_subjects: string | null
  clinic_spec: string | null
  corp_tel: string | null
  non_medical_response: string | null
  rating: number | null
  review_count: number
  created_at: string
  updated_at: string
  // Enriched data
  director_name: string | null
  access_info: string | null
  homepage_url: string | null
  closed_days: string | null
  notes: string | null
  specialist_doctors: string | null
  treatable_diseases: string | null
  specialized_treatments: string | null
  features: string | null
  hours_monday: string | null
  hours_tuesday: string | null
  hours_wednesday: string | null
  hours_thursday: string | null
  hours_friday: string | null
  hours_saturday: string | null
  hours_sunday: string | null
  hours_holiday: string | null
  business_hours: string | null  // Raw営業時間 from CSV (e.g., "10:00〜19:00 (月,火,水,木,金,土,日,祝)")
  // 追加項目（CSVからの拡充用）
  parking: string | null          // 駐車場
  payment_methods: string | null  // 支払い方法
  staff_gender: string | null     // スタッフ性別
  female_treatment: string | null // 女性治療対応
  prescription_time: string | null // 処方までの時間
  counseling_fee: string | null   // カウンセリング料金
  consultation_fee: string | null // 診察料
  recommended_points: string | null // おすすめポイント
}

export interface ClinicPrice {
  name: string
  price: number
  note: string
}

export interface ClinicWithPrices extends Clinic {
  min_price?: number
  prices?: ClinicPrice[]
  image_url?: string
}

export interface ClinicCardData {
  id: string
  name: string
  slug: string
  address: string
  station: string
  specialties: string[]
  phone: string | null
  prefecture: string
  city: string
}

export interface FeaturedClinic {
  featured_id: string
  display_order: number
  section: 'top' | 'pickup' | 'recommended'
  label: string | null
  custom_description: string | null
  is_active: boolean
  // Clinic fields
  id: string
  clinic_name: string
  slug: string
  address: string
  prefecture: string
  municipalities: string | null
  stations: string | null
  url: string | null
  featured_subjects: string | null
  corp_tel: string | null
  rating: number | null
  review_count: number
  features: string | null
  parking: string | null
  payment_methods: string | null
  female_treatment: string | null
  business_hours: string | null
}
