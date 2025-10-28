"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface FacetOption {
  name?: string
  value?: string
  label?: string
  count: number
}

interface SearchFiltersProps {
  facets: {
    prefectures: FacetOption[]
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

  const selectedPrefecture = searchParams.get("prefecture") || ""
  const selectedSpecialty = searchParams.get("specialty") || ""
  const selectedFeature = searchParams.get("feature") || ""
  const selectedWeekend = searchParams.get("weekend") || ""
  const selectedEvening = searchParams.get("evening") || ""
  const selectedDirector = searchParams.get("director") || ""

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
    selectedPrefecture || selectedSpecialty || selectedFeature || selectedWeekend || selectedEvening || selectedDirector

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
                <CollapsibleContent className="space-y-1 pt-2 max-h-64 overflow-y-auto">
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
                <CollapsibleContent className="space-y-1 pt-2 max-h-48 overflow-y-auto">
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
