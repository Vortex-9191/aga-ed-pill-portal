import Link from "next/link"
import { MapPin, ChevronRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

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

const regions = [
  {
    name: "関東",
    prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
  },
  {
    name: "関西",
    prefectures: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"],
  },
  {
    name: "中部",
    prefectures: ["愛知県", "静岡県", "岐阜県", "長野県", "新潟県", "富山県", "石川県", "福井県", "山梨県"],
  },
  {
    name: "九州・沖縄",
    prefectures: ["福岡県", "熊本県", "鹿児島県", "長崎県", "大分県", "宮崎県", "佐賀県", "沖縄県"],
  },
  {
    name: "北海道・東北",
    prefectures: ["北海道", "宮城県", "福島県", "青森県", "岩手県", "秋田県", "山形県"],
  },
  {
    name: "中国・四国",
    prefectures: ["広島県", "岡山県", "山口県", "愛媛県", "香川県", "徳島県", "高知県", "鳥取県", "島根県"],
  },
]

export async function PrefecturesWithCities() {
  const supabase = await createClient()

  // Get all clinics with municipalities and prefecture
  const { data: clinicsData, error } = await supabase
    .from("clinics")
    .select("municipalities, prefecture")
    .not("municipalities", "is", null)
    .not("municipalities", "eq", "")
    .not("prefecture", "is", null)
    .not("prefecture", "eq", "")
    .limit(50000) // Explicitly set high limit to fetch all clinics

  if (error) {
    console.error('Error fetching clinics for prefecture data:', error)
  }

  // Group municipalities by prefecture and count clinics
  const prefectureData = new Map<string, Map<string, number>>()

  clinicsData?.forEach((clinic) => {
    if (!prefectureData.has(clinic.prefecture)) {
      prefectureData.set(clinic.prefecture, new Map())
    }
    const municipalities = prefectureData.get(clinic.prefecture)!
    municipalities.set(
      clinic.municipalities,
      (municipalities.get(clinic.municipalities) || 0) + 1
    )
  })

  // Get top 3 municipalities per prefecture (minimum 2 clinics)
  const prefecturesWithTopCities = new Map<string, Array<{ name: string; count: number }>>()

  prefectureData.forEach((municipalities, prefecture) => {
    const topCities = Array.from(municipalities.entries())
      .map(([name, count]) => ({
        name,
        count
      }))
      .filter(city => city.count >= 2) // Only show municipalities with 2+ clinics
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    if (topCities.length > 0) {
      prefecturesWithTopCities.set(prefecture, topCities)
    }
  })

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">都道府県・市区町村から探す</h2>
          <p className="text-muted-foreground">お住まいの地域のクリニックを探せます</p>
        </div>

        <div className="mx-auto max-w-7xl space-y-10">
          {regions.map((region) => (
            <div key={region.name}>
              <h3 className="mb-5 text-xl font-semibold text-foreground border-l-4 border-[#FF6B6B] pl-3">
                {region.name}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {region.prefectures.map((prefecture) => {
                  const prefectureSlug = prefectureSlugMap[prefecture]
                  const topCities = prefecturesWithTopCities.get(prefecture) || []

                  return (
                    <div
                      key={prefecture}
                      className="rounded-lg border border-border bg-card p-4 transition-all hover:border-[#FF6B6B] hover:shadow-md"
                    >
                      <Link
                        href={`/areas/${prefectureSlug}`}
                        className="group mb-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE5E5] text-[#FF6B6B] transition-colors group-hover:bg-[#FF6B6B] group-hover:text-white">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <h4 className="text-base font-semibold text-foreground group-hover:text-[#FF6B6B]">
                            {prefecture}
                          </h4>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#FF6B6B]" />
                      </Link>

                      {topCities.length > 0 && (
                        <div className="space-y-1.5 border-t border-border pt-3">
                          {topCities.map((city) => (
                            <Link
                              key={city.name}
                              href={`/areas/${prefectureSlug}/${encodeURIComponent(city.name)}`}
                              className="flex items-center justify-between rounded px-2 py-1.5 text-sm transition-colors hover:bg-[#FFE5E5]"
                            >
                              <span className="text-muted-foreground hover:text-[#FF6B6B]">
                                {city.name}
                              </span>
                              <span className="text-xs text-muted-foreground">{city.count}件</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 text-[#FF6B6B] hover:underline font-medium"
          >
            すべてのエリアを見る
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
