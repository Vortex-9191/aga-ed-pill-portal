import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { MapPin, ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTopMunicipalities } from "@/lib/db-stats"
import { getMunicipalitySlug } from "@/lib/data/municipalities"

export default async function CitiesPage() {
  // Get all municipalities with 3+ clinics from database
  const allMunicipalities = await getTopMunicipalities(1000) // Get up to 1000 municipalities

  // Group municipalities by prefecture
  const municipalityGroups: Record<string, typeof allMunicipalities> = {}

  for (const municipality of allMunicipalities) {
    const prefecture = municipality.prefecture || "その他"

    if (!municipalityGroups[prefecture]) {
      municipalityGroups[prefecture] = []
    }
    municipalityGroups[prefecture].push(municipality)
  }

  // Sort prefectures alphabetically
  const sortedPrefectures = Object.keys(municipalityGroups).sort()

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
                  <BreadcrumbPage>市区町村一覧</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-coral mb-2">市区町村から探す</h1>
            <p className="text-muted-foreground">
              全国{allMunicipalities.length}市区町村のクリニック情報を検索できます
            </p>
          </div>
        </div>

        {/* 市区町村一覧 */}
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-12">
            {sortedPrefectures.map((prefecture) => {
              const municipalities = municipalityGroups[prefecture]
              return (
                <div key={prefecture}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-coral" />
                    {prefecture}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {municipalities.map((municipality) => {
                      const slug = getMunicipalitySlug(municipality.name)

                      if (!slug) {
                        // Render as non-clickable if no slug mapping
                        return (
                          <div
                            key={municipality.name}
                            className="bg-muted/50 rounded-lg p-3 border border-border opacity-60"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium text-muted-foreground text-sm truncate">
                                {municipality.name}
                              </h3>
                            </div>
                            <p className="text-xs text-muted-foreground">{municipality.count}件</p>
                          </div>
                        )
                      }

                      return (
                        <Link
                          key={municipality.name}
                          href={`/cities/${slug}`}
                          className="group"
                        >
                          <div className="bg-white rounded-lg p-3 border border-border hover:border-coral transition-colors h-full">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium text-foreground group-hover:text-coral transition-colors text-sm truncate">
                                {municipality.name}
                              </h3>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-coral transition-colors flex-shrink-0" />
                            </div>
                            <p className="text-xs text-muted-foreground">{municipality.count}件</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
