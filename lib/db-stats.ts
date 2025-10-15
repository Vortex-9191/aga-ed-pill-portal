import { createClient } from "@/lib/supabase/server"

/**
 * Get top stations by clinic count from the database
 * @param limit - Maximum number of stations to return
 * @returns Array of stations with their clinic counts
 */
export async function getTopStations(limit: number = 100) {
  const supabase = await createClient()

  const { data: clinics } = await supabase.from("clinics").select("stations")

  if (!clinics) return []

  // Count occurrences of each station
  const stationCounts: Record<string, number> = {}

  for (const clinic of clinics) {
    if (clinic.stations) {
      // Split by common separators
      const stations = clinic.stations
        .split(/[,、・\/／\s]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)

      for (const station of stations) {
        stationCounts[station] = (stationCounts[station] || 0) + 1
      }
    }
  }

  // Filter stations with 2+ clinics and sort by count
  return Object.entries(stationCounts)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }))
}

/**
 * Get top municipalities by clinic count from the database
 * @param limit - Maximum number of municipalities to return
 * @returns Array of municipalities with their clinic counts and prefecture
 */
export async function getTopMunicipalities(limit: number = 100) {
  const supabase = await createClient()

  const { data: clinics } = await supabase
    .from("clinics")
    .select("municipalities, prefecture")

  if (!clinics) return []

  // Count occurrences of each municipality
  const municipalityCounts: Record<
    string,
    { count: number; prefecture: string }
  > = {}

  for (const clinic of clinics) {
    if (clinic.municipalities) {
      // Split by common separators
      const municipalities = clinic.municipalities
        .split(/[,、・\/／\s]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)

      for (const municipality of municipalities) {
        if (!municipalityCounts[municipality]) {
          municipalityCounts[municipality] = {
            count: 0,
            prefecture: clinic.prefecture || "",
          }
        }
        municipalityCounts[municipality].count++
      }
    }
  }

  // Filter municipalities with 3+ clinics and sort by count
  return Object.entries(municipalityCounts)
    .filter(([_, data]) => data.count >= 3)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, limit)
    .map(([name, data]) => ({
      name,
      count: data.count,
      prefecture: data.prefecture,
    }))
}
