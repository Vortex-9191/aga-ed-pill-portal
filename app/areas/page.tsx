import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const regions = [
  {
    name: "関東",
    prefectures: [
      { name: "東京都", slug: "tokyo", count: 2345 },
      { name: "神奈川県", slug: "kanagawa", count: 1234 },
      { name: "埼玉県", slug: "saitama", count: 987 },
      { name: "千葉県", slug: "chiba", count: 876 },
      { name: "茨城県", slug: "ibaraki", count: 543 },
      { name: "栃木県", slug: "tochigi", count: 432 },
      { name: "群馬県", slug: "gunma", count: 398 },
    ],
  },
  {
    name: "関西",
    prefectures: [
      { name: "大阪府", slug: "osaka", count: 1567 },
      { name: "兵庫県", slug: "hyogo", count: 876 },
      { name: "京都府", slug: "kyoto", count: 654 },
      { name: "奈良県", slug: "nara", count: 432 },
      { name: "滋賀県", slug: "shiga", count: 321 },
      { name: "和歌山県", slug: "wakayama", count: 234 },
    ],
  },
  {
    name: "中部",
    prefectures: [
      { name: "愛知県", slug: "aichi", count: 987 },
      { name: "静岡県", slug: "shizuoka", count: 765 },
      { name: "岐阜県", slug: "gifu", count: 543 },
      { name: "長野県", slug: "nagano", count: 456 },
      { name: "新潟県", slug: "niigata", count: 432 },
      { name: "富山県", slug: "toyama", count: 321 },
      { name: "石川県", slug: "ishikawa", count: 298 },
      { name: "福井県", slug: "fukui", count: 234 },
      { name: "山梨県", slug: "yamanashi", count: 198 },
    ],
  },
  {
    name: "九州・沖縄",
    prefectures: [
      { name: "福岡県", slug: "fukuoka", count: 876 },
      { name: "熊本県", slug: "kumamoto", count: 543 },
      { name: "鹿児島県", slug: "kagoshima", count: 432 },
      { name: "長崎県", slug: "nagasaki", count: 398 },
      { name: "大分県", slug: "oita", count: 345 },
      { name: "宮崎県", slug: "miyazaki", count: 298 },
      { name: "佐賀県", slug: "saga", count: 234 },
      { name: "沖縄県", slug: "okinawa", count: 456 },
    ],
  },
  {
    name: "北海道・東北",
    prefectures: [
      { name: "北海道", slug: "hokkaido", count: 765 },
      { name: "宮城県", slug: "miyagi", count: 543 },
      { name: "福島県", slug: "fukushima", count: 432 },
      { name: "青森県", slug: "aomori", count: 321 },
      { name: "岩手県", slug: "iwate", count: 298 },
      { name: "秋田県", slug: "akita", count: 234 },
      { name: "山形県", slug: "yamagata", count: 234 },
    ],
  },
  {
    name: "中国・四国",
    prefectures: [
      { name: "広島県", slug: "hiroshima", count: 654 },
      { name: "岡山県", slug: "okayama", count: 543 },
      { name: "山口県", slug: "yamaguchi", count: 432 },
      { name: "愛媛県", slug: "ehime", count: 398 },
      { name: "香川県", slug: "kagawa", count: 321 },
      { name: "徳島県", slug: "tokushima", count: 234 },
      { name: "高知県", slug: "kochi", count: 234 },
      { name: "鳥取県", slug: "tottori", count: 198 },
      { name: "島根県", slug: "shimane", count: 198 },
    ],
  },
]

export default function AreasPage() {
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
                  <BreadcrumbPage>エリア一覧</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-16 md:py-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">エリアから探す</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              全国47都道府県のAGA治療クリニックを地域から検索できます
            </p>
          </div>
        </div>

        {/* Regions */}
        <div className="container py-16 md:py-20">
          <div className="space-y-16">
            {regions.map((region) => (
              <div key={region.name}>
                <h2 className="mb-8 text-2xl font-bold text-foreground border-l-4 border-primary pl-4">
                  {region.name}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {region.prefectures.map((prefecture) => (
                    <Link key={prefecture.slug} href={`/areas/${prefecture.slug}`}>
                      <Card className="group h-full rounded-xl border border-border transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                {prefecture.name}
                              </h3>
                              <p className="text-sm text-muted-foreground font-medium">{prefecture.count}件</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
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
