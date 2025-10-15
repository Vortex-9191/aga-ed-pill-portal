import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { ClinicCard } from "@/components/clinic-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/server"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; prefecture?: string }
}) {
  const supabase = await createClient()
  const query = searchParams.q || ""
  const prefecture = searchParams.prefecture || "東京都"

  let queryBuilder = supabase.from("clinics").select("*")

  if (prefecture) {
    queryBuilder = queryBuilder.eq("prefecture", prefecture)
  }

  if (query) {
    queryBuilder = queryBuilder.or(
      `clinic_name.ilike.%${query}%,address.ilike.%${query}%,stations.ilike.%${query}%,featured_subjects.ilike.%${query}%`
    )
  }

  const { data: clinics, error } = await queryBuilder.order("created_at", { ascending: false }).limit(50)

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const clinicCards =
    clinics?.map((clinic) => ({
      id: clinic.id,
      name: clinic.clinic_name,
      slug: clinic.slug,
      address: clinic.address,
      station: clinic.stations || "",
      specialties: clinic.featured_subjects ? clinic.featured_subjects.split(", ") : [],
      phone: clinic.corp_tel,
      prefecture: clinic.prefecture,
      city: clinic.municipalities,
    })) || []
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Search Header */}
        <div className="border-b border-border bg-card">
          <div className="container py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="地域名、駅名、診療科で検索"
                  className="h-12 pl-10"
                  defaultValue="東京都"
                />
              </div>
              <Button size="lg" className="md:w-auto">
                検索
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <SearchFilters />
              </div>
            </aside>

            {/* Results */}
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {prefecture}のクリニック{query && `「${query}」の検索結果`}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">{clinicCards.length}件の検索結果</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    絞り込み
                  </Button>
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">おすすめ順</SelectItem>
                      <SelectItem value="rating">評価が高い順</SelectItem>
                      <SelectItem value="reviews">口コミが多い順</SelectItem>
                      <SelectItem value="distance">距離が近い順</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clinic Cards */}
              <div className="space-y-4">
                {clinicCards.length > 0 ? (
                  clinicCards.map((clinic) => <ClinicCard key={clinic.id} clinic={clinic} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      検索条件に一致するクリニックが見つかりませんでした。
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 pt-8">
                <Button variant="outline" disabled>
                  前へ
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">次へ</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
