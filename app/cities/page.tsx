import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const prefectures = [
  {
    name: "北海道・東北",
    cities: [
      { name: "札幌市", slug: "sapporo", prefecture: "北海道", clinics: 245 },
      { name: "仙台市", slug: "sendai", prefecture: "宮城県", clinics: 189 },
      { name: "函館市", slug: "hakodate", prefecture: "北海道", clinics: 78 },
      { name: "旭川市", slug: "asahikawa", prefecture: "北海道", clinics: 92 },
    ],
  },
  {
    name: "関東",
    cities: [
      { name: "東京23区", slug: "tokyo-23ku", prefecture: "東京都", clinics: 1250 },
      { name: "横浜市", slug: "yokohama", prefecture: "神奈川県", clinics: 456 },
      { name: "川崎市", slug: "kawasaki", prefecture: "神奈川県", clinics: 298 },
      { name: "さいたま市", slug: "saitama", prefecture: "埼玉県", clinics: 234 },
      { name: "千葉市", slug: "chiba", prefecture: "千葉県", clinics: 198 },
      { name: "相模原市", slug: "sagamihara", prefecture: "神奈川県", clinics: 156 },
    ],
  },
  {
    name: "中部",
    cities: [
      { name: "名古屋市", slug: "nagoya", prefecture: "愛知県", clinics: 567 },
      { name: "静岡市", slug: "shizuoka", prefecture: "静岡県", clinics: 178 },
      { name: "浜松市", slug: "hamamatsu", prefecture: "静岡県", clinics: 165 },
      { name: "新潟市", slug: "niigata", prefecture: "新潟県", clinics: 143 },
    ],
  },
  {
    name: "関西",
    cities: [
      { name: "大阪市", slug: "osaka", prefecture: "大阪府", clinics: 789 },
      { name: "京都市", slug: "kyoto", prefecture: "京都府", clinics: 345 },
      { name: "神戸市", slug: "kobe", prefecture: "兵庫県", clinics: 298 },
      { name: "堺市", slug: "sakai", prefecture: "大阪府", clinics: 187 },
    ],
  },
  {
    name: "中国・四国",
    cities: [
      { name: "広島市", slug: "hiroshima", prefecture: "広島県", clinics: 234 },
      { name: "岡山市", slug: "okayama", prefecture: "岡山県", clinics: 156 },
      { name: "松山市", slug: "matsuyama", prefecture: "愛媛県", clinics: 98 },
    ],
  },
  {
    name: "九州・沖縄",
    cities: [
      { name: "福岡市", slug: "fukuoka", prefecture: "福岡県", clinics: 398 },
      { name: "北九州市", slug: "kitakyushu", prefecture: "福岡県", clinics: 167 },
      { name: "熊本市", slug: "kumamoto", prefecture: "熊本県", clinics: 145 },
      { name: "那覇市", slug: "naha", prefecture: "沖縄県", clinics: 112 },
    ],
  },
]

export default function CitiesPage() {
  const totalCities = prefectures.reduce((sum, region) => sum + region.cities.length, 0)

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
                <BreadcrumbPage>市区町村一覧</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">市区町村一覧</h1>
            <p className="text-muted-foreground">全{totalCities}市区町村のクリニックを検索</p>
          </div>

          <div className="space-y-12">
            {prefectures.map((region) => (
              <div key={region.name}>
                <h2 className="mb-6 text-xl font-bold text-[#FF6B6B] border-b-2 border-[#FF6B6B] pb-2">
                  {region.name}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {region.cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/cities/${city.slug}`}
                      className="group block rounded-lg border bg-card p-4 transition-all hover:border-[#FF6B6B] hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-[#FF6B6B] transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{city.prefecture}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#FF6B6B]">{city.clinics}</p>
                          <p className="text-xs text-muted-foreground">件</p>
                        </div>
                      </div>
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
