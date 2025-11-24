"use client"

import { useState, useEffect } from "react"
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  User,
  TrendingUp,
  Wallet,
  Home,
  Lock,
  CheckCircle2,
  ChevronRight,
  Loader2
} from "lucide-react"
import Link from "next/link"

interface QuestionOption {
  label: string
  sub: string
  icon: React.ReactNode
  value: string
}

interface Question {
  id: number
  title: string
  options: QuestionOption[]
}

const diagnosisQuestions: Question[] = [
  {
    id: 1,
    title: "現在の髪の状態・お悩みは？",
    options: [
      {
        label: "将来のために予防したい",
        sub: "抜け毛はまだ気にならない",
        icon: <ShieldCheck size={24} />,
        value: "prevent"
      },
      {
        label: "抜け毛が増えてきた",
        sub: "枕元やシャンプー時が心配",
        icon: <AlertTriangle size={24} />,
        value: "hairloss"
      },
      {
        label: "地肌が透けて見える",
        sub: "セットが決まらなくなった",
        icon: <User size={24} />,
        value: "thinning"
      },
      {
        label: "しっかり発毛させたい",
        sub: "明らかに薄くなっている",
        icon: <TrendingUp size={24} />,
        value: "growth"
      }
    ]
  },
  {
    id: 2,
    title: "クリニック選びで絶対に外せない条件は？",
    options: [
      {
        label: "とにかく費用を抑える",
        sub: "月々の固定費は安く",
        icon: <Wallet size={24} />,
        value: "cost"
      },
      {
        label: "発毛実績・効果重視",
        sub: "高くても確実に治したい",
        icon: <Sparkles size={24} />,
        value: "effectiveness"
      },
      {
        label: "通院の手間なし",
        sub: "オンラインで完結したい",
        icon: <Home size={24} />,
        value: "online"
      },
      {
        label: "プライバシー重視",
        sub: "誰にも会いたくない",
        icon: <Lock size={24} />,
        value: "privacy"
      }
    ]
  },
  {
    id: 3,
    title: "希望する治療の予算感は？",
    options: [
      {
        label: "〜5,000円/月",
        sub: "手軽に始めたい",
        icon: "¥",
        value: "low"
      },
      {
        label: "〜15,000円/月",
        sub: "標準的な治療",
        icon: "¥¥",
        value: "medium"
      },
      {
        label: "予算は問わない",
        sub: "最良の治療を受けたい",
        icon: "¥¥¥",
        value: "high"
      }
    ]
  }
]

export function DiagnosisTool() {
  const [diagnosisStep, setDiagnosisStep] = useState(0) // 0:未開始, 1~3:質問, 4:分析中, 5:完了
  const [answers, setAnswers] = useState<Record<number, string>>({})

  // 診断ロジック
  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value })

    // 最後の質問なら分析画面へ
    if (diagnosisStep === diagnosisQuestions.length) {
      setDiagnosisStep(4) // 分析中
      setTimeout(() => {
        setDiagnosisStep(5) // 完了
      }, 1500)
    } else {
      setDiagnosisStep(prev => prev + 1)
    }
  }

  const getRecommendationParams = () => {
    const params = new URLSearchParams()

    // Priority condition mapping
    if (answers[2] === 'online') {
      // Online consultation preferred
      params.set('feature', 'オンライン診療')
    } else if (answers[2] === 'privacy') {
      params.set('feature', '完全個室')
    }

    return params.toString()
  }

  return (
    <div className="mb-10">
      {diagnosisStep === 0 ? (
        // Start Screen
        <div
          className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group cursor-pointer hover:border-teal-400 transition"
          onClick={() => setDiagnosisStep(1)}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition duration-500">
              <Sparkles size={32} />
            </div>
            <div className="flex-1">
              <div className="inline-block bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">30秒で完了</div>
              <h3 className="font-bold text-slate-900 text-xl mb-1">あなたに最適なクリニックをAI診断</h3>
              <p className="text-slate-500 text-sm">「安さ」「通いやすさ」「実績」… あなたの優先順位に合わせておすすめを提案します。</p>
            </div>
            <button className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg group-hover:bg-teal-600 transition flex items-center gap-2">
              診断スタート <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : diagnosisStep <= 3 ? (
        // Question Screen (Step 1-3)
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
          {/* Header / Progress */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">CLINIC DIAGNOSIS</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-600">STEP {diagnosisStep}/3</span>
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-500 ease-out"
                  style={{ width: `${(diagnosisStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 text-center mb-8">
              Q{diagnosisStep}. {diagnosisQuestions[diagnosisStep - 1].title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagnosisQuestions[diagnosisStep - 1].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(diagnosisStep, option.value)}
                  className="relative flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition duration-200 text-left group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-teal-600 shadow-sm border border-slate-100 font-bold text-lg">
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 group-hover:text-teal-800 transition">{option.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{option.sub}</div>
                  </div>
                  <div className="absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-teal-500 group-hover:bg-teal-500 transition"></div>
                </button>
              ))}
            </div>

            {diagnosisStep > 1 && (
              <button
                onClick={() => setDiagnosisStep(prev => prev - 1)}
                className="mt-6 text-slate-400 text-sm hover:text-slate-600 flex items-center justify-center gap-1 mx-auto"
              >
                <ChevronRight size={14} className="rotate-180" /> 前の質問に戻る
              </button>
            )}
          </div>
        </div>
      ) : diagnosisStep === 4 ? (
        // Loading Screen
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-12 text-center animate-fadeIn">
          <div className="w-16 h-16 mx-auto mb-6 text-teal-500 animate-spin">
            <Loader2 size={64} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">最適なクリニックを選定中...</h3>
          <p className="text-sm text-slate-500">あなたの回答に基づいてリストを再構築しています</p>
        </div>
      ) : (
        // Result Screen
        <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl animate-fadeIn relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 rounded-full px-4 py-1 mb-4">
              <CheckCircle2 size={16} className="text-teal-300" />
              <span className="text-xs font-bold text-teal-100">DIAGNOSIS COMPLETE</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">あなたにおすすめの条件が見つかりました</h3>
            <p className="text-slate-300 text-sm mb-6">
              診断結果に基づいて、最適なクリニックを<br className="hidden sm:block"/>
              評価の高い順に表示します。
            </p>

            <div className="flex justify-center gap-3 flex-wrap">
              <button
                onClick={() => {
                  setDiagnosisStep(0)
                  setAnswers({})
                }}
                className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 font-bold text-sm hover:bg-slate-800 transition"
              >
                診断をやり直す
              </button>
              <Link href={`/search?${getRecommendationParams()}`}>
                <button className="px-6 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm shadow-lg shadow-teal-500/20 transition flex items-center gap-2">
                  結果を見る <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
