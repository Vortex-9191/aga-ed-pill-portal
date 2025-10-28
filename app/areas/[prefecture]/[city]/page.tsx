import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import Link from "next/link"
import { ChevronRight, MapPin, Train } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { SearchFilters } from "@/components/search-filters"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStationSlug } from "@/lib/data/stations"

// Prefecture slug to name mapping
const prefectureMap: Record<string, string> = {
  hokkaido: "北海道", aomori: "青森県", iwate: "岩手県", miyagi: "宮城県",
  akita: "秋田県", yamagata: "山形県", fukushima: "福島県", ibaraki: "茨城県",
  tochigi: "栃木県", gunma: "群馬県", saitama: "埼玉県", chiba: "千葉県",
  tokyo: "東京都", kanagawa: "神奈川県", niigata: "新潟県", toyama: "富山県",
  ishikawa: "石川県", fukui: "福井県", yamanashi: "山梨県", nagano: "長野県",
  gifu: "岐阜県", shizuoka: "静岡県", aichi: "愛知県", mie: "三重県",
  shiga: "滋賀県", kyoto: "京都府", osaka: "大阪府", hyogo: "兵庫県",
  nara: "奈良県", wakayama: "和歌山県", tottori: "鳥取県", shimane: "島根県",
  okayama: "岡山県", hiroshima: "広島県", yamaguchi: "山口県", tokushima: "徳島県",
  kagawa: "香川県", ehime: "愛媛県", kochi: "高知県", fukuoka: "福岡県",
  saga: "佐賀県", nagasaki: "長崎県", kumamoto: "熊本県", oita: "大分県",
  miyazaki: "宮崎県", kagoshima: "鹿児島県", okinawa: "沖縄県",
}

export async function generateMetadata({
  params,
}: {
  params: { prefecture: string; city: string }
}): Promise<Metadata> {
  const prefectureName = prefectureMap[params.prefecture] || "都道府県"
  const cityName = decodeURIComponent(params.city)

  return {
    title: `${prefectureName}${cityName}の精神科・心療内科 | 全国精神科ドットコム`,
    description: `${prefectureName}${cityName}の精神科・心療内科クリニック一覧。診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

const ITEMS_PER_PAGE = 15

export default async function CityPage({
  params,
  searchParams,
}: {
  params: { prefecture: string; city: string }
  searchParams: {
    page?: string
    specialty?: string
    feature?: string
    weekend?: string
    evening?: string
    director?: string
  }
}) {
  const prefectureName = prefectureMap[params.prefecture]
  const cityName = decodeURIComponent(params.city)

  if (!prefectureName) {
    notFound()
  }

  const supabase = await createClient()
  const currentPage = Number(searchParams.page) || 1

  // Get all clinics for this city (for facet generation)
  const { data: allClinics } = await supabase
    .from("clinics")
    .select("featured_subjects, hours_saturday, hours_sunday, hours_monday, hours_tuesday, hours_wednesday, hours_thursday, hours_friday, director_name, features, stations")
    .eq("prefecture", prefectureName)
    .eq("municipalities", cityName)

  // Build query
  let clinicsQuery = supabase
    .from("clinics")
    .select("*", { count: "exact" })
    .eq("prefecture", prefectureName)
    .eq("municipalities", cityName)

  // Apply filters
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

  // Get total count
  const { count: totalCount } = await clinicsQuery

  // Get paginated data
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const { data: clinics, error } = await clinicsQuery
    .order("rating", { ascending: false, nullsLast: true })
    .range(from, to)

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)

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
    prefectures: [], // Not needed for city page
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

  // Extract stations with counts from all clinics in this city
  const stationMap = new Map<string, number>()
  allClinics?.forEach((clinic) => {
    if (clinic.stations) {
      // Stations are comma-separated in the database
      const stations = clinic.stations.split(",").map((s: string) => s.trim())
      stations.forEach((station: string) => {
        if (station && station !== "-") {
          stationMap.set(station, (stationMap.get(station) || 0) + 1)
        }
      })
    }
  })
  const relatedStations = Array.from(stationMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count) // Sort by clinic count
    .slice(0, 10) // Limit to top 10

  // Transform data
  const clinicCards =
    clinics?.map((clinic) => {
      const weekdays = [
        { en: "hours_monday", jp: "月曜" },
        { en: "hours_tuesday", jp: "火曜" },
        { en: "hours_wednesday", jp: "水曜" },
        { en: "hours_thursday", jp: "木曜" },
        { en: "hours_friday", jp: "金曜" },
        { en: "hours_saturday", jp: "土曜" },
        { en: "hours_sunday", jp: "日曜" },
      ]
      const firstHours = weekdays.find((day) => clinic[day.en] && clinic[day.en] !== "-")
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ホーム
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/areas" className="hover:text-foreground transition-colors">
                エリア一覧
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/areas/${params.prefecture}`} className="hover:text-foreground transition-colors">
                {prefectureName}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{cityName}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                {cityName}のクリニック
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">{totalCount || 0}件のクリニック</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Facet Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <SearchFilters facets={facetData} />
              </div>
            </aside>

            {/* Clinic List */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {totalCount || 0}件中 {from + 1}〜{Math.min(to + 1, totalCount || 0)}件を表示
                </p>
              </div>

              <div className="space-y-4">
                {clinicCards.length > 0 ? (
                  clinicCards.map((clinic) => <ClinicCard key={clinic.id} clinic={clinic} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">クリニックが見つかりませんでした。</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link href={`/areas/${params.prefecture}/${params.city}?page=${currentPage - 1}`}>
                      <Button variant="outline">前へ</Button>
                    </Link>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {currentPage} / {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link href={`/areas/${params.prefecture}/${params.city}?page=${currentPage + 1}`}>
                      <Button variant="outline">次へ</Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Stations Section */}
          {relatedStations.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="h-5 w-5" />
                  {cityName}のクリニック最寄り駅
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedStations.map((station) => {
                    const stationSlug = getStationSlug(station.name)

                    if (!stationSlug) {
                      // If no slug mapping, display without link
                      return (
                        <div
                          key={station.name}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <Train className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm font-medium">{station.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {station.count}件
                          </span>
                        </div>
                      )
                    }
                    return (
                      <Link
                        key={station.name}
                        href={`/stations/${stationSlug}`}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent hover:border-coral transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Train className="h-4 w-4 text-muted-foreground group-hover:text-coral flex-shrink-0 transition-colors" />
                          <span className="text-sm font-medium group-hover:text-coral transition-colors">{station.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted group-hover:bg-coral/10 px-2 py-1 rounded transition-colors">
                          {station.count}件
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
