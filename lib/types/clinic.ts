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
