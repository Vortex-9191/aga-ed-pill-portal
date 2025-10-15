import Link from "next/link"
import { Train } from "lucide-react"
import { getStationSlug } from "@/lib/data/stations"

// Top 100 stations from database (with 2+ clinics each)
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
  { name: "八王子駅", clinics: 13 },
  { name: "名古屋駅", clinics: 13 },
  { name: "和歌山駅", clinics: 13 },
  { name: "札幌駅", clinics: 12 },
  { name: "天王寺駅", clinics: 12 },
  { name: "飯田橋駅", clinics: 12 },
  { name: "本厚木駅", clinics: 12 },
  { name: "京橋駅", clinics: 11 },
  { name: "五反田駅", clinics: 11 },
  { name: "表参道駅", clinics: 11 },
  { name: "川崎駅", clinics: 11 },
  { name: "大久保駅", clinics: 11 },
  { name: "大橋駅", clinics: 11 },
  { name: "宇都宮駅", clinics: 10 },
  { name: "四条駅", clinics: 10 },
  { name: "烏丸駅", clinics: 10 },
  { name: "蒲田駅", clinics: 10 },
  { name: "茅ケ崎駅", clinics: 10 },
  { name: "吉祥寺駅", clinics: 10 },
  { name: "高円寺駅", clinics: 10 },
  { name: "恵比寿駅", clinics: 10 },
  { name: "高崎駅", clinics: 10 },
  { name: "高田馬場駅", clinics: 10 },
  { name: "佐賀駅", clinics: 10 },
  { name: "市川駅", clinics: 10 },
  { name: "秋田駅", clinics: 10 },
  { name: "松江駅", clinics: 10 },
  { name: "代々木駅", clinics: 10 },
  { name: "神田駅", clinics: 10 },
  { name: "船橋駅", clinics: 10 },
  { name: "相模大野駅", clinics: 10 },
  { name: "大通駅", clinics: 10 },
  { name: "立川駅", clinics: 10 },
  { name: "銀座駅", clinics: 9 },
  { name: "センター南駅", clinics: 9 },
  { name: "郡山駅", clinics: 9 },
  { name: "御茶ノ水駅", clinics: 9 },
  { name: "三国ケ丘駅", clinics: 9 },
  { name: "鹿児島中央駅", clinics: 9 },
  { name: "上大岡駅", clinics: 9 },
  { name: "新横浜駅", clinics: 9 },
  { name: "大和八木駅", clinics: 9 },
  { name: "日本橋駅", clinics: 9 },
  { name: "柏駅", clinics: 9 },
  { name: "茨木市駅", clinics: 8 },
  { name: "宮崎駅", clinics: 8 },
  { name: "近鉄四日市駅", clinics: 8 },
  { name: "金沢駅", clinics: 8 },
  { name: "経堂駅", clinics: 8 },
  { name: "元住吉駅", clinics: 8 },
  { name: "溝の口駅", clinics: 8 },
  { name: "高槻駅", clinics: 8 },
  { name: "自由が丘駅", clinics: 8 },
  { name: "住吉駅", clinics: 8 },
  { name: "十三駅", clinics: 8 },
  { name: "春日部駅", clinics: 8 },
  { name: "沼津駅", clinics: 8 },
  { name: "新居浜駅", clinics: 8 },
  { name: "西条駅", clinics: 8 },
  { name: "赤坂駅", clinics: 8 },
  { name: "川名駅", clinics: 8 },
  { name: "中津駅", clinics: 8 },
  { name: "長岡駅", clinics: 8 },
  { name: "鶴見駅", clinics: 8 },
  { name: "徳島駅", clinics: 8 },
  { name: "南森町駅", clinics: 8 },
  { name: "尼崎駅", clinics: 8 },
  { name: "用賀駅", clinics: 8 },
  { name: "和泉府中駅", clinics: 8 },
  { name: "なんば駅", clinics: 7 },
  { name: "いわき駅", clinics: 7 },
  { name: "ときわ台駅", clinics: 7 },
  { name: "阿佐ケ谷駅", clinics: 7 },
  { name: "伊勢原駅", clinics: 7 },
  { name: "岡町駅", clinics: 7 },
  { name: "下北沢駅", clinics: 7 },
  { name: "京都駅", clinics: 7 },
  { name: "錦糸町駅", clinics: 7 },
  { name: "戸塚駅", clinics: 7 },
  { name: "虎ノ門駅", clinics: 7 },
  { name: "呉駅", clinics: 7 },
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
