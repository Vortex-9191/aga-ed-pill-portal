import { Shield, Clock, UserCheck, Smartphone } from "lucide-react"

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Shield,
      title: "信頼できる医療機関のみ",
      description: "厳選された専門クリニックのみを掲載。すべて医師が在籍する正規の医療機関です。"
    },
    {
      icon: Clock,
      title: "24時間予約可能",
      description: "オンライン予約システムで、いつでもお好きな時間に予約が可能です。"
    },
    {
      icon: UserCheck,
      title: "専門医による診察",
      description: "AGA・ED治療の専門知識を持つ医師が、一人ひとりに合った治療プランを提案します。"
    },
    {
      icon: Smartphone,
      title: "オンライン診療対応",
      description: "通院が難しい方でも、オンラインで診察から処方まで完結できるクリニックも掲載。"
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-primary/5 to-white">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              選ばれる理由
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              安心・安全な治療をサポートするための4つのポイント
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary group-hover:to-primary/90 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-inner">
                    <reason.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
