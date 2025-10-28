import Link from "next/link"
import { Train } from "lucide-react"
import { getStationSlug } from "@/lib/data/stations"

// Top 20 stations from database (by clinic count)
const popularStations = [
  { name: "岡山駅", clinics: 26 },
  { name: "福島駅", clinics: 19 },
  { name: "横浜駅", clinics: 18 },
  { name: "新宿駅", clinics: 18 },
  { name: "元町駅", clinics: 16 },
  { name: "さっぽろ駅", clinics: 15 },
  { name: "渋谷駅", clinics: 15 },
  { name: "大宮駅", clinics: 15 },
  { name: "池袋駅", clinics: 15 },
  { name: "町田駅", clinics: 15 },
  { name: "藤沢駅", clinics: 15 },
  { name: "国分寺駅", clinics: 14 },
  { name: "烏丸御池駅", clinics: 13 },
  { name: "三鷹駅", clinics: 13 },
  { name: "静岡駅", clinics: 13 },
  { name: "仙台駅", clinics: 13 },
  { name: "大阪梅田駅", clinics: 13 },
  { name: "天神駅", clinics: 13 },
  { name: "博多駅", clinics: 13 },
  { name: "名古屋駅", clinics: 13 },
]

export function PopularStations() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">人気の駅から探す</h2>
          <p className="text-muted-foreground">主要駅周辺のクリニックを探せます</p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {popularStations.map((station) => {
              const slug = getStationSlug(station.name)

              // If no slug, render as non-clickable
              if (!slug) {
                return (
                  <div
                    key={station.name}
                    className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-2 text-sm opacity-60"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 flex-shrink-0">
                      <Train className="h-3 w-3 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-muted-foreground truncate text-xs">{station.name}</div>
                      <div className="text-[10px] text-muted-foreground">{station.clinics}件</div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={station.name}
                  href={`/stations/${slug}`}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-card p-2 transition-all hover:border-[#FF6B6B] hover:shadow-sm text-sm"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE5E5] text-[#FF6B6B] transition-colors group-hover:bg-[#FF6B6B] group-hover:text-white flex-shrink-0">
                    <Train className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground group-hover:text-[#FF6B6B] truncate text-xs">{station.name}</div>
                    <div className="text-[10px] text-muted-foreground">{station.clinics}件</div>
                  </div>
                </Link>
              )
            })}
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
