"use client"

import Link from "next/link"
import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

interface Station {
  name: string
  prefecture: string
  count: number
  slug: string
}

interface StationListProps {
  stations: Station[]
  regions: Array<{
    name: string
    prefectures: string[]
  }>
}

export function StationList({ stations, regions }: StationListProps) {
  const [searchQuery, setSearchQuery] = useState("")

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
    <div className="container py-12">
      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="駅名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base border-slate-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      {filteredStations ? (
        /* Search Results */
        <div>
          <p className="mb-4 text-sm text-slate-600">
            {filteredStations.length}件見つかりました
          </p>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredStations.map((station) => (
              <Link
                key={`${station.prefecture}-${station.name}`}
                href={`/stations/${station.slug}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-teal-500 hover:shadow-md"
              >
                <div>
                  <div className="font-medium text-sm text-slate-900">{station.name}</div>
                  <div className="text-xs text-slate-500">{station.prefecture} • {station.count}件</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Grouped by Region */
        <div className="space-y-6">
          {regions.map((region) => (
            <div key={region.name} className="border border-slate-200 rounded-lg bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">{region.name}</h2>
              </div>
              <div className="p-6 space-y-4">
                {region.prefectures.map((prefecture) => {
                  const prefStations = stationsByPrefecture[prefecture] || []
                  if (prefStations.length === 0) return null

                  return (
                    <Collapsible key={prefecture} defaultOpen={region.name === "関東"}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left hover:text-teal-600 transition-colors">
                        <span className="font-medium text-slate-900">{prefecture} ({prefStations.length})</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-2">
                          {prefStations.map((station) => (
                            <Link
                              key={station.name}
                              href={`/stations/${station.slug}`}
                              className="flex items-center justify-between rounded px-3 py-2 text-sm transition-colors hover:bg-teal-50 text-slate-700 hover:text-teal-600"
                            >
                              <span>{station.name}</span>
                              <span className="text-xs text-slate-500">{station.count}件</span>
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
  )
}
