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
    id: "visit_type",
    question: "受診は初めてですか？",
    options: [
      { label: "初めて受診します", value: "first", description: "精神科・心療内科は初めて" },
      { label: "他院から転院を検討", value: "transfer", description: "別のクリニックに通っている" },
      { label: "再診・継続治療", value: "continue", description: "以前通院していた" },
    ],
  },
  {
    id: "symptoms",
    question: "どのような症状でお悩みですか？",
    options: [
      { label: "気分の落ち込み・うつ状態", value: "depression" },
      { label: "不安・パニック症状", value: "anxiety" },
      { label: "不眠・睡眠の問題", value: "insomnia" },
      { label: "仕事や学校のストレス", value: "stress" },
      { label: "その他の症状", value: "other" },
    ],
  },
  {
    id: "frequency",
    question: "通院頻度はどれくらいを想定していますか？",
    options: [
      { label: "週1回以上", value: "weekly", description: "集中的な治療を希望" },
      { label: "月2-3回", value: "biweekly", description: "定期的な通院" },
      { label: "月1回程度", value: "monthly", description: "維持療法・経過観察" },
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
    id: "distance",
    question: "クリニックまでの距離は？",
    options: [
      { label: "自宅から徒歩圏内", value: "walking", description: "15分以内" },
      { label: "電車で30分以内", value: "transit_30", description: "通いやすい範囲" },
      { label: "距離は気にしない", value: "any", description: "良いクリニックなら遠くても" },
    ],
  },
  {
    id: "director",
    question: "院長・ベテラン医師の診察を希望しますか？",
    options: [
      { label: "院長の診察を希望", value: "yes", description: "経験豊富な医師に診てほしい" },
      { label: "どちらでもよい", value: "no_preference" },
    ],
  },
  {
    id: "priority",
    question: "最も重視するポイントは？",
    options: [
      { label: "実績・口コミ評価", value: "reputation", description: "信頼できるクリニック" },
      { label: "アクセスの良さ", value: "access", description: "通いやすさ重視" },
      { label: "診療時間の柔軟性", value: "hours", description: "夜間・休日対応" },
      { label: "専門性の高さ", value: "specialty", description: "特定症状に強い" },
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
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    } else {
      setTimeout(() => {
        setShowResults(true)
        onComplete?.(newAnswers)
      }, 300)
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
      <Card className="border-[#FF6B6B] bg-gradient-to-br from-white to-[#FFF5F5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#FF6B6B]" />
            <CardTitle>診断が完了しました</CardTitle>
          </div>
          <CardDescription>
            あなたの回答に基づいて、最適なクリニックを表示しています
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleReset} variant="outline">
            もう一度診断する
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[#FF6B6B]">
      <CardHeader>
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>質問 {currentStep + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF6B6B] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        <CardDescription>
          最適なクリニックを見つけるため、以下から選択してください
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
                "w-full justify-start text-left h-auto py-4 px-4 hover:border-[#FF6B6B] hover:bg-[#FFF5F5] transition-all",
                answers[currentQuestion.id] === option.value && "border-[#FF6B6B] bg-[#FFE5E5]"
              )}
            >
              <div className="flex-1">
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </div>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-2" />
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
