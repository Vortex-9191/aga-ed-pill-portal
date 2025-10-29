import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  // 1. Overall summary
  const { data: allData, error: allError } = await supabase
    .from('clinic_counts')
    .select('count_type, clinic_count')

  if (allError) {
    return NextResponse.json({ error: allError.message }, { status: 500 })
  }

  const stats: Record<string, { entries: number; total: number }> = {}
  allData?.forEach(row => {
    if (!stats[row.count_type]) {
      stats[row.count_type] = { entries: 0, total: 0 }
    }
    stats[row.count_type].entries++
    stats[row.count_type].total += row.clinic_count
  })

  // 2. Prefecture data
  const { data: prefectures } = await supabase
    .from('clinic_counts')
    .select('prefecture, clinic_count')
    .eq('count_type', 'prefecture')
    .order('clinic_count', { ascending: false })
    .limit(10)

  // 3. Municipality data
  const { data: municipalities } = await supabase
    .from('clinic_counts')
    .select('prefecture, municipality, clinic_count')
    .eq('count_type', 'municipality')
    .order('clinic_count', { ascending: false })
    .limit(10)

  // 4. Station data
  const { data: stations } = await supabase
    .from('clinic_counts')
    .select('prefecture, station, clinic_count')
    .eq('count_type', 'station')
    .order('clinic_count', { ascending: false })
    .limit(10)

  return NextResponse.json({
    summary: stats,
    totalEntries: allData?.length || 0,
    topPrefectures: prefectures,
    topMunicipalities: municipalities,
    topStations: stations,
  })
}
