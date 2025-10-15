export interface Clinic {
  id: string
  name: string
  slug: string
  address: string
  prefecture: string
  city: string
  station: string
  station_line: string | null
  distance: string | null
  specialties: string[]
  phone: string | null
  website: string | null
  description: string | null
  features: string[]
  payment_methods: string[]
  image_url: string | null
  hours: Record<string, any> | null
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
  website: string | null
  prefecture: string
  city: string
}
