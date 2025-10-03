import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">クリニックを探す</h3>
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
                <Link href="/stations" className="text-muted-foreground hover:text-foreground transition-colors">
                  駅名一覧
                </Link>
              </li>
              <li>
                <Link href="/specialties" className="text-muted-foreground hover:text-foreground transition-colors">
                  診療科一覧
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">診療科</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/specialties/internal-medicine"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  内科
                </Link>
              </li>
              <li>
                <Link
                  href="/specialties/pediatrics"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  小児科
                </Link>
              </li>
              <li>
                <Link
                  href="/specialties/dermatology"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  皮膚科
                </Link>
              </li>
              <li>
                <Link
                  href="/specialties/orthopedics"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  整形外科
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
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 クリニック検索ポータル. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
