import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function StationsPage() {
  // 主要駅のモックデータ（都道府県別）
  const stationsByPrefecture = [
    {
      prefecture: "東京都",
      stations: [
        { name: "渋谷駅", slug: "shibuya", clinicCount: 245 },
        { name: "新宿駅", slug: "shinjuku", clinicCount: 312 },
        { name: "池袋駅", slug: "ikebukuro", clinicCount: 198 },
        { name: "品川駅", slug: "shinagawa", clinicCount: 156 },
        { name: "東京駅", slug: "tokyo", clinicCount: 189 },
        { name: "六本木駅", slug: "roppongi", clinicCount: 134 },
        { name: "三軒茶屋駅", slug: "sangenjaya", clinicCount: 87 },
        { name: "中野駅", slug: "nakano", clinicCount: 92 },
      ],
    },
    {
      prefecture: "神奈川県",
      stations: [
        { name: "横浜駅", slug: "yokohama", clinicCount: 278 },
        { name: "川崎駅", slug: "kawasaki", clinicCount: 165 },
        { name: "武蔵小杉駅", slug: "musashikosugi", clinicCount: 98 },
        { name: "みなとみらい駅", slug: "minatomirai", clinicCount: 76 },
      ],
    },
    {
      prefecture: "大阪府",
      stations: [
        { name: "梅田駅", slug: "umeda", clinicCount: 298 },
        { name: "難波駅", slug: "namba", clinicCount: 234 },
        { name: "天王寺駅", slug: "tennoji", clinicCount: 187 },
        { name: "京橋駅", slug: "kyobashi", clinicCount: 145 },
      ],
    },
  ]

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
            <p className="text-muted-foreground">最寄り駅からクリニックを検索できます</p>
          </div>
        </div>

      {/* 駅一覧 */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {stationsByPrefecture.map((prefectureData) => (
            <div key={prefectureData.prefecture}>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-coral" />
                {prefectureData.prefecture}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {prefectureData.stations.map((station) => (
                  <Link key={station.slug} href={`/stations/${station.slug}`} className="group">
                    <div className="bg-white rounded-lg p-4 border border-border hover:border-coral transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground group-hover:text-coral transition-colors">
                          {station.name}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-coral transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">{station.clinicCount}件のクリニック</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* エリアから探すリンク */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">エリアからも検索できます</p>
          <Button asChild variant="outline">
            <Link href="/areas">エリアから探す</Link>
          </Button>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  )
}
