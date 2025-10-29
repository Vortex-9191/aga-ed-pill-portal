import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "口コミガイドライン | 全国精神科ドットコム",
  description: "全国精神科ドットコムの口コミガイドライン。口コミ投稿時のルールと注意事項をご確認ください。",
}

export default function ReviewGuidelinesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">口コミガイドライン</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground mb-4">
                全国精神科ドットコムでは、利用者の皆様が安心して口コミを投稿・閲覧できるよう、以下のガイドラインを設けています。口コミを投稿される際は、必ずこのガイドラインをお読みいただき、ご理解の上でご投稿ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">口コミ投稿の基本方針</h2>
              <p className="text-muted-foreground mb-4">
                口コミは、実際に医療機関を利用された方の率直な感想や体験談を共有していただくことを目的としています。他の利用者の医療機関選びの参考となるよう、建設的で有益な情報の提供にご協力ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">投稿できる方</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>実際に医療機関を利用したご本人</li>
                <li>患者様に同行されたご家族</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">投稿していただきたい内容</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>待ち時間や予約の取りやすさ</li>
                <li>医師やスタッフの対応</li>
                <li>施設の清潔さや雰囲気</li>
                <li>アクセスのしやすさ</li>
                <li>治療内容や診察の様子（個人が特定されない範囲で）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">禁止事項</h2>
              <p className="text-muted-foreground mb-4">以下のような内容を含む口コミは削除の対象となります：</p>

              <h3 className="text-xl font-semibold mb-3 mt-6">1. 個人情報の記載</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>医師やスタッフの個人名（一般に公開されている医師名を除く）</li>
                <li>他の患者様の個人情報</li>
                <li>ご自身の詳細な病歴や個人を特定できる情報</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2. 誹謗中傷や差別的な表現</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>医療機関や医療従事者に対する過度な批判や侮辱</li>
                <li>差別的、攻撃的な表現</li>
                <li>特定の個人や団体への誹謗中傷</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3. 虚偽の情報</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>事実と異なる情報の投稿</li>
                <li>利用していない医療機関についての投稿</li>
                <li>意図的に誤解を招く内容</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">4. 宣伝・営業目的の投稿</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>特定の医療機関を過度に賞賛する内容</li>
                <li>競合する医療機関を貶める内容</li>
                <li>商品やサービスの宣伝</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">5. その他不適切な内容</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>公序良俗に反する内容</li>
                <li>法令に違反する内容</li>
                <li>著作権を侵害する内容</li>
                <li>同じ内容の繰り返し投稿</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">口コミの削除について</h2>
              <p className="text-muted-foreground mb-4">
                当サイトでは、本ガイドラインに違反する口コミを発見した場合、または医療機関からの削除要請があった場合に、予告なく口コミを削除することがあります。削除された口コミについて、個別のご連絡は行っておりません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">ご注意事項</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>投稿された口コミは、当サイトの判断により編集・削除される場合があります</li>
                <li>口コミの内容について、当サイトは一切の責任を負いません</li>
                <li>口コミは投稿者個人の主観的な意見であり、医療機関の客観的な評価を示すものではありません</li>
                <li>医療機関の選択は、口コミだけでなく、複数の情報源を参考にしてください</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">お問い合わせ</h2>
              <p className="text-muted-foreground mb-4">
                口コミガイドラインに関するご質問や、不適切な口コミを発見された場合は、お問い合わせフォームよりご連絡ください。
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
