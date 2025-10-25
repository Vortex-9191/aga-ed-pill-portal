import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Pagination } from "@/components/pagination"
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
import type { Metadata } from "next"

const ITEMS_PER_PAGE = 15

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CitiesPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1

  // Get all municipalities with 3+ clinics from database
  const allMunicipalities = await getTopMunicipalities(1000) // Get up to 1000 municipalities

  // Calculate pagination
  const totalMunicipalities = allMunicipalities.length
  const totalPages = Math.ceil(totalMunicipalities / ITEMS_PER_PAGE)
  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE

  // Get paginated municipalities
  const paginatedMunicipalities = allMunicipalities.slice(from, to)

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
              全国{totalMunicipalities}市区町村のクリニック情報を検索できます
              （{from + 1}〜{Math.min(to, totalMunicipalities)}件を表示）
            </p>
          </div>
        </div>

        {/* 市区町村一覧 */}
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {paginatedMunicipalities.map((municipality) => {
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
