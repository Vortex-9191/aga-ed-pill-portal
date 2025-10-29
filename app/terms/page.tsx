import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "利用規約 | 全国精神科ドットコム",
  description: "全国精神科ドットコムの利用規約。サービスのご利用にあたっての規約をご確認ください。",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">利用規約</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground mb-4">
                この利用規約（以下「本規約」）は、全国精神科ドットコム（以下「当サイト」）が提供するサービスの利用条件を定めるものです。ユーザーの皆様には、本規約に従って当サイトをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第1条（適用）</h2>
              <p className="text-muted-foreground mb-4">
                1. 本規約は、ユーザーと当サイトとの間の当サイトの利用に関わる一切の関係に適用されるものとします。<br />
                2. 当サイトは本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下「個別規定」）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。<br />
                3. 本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第2条（利用資格）</h2>
              <p className="text-muted-foreground mb-4">
                ユーザーは、本規約に同意した上で、当サイトを利用するものとします。当サイトの利用を開始した時点で、ユーザーは本規約に同意したものとみなされます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第3条（禁止事項）</h2>
              <p className="text-muted-foreground mb-4">ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません：</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当サイトが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
                <li>当サイトのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他、当サイトが不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第4条（本サービスの提供の停止等）</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当サイトが本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第5条（著作権）</h2>
              <p className="text-muted-foreground mb-4">
                1. 当サイト及び本サービスに関する知的財産権は全て当サイトまたは当サイトにライセンスを許諾している者に帰属しており、本規約に基づく本サービスの利用許諾は、当サイトまたは当サイトにライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。<br />
                2. ユーザーは、当サイトおよび本サービスに関して、複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含む）、伝達、配布、出版その他の方法により、利用・処分してはなりません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第6条（免責事項）</h2>
              <p className="text-muted-foreground mb-4">
                1. 当サイトは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを保証するものではありません。<br />
                2. 当サイトは、本サービスによってユーザーに生じたあらゆる損害について、一切の責任を負いません。ただし、本サービスに関する当サイトとユーザーとの間の契約（本規約を含みます）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。<br />
                3. 当サイトは、本サービスに起因してユーザーに生じたあらゆる損害について、当サイトの故意または重過失による場合を除き、一切の責任を負いません。<br />
                4. 当サイトは、本サービスを通じて提供される医療機関の情報について、その正確性、完全性、有用性について保証するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第7条（サービス内容の変更等）</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第8条（利用規約の変更）</h2>
              <p className="text-muted-foreground mb-4">
                当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の本規約は、当サイトに掲載したときから効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">第9条（準拠法・裁判管轄）</h2>
              <p className="text-muted-foreground mb-4">
                1. 本規約の解釈にあたっては、日本法を準拠法とします。<br />
                2. 本サービスに関して紛争が生じた場合には、当サイトの所在地を管轄する裁判所を専属的合意管轄とします。
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
