import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Phone, ExternalLink, MapPin, Clock, Star, User, Stethoscope, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()
  const { data: clinic } = await supabase.from("clinics").select("*").eq("slug", params.slug).single()

  if (!clinic) {
    return {
      title: "クリニックが見つかりません | 全国精神科ドットコム",
      description: "指定されたクリニックが見つかりませんでした。",
    }
  }

  const specialties = clinic.featured_subjects
    ? clinic.featured_subjects.split(",").map((s: string) => s.trim())
    : []
  const specialtiesText = specialties.length > 0 ? specialties.join("・") : "精神科・心療内科"

  return {
    title: `${clinic.clinic_name} | ${clinic.municipalities} ${specialtiesText} | 全国精神科ドットコム`,
    description: `${clinic.prefecture}${clinic.municipalities}の${clinic.clinic_name}。${specialtiesText}の診療を行っています。${clinic.stations ? `${clinic.stations}。` : ""}診療時間、アクセス、口コミ情報を掲載。`,
  }
}

export default async function ClinicDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: clinic, error } = await supabase.from("clinics").select("*").eq("slug", params.slug).single()

  if (error || !clinic) {
    console.error("[v0] Error fetching clinic:", error)
    notFound()
  }

  const specialties = clinic.featured_subjects ? clinic.featured_subjects.split(",").map((s: string) => s.trim()) : []

  // Parse business hours by weekday
  const weekdays = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜', '祝']
  const businessHours: Record<string, string> = {}
  weekdays.forEach((day) => {
    if (clinic[day]) {
      businessHours[day] = clinic[day]
    }
  })

  // Parse specialist info
  const specialists = clinic.専門医 ? clinic.専門医.split(',').map((s: string) => s.trim()).filter(Boolean) : []
  const diseases = clinic.対応可能な疾患 ? clinic.対応可能な疾患.split(',').map((s: string) => s.trim()).filter(Boolean) : []
  const treatments = clinic.専門的な治療 ? clinic.専門的な治療.split(',').map((s: string) => s.trim()).filter(Boolean) : []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ホーム
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/areas" className="hover:text-foreground transition-colors">
                エリア一覧
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/areas/${clinic.prefecture}`} className="hover:text-foreground transition-colors">
                {clinic.prefecture}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{clinic.clinic_name}</span>
            </nav>
          </div>
        </div>

        {/* Clinic Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-3 md:text-4xl">{clinic.clinic_name}</h1>

                {specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Ratings */}
                {(clinic.口コミ評価 || clinic.口コミ件数) && (
                  <div className="flex items-center gap-3 mb-4">
                    {clinic.口コミ評価 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-semibold">{clinic.口コミ評価.toFixed(1)}</span>
                      </div>
                    )}
                    {clinic.口コミ件数 && clinic.口コミ件数 > 0 && (
                      <span className="text-muted-foreground">
                        ({clinic.口コミ件数}件の口コミ)
                      </span>
                    )}
                  </div>
                )}

                {clinic.院長名 && (
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">院長: <span className="text-foreground font-medium">{clinic.院長名}</span></span>
                  </div>
                )}

                {clinic.clinic_spec && (
                  <p className="text-muted-foreground leading-relaxed mb-4">{clinic.clinic_spec}</p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{clinic.address}</p>
                      {clinic.stations && <p className="mt-1">{clinic.stations}</p>}
                      {clinic.access_info && <p className="mt-1 text-xs">{clinic.access_info}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-64">
                {clinic.url && (
                  <Button size="lg" className="w-full" asChild>
                    <a href={clinic.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      公式サイト
                    </a>
                  </Button>
                )}
                {clinic.corp_tel && (
                  <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                    <a href={`tel:${clinic.corp_tel}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      電話で予約
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column - Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">基本情報</h3>
                  <dl className="space-y-4">
                    {clinic.院長名 && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">院長名</dt>
                        <dd className="text-foreground">{clinic.院長名}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground mb-1">住所</dt>
                      <dd className="text-foreground">{clinic.address}</dd>
                    </div>
                    {clinic.stations && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">最寄り駅</dt>
                        <dd className="text-foreground">{clinic.stations}</dd>
                      </div>
                    )}
                    {clinic.access_info && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">アクセス</dt>
                        <dd className="text-foreground text-sm">{clinic.access_info}</dd>
                      </div>
                    )}
                    {clinic.corp_tel && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">電話番号</dt>
                        <dd className="text-foreground">{clinic.corp_tel}</dd>
                      </div>
                    )}
                    {clinic.featured_subjects && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">診療科目</dt>
                        <dd className="text-foreground">{clinic.featured_subjects}</dd>
                      </div>
                    )}
                    {clinic.non_medical_response && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">対応</dt>
                        <dd className="text-foreground">{clinic.non_medical_response}</dd>
                      </div>
                    )}
                    {clinic.ホームページ && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">ホームページ</dt>
                        <dd>
                          <a
                            href={clinic.ホームページ}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {clinic.ホームページ}
                          </a>
                        </dd>
                      </div>
                    )}
                    {clinic.休診日 && clinic.休診日 !== '-' && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">休診日</dt>
                        <dd className="text-foreground">{clinic.休診日}</dd>
                      </div>
                    )}
                    {clinic.備考 && clinic.備考 !== '-' && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground mb-1">備考</dt>
                        <dd className="text-foreground whitespace-pre-wrap">{clinic.備考}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>

              {/* Business Hours */}
              {Object.keys(businessHours).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      診療時間
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground">曜日</th>
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground">診療時間</th>
                          </tr>
                        </thead>
                        <tbody>
                          {weekdays.map((day) => (
                            businessHours[day] && businessHours[day] !== '-' && (
                              <tr key={day} className="border-b last:border-0">
                                <td className="py-3 px-3 font-medium">{day}</td>
                                <td className="py-3 px-3 text-muted-foreground">{businessHours[day]}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Specialist Info */}
              {(specialists.length > 0 || diseases.length > 0 || treatments.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      専門的な情報
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {specialists.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">専門医</h4>
                        <div className="flex flex-wrap gap-2">
                          {specialists.map((specialist, i) => (
                            <Badge key={i} variant="outline">{specialist}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {diseases.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">対応可能な疾患</h4>
                        <div className="flex flex-wrap gap-2">
                          {diseases.map((disease, i) => (
                            <Badge key={i} variant="secondary">{disease}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {treatments.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">専門的な治療</h4>
                        <div className="flex flex-wrap gap-2">
                          {treatments.map((treatment, i) => (
                            <Badge key={i} variant="secondary">{treatment}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Features/Characteristics */}
              {clinic.特徴 && clinic.特徴 !== '-' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      クリニックの特徴
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{clinic.特徴}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">予約・お問い合わせ</h3>
                  <div className="space-y-3">
                    {clinic.url && (
                      <Button size="lg" className="w-full" asChild>
                        <a href={clinic.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-5 w-5" />
                          公式サイト
                        </a>
                      </Button>
                    )}
                    {clinic.corp_tel && (
                      <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                        <a href={`tel:${clinic.corp_tel}`}>
                          <Phone className="mr-2 h-5 w-5" />
                          {clinic.corp_tel}
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
