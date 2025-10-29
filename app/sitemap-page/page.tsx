import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"
import { Home, Search, MapPin, Train, FileText, HelpCircle, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "サイトマップ | 全国精神科ドットコム",
  description: "全国精神科ドットコムのサイトマップ。サイト内の全ページへのリンクをご確認いただけます。",
}

export default function SitemapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">サイトマップ</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Home className="h-6 w-6 text-[#FF6B6B]" />
                メインページ
              </h2>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link href="/" className="text-[#FF6B6B] hover:underline">
                    トップページ
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-[#FF6B6B] hover:underline">
                    クリニック検索
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="text-[#FF6B6B] hover:underline">
                    マップから探す
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-[#FF6B6B]" />
                エリア検索
              </h2>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link href="/areas" className="text-[#FF6B6B] hover:underline">
                    都道府県一覧
                  </Link>
                </li>
                <li className="ml-4">
                  <span className="text-muted-foreground text-sm">各都道府県ページ（例）：</span>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>
                      <Link href="/areas/tokyo" className="text-[#FF6B6B] hover:underline text-sm">
                        東京都のクリニック
                      </Link>
                    </li>
                    <li>
                      <Link href="/areas/osaka" className="text-[#FF6B6B] hover:underline text-sm">
                        大阪府のクリニック
                      </Link>
                    </li>
                    <li>
                      <Link href="/areas/kanagawa" className="text-[#FF6B6B] hover:underline text-sm">
                        神奈川県のクリニック
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Train className="h-6 w-6 text-[#FF6B6B]" />
                駅検索
              </h2>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link href="/stations" className="text-[#FF6B6B] hover:underline">
                    駅名一覧
                  </Link>
                </li>
                <li className="ml-4">
                  <span className="text-muted-foreground text-sm">各駅のページ（例）：</span>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>
                      <span className="text-sm text-muted-foreground">
                        /stations/[駅名] で各駅のクリニックを表示
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Search className="h-6 w-6 text-[#FF6B6B]" />
                クリニック詳細
              </h2>
              <ul className="space-y-2 ml-8">
                <li>
                  <span className="text-muted-foreground text-sm">
                    各クリニックの詳細ページ： /clinics/[クリニックID]
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-[#FF6B6B]" />
                ポリシー・規約
              </h2>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link href="/privacy" className="text-[#FF6B6B] hover:underline">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#FF6B6B] hover:underline">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="/review-guidelines" className="text-[#FF6B6B] hover:underline">
                    口コミガイドライン
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-[#FF6B6B]" />
                サポート
              </h2>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link href="/help" className="text-[#FF6B6B] hover:underline">
                    ヘルプ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#FF6B6B] hover:underline">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap-page" className="text-[#FF6B6B] hover:underline">
                    サイトマップ
                  </Link>
                </li>
              </ul>
            </section>

            <section className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">お探しのページが見つからない場合</h2>
              <p className="text-muted-foreground mb-4">
                サイト内検索をご利用いただくか、お問い合わせフォームよりご連絡ください。
              </p>
              <div className="flex gap-4">
                <Link
                  href="/search"
                  className="inline-block bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#FF5555] transition-colors"
                >
                  クリニック検索
                </Link>
                <Link
                  href="/contact"
                  className="inline-block border border-[#FF6B6B] text-[#FF6B6B] px-6 py-2 rounded-lg hover:bg-[#FF6B6B] hover:text-white transition-colors"
                >
                  お問い合わせ
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
