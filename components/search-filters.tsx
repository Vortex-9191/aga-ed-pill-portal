"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Check, ChevronDown, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface FacetOption {
  name?: string
  value?: string
  label?: string
  count: number
}

interface SearchFiltersProps {
  facets: {
    prefectures: FacetOption[]
    cities?: string[]
    stations?: FacetOption[]
    specialties: FacetOption[]
    features: FacetOption[]
    weekend: number
    evening: number
    director: number
  }
}

export function SearchFilters({ facets }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [citySearch, setCitySearch] = useState("")

  const selectedPrefecture = searchParams.get("prefecture") || ""
  const selectedCity = searchParams.get("city") || ""
  const selectedStation = searchParams.get("station") || ""
  const selectedSpecialty = searchParams.get("specialty") || ""
  const selectedFeature = searchParams.get("feature") || ""
  const selectedWeekend = searchParams.get("weekend") || ""
  const selectedEvening = searchParams.get("evening") || ""
  const selectedDirector = searchParams.get("director") || ""

  // Filter cities based on search
  const filteredCities = facets.cities?.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  ) || []

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && params.get(key) !== value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset to page 1 when filters change
    params.delete("page")

    // Use current pathname instead of hardcoded /search
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAll = () => {
    const params = new URLSearchParams()
    const query = searchParams.get("q")
    if (query) {
      params.set("q", query)
    }
    // Use current pathname instead of hardcoded /search
    router.push(`${pathname}?${params.toString()}`)
  }

  const hasFilters =
    selectedPrefecture || selectedCity || selectedStation || selectedSpecialty || selectedFeature || selectedWeekend || selectedEvening || selectedDirector

  // Prevent page scroll when scrolling inside facet
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const scrollTop = target.scrollTop
    const scrollHeight = target.scrollHeight
    const height = target.clientHeight
    const delta = e.deltaY

    const isAtTop = delta < 0 && scrollTop === 0
    const isAtBottom = delta > 0 && scrollTop + height >= scrollHeight

    if (isAtTop || isAtBottom) {
      e.preventDefault()
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">絞り込み検索</h2>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <X className="mr-1 h-4 w-4" />
              クリア
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Prefecture Filter */}
          {facets.prefectures.length > 0 && (
            <>
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                  都道府県
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-2 max-h-64 overflow-y-auto" onWheel={handleWheel}>
                  {facets.prefectures.map((pref) => (
                    <button
                      key={pref.name}
                      onClick={() => updateFilter("prefecture", selectedPrefecture === pref.name ? "" : pref.name!)}
                      className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                        selectedPrefecture === pref.name ? "bg-accent/20 font-medium" : ""
                      }`}
                    >
                      <span>{pref.name}</span>
                      <span className="text-xs text-muted-foreground">{pref.count}</span>
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <div className="border-t border-border" />
            </>
          )}

          {/* City Filter */}
          {facets.cities && facets.cities.length > 0 && (
            <>
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                  市区町村
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="mb-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="市区町村を検索..."
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        className="pl-9 h-9 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto" onWheel={handleWheel}>
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => updateFilter("city", selectedCity === city ? "" : city)}
                          className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                            selectedCity === city ? "bg-accent/20 font-medium" : ""
                          }`}
                        >
                          <span>{city}</span>
                        </button>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground px-3 py-2">該当なし</p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <div className="border-t border-border" />
            </>
          )}

          {/* Station Filter */}
          {facets.stations && facets.stations.length > 0 && (
            <>
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                  最寄り駅
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-2 max-h-64 overflow-y-auto" onWheel={handleWheel}>
                  {facets.stations.map((station) => (
                    <button
                      key={station.name}
                      onClick={() => updateFilter("station", selectedStation === station.name ? "" : station.name!)}
                      className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                        selectedStation === station.name ? "bg-accent/20 font-medium" : ""
                      }`}
                    >
                      <span>{station.name}</span>
                      <span className="text-xs text-muted-foreground">{station.count}</span>
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <div className="border-t border-border" />
            </>
          )}

          {/* Specialty Filter */}
          {facets.specialties.length > 0 && (
            <>
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                  診療科目
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-2">
                  {facets.specialties.map((spec) => (
                    <button
                      key={spec.name}
                      onClick={() => updateFilter("specialty", selectedSpecialty === spec.name ? "" : spec.name!)}
                      className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                        selectedSpecialty === spec.name ? "bg-accent/20 font-medium" : ""
                      }`}
                    >
                      <span>{spec.name}</span>
                      <span className="text-xs text-muted-foreground">{spec.count}</span>
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <div className="border-t border-border" />
            </>
          )}

          {/* Time-based filters */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              診療時間
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-2">
              <button
                onClick={() => updateFilter("weekend", selectedWeekend ? "" : "true")}
                className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                  selectedWeekend ? "bg-accent/20 font-medium" : ""
                }`}
              >
                <span>土日診療</span>
                <span className="text-xs text-muted-foreground">{facets.weekend}</span>
              </button>
              <button
                onClick={() => updateFilter("evening", selectedEvening ? "" : "true")}
                className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                  selectedEvening ? "bg-accent/20 font-medium" : ""
                }`}
              >
                <span>夜間診療（18時以降）</span>
                <span className="text-xs text-muted-foreground">{facets.evening}</span>
              </button>
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border" />

          {/* Other filters */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              その他
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-2">
              <button
                onClick={() => updateFilter("director", selectedDirector ? "" : "true")}
                className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                  selectedDirector ? "bg-accent/20 font-medium" : ""
                }`}
              >
                <span>院長名あり</span>
                <span className="text-xs text-muted-foreground">{facets.director}</span>
              </button>
            </CollapsibleContent>
          </Collapsible>

          {/* Features - only show if we have data */}
          {facets.features.length > 0 && (
            <>
              <div className="border-t border-border" />
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                  特徴・こだわり
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-2 max-h-48 overflow-y-auto" onWheel={handleWheel}>
                  {facets.features.map((feature) => (
                    <button
                      key={feature.name}
                      onClick={() => updateFilter("feature", selectedFeature === feature.name ? "" : feature.name!)}
                      className={`flex items-center justify-between w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                        selectedFeature === feature.name ? "bg-accent/20 font-medium" : ""
                      }`}
                    >
                      <span>{feature.name}</span>
                      <span className="text-xs text-muted-foreground">{feature.count}</span>
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
