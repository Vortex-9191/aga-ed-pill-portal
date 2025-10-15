export const stationMap: Record<string, { ja: string; prefecture: string; lines: string[] }> = {
  // 東京都
  shibuya: { ja: "渋谷駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ銀座線", "東京メトロ半蔵門線"] },
  shinjuku: { ja: "新宿駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ丸ノ内線"] },
  ikebukuro: { ja: "池袋駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ丸ノ内線", "東京メトロ有楽町線"] },
  tokyo: { ja: "東京駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ丸ノ内線"] },
  shinagawa: { ja: "品川駅", prefecture: "東京都", lines: ["JR山手線", "JR東海道本線", "京急本線"] },
  ueno: { ja: "上野駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "東京メトロ銀座線"] },
  akihabara: { ja: "秋葉原駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ日比谷線"] },
  roppongi: { ja: "六本木駅", prefecture: "東京都", lines: ["東京メトロ日比谷線", "都営大江戸線"] },
  ebisu: { ja: "恵比寿駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ日比谷線"] },
  meguro: { ja: "目黒駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ南北線", "都営三田線"] },
  gotanda: { ja: "五反田駅", prefecture: "東京都", lines: ["JR山手線", "都営浅草線", "東急池上線"] },
  osaki: { ja: "大崎駅", prefecture: "東京都", lines: ["JR山手線", "りんかい線"] },
  tamachi: { ja: "田町駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線"] },
  hamamatsucho: { ja: "浜松町駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "東京モノレール"] },
  shimbashi: { ja: "新橋駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ銀座線", "都営浅草線"] },
  yurakucho: { ja: "有楽町駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "東京メトロ有楽町線"] },
  kanda: { ja: "神田駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ銀座線"] },
  nippori: { ja: "日暮里駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "京成本線"] },
  uguisudani: { ja: "鶯谷駅", prefecture: "東京都", lines: ["JR山手線"] },
  tabata: { ja: "田端駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線"] },
  komagome: { ja: "駒込駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ南北線"] },
  sugamo: { ja: "巣鴨駅", prefecture: "東京都", lines: ["JR山手線", "都営三田線"] },
  otsuka: { ja: "大塚駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ丸ノ内線"] },
  mejiro: { ja: "目白駅", prefecture: "東京都", lines: ["JR山手線"] },
  takadanobaba: { ja: "高田馬場駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ東西線", "西武新宿線"] },
  shinjukugyoenmae: { ja: "新宿御苑前駅", prefecture: "東京都", lines: ["東京メトロ丸ノ内線"] },
  yoyogi: { ja: "代々木駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "都営大江戸線"] },
  harajuku: { ja: "原宿駅", prefecture: "東京都", lines: ["JR山手線"] },

  // 神奈川県
  yokohama: { ja: "横浜駅", prefecture: "神奈川県", lines: ["JR東海道本線", "JR横須賀線", "東急東横線"] },
  kawasaki: { ja: "川崎駅", prefecture: "神奈川県", lines: ["JR東海道本線", "JR京浜東北線"] },

  // 大阪府
  osaka: { ja: "大阪駅", prefecture: "大阪府", lines: ["JR東海道本線", "JR大阪環状線"] },
  umeda: { ja: "梅田駅", prefecture: "大阪府", lines: ["阪急神戸線", "阪急宝塚線", "阪急京都線"] },
  namba: { ja: "難波駅", prefecture: "大阪府", lines: ["南海本線", "近鉄難波線", "大阪メトロ御堂筋線"] },
  tennoji: { ja: "天王寺駅", prefecture: "大阪府", lines: ["JR大阪環状線", "JR阪和線", "大阪メトロ御堂筋線"] },

  // 愛知県
  nagoya: { ja: "名古屋駅", prefecture: "愛知県", lines: ["JR東海道本線", "JR中央本線", "名古屋市営地下鉄東山線"] },

  // 福岡県
  hakata: { ja: "博多駅", prefecture: "福岡県", lines: ["JR鹿児島本線", "福岡市地下鉄空港線"] },
  tenjin: { ja: "天神駅", prefecture: "福岡県", lines: ["福岡市地下鉄空港線", "福岡市地下鉄七隈線"] },

  // 北海道
  sapporo: { ja: "札幌駅", prefecture: "北海道", lines: ["JR函館本線", "札幌市営地下鉄南北線"] },

  // 宮城県
  sendai: { ja: "仙台駅", prefecture: "宮城県", lines: ["JR東北本線", "仙台市地下鉄南北線"] },

  // 広島県
  hiroshima: { ja: "広島駅", prefecture: "広島県", lines: ["JR山陽本線", "JR芸備線"] },
}

export function getStationInfo(slug: string) {
  return stationMap[slug.toLowerCase()]
}

export function getStationJapaneseName(slug: string): string {
  const info = getStationInfo(slug)
  return info?.ja || slug
}

// Create reverse map: Japanese name -> English slug
const reverseStationMap: Record<string, string> = {}
Object.entries(stationMap).forEach(([slug, info]) => {
  // Store both with and without 駅 suffix
  const nameWithStation = info.ja
  const nameWithoutStation = info.ja.replace(/駅$/, '')
  reverseStationMap[nameWithStation] = slug
  reverseStationMap[nameWithoutStation] = slug
})

export function getStationSlug(japaneseName: string): string | undefined {
  // Try exact match first
  const normalized = japaneseName.trim()
  if (reverseStationMap[normalized]) {
    return reverseStationMap[normalized]
  }

  // Try without 駅 suffix
  const withoutStation = normalized.replace(/駅$/, '')
  if (reverseStationMap[withoutStation]) {
    return reverseStationMap[withoutStation]
  }

  return undefined
}
