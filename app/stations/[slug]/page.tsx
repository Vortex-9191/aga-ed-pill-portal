import { Train, MapPin } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { createClient } from "@/lib/supabase/server"
import { ClinicCard } from "@/components/clinic-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getStationInfo } from "@/lib/data/stations"
import { getMunicipalitySlug } from "@/lib/data/municipalities"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination } from "@/components/pagination"

const ITEMS_PER_PAGE = 15

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const stationInfo = getStationInfo(params.slug)
  const stationName = stationInfo?.ja || params.slug

  return {
    title: `${stationName}の精神科・心療内科 ${stationInfo?.prefecture ? `| ${stationInfo.prefecture}` : ""} | 全国精神科ドットコム`,
    description: `${stationName}周辺の精神科・心療内科を検索。${stationInfo?.prefecture || ""}${stationName}から通える心療内科・精神科クリニックの診療時間、アクセス、口コミ情報を掲載。`,
  }
}

export default async function StationDetailPage({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { page?: string }
}) {
  const supabase = await createClient()

  const stationInfo = getStationInfo(params.slug)
  const japaneseStationName = stationInfo?.ja || params.slug

  const currentPage = Number(searchParams.page) || 1

  // Get total count
  const { count: totalCount } = await supabase
    .from("clinics")
    .select("*", { count: "exact", head: true })
    .ilike("stations", `%${japaneseStationName}%`)

  // Calculate pagination
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const { data: clinics, error } = await supabase
    .from("clinics")
    .select("*")
    .ilike("stations", `%${japaneseStationName}%`)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const stationName = japaneseStationName
  const prefecture = stationInfo?.prefecture || clinics?.[0]?.prefecture || ""
  const lines = stationInfo?.lines || []
  const clinicCount = clinics?.length || 0

  const clinicCards =
    clinics?.map((clinic) => {
      // Get first weekday with hours for display
      const weekdays = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜']
      const firstHours = weekdays.find(day => clinic[day] && clinic[day] !== '-')
      const hoursPreview = firstHours ? `${firstHours}: ${clinic[firstHours]}` : null

      return {
        id: clinic.id,
        name: clinic.clinic_name,
        slug: clinic.slug,
        address: clinic.address,
        station: clinic.stations || '',
        specialties: clinic.featured_subjects ? clinic.featured_subjects.split(', ') : [],
        phone: clinic.corp_tel,
        prefecture: clinic.prefecture,
        city: clinic.municipalities,
        rating: clinic.口コミ評価,
        reviewCount: clinic.口コミ件数,
        hours: hoursPreview,
      }
    }) || []

  // Extract unique municipalities from clinics at this station
  const relatedMunicipalitiesSet = new Set<string>()
  clinics?.forEach((clinic) => {
    if (clinic.municipalities) {
      relatedMunicipalitiesSet.add(clinic.municipalities.trim())
    }
  })
  const relatedMunicipalities = Array.from(relatedMunicipalitiesSet).slice(0, 10) // Limit to 10 municipalities

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* パンくずリスト */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/stations">駅名から探す</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{stationName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-coral/10 p-3 rounded-lg">
                <Train className="w-8 h-8 text-coral" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-coral mb-2">{stationName}のクリニック</h1>
                {prefecture && <p className="text-muted-foreground mb-3">{prefecture}</p>}
                {lines.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {lines.map((line) => (
                      <span key={line} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {line}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {totalCount || 0}件中 {from + 1}〜{Math.min(to + 1, totalCount || 0)}件を表示
            </p>
          </div>
        </div>

        {/* クリニック一覧 */}
        <div className="container mx-auto px-4 py-12">
          {clinicCards.length > 0 ? (
            <>
              <div className="space-y-6 mb-12">
                {clinicCards.map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="pb-8">
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">この駅のクリニックは現在登録されていません。</p>
            </div>
          )}

          {/* Related Municipalities Section */}
          {relatedMunicipalities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {stationName}周辺の市区町村
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {relatedMunicipalities.map((municipality) => {
                    const slug = getMunicipalitySlug(municipality)
                    if (!slug) {
                      // If no slug mapping, display without link
                      return (
                        <div
                          key={municipality}
                          className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30"
                        >
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{municipality}</span>
                        </div>
                      )
                    }
                    return (
                      <Link
                        key={municipality}
                        href={`/cities/${slug}`}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent hover:border-primary transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{municipality}</span>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
