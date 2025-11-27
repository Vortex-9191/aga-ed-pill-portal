"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
  Car,
  CreditCard,
  Users,
  Clock
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { getStationSlug } from "@/lib/data/stations"

// Prefecture slug to name mapping
const prefectureMap: Record<string, string> = {
  hokkaido: "北海道", aomori: "青森県", iwate: "岩手県", miyagi: "宮城県",
  akita: "秋田県", yamagata: "山形県", fukushima: "福島県", ibaraki: "茨城県",
  tochigi: "栃木県", gunma: "群馬県", saitama: "埼玉県", chiba: "千葉県",
  tokyo: "東京都", kanagawa: "神奈川県", niigata: "新潟県", toyama: "富山県",
  ishikawa: "石川県", fukui: "福井県", yamanashi: "山梨県", nagano: "長野県",
  gifu: "岐阜県", shizuoka: "静岡県", aichi: "愛知県", mie: "三重県",
  shiga: "滋賀県", kyoto: "京都府", osaka: "大阪府", hyogo: "兵庫県",
  nara: "奈良県", wakayama: "和歌山県", tottori: "鳥取県", shimane: "島根県",
  okayama: "岡山県", hiroshima: "広島県", yamaguchi: "山口県", tokushima: "徳島県",
  kagawa: "香川県", ehime: "愛媛県", kochi: "高知県", fukuoka: "福岡県",
  saga: "佐賀県", nagasaki: "長崎県", kumamoto: "熊本県", oita: "大分県",
  miyazaki: "宮崎県", kagoshima: "鹿児島県", okinawa: "沖縄県",
}

const ITEMS_PER_PAGE = 15

export default function PrefecturePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [activeSort, setActiveSort] = useState('recommended')
  const [showMap, setShowMap] = useState(false)
  const [clinics, setClinics] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [facetData, setFacetData] = useState<any>({})
  const [relatedMunicipalities, setRelatedMunicipalities] = useState<any[]>([])
  const [relatedStations, setRelatedStations] = useState<any[]>([])

  const prefecture = params.prefecture as string
  const prefectureName = prefectureMap[prefecture]
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    async function fetchData() {
      if (!prefectureName) {
        notFound()
        return
      }

      setLoading(true)
      const supabase = createClient()

      // Get clinics for facet generation
      let facetQuery = supabase
        .from("clinics")
        .select("municipalities, stations, featured_subjects, hours_saturday, hours_sunday, hours_monday, hours_tuesday, hours_wednesday, hours_thursday, hours_friday, director_name, features")
        .eq("prefecture", prefectureName)

      const { data: allClinics } = await facetQuery

      // Build main query
      let clinicsQuery = supabase
        .from("clinics")
        .select("*", { count: "exact" })
        .eq("prefecture", prefectureName)

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
      const stationMap = new Map<string, number>()
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
        if (clinic.features) {
          clinic.features.split(",").forEach((f: string) => {
            const feature = f.trim()
            if (feature && feature !== "-") {
              featureMap.set(feature, (featureMap.get(feature) || 0) + 1)
            }
          })
        }

        // Stations
        if (clinic.stations) {
          const stations = clinic.stations.split(",").map((s: string) => s.trim())
          stations.forEach((station: string) => {
            if (station && station !== "-") {
              stationMap.set(station, (stationMap.get(station) || 0) + 1)
            }
          })
        }

        // Weekend
        if (clinic.hours_saturday || clinic.hours_sunday) {
          weekendCount++
        }

        // Evening
        const hasEvening = [
          clinic.hours_monday,
          clinic.hours_tuesday,
          clinic.hours_wednesday,
          clinic.hours_thursday,
          clinic.hours_friday,
        ].some((hours: string) => hours && (hours.includes("18:") || hours.includes("19:") || hours.includes("20:")))
        if (hasEvening) {
          eveningCount++
        }

        // Director
        if (clinic.director_name) {
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

      setRelatedMunicipalities(
        Array.from(municipalityMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 12)
      )

      setRelatedStations(
        Array.from(stationMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      )

      setClinics(data || [])
      setTotalCount(count || 0)
      setLoading(false)
    }

    fetchData()
  }, [prefecture, prefectureName, currentPage])

  // Extract opening hours for each clinic (improved display)
  const getOpeningHours = (clinic: any) => {
    // If business_hours is available from CSV, use it directly
    if (clinic.business_hours && clinic.business_hours !== '-') {
      return clinic.business_hours
    }

    // Otherwise, construct from individual day columns
    const days = [
      { short: '月', en: 'hours_monday' },
      { short: '火', en: 'hours_tuesday' },
      { short: '水', en: 'hours_wednesday' },
      { short: '木', en: 'hours_thursday' },
      { short: '金', en: 'hours_friday' },
      { short: '土', en: 'hours_saturday' },
      { short: '日', en: 'hours_sunday' }
    ]

    // Group consecutive days with same hours
    const groups: Array<{ days: string[], hours: string }> = []
    let currentGroup: { days: string[], hours: string } | null = null

    days.forEach(({ short, en }) => {
      const hours = clinic[en] && clinic[en] !== '-' ? clinic[en] : '休診'

      if (!currentGroup || currentGroup.hours !== hours) {
        if (currentGroup) groups.push(currentGroup)
        currentGroup = { days: [short], hours }
      } else {
        currentGroup.days.push(short)
      }
    })
    if (currentGroup) groups.push(currentGroup)

    // Format groups
    const formatted = groups.map(group => {
      const dayRange = group.days.length === 1
        ? group.days[0]
        : group.days.length === 7
        ? '毎日'
        : group.days.length === 5 && group.days[0] === '月'
        ? '平日'
        : group.days.length === 2 && group.days[0] === '土'
        ? '土日'
        : `${group.days[0]}-${group.days[group.days.length - 1]}`
      return `${dayRange} ${group.hours}`
    }).join(' / ')

    return formatted || '要確認'
  }

  // Get first station from stations list
  const getFirstStation = (stations: string | null) => {
    if (!stations || stations === '-') return '駅情報なし'
    const stationList = stations.split(',')
    return stationList[0]?.trim() || '駅情報なし'
  }

  // Get features as array with icons
  const getFeatureBadges = (clinic: any) => {
    const badges: Array<{ text: string; icon: string; color: string }> = []

    // 駐車場
    if (clinic.parking && clinic.parking !== '-') {
      badges.push({ text: '駐車場あり', icon: 'car', color: 'blue' })
    }

    // 支払い方法
    if (clinic.payment_methods && clinic.payment_methods.includes('クレジット')) {
      badges.push({ text: 'カード可', icon: 'credit', color: 'green' })
    }

    // 女性対応
    if (clinic.female_treatment && clinic.female_treatment !== '-' && clinic.female_treatment.includes('対応')) {
      badges.push({ text: '女性対応', icon: 'users', color: 'pink' })
    }

    // 土日診療
    if ((clinic.hours_saturday && clinic.hours_saturday !== '-') || (clinic.hours_sunday && clinic.hours_sunday !== '-')) {
      badges.push({ text: '土日診療', icon: 'clock', color: 'orange' })
    }

    // 既存のfeatures
    if (clinic.features && clinic.features !== '-') {
      const featureList = clinic.features.split(',').map((f: string) => f.trim()).filter(Boolean)
      featureList.slice(0, 2).forEach((f: string) => {
        badges.push({ text: f, icon: 'check', color: 'slate' })
      })
    }

    return badges.slice(0, 5)
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // Area description
  const areaDescription = `${prefectureName}には、AGA（男性型脱毛症）治療を専門とするクリニックが${totalCount}件あります。当サイトでは、各クリニックの診療時間、住所、アクセス情報、取扱治療薬、口コミ評価などの詳細情報を掲載しています。`

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-teal-600 transition">TOP</Link>
            <ChevronRight size={12} className="mx-2 flex-shrink-0" />
            <Link href="/areas" className="hover:text-teal-600 transition">エリア一覧</Link>
            <ChevronRight size={12} className="mx-2 flex-shrink-0" />
            <span className="font-bold text-slate-900">{prefectureName}のAGAクリニック</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Main Content */}
        <main className="lg:col-span-8">

          {/* Area Title & Intro */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
              {prefectureName}のおすすめAGAクリニック一覧
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

                  <div className="flex flex-col gap-5">
                    {/* Header with title and badges */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-teal-700 transition mb-3">
                        {clinic.clinic_name}
                      </h2>

                      {/* Feature Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getFeatureBadges(clinic).map((badge, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border ${
                              badge.color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              badge.color === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                              badge.color === 'pink' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                              badge.color === 'orange' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                              'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {badge.icon === 'car' && <Car size={12} />}
                            {badge.icon === 'credit' && <CreditCard size={12} />}
                            {badge.icon === 'users' && <Users size={12} />}
                            {badge.icon === 'clock' && <Clock size={12} />}
                            {badge.icon === 'check' && <CheckCircle2 size={12} />}
                            {badge.text}
                          </span>
                        ))}
                      </div>

                      {clinic.recommended_points && (
                        <p className="text-teal-600 font-bold text-sm mb-3 flex items-start gap-1.5">
                          <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                          {clinic.recommended_points}
                        </p>
                      )}
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
                          {clinic.director_name && (
                            <div className="p-3 px-4 flex items-start gap-3">
                              <User size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-[10px] text-slate-500 font-bold">院長・医師</p>
                                <p className="text-xs text-slate-600 mt-0.5">{clinic.director_name}</p>
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

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link href={`/clinics/${clinic.slug}`} className="flex-1">
                        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm py-3 rounded-lg shadow-md shadow-teal-600/20 transition transform active:scale-95">
                          詳細ページを見る
                        </button>
                      </Link>
                      {clinic.url && (
                        <a href={clinic.url} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                          <button className="w-full sm:w-auto px-6 text-teal-600 font-bold text-sm py-3 rounded-lg border border-teal-200 hover:bg-teal-50 transition">
                            公式サイトへ
                          </button>
                        </a>
                      )}
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
                <Link href={`/areas/${prefecture}?page=${currentPage - 1}`}>
                  <button className="px-5 py-2.5 rounded-lg bg-white text-slate-600 hover:bg-slate-100 font-medium border border-slate-200 transition">
                    前へ
                  </button>
                </Link>
              )}
              <div className="flex items-center px-4 py-2.5 rounded-lg bg-slate-900 text-white font-bold shadow-md">
                {currentPage} / {totalPages}
              </div>
              {currentPage < totalPages && (
                <Link href={`/areas/${prefecture}?page=${currentPage + 1}`}>
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
                {prefectureName}でのAGAクリニックの選び方
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
                    {prefectureName}エリアは駅周辺にクリニックが集中していますが、忙しい方は「オンライン診療」も検討しましょう。
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
          {relatedMunicipalities.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                <MapPin size={18} />
                <span>{prefectureName}の市区町村</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedMunicipalities.map((municipality, i) => (
                  <Link
                    key={i}
                    href={`/areas/${prefecture}/${encodeURIComponent(municipality.name)}`}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-slate-200 rounded text-xs font-medium text-slate-600 transition"
                  >
                    {municipality.name}
                  </Link>
                ))}
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

      {/* Related Stations Section */}
      {relatedStations.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12 mt-8">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
              <Train size={18} className="text-teal-600" />
              {prefectureName}の主要駅
            </h3>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {relatedStations.map((station) => {
                const stationSlug = getStationSlug(station.name)
                return (
                  <Link
                    key={station.name}
                    href={`/stations/${stationSlug}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-teal-50 hover:border-teal-300 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Train className="h-4 w-4 text-slate-400 group-hover:text-teal-600 flex-shrink-0 transition-colors" />
                      <span className="text-sm font-medium group-hover:text-teal-700 transition-colors">{station.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-50 group-hover:bg-teal-100 px-2 py-1 rounded transition-colors">
                      {station.count}件
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Municipalities Links */}
      {relatedMunicipalities.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
              <MapPin size={18} className="text-teal-600" />
              {prefectureName}のエリアからAGAクリニックを探す
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-4">
              {relatedMunicipalities.map((municipality, i) => (
                <Link
                  key={i}
                  href={`/areas/${prefecture}/${encodeURIComponent(municipality.name)}`}
                  className="text-sm text-slate-500 hover:text-teal-600 hover:underline flex items-center gap-1 transition group"
                >
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-teal-400" />
                  {municipality.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
