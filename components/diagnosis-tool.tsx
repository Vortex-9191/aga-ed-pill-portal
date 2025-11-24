"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, CheckCircle2, HelpCircle } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  question: string
  options: {
    value: string
    label: string
    recommendation?: string
  }[]
}

const questions: Question[] = [
  {
    id: "concern",
    question: "主なお悩みは何ですか？",
    options: [
      { value: "hairloss", label: "薄毛・抜け毛が気になる", recommendation: "AGA治療" },
      { value: "thinning", label: "髪のボリュームが減った", recommendation: "AGA治療" },
      { value: "both", label: "薄毛とED両方", recommendation: "総合治療" },
    ],
  },
  {
    id: "urgency",
    question: "治療の緊急度は？",
    options: [
      { value: "immediate", label: "すぐに治療を始めたい" },
      { value: "soon", label: "1ヶ月以内に開始したい" },
      { value: "consulting", label: "まずは相談したい" },
    ],
  },
  {
    id: "preference",
    question: "通院の希望条件は？",
    options: [
      { value: "weekend", label: "土日診療可能" },
      { value: "evening", label: "平日夜間診療可能" },
      { value: "station", label: "駅近で通いやすい" },
    ],
  },
]

export function DiagnosisTool() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[step]
  const isLastStep = step === questions.length - 1

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleNext = () => {
    if (isLastStep) {
      setShowResults(true)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleReset = () => {
    setStep(0)
    setAnswers({})
    setShowResults(false)
  }

  const getRecommendationParams = () => {
    const params = new URLSearchParams()

    if (answers.preference === 'weekend') {
      params.set('weekend', 'true')
    } else if (answers.preference === 'evening') {
      params.set('evening', 'true')
    }

    return params.toString()
  }

  if (showResults) {
    const concernAnswer = questions[0].options.find(o => o.value === answers.concern)

    return (
      <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            診断結果
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-background rounded-lg p-4 space-y-3">
            <p className="font-medium text-lg">
              あなたにおすすめの治療：
              <span className="text-primary ml-2">{concernAnswer?.recommendation}</span>
            </p>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>ご回答いただいた内容から、以下の条件でクリニックを探すことをおすすめします：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                {answers.urgency === 'immediate' && (
                  <li>予約が取りやすいクリニック</li>
                )}
                {answers.preference === 'weekend' && (
                  <li>土日診療対応のクリニック</li>
                )}
                {answers.preference === 'evening' && (
                  <li>平日夜間診療対応のクリニック</li>
                )}
                {answers.preference === 'station' && (
                  <li>駅から徒歩5分以内のクリニック</li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link href={`/search?${getRecommendationParams()}`}>
                おすすめクリニックを見る
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" onClick={handleReset}>
              診断をやり直す
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          あなたに合ったクリニック診断
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          3つの質問に答えて、最適なクリニックを見つけましょう
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">質問 {step + 1} / {questions.length}</span>
            <span className="text-muted-foreground">{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>

          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswer}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              戻る
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="flex-1 gap-2"
          >
            {isLastStep ? '結果を見る' : '次へ'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
