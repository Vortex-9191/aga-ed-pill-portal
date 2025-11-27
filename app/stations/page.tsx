import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Train } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getAllStations, REGIONS } from "@/lib/api/locations"
import { StationList } from "@/components/station-list"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

export default async function StationsPage() {
  const stations = await getAllStations()

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
                  <BreadcrumbPage>駅名一覧</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="container py-16 md:py-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
                <Train className="h-7 w-7 text-teal-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl leading-tight tracking-tight">駅名から探す</h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              全国{stations.length}駅のAGA治療クリニック情報を検索できます
            </p>
          </div>
        </div>

        <StationList stations={stations} regions={REGIONS} />
      </main>
      <Footer />
    </div>
  )
}
