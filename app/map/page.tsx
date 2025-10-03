import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPlaceholder } from "@/components/map-placeholder"
import { MapClinicCard } from "@/components/map-clinic-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, Navigation } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockClinics = [
  {
    id: "1",
    name: "さくらクリニック",
    slug: "sakura-clinic",
    address: "東京都渋谷区渋谷1-2-3",
    distance: "現在地から350m",
    specialties: ["内科", "小児科"],
    rating: 4.5,
    reviewCount: 128,
    openNow: true,
    phone: "03-1234-5678",
  },
  {
    id: "2",
    name: "みどり総合クリニック",
    slug: "midori-clinic",
    address: "東京都新宿区新宿2-3-4",
    distance: "現在地から520m",
    specialties: ["内科", "皮膚科", "整形外科"],
    rating: 4.3,
    reviewCount: 95,
    openNow: false,
    phone: "03-2345-6789",
  },
  {
    id: "3",
    name: "ひまわり小児科",
    slug: "himawari-clinic",
    address: "東京都世田谷区三軒茶屋1-1-1",
    distance: "現在地から680m",
    specialties: ["小児科"],
    rating: 4.8,
    reviewCount: 203,
    openNow: true,
    phone: "03-3456-7890",
  },
  {
    id: "4",
    name: "あおぞら内科",
    slug: "aozora-clinic",
    address: "東京都品川区大崎2-2-2",
    distance: "現在地から750m",
    specialties: ["内科", "循環器内科"],
    rating: 4.2,
    reviewCount: 67,
    openNow: true,
    phone: "03-4567-8901",
  },
]

export default function MapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Search Bar */}
        <div className="border-b border-border bg-card">
          <div className="container py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="地域名、駅名で検索" className="h-10 pl-9" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  絞り込み
                </Button>
                <Button size="sm">
                  <Navigation className="mr-2 h-4 w-4" />
                  現在地
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="h-[calc(100vh-180px)] flex">
          {/* Map */}
          <div className="flex-1 relative">
            <MapPlaceholder />
          </div>

          {/* Sidebar */}
          <aside className="w-full sm:w-96 border-l border-border bg-background overflow-y-auto">
            <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-foreground">近くのクリニック</h2>
                <span className="text-sm text-muted-foreground">{mockClinics.length}件</span>
              </div>
              <Select defaultValue="distance">
                <SelectTrigger className="w-full h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">距離が近い順</SelectItem>
                  <SelectItem value="rating">評価が高い順</SelectItem>
                  <SelectItem value="reviews">口コミが多い順</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 space-y-3">
              {mockClinics.map((clinic) => (
                <MapClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
