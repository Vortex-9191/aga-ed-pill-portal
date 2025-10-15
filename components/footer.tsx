import Link from "next/link"
import { getStationSlug } from "@/lib/data/stations"

const municipalities = [
  { name: "新宿区", slug: "shinjuku-ku" },
  { name: "渋谷区", slug: "shibuya-ku" },
  { name: "港区", slug: "minato-ku" },
  { name: "世田谷区", slug: "setagaya-ku" },
  { name: "品川区", slug: "shinagawa-ku" },
  { name: "千代田区", slug: "chiyoda-ku" },
  { name: "横浜市中区", slug: "yokohama-naka" },
  { name: "大阪市北区", slug: "osaka-kita" },
  { name: "名古屋市中区", slug: "nagoya-naka" },
  { name: "福岡市博多区", slug: "fukuoka-hakata" },
  { name: "札幌市中央区", slug: "sapporo-chuo" },
  { name: "京都市中京区", slug: "kyoto-nakagyo" },
]

const stations = [
  "三鷹駅", "仙台駅", "五反田駅", "京橋駅", "佐賀駅", "センター南駅", "三国ケ丘駅", "上大岡駅",
  "住吉駅", "中津駅", "代々木駅", "伊丹駅", "いわき駅", "ときわ台駅", "なんば駅", "三軒茶屋駅",
  "下北沢駅", "京都駅", "伊勢原駅", "つくば駅", "三ノ宮駅", "上飯田駅", "中央林間駅", "中目黒駅",
  "中野駅", "亀戸駅", "二俣川駅", "今池駅", "佐世保中央駅", "たまプラーザ駅", "バスセンター前駅",
  "三島駅", "三田駅", "丹波口駅", "久喜駅", "久米川駅", "九段下駅", "亀有駅", "五稜郭駅",
  "京急蒲田駅", "人形町駅", "伏見駅", "倉吉駅", "あざみ野駅", "センター北駅", "つつじケ丘駅",
  "ひばりケ丘駅", "一ノ関駅"
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">精神科・心療内科を探す</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  検索
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-foreground transition-colors">
                  地図から探す
                </Link>
              </li>
              <li>
                <Link href="/areas" className="text-muted-foreground hover:text-foreground transition-colors">
                  エリア一覧
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-muted-foreground hover:text-foreground transition-colors">
                  市区町村一覧
                </Link>
              </li>
              <li>
                <Link href="/stations" className="text-muted-foreground hover:text-foreground transition-colors">
                  駅名一覧
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">サポート</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  ヘルプ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-muted-foreground hover:text-foreground transition-colors">
                  サイトマップ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">ポリシー</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/policies/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/reviews"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  口コミガイドライン
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">全国精神科ドットコム</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              全国の精神科・心療内科を地域・駅・条件で検索できる総合サイトです。診療時間や詳細情報、予約リンクを掲載しています。
            </p>
          </div>
        </div>

        {/* All Municipalities Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <h4 className="mb-3 text-xs font-semibold text-foreground">市区町村から探す</h4>
          <div className="flex flex-wrap gap-2">
            {municipalities.map((municipality) => (
              <Link
                key={municipality.slug}
                href={`/cities/${municipality.slug}`}
                className="text-xs text-muted-foreground hover:text-foreground hover:underline"
              >
                {municipality.name}
              </Link>
            ))}
          </div>
        </div>

        {/* All Stations Section */}
        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold text-foreground">駅名から探す</h4>
          <div className="flex flex-wrap gap-2">
            {stations.map((station) => {
              const stationSlug = getStationSlug(station)

              // If no slug mapping, render as plain text
              if (!stationSlug) {
                return (
                  <span key={station} className="text-xs text-muted-foreground">
                    {station}
                  </span>
                )
              }

              // Render as clickable link with English slug
              return (
                <Link
                  key={station}
                  href={`/stations/${stationSlug}`}
                  className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                >
                  {station}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; 2025 全国精神科ドットコム. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
