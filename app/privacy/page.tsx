import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー | 全国精神科ドットコム",
  description: "全国精神科ドットコムのプライバシーポリシー。個人情報の取り扱いについて説明しています。",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">個人情報の取り扱いについて</h2>
              <p className="text-muted-foreground mb-4">
                全国精神科ドットコム（以下「当サイト」）は、ユーザーの個人情報保護の重要性について認識し、個人情報の保護に関する法律（以下「個人情報保護法」）を遵守すると共に、以下のプライバシーポリシー（以下「本ポリシー」）に従い、適切な取扱い及び保護に努めます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. 個人情報の定義</h2>
              <p className="text-muted-foreground mb-4">
                本ポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）、もしくは個人識別符号が含まれる情報を意味するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. 個人情報の収集方法</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは、ユーザーが問い合わせフォームを利用する際に、氏名、メールアドレスなどの個人情報をお尋ねすることがあります。また、クッキー（Cookie）、IPアドレス、その他の技術を利用して、アクセス情報を収集する場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. 個人情報の利用目的</h2>
              <p className="text-muted-foreground mb-4">当サイトは、収集した個人情報を以下の目的で利用します：</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>お問い合わせへの対応</li>
                <li>サービスの提供、維持、保護及び改善</li>
                <li>当サイトに関する規約、ポリシー等の変更等の通知</li>
                <li>サービスに関する情報の提供</li>
                <li>統計データの作成（個人を識別できない形式で利用）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. 個人情報の第三者提供</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは、以下の場合を除き、ユーザーの同意を得ることなく第三者に個人情報を提供することはありません：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>法令に基づく場合</li>
                <li>人の生命、身体又は財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合</li>
                <li>公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難である場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. アクセス解析ツール</h2>
              <p className="text-muted-foreground mb-4">
                当サイトでは、Googleアナリティクスなどのアクセス解析ツールを使用しています。これらのツールはクッキーを使用し、個人を特定する情報を含まずにデータを収集します。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. クッキー（Cookie）について</h2>
              <p className="text-muted-foreground mb-4">
                当サイトでは、一部のコンテンツについてクッキー（Cookie）を利用しています。クッキーとは、サイトにアクセスした際にブラウザに保存される小さなテキストファイルのことで、ユーザーの利便性向上やサイトの改善に役立てています。ブラウザの設定により、クッキーの受け取りを拒否することも可能です。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. 個人情報の開示・訂正・削除</h2>
              <p className="text-muted-foreground mb-4">
                ユーザーは、当サイトに対して、個人情報保護法の定めに従い、個人情報の開示、訂正、削除等を請求することができます。請求を希望される場合は、お問い合わせフォームよりご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. 本ポリシーの変更</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section className="pt-8 border-t">
              <p className="text-muted-foreground">
                制定日：2025年10月29日<br />
                最終更新日：2025年10月29日
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
