import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import { Train } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStationSlug } from "@/lib/data/stations"
import { Pagination } from "@/components/pagination"

const ITEMS_PER_PAGE = 15

const cityData: Record<
  string,
  { name: string; municipalityName: string; prefecture: string; prefectureSlug: string }
> = {
  // 東京都
  "shinjuku-ku": { name: "新宿区", municipalityName: "新宿区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "shibuya-ku": { name: "渋谷区", municipalityName: "渋谷区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "minato-ku": { name: "港区", municipalityName: "港区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "setagaya-ku": { name: "世田谷区", municipalityName: "世田谷区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "shinagawa-ku": { name: "品川区", municipalityName: "品川区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "chiyoda-ku": { name: "千代田区", municipalityName: "千代田区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "meguro-ku": { name: "目黒区", municipalityName: "目黒区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "adachi-ku": { name: "足立区", municipalityName: "足立区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "hachioji": { name: "八王子市", municipalityName: "八王子市", prefecture: "東京都", prefectureSlug: "tokyo" },

  // 神奈川県
  "yokohama-naka": { name: "横浜市中区", municipalityName: "横浜市中区", prefecture: "神奈川県", prefectureSlug: "kanagawa" },
  "yokohama-asahi": { name: "横浜市旭区", municipalityName: "横浜市旭区", prefecture: "神奈川県", prefectureSlug: "kanagawa" },
  "hiratsuka": { name: "平塚市", municipalityName: "平塚市", prefecture: "神奈川県", prefectureSlug: "kanagawa" },
  "atsugi": { name: "厚木市", municipalityName: "厚木市", prefecture: "神奈川県", prefectureSlug: "kanagawa" },

  // 大阪府
  "osaka-kita": { name: "大阪市北区", municipalityName: "大阪市北区", prefecture: "大阪府", prefectureSlug: "osaka" },

  // 愛知県
  "nagoya-naka": { name: "名古屋市中区", municipalityName: "名古屋市中区", prefecture: "愛知県", prefectureSlug: "aichi" },
  "toyohashi": { name: "豊橋市", municipalityName: "豊橋市", prefecture: "愛知県", prefectureSlug: "aichi" },
  "kasugai": { name: "春日井市", municipalityName: "春日井市", prefecture: "愛知県", prefectureSlug: "aichi" },

  // 福岡県
  "fukuoka-hakata": { name: "福岡市博多区", municipalityName: "福岡市博多区", prefecture: "福岡県", prefectureSlug: "fukuoka" },
  "fukuoka-nishi": { name: "福岡市西区", municipalityName: "福岡市西区", prefecture: "福岡県", prefectureSlug: "fukuoka" },
  "fukuoka-minami": { name: "福岡市南区", municipalityName: "福岡市南区", prefecture: "福岡県", prefectureSlug: "fukuoka" },
  "kitakyushu-moji": { name: "北九州市門司区", municipalityName: "北九州市門司区", prefecture: "福岡県", prefectureSlug: "fukuoka" },

  // 北海道
  "sapporo-chuo": { name: "札幌市中央区", municipalityName: "札幌市中央区", prefecture: "北海道", prefectureSlug: "hokkaido" },
  "asahikawa": { name: "旭川市", municipalityName: "旭川市", prefecture: "北海道", prefectureSlug: "hokkaido" },

  // 京都府
  "kyoto-nakagyo": { name: "京都市中京区", municipalityName: "京都市中京区", prefecture: "京都府", prefectureSlug: "kyoto" },

  // その他主要都市
  "hamamatsu-chuo": { name: "浜松市中央区", municipalityName: "浜松市中央区", prefecture: "静岡県", prefectureSlug: "shizuoka" },
  "kanazawa": { name: "金沢市", municipalityName: "金沢市", prefecture: "石川県", prefectureSlug: "ishikawa" },
  "oita": { name: "大分市", municipalityName: "大分市", prefecture: "大分県", prefectureSlug: "oita" },
  "gifu": { name: "岐阜市", municipalityName: "岐阜市", prefecture: "岐阜県", prefectureSlug: "gifu" },
  "kagoshima": { name: "鹿児島市", municipalityName: "鹿児島市", prefecture: "鹿児島県", prefectureSlug: "kagoshima" },
  "kochi": { name: "高知市", municipalityName: "高知市", prefecture: "高知県", prefectureSlug: "kochi" },
  "toyama": { name: "富山市", municipalityName: "富山市", prefecture: "富山県", prefectureSlug: "toyama" },
  "takasaki": { name: "高崎市", municipalityName: "高崎市", prefecture: "群馬県", prefectureSlug: "gunma" },
  "yamagata": { name: "山形市", municipalityName: "山形市", prefecture: "山形県", prefectureSlug: "yamagata" },
  "fukui": { name: "福井市", municipalityName: "福井市", prefecture: "福井県", prefectureSlug: "fukui" },
  "tsu": { name: "津市", municipalityName: "津市", prefecture: "三重県", prefectureSlug: "mie" },
  "miyazaki": { name: "宮崎市", municipalityName: "宮崎市", prefecture: "宮崎県", prefectureSlug: "miyazaki" },
  "ube": { name: "宇部市", municipalityName: "宇部市", prefecture: "山口県", prefectureSlug: "yamaguchi" },
  "yonago": { name: "米子市", municipalityName: "米子市", prefecture: "鳥取県", prefectureSlug: "tottori" },
  "tokorozawa": { name: "所沢市", municipalityName: "所沢市", prefecture: "埼玉県", prefectureSlug: "saitama" },
  "kawagoe": { name: "川越市", municipalityName: "川越市", prefecture: "埼玉県", prefectureSlug: "saitama" },
  "nagaoka": { name: "長岡市", municipalityName: "長岡市", prefecture: "新潟県", prefectureSlug: "niigata" },
  "nagano": { name: "長野市", municipalityName: "長野市", prefecture: "長野県", prefectureSlug: "nagano" },
  "okayama-kita": { name: "岡山市北区", municipalityName: "岡山市北区", prefecture: "岡山県", prefectureSlug: "okayama" },
  "kumamoto-higashi": { name: "熊本市東区", municipalityName: "熊本市東区", prefecture: "熊本県", prefectureSlug: "kumamoto" },
  "akita": { name: "秋田市", municipalityName: "秋田市", prefecture: "秋田県", prefectureSlug: "akita" },
  "amakusa": { name: "天草市", municipalityName: "天草市", prefecture: "熊本県", prefectureSlug: "kumamoto" },
  "tsukuba": { name: "つくば市", municipalityName: "つくば市", prefecture: "茨城県", prefectureSlug: "ibaraki" },
  "matsue": { name: "松江市", municipalityName: "松江市", prefecture: "島根県", prefectureSlug: "shimane" },
  "matsumoto": { name: "松本市", municipalityName: "松本市", prefecture: "長野県", prefectureSlug: "nagano" },
  "takaoka": { name: "高岡市", municipalityName: "高岡市", prefecture: "富山県", prefectureSlug: "toyama" },
  "matsuyama": { name: "松山市", municipalityName: "松山市", prefecture: "愛媛県", prefectureSlug: "ehime" },
  "sakata": { name: "酒田市", municipalityName: "酒田市", prefecture: "山形県", prefectureSlug: "yamagata" },
  "okinawa": { name: "沖縄市", municipalityName: "沖縄市", prefecture: "沖縄県", prefectureSlug: "okinawa" },
  "fukushima": { name: "福島市", municipalityName: "福島市", prefecture: "福島県", prefectureSlug: "fukushima" },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const city = cityData[params.slug] || {
    name: "市区町村",
    municipalityName: "市区町村",
    prefecture: "都道府県",
    prefectureSlug: "prefecture",
  }

  return {
    title: `${city.name}の精神科・心療内科 | ${city.prefecture} | 全国精神科ドットコム`,
    description: `${city.prefecture}${city.name}の精神科・心療内科クリニックを検索。${city.name}で評判の心療内科・精神科の診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

export default async function CityDetailPage({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { page?: string }
}) {
  const supabase = await createClient()
  const city = cityData[params.slug] || {
    name: "市区町村",
    municipalityName: "市区町村",
    prefecture: "都道府県",
    prefectureSlug: "prefecture",
  }

  const currentPage = Number(searchParams.page) || 1

  // Get total count
  const { count: totalCount } = await supabase
    .from("clinics")
    .select("*", { count: "exact", head: true })
    .ilike("municipalities", `%${city.municipalityName}%`)

  // Calculate pagination
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const { data: clinics, error } = await supabase
    .from("clinics")
    .select("*")
    .ilike("municipalities", `%${city.municipalityName}%`)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const clinicCards =
    clinics?.map((clinic) => {
      // Get first weekday with hours for display
      const weekdays = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜']
      const firstHours = weekdays.find(day => clinic[day] && clinic[day] !== '-')
      const hoursPreview = firstHours ? `${firstHours}: ${clinic[firstHours]}` : null

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
        rating: clinic.口コミ評価,
        reviewCount: clinic.口コミ件数,
        hours: hoursPreview,
      }
    }) || []

  // Extract unique stations from clinics in this municipality
  const relatedStationsSet = new Set<string>()
  clinics?.forEach((clinic) => {
    if (clinic.stations) {
      // Extract station names - improved regex to handle numbers and various formats
      // Matches: 梅田駅, 新宿三丁目駅, etc.
      const stationMatches = clinic.stations.match(/([ぁ-んァ-ヶー一-龠0-9０-９ヶ]+)駅/g)
      if (stationMatches) {
        stationMatches.forEach((match: string) => {
          // Remove 駅 suffix and common prefixes like JR, 地下鉄, etc.
          let stationName = match.replace(/駅$/, '')
          stationName = stationName.replace(/^(JR|地下鉄|東京メトロ|都営|私鉄|阪急|阪神|近鉄|南海|京阪|地下鉄|市営)\s*/, '')

          if (stationName.length > 0 && stationName.length < 20) { // Reasonable length check
            relatedStationsSet.add(stationName)
          }
        })
      }

      // Also try to extract from access info patterns like "〇〇駅から徒歩"
      const accessMatches = clinic.stations.match(/([ぁ-んァ-ヶー一-龠0-9０-９]+)駅(?:から|より|徒歩|まで)/g)
      if (accessMatches) {
        accessMatches.forEach((match: string) => {
          let stationName = match.replace(/駅(から|より|徒歩|まで).*$/, '').replace(/駅$/, '')
          stationName = stationName.replace(/^(JR|地下鉄|東京メトロ|都営|私鉄|阪急|阪神|近鉄|南海|京阪|地下鉄|市営)\s*/, '')

          if (stationName.length > 0 && stationName.length < 20) {
            relatedStationsSet.add(stationName)
          }
        })
      }
    }
  })
  const relatedStations = Array.from(relatedStationsSet).slice(0, 20) // Limit to 20 stations

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cities">市区町村一覧</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{city.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{city.name}のクリニック</h1>
            <p className="text-muted-foreground">
              {city.prefecture} {city.name}のクリニック一覧
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">
              クリニック一覧
              <span className="ml-2 text-base font-normal text-muted-foreground">
                ({totalCount || 0}件中 {from + 1}〜{Math.min(to + 1, totalCount || 0)}件を表示)
              </span>
            </h2>
            {clinicCards.length > 0 ? (
              <>
                <div className="space-y-4">
                  {clinicCards.map((clinic) => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="pt-8">
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">この地域のクリニックは現在登録されていません。</p>
              </div>
            )}
          </div>

          {/* Related Stations Section */}
          {relatedStations.length > 0 && (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    {city.name}の関連駅
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {relatedStations.map((station) => {
                      // Get proper English slug from Japanese station name
                      const stationSlug = getStationSlug(station)

                      // If no slug mapping found, don't render as link
                      if (!stationSlug) {
                        return (
                          <div
                            key={station}
                            className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30"
                          >
                            <Train className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm font-medium truncate">{station}</span>
                          </div>
                        )
                      }

                      return (
                        <Link
                          key={station}
                          href={`/stations/${stationSlug}`}
                          className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent hover:border-primary transition-colors"
                        >
                          <Train className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{station}</span>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
