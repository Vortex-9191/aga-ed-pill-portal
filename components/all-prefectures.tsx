import Link from "next/link"
import { MapPin } from "lucide-react"

const regions = [
  {
    name: "関東",
    prefectures: [
      { name: "東京都", slug: "tokyo" },
      { name: "神奈川県", slug: "kanagawa" },
      { name: "埼玉県", slug: "saitama" },
      { name: "千葉県", slug: "chiba" },
      { name: "茨城県", slug: "ibaraki" },
      { name: "栃木県", slug: "tochigi" },
      { name: "群馬県", slug: "gunma" },
    ],
  },
  {
    name: "関西",
    prefectures: [
      { name: "大阪府", slug: "osaka" },
      { name: "兵庫県", slug: "hyogo" },
      { name: "京都府", slug: "kyoto" },
      { name: "奈良県", slug: "nara" },
      { name: "滋賀県", slug: "shiga" },
      { name: "和歌山県", slug: "wakayama" },
    ],
  },
  {
    name: "中部",
    prefectures: [
      { name: "愛知県", slug: "aichi" },
      { name: "静岡県", slug: "shizuoka" },
      { name: "岐阜県", slug: "gifu" },
      { name: "長野県", slug: "nagano" },
      { name: "新潟県", slug: "niigata" },
      { name: "富山県", slug: "toyama" },
      { name: "石川県", slug: "ishikawa" },
      { name: "福井県", slug: "fukui" },
      { name: "山梨県", slug: "yamanashi" },
    ],
  },
  {
    name: "九州・沖縄",
    prefectures: [
      { name: "福岡県", slug: "fukuoka" },
      { name: "熊本県", slug: "kumamoto" },
      { name: "鹿児島県", slug: "kagoshima" },
      { name: "長崎県", slug: "nagasaki" },
      { name: "大分県", slug: "oita" },
      { name: "宮崎県", slug: "miyazaki" },
      { name: "佐賀県", slug: "saga" },
      { name: "沖縄県", slug: "okinawa" },
    ],
  },
  {
    name: "北海道・東北",
    prefectures: [
      { name: "北海道", slug: "hokkaido" },
      { name: "宮城県", slug: "miyagi" },
      { name: "福島県", slug: "fukushima" },
      { name: "青森県", slug: "aomori" },
      { name: "岩手県", slug: "iwate" },
      { name: "秋田県", slug: "akita" },
      { name: "山形県", slug: "yamagata" },
    ],
  },
  {
    name: "中国・四国",
    prefectures: [
      { name: "広島県", slug: "hiroshima" },
      { name: "岡山県", slug: "okayama" },
      { name: "山口県", slug: "yamaguchi" },
      { name: "愛媛県", slug: "ehime" },
      { name: "香川県", slug: "kagawa" },
      { name: "徳島県", slug: "tokushima" },
      { name: "高知県", slug: "kochi" },
      { name: "鳥取県", slug: "tottori" },
      { name: "島根県", slug: "shimane" },
    ],
  },
]

export function AllPrefectures() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">全国の都道府県から探す</h2>
          <p className="text-muted-foreground">お住まいの地域のクリニックを探せます</p>
        </div>

        <div className="mx-auto max-w-6xl space-y-8">
          {regions.map((region) => (
            <div key={region.name}>
              <h3 className="mb-4 text-xl font-semibold text-foreground">{region.name}</h3>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {region.prefectures.map((prefecture) => (
                  <Link
                    key={prefecture.slug}
                    href={`/areas/${prefecture.slug}`}
                    className="group flex items-center justify-center rounded-lg border border-border bg-card p-3 transition-all hover:border-[#FF6B6B] hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE5E5] text-[#FF6B6B] transition-colors group-hover:bg-[#FF6B6B] group-hover:text-white">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="font-medium text-sm text-foreground group-hover:text-[#FF6B6B]">
                        {prefecture.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
    </section>
  )
}
