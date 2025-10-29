import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { Mail, MessageSquare, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "お問い合わせ | 全国精神科ドットコム",
  description: "全国精神科ドットコムへのお問い合わせはこちらから。ご質問やご要望をお聞かせください。",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">お問い合わせ</h1>

          <div className="space-y-8">
            <section className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-[#FF6B6B] mt-1" />
                <div>
                  <h2 className="font-semibold mb-2">お問い合わせの前に</h2>
                  <p className="text-sm text-muted-foreground">
                    よくある質問については
                    <a href="/help" className="text-[#FF6B6B] hover:underline ml-1">ヘルプページ</a>
                    をご確認ください。すぐに解決できる場合があります。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-[#FF6B6B]" />
                お問い合わせ内容
              </h2>
              <p className="text-muted-foreground mb-4">
                以下のような内容について、お問い合わせを受け付けております：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>掲載情報の誤りや修正依頼</li>
                <li>新しいクリニックの掲載依頼</li>
                <li>サイトの使い方に関するご質問</li>
                <li>口コミに関するご報告</li>
                <li>広告掲載に関するお問い合わせ</li>
                <li>その他のご意見・ご要望</li>
              </ul>
            </section>

            <section className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#FF6B6B]" />
                メールでのお問い合わせ
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">メールアドレス：</p>
                  <a
                    href="mailto:info@seishinkaexample.com"
                    className="text-[#FF6B6B] hover:underline text-lg font-medium"
                  >
                    info@seishinkaexample.com
                  </a>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    ※ お問い合わせいただいた内容については、3営業日以内にご返信いたします。<br />
                    ※ 内容によっては、お時間をいただく場合がございます。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">注意事項</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>診療内容や病状に関するご相談は、医療機関に直接お問い合わせください</li>
                <li>クリニックの予約や診療時間の変更については、各クリニックに直接ご連絡ください</li>
                <li>緊急の医療相談は、最寄りの医療機関または救急相談センター（#7119）にご連絡ください</li>
                <li>いただいたお問い合わせ内容は、サービス改善の目的で利用させていただく場合があります</li>
              </ul>
            </section>

            <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                緊急時の対応について
              </h3>
              <p className="text-sm text-muted-foreground">
                自殺念慮がある、またはすぐに医療的支援が必要な場合は、以下の窓口にご連絡ください：
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-4 mt-3">
                <li>こころの健康相談統一ダイヤル：0570-064-556</li>
                <li>よりそいホットライン：0120-279-338</li>
                <li>いのちの電話：0570-783-556</li>
                <li>救急相談センター：#7119</li>
                <li>警察（緊急）：110</li>
                <li>救急車（緊急）：119</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">個人情報の取り扱い</h2>
              <p className="text-muted-foreground">
                お問い合わせの際にご提供いただいた個人情報は、
                <a href="/privacy" className="text-[#FF6B6B] hover:underline">プライバシーポリシー</a>
                に基づき適切に管理し、お問い合わせへの対応以外の目的では使用いたしません。
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
