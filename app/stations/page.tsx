import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Train } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { createClient } from "@/lib/supabase/server"
import { getStationSlug } from "@/lib/data/stations"
import { StationList } from "@/components/station-list"

// Force dynamic rendering to avoid build-time static generation
export const dynamic = 'force-dynamic'

interface Station {
  name: string
  prefecture: string
  count: number
  slug: string
}

const regions = [
  { name: "北海道・東北", prefectures: ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { name: "関東", prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"] },
  { name: "中部", prefectures: ["愛知県", "静岡県", "岐阜県", "長野県", "新潟県", "富山県", "石川県", "福井県", "山梨県"] },
  { name: "関西", prefectures: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"] },
  { name: "中国・四国", prefectures: ["広島県", "岡山県", "山口県", "愛媛県", "香川県", "徳島県", "高知県", "鳥取県", "島根県"] },
  { name: "九州・沖縄", prefectures: ["福岡県", "熊本県", "鹿児島県", "長崎県", "大分県", "宮崎県", "佐賀県", "沖縄県"] },
]

export default async function StationsPage() {
  const supabase = await createClient()

  // Fetch station counts from clinic_counts table
  const { data: stationCounts, error } = await supabase
    .from("clinic_counts")
    .select("prefecture, station, clinic_count")
    .eq("count_type", "station")
    .not("prefecture", "is", null)
    .not("station", "is", null)

  let stations: Station[] = []

  if (error) {
    console.error('[StationsPage] Error fetching from clinic_counts:', error)
    // Fallback: fetch from clinics table if clinic_counts doesn't exist
    const { data: clinicsData, error: fallbackError } = await supabase
      .from("clinics")
      .select("stations, prefecture")
      .not("stations", "is", null)
      .not("prefecture", "is", null)
      .limit(50000)

    if (!fallbackError && clinicsData) {
      const stationMap = new Map<string, { prefectures: Set<string>; count: number }>()

      clinicsData.forEach((clinic) => {
        if (!clinic.stations) return

        const stationNames = clinic.stations.split(',').map((s: string) => s.trim())

        stationNames.forEach((stationName: string) => {
          if (!stationName) return

          const existing = stationMap.get(stationName)
          if (existing) {
            existing.count++
            existing.prefectures.add(clinic.prefecture)
          } else {
            stationMap.set(stationName, {
              prefectures: new Set([clinic.prefecture]),
              count: 1
            })
          }
        })
      })

      stations = Array.from(stationMap.entries())
        .map(([name, value]) => {
          const prefecture = Array.from(value.prefectures)[0]
          return {
            name,
            prefecture,
            count: value.count,
            slug: getStationSlug(name)
          }
        })
        .filter(station => station.count >= 2)
        .sort((a, b) => a.name.localeCompare(b.name, 'ja'))
    }
  } else {
    // Use clinic_counts data
    stations = (stationCounts || [])
      .map((row: { prefecture: string; station: string; clinic_count: number }) => ({
        name: row.station,
        prefecture: row.prefecture,
        count: row.clinic_count,
        slug: getStationSlug(row.station)
      }))
      .filter(station => station.count >= 2)
      .sort((a, b) => a.name.localeCompare(b.name, 'ja'))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
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
                  <BreadcrumbPage>駅名一覧</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <Train className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">駅名から探す</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              全国{stations.length}駅のクリニック情報を検索できます
            </p>
          </div>
        </div>

        <StationList stations={stations} regions={regions} />
      </main>
      <Footer />
    </div>
  )
}
