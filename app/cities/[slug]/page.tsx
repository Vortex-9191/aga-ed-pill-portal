import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

const cityData: Record<string, { name: string; prefecture: string; prefectureSlug: string }> = {
  "tokyo-23ku": { name: "東京23区", prefecture: "東京都", prefectureSlug: "tokyo" },
  yokohama: { name: "横浜市", prefecture: "神奈川県", prefectureSlug: "kanagawa" },
  osaka: { name: "大阪市", prefecture: "大阪府", prefectureSlug: "osaka" },
  nagoya: { name: "名古屋市", prefecture: "愛知県", prefectureSlug: "aichi" },
}

const mockClinics = [
  {
    id: "1",
    name: "さくらクリニック",
    specialties: ["内科", "小児科"],
    address: "東京都渋谷区1-2-3",
    station: "渋谷駅",
    distance: "5分",
    rating: 4.5,
    reviews: 128,
    image: "/modern-clinic-exterior.jpg",
    tags: ["土日診療", "夜間診療", "予約可"],
  },
  {
    id: "2",
    name: "健康第一クリニック",
    specialties: ["内科", "循環器科"],
    address: "東京都新宿区4-5-6",
    station: "新宿駅",
    distance: "3分",
    rating: 4.3,
    reviews: 95,
    image: "/general-clinic.jpg",
    tags: ["駅近", "予約可"],
  },
  {
    id: "3",
    name: "みどり皮膚科",
    specialties: ["皮膚科", "美容皮膚科"],
    address: "東京都港区7-8-9",
    station: "表参道駅",
    distance: "2分",
    rating: 4.7,
    reviews: 203,
    image: "/dermatology-clinic.png",
    tags: ["女性医師", "予約可", "駅近"],
  },
  {
    id: "4",
    name: "スマイル歯科クリニック",
    specialties: ["歯科", "矯正歯科"],
    address: "東京都品川区10-11-12",
    station: "品川駅",
    distance: "4分",
    rating: 4.6,
    reviews: 167,
    image: "/dental-clinic.png",
    tags: ["土日診療", "予約可"],
  },
]

export default function CityDetailPage({ params }: { params: { slug: string } }) {
  const city = cityData[params.slug] || { name: "市区町村", prefecture: "都道府県", prefectureSlug: "prefecture" }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cities">市区町村一覧</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{city.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{city.name}のクリニック</h1>
            <p className="text-muted-foreground">
              {city.prefecture} {city.name}のクリニック一覧
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">
              クリニック一覧
              <span className="ml-2 text-base font-normal text-muted-foreground">({mockClinics.length}件)</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {mockClinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              さらに読み込む
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
