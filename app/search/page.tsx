import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { ClinicCard } from "@/components/clinic-card"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { searchClinics, getPrefectureCounts } from "@/lib/api/clinics"
import { SortSelect } from "@/components/sort-select"
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
      title: `「${query}」のAGA治療クリニック検索結果 | aga治療.com`,
      description: `「${query}」に関連するAGA治療クリニックの検索結果。全国のAGA専門クリニックから、診療時間、住所、アクセス、口コミ情報を掲載。`,
    }
  } else if (prefecture) {
    return {
      title: `${prefecture}のAGA治療クリニック | aga治療.com`,
      description: `${prefecture}のAGA治療クリニックを検索。${prefecture}で評判のAGA専門クリニックの診療時間、住所、アクセス、口コミ情報を掲載。`,
    }
  }

  return {
    title: `AGA治療クリニック検索 | aga治療.com`,
    description: `全国のAGA治療専門クリニックを検索。地域、駅名からAGA治療クリニックを探せます。診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

interface Clinic {
  id: number
  clinic_name: string
  address: string
  stations: string
  phone_number: string
  hours_monday: string
  hours_tuesday: string
  hours_wednesday: string
  hours_thursday: string
  hours_friday: string
  hours_saturday: string
  hours_sunday: string
  hours_holiday: string
  rating: number
  review_count: number
  director_name: string
  featured_subjects: string
  slug: string
  prefecture: string
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
    sort?: string
  }
}) {
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || ""
  const specialty = searchParams.specialty || ""
  const weekend = searchParams.weekend === 'true'
  const evening = searchParams.evening === 'true'
  const hasDirector = searchParams.director === 'true'
  const sort = searchParams.sort || "recommended"
  const currentPage = Number(searchParams.page) || 1

  // Fetch clinics and prefecture counts in parallel
  const [clinicsResult, prefectureCounts] = await Promise.all([
    searchClinics({
      q: query,
      prefecture,
      specialty,
      weekend,
      evening,
      director: hasDirector,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      sort,
    }),
    getPrefectureCounts()
  ])

  const { data: clinicsData, count } = clinicsResult
  const clinics = clinicsData as Clinic[]

  const totalCount = count || 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + (clinics?.length || 0)


  // Facet data is hard to get dynamically with simple queries without aggregation support or separate queries.
  // For now, we will use static or simplified facet data, or just hide facets if data is missing.
  // To properly support facets, we would need RPC calls or separate aggregation queries.
  // Given the scope, let's keep the facets static or simplified for now, or remove them if they are not critical.
  // The original code calculated facets from *all* dummy clinics. Doing that with DB is expensive.
  // Let's provide some static common facets for now to keep UI consistent.

  // Construct facet data
  const facetData = {
    prefectures: Object.entries(prefectureCounts as Record<string, number>).map(([name, count]) => ({
      name,
      count,
      value: name,
      label: name
    })).sort((a, b) => b.count - a.count),
    cities: [], // TODO: Implement dynamic city facets
    stations: [], // TODO: Implement dynamic station facets
    specialties: [], // TODO: Implement dynamic specialty facets
    features: [], // TODO: Implement dynamic feature facets
    weekend: 0, // Placeholder
    evening: 0, // Placeholder
    director: 0, // Placeholder
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
                    {totalCount || 0}件中 {totalCount > 0 ? from + 1 : 0}〜{Math.min(to, totalCount || 0)}件を表示
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    絞り込み
                  </Button>
                  <SortSelect />
                </div>
              </div>

              {/* Clinic Cards */}
              <div className="space-y-4">
                {clinics && clinics.length > 0 ? (
                  clinics.map((clinic) => {
                    // Get first weekday with hours for display
                    const weekdays = [
                      { en: 'hours_monday' as const, jp: '月曜' },
                      { en: 'hours_tuesday' as const, jp: '火曜' },
                      { en: 'hours_wednesday' as const, jp: '水曜' },
                      { en: 'hours_thursday' as const, jp: '木曜' },
                      { en: 'hours_friday' as const, jp: '金曜' },
                      { en: 'hours_saturday' as const, jp: '土曜' },
                    ]
                    // @ts-ignore - dynamic access
                    const firstHours = weekdays.find(day => clinic[day.en] && clinic[day.en] !== '-')
                    // @ts-ignore - dynamic access
                    const hours = firstHours ? `${firstHours.jp}: ${clinic[firstHours.en]}` : null
                    const specialties = clinic.featured_subjects ? clinic.featured_subjects.split(',').map((s) => s.trim()) : []
                    const phoneNumber = clinic.phone_number || null
                    // Simple city extraction
                    const city = clinic.address.split(clinic.prefecture)[1]?.split(/市|区|町|村/)[0] + (clinic.address.match(/市|区|町|村/)?.[0] || '') || ''

                    return (
                      <ClinicCard
                        key={clinic.id}
                        clinic={{
                          id: String(clinic.id),
                          name: clinic.clinic_name,
                          slug: clinic.slug,
                          address: clinic.address,
                          station: clinic.stations,
                          specialties: specialties,
                          phone: phoneNumber,
                          prefecture: clinic.prefecture,
                          city: city,
                          hours: hours,
                          directorName: clinic.director_name,
                          rating: clinic.rating,
                          reviewCount: clinic.review_count
                        }}
                      />
                    )
                  })
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
