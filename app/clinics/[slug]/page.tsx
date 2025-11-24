import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicBreadcrumbs } from "@/components/clinic-breadcrumbs"
import { ClinicHeaderCard } from "@/components/clinic-header-card"
import { ClinicPriceTable } from "@/components/clinic-price-table"
import { ClinicDoctorInfo } from "@/components/clinic-doctor-info"
import { ClinicDetailTable } from "@/components/clinic-detail-table"
import { ClinicStickyCTA } from "@/components/clinic-sticky-cta"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { generateClinicStructuredData } from "@/lib/structured-data"
import { notFound } from "next/navigation"
import { MapPin, Clock, Stethoscope, Heart } from "lucide-react"
import type { Metadata } from "next"
import type { ClinicWithPrices } from "@/lib/types/clinic"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()
  const { data: clinic } = await supabase.from("clinics").select("*").eq("slug", params.slug).single()

  if (!clinic) {
    return {
      title: "クリニックが見つかりません | aga治療.com",
      description: "指定されたクリニックが見つかりませんでした。",
    }
  }

  const specialties = clinic.featured_subjects
    ? clinic.featured_subjects.split(",").map((s: string) => s.trim())
    : []
  const specialtiesText = specialties.length > 0 ? specialties.join("・") : "AGA治療"

  const title = `${clinic.clinic_name} | ${clinic.municipalities} ${specialtiesText} | aga治療.com`
  const description = `${clinic.prefecture}${clinic.municipalities}の${clinic.clinic_name}。${specialtiesText}の診療を行っています。${clinic.stations ? `${clinic.stations}。` : ""}診療時間、アクセス、口コミ情報を掲載。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ja_JP",
      siteName: "aga治療.com",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function ClinicDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: clinic, error } = await supabase.from("clinics").select("*").eq("slug", params.slug).single()

  if (error || !clinic) {
    console.error("[Error] Fetching clinic:", error)
    notFound()
  }

  // 料金情報（モック - 実際はDBから取得または別テーブルから取得）
  const clinicWithPrices: ClinicWithPrices = {
    ...clinic,
    min_price: 3400,
    prices: [
      { name: "初診料", price: 0, note: "キャンペーン中" },
      { name: "フィナステリド", price: 3400, note: "1ヶ月分" },
      { name: "デュタステリド", price: 8000, note: "1ヶ月分" },
    ],
  }

  const specialties = clinic.featured_subjects ? clinic.featured_subjects.split(",").map((s: string) => s.trim()) : []

  // 診療時間をパース
  const weekdaysMap = [
    { en: "hours_monday", jp: "月曜" },
    { en: "hours_tuesday", jp: "火曜" },
    { en: "hours_wednesday", jp: "水曜" },
    { en: "hours_thursday", jp: "木曜" },
    { en: "hours_friday", jp: "金曜" },
    { en: "hours_saturday", jp: "土曜" },
    { en: "hours_sunday", jp: "日曜" },
    { en: "hours_holiday", jp: "祝" },
  ]
  const businessHours: Array<{ day: string; hours: string }> = []
  weekdaysMap.forEach(({ en, jp }) => {
    if (clinic[en] && clinic[en] !== "-") {
      businessHours.push({ day: jp, hours: clinic[en] })
    }
  })

  // 専門医情報をパース
  const specialists = clinic.specialist_doctors
    ? clinic.specialist_doctors.split(",").map((s: string) => s.trim()).filter(Boolean)
    : []
  const diseases = clinic.treatable_diseases
    ? clinic.treatable_diseases.split(",").map((s: string) => s.trim()).filter(Boolean)
    : []
  const treatments = clinic.specialized_treatments
    ? clinic.specialized_treatments.split(",").map((s: string) => s.trim()).filter(Boolean)
    : []

  // 構造化データを生成
  const structuredData = generateClinicStructuredData(clinicWithPrices)

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-24 lg:pb-0">
      {/* 構造化データ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Header />

      {/* パンくずリスト */}
      <ClinicBreadcrumbs
        prefecture={clinic.prefecture}
        municipalities={clinic.municipalities}
        clinicName={clinic.clinic_name}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* クリニックヘッダー */}
        <ClinicHeaderCard clinic={clinic} />

        {/* 料金プラン */}
        {clinicWithPrices.prices && <ClinicPriceTable prices={clinicWithPrices.prices} />}

        {/* 医師紹介 */}
        {clinic.director_name && (
          <div className="mb-10">
            <ClinicDoctorInfo directorName={clinic.director_name} specialistDoctors={clinic.specialist_doctors} />
          </div>
        )}

        {/* 診療時間 */}
        {businessHours.length > 0 && (
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 border-l-4 border-primary pl-3">
                <Clock className="h-5 w-5 text-primary" />
                診療時間
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="text-left py-3 px-4 font-medium text-foreground rounded-tl-lg">曜日</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground rounded-tr-lg">診療時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessHours.map(({ day, hours }) => (
                      <tr key={day} className="border-b last:border-0 hover:bg-muted transition">
                        <td className="py-3 px-4 font-medium text-foreground">{day}</td>
                        <td className="py-3 px-4 text-muted-foreground">{hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 専門的な情報 */}
        {(specialists.length > 0 || diseases.length > 0 || treatments.length > 0) && (
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 border-l-4 border-primary pl-3">
                <Stethoscope className="h-5 w-5 text-primary" />
                専門的な情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {specialists.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">専門医</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialists.map((specialist, i) => (
                      <Badge key={i} variant="outline">
                        {specialist}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {diseases.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">対応可能な疾患</h4>
                  <div className="flex flex-wrap gap-2">
                    {diseases.map((disease, i) => (
                      <Badge key={i} variant="secondary">
                        {disease}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {treatments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">専門的な治療</h4>
                  <div className="flex flex-wrap gap-2">
                    {treatments.map((treatment, i) => (
                      <Badge key={i} variant="secondary">
                        {treatment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* クリニックの特徴 */}
        {clinic.features && clinic.features !== "-" && (
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 border-l-4 border-primary pl-3">
                <Heart className="h-5 w-5 text-primary" />
                クリニックの特徴
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{clinic.features}</p>
            </CardContent>
          </Card>
        )}

        {/* 詳細情報テーブル */}
        <ClinicDetailTable clinic={clinic} />

        {/* Google Maps */}
        {clinic.address && (
          <section className="mb-20 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="bg-muted px-6 py-4 border-b border-border">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                アクセスマップ
              </h2>
            </div>
            <div className="relative h-64 md:h-80">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(clinic.address)}`}
                  title="クリニックの地図"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-muted text-muted-foreground font-bold">
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2" />
                    <p>Google Maps</p>
                    <p className="text-xs">{clinic.address}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* モバイル用Sticky CTA */}
      <ClinicStickyCTA url={clinic.url} />
    </div>
  )
}
