"use client"

import { useState, useEffect } from "react"
import { MapClinicCard } from "@/components/map-clinic-card"
import { MapPlaceholder } from "@/components/map-placeholder"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, Navigation, Loader2, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateDistance, formatDistance } from "@/lib/utils/distance"

interface Clinic {
  id: string
  no: number
  clinic_name: string
  slug: string
  address: string
  prefecture: string
  municipalities: string | null
  stations: string | null
  url: string | null
  featured_subjects: string | null
  corp_tel: string | null
  rating: number | null
  review_count: number | null
  特徴: string | null
  月曜?: string | null
  火曜?: string | null
  水曜?: string | null
  木曜?: string | null
  金曜?: string | null
  土曜?: string | null
  日曜?: string | null
}

interface ClinicWithDistance extends Clinic {
  distance?: number
  distanceText?: string
  openNow?: boolean
}

interface LocationMapViewProps {
  clinics: Clinic[]
}

export function LocationMapView({ clinics: initialClinics }: LocationMapViewProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [clinics, setClinics] = useState<ClinicWithDistance[]>(initialClinics)
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "reviews">("distance")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("お使いのブラウザは位置情報をサポートしていません")
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(location)

        // Calculate distances for all clinics
        // Note: In production, you'd want to have actual coordinates for clinics
        // For now, we'll use approximate coordinates based on prefecture
        const clinicsWithDistance = initialClinics.map((clinic) => {
          // TODO: Use actual clinic coordinates from database
          // For demonstration, using approximate prefecture coordinates
          const prefectureCoords = getPrefectureCoordinates(clinic.prefecture)

          if (prefectureCoords) {
            const distance = calculateDistance(
              location.lat,
              location.lng,
              prefectureCoords.lat,
              prefectureCoords.lng
            )

            return {
              ...clinic,
              distance,
              distanceText: `現在地から${formatDistance(distance)}`,
            }
          }

          return {
            ...clinic,
            distance: undefined,
            distanceText: undefined,
          }
        })

        setClinics(clinicsWithDistance)
        setIsLoadingLocation(false)
      },
      (error) => {
        let errorMessage = "位置情報の取得に失敗しました"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "位置情報の使用が許可されていません。ブラウザの設定を確認してください。"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "位置情報が利用できません"
            break
          case error.TIMEOUT:
            errorMessage = "位置情報の取得がタイムアウトしました"
            break
        }

        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  // Sort clinics based on selected criteria
  const sortedClinics = [...clinics].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        if (a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance
        }
        return 0
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "reviews":
        return (b.review_count || 0) - (a.review_count || 0)
      default:
        return 0
    }
  })

  return (
    <>
      {/* Search Bar */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="地域名、駅名で検索" className="h-10 pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                絞り込み
              </Button>
              <Button
                size="sm"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    取得中...
                  </>
                ) : (
                  <>
                    <Navigation className="mr-2 h-4 w-4" />
                    現在地
                  </>
                )}
              </Button>
            </div>
          </div>

          {locationError && (
            <div className="mt-3 flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{locationError}</span>
            </div>
          )}

          {userLocation && !locationError && (
            <div className="mt-3 text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg">
              現在地を取得しました。距離順に表示しています。
            </div>
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="h-[calc(100vh-240px)] flex">
        {/* Map */}
        <div className="flex-1 relative">
          <MapPlaceholder />
        </div>

        {/* Sidebar */}
        <aside className="w-full sm:w-96 border-l border-border bg-background overflow-y-auto">
          <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {userLocation ? "近くのクリニック" : "クリニック一覧"}
              </h2>
              <span className="text-sm text-muted-foreground">{sortedClinics.length}件</span>
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-full h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">距離が近い順</SelectItem>
                <SelectItem value="rating">評価が高い順</SelectItem>
                <SelectItem value="reviews">口コミが多い順</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 space-y-3">
            {sortedClinics.length > 0 ? (
              sortedClinics.map((clinic) => (
                <MapClinicCard
                  key={clinic.id}
                  clinic={{
                    id: clinic.id,
                    name: clinic.clinic_name,
                    slug: clinic.slug,
                    address: clinic.address,
                    distance: clinic.distanceText || "距離不明",
                    specialties: clinic.featured_subjects?.split(",").map(s => s.trim()).filter(Boolean) || [],
                    rating: clinic.rating || 0,
                    reviewCount: clinic.review_count || 0,
                    openNow: isOpenNow(clinic),
                    phone: clinic.corp_tel || undefined,
                  }}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>クリニックが見つかりませんでした</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}

// Approximate coordinates for major prefectures
// In production, you would store actual coordinates for each clinic in the database
function getPrefectureCoordinates(prefecture: string): { lat: number; lng: number } | null {
  const coords: Record<string, { lat: number; lng: number }> = {
    "東京都": { lat: 35.6762, lng: 139.6503 },
    "大阪府": { lat: 34.6937, lng: 135.5023 },
    "神奈川県": { lat: 35.4478, lng: 139.6425 },
    "愛知県": { lat: 35.1802, lng: 136.9066 },
    "埼玉県": { lat: 35.8617, lng: 139.6455 },
    "千葉県": { lat: 35.6074, lng: 140.1065 },
    "兵庫県": { lat: 34.6913, lng: 135.1830 },
    "福岡県": { lat: 33.6064, lng: 130.4183 },
    "北海道": { lat: 43.0642, lng: 141.3469 },
    "京都府": { lat: 35.0116, lng: 135.7681 },
  }

  return coords[prefecture] || null
}

// Check if clinic is open now
function isOpenNow(clinic: Clinic): boolean {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const dayNames = ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
  const todayName = dayNames[dayOfWeek]

  const hours = (clinic as any)[todayName]

  if (!hours || hours === "-" || hours === "休診") {
    return false
  }

  // Simplified check - just return true if there are hours listed
  // In production, you'd parse the hours and check against current time
  return true
}
