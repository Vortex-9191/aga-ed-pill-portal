import { Train, MapPin } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { createClient } from "@/lib/supabase/server"
import { ClinicCard } from "@/components/clinic-card"
import { SearchFilters } from "@/components/search-filters"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getStationInfo, decodeStationSlug } from "@/lib/data/stations"
import { getMunicipalitySlug } from "@/lib/data/municipalities"
import { ClinicFinderWrapper } from "@/components/clinic-finder-wrapper"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination } from "@/components/pagination"

const ITEMS_PER_PAGE = 15

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const stationInfo = getStationInfo(params.slug)
  const stationName = stationInfo?.ja || decodeStationSlug(params.slug)

  return {
    title: `${stationName}駅の精神科・心療内科 ${stationInfo?.prefecture ? `| ${stationInfo.prefecture}` : ""} | 全国精神科ドットコム`,
    description: `${stationName}駅周辺の精神科・心療内科を検索。${stationInfo?.prefecture || ""}${stationName}駅から通える心療内科・精神科クリニックの診療時間、アクセス、口コミ情報を掲載。`,
  }
}

export default async function StationDetailPage({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: {
    page?: string
    specialty?: string
    feature?: string
    weekend?: string
    evening?: string
    director?: string
  }
}) {
  const supabase = await createClient()

  const stationInfo = getStationInfo(params.slug)
  const japaneseStationName = stationInfo?.ja || decodeStationSlug(params.slug)

  const currentPage = Number(searchParams.page) || 1

  // Get clinics for facet generation with current filters applied
  let facetQuery = supabase
    .from("clinics")
    .select("featured_subjects, hours_saturday, hours_sunday, hours_monday, hours_tuesday, hours_wednesday, hours_thursday, hours_friday, director_name, features, municipalities, prefecture")
    .ilike("stations", `%${japaneseStationName}%`)

  // Apply same filters as main query for accurate facet counts
  if (searchParams.specialty) {
    facetQuery = facetQuery.ilike("featured_subjects", `%${searchParams.specialty}%`)
  }

  if (searchParams.feature) {
    facetQuery = facetQuery.ilike("features", `%${searchParams.feature}%`)
  }

  if (searchParams.weekend) {
    facetQuery = facetQuery.or("hours_saturday.not.is.null,hours_sunday.not.is.null")
  }

  if (searchParams.evening) {
    facetQuery = facetQuery.or(
      "hours_monday.ilike.%18:%,hours_monday.ilike.%19:%,hours_monday.ilike.%20:%,hours_tuesday.ilike.%18:%,hours_tuesday.ilike.%19:%,hours_tuesday.ilike.%20:%,hours_wednesday.ilike.%18:%,hours_wednesday.ilike.%19:%,hours_wednesday.ilike.%20:%,hours_thursday.ilike.%18:%,hours_thursday.ilike.%19:%,hours_thursday.ilike.%20:%,hours_friday.ilike.%18:%,hours_friday.ilike.%19:%,hours_friday.ilike.%20:%"
    )
  }

  if (searchParams.director) {
    facetQuery = facetQuery.not("director_name", "is", null)
  }

  const { data: allClinics } = await facetQuery

  // Build query with filters
  let queryBuilder = supabase
    .from("clinics")
    .select("*", { count: "exact" })
    .ilike("stations", `%${japaneseStationName}%`)

  if (searchParams.specialty) {
    queryBuilder = queryBuilder.ilike("featured_subjects", `%${searchParams.specialty}%`)
  }

  if (searchParams.feature) {
    queryBuilder = queryBuilder.ilike("features", `%${searchParams.feature}%`)
  }

  if (searchParams.weekend) {
    queryBuilder = queryBuilder.or("hours_saturday.not.is.null,hours_sunday.not.is.null")
  }

  if (searchParams.evening) {
    queryBuilder = queryBuilder.or(
      "hours_monday.ilike.%18:%,hours_monday.ilike.%19:%,hours_monday.ilike.%20:%,hours_tuesday.ilike.%18:%,hours_tuesday.ilike.%19:%,hours_tuesday.ilike.%20:%,hours_wednesday.ilike.%18:%,hours_wednesday.ilike.%19:%,hours_wednesday.ilike.%20:%,hours_thursday.ilike.%18:%,hours_thursday.ilike.%19:%,hours_thursday.ilike.%20:%,hours_friday.ilike.%18:%,hours_friday.ilike.%19:%,hours_friday.ilike.%20:%"
    )
  }

  if (searchParams.director) {
    queryBuilder = queryBuilder.not("director_name", "is", null)
  }

  // Get total count
  const { count: totalCount } = await queryBuilder

  // Calculate pagination
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  // Get paginated results
  const { data: clinics, error } = await queryBuilder
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const stationName = japaneseStationName
  const prefecture = stationInfo?.prefecture || clinics?.[0]?.prefecture || ""
  const lines = stationInfo?.lines || []
  const clinicCount = clinics?.length || 0

  // Calculate facet data
  const specialtyMap = new Map<string, number>()
  const featureMap = new Map<string, number>()
  let weekendCount = 0
  let eveningCount = 0
  let directorCount = 0

  allClinics?.forEach((clinic) => {
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
    prefectures: [], // Not needed for station page
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
        station: clinic.stations || '',
        specialties: clinic.featured_subjects ? clinic.featured_subjects.split(', ') : [],
        phone: clinic.corp_tel,
        prefecture: clinic.prefecture,
        city: clinic.municipalities,
        hours: hoursPreview,
        directorName: clinic.director_name,
      }
    }) || []

  // Extract municipalities with counts and prefecture info from all clinics at this station
  const municipalityMap = new Map<string, { name: string; count: number; prefecture: string }>()
  allClinics?.forEach((clinic: any) => {
    if (clinic.municipalities && clinic.prefecture) {
      const key = clinic.municipalities.trim()
      const existing = municipalityMap.get(key)
      if (existing) {
        existing.count++
      } else {
        municipalityMap.set(key, {
          name: key,
          count: 1,
          prefecture: clinic.prefecture
        })
      }
    }
  })
  const relatedMunicipalities = Array.from(municipalityMap.values())
    .sort((a, b) => b.count - a.count) // Sort by clinic count
    .slice(0, 10) // Limit to top 10

  // Prefecture slug mapping
  const prefectureSlugMap: Record<string, string> = {
    "北海道": "hokkaido", "青森県": "aomori", "岩手県": "iwate", "宮城県": "miyagi",
    "秋田県": "akita", "山形県": "yamagata", "福島県": "fukushima", "茨城県": "ibaraki",
    "栃木県": "tochigi", "群馬県": "gunma", "埼玉県": "saitama", "千葉県": "chiba",
    "東京都": "tokyo", "神奈川県": "kanagawa", "新潟県": "niigata", "富山県": "toyama",
    "石川県": "ishikawa", "福井県": "fukui", "山梨県": "yamanashi", "長野県": "nagano",
    "岐阜県": "gifu", "静岡県": "shizuoka", "愛知県": "aichi", "三重県": "mie",
    "滋賀県": "shiga", "京都府": "kyoto", "大阪府": "osaka", "兵庫県": "hyogo",
    "奈良県": "nara", "和歌山県": "wakayama", "鳥取県": "tottori", "島根県": "shimane",
    "岡山県": "okayama", "広島県": "hiroshima", "山口県": "yamaguchi", "徳島県": "tokushima",
    "香川県": "kagawa", "愛媛県": "ehime", "高知県": "kochi", "福岡県": "fukuoka",
    "佐賀県": "saga", "長崎県": "nagasaki", "熊本県": "kumamoto", "大分県": "oita",
    "宮崎県": "miyazaki", "鹿児島県": "kagoshima", "沖縄県": "okinawa",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* パンくずリスト */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/stations">駅名から探す</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{stationName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-coral/10 p-3 rounded-lg">
                <Train className="w-8 h-8 text-coral" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-coral mb-2">{stationName}のクリニック</h1>
                {prefecture && <p className="text-muted-foreground mb-3">{prefecture}</p>}
                {lines.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {lines.map((line) => (
                      <span key={line} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {line}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {totalCount || 0}件中 {from + 1}〜{Math.min(to + 1, totalCount || 0)}件を表示
            </p>
          </div>
        </div>

        {/* クリニック一覧 */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <SearchFilters facets={facetData} />
              </div>
            </aside>

            {/* Results */}
            <div>
              {/* Clinic Finder Wizard */}
              <ClinicFinderWrapper />

              <p className="text-sm text-muted-foreground mb-6">
                {totalCount || 0}件中 {from + 1}〜{Math.min(to + 1, totalCount || 0)}件を表示
              </p>

              {clinicCards.length > 0 ? (
                <>
                  <div className="space-y-6 mb-12">
                    {clinicCards.map((clinic) => (
                      <ClinicCard key={clinic.id} clinic={clinic} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="pb-8">
                      <Pagination currentPage={currentPage} totalPages={totalPages} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">条件に一致するクリニックは現在登録されていません。</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Municipalities Section */}
          {relatedMunicipalities.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {stationName}周辺の市区町村
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedMunicipalities.map((municipality) => {
                    const citySlug = getMunicipalitySlug(municipality.name)
                    const prefectureSlug = prefectureSlugMap[municipality.prefecture]

                    if (!citySlug || !prefectureSlug) {
                      // If no slug mapping, display without link
                      return (
                        <div
                          key={municipality.name}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm font-medium">{municipality.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {municipality.count}件
                          </span>
                        </div>
                      )
                    }
                    return (
                      <Link
                        key={municipality.name}
                        href={`/areas/${prefectureSlug}/${encodeURIComponent(municipality.name)}`}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent hover:border-coral transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-coral flex-shrink-0 transition-colors" />
                          <span className="text-sm font-medium group-hover:text-coral transition-colors">{municipality.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted group-hover:bg-coral/10 px-2 py-1 rounded transition-colors">
                          {municipality.count}件
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
