import { createClient } from "@/lib/supabase/server"

export async function getClinicBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clinics')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching clinic:', error)
    return null
  }

  return data
}

export type SearchParams = {
  q?: string
  prefecture?: string
  specialty?: string
  weekend?: boolean
  evening?: boolean
  director?: boolean
  page?: number
  limit?: number
  sort?: string
}

export async function searchClinics(params: SearchParams) {
  const supabase = await createClient()
  const { q, prefecture, specialty, weekend, evening, director, page = 1, limit = 15, sort } = params

  let query = supabase
    .from('clinics')
    .select('*', { count: 'exact' })

  // Text search (name, address, stations, features)
  if (q) {
    query = query.or(`clinic_name.ilike.%${q}%,address.ilike.%${q}%,stations.ilike.%${q}%,featured_subjects.ilike.%${q}%`)
  }

  // Filters
  if (prefecture) {
    query = query.eq('prefecture', prefecture)
  }

  if (specialty) {
    query = query.ilike('featured_subjects', `%${specialty}%`)
  }

  if (weekend) {
    query = query.or('hours_saturday.neq.-,hours_sunday.neq.-')
  }

  if (director) {
    query = query.not('director_name', 'is', null)
  }

  if (evening) {
    query = query.or('hours_monday.ilike.%18:%,hours_monday.ilike.%19:%,hours_monday.ilike.%20:%,hours_tuesday.ilike.%18:%,hours_tuesday.ilike.%19:%,hours_tuesday.ilike.%20:%,hours_wednesday.ilike.%18:%,hours_wednesday.ilike.%19:%,hours_wednesday.ilike.%20:%,hours_thursday.ilike.%18:%,hours_thursday.ilike.%19:%,hours_thursday.ilike.%20:%,hours_friday.ilike.%18:%,hours_friday.ilike.%19:%,hours_friday.ilike.%20:%')
  }

  // Sorting
  if (sort === 'rating') {
    query = query.order('rating', { ascending: false })
  } else if (sort === 'reviews') {
    query = query.order('review_count', { ascending: false })
  } else {
    // Default sort (recommended) - for now just by ID or random if possible, but ID is stable
    query = query.order('id', { ascending: true })
  }

  // Pagination
  const from = (page - 1) * limit
  const to = from + limit - 1

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('Error searching clinics:', error)
    return { data: [], count: 0 }
  }

  return { data, count }
}

export async function getPrefectureCounts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clinics')
    .select('prefecture')

  if (error) {
    console.error('Error fetching prefecture counts:', error)
    return {}
  }

  const counts: Record<string, number> = {}
  data.forEach((item: { prefecture: string }) => {
    if (item.prefecture) {
      counts[item.prefecture] = (counts[item.prefecture] || 0) + 1
    }
  })
  return counts
}
