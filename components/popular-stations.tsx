import Link from "next/link"
import { Train } from "lucide-react"

const popularStations = [
  { name: "新宿駅", slug: "shinjuku", clinics: 156, prefecture: "東京都" },
  { name: "渋谷駅", slug: "shibuya", clinics: 142, prefecture: "東京都" },
  { name: "池袋駅", slug: "ikebukuro", clinics: 128, prefecture: "東京都" },
  { name: "横浜駅", slug: "yokohama", clinics: 98, prefecture: "神奈川県" },
  { name: "大阪駅", slug: "osaka", clinics: 134, prefecture: "大阪府" },
  { name: "梅田駅", slug: "umeda", clinics: 121, prefecture: "大阪府" },
  { name: "名古屋駅", slug: "nagoya", clinics: 87, prefecture: "愛知県" },
  { name: "札幌駅", slug: "sapporo", clinics: 76, prefecture: "北海道" },
  { name: "福岡駅", slug: "fukuoka", clinics: 65, prefecture: "福岡県" },
  { name: "京都駅", slug: "kyoto", clinics: 54, prefecture: "京都府" },
  { name: "品川駅", slug: "shinagawa", clinics: 89, prefecture: "東京都" },
  { name: "東京駅", slug: "tokyo", clinics: 112, prefecture: "東京都" },
]

export function PopularStations() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">人気の駅から探す</h2>
          <p className="text-muted-foreground">主要駅周辺のクリニックを探せます</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularStations.map((station) => (
              <Link
                key={station.slug}
                href={`/stations/${station.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-[#FF6B6B] hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE5E5] text-[#FF6B6B] transition-colors group-hover:bg-[#FF6B6B] group-hover:text-white">
                    <Train className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground group-hover:text-[#FF6B6B]">{station.name}</div>
                    <div className="text-xs text-muted-foreground">{station.clinics}件</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/stations"
              className="inline-flex items-center gap-2 text-[#FF6B6B] hover:underline font-medium"
            >
              すべての駅を見る
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
