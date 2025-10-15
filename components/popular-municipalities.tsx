import Link from "next/link"
import { MapPin } from "lucide-react"

const popularMunicipalities = [
  { name: "新宿区", slug: "shinjuku-ku", clinics: 245, prefecture: "東京都" },
  { name: "渋谷区", slug: "shibuya-ku", clinics: 218, prefecture: "東京都" },
  { name: "港区", slug: "minato-ku", clinics: 198, prefecture: "東京都" },
  { name: "世田谷区", slug: "setagaya-ku", clinics: 187, prefecture: "東京都" },
  { name: "横浜市中区", slug: "yokohama-naka", clinics: 156, prefecture: "神奈川県" },
  { name: "大阪市北区", slug: "osaka-kita", clinics: 234, prefecture: "大阪府" },
  { name: "名古屋市中区", slug: "nagoya-naka", clinics: 143, prefecture: "愛知県" },
  { name: "福岡市博多区", slug: "fukuoka-hakata", clinics: 128, prefecture: "福岡県" },
  { name: "札幌市中央区", slug: "sapporo-chuo", clinics: 112, prefecture: "北海道" },
  { name: "京都市中京区", slug: "kyoto-nakagyo", clinics: 98, prefecture: "京都府" },
  { name: "品川区", slug: "shinagawa-ku", clinics: 165, prefecture: "東京都" },
  { name: "千代田区", slug: "chiyoda-ku", clinics: 142, prefecture: "東京都" },
]

export function PopularMunicipalities() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">人気の市区町村から探す</h2>
          <p className="text-muted-foreground">主要エリアのクリニックを探せます</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularMunicipalities.map((municipality) => (
              <Link
                key={municipality.slug}
                href={`/cities/${municipality.slug}`}
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
              href="/cities"
              className="inline-flex items-center gap-2 text-[#FF6B6B] hover:underline font-medium"
            >
              すべての市区町村を見る
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
