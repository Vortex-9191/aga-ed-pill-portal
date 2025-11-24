import { NewSearchPage } from "@/components/new-search-page"
import { searchClinics, getPrefectureCounts } from "@/lib/api/clinics"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

const ITEMS_PER_PAGE = 15

// Force dynamic rendering to avoid build-time static generation
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string; prefecture?: string }
}): Promise<Metadata> {
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""

  if (query) {
    return {
      title: `「${query}」のAGA治療クリニック検索結果 | AGA治療.com`,
      description: `「${query}」に関連するAGA治療クリニックの検索結果。全国のAGA専門クリニックから、診療時間、住所、アクセス、口コミ情報を掲載。`,
    }
  } else if (prefecture) {
    return {
      title: `${prefecture}のAGA治療クリニック | AGA治療.com`,
      description: `${prefecture}のAGA治療クリニックを検索。${prefecture}で評判のAGA専門クリニックの診療時間、住所、アクセス、口コミ情報を掲載。`,
    }
  }

  return {
    title: `AGA治療クリニック検索 | AGA治療.com`,
    description: `全国のAGA治療専門クリニックを検索。地域、駅名からAGA治療クリニックを探せます。診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    prefecture?: string
    specialty?: string
    feature?: string
    weekend?: string
    evening?: string
    director?: string
    page?: string
    sort?: string
    online?: string
  }
}) {
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""
  const currentPage = Number(searchParams.page) || 1

  const supabase = await createClient()

  // Build query
  let clinicsQuery = supabase
    .from("clinics")
    .select("*", { count: "exact" })

  // Apply filters
  if (query) {
    clinicsQuery = clinicsQuery.or(`clinic_name.ilike.%${query}%,address.ilike.%${query}%,stations.ilike.%${query}%`)
  }

  if (prefecture) {
    clinicsQuery = clinicsQuery.eq("prefecture", prefecture)
  }

  if (searchParams.specialty) {
    clinicsQuery = clinicsQuery.ilike("featured_subjects", `%${searchParams.specialty}%`)
  }

  if (searchParams.feature) {
    clinicsQuery = clinicsQuery.ilike("features", `%${searchParams.feature}%`)
  }

  if (searchParams.weekend) {
    clinicsQuery = clinicsQuery.or("hours_saturday.not.is.null,hours_sunday.not.is.null")
  }

  if (searchParams.evening) {
    clinicsQuery = clinicsQuery.or(
      "hours_monday.ilike.%18:%,hours_monday.ilike.%19:%,hours_monday.ilike.%20:%,hours_tuesday.ilike.%18:%,hours_tuesday.ilike.%19:%,hours_tuesday.ilike.%20:%,hours_wednesday.ilike.%18:%,hours_wednesday.ilike.%19:%,hours_wednesday.ilike.%20:%,hours_thursday.ilike.%18:%,hours_thursday.ilike.%19:%,hours_thursday.ilike.%20:%,hours_friday.ilike.%18:%,hours_friday.ilike.%19:%,hours_friday.ilike.%20:%"
    )
  }

  if (searchParams.director) {
    clinicsQuery = clinicsQuery.not("director_name", "is", null)
  }

  if (searchParams.online) {
    clinicsQuery = clinicsQuery.ilike("features", "%オンライン%")
  }

  // Get total count
  const { count: totalCount } = await clinicsQuery

  // Get paginated data
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const { data: clinics, error } = await clinicsQuery
    .order("rating", { ascending: false, nullsLast: true })
    .range(from, to)

  if (error) {
    console.error("[search] Error fetching clinics:", error)
  }

  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)

  // Get facet data for filters
  let facetQuery = supabase
    .from("clinics")
    .select("prefecture, municipalities, featured_subjects, hours_saturday, hours_sunday, hours_monday, hours_tuesday, hours_wednesday, hours_thursday, hours_friday, director_name, features")

  if (query) {
    facetQuery = facetQuery.or(`clinic_name.ilike.%${query}%,address.ilike.%${query}%,stations.ilike.%${query}%`)
  }

  if (prefecture) {
    facetQuery = facetQuery.eq("prefecture", prefecture)
  }

  const { data: allClinics } = await facetQuery

  // Calculate facets
  const prefectureMap = new Map<string, number>()
  const specialtyMap = new Map<string, number>()
  const featureMap = new Map<string, number>()
  let weekendCount = 0
  let eveningCount = 0
  let directorCount = 0

  allClinics?.forEach((clinic: any) => {
    // Prefectures
    if (clinic.prefecture) {
      prefectureMap.set(clinic.prefecture, (prefectureMap.get(clinic.prefecture) || 0) + 1)
    }

    // Specialties
    if (clinic.featured_subjects) {
      clinic.featured_subjects.split(",").forEach((s: string) => {
        const specialty = s.trim()
        if (specialty) {
          specialtyMap.set(specialty, (specialtyMap.get(specialty) || 0) + 1)
        }
      })
    }

    // Features
    if (clinic.features) {
      clinic.features.split(",").forEach((f: string) => {
        const feature = f.trim()
        if (feature && feature !== "-") {
          featureMap.set(feature, (featureMap.get(feature) || 0) + 1)
        }
      })
    }

    // Weekend
    if (clinic.hours_saturday || clinic.hours_sunday) {
      weekendCount++
    }

    // Evening
    const hasEvening = [
      clinic.hours_monday,
      clinic.hours_tuesday,
      clinic.hours_wednesday,
      clinic.hours_thursday,
      clinic.hours_friday,
    ].some((hours) => hours && (hours.includes("18:") || hours.includes("19:") || hours.includes("20:")))
    if (hasEvening) {
      eveningCount++
    }

    // Director
    if (clinic.director_name) {
      directorCount++
    }
  })

  const facetData = {
    prefectures: Array.from(prefectureMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20),
    specialties: Array.from(specialtyMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15),
    features: Array.from(featureMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    weekend: weekendCount,
    evening: eveningCount,
    director: directorCount,
  }

  return (
    <NewSearchPage
      clinics={clinics || []}
      facetData={facetData}
      totalCount={totalCount || 0}
      currentPage={currentPage}
      totalPages={totalPages}
      from={from}
      to={to}
      query={query}
      prefecture={prefecture}
      onlineOnly={searchParams.online === "true"}
    />
  )
}
