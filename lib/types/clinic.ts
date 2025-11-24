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
