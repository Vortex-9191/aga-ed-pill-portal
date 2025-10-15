import Link from "next/link"
import { Train } from "lucide-react"

const popularStations = [
  { name: "三鷹駅", clinics: 13 },
  { name: "仙台駅", clinics: 13 },
  { name: "五反田駅", clinics: 11 },
  { name: "京橋駅", clinics: 11 },
  { name: "佐賀駅", clinics: 10 },
  { name: "センター南駅", clinics: 9 },
  { name: "三国ケ丘駅", clinics: 9 },
  { name: "上大岡駅", clinics: 9 },
  { name: "住吉駅", clinics: 9 },
  { name: "中津駅", clinics: 8 },
  { name: "代々木駅", clinics: 8 },
  { name: "伊丹駅", clinics: 8 },
  { name: "いわき駅", clinics: 7 },
  { name: "ときわ台駅", clinics: 7 },
  { name: "なんば駅", clinics: 7 },
  { name: "三軒茶屋駅", clinics: 7 },
  { name: "下北沢駅", clinics: 7 },
  { name: "京都駅", clinics: 7 },
  { name: "伊勢原駅", clinics: 7 },
  { name: "つくば駅", clinics: 6 },
  { name: "三ノ宮駅", clinics: 6 },
  { name: "上飯田駅", clinics: 6 },
  { name: "中央林間駅", clinics: 6 },
  { name: "中目黒駅", clinics: 6 },
  { name: "中野駅", clinics: 6 },
  { name: "亀戸駅", clinics: 6 },
  { name: "二俣川駅", clinics: 6 },
  { name: "今池駅", clinics: 6 },
  { name: "佐世保中央駅", clinics: 6 },
  { name: "たまプラーザ駅", clinics: 5 },
  { name: "バスセンター前駅", clinics: 5 },
  { name: "三島駅", clinics: 5 },
  { name: "三田駅", clinics: 5 },
  { name: "丹波口駅", clinics: 5 },
  { name: "久喜駅", clinics: 5 },
  { name: "久米川駅", clinics: 5 },
  { name: "九段下駅", clinics: 5 },
  { name: "亀有駅", clinics: 5 },
  { name: "五稜郭駅", clinics: 5 },
  { name: "京急蒲田駅", clinics: 5 },
  { name: "人形町駅", clinics: 5 },
  { name: "伏見駅", clinics: 5 },
  { name: "倉吉駅", clinics: 5 },
  { name: "あざみ野駅", clinics: 4 },
  { name: "センター北駅", clinics: 4 },
  { name: "つつじケ丘駅", clinics: 4 },
  { name: "ひばりケ丘駅", clinics: 4 },
  { name: "一ノ関駅", clinics: 4 },
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
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {popularStations.map((station) => (
              <Link
                key={station.name}
                href={`/stations/${station.name.replace('駅', '')}`}
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
