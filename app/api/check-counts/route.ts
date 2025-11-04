import { getDummyClinics } from '@/lib/data/dummy-clinics'
import { NextResponse } from 'next/server'

// Force dynamic rendering to avoid build-time static generation
export const dynamic = 'force-dynamic'

export async function GET() {
  const allClinics = getDummyClinics()

  // 1. Count by prefecture
  const prefectureMap = new Map<string, number>()
  allClinics.forEach(clinic => {
    prefectureMap.set(clinic.prefecture, (prefectureMap.get(clinic.prefecture) || 0) + 1)
  })
  const topPrefectures = Array.from(prefectureMap.entries())
    .map(([prefecture, clinic_count]) => ({ prefecture, clinic_count }))
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, 10)

  // 2. Count by municipality
  const municipalityMap = new Map<string, { prefecture: string; count: number }>()
  allClinics.forEach(clinic => {
    const key = `${clinic.prefecture}-${clinic.municipalities}`
    const existing = municipalityMap.get(key)
    if (existing) {
      existing.count++
    } else {
      municipalityMap.set(key, { prefecture: clinic.prefecture, count: 1 })
    }
  })
  const topMunicipalities = Array.from(municipalityMap.entries())
    .map(([key, value]) => ({
      prefecture: value.prefecture,
      municipality: key.split('-')[1],
      clinic_count: value.count
    }))
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, 10)

  // 3. Count by station
  const stationMap = new Map<string, { prefecture: string; count: number }>()
  allClinics.forEach(clinic => {
    if (!clinic.stations) return
    const stations = clinic.stations.split(',').map(s => s.trim())
    stations.forEach(station => {
      const existing = stationMap.get(station)
      if (existing) {
        existing.count++
      } else {
        stationMap.set(station, { prefecture: clinic.prefecture, count: 1 })
      }
    })
  })
  const topStations = Array.from(stationMap.entries())
    .map(([station, value]) => ({
      prefecture: value.prefecture,
      station,
      clinic_count: value.count
    }))
    .sort((a, b) => b.clinic_count - a.clinic_count)
    .slice(0, 10)

  // 4. Summary stats
  const stats = {
    prefecture: { entries: prefectureMap.size, total: allClinics.length },
    municipality: { entries: municipalityMap.size, total: allClinics.length },
    station: { entries: stationMap.size, total: allClinics.length }
  }

  return NextResponse.json({
    summary: stats,
    totalEntries: allClinics.length,
    topPrefectures,
    topMunicipalities,
    topStations,
  })
}
