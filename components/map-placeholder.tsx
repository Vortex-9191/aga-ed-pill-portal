"use client"

import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MapPlaceholder() {
  return (
    <div className="relative h-full w-full bg-muted rounded-lg overflow-hidden">
      {/* Map Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.35 0.08 160) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.35 0.08 160) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <MapPin className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">地図を表示</h3>
          <p className="text-sm text-muted-foreground mb-4">現在地周辺のクリニックを地図上で確認できます</p>
          <Button variant="outline" className="bg-card">
            <Navigation className="mr-2 h-4 w-4" />
            現在地を取得
          </Button>
        </div>
      </div>

      {/* Mock Map Markers */}
      <div className="absolute top-1/4 left-1/3 h-8 w-8 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full bg-accent border-2 border-background shadow-lg animate-pulse" />
      </div>
      <div className="absolute top-1/2 right-1/3 h-8 w-8 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full bg-accent border-2 border-background shadow-lg animate-pulse" />
      </div>
      <div className="absolute bottom-1/3 left-1/2 h-8 w-8 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full bg-accent border-2 border-background shadow-lg animate-pulse" />
      </div>
    </div>
  )
}
