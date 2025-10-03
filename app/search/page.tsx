import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { ClinicCard } from "@/components/clinic-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const mockClinics = [
  {
    id: "1",
    name: "さくらクリニック",
    slug: "sakura-clinic",
    address: "東京都渋谷区渋谷1-2-3 渋谷ビル2F",
    station: "渋谷駅",
    distance: "3分",
    specialties: ["内科", "小児科"],
    rating: 4.5,
    reviewCount: 128,
    openNow: true,
    features: ["当日受診可能", "オンライン診療対応", "土日祝日診療"],
    phone: "03-1234-5678",
    hours: "9:00-18:00",
  },
  {
    id: "2",
    name: "みどり総合クリニック",
    slug: "midori-clinic",
    address: "東京都新宿区新宿2-3-4 新宿タワー1F",
    station: "新宿駅",
    distance: "5分",
    specialties: ["内科", "皮膚科", "整形外科"],
    rating: 4.3,
    reviewCount: 95,
    openNow: false,
    features: ["駐車場あり", "バリアフリー", "クレジットカード可"],
    phone: "03-2345-6789",
    hours: "9:00-17:00",
  },
  {
    id: "3",
    name: "ひまわり小児科クリニック",
    slug: "himawari-clinic",
    address: "東京都世田谷区三軒茶屋1-1-1",
    station: "三軒茶屋駅",
    distance: "2分",
    specialties: ["小児科"],
    rating: 4.8,
    reviewCount: 203,
    openNow: true,
    features: ["キッズスペースあり", "当日受診可能", "土日祝日診療"],
    phone: "03-3456-7890",
    hours: "9:00-19:00",
  },
  {
    id: "4",
    name: "あおぞら内科クリニック",
    slug: "aozora-clinic",
    address: "東京都品川区大崎2-2-2 大崎プラザ3F",
    station: "大崎駅",
    distance: "4分",
    specialties: ["内科", "循環器内科"],
    rating: 4.2,
    reviewCount: 67,
    openNow: true,
    features: ["オンライン診療対応", "夜間診療", "クレジットカード可"],
    phone: "03-4567-8901",
    hours: "9:00-20:00",
  },
]

export default function SearchPage() {
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
                  <h1 className="text-2xl font-bold text-foreground">東京都のクリニック</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{mockClinics.length}件の検索結果</p>
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
                {mockClinics.map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
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
