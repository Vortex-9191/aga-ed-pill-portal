"use client"

import { DiagnosisTool } from "@/components/diagnosis-tool"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ChevronRight,
  MapPin,
  Train,
  CheckCircle2,
  User,
  Phone,
  TrendingUp,
  Filter,
  HelpCircle,
  AlertTriangle,
  Menu,
  X
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { getStationName } from "@/lib/data/stations"

const ITEMS_PER_PAGE = 15

// Prefecture name map for slug conversion
const prefectureToSlug: Record<string, string> = {
  "北海道": "hokkaido", "青森県": "aomori", "岩手県": "iwate", "宮城県": "miyagi",
  "秋田県": "akita", "山形県": "yamagata", "福島県": "fukushima", "茨城県": "ibaraki",
  "栃木県": "tochigi", "群馬県": "gunma", "埼玉県": "saitama", "千葉県": "chiba",
  "東京都": "tokyo", "神奈川県": "kanagawa", "新潟県": "niigata", "富山県": "toyama",
  "石川県": "ishikawa", "福井県": "fukui", "山梨県": "yamanashi", "長野県": "nagano",
  "岐阜県": "gifu", "静岡県": "shizuoka", "愛知県": "aichi", "三重県": "mie",
  "滋賀県": "shiga", "京都府": "kyoto", "大阪府": "osaka", "兵庫県": "hyogo",
  "奈良県": "nara", "和歌山県": "wakayama", "鳥取県": "tottori", "島根県": "shimane",
  "岡山県": "okayama", "広島県": "hiroshima", "山口県": "yamaguchi", "徳島県": "tokushima",
  "香川県": "kagawa", "愛媛県": "ehime", "高知県": "kochi", "福岡県": "fukuoka",
  "佐賀県": "saga", "長崎県": "nagasaki", "熊本県": "kumamoto", "大分県": "oita",
  "宮崎県": "miyazaki", "鹿児島県": "kagoshima", "沖縄県": "okinawa",
}

export default function StationPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSort, setActiveSort] = useState('recommended')
  const [showMap, setShowMap] = useState(false)
  const [clinics, setClinics] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [facetData, setFacetData] = useState<any>({})
  const [nearbyMunicipalities, setNearbyMunicipalities] = useState<any[]>([])
  const [prefecture, setPrefecture] = useState('')

  const slug = params.slug as string
  const stationName = getStationName(slug)
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    async function fetchData() {
      if (!stationName) {
        notFound()
        return
      }

      setLoading(true)
      const supabase = createClient()

      // Get clinics for facet generation and prefecture
      let facetQuery = supabase
        .from("clinics")
        .select("prefecture, municipalities, featured_subjects, 土曜, 日曜, 月曜, 火曜, 水曜, 木曜, 金曜, 院長名, 特徴")
        .ilike("stations", `%${stationName}%`)

      const { data: allClinics } = await facetQuery

      // Determine prefecture from first clinic
      const detectedPrefecture = allClinics && allClinics.length > 0 ? allClinics[0].prefecture : ''
      setPrefecture(detectedPrefecture)

      // Build main query
      let clinicsQuery = supabase
        .from("clinics")
        .select("*", { count: "exact" })
        .ilike("stations", `%${stationName}%`)

      // Get total count
      const { count } = await clinicsQuery

      // Get paginated data
      const from = (currentPage - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1

      const { data, error } = await clinicsQuery
        .order("rating", { ascending: false, nullsLast: true })
        .range(from, to)

      if (error) {
        console.error("Error fetching clinics:", error)
      }

      // Calculate facet data
      const specialtyMap = new Map<string, number>()
      const featureMap = new Map<string, number>()
      const municipalityMap = new Map<string, number>()
      let weekendCount = 0
      let eveningCount = 0
      let directorCount = 0

      allClinics?.forEach((clinic) => {
        // Municipalities
        if (clinic.municipalities) {
          const municipality = clinic.municipalities.trim()
          municipalityMap.set(municipality, (municipalityMap.get(municipality) || 0) + 1)
        }

        // Specialties
        if (clinic.featured_subjects) {
          clinic.featured_subjects.split(",").forEach((s: string) => {
            const specialty = s.trim()
            if (specialty) {
              specialtyMap.set(specialty, (specialtyMap.get(specialty) || 0) + 1)
            }
          })
        }

        // Features
        if (clinic.特徴) {
          clinic.特徴.split(",").forEach((f: string) => {
            const feature = f.trim()
            if (feature && feature !== "-") {
              featureMap.set(feature, (featureMap.get(feature) || 0) + 1)
            }
          })
        }

        // Weekend
        if (clinic.土曜 || clinic.日曜) {
          weekendCount++
        }

        // Evening
        const hasEvening = [
          clinic.月曜,
          clinic.火曜,
          clinic.水曜,
          clinic.木曜,
          clinic.金曜,
        ].some((hours: string) => hours && (hours.includes("18:") || hours.includes("19:") || hours.includes("20:")))
        if (hasEvening) {
          eveningCount++
        }

        // Director
        if (clinic.院長名) {
          directorCount++
        }
      })

      setFacetData({
        specialties: Array.from(specialtyMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 15),
        features: Array.from(featureMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        weekend: weekendCount,
        evening: eveningCount,
        director: directorCount,
      })

      setNearbyMunicipalities(
        Array.from(municipalityMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 12)
      )

      setClinics(data || [])
      setTotalCount(count || 0)
      setLoading(false)
    }

    fetchData()
  }, [slug, stationName, currentPage])

  // Extract opening hours for each clinic
  const getOpeningHours = (clinic: any) => {
    const days = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜']
    const hours: string[] = []
    days.forEach(day => {
      if (clinic[day] && clinic[day] !== '-') {
        hours.push(`${day}: ${clinic[day]}`)
      }
    })
    return hours.length > 0 ? hours.join(', ') : '要確認'
  }

  // Get first station from stations list
  const getFirstStation = (stations: string | null) => {
    if (!stations || stations === '-') return '駅情報なし'
    const stationList = stations.split(',')
    return stationList[0]?.trim() || '駅情報なし'
  }

  // Get features as array
  const getFeatures = (clinic: any) => {
    const features: string[] = []
    if (clinic.特徴 && clinic.特徴 !== '-') {
      const featureList = clinic.特徴.split(',').map((f: string) => f.trim()).filter(Boolean)
      features.push(...featureList.slice(0, 3))
    }
    if (clinic.online_consultation) {
      features.unshift('オンライン診療')
    }
    return features
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // Area description
  const areaDescription = `${stationName}駅周辺には、AGA（男性型脱毛症）治療を専門とするクリニックが${totalCount}件あります。当サイトでは、各クリニックの診療時間、住所、アクセス情報、取扱治療薬、口コミ評価などの詳細情報を掲載しています。`

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-slate-900 text-teal-400 p-1.5 rounded-lg">
                <TrendingUp size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">AGAミライ</span>
            </Link>
            <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
              <Link href="#" className="hover:text-teal-600 transition">AGAとは</Link>
              <Link href="/search" className="hover:text-teal-600 transition">クリニック検索</Link>
              <Link href="#" className="hover:text-teal-600 transition">治療薬・費用</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 text-slate-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <button className="hidden md:block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-teal-600/20 transition">
                無料カウンセリング
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-teal-600 transition">TOP</Link>
            <ChevronRight size={12} className="mx-2 flex-shrink-0" />
            <Link href="/stations" className="hover:text-teal-600 transition">駅一覧</Link>
            <ChevronRight size={12} className="mx-2 flex-shrink-0" />
            <span className="font-bold text-slate-900">{stationName}駅のAGAクリニック</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Main Content */}
        <main className="lg:col-span-8">

          {/* Area Title & Intro */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
              {stationName}駅のおすすめAGAクリニック一覧
              <span className="ml-3 inline-flex items-center bg-teal-50 text-teal-700 text-base px-3 py-1 rounded-full align-middle font-bold">
                {totalCount}件掲載
              </span>
            </h1>
            <div className="text-sm text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p>{areaDescription}</p>
            </div>
          </div>

          {/* Desktop Filter Bar */}
          <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 sticky top-20 z-30">
            <div className="flex items-center gap-4">
              <span className="font-bold text-sm text-slate-900">並び替え:</span>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveSort('recommended')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${activeSort === 'recommended' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  おすすめ順
                </button>
                <button
                  onClick={() => setActiveSort('price')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${activeSort === 'price' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  料金が安い順
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-5 h-5 border-2 border-slate-300 rounded group-hover:border-teal-500 transition flex items-center justify-center">
                  {showMap && <div className="w-3 h-3 bg-teal-500 rounded-sm"></div>}
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-teal-600 transition" onClick={() => setShowMap(!showMap)}>地図を表示</span>
              </label>
            </div>
          </div>

          {/* Diagnosis Tool */}
          <div className="mb-10">
            <DiagnosisTool />
          </div>

          {/* Clinic List */}
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500">読み込み中...</p>
              </div>
            ) : clinics.length > 0 ? (
              clinics.map((clinic, index) => (
                <div key={clinic.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 hover:border-slate-400 transition group">

                  {clinic.rating && clinic.rating >= 4.5 && (
                    <div className="text-[10px] font-bold text-slate-400 mb-2 flex items-center justify-between">
                      <span>おすすめPICKUP</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-56 flex-shrink-0">
                      <div className="w-full h-40 bg-slate-200 rounded-xl mb-3 relative overflow-hidden border border-slate-100">
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm text-slate-800">
                          外観写真
                        </div>
                        <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold">NO IMAGE</div>
                      </div>
                      <div className="hidden sm:block">
                        <Link href={`/clinics/${clinic.slug}`}>
                          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm py-3 rounded-lg shadow-md shadow-teal-600/20 transition transform active:scale-95">
                            詳細ページを見る
                          </button>
                        </Link>
                        {clinic.url && (
                          <a href={clinic.url} target="_blank" rel="noopener noreferrer">
                            <button className="w-full mt-2 text-teal-600 font-bold text-xs hover:bg-teal-50 py-2 rounded transition">
                              公式サイトへ
                            </button>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col h-full">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-teal-700 transition mb-2">
                          {clinic.clinic_name}
                        </h2>

                        {clinic.catchphrase && (
                          <p className="text-teal-600 font-bold text-sm mb-3 flex items-start gap-1.5">
                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                            {clinic.catchphrase}
                          </p>
                        )}

                        {clinic.description && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 bg-slate-50/50 p-3 rounded lg:bg-transparent lg:p-0">
                            {clinic.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {getFeatures(clinic).map((feature, i) => (
                          <span key={i} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto bg-slate-50 rounded-xl border border-slate-100 overflow-hidden text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-100">
                          <div className="p-4 flex items-start gap-3 border-b md:border-b-0 border-slate-100 md:border-r">
                            <TrendingUp size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-[10px] text-slate-500 font-bold mb-1">評価</p>
                              {clinic.rating ? (
                                <p className="text-lg font-bold text-slate-900 leading-none">
                                  ★{clinic.rating.toFixed(1)}
                                  {clinic.review_count && (
                                    <span className="text-xs text-slate-500 font-normal ml-1">({clinic.review_count}件)</span>
                                  )}
                                </p>
                              ) : (
                                <p className="text-sm text-slate-500">評価なし</p>
                              )}
                            </div>
                          </div>
                          <div className="p-4 flex items-start gap-3">
                            <Train size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-[10px] text-slate-500 font-bold mb-1">アクセス</p>
                              <p className="text-sm text-slate-800 font-medium leading-tight">{getFirstStation(clinic.stations)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-100 bg-white md:bg-slate-50">
                          <div className="p-3 px-4 flex items-start gap-3 border-b md:border-b-0 border-slate-100 md:border-r">
                            <CheckCircle2 size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-[10px] text-slate-500 font-bold">診療時間</p>
                              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{getOpeningHours(clinic)}</p>
                            </div>
                          </div>
                          {clinic.院長名 && (
                            <div className="p-3 px-4 flex items-start gap-3">
                              <User size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-[10px] text-slate-500 font-bold">院長・医師</p>
                                <p className="text-xs text-slate-600 mt-0.5">{clinic.院長名}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-3 px-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 bg-slate-100/50">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                            <span className="text-xs text-slate-500">{clinic.address}</span>
                          </div>
                          {clinic.corp_tel && (
                            <div className="flex items-center gap-2 md:ml-auto">
                              <Phone size={14} className="text-slate-400 flex-shrink-0" />
                              <span className="text-xs font-bold text-slate-600">{clinic.corp_tel}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="sm:hidden mt-4">
                        <Link href={`/clinics/${clinic.slug}`}>
                          <button className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg shadow-md">
                            詳細ページを見る
                          </button>
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500">クリニックが見つかりませんでした。</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {currentPage > 1 && (
                <Link href={`/stations/${slug}?page=${currentPage - 1}`}>
                  <button className="px-5 py-2.5 rounded-lg bg-white text-slate-600 hover:bg-slate-100 font-medium border border-slate-200 transition">
                    前へ
                  </button>
                </Link>
              )}
              <div className="flex items-center px-4 py-2.5 rounded-lg bg-slate-900 text-white font-bold shadow-md">
                {currentPage} / {totalPages}
              </div>
              {currentPage < totalPages && (
                <Link href={`/stations/${slug}?page=${currentPage + 1}`}>
                  <button className="px-5 py-2.5 rounded-lg bg-white text-slate-600 hover:bg-slate-100 font-medium border border-slate-200 transition">
                    次へ
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* SEO Content */}
          <section className="mt-20 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-900 text-white p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                <HelpCircle className="text-teal-400" />
                {stationName}駅でのAGAクリニックの選び方
              </h2>
              <p className="text-slate-300 text-sm mt-2 opacity-90">
                後悔しないためにチェックすべき3つのポイントを解説します。
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-10">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">01</span>
                  「維持費（ランニングコスト）」の総額で比較する
                </h3>
                <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>
                    AGA治療は継続が前提です。初回キャンペーン価格（例: 初月0円）だけで選んでしまうと、2ヶ月目以降の料金が高額で続けられなくなるケースがあります。
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="font-bold text-slate-800 mb-2 text-xs">チェックポイント</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                        <span>診察料や血液検査代は毎回かかるか？（無料のクリニックも多い）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                        <span>2ヶ月目以降の薬代は予算内か？（月額5,000円〜15,000円が相場）</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">02</span>
                  「通いやすさ」か「オンライン」かを決める
                </h3>
                <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>
                    {stationName}駅周辺にはクリニックが集中していますが、忙しい方は「オンライン診療」も検討しましょう。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="border border-slate-200 rounded-lg p-4">
                      <p className="font-bold text-slate-900 mb-1">🏥 通院するメリット</p>
                      <p className="text-xs text-slate-500">マイクロスコープでの頭皮診断や、注入治療（メソセラピー）など高度な施術が受けられる。</p>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4">
                      <p className="font-bold text-slate-900 mb-1">📱 オンラインのメリット</p>
                      <p className="text-xs text-slate-500">通院時間ゼロ。薬は自宅配送。誰にも会わずに治療でき、料金も安く抑えられる傾向がある。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">03</span>
                  治療実績とプランの豊富さ
                </h3>
                <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>
                    進行度によって適切な治療は異なります。「予防したいだけ」なら薬のみでOKですが、「かなり進行している」場合は内服薬・外用薬・注入治療などを組み合わせる提案力が必要です。
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 p-2 rounded inline-block">
                    <AlertTriangle size={14} />
                    安すぎるプランは「成分濃度」が低い場合もあるので注意が必要です。
                  </p>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">

          {/* Search Box */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
              <Filter size={18} />
              <span>条件で絞り込む</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-2 block">こだわり条件</label>
                <div className="space-y-2">
                  {facetData.features?.slice(0, 5).map((feature: any, i: number) => (
                    <label key={i} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-slate-300 group-hover:border-teal-500 transition"></div>
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">{feature.name}</span>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{feature.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Municipalities */}
          {nearbyMunicipalities.length > 0 && prefecture && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                <MapPin size={18} />
                <span>周辺エリアから探す</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {nearbyMunicipalities.map((municipality, i) => {
                  const prefectureSlug = prefectureToSlug[prefecture] || 'tokyo'
                  return (
                    <Link
                      key={i}
                      href={`/areas/${prefectureSlug}/${encodeURIComponent(municipality.name)}`}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-slate-200 rounded text-xs font-medium text-slate-600 transition"
                    >
                      {municipality.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* FAQ Widget */}
          <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="font-bold text-lg mb-3 relative z-10">初めての方へ</h3>
            <p className="text-teal-100 text-sm mb-4 relative z-10 leading-relaxed">
              クリニック選びで失敗しないためのポイントを医師が解説。
            </p>
            <Link href="/help" className="inline-flex items-center gap-1 text-sm font-bold text-white border-b border-teal-400 pb-0.5 hover:text-teal-200 transition relative z-10">
              失敗しない選び方ガイド <ChevronRight size={14} />
            </Link>
          </div>

        </aside>

      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-lg mb-4">
            <TrendingUp size={20} />
            AGAミライ
          </div>
          <p className="opacity-50 text-xs">
            &copy; 2025 AGA Mirai. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
