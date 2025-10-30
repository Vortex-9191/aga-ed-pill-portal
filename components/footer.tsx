import Link from "next/link"

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

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">クリニックを探す</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  検索
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-muted-foreground hover:text-primary transition-colors">
                  地図から探す
                </Link>
              </li>
              <li>
                <Link href="/areas" className="text-muted-foreground hover:text-primary transition-colors">
                  都道府県一覧
                </Link>
              </li>
              <li>
                <Link href="/stations" className="text-muted-foreground hover:text-primary transition-colors">
                  駅一覧
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">サポート</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  ヘルプ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/sitemap-page" className="text-muted-foreground hover:text-primary transition-colors">
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
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/review-guidelines"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  口コミガイドライン
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">メディカルポータル</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              全国のAGA・ED治療、アフターピル処方クリニックを地域・駅・条件で検索できる総合サイトです。オンライン診療対応クリニックも掲載しています。
            </p>
          </div>
        </div>

        {/* All Prefectures Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">都道府県・市区町村から探す</h4>
            <Link
              href="/areas"
              className="text-xs text-primary hover:underline"
            >
              すべて見る →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <div key={region.name}>
                <h5 className="mb-2 text-xs font-semibold text-foreground">{region.name}</h5>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {region.prefectures.map((prefecture) => (
                    <Link
                      key={prefecture.slug}
                      href={`/areas/${prefecture.slug}`}
                      className="text-xs text-muted-foreground hover:text-primary hover:underline"
                    >
                      {prefecture.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links to Stations */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs">
          <Link
            href="/stations"
            className="text-muted-foreground hover:text-primary hover:underline"
          >
            駅名一覧 →
          </Link>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; 2025 メディカルポータル. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
