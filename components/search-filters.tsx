"use client"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const prefectures = ["東京都", "大阪府", "神奈川県", "愛知県", "福岡県", "北海道", "埼玉県", "千葉県"]

const specialties = ["内科", "小児科", "皮膚科", "整形外科", "耳鼻咽喉科", "眼科", "婦人科", "歯科"]

const features = [
  "当日受診可能",
  "オンライン診療対応",
  "土日祝日診療",
  "夜間診療",
  "駐車場あり",
  "キッズスペースあり",
  "バリアフリー",
  "クレジットカード可",
]

export function SearchFilters() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleItem = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const clearAll = () => {
    setSelectedPrefectures([])
    setSelectedSpecialties([])
    setSelectedFeatures([])
  }

  const hasFilters = selectedPrefectures.length > 0 || selectedSpecialties.length > 0 || selectedFeatures.length > 0

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
              エリア
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {prefectures.map((prefecture) => (
                <div key={prefecture} className="flex items-center space-x-2">
                  <Checkbox
                    id={`prefecture-${prefecture}`}
                    checked={selectedPrefectures.includes(prefecture)}
                    onCheckedChange={() => toggleItem(prefecture, selectedPrefectures, setSelectedPrefectures)}
                  />
                  <Label
                    htmlFor={`prefecture-${prefecture}`}
                    className="text-sm font-normal text-foreground cursor-pointer"
                  >
                    {prefecture}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border" />

          {/* Specialty Filter */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              診療科
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {specialties.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={selectedSpecialties.includes(specialty)}
                    onCheckedChange={() => toggleItem(specialty, selectedSpecialties, setSelectedSpecialties)}
                  />
                  <Label
                    htmlFor={`specialty-${specialty}`}
                    className="text-sm font-normal text-foreground cursor-pointer"
                  >
                    {specialty}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border" />

          {/* Features Filter */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              こだわり条件
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => toggleItem(feature, selectedFeatures, setSelectedFeatures)}
                  />
                  <Label htmlFor={`feature-${feature}`} className="text-sm font-normal text-foreground cursor-pointer">
                    {feature}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Button className="mt-6 w-full" size="lg">
          <Check className="mr-2 h-4 w-4" />
          検索結果を表示
        </Button>
      </CardContent>
    </Card>
  )
}
