import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { ClinicCard } from "@/components/clinic-card"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDummyClinics } from "@/lib/data/dummy-clinics"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Metadata } from "next"
import { ClinicFinderWrapper } from "@/components/clinic-finder-wrapper"

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
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""
  const specialty = searchParams.specialty || ""
  const weekend = searchParams.weekend
  const evening = searchParams.evening
  const hasDirector = searchParams.director
  const currentPage = Number(searchParams.page) || 1

  // Get all clinics from dummy data
  const allClinics = getDummyClinics()

  // Filter clinics based on search params
  let filteredClinics = [...allClinics]

  if (prefecture) {
    filteredClinics = filteredClinics.filter((c) => c.prefecture === prefecture)
  }

  if (specialty) {
    filteredClinics = filteredClinics.filter((c) =>
      c.featured_subjects?.toLowerCase().includes(specialty.toLowerCase())
    )
  }

  if (weekend) {
    filteredClinics = filteredClinics.filter(
      (c) => c.hours_saturday || c.hours_sunday
    )
  }

  if (evening) {
    filteredClinics = filteredClinics.filter((c) => {
      const weekdayHours = [
        c.hours_monday,
        c.hours_tuesday,
        c.hours_wednesday,
        c.hours_thursday,
        c.hours_friday,
      ]
      return weekdayHours.some(
        (hours) =>
          hours &&
          (hours.includes("18:") ||
            hours.includes("19:") ||
            hours.includes("20:"))
      )
    })
  }

  if (hasDirector) {
    filteredClinics = filteredClinics.filter((c) => c.director_name)
  }

  if (query) {
    const q = query.toLowerCase()
    filteredClinics = filteredClinics.filter(
      (c) =>
        c.clinic_name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.stations?.toLowerCase().includes(q) ||
        c.featured_subjects?.toLowerCase().includes(q)
    )
  }

  // Calculate pagination
  const totalCount = filteredClinics.length
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE

  // Get paginated clinics
  const clinics = filteredClinics.slice(from, to)

  const clinicCards =
    clinics.map((clinic) => {
      // Get first weekday with hours for display
      const weekdays = [
        { en: 'hours_monday' as const, jp: '月曜' },
        { en: 'hours_tuesday' as const, jp: '火曜' },
        { en: 'hours_wednesday' as const, jp: '水曜' },
        { en: 'hours_thursday' as const, jp: '木曜' },
        { en: 'hours_friday' as const, jp: '金曜' },
        { en: 'hours_saturday' as const, jp: '土曜' },
        { en: 'hours_sunday' as const, jp: '日曜' },
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
    })

  // Calculate facet data
  const prefectureMap = new Map<string, number>()
  const specialtyMap = new Map<string, number>()
  const featureMap = new Map<string, number>()
  let weekendCount = 0
  let eveningCount = 0
  let directorCount = 0

  allClinics.forEach((clinic) => {
    // Prefecture
    if (clinic.prefecture) {
      prefectureMap.set(clinic.prefecture, (prefectureMap.get(clinic.prefecture) || 0) + 1)
    }

    // Specialties
    if (clinic.featured_subjects) {
      clinic.featured_subjects.split(",").forEach((s) => {
        const specialty = s.trim()
        if (specialty) {
          specialtyMap.set(specialty, (specialtyMap.get(specialty) || 0) + 1)
        }
      })
    }

    // Features
    if (clinic.features) {
      clinic.features.split(",").forEach((f) => {
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
              {/* Clinic Finder Wizard */}
              <ClinicFinderWrapper />

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
