"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  ChevronRight,
  MapPin,
  Search,
  Compass,
  MousePointerClick,
  Smartphone,
  Train,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PREFECTURE_SLUGS } from "@/lib/api/locations"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

// 地方データ構造
const REGIONS = [
  {
    id: "kanto",
    name: "関東",
    prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
    majorAreas: {
      "東京都": ["新宿", "渋谷", "池袋", "銀座", "新橋", "上野", "秋葉原", "立川", "町田", "八王子"],
      "神奈川県": ["横浜", "川崎", "武蔵小杉", "藤沢", "厚木"],
      "埼玉県": ["大宮", "浦和", "川口", "川越", "所沢"],
      "千葉県": ["千葉", "柏", "船橋", "松戸", "津田沼"],
    }
  },
  {
    id: "kansai",
    name: "関西",
    prefectures: ["大阪府", "兵庫県", "京都府", "滋賀県", "奈良県", "和歌山県"],
    majorAreas: {
      "大阪府": ["梅田", "心斎橋", "難波", "天王寺", "京橋", "堺"],
      "兵庫県": ["神戸三宮", "姫路", "西宮北口", "尼崎"],
      "京都府": ["京都駅", "四条烏丸", "河原町"],
    }
  },
  {
    id: "chubu",
    name: "中部",
    prefectures: ["愛知県", "静岡県", "岐阜県", "長野県", "新潟県", "富山県", "石川県", "福井県", "山梨県"],
    majorAreas: {
      "愛知県": ["名古屋", "栄", "金山", "豊橋", "岡崎"],
      "静岡県": ["静岡", "浜松"],
      "新潟県": ["新潟", "長岡"],
    }
  },
  {
    id: "hokkaido",
    name: "北海道・東北",
    prefectures: ["北海道", "宮城県", "福島県", "青森県", "岩手県", "秋田県", "山形県"],
    majorAreas: {
      "北海道": ["札幌", "旭川", "函館"],
      "宮城県": ["仙台"],
    }
  },
  {
    id: "chugoku",
    name: "中国・四国",
    prefectures: ["広島県", "岡山県", "山口県", "愛媛県", "香川県", "徳島県", "高知県", "鳥取県", "島根県"],
    majorAreas: {
      "広島県": ["広島", "福山"],
      "岡山県": ["岡山"],
    }
  },
  {
    id: "kyushu",
    name: "九州・沖縄",
    prefectures: ["福岡県", "熊本県", "鹿児島県", "長崎県", "大分県", "宮崎県", "佐賀県", "沖縄県"],
    majorAreas: {
      "福岡県": ["博多", "天神", "小倉", "久留米"],
      "沖縄県": ["那覇"],
    }
  },
]

// 人気エリア
const POPULAR_AREAS = [
  { name: "新宿", prefecture: "東京都" },
  { name: "梅田", prefecture: "大阪府" },
  { name: "横浜", prefecture: "神奈川県" },
  { name: "名古屋", prefecture: "愛知県" },
  { name: "博多", prefecture: "福岡県" },
  { name: "札幌", prefecture: "北海道" },
  { name: "大宮", prefecture: "埼玉県" },
  { name: "三宮", prefecture: "兵庫県" },
]

export default function AreasPage() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('clinics')
        .select('prefecture')

      if (error) {
        console.error('❌ Error fetching prefecture counts:', error)
        setLoading(false)
        return
      }

      console.log('✅ Fetched data:', data?.length, 'clinics')

      const prefectureCounts: Record<string, number> = {}
      data.forEach((item: { prefecture: string }) => {
        if (item.prefecture) {
          prefectureCounts[item.prefecture] = (prefectureCounts[item.prefecture] || 0) + 1
        }
      })

      console.log('📊 Prefecture counts:', prefectureCounts)
      setCounts(prefectureCounts)
      setLoading(false)
    }

    fetchCounts()
  }, [])

  const scrollToRegion = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-slate-200 bg-white">
          <div className="container py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>エリアから探す</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-16 md:py-20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                <MapPin className="h-4 w-4" />
                全国対応
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                エリアからAGAクリニックを探す
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                お住まいの都道府県や、通勤・通学先の主要エリアから
                <br className="hidden md:block" />
                通いやすいAGAクリニック・病院を検索できます
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 h-14 bg-slate-50 rounded-xl border border-transparent focus-within:border-primary focus-within:bg-white transition">
                  <Search className="text-slate-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="エリア名・駅名を入力 (例: 渋谷)"
                    className="bg-transparent w-full outline-none text-slate-800 placeholder-slate-400"
                  />
                </div>
                <button className="bg-slate-900 hover:bg-primary text-white px-8 h-14 rounded-xl font-bold transition shadow-md">
                  検索
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Region Shortcuts - Sticky Navigation */}
        <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="container py-3">
            <div className="flex flex-wrap justify-center gap-2">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => scrollToRegion(region.id)}
                  className="px-4 py-2 bg-white hover:bg-primary/10 border border-slate-200 hover:border-primary text-slate-600 hover:text-primary rounded-full text-xs font-bold transition shadow-sm"
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-12">
          {/* Popular Areas */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h2 className="text-xl font-bold text-foreground">人気のエリアから探す</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {POPULAR_AREAS.map((area, idx) => {
                const prefSlug = PREFECTURE_SLUGS[area.prefecture]
                return (
                  <Link
                    key={idx}
                    href={`/areas/${prefSlug}`}
                    className="bg-white hover:bg-primary/5 border border-slate-200 hover:border-primary/50 rounded-xl p-3 text-center transition group shadow-sm hover:shadow-md flex flex-col justify-center h-24"
                  >
                    <div className="text-xs text-muted-foreground mb-1">{area.prefecture}</div>
                    <div className="text-sm font-bold text-foreground group-hover:text-primary">{area.name}</div>
                    <div className="text-[10px] text-primary mt-1 opacity-0 group-hover:opacity-100 transition">
                      {counts[area.prefecture] || 0}件
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Region List */}
          <div className="space-y-16 mb-16">
            {REGIONS.map((region) => (
              <section key={region.id} id={region.id} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-200 pb-3">
                  <div className="bg-slate-800 text-white p-2 rounded-lg">
                    <Compass size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{region.name}エリア</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {region.prefectures.map((prefName) => {
                    const prefSlug = PREFECTURE_SLUGS[prefName] || 'unknown'
                    const count = counts[prefName] || 0
                    const areas = region.majorAreas[prefName] || []

                    return (
                      <div key={prefSlug} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition group">
                        <div className="p-6">
                          {/* Prefecture Header */}
                          <div className="flex items-center justify-between mb-4">
                            <Link href={`/areas/${prefSlug}`} className="flex items-center gap-3">
                              <span className="text-lg font-bold text-foreground group-hover:text-primary group-hover:underline transition">
                                {prefName}
                              </span>
                              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                                {loading ? '...' : `${count}件`}
                              </span>
                            </Link>
                            <Link
                              href={`/areas/${prefSlug}`}
                              className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition"
                            >
                              <ChevronRight size={16} />
                            </Link>
                          </div>

                          {/* Major Areas Tags */}
                          {areas.length > 0 && (
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold mb-2 flex items-center gap-1">
                                <MousePointerClick size={10} /> 主要エリア・駅
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {areas.map((city, cIdx) => (
                                  <Link
                                    key={cIdx}
                                    href={`/areas/${prefSlug}`}
                                    className="text-xs font-medium text-slate-600 hover:text-primary bg-slate-50 hover:bg-primary/10 border border-slate-100 hover:border-primary/30 px-3 py-1.5 rounded-lg transition"
                                  >
                                    {city}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Footer */}
                        <Link
                          href={`/areas/${prefSlug}`}
                          className="block bg-slate-50 border-t border-slate-100 py-3 text-center text-xs font-bold text-slate-500 hover:text-primary hover:bg-primary/5 transition"
                        >
                          {prefName}のすべてのクリニックを見る
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Online Clinic CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl mb-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-xs font-bold text-primary mb-4">
                  <Smartphone size={14} />
                  近くにクリニックがない方へ
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">通院不要の「オンライン診療」</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  地方にお住まいの方や、忙しくて通院できない方に最適。
                  <br className="hidden md:block" />
                  スマホがあれば、全国どこからでも専門医の診察が受けられます。
                </p>
                <div className="flex flex-wrap gap-3">
                  {["通院時間ゼロ", "誰にも会わない", "お薬は郵送", "土日祝もOK"].map((tag, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs font-bold bg-slate-700/50 px-3 py-1.5 rounded-lg text-primary border border-slate-600">
                      <CheckCircle2 size={12} className="text-primary" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-full md:w-auto">
                <Link
                  href="/search?online=true"
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  オンラインのおすすめを見る <ArrowRight size={18} />
                </Link>
                <p className="text-[10px] text-slate-400 text-center mt-3">
                  初診料0円・全額返金保証ありのクリニックも多数
                </p>
              </div>
            </div>
          </div>

          {/* Station Search Link */}
          <div className="text-center">
            <Link
              href="/stations"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold border-b border-slate-300 hover:border-primary pb-1 transition"
            >
              <Train size={16} />
              通勤・通学の路線や駅から探す方はこちら
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
