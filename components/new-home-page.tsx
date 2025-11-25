"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  MapPin,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  Smartphone,
  Stethoscope,
  Map,
  Navigation,
  CreditCard,
} from 'lucide-react'

export function NewHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('comprehensive')
  const [diagnosisStep, setDiagnosisStep] = useState(0)
  const [selectedPurpose, setSelectedPurpose] = useState('comprehensive')

  // 構造化データ (JSON-LD): WebSite
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AGA治療.com",
    "url": "https://aga治療.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aga治療.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  // 簡易診断ウィジェット用データ (FV用)
  const diagnosisQuestions = [
    {
      question: "気になる症状は？",
      options: ["生え際の後退", "頭頂部の薄毛", "全体的なボリューム減", "抜け毛が増えた"]
    },
    {
      question: "ご予算の目安は？",
      options: ["まずは安く予防したい", "しっかり発毛させたい", "費用は気にしない", "わからない"]
    }
  ]

  // モックデータ：クリニック情報
  const clinics = [
    {
      id: 1,
      name: "AGAスキンクリニック",
      price: "3,700",
      tags: ["全国展開", "実績豊富", "オリジナル治療"],
      features: ["発毛実感率99.4%", "無料カウンセリング"],
      image: "bg-slate-100",
      category: "comprehensive"
    },
    {
      id: 2,
      name: "湘南美容クリニック AGA",
      price: "3,000",
      tags: ["症例数No.1", "全額返金保証", "オンライン対応"],
      features: ["全国90院以上", "初診から薬処方可"],
      image: "bg-blue-50",
      category: "comprehensive"
    },
    {
      id: 3,
      name: "銀座総合美容クリニック",
      price: "2,000",
      tags: ["都内人気", "明朗会計", "カウンセリング充実"],
      features: ["185万人の実績", "オリジナル治療"],
      image: "bg-slate-100",
      category: "comprehensive"
    },
    {
      id: 4,
      name: "eLife（イーライフ）",
      price: "1,600",
      tags: ["業界最安級", "オンライン完結", "定期配送割引"],
      features: ["維持費が安い", "国内承認薬のみ"],
      image: "bg-teal-50",
      category: "price"
    },
    {
      id: 5,
      name: "CLINIC FOR（クリニックフォア）",
      price: "1,760",
      tags: ["初診から薬発送", "最短翌日到着", "定期15%OFF"],
      features: ["スマホ診療完結", "予約から決済まで簡単"],
      image: "bg-blue-50",
      category: "price"
    },
    {
      id: 6,
      name: "AGAヘアクリニック",
      price: "1,800",
      tags: ["初診料0円", "明朗会計", "オンライン実績"],
      features: ["累計15万件の実績", "毎月の費用が明確"],
      image: "bg-slate-100",
      category: "price"
    },
    {
      id: 7,
      name: "DMMオンラインクリニック",
      price: "2,838",
      tags: ["オンライン専門", "最短当日発送", "DMMポイント使える"],
      features: ["診察料0円", "24時間予約可"],
      image: "bg-slate-100",
      category: "online"
    },
    {
      id: 8,
      name: "CLINIC FOR（クリニックフォア）",
      price: "1,760",
      tags: ["オンライン完結", "最短翌日到着", "アプリ管理"],
      features: ["スマホ診療完結", "定期配送で割引"],
      image: "bg-blue-50",
      category: "online"
    },
    {
      id: 9,
      name: "AGAヘアクリニック",
      price: "1,800",
      tags: ["テレビ電話診察", "通院不要", "実績15万件"],
      features: ["診察料無料", "育毛サプリも処方"],
      image: "bg-teal-50",
      category: "online"
    }
  ]

  // エリアデータ定義
  const areaGroups = [
    {
      region: "関東",
      prefs: [
        { name: "東京", slug: "tokyo" },
        { name: "神奈川", slug: "kanagawa" },
        { name: "埼玉", slug: "saitama" },
        { name: "千葉", slug: "chiba" },
        { name: "茨城", slug: "ibaraki" },
        { name: "栃木", slug: "tochigi" },
        { name: "群馬", slug: "gunma" }
      ]
    },
    {
      region: "関西",
      prefs: [
        { name: "大阪", slug: "osaka" },
        { name: "兵庫", slug: "hyogo" },
        { name: "京都", slug: "kyoto" },
        { name: "滋賀", slug: "shiga" },
        { name: "奈良", slug: "nara" },
        { name: "和歌山", slug: "wakayama" }
      ]
    },
    {
      region: "北海道・東北",
      prefs: [
        { name: "北海道", slug: "hokkaido" },
        { name: "宮城", slug: "miyagi" },
        { name: "青森", slug: "aomori" },
        { name: "岩手", slug: "iwate" },
        { name: "秋田", slug: "akita" },
        { name: "山形", slug: "yamagata" },
        { name: "福島", slug: "fukushima" }
      ]
    },
    {
      region: "中部・北陸",
      prefs: [
        { name: "愛知", slug: "aichi" },
        { name: "静岡", slug: "shizuoka" },
        { name: "新潟", slug: "niigata" },
        { name: "山梨", slug: "yamanashi" },
        { name: "長野", slug: "nagano" },
        { name: "石川", slug: "ishikawa" },
        { name: "富山", slug: "toyama" },
        { name: "福井", slug: "fukui" },
        { name: "岐阜", slug: "gifu" }
      ]
    },
    {
      region: "中国・四国",
      prefs: [
        { name: "広島", slug: "hiroshima" },
        { name: "岡山", slug: "okayama" },
        { name: "山口", slug: "yamaguchi" },
        { name: "島根", slug: "shimane" },
        { name: "鳥取", slug: "tottori" },
        { name: "香川", slug: "kagawa" },
        { name: "愛媛", slug: "ehime" },
        { name: "徳島", slug: "tokushima" },
        { name: "高知", slug: "kochi" }
      ]
    },
    {
      region: "九州・沖縄",
      prefs: [
        { name: "福岡", slug: "fukuoka" },
        { name: "佐賀", slug: "saga" },
        { name: "長崎", slug: "nagasaki" },
        { name: "熊本", slug: "kumamoto" },
        { name: "大分", slug: "oita" },
        { name: "宮崎", slug: "miyazaki" },
        { name: "鹿児島", slug: "kagoshima" },
        { name: "沖縄", slug: "okinawa" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* --- JSON-LD Injection --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-slate-900 text-teal-400 p-1.5 rounded-lg group-hover:bg-slate-800 transition">
                <TrendingUp size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">AGA治療.com</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
              <Link href="#" className="hover:text-teal-600 transition py-2 border-b-2 border-transparent hover:border-teal-600">AGAとは</Link>
              <Link href="/areas" className="hover:text-teal-600 transition py-2 border-b-2 border-transparent hover:border-teal-600">クリニック検索</Link>
              <Link href="#" className="hover:text-teal-600 transition py-2 border-b-2 border-transparent hover:border-teal-600">治療薬・費用</Link>
              <Link href="#" className="hover:text-teal-600 transition py-2 border-b-2 border-transparent hover:border-teal-600">体験談</Link>
            </nav>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-slate-600 hover:text-slate-900 font-bold text-sm">ログイン</button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-teal-600/20 transition transform hover:-translate-y-0.5">
                無料カウンセリング
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-2 shadow-xl absolute w-full left-0 z-50">
            <Link href="#" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 font-bold">AGAとは</Link>
            <Link href="/areas" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 font-bold">クリニック検索</Link>
            <Link href="#" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 font-bold">治療薬・費用</Link>
            <div className="pt-4 border-t border-slate-100 mt-2">
              <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold shadow-md">
                無料カウンセリング予約
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- Hero Section --- */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-12">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-slate-800/50 transform skew-x-12 translate-x-1/4"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px]"></div>

        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 relative z-10 flex flex-col md:flex-row items-center gap-16">

          {/* Hero Content */}
          <div className="flex-1 text-center md:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-teal-300 tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
              科学的根拠に基づいた治療ガイド
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              未来の髪は、<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-500">正しい選択</span>で作る。
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              科学的根拠に基づいたAGA治療で、1日約55円から。<br className="hidden sm:block"/>
              あなたに最適なクリニックと治療法が見つかります。
            </p>

            {/* Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-slate-950/50 max-w-md mx-auto md:mx-0 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 h-14 bg-slate-50 rounded-xl border border-transparent focus-within:border-teal-500 focus-within:bg-white transition group">
                <MapPin className="text-slate-400 group-focus-within:text-teal-500 transition mr-3" size={20} />
                <input
                  type="text"
                  placeholder="エリア・駅名 (例: 新宿)"
                  className="bg-transparent w-full outline-none text-slate-800 placeholder-slate-400 font-medium"
                />
              </div>
              <Link href="/search">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-teal-600/20 w-full sm:w-auto">
                  <Search size={20} />
                  検索
                </button>
              </Link>
            </div>

            {/* Mobile Only Diagnosis Button */}
            <div className="md:hidden pt-4">
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 animate-pulse">
                <AlertCircle size={20} />
                30秒で完了！AGAリスク診断スタート
              </button>
            </div>

            {/* Search Options */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/areas" className="flex-1">
                <button className="w-full bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md border border-slate-200 hover:border-teal-500">
                  <Map size={18} className="text-teal-600" />
                  エリアから探す
                </button>
              </Link>
              <Link href="/map" className="flex-1">
                <button className="w-full bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md border border-slate-200 hover:border-teal-500">
                  <Navigation size={18} className="text-teal-600" />
                  現在地から探す
                </button>
              </Link>
              <Link href="/search?online=true" className="flex-1">
                <button className="w-full bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md border border-slate-200 hover:border-teal-500">
                  <Smartphone size={18} className="text-teal-600" />
                  オンライン診療
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Visual - Interactive Diagnosis Widget (PC) */}
          <div className="hidden md:block flex-1 relative perspective-1000">
            <div className="bg-white/95 backdrop-blur text-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/20 max-w-sm mx-auto border border-white/20 relative z-10">

              {/* Header */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs font-bold text-teal-600 mb-1">SELF CHECK</div>
                  <div className="text-xl font-extrabold text-slate-900 leading-tight tracking-tight">AGAリスク診断</div>
                </div>
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                  <HelpCircle size={24} />
                </div>
              </div>

              {/* Diagnosis Question */}
              {diagnosisStep < diagnosisQuestions.length ? (
                <div className="animate-fadeIn">
                  <p className="font-bold text-lg mb-4 text-slate-800 leading-tight tracking-tight">
                    Q{diagnosisStep + 1}. {diagnosisQuestions[diagnosisStep].question}
                  </p>
                  <div className="space-y-3">
                    {diagnosisQuestions[diagnosisStep].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => setDiagnosisStep(prev => prev + 1)}
                        className="w-full text-left px-4 py-3 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 text-slate-600 hover:text-teal-800 font-bold transition duration-200 flex items-center justify-between group"
                      >
                        {option}
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500 transition" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center gap-2">
                     <div className={`h-1.5 w-8 rounded-full transition ${diagnosisStep === 0 ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
                     <div className={`h-1.5 w-8 rounded-full transition ${diagnosisStep === 1 ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight tracking-tight">診断完了！</h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">あなたに最適な治療法と<br/>おすすめクリニックを表示します。</p>
                  <Link href="/search">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-lg transition">
                      診断結果を見る
                    </button>
                  </Link>
                  <button
                    onClick={() => setDiagnosisStep(0)}
                    className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    もう一度やり直す
                  </button>
                </div>
              )}

            </div>

            {/* Background Element for depth */}
            <div className="absolute top-6 left-6 w-full h-full bg-slate-800 rounded-3xl opacity-50 -z-10 transform rotate-3"></div>
          </div>
        </div>
      </section>

      {/* --- Purpose Navigation --- */}
      <section className="py-20 bg-slate-50 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">何から始めればいい？</h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-2xl mx-auto">現在の状況に合わせて、最適な情報へご案内します</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'comprehensive',
                icon: <Stethoscope size={28} />,
                title: "総合的におすすめ",
                desc: "実績・評判・コスパを総合評価",
                link: "ランキングを見る"
              },
              {
                id: 'price',
                icon: <CreditCard size={28} />,
                title: "費用を抑えたい",
                desc: "月額1,000円台〜のクリニック特集",
                link: "安いランキングを見る"
              },
              {
                id: 'online',
                icon: <Smartphone size={28} />,
                title: "通院は面倒くさい",
                desc: "スマホで完結！オンライン診療",
                link: "オンライン特集を見る"
              },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPurpose(item.id)}
                className={`bg-white p-8 rounded-2xl shadow-sm border-2 transition cursor-pointer group flex flex-col items-center text-center h-full ${
                  selectedPurpose === item.id
                    ? 'border-teal-500 shadow-lg shadow-teal-900/10 scale-105'
                    : 'border-slate-100 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5'
                }`}
              >
                <div className={`mb-5 w-16 h-16 rounded-2xl transition duration-300 flex items-center justify-center ${
                  selectedPurpose === item.id
                    ? 'bg-teal-50 text-teal-600'
                    : 'bg-slate-50 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">{item.desc}</p>
                <span className={`text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto px-4 py-2 rounded-full ${
                  selectedPurpose === item.id
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-teal-50 text-teal-600'
                }`}>
                  {item.link} <ChevronRight size={14} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Recommended Clinics Ranking --- */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {selectedPurpose === 'comprehensive' && 'おすすめクリニックランキング'}
              {selectedPurpose === 'price' && '安いクリニックランキング'}
              {selectedPurpose === 'online' && 'オンライン診療おすすめランキング'}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {selectedPurpose === 'comprehensive' && '実績・評判・コスパを総合的に評価した厳選リスト'}
              {selectedPurpose === 'price' && '月額費用が安い順にランキング。予算重視の方におすすめ'}
              {selectedPurpose === 'online' && '通院不要で自宅に届く。独自調査に基づいた厳選リスト'}
            </p>
          </div>

          {/* Clinic List */}
          <div className="space-y-6">
            {clinics.filter(clinic => clinic.category === selectedPurpose || selectedPurpose === 'comprehensive').map((clinic, idx) => (
              <div key={clinic.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-teal-500 hover:shadow-md transition group relative overflow-hidden">
                {/* Number Badge */}
                <div className="absolute top-0 left-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                  {idx + 1}位
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image Placeholder */}
                  <div className={`w-full sm:w-48 h-36 ${clinic.image} rounded-xl flex-shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-100`}>
                    <div className="text-center">
                      <div className="mx-auto mb-2 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">📷</div>
                      NO IMAGE
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition leading-tight tracking-tight">{clinic.name}</h3>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-100 font-bold">オンライン対応</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {clinic.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Features List */}
                      <div className="flex gap-3 mb-2">
                        {clinic.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <CheckCircle2 size={14} className="text-teal-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-xs text-slate-400 block mb-0.5">予防プラン目安</span>
                        <div className="text-slate-900 font-bold text-xl tracking-tight">
                          <span className="text-sm text-slate-500 mr-1 font-normal">月額</span>
                          ¥{clinic.price}
                          <span className="text-xs text-slate-500 font-normal ml-1">~</span>
                        </div>
                      </div>
                      <button className="bg-slate-900 hover:bg-teal-600 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition shadow-lg shadow-slate-900/10 flex items-center gap-2 group-hover:bg-teal-600">
                        詳細を見る <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
             <button className="text-slate-500 font-bold text-sm border-b border-slate-300 hover:border-slate-900 hover:text-slate-900 pb-1 transition">
               ランキングをもっと見る
             </button>
          </div>
        </div>
      </section>

      {/* --- Area/Prefecture List Section --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3 leading-tight tracking-tight">
                <Map size={32} className="text-teal-600" />
                都道府県からAGAクリニックを探す
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                お住まいの地域や、職場の近くのクリニックを検索できます。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaGroups.map((group, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-extrabold text-lg text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 leading-tight tracking-tight">
                  <Navigation size={18} className="text-teal-500" />
                  {group.region}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.prefs.map((pref, i) => (
                    <Link
                      key={i}
                      href={`/areas/${pref.slug}`}
                      className="text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition duration-200 bg-slate-50 font-medium"
                    >
                      {pref.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-teal-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-extrabold text-xl mb-2 leading-tight tracking-tight">近くにクリニックがない場合は？</h3>
              <p className="text-teal-200 text-base leading-relaxed">
                通院不要の「オンライン診療」なら、全国どこからでも受診可能です。
              </p>
            </div>
            <button className="bg-white text-teal-900 font-bold px-6 py-3 rounded-xl hover:bg-teal-50 transition shadow-lg whitespace-nowrap flex items-center gap-2">
              オンライン診療特集を見る <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">よくある質問</h2>
            <p className="text-slate-600 text-base leading-relaxed">治療を始める前の不安を解消します</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "保険は適用されますか？", a: "AGA治療は基本的に「自由診療」となり、健康保険の適用外です。ただし、一部の皮膚疾患が原因の場合は適用されることもあります。" },
              { q: "治療をやめるとどうなりますか？", a: "治療を中止すると、再び進行が始まる可能性が高いです。満足いく状態になった後は、維持するための安価なプランへ移行するのが一般的です。" },
              { q: "オンライン診療でも薬はもらえますか？", a: "はい、可能です。ビデオ通話などで医師の診察を受けた後、配送にて自宅やコンビニで薬を受け取ることができます。" }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 md:p-8 hover:bg-slate-100 transition duration-300">
                <p className="font-bold text-slate-900 mb-3 flex items-start gap-4 text-lg">
                  <span className="bg-teal-600 text-white rounded-lg w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 shadow-md shadow-teal-600/20">Q</span>
                  {item.q}
                </p>
                <p className="text-slate-600 text-sm pl-11 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 text-sm">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-6">
              <div className="bg-teal-600 p-1.5 rounded-lg">
                <TrendingUp size={20} />
              </div>
              AGA治療.com
            </div>
            <p className="text-xs leading-relaxed opacity-70 mb-6">
              AGA治療.comは、薄毛・抜け毛に悩む男性のための総合情報ポータルサイトです。<br/>
              公平な視点と科学的根拠に基づいた情報発信に努めています。
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition cursor-pointer">X</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition cursor-pointer">in</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-base">コンテンツ</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> AGA基礎知識</Link></li>
              <li><Link href="/search" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> クリニックランキング</Link></li>
              <li><Link href="#" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> 治療薬の種類</Link></li>
              <li><Link href="#" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> 体験談・口コミ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-base">エリア検索</h4>
            <ul className="space-y-3">
              <li><Link href="/areas/tokyo" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> 東京のAGAクリニック</Link></li>
              <li><Link href="/areas/osaka" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> 大阪のAGAクリニック</Link></li>
              <li><Link href="/areas/aichi" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> 名古屋のAGAクリニック</Link></li>
              <li><Link href="/search" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> オンライン診療</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-base">サイト情報</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> 運営会社</Link></li>
              <li><Link href="/privacy" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> プライバシーポリシー</Link></li>
              <li><Link href="#" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> 免責事項</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition flex items-center gap-2"><ChevronRight size={12}/> お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs opacity-40">
          &copy; 2025 AGA治療.com. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}
