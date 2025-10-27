import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import Link from "next/link"
import { ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Prefecture slug to name mapping
const prefectureMap: Record<string, string> = {
  hokkaido: "北海道",
  aomori: "青森県",
  iwate: "岩手県",
  miyagi: "宮城県",
  akita: "秋田県",
  yamagata: "山形県",
  fukushima: "福島県",
  ibaraki: "茨城県",
  tochigi: "栃木県",
  gunma: "群馬県",
  saitama: "埼玉県",
  chiba: "千葉県",
  tokyo: "東京都",
  kanagawa: "神奈川県",
  niigata: "新潟県",
  toyama: "富山県",
  ishikawa: "石川県",
  fukui: "福井県",
  yamanashi: "山梨県",
  nagano: "長野県",
  gifu: "岐阜県",
  shizuoka: "静岡県",
  aichi: "愛知県",
  mie: "三重県",
  shiga: "滋賀県",
  kyoto: "京都府",
  osaka: "大阪府",
  hyogo: "兵庫県",
  nara: "奈良県",
  wakayama: "和歌山県",
  tottori: "鳥取県",
  shimane: "島根県",
  okayama: "岡山県",
  hiroshima: "広島県",
  yamaguchi: "山口県",
  tokushima: "徳島県",
  kagawa: "香川県",
  ehime: "愛媛県",
  kochi: "高知県",
  fukuoka: "福岡県",
  saga: "佐賀県",
  nagasaki: "長崎県",
  kumamoto: "熊本県",
  oita: "大分県",
  miyazaki: "宮崎県",
  kagoshima: "鹿児島県",
  okinawa: "沖縄県",
}

export async function generateMetadata({ params }: { params: { prefecture: string } }): Promise<Metadata> {
  const prefectureName = prefectureMap[params.prefecture] || "都道府県"

  return {
    title: `${prefectureName}の精神科・心療内科一覧 | 全国精神科ドットコム`,
    description: `${prefectureName}の精神科・心療内科クリニック一覧。診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

const ITEMS_PER_PAGE = 15

export default async function PrefecturePage({
  params,
  searchParams,
}: {
  params: { prefecture: string }
  searchParams: { page?: string; city?: string; specialty?: string; rating?: string }
}) {
  const prefectureName = prefectureMap[params.prefecture]

  if (!prefectureName) {
    notFound()
  }

  const supabase = await createClient()
  const currentPage = Number(searchParams.page) || 1

  // Get municipalities (cities) for this prefecture
  const { data: municipalities } = await supabase
    .from("clinics")
    .select("municipalities")
    .eq("prefecture", prefectureName)
    .not("municipalities", "is", null)
    .order("municipalities")

  const uniqueCities = Array.from(
    new Set(municipalities?.map((m) => m.municipalities).filter(Boolean))
  ).sort()

  // Build query for clinics
  let clinicsQuery = supabase
    .from("clinics")
    .select("*", { count: "exact" })
    .eq("prefecture", prefectureName)

  // Apply filters
  if (searchParams.city) {
    clinicsQuery = clinicsQuery.eq("municipalities", searchParams.city)
  }

  if (searchParams.specialty) {
    clinicsQuery = clinicsQuery.ilike("featured_subjects", `%${searchParams.specialty}%`)
  }

  if (searchParams.rating) {
    const minRating = parseFloat(searchParams.rating)
    clinicsQuery = clinicsQuery.gte("rating", minRating)
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

  // Transform data for ClinicCard
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
        rating: clinic.rating,
        reviewCount: clinic.review_count,
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
              <span className="text-foreground font-medium">{prefectureName}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">{prefectureName}のクリニック</h1>
            </div>
            <p className="text-lg text-muted-foreground">{totalCount || 0}件のクリニック</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Facet Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">絞り込み検索</h2>

                    {/* City Filter */}
                    {uniqueCities.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-foreground mb-3">市区町村</h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {uniqueCities.slice(0, 10).map((city) => (
                            <Link
                              key={city}
                              href={`/areas/${params.prefecture}?city=${city}`}
                              className={`block text-sm py-1 px-2 rounded hover:bg-accent/10 transition-colors ${
                                searchParams.city === city ? "bg-accent/20 font-medium" : ""
                              }`}
                            >
                              {city}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rating Filter */}
                    <div className="mb-6 border-t pt-4">
                      <h3 className="text-sm font-medium text-foreground mb-3">口コミ評価</h3>
                      <div className="space-y-2">
                        {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                          <Link
                            key={rating}
                            href={`/areas/${params.prefecture}?rating=${rating}`}
                            className={`block text-sm py-1 px-2 rounded hover:bg-accent/10 transition-colors ${
                              searchParams.rating === rating.toString() ? "bg-accent/20 font-medium" : ""
                            }`}
                          >
                            ⭐ {rating}以上
                          </Link>
                        ))}
                      </div>
                    </div>

                    {searchParams.city || searchParams.rating ? (
                      <Link href={`/areas/${params.prefecture}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          フィルタークリア
                        </Button>
                      </Link>
                    ) : null}
                  </CardContent>
                </Card>
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
                    <p className="text-muted-foreground">条件に一致するクリニックが見つかりませんでした。</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link href={`/areas/${params.prefecture}?page=${currentPage - 1}`}>
                      <Button variant="outline">前へ</Button>
                    </Link>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {currentPage} / {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link href={`/areas/${params.prefecture}?page=${currentPage + 1}`}>
                      <Button variant="outline">次へ</Button>
                    </Link>
                  )}
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
