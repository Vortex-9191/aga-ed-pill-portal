import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DiagnosisTool } from "@/components/diagnosis-tool"
import Link from "next/link"
import {
  ChevronRight,
  MapPin,
  Train,
  CreditCard,
  CheckCircle2,
  Wallet,
  User,
  Phone,
  TrendingUp,
  Filter,
  HelpCircle,
  AlertTriangle
} from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { SearchFilters } from "@/components/search-filters"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
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

export async function generateMetadata({
  params,
}: {
  params: { prefecture: string; city: string }
}): Promise<Metadata> {
  const prefectureName = prefectureMap[params.prefecture] || "都道府県"
  const cityName = decodeURIComponent(params.city)

  return {
    title: `${prefectureName}${cityName}のAGA治療クリニック | aga治療.com`,
    description: `${prefectureName}${cityName}のAGA治療専門クリニック一覧。診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

const ITEMS_PER_PAGE = 15

export default async function CityPage({
  params,
  searchParams,
}: {
  params: { prefecture: string; city: string }
  searchParams: {
    page?: string
    specialty?: string
    feature?: string
    weekend?: string
    evening?: string
    director?: string
    station?: string
  }
}) {
  const prefectureName = prefectureMap[params.prefecture]
  const cityName = decodeURIComponent(params.city)

  if (!prefectureName) {
    notFound()
  }

  const supabase = await createClient()
  const currentPage = Number(searchParams.page) || 1

  // Get clinics for facet generation with current filters applied (except station filter)
  let facetQuery = supabase
    .from("clinics")
    .select("featured_subjects, 土曜, 日曜, 月曜, 火曜, 水曜, 木曜, 金曜, 特徴, stations")
    .eq("prefecture", prefectureName)
    .eq("municipalities", cityName)

  // Apply same filters as main query, except station (so we can show all stations)
  if (searchParams.specialty) {
    facetQuery = facetQuery.ilike("featured_subjects", `%${searchParams.specialty}%`)
  }

  if (searchParams.feature) {
    facetQuery = facetQuery.ilike("特徴", `%${searchParams.feature}%`)
  }

  if (searchParams.weekend) {
    facetQuery = facetQuery.or("土曜.not.is.null,日曜.not.is.null")
  }

  if (searchParams.evening) {
    facetQuery = facetQuery.or(
      "月曜.ilike.%18:%,月曜.ilike.%19:%,月曜.ilike.%20:%,火曜.ilike.%18:%,火曜.ilike.%19:%,火曜.ilike.%20:%,水曜.ilike.%18:%,水曜.ilike.%19:%,水曜.ilike.%20:%,木曜.ilike.%18:%,木曜.ilike.%19:%,木曜.ilike.%20:%,金曜.ilike.%18:%,金曜.ilike.%19:%,金曜.ilike.%20:%"
    )
  }

  if (searchParams.director) {
    facetQuery = facetQuery.not("院長名", "is", null)
  }

  const { data: allClinics } = await facetQuery

  // Build query
  let clinicsQuery = supabase
    .from("clinics")
    .select("*", { count: "exact" })
    .eq("prefecture", prefectureName)
    .eq("municipalities", cityName)

  // Apply filters
  if (searchParams.specialty) {
    clinicsQuery = clinicsQuery.ilike("featured_subjects", `%${searchParams.specialty}%`)
  }

  if (searchParams.feature) {
    clinicsQuery = clinicsQuery.ilike("特徴", `%${searchParams.feature}%`)
  }

  if (searchParams.weekend) {
    clinicsQuery = clinicsQuery.or("土曜.not.is.null,日曜.not.is.null")
  }

  if (searchParams.evening) {
    clinicsQuery = clinicsQuery.or(
      "月曜.ilike.%18:%,月曜.ilike.%19:%,月曜.ilike.%20:%,火曜.ilike.%18:%,火曜.ilike.%19:%,火曜.ilike.%20:%,水曜.ilike.%18:%,水曜.ilike.%19:%,水曜.ilike.%20:%,木曜.ilike.%18:%,木曜.ilike.%19:%,木曜.ilike.%20:%,金曜.ilike.%18:%,金曜.ilike.%19:%,金曜.ilike.%20:%"
    )
  }

  if (searchParams.director) {
    clinicsQuery = clinicsQuery.not("院長名", "is", null)
  }

  if (searchParams.station) {
    clinicsQuery = clinicsQuery.ilike("stations", `%${searchParams.station}%`)
  }

  // Get total count
  const { count: totalCount } = await clinicsQuery

  // Get paginated data
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const { data: clinics, error } = await clinicsQuery
    .order("rating", { ascending: false, nullsLast: true })
    .range(from, to)

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)

  // Calculate facet data
  const specialtyMap = new Map<string, number>()
  const featureMap = new Map<string, number>()
  let weekendCount = 0
  let eveningCount = 0
  let directorCount = 0

  allClinics?.forEach((clinic) => {
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

    // Evening (18:00以降)
    const hasEvening = [
      clinic.月曜,
      clinic.火曜,
      clinic.水曜,
      clinic.木曜,
      clinic.金曜,
    ].some((hours) => hours && (hours.includes("18:") || hours.includes("19:") || hours.includes("20:")))
    if (hasEvening) {
      eveningCount++
    }

    // Director
    if (clinic.院長名) {
      directorCount++
    }
  })

  // Extract stations with counts from filtered clinics
  const stationFacetMap = new Map<string, number>()
  allClinics?.forEach((clinic) => {
    if (clinic.stations) {
      const stations = clinic.stations.split(",").map((s: string) => s.trim())
      stations.forEach((station: string) => {
        if (station && station !== "-") {
          stationFacetMap.set(station, (stationFacetMap.get(station) || 0) + 1)
        }
      })
    }
  })

  const facetData = {
    prefectures: [],
    stations: Array.from(stationFacetMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15),
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
  }

  // Use the same station data for the stations section at bottom (top 10)
  const relatedStations = Array.from(stationFacetMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Generate JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": totalCount || 0,
    "itemListElement": clinics?.map((clinic, index) => ({
      "@type": "ListItem",
      "position": from + index + 1,
      "item": {
        "@type": "MedicalClinic",
        "@id": `https://aga治療.com/clinics/${clinic.slug}`,
        "name": clinic.clinic_name,
        "url": clinic.url || `https://aga治療.com/clinics/${clinic.slug}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": clinic.address,
          "addressRegion": clinic.prefecture,
          "addressLocality": clinic.municipalities || "",
          "addressCountry": "JP"
        },
        "telephone": clinic.corp_tel || "",
        ...(clinic.rating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": clinic.rating,
            "reviewCount": clinic.review_count || 0,
            "bestRating": 5,
            "worstRating": 1
          }
        }),
        "medicalSpecialty": clinic.clinic_spec || "AGA治療"
      }
    })) || []
  }

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
    // Add online if specified
    if (clinic.online_consultation) {
      features.unshift('オンライン診療')
    }
    return features
  }

  // Get nearby cities - simplified version
  const nearbyCities = [
    "渋谷区", "中野区", "豊島区", "港区", "千代田区",
    "中央区", "文京区", "世田谷区", "杉並区", "練馬区", "目黒区", "品川区"
  ].filter(city => city !== cityName).slice(0, 12)

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-teal-600 transition">TOP</Link>
            <ChevronRight size={12} className="mx-2 flex-shrink-0" />
            <Link href="/areas" className="hover:text-teal-600 transition">エリア一覧</Link>
            <ChevronRight size={12} className="mx-2 flex-shrink-0" />
            <Link href={`/areas/${params.prefecture}`} className="hover:text-teal-600 transition">{prefectureName}</Link>
            <ChevronRight size={12} className="mx-2 flex-shrink-0" />
            <span className="font-bold text-slate-900">{cityName}のAGAクリニック</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Main Content */}
        <main className="lg:col-span-8">

          {/* Area Title & Intro */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
              {cityName}のおすすめAGAクリニック一覧
              <span className="ml-3 inline-flex items-center bg-teal-50 text-teal-700 text-base px-3 py-1 rounded-full align-middle font-bold">
                {totalCount || 0}件掲載
              </span>
            </h1>
            <div className="text-sm text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p>
                {prefectureName}{cityName}には、AGA（男性型脱毛症）治療を専門とするクリニックが{totalCount || 0}件あります。
                当サイトでは、各クリニックの診療時間、住所、アクセス情報、取扱治療薬、口コミ評価などの詳細情報を掲載しています。
              </p>
            </div>
          </div>

          {/* Diagnosis Tool */}
          <div className="mb-10">
            <DiagnosisTool />
          </div>

          {/* Clinic List */}
          <div className="space-y-8">
            {clinics && clinics.length > 0 ? (
              clinics.map((clinic, index) => (
                <div key={clinic.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 hover:border-slate-400 transition group">

                  {/* PR Label - only show for highly rated clinics */}
                  {clinic.rating && clinic.rating >= 4.5 && (
                    <div className="text-[10px] font-bold text-slate-400 mb-2 flex items-center justify-between">
                      <span>おすすめPICKUP</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Thumbnail */}
                    <div className="sm:w-56 flex-shrink-0">
                      <div className="w-full h-40 bg-slate-200 rounded-xl mb-3 relative overflow-hidden border border-slate-100">
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm text-slate-800">
                          外観写真
                        </div>
                        <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold">NO IMAGE</div>
                      </div>
                      {/* PC Button */}
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

                    {/* Info */}
                    <div className="flex-1 flex flex-col h-full">
                      {/* Header Info */}
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-teal-700 transition mb-2">
                          {clinic.clinic_name}
                        </h2>

                        {/* Catchphrase */}
                        {clinic.catchphrase && (
                          <p className="text-teal-600 font-bold text-sm mb-3 flex items-start gap-1.5">
                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                            {clinic.catchphrase}
                          </p>
                        )}

                        {/* Description */}
                        {clinic.description && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 bg-slate-50/50 p-3 rounded lg:bg-transparent lg:p-0">
                            {clinic.description}
                          </p>
                        )}
                      </div>

                      {/* Features Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {getFeatures(clinic).map((feature, i) => (
                          <span key={i} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Detailed Info Grid */}
                      <div className="mt-auto bg-slate-50 rounded-xl border border-slate-100 overflow-hidden text-sm">
                        {/* Row 1: Rating & Access */}
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

                        {/* Row 2: Opening Hours & Director */}
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

                        {/* Row 3: Address & Phone */}
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

                      {/* Mobile Button */}
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
                <Link href={`/areas/${params.prefecture}/${params.city}?page=${currentPage - 1}`}>
                  <button className="px-5 py-2.5 rounded-lg bg-white text-slate-600 hover:bg-slate-100 font-medium border border-slate-200 transition">
                    前へ
                  </button>
                </Link>
              )}
              <div className="flex items-center px-4 py-2.5 rounded-lg bg-slate-900 text-white font-bold shadow-md">
                {currentPage} / {totalPages}
              </div>
              {currentPage < totalPages && (
                <Link href={`/areas/${params.prefecture}/${params.city}?page=${currentPage + 1}`}>
                  <button className="px-5 py-2.5 rounded-lg bg-white text-slate-600 hover:bg-slate-100 font-medium border border-slate-200 transition">
                    次へ
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* SEO Content: Clinic Guide */}
          <section className="mt-20 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-900 text-white p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                <HelpCircle className="text-teal-400" />
                {cityName}でのAGAクリニックの選び方
              </h2>
              <p className="text-slate-300 text-sm mt-2 opacity-90">
                後悔しないためにチェックすべき3つのポイントを解説します。
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-10">
              {/* Point 1 */}
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

              {/* Point 2 */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">02</span>
                  「通いやすさ」か「オンライン」かを決める
                </h3>
                <div className="pl-11 space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>
                    {cityName}エリアは駅周辺にクリニックが集中していますが、忙しい方は「オンライン診療」も検討しましょう。
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

              {/* Point 3 */}
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

          {/* Detailed Search Box */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
              <Filter size={18} />
              <span>条件で絞り込む</span>
            </div>

            <SearchFilters facets={facetData} />
          </div>

          {/* Nearby Areas */}
          {nearbyCities.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                <MapPin size={18} />
                <span>近隣エリアから探す</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((area, i) => (
                  <Link
                    key={i}
                    href={`/areas/${params.prefecture}/${encodeURIComponent(area)}`}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-slate-200 rounded text-xs font-medium text-slate-600 transition"
                  >
                    {area}
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
              {cityName}のクリニック最寄り駅
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

      {/* Nearby Areas Links (SEO Footer Navigation) */}
      {nearbyCities.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
              <MapPin size={18} className="text-teal-600" />
              {cityName}周辺のエリアからAGAクリニックを探す
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-4">
              {nearbyCities.map((area, i) => (
                <Link
                  key={i}
                  href={`/areas/${params.prefecture}/${encodeURIComponent(area)}`}
                  className="text-sm text-slate-500 hover:text-teal-600 hover:underline flex items-center gap-1 transition group"
                >
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-teal-400" />
                  {area}
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
