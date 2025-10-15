import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Phone, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

                {clinic.clinic_spec && (
                  <p className="text-muted-foreground leading-relaxed mb-4">{clinic.clinic_spec}</p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{clinic.address}</p>
                      {clinic.stations && <p className="mt-1">{clinic.stations}</p>}
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
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">基本情報</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground mb-1">クリニック名</dt>
                      <dd className="text-foreground">{clinic.clinic_name}</dd>
                    </div>
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
                  </dl>
                </CardContent>
              </Card>
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
