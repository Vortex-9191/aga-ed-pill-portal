"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { MapPin, Search, ChevronDown } from "lucide-react"
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

interface Municipality {
  name: string
  prefecture: string
  count: number
}

const prefectureSlugMap: Record<string, string> = {
  "北海道": "hokkaido", "青森県": "aomori", "岩手県": "iwate", "宮城県": "miyagi",
  "秋田県": "akita", "山形県": "yamagata", "福島県": "fukushima", "茨城県": "ibaraki",
  "栃木県": "tochigi", "群馬県": "gunma", "埼玉県": "saitama", "千葉県": "chiba",
  "東京都": "tokyo", "神奈川県": "kanagawa", "新潟県": "niigata", "富山県": "toyama",
  "石川県": "ishikawa", "福井県": "fukui", "山梨県": "yamanashi", "長野県": "nagano",
  "岐阜県": "gifu", "静岡県": "shizuoka", "愛知県": "aichi", "三重県": "mie",
  "滋賀県": "shiga", "京都府": "kyoto", "大阪府": "osaka", "兵庫県": "hyogo",
  "奈良県": "nara", "和歌山県": "wakayama", "鳥取県": "tottori", "島根県": "shimane",
  "岡山県": "okayama", "広島県": "hiroshima", "山口県": "yamaguchi", "徳島県": "tokushima",
  "香川県": "kagawa", "愛媛県": "ehime", "高知県": "kochi", "福岡県": "fukuoka",
  "佐賀県": "saga", "長崎県": "nagasaki", "熊本県": "kumamoto", "大分県": "oita",
  "宮崎県": "miyazaki", "鹿児島県": "kagoshima", "沖縄県": "okinawa",
}

const regions = [
  { name: "北海道・東北", prefectures: ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { name: "関東", prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"] },
  { name: "中部", prefectures: ["愛知県", "静岡県", "岐阜県", "長野県", "新潟県", "富山県", "石川県", "福井県", "山梨県"] },
  { name: "関西", prefectures: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"] },
  { name: "中国・四国", prefectures: ["広島県", "岡山県", "山口県", "愛媛県", "香川県", "徳島県", "高知県", "鳥取県", "島根県"] },
  { name: "九州・沖縄", prefectures: ["福岡県", "熊本県", "鹿児島県", "長崎県", "大分県", "宮崎県", "佐賀県", "沖縄県"] },
]

export default function CitiesPage() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMunicipalities = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("clinics")
        .select("municipalities, prefecture")
        .not("municipalities", "is", null)
        .not("prefecture", "is", null)

      // Count clinics per municipality
      const municipalityMap = new Map<string, { prefecture: string; count: number }>()
      data?.forEach((clinic) => {
        const key = `${clinic.prefecture}|${clinic.municipalities}`
        const existing = municipalityMap.get(key)
        if (existing) {
          existing.count++
        } else {
          municipalityMap.set(key, { prefecture: clinic.prefecture, count: 1 })
        }
      })

      const result = Array.from(municipalityMap.entries()).map(([key, value]) => {
        const [prefecture, name] = key.split("|")
        return {
          name,
          prefecture,
          count: value.count
        }
      }).sort((a, b) => a.name.localeCompare(b.name, 'ja'))

      setMunicipalities(result)
      setLoading(false)
    }

    fetchMunicipalities()
  }, [])

  // Group municipalities by prefecture
  const municipalitiesByPrefecture = municipalities.reduce((acc, municipality) => {
    if (!acc[municipality.prefecture]) {
      acc[municipality.prefecture] = []
    }
    acc[municipality.prefecture].push(municipality)
    return acc
  }, {} as Record<string, Municipality[]>)

  // Filter municipalities by search query
  const filteredMunicipalities = searchQuery
    ? municipalities.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.prefecture.includes(searchQuery)
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
                  <BreadcrumbPage>市区町村一覧</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">市区町村から探す</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              全国{municipalities.length}市区町村のクリニック情報を検索できます
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
                placeholder="市区町村名で検索..."
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
          ) : filteredMunicipalities ? (
            /* Search Results */
            <div>
              <p className="mb-4 text-sm text-muted-foreground">
                {filteredMunicipalities.length}件見つかりました
              </p>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredMunicipalities.map((municipality) => (
                  <Link
                    key={`${municipality.prefecture}-${municipality.name}`}
                    href={`/areas/${prefectureSlugMap[municipality.prefecture]}/${encodeURIComponent(municipality.name)}`}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-all hover:border-[#FF6B6B] hover:shadow-md"
                  >
                    <div>
                      <div className="font-medium text-sm">{municipality.name}</div>
                      <div className="text-xs text-muted-foreground">{municipality.prefecture} • {municipality.count}件</div>
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
                      const prefMunicipalities = municipalitiesByPrefecture[prefecture] || []
                      if (prefMunicipalities.length === 0) return null

                      return (
                        <Collapsible key={prefecture} defaultOpen={region.name === "関東"}>
                          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left hover:text-[#FF6B6B] transition-colors">
                            <span className="font-medium">{prefecture} ({prefMunicipalities.length})</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-2">
                              {prefMunicipalities.map((municipality) => (
                                <Link
                                  key={municipality.name}
                                  href={`/areas/${prefectureSlugMap[prefecture]}/${encodeURIComponent(municipality.name)}`}
                                  className="flex items-center justify-between rounded px-3 py-2 text-sm transition-colors hover:bg-[#FFE5E5]"
                                >
                                  <span>{municipality.name}</span>
                                  <span className="text-xs text-muted-foreground">{municipality.count}件</span>
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
