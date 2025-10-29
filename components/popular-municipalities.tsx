import Link from "next/link"
import { MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { getMunicipalitySlug } from "@/lib/data/municipalities"

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

export async function PopularMunicipalities() {
  const supabase = await createClient()

  // Get top 10 municipalities by clinic count from clinic_counts table
  const { data: municipalityCounts, error } = await supabase
    .from("clinic_counts")
    .select("prefecture, municipality, clinic_count")
    .eq("count_type", "municipality")
    .not("prefecture", "is", null)
    .not("municipality", "is", null)
    .order("clinic_count", { ascending: false })
    .limit(10)

  let topMunicipalities: Array<{
    name: string
    prefecture: string
    clinics: number
    slug: string | null
    prefectureSlug: string
  }> = []

  if (error) {
    console.error('[PopularMunicipalities] Error fetching from clinic_counts:', error)
    // Fallback: fetch from clinics table if clinic_counts doesn't exist
    const { data: municipalitiesData } = await supabase
      .from("clinics")
      .select("municipalities, prefecture")
      .not("municipalities", "is", null)
      .not("prefecture", "is", null)

    if (municipalitiesData) {
      const municipalityMap = new Map<string, { prefecture: string; count: number }>()
      municipalitiesData.forEach((clinic) => {
        const key = `${clinic.prefecture}|${clinic.municipalities}`
        const existing = municipalityMap.get(key)
        if (existing) {
          existing.count++
        } else {
          municipalityMap.set(key, { prefecture: clinic.prefecture, count: 1 })
        }
      })

      topMunicipalities = Array.from(municipalityMap.entries())
        .map(([key, value]) => {
          const [prefecture, municipality] = key.split("|")
          return {
            name: municipality,
            prefecture,
            clinics: value.count,
            slug: getMunicipalitySlug(municipality),
            prefectureSlug: prefectureSlugMap[prefecture]
          }
        })
        .filter((m) => m.slug && m.prefectureSlug)
        .sort((a, b) => b.clinics - a.clinics)
        .slice(0, 10)
    }
  } else {
    // Use clinic_counts data
    topMunicipalities = (municipalityCounts || [])
      .map((row: { prefecture: string; municipality: string; clinic_count: number }) => ({
        name: row.municipality,
        prefecture: row.prefecture,
        clinics: row.clinic_count,
        slug: getMunicipalitySlug(row.municipality),
        prefectureSlug: prefectureSlugMap[row.prefecture]
      }))
      .filter((m) => m.slug && m.prefectureSlug)
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">人気の市区町村から探す</h2>
          <p className="text-muted-foreground">主要エリアのクリニックを探せます</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {topMunicipalities.map((municipality) => (
              <Link
                key={`${municipality.prefectureSlug}-${municipality.slug}`}
                href={`/areas/${municipality.prefectureSlug}/${encodeURIComponent(municipality.name)}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-[#FF6B6B] hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE5E5] text-[#FF6B6B] transition-colors group-hover:bg-[#FF6B6B] group-hover:text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground group-hover:text-[#FF6B6B]">{municipality.name}</div>
                    <div className="text-xs text-muted-foreground">{municipality.clinics}件</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 text-[#FF6B6B] hover:underline font-medium"
            >
              すべてのエリアを見る
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
