import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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

export default async function StationsPage() {
  // Get all stations with 2+ clinics from database
  const allStations = await getTopStations(5000) // Get up to 5000 stations

  // Group stations by prefecture (inferred from station mapping or just alphabetically)
  const stationGroups: Record<string, typeof allStations> = {}

  for (const station of allStations) {
    // For simplicity, group alphabetically by first character
    const firstChar = station.name.charAt(0)
    const group = firstChar >= 'あ' && firstChar <= 'た' ? 'あ行〜た行' :
                  firstChar >= 'な' && firstChar <= 'わ' ? 'な行〜わ行' :
                  firstChar >= 'ア' && firstChar <= 'タ' ? 'ア行〜タ行' :
                  firstChar >= 'ナ' && firstChar <= 'ワ' ? 'ナ行〜ワ行' :
                  'その他'

    if (!stationGroups[group]) {
      stationGroups[group] = []
    }
    stationGroups[group].push(station)
  }

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
              全国{allStations.length}駅のクリニック情報を検索できます
            </p>
          </div>
        </div>

        {/* 駅一覧 */}
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-12">
            {Object.entries(stationGroups).map(([groupName, stations]) => (
              <div key={groupName}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Train className="w-6 h-6 text-coral" />
                  {groupName}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {stations.map((station) => {
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
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
