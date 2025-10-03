import Link from "next/link"
import { MapPin, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// モックデータ
const stationData: Record<string, any> = {
  shibuya: {
    name: "渋谷駅",
    lines: ["JR山手線", "東京メトロ銀座線", "東京メトロ半蔵門線", "東急東横線", "東急田園都市線", "京王井の頭線"],
    prefecture: "東京都",
    city: "渋谷区",
    clinics: [
      {
        id: 1,
        name: "渋谷内科クリニック",
        slug: "shibuya-naika",
        specialties: ["内科", "消化器内科"],
        address: "東京都渋谷区渋谷1-1-1",
        station: "渋谷駅",
        distance: "徒歩3分",
        rating: 4.5,
        reviewCount: 128,
        image: "/modern-clinic-exterior.jpg",
        features: ["土日診療", "オンライン診療", "駅近"],
      },
      {
        id: 2,
        name: "渋谷皮膚科",
        slug: "shibuya-hifuka",
        specialties: ["皮膚科", "美容皮膚科"],
        address: "東京都渋谷区渋谷2-2-2",
        station: "渋谷駅",
        distance: "徒歩5分",
        rating: 4.7,
        reviewCount: 95,
        image: "/dermatology-clinic.png",
        features: ["女性医師", "予約優先", "駅近"],
      },
      {
        id: 3,
        name: "渋谷歯科医院",
        slug: "shibuya-shika",
        specialties: ["歯科", "矯正歯科"],
        address: "東京都渋谷区渋谷3-3-3",
        station: "渋谷駅",
        distance: "徒歩7分",
        rating: 4.3,
        reviewCount: 67,
        image: "/dental-clinic.png",
        features: ["夜間診療", "駐車場あり"],
      },
    ],
  },
  shinjuku: {
    name: "新宿駅",
    lines: ["JR山手線", "JR中央線", "東京メトロ丸ノ内線", "都営新宿線", "小田急線", "京王線"],
    prefecture: "東京都",
    city: "新宿区",
    clinics: [
      {
        id: 4,
        name: "新宿総合クリニック",
        slug: "shinjuku-sogo",
        specialties: ["内科", "外科", "整形外科"],
        address: "東京都新宿区新宿1-1-1",
        station: "新宿駅",
        distance: "徒歩2分",
        rating: 4.6,
        reviewCount: 156,
        image: "/general-clinic.jpg",
        features: ["土日診療", "予約可", "駅近"],
      },
    ],
  },
}

export default function StationDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const station = stationData[params.slug] || stationData.shibuya
  const clinicCount = station.clinics.length

  return (
    <div className="min-h-screen bg-background">
      {/* パンくずリスト */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/stations">駅名から探す</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{station.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ヘッダー */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-coral/10 p-3 rounded-lg">
              <Train className="w-8 h-8 text-coral" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-coral mb-2">{station.name}のクリニック</h1>
              <p className="text-muted-foreground mb-3">
                {station.prefecture} {station.city}
              </p>
              <div className="flex flex-wrap gap-2">
                {station.lines.map((line: string) => (
                  <Badge key={line} variant="secondary">
                    {line}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{clinicCount}件のクリニックが見つかりました</p>
        </div>
      </div>

      {/* クリニック一覧 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {station.clinics.map((clinic: any) => (
            <Link key={clinic.id} href={`/clinics/${clinic.slug}`} className="group">
              <div className="bg-white rounded-lg overflow-hidden border border-border hover:border-coral transition-all hover:shadow-lg">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={clinic.image || "/placeholder.svg"}
                    alt={clinic.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-coral transition-colors">
                    {clinic.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {clinic.specialties.map((specialty: string) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{clinic.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{clinic.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({clinic.reviewCount}件)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {clinic.features.map((feature: string) => (
                      <span key={feature} className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* もっと見るボタン */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            さらに読み込む
          </Button>
        </div>
      </div>
    </div>
  )
}
