/**
 * Municipality slug mapping
 * Maps Japanese municipality names to URL-friendly slugs
 */

const municipalitySlugMap: Record<string, string> = {
  // 東京都
  "新宿区": "shinjuku-ku",
  "渋谷区": "shibuya-ku",
  "港区": "minato-ku",
  "世田谷区": "setagaya-ku",
  "品川区": "shinagawa-ku",
  "千代田区": "chiyoda-ku",
  "目黒区": "meguro-ku",
  "足立区": "adachi-ku",
  "八王子市": "hachioji",

  // 神奈川県
  "横浜市中区": "yokohama-naka",
  "横浜市旭区": "yokohama-asahi",
  "平塚市": "hiratsuka",
  "厚木市": "atsugi",

  // 大阪府
  "大阪市北区": "osaka-kita",

  // 愛知県
  "名古屋市中区": "nagoya-naka",
  "豊橋市": "toyohashi",
  "春日井市": "kasugai",

  // 福岡県
  "福岡市博多区": "fukuoka-hakata",
  "福岡市西区": "fukuoka-nishi",
  "福岡市南区": "fukuoka-minami",
  "北九州市門司区": "kitakyushu-moji",

  // 北海道
  "札幌市中央区": "sapporo-chuo",
  "旭川市": "asahikawa",

  // 京都府
  "京都市中京区": "kyoto-nakagyo",

  // その他主要都市
  "浜松市中央区": "hamamatsu-chuo",
  "金沢市": "kanazawa",
  "大分市": "oita",
  "岐阜市": "gifu",
  "鹿児島市": "kagoshima",
  "高知市": "kochi",
  "富山市": "toyama",
  "高崎市": "takasaki",
  "山形市": "yamagata",
  "福井市": "fukui",
  "津市": "tsu",
  "宮崎市": "miyazaki",
  "宇部市": "ube",
  "米子市": "yonago",
  "所沢市": "tokorozawa",
  "川越市": "kawagoe",
  "長岡市": "nagaoka",
  "長野市": "nagano",
  "岡山市北区": "okayama-kita",
  "熊本市東区": "kumamoto-higashi",
  "秋田市": "akita",
  "天草市": "amakusa",
  "つくば市": "tsukuba",
  "松江市": "matsue",
  "松本市": "matsumoto",
  "高岡市": "takaoka",
  "松山市": "matsuyama",
  "酒田市": "sakata",
  "沖縄市": "okinawa",
  "福島市": "fukushima",
}

/**
 * Get municipality slug from Japanese name
 * @param name - Japanese municipality name
 * @returns URL-friendly slug or null if not found
 */
export function getMunicipalitySlug(name: string): string | null {
  const normalizedName = normalizeMunicipalityName(name)
  return municipalitySlugMap[normalizedName] || null
}

/**
 * Get municipality name from slug
 * @param slug - URL-friendly slug
 * @returns Japanese municipality name or null if not found
 */
export function getMunicipalityName(slug: string): string | null {
  const entry = Object.entries(municipalitySlugMap).find(([_, s]) => s === slug)
  return entry ? entry[0] : null
}

/**
 * Normalize municipality name for consistent matching
 * @param name - Municipality name to normalize
 * @returns Normalized municipality name
 */
function normalizeMunicipalityName(name: string): string {
  return name
    .trim()
    .replace(/ヶ/g, 'ケ')  // Normalize ヶ to ケ
    .replace(/ケ/g, 'ケ')  // Ensure consistent ケ
    .replace(/ヵ/g, 'カ')  // Normalize ヵ to カ
    .replace(/〈/g, '(')   // Normalize special brackets
    .replace(/〉/g, ')')
}
