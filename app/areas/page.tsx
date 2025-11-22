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
import { getClinicsCountByPrefecture, REGIONS, PREFECTURE_SLUGS } from "@/lib/api/locations"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

export default async function AreasPage() {
  const counts = await getClinicsCountByPrefecture()

  const regionsWithData = REGIONS.map(region => ({
    name: region.name,
    prefectures: region.prefectures.map(prefName => ({
      name: prefName,
      slug: PREFECTURE_SLUGS[prefName] || 'unknown',
      count: counts[prefName] || 0
    }))
  }))

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
            {regionsWithData.map((region) => (
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

