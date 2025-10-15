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
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import { Train } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStationSlug } from "@/lib/data/stations"

const cityData: Record<
  string,
  { name: string; municipalityName: string; prefecture: string; prefectureSlug: string }
> = {
  "shinjuku-ku": { name: "新宿区", municipalityName: "新宿区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "shibuya-ku": { name: "渋谷区", municipalityName: "渋谷区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "minato-ku": { name: "港区", municipalityName: "港区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "setagaya-ku": { name: "世田谷区", municipalityName: "世田谷区", prefecture: "東京都", prefectureSlug: "tokyo" },
  "yokohama-naka": {
    name: "横浜市中区",
    municipalityName: "横浜市中区",
    prefecture: "神奈川県",
    prefectureSlug: "kanagawa",
  },
  "osaka-kita": {
    name: "大阪市北区",
    municipalityName: "大阪市北区",
    prefecture: "大阪府",
    prefectureSlug: "osaka",
  },
  "nagoya-naka": {
    name: "名古屋市中区",
    municipalityName: "名古屋市中区",
    prefecture: "愛知県",
    prefectureSlug: "aichi",
  },
  "fukuoka-hakata": {
    name: "福岡市博多区",
    municipalityName: "福岡市博多区",
    prefecture: "福岡県",
    prefectureSlug: "fukuoka",
  },
  "sapporo-chuo": {
    name: "札幌市中央区",
    municipalityName: "札幌市中央区",
    prefecture: "北海道",
    prefectureSlug: "hokkaido",
  },
  "kyoto-nakagyo": {
    name: "京都市中京区",
    municipalityName: "京都市中京区",
    prefecture: "京都府",
    prefectureSlug: "kyoto",
  },
  "shinagawa-ku": {
    name: "品川区",
    municipalityName: "品川区",
    prefecture: "東京都",
    prefectureSlug: "tokyo",
  },
  "chiyoda-ku": {
    name: "千代田区",
    municipalityName: "千代田区",
    prefecture: "東京都",
    prefectureSlug: "tokyo",
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const city = cityData[params.slug] || {
    name: "市区町村",
    municipalityName: "市区町村",
    prefecture: "都道府県",
    prefectureSlug: "prefecture",
  }

  return {
    title: `${city.name}の精神科・心療内科 | ${city.prefecture} | 全国精神科ドットコム`,
    description: `${city.prefecture}${city.name}の精神科・心療内科クリニックを検索。${city.name}で評判の心療内科・精神科の診療時間、住所、アクセス、口コミ情報を掲載。`,
  }
}

export default async function CityDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const city = cityData[params.slug] || {
    name: "市区町村",
    municipalityName: "市区町村",
    prefecture: "都道府県",
    prefectureSlug: "prefecture",
  }

  const { data: clinics, error } = await supabase
    .from("clinics")
    .select("*")
    .ilike("municipalities", `%${city.municipalityName}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching clinics:", error)
  }

  const clinicCards =
    clinics?.map((clinic) => ({
      id: clinic.id,
      name: clinic.clinic_name,
      slug: clinic.slug,
      address: clinic.address,
      station: clinic.stations || "",
      specialties: clinic.featured_subjects ? clinic.featured_subjects.split(", ") : [],
      phone: clinic.corp_tel,
      prefecture: clinic.prefecture,
      city: clinic.municipalities,
    })) || []

  // Extract unique stations from clinics in this municipality
  const relatedStationsSet = new Set<string>()
  clinics?.forEach((clinic) => {
    if (clinic.stations) {
      // Split by common separators and clean up
      const stations = clinic.stations
        .split(/[,、・\s]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)
      stations.forEach((station: string) => relatedStationsSet.add(station))
    }
  })
  const relatedStations = Array.from(relatedStationsSet).slice(0, 20) // Limit to 20 stations

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
              <span className="ml-2 text-base font-normal text-muted-foreground">({clinicCards.length}件)</span>
            </h2>
            {clinicCards.length > 0 ? (
              <div className="space-y-4">
                {clinicCards.map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">この地域のクリニックは現在登録されていません。</p>
              </div>
            )}
          </div>

          {/* Related Stations Section */}
          {relatedStations.length > 0 && (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    {city.name}の関連駅
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {relatedStations.map((station) => {
                      // Get proper English slug from Japanese station name
                      const stationSlug = getStationSlug(station)

                      // If no slug mapping found, don't render as link
                      if (!stationSlug) {
                        return (
                          <div
                            key={station}
                            className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30"
                          >
                            <Train className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm font-medium truncate">{station}</span>
                          </div>
                        )
                      }

                      return (
                        <Link
                          key={station}
                          href={`/stations/${stationSlug}`}
                          className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent hover:border-primary transition-colors"
                        >
                          <Train className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{station}</span>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
