import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import Link from "next/link"
import { ChevronRight, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    name: "渋谷駅前クリニック",
    slug: "shibuya-ekimae-clinic",
    address: "東京都渋谷区渋谷2-1-1 渋谷駅前ビル3F",
    station: "渋谷駅",
    distance: "1分",
    specialties: ["内科", "皮膚科"],
    rating: 4.6,
    reviewCount: 156,
    openNow: true,
    features: ["駅近", "夜間診療", "クレジットカード可"],
    phone: "03-2345-6789",
    hours: "9:00-20:00",
  },
  {
    id: "3",
    name: "ひまわり小児科クリニック",
    slug: "himawari-clinic",
    address: "東京都渋谷区渋谷3-4-5",
    station: "渋谷駅",
    distance: "5分",
    specialties: ["小児科"],
    rating: 4.8,
    reviewCount: 203,
    openNow: true,
    features: ["キッズスペースあり", "当日受診可能", "土日祝日診療"],
    phone: "03-3456-7890",
    hours: "9:00-19:00",
  },
]

export default function CityPage({ params }: { params: { prefecture: string; city: string } }) {
  const prefectureName = "東京都"
  const cityName = "渋谷区"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ホーム
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/areas" className="hover:text-foreground transition-colors">
                エリア一覧
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/areas/${params.prefecture}`} className="hover:text-foreground transition-colors">
                {prefectureName}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{cityName}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">{cityName}のクリニック</h1>
            </div>
            <p className="text-lg text-muted-foreground">{mockClinics.length}件のクリニックが見つかりました</p>
          </div>
        </div>

        {/* Results */}
        <div className="container py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">クリニック一覧</h2>
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

          <div className="space-y-4">
            {mockClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
