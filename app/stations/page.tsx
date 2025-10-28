import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Pagination } from "@/components/pagination"
import Link from "next/link"
import { MapPin, ChevronRight, Train } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTopStations } from "@/lib/db-stats"
import { getStationSlug } from "@/lib/data/stations"
import type { Metadata } from "next"

const ITEMS_PER_PAGE = 15

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function StationsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1

  // Get all stations with 2+ clinics from database
  const stations = await getTopStations(5000) // Get up to 5000 stations

  // Sort by Japanese 50-on order (あいうえお順)
  const allStations = stations.sort((a, b) =>
    a.name.localeCompare(b.name, 'ja')
  )

  // Calculate pagination
  const totalStations = allStations.length
  const totalPages = Math.ceil(totalStations / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE

  // Get paginated stations
  const paginatedStations = allStations.slice(from, to)


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
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

        {/* ヘッダー */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-coral mb-2">駅名から探す</h1>
            <p className="text-muted-foreground">
              全国{totalStations}駅のクリニック情報を検索できます
              （{from + 1}〜{Math.min(to, totalStations)}件を表示）
            </p>
          </div>
        </div>

        {/* 駅一覧 */}
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {paginatedStations.map((station) => {
                const slug = getStationSlug(station.name)

                if (!slug) {
                  // Render as non-clickable if no slug mapping
                  return (
                    <div
                      key={station.name}
                      className="bg-muted/50 rounded-lg p-3 border border-border opacity-60"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-muted-foreground text-sm truncate">
                          {station.name}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{station.count}件</p>
                    </div>
                  )
                }

                return (
                  <Link key={station.name} href={`/stations/${slug}`} className="group">
                    <div className="bg-white rounded-lg p-3 border border-border hover:border-coral transition-colors h-full">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground group-hover:text-coral transition-colors text-sm truncate">
                          {station.name}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-coral transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground">{station.count}件</p>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-8">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
