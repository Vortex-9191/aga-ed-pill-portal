import { createClient } from "@/lib/supabase/server"

export const REGIONS = [
  {
    name: "関東",
    prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
  },
  {
    name: "関西",
    prefectures: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"],
  },
  {
    name: "中部",
    prefectures: ["愛知県", "静岡県", "岐阜県", "長野県", "新潟県", "富山県", "石川県", "福井県", "山梨県"],
  },
  {
    name: "九州・沖縄",
    prefectures: ["福岡県", "熊本県", "鹿児島県", "長崎県", "大分県", "宮崎県", "佐賀県", "沖縄県"],
  },
  {
    name: "北海道・東北",
    prefectures: ["北海道", "宮城県", "福島県", "青森県", "岩手県", "秋田県", "山形県"],
  },
  {
    name: "中国・四国",
    prefectures: ["広島県", "岡山県", "山口県", "愛媛県", "香川県", "徳島県", "高知県", "鳥取県", "島根県"],
  },
]

export const PREFECTURE_SLUGS: Record<string, string> = {
  "北海道": "hokkaido", "青森県": "aomori", "岩手県": "iwate", "宮城県": "miyagi", "秋田県": "akita", "山形県": "yamagata", "福島県": "fukushima",
  "茨城県": "ibaraki", "栃木県": "tochigi", "群馬県": "gunma", "埼玉県": "saitama", "千葉県": "chiba", "東京都": "tokyo", "神奈川県": "kanagawa",
  "新潟県": "niigata", "富山県": "toyama", "石川県": "ishikawa", "福井県": "fukui", "山梨県": "yamanashi", "長野県": "nagano", "岐阜県": "gifu", "静岡県": "shizuoka", "愛知県": "aichi",
  "三重県": "mie", "滋賀県": "shiga", "京都府": "kyoto", "大阪府": "osaka", "兵庫県": "hyogo", "奈良県": "nara", "和歌山県": "wakayama",
  "鳥取県": "tottori", "島根県": "shimane", "岡山県": "okayama", "広島県": "hiroshima", "山口県": "yamaguchi",
  "徳島県": "tokushima", "香川県": "kagawa", "愛媛県": "ehime", "高知県": "kochi",
  "福岡県": "fukuoka", "佐賀県": "saga", "長崎県": "nagasaki", "熊本県": "kumamoto", "大分県": "oita", "宮崎県": "miyazaki", "鹿児島県": "kagoshima", "沖縄県": "okinawa"
}

export async function getClinicsCountByPrefecture() {
  const supabase = await createClient()

  // Fetch all clinics to count by prefecture
  // Note: In a larger DB, we might want to use a stored procedure or a view for this
  const { data, error } = await supabase
    .from('clinics')
    .select('prefecture')

  if (error) {
    console.error('Error fetching clinics:', error)
    return {}
  }

  const counts: Record<string, number> = {}
  data.forEach((clinic: any) => {
    if (clinic.prefecture) {
      counts[clinic.prefecture] = (counts[clinic.prefecture] || 0) + 1
    }
  })

  return counts
}

export async function getAllStations() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clinics')
    .select('stations, prefecture')

  if (error) {
    console.error('Error fetching stations:', error)
    return []
  }

  const stationMap = new Map<string, { prefectures: Set<string>; count: number }>()

  data.forEach((clinic: any) => {
    if (!clinic.stations) return

    const stationNames = clinic.stations.split(',').map((s: string) => s.trim())

    stationNames.forEach((stationName: string) => {
      if (!stationName) return

      const existing = stationMap.get(stationName)
      if (existing) {
        existing.count++
        existing.prefectures.add(clinic.prefecture)
      } else {
        stationMap.set(stationName, {
          prefectures: new Set([clinic.prefecture]),
          count: 1
        })
      }
    })
  })

  return Array.from(stationMap.entries())
    .map(([name, value]) => ({
      name,
      prefecture: Array.from(value.prefectures)[0], // Just take the first one for now
      count: value.count,
      slug: name // Using name as slug for now, or use a helper if needed
    }))
    .filter(station => station.count >= 1)
    .sort((a, b) => a.name.localeCompare(b.name, 'ja'))
}
