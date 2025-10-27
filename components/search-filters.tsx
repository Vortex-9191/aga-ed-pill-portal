"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const prefectures = ["東京都", "大阪府", "神奈川県", "愛知県", "福岡県", "北海道", "埼玉県", "千葉県"]

const specialties = ["心療内科", "精神科", "児童精神科", "老年精神科"]

const ratingOptions = [
  { label: "⭐ 4.5以上", value: "4.5" },
  { label: "⭐ 4.0以上", value: "4.0" },
  { label: "⭐ 3.5以上", value: "3.5" },
]

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedPrefecture = searchParams.get("prefecture") || ""
  const selectedSpecialty = searchParams.get("specialty") || ""
  const selectedRating = searchParams.get("rating") || ""

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset to page 1 when filters change
    params.delete("page")

    router.push(`/search?${params.toString()}`)
  }

  const clearAll = () => {
    const params = new URLSearchParams()
    const query = searchParams.get("q")
    if (query) {
      params.set("q", query)
    }
    router.push(`/search?${params.toString()}`)
  }

  const hasFilters = selectedPrefecture || selectedSpecialty || selectedRating

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
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              都道府県
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {prefectures.map((prefecture) => (
                <button
                  key={prefecture}
                  onClick={() => updateFilter("prefecture", selectedPrefecture === prefecture ? "" : prefecture)}
                  className={`flex items-center w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                    selectedPrefecture === prefecture ? "bg-accent/20 font-medium" : ""
                  }`}
                >
                  {prefecture}
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border" />

          {/* Specialty Filter */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              診療科目
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => updateFilter("specialty", selectedSpecialty === specialty ? "" : specialty)}
                  className={`flex items-center w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                    selectedSpecialty === specialty ? "bg-accent/20 font-medium" : ""
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border" />

          {/* Rating Filter */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              口コミ評価
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {ratingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilter("rating", selectedRating === option.value ? "" : option.value)}
                  className={`flex items-center w-full text-sm py-2 px-3 rounded hover:bg-accent/10 transition-colors ${
                    selectedRating === option.value ? "bg-accent/20 font-medium" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  )
}
