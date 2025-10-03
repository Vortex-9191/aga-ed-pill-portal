import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClinicInfoSection } from "@/components/clinic-info-section"
import { ClinicReviews } from "@/components/clinic-reviews"
import Link from "next/link"
import { ChevronRight, Star, Phone, ExternalLink, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockClinic = {
  name: "さくらクリニック",
  slug: "sakura-clinic",
  address: "東京都渋谷区渋谷1-2-3 渋谷ビル2F",
  phone: "03-1234-5678",
  rating: 4.5,
  reviewCount: 128,
  specialties: ["内科", "小児科", "アレルギー科"],
  features: ["当日受診可能", "オンライン診療対応", "土日祝日診療"],
  description:
    "さくらクリニックは、地域の皆様に寄り添った医療を提供することを目指しています。内科・小児科を中心に、幅広い診療を行っております。お気軽にご相談ください。",
  hours: {
    weekday: "9:00-12:30 / 14:00-18:00",
    saturday: "9:00-13:00",
    sunday: "休診",
    holiday: "休診",
  },
  payment: ["現金", "クレジットカード", "電子マネー", "QRコード決済"],
  parking: true,
  accessibility: true,
  wifi: true,
  kidsSpace: true,
  stations: [
    { name: "渋谷駅", line: "JR山手線", distance: "徒歩3分", exit: "ハチ公口" },
    { name: "渋谷駅", line: "東京メトロ銀座線", distance: "徒歩3分", exit: "B1出口" },
  ],
  prefecture: "tokyo",
  city: "shibuya",
}

export default function ClinicDetailPage({ params }: { params: { slug: string } }) {
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
              <Link href={`/areas/${mockClinic.prefecture}`} className="hover:text-foreground transition-colors">
                東京都
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{mockClinic.name}</span>
            </nav>
          </div>
        </div>

        {/* Clinic Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-3 md:text-4xl">{mockClinic.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span className="ml-1 text-lg font-semibold text-foreground">{mockClinic.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({mockClinic.reviewCount}件の口コミ)</span>
                  </div>
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    診療中
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mockClinic.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">{mockClinic.description}</p>
              </div>

              <div className="flex flex-col gap-3 lg:w-64">
                <Button size="lg" className="w-full">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  オンライン予約
                </Button>
                <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                  <a href={`tel:${mockClinic.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    電話で予約
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column - Tabs */}
            <div>
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="info"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent"
                  >
                    基本情報
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent"
                  >
                    口コミ
                  </TabsTrigger>
                  <TabsTrigger
                    value="access"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent"
                  >
                    アクセス
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="info" className="mt-0">
                    <ClinicInfoSection clinic={mockClinic} />
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0">
                    <ClinicReviews averageRating={mockClinic.rating} totalReviews={mockClinic.reviewCount} />
                  </TabsContent>

                  <TabsContent value="access" className="mt-0">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Train className="h-5 w-5" />
                          最寄り駅
                        </h3>
                        <div className="space-y-4">
                          {mockClinic.stations.map((station, index) => (
                            <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                              <p className="font-medium text-foreground mb-1">{station.name}</p>
                              <p className="text-sm text-muted-foreground mb-1">{station.line}</p>
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="outline">{station.exit}</Badge>
                                <span className="text-muted-foreground">{station.distance}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">地図を表示</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">予約・お問い合わせ</h3>
                  <div className="space-y-3">
                    <Button size="lg" className="w-full">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      オンライン予約
                    </Button>
                    <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                      <a href={`tel:${mockClinic.phone}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        {mockClinic.phone}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">こだわり条件</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockClinic.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
