import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { ClinicCard } from "@/components/clinic-card"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/server"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Metadata } from "next"

const ITEMS_PER_PAGE = 15

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string; prefecture?: string }
}): Promise<Metadata> {
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""

  if (query) {
    return {
      title: `「${query}」の精神科・心療内科検索結果 | 全国精神科ドットコム`,
      description: `「${query}」に関連する精神科・心療内科クリニックの検索結果。全国の心療内科・精神科から、診療時間、住所、アクセス、口コミ情報を掲載。`,
    }
  } else if (prefecture) {
    return {
      title: `${prefecture}の精神科・心療内科 | 全国精神科ドットコム`,
      description: `${prefecture}の精神科・心療内科クリニックを検索。${prefecture}で評判の心療内科・精神科の診療時間、住所、アクセス、口コミ情報を掲載。`,
    }
  }

  return {
    title: `精神科・心療内科検索 | 全国精神科ドットコム`,
    description: `全国の精神科・心療内科クリニックを検索。地域、駅名から心療内科・精神科を探せます。診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    prefecture?: string
    specialty?: string
    weekend?: string
    evening?: string
    director?: string
    page?: string
  }
}) {
  const supabase = await createClient()
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""
  const specialty = searchParams.specialty || ""
  const weekend = searchParams.weekend
  const evening = searchParams.evening
  const hasDirector = searchParams.director
  const currentPage = Number(searchParams.page) || 1

  // Get facet aggregation data (for counts)
  const { data: allClinics } = await supabase.from("clinics").select("prefecture, featured_subjects, hours_saturday, hours_sunday, hours_monday, hours_tuesday, hours_wednesday, hours_thursday, hours_friday, director_name, features")

  // Build base query
  let queryBuilder = supabase.from("clinics").select("*", { count: "exact" })

  if (prefecture) {
    queryBuilder = queryBuilder.eq("prefecture", prefecture)
  }

  if (specialty) {
    queryBuilder = queryBuilder.ilike("featured_subjects", `%${specialty}%`)
  }

  if (weekend) {
    queryBuilder = queryBuilder.or("hours_saturday.not.is.null,hours_sunday.not.is.null")
  }

  if (evening) {
    // Check if any weekday has hours containing "18:" or later
    queryBuilder = queryBuilder.or(
      "hours_monday.ilike.%18:%,hours_monday.ilike.%19:%,hours_monday.ilike.%20:%,hours_tuesday.ilike.%18:%,hours_tuesday.ilike.%19:%,hours_tuesday.ilike.%20:%,hours_wednesday.ilike.%18:%,hours_wednesday.ilike.%19:%,hours_wednesday.ilike.%20:%,hours_thursday.ilike.%18:%,hours_thursday.ilike.%19:%,hours_thursday.ilike.%20:%,hours_friday.ilike.%18:%,hours_friday.ilike.%19:%,hours_friday.ilike.%20:%"
    )
  }

  if (hasDirector) {
    queryBuilder = queryBuilder.not("director_name", "is", null)
  }

  if (query) {
    queryBuilder = queryBuilder.or(
      `clinic_name.ilike.%${query}%,address.ilike.%${query}%,stations.ilike.%${query}%,featured_subjects.ilike.%${query}%`
    )
  }

  // Get total count
  const { count: totalCount } = await queryBuilder

  // Calculate pagination
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  // Fetch paginated data
  const { data: clinics, error } = await queryBuilder
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const clinicCards =
    clinics?.map((clinic) => {
      // Get first weekday with hours for display
      const weekdays = [
        { en: 'hours_monday', jp: '月曜' },
        { en: 'hours_tuesday', jp: '火曜' },
        { en: 'hours_wednesday', jp: '水曜' },
        { en: 'hours_thursday', jp: '木曜' },
        { en: 'hours_friday', jp: '金曜' },
        { en: 'hours_saturday', jp: '土曜' },
        { en: 'hours_sunday', jp: '日曜' },
      ]
      const firstHours = weekdays.find(day => clinic[day.en] && clinic[day.en] !== '-')
      const hoursPreview = firstHours ? `${firstHours.jp}: ${clinic[firstHours.en]}` : null

      return {
        id: clinic.id,
        name: clinic.clinic_name,
        slug: clinic.slug,
        address: clinic.address,
        station: clinic.stations || "",
        specialties: clinic.featured_subjects ? clinic.featured_subjects.split(", ") : [],
        phone: clinic.corp_tel,
        prefecture: clinic.prefecture,
        city: clinic.municipalities,
        hours: hoursPreview,
        directorName: clinic.director_name,
      }
    }) || []

  // Calculate facet data
  const prefectureMap = new Map<string, number>()
  const specialtyMap = new Map<string, number>()
  const featureMap = new Map<string, number>()
  let weekendCount = 0
  let eveningCount = 0
  let directorCount = 0

  allClinics?.forEach((clinic) => {
    // Prefecture
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

    // Evening (18:00以降)
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>検索</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Search Header */}
        <div className="border-b border-border bg-card">
          <div className="container py-6">
            <SearchForm />
          </div>
        </div>

        {/* Results Section */}
        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <SearchFilters facets={facetData} />
              </div>
            </aside>

            {/* Results */}
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {query ? `「${query}」の検索結果` : prefecture ? `${prefecture}のクリニック` : "クリニック検索"}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {totalCount || 0}件中 {from + 1}〜{Math.min(to + 1, totalCount || 0)}件を表示
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    絞り込み
                  </Button>
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">おすすめ順</SelectItem>
                      <SelectItem value="rating">評価が高い順</SelectItem>
                      <SelectItem value="reviews">口コミが多い順</SelectItem>
                      <SelectItem value="distance">距離が近い順</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clinic Cards */}
              <div className="space-y-4">
                {clinicCards.length > 0 ? (
                  clinicCards.map((clinic) => <ClinicCard key={clinic.id} clinic={clinic} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      検索条件に一致するクリニックが見つかりませんでした。
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8">
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
