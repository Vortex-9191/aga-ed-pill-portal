import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import Link from "next/link"
import { ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data
const mockCities = [
  { name: "渋谷区", slug: "shibuya", count: 234 },
  { name: "新宿区", slug: "shinjuku", count: 198 },
  { name: "港区", slug: "minato", count: 187 },
  { name: "世田谷区", slug: "setagaya", count: 176 },
  { name: "品川区", slug: "shinagawa", count: 154 },
  { name: "目黒区", slug: "meguro", count: 143 },
  { name: "大田区", slug: "ota", count: 132 },
  { name: "中野区", slug: "nakano", count: 121 },
]

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
    name: "ひまわり耳鼻咽喉科",
    slug: "himawari-clinic",
    address: "東京都港区六本木3-4-5 六本木プラザ3F",
    station: "六本木駅",
    distance: "2分",
    specialties: ["耳鼻咽喉科"],
    rating: 4.7,
    reviewCount: 156,
    openNow: true,
    features: ["当日受診可能", "キッズスペースあり", "予約優先"],
    phone: "03-3456-7890",
    hours: "9:00-19:00",
  },
  {
    id: "4",
    name: "青空メンタルクリニック",
    slug: "aozora-clinic",
    address: "東京都世田谷区三軒茶屋1-2-3",
    station: "三軒茶屋駅",
    distance: "1分",
    specialties: ["心療内科", "精神科"],
    rating: 4.6,
    reviewCount: 89,
    openNow: true,
    features: ["完全予約制", "オンライン診療対応", "カウンセリング"],
    phone: "03-4567-8901",
    hours: "10:00-20:00",
  },
  {
    id: "5",
    name: "すずらん小児科",
    slug: "suzuran-clinic",
    address: "東京都品川区大井町2-3-4 大井ビル1F",
    station: "大井町駅",
    distance: "4分",
    specialties: ["小児科", "アレルギー科"],
    rating: 4.8,
    reviewCount: 203,
    openNow: false,
    features: ["予防接種", "乳幼児健診", "土曜診療"],
    phone: "03-5678-9012",
    hours: "9:00-12:00, 14:00-18:00",
  },
  {
    id: "6",
    name: "たんぽぽ皮膚科",
    slug: "tanpopo-clinic",
    address: "東京都目黒区自由が丘1-2-3",
    station: "自由が丘駅",
    distance: "3分",
    specialties: ["皮膚科", "美容皮膚科"],
    rating: 4.4,
    reviewCount: 112,
    openNow: true,
    features: ["女性医師", "美容相談", "レーザー治療"],
    phone: "03-6789-0123",
    hours: "10:00-19:00",
  },
  {
    id: "7",
    name: "もみじ整形外科",
    slug: "momiji-clinic",
    address: "東京都大田区蒲田5-6-7 蒲田メディカルビル2F",
    station: "蒲田駅",
    distance: "5分",
    specialties: ["整形外科", "リハビリテーション科"],
    rating: 4.2,
    reviewCount: 78,
    openNow: false,
    features: ["リハビリ施設", "スポーツ外来", "駐車場あり"],
    phone: "03-7890-1234",
    hours: "9:00-18:00",
  },
  {
    id: "8",
    name: "なでしこ婦人科クリニック",
    slug: "nadeshiko-clinic",
    address: "東京都中野区中野3-4-5",
    station: "中野駅",
    distance: "2分",
    specialties: ["婦人科", "産科"],
    rating: 4.9,
    reviewCount: 245,
    openNow: true,
    features: ["女性医師", "妊婦健診", "ピル処方"],
    phone: "03-8901-2345",
    hours: "9:00-17:00",
  },
]

// Prefecture slug to name mapping
const prefectureMap: Record<string, string> = {
  hokkaido: "北海道",
  aomori: "青森県",
  iwate: "岩手県",
  miyagi: "宮城県",
  akita: "秋田県",
  yamagata: "山形県",
  fukushima: "福島県",
  ibaraki: "茨城県",
  tochigi: "栃木県",
  gunma: "群馬県",
  saitama: "埼玉県",
  chiba: "千葉県",
  tokyo: "東京都",
  kanagawa: "神奈川県",
  niigata: "新潟県",
  toyama: "富山県",
  ishikawa: "石川県",
  fukui: "福井県",
  yamanashi: "山梨県",
  nagano: "長野県",
  gifu: "岐阜県",
  shizuoka: "静岡県",
  aichi: "愛知県",
  mie: "三重県",
  shiga: "滋賀県",
  kyoto: "京都府",
  osaka: "大阪府",
  hyogo: "兵庫県",
  nara: "奈良県",
  wakayama: "和歌山県",
  tottori: "鳥取県",
  shimane: "島根県",
  okayama: "岡山県",
  hiroshima: "広島県",
  yamaguchi: "山口県",
  tokushima: "徳島県",
  kagawa: "香川県",
  ehime: "愛媛県",
  kochi: "高知県",
  fukuoka: "福岡県",
  saga: "佐賀県",
  nagasaki: "長崎県",
  kumamoto: "熊本県",
  oita: "大分県",
  miyazaki: "宮崎県",
  kagoshima: "鹿児島県",
  okinawa: "沖縄県",
}

export default function PrefecturePage({ params }: { params: { prefecture: string } }) {
  const prefectureName = prefectureMap[params.prefecture] || "都道府県"

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
              <span className="text-foreground font-medium">{prefectureName}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">{prefectureName}のクリニック</h1>
            </div>
            <p className="text-lg text-muted-foreground">市区町村を選択してクリニックを検索</p>
          </div>
        </div>

        <div className="container py-12">
          {/* Cities */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">市区町村から探す</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockCities.map((city) => (
                <Link key={city.slug} href={`/areas/${params.prefecture}/${city.slug}`}>
                  <Card className="group h-full transition-all hover:shadow-md hover:-translate-y-0.5">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{city.count}件</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Full Clinic Listing */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{prefectureName}のクリニック一覧</h2>
                <p className="text-sm text-muted-foreground mt-1">{mockClinics.length}件のクリニック</p>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/search?prefecture=${params.prefecture}`}>
                  絞り込み検索
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {mockClinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>

            {/* Pagination Info */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground">1-{mockClinics.length}件を表示中</p>
              <Button variant="outline">さらに読み込む</Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
