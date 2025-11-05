import { Search as SearchIcon, Calendar, FileText, Pill } from "lucide-react"

export function TreatmentFlow() {
  const steps = [
    {
      number: "01",
      icon: SearchIcon,
      title: "クリニックを探す",
      description: "お住まいの地域や駅から、通いやすいクリニックを検索します。"
    },
    {
      number: "02",
      icon: Calendar,
      title: "予約・来院",
      description: "オンラインまたは電話で予約。初診では問診票の記入があります。"
    },
    {
      number: "03",
      icon: FileText,
      title: "医師による診察",
      description: "専門医が症状を診察し、最適な治療プランを提案します。"
    },
    {
      number: "04",
      icon: Pill,
      title: "治療開始",
      description: "処方された薬で治療を開始。定期的な通院で経過を確認します。"
    }
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              治療の流れ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              初めての方でも安心。4つのステップで治療を始められます
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
                )}

                <div className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-md transition-all text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                    STEP {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              ※クリニックによって流れが異なる場合があります
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
