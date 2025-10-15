import { Train } from "lucide-react"
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

export default async function StationDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const stationInfo = getStationInfo(params.slug)
  const japaneseStationName = stationInfo?.ja || params.slug

  const { data: clinics, error } = await supabase
    .from("clinics")
    .select("*")
    .ilike("station", `%${japaneseStationName}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const stationName = japaneseStationName
  const prefecture = stationInfo?.prefecture || clinics?.[0]?.prefecture || ""
  const lines = stationInfo?.lines || []
  const clinicCount = clinics?.length || 0

  const clinicCards =
    clinics?.map((clinic) => ({
      id: clinic.id,
      name: clinic.name,
      slug: clinic.slug,
      address: clinic.address,
      station: clinic.station,
      specialties: clinic.specialties || [],
      phone: clinic.phone,
      website: clinic.website,
      prefecture: clinic.prefecture,
      city: clinic.city,
    })) || []

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
            <p className="text-sm text-muted-foreground">{clinicCount}件のクリニックが見つかりました</p>
          </div>
        </div>

        {/* クリニック一覧 */}
        <div className="container mx-auto px-4 py-12">
          {clinicCards.length > 0 ? (
            <div className="space-y-6">
              {clinicCards.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">この駅のクリニックは現在登録されていません。</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
