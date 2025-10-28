"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Train, Search, ChevronDown } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { getStationSlug } from "@/lib/data/stations"

interface Station {
  name: string
  prefecture: string
  count: number
  slug: string
}

const regions = [
  { name: "北海道・東北", prefectures: ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { name: "関東", prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"] },
  { name: "中部", prefectures: ["愛知県", "静岡県", "岐阜県", "長野県", "新潟県", "富山県", "石川県", "福井県", "山梨県"] },
  { name: "関西", prefectures: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"] },
  { name: "中国・四国", prefectures: ["広島県", "岡山県", "山口県", "愛媛県", "香川県", "徳島県", "高知県", "鳥取県", "島根県"] },
  { name: "九州・沖縄", prefectures: ["福岡県", "熊本県", "鹿児島県", "長崎県", "大分県", "宮崎県", "佐賀県", "沖縄県"] },
]

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStations = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("clinics")
        .select("stations, prefecture")
        .not("stations", "is", null)
        .not("prefecture", "is", null)

      // Count clinics per station and track prefecture
      const stationMap = new Map<string, { prefectures: Set<string>; count: number }>()

      data?.forEach((clinic) => {
        if (!clinic.stations) return

        // Split stations by comma and trim
        const stationNames = clinic.stations.split(',').map((s: string) => s.trim())

        stationNames.forEach((stationName: string) => {
          if (!stationName) return

          const existing = stationMap.get(stationName)
          if (existing) {
            existing.count++
            existing.prefectures.add(clinic.prefecture)
          } else {
            stationMap.set(stationName, {
              prefectures: new Set([clinic.prefecture]),
              count: 1
            })
          }
        })
      })

      const result: Station[] = Array.from(stationMap.entries())
        .map(([name, value]) => {
          // Use the first prefecture if multiple
          const prefecture = Array.from(value.prefectures)[0]
          return {
            name,
            prefecture,
            count: value.count,
            slug: getStationSlug(name)
          }
        })
        .filter(station => station.count >= 2) // Only show stations with 2+ clinics
        .sort((a, b) => a.name.localeCompare(b.name, 'ja'))

      setStations(result)
      setLoading(false)
    }

    fetchStations()
  }, [])

  // Group stations by prefecture
  const stationsByPrefecture = stations.reduce((acc, station) => {
    if (!acc[station.prefecture]) {
      acc[station.prefecture] = []
    }
    acc[station.prefecture].push(station)
    return acc
  }, {} as Record<string, Station[]>)

  // Filter stations by search query
  const filteredStations = searchQuery
    ? stations.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.prefecture.includes(searchQuery)
      )
    : null

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

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <Train className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">駅名から探す</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              全国{stations.length}駅のクリニック情報を検索できます
            </p>
          </div>
        </div>

        <div className="container py-12">
          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="駅名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">読み込み中...</p>
            </div>
          ) : filteredStations ? (
            /* Search Results */
            <div>
              <p className="mb-4 text-sm text-muted-foreground">
                {filteredStations.length}件見つかりました
              </p>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredStations.map((station) => (
                  <Link
                    key={`${station.prefecture}-${station.name}`}
                    href={`/stations/${station.slug}`}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-all hover:border-[#FF6B6B] hover:shadow-md"
                  >
                    <div>
                      <div className="font-medium text-sm">{station.name}</div>
                      <div className="text-xs text-muted-foreground">{station.prefecture} • {station.count}件</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* Grouped by Region */
            <div className="space-y-6">
              {regions.map((region) => (
                <div key={region.name} className="border rounded-lg bg-card">
                  <div className="border-b bg-muted/30 px-6 py-4">
                    <h2 className="text-lg font-semibold">{region.name}</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {region.prefectures.map((prefecture) => {
                      const prefStations = stationsByPrefecture[prefecture] || []
                      if (prefStations.length === 0) return null

                      return (
                        <Collapsible key={prefecture} defaultOpen={region.name === "関東"}>
                          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left hover:text-[#FF6B6B] transition-colors">
                            <span className="font-medium">{prefecture} ({prefStations.length})</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-2">
                              {prefStations.map((station) => (
                                <Link
                                  key={station.name}
                                  href={`/stations/${station.slug}`}
                                  className="flex items-center justify-between rounded px-3 py-2 text-sm transition-colors hover:bg-[#FFE5E5]"
                                >
                                  <span>{station.name}</span>
                                  <span className="text-xs text-muted-foreground">{station.count}件</span>
                                </Link>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
