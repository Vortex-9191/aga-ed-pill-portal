import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"
import { Search, MapPin, Star, Clock, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "ヘルプ | 全国精神科ドットコム",
  description: "全国精神科ドットコムの使い方やよくある質問をご確認いただけます。",
}

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">ヘルプ</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">サイトの使い方</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Search className="h-5 w-5 text-[#FF6B6B]" />
                    <h3 className="font-semibold">クリニックを探す</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    トップページの検索バーから、地域名やクリニック名で検索できます。
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-[#FF6B6B]" />
                    <h3 className="font-semibold">エリアから探す</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    都道府県・市区町村・駅名から、お近くのクリニックを探せます。
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="h-5 w-5 text-[#FF6B6B]" />
                    <h3 className="font-semibold">口コミを読む</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    実際に利用された方の口コミを参考にクリニックを選べます。
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-[#FF6B6B]" />
                    <h3 className="font-semibold">診療時間を確認</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    各クリニックの詳細ページで、診療時間や休診日を確認できます。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-[#FF6B6B]" />
                よくある質問
              </h2>

              <div className="space-y-4">
                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">クリニックの情報は正確ですか？</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    掲載されているクリニック情報は、各医療機関の公式情報や公開情報を基に掲載していますが、情報が古くなっている場合があります。必ず事前にクリニックへ直接お問い合わせいただくことをお勧めします。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">予約は必要ですか？</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    クリニックによって予約制度が異なります。初診の場合は特に予約が必要な場合が多いため、事前に電話でご確認ください。各クリニックの詳細ページに電話番号を掲載しています。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">初診時に必要なものは？</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    一般的に、健康保険証、お薬手帳（服薬中の方）、紹介状（ある場合）が必要です。詳細は各クリニックにお問い合わせください。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">オンライン診療は受けられますか？</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    オンライン診療の対応状況はクリニックによって異なります。対応している場合は、各クリニックの詳細ページに記載されています。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">診療費用はどのくらいかかりますか？</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    診療費用は、診察内容や保険適用の有無によって異なります。健康保険適用の場合、3割負担で初診料は概ね2,000〜3,000円程度が目安ですが、詳しくは各クリニックにお問い合わせください。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">土日や夜間に診療しているクリニックはありますか？</summary>
                  <p className="mt-3 text-muted-foreground">
                    検索フィルターで「土日診療」「夜間診療」を選択することで、該当するクリニックを絞り込むことができます。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">口コミを投稿したいのですが？</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    現在、口コミ投稿機能は準備中です。今後実装予定ですので、しばらくお待ちください。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">掲載情報に誤りがある場合は？</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    掲載情報に誤りや古い情報を見つけられた場合は、
                    <Link href="/contact" className="text-[#FF6B6B] hover:underline">お問い合わせフォーム</Link>
                    よりご連絡ください。速やかに確認・修正いたします。
                  </p>
                </details>

                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">新しいクリニックの掲載を依頼したい</summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <Link href="/contact" className="text-[#FF6B6B] hover:underline">お問い合わせフォーム</Link>
                    より、掲載希望のクリニック情報をお送りください。内容を確認の上、掲載させていただきます。
                  </p>
                </details>
              </div>
            </section>

            <section className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">その他のお問い合わせ</h2>
              <p className="text-muted-foreground mb-4">
                上記で解決しない場合は、お問い合わせフォームよりご連絡ください。
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#FF5555] transition-colors"
              >
                お問い合わせはこちら
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
