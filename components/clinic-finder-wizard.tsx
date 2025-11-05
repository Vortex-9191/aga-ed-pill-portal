"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  question: string
  options: {
    label: string
    value: string
    description?: string
  }[]
}

const questions: Question[] = [
  {
    id: "hair_loss_stage",
    question: "薄毛が気になり始めたのはいつ頃ですか？",
    options: [
      { label: "最近気になり始めた", value: "recent", description: "半年〜1年以内" },
      { label: "1〜3年前から", value: "1-3years", description: "徐々に進行している" },
      { label: "かなり以前から", value: "long", description: "3年以上" },
    ],
  },
  {
    id: "hair_loss_area",
    question: "どの部分の薄毛が気になりますか？",
    options: [
      { label: "生え際・M字部分", value: "hairline", description: "前頭部の後退" },
      { label: "頭頂部・つむじ", value: "crown", description: "O字型の薄毛" },
      { label: "生え際と頭頂部の両方", value: "both", description: "複数箇所が気になる" },
      { label: "全体的に薄くなった", value: "overall", description: "髪のボリューム減少" },
    ],
  },
  {
    id: "family_history",
    question: "ご家族に薄毛の方はいらっしゃいますか？",
    options: [
      { label: "父親・父方の祖父", value: "paternal", description: "父方に薄毛の家系" },
      { label: "母親・母方の祖父", value: "maternal", description: "母方に薄毛の家系" },
      { label: "両方にいる", value: "both", description: "両親どちらにもいる" },
      { label: "いない・わからない", value: "none" },
    ],
  },
  {
    id: "treatment_goal",
    question: "治療の目的は何ですか？",
    options: [
      { label: "現状維持・進行を止めたい", value: "maintain", description: "これ以上薄くならないように" },
      { label: "発毛・増毛したい", value: "regrow", description: "髪を増やしたい" },
      { label: "予防したい", value: "prevent", description: "将来の薄毛予防" },
    ],
  },
  {
    id: "consultation_type",
    question: "どのような診療形態を希望しますか？",
    options: [
      { label: "オンライン診療", value: "online", description: "自宅で完結・通院不要" },
      { label: "対面診療", value: "in_person", description: "クリニックで直接診察" },
      { label: "どちらでもよい", value: "either", description: "状況に応じて選びたい" },
    ],
  },
  {
    id: "schedule",
    question: "希望する受診時間帯は？",
    options: [
      { label: "平日の日中", value: "weekday_day", description: "9:00-17:00" },
      { label: "平日の夕方以降", value: "weekday_evening", description: "18:00以降" },
      { label: "土日祝日", value: "weekend", description: "休日の受診を希望" },
      { label: "時間帯は問わない", value: "any" },
    ],
  },
  {
    id: "priority",
    question: "最も重視するポイントは？",
    options: [
      { label: "実績・口コミ評価", value: "reputation", description: "信頼できるクリニック" },
      { label: "治療費の安さ", value: "cost", description: "コストパフォーマンス重視" },
      { label: "アクセスの良さ", value: "access", description: "通いやすさ重視" },
      { label: "プライバシー配慮", value: "privacy", description: "人目を気にせず通える" },
    ],
  },
]

interface ClinicFinderWizardProps {
  onComplete?: (answers: Record<string, string>) => void
}

export function ClinicFinderWizard({ onComplete }: ClinicFinderWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 100)
    } else {
      setTimeout(() => {
        setShowResults(true)
        onComplete?.(newAnswers)
      }, 100)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    return (
      <Card className="border-primary bg-gradient-to-br from-white to-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">診断が完了しました</CardTitle>
          </div>
          <CardDescription className="text-base">
            あなたに合ったAGAクリニックを探しましょう
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">AGA治療について</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <p className="font-medium">早期治療が効果的</p>
                  <p className="text-sm text-muted-foreground">薄毛が進行する前に始めることが重要です</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <p className="font-medium">専門医による診察</p>
                  <p className="text-sm text-muted-foreground">AGA専門医が適切な治療法を提案します</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <p className="font-medium">オンライン診療も可能</p>
                  <p className="text-sm text-muted-foreground">自宅にいながら診察・処方が受けられます</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                <div>
                  <p className="font-medium">継続治療で効果を実感</p>
                  <p className="text-sm text-muted-foreground">多くの方が3〜6ヶ月で効果を実感しています</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1"
              asChild
            >
              <a href="/search">
                おすすめのクリニックを探す
              </a>
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="sm:w-auto"
            >
              もう一度診断する
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary">
      <CardHeader>
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>質問 {currentStep + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        <CardDescription>
          あなたに最適なAGAクリニックを見つけるため、以下から選択してください
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              variant="outline"
              className={cn(
                "w-full justify-start text-left h-auto py-4 px-4 transition-all",
                "hover:border-primary hover:bg-primary/5",
                "active:bg-primary/5",
                answers[currentQuestion.id] === option.value && "border-primary bg-primary/5"
              )}
            >
              <div className="flex-1">
                <div className={cn(
                  "font-medium text-foreground",
                  answers[currentQuestion.id] === option.value && "text-primary"
                )}>
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </div>
                )}
              </div>
              <ChevronRight className={cn(
                "h-5 w-5 ml-2 transition-colors",
                answers[currentQuestion.id] === option.value ? "text-primary" : "text-muted-foreground"
              )} />
            </Button>
          ))}
        </div>

        {currentStep > 0 && (
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mt-6"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            前の質問に戻る
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
