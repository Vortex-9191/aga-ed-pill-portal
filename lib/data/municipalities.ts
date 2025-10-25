/**
 * Municipality slug mapping
 * Maps Japanese municipality names to URL-friendly slugs
 */

const municipalitySlugMap: Record<string, string> = {
  // 東京都
  "千代田区": "chiyoda-ku",
  "中央区": "chuo-ku",
  "港区": "minato-ku",
  "新宿区": "shinjuku-ku",
  "文京区": "bunkyo-ku",
  "台東区": "taito-ku",
  "墨田区": "sumida-ku",
  "江東区": "koto-ku",
  "品川区": "shinagawa-ku",
  "目黒区": "meguro-ku",
  "大田区": "ota-ku",
  "世田谷区": "setagaya-ku",
  "渋谷区": "shibuya-ku",
  "中野区": "nakano-ku",
  "杉並区": "suginami-ku",
  "豊島区": "toshima-ku",
  "北区": "kita-ku",
  "荒川区": "arakawa-ku",
  "板橋区": "itabashi-ku",
  "練馬区": "nerima-ku",
  "足立区": "adachi-ku",
  "葛飾区": "katsushika-ku",
  "江戸川区": "edogawa-ku",
  "八王子市": "hachioji",
  "立川市": "tachikawa",
  "武蔵野市": "musashino",
  "三鷹市": "mitaka",
  "府中市": "fuchu",
  "町田市": "machida",

  // 神奈川県
  "横浜市中区": "yokohama-naka",
  "横浜市西区": "yokohama-nishi",
  "横浜市南区": "yokohama-minami",
  "横浜市旭区": "yokohama-asahi",
  "横浜市磯子区": "yokohama-isogo",
  "横浜市金沢区": "yokohama-kanazawa",
  "横浜市港北区": "yokohama-kohoku",
  "横浜市戸塚区": "yokohama-totsuka",
  "横浜市港南区": "yokohama-konan",
  "横浜市緑区": "yokohama-midori",
  "横浜市青葉区": "yokohama-aoba",
  "横浜市都筑区": "yokohama-tsuzuki",
  "横浜市神奈川区": "yokohama-kanagawa",
  "横浜市保土ケ谷区": "yokohama-hodogaya",
  "横浜市鶴見区": "yokohama-tsurumi",
  "横浜市泉区": "yokohama-izumi",
  "横浜市瀬谷区": "yokohama-seya",
  "横浜市栄区": "yokohama-sakae",
  "川崎市幸区": "kawasaki-saiwai",
  "川崎市中原区": "kawasaki-nakahara",
  "川崎市高津区": "kawasaki-takatsu",
  "川崎市宮前区": "kawasaki-miyamae",
  "川崎市多摩区": "kawasaki-tama",
  "川崎市麻生区": "kawasaki-asao",
  "川崎市川崎区": "kawasaki-kawasaki",
  "相模原市中央区": "sagamihara-chuo",
  "相模原市南区": "sagamihara-minami",
  "相模原市緑区": "sagamihara-midori",
  "平塚市": "hiratsuka",
  "厚木市": "atsugi",
  "藤沢市": "fujisawa",
  "横須賀市": "yokosuka",
  "小田原市": "odawara",
  "茅ヶ崎市": "chigasaki",

  // 大阪府
  "大阪市北区": "osaka-kita",
  "大阪市中央区": "osaka-chuo",
  "大阪市西区": "osaka-nishi",
  "大阪市天王寺区": "osaka-tennoji",
  "大阪市浪速区": "osaka-naniwa",
  "大阪市東淀川区": "osaka-higashiyodogawa",
  "大阪市生野区": "osaka-ikuno",
  "大阪市旭区": "osaka-asahi",
  "大阪市城東区": "osaka-joto",
  "大阪市阿倍野区": "osaka-abeno",
  "大阪市住吉区": "osaka-sumiyoshi",
  "大阪市東住吉区": "osaka-higashisumiyoshi",
  "大阪市西成区": "osaka-nishinari",
  "大阪市淀川区": "osaka-yodogawa",
  "大阪市鶴見区": "osaka-tsurumi",
  "大阪市住之江区": "osaka-suminoe",
  "大阪市平野区": "osaka-hirano",
  "大阪市福島区": "osaka-fukushima",
  "大阪市此花区": "osaka-konohana",
  "大阪市港区": "osaka-minato",
  "大阪市大正区": "osaka-taisho",
  "大阪市西淀川区": "osaka-nishiyodogawa",
  "大阪市東成区": "osaka-higashinari",
  "堺市堺区": "sakai-sakai",
  "堺市中区": "sakai-naka",
  "堺市東区": "sakai-higashi",
  "堺市西区": "sakai-nishi",
  "堺市南区": "sakai-minami",
  "堺市北区": "sakai-kita",
  "堺市美原区": "sakai-mihara",

  // 愛知県
  "名古屋市中区": "nagoya-naka",
  "名古屋市千種区": "nagoya-chikusa",
  "名古屋市東区": "nagoya-higashi",
  "名古屋市北区": "nagoya-kita",
  "名古屋市西区": "nagoya-nishi",
  "名古屋市中村区": "nagoya-nakamura",
  "名古屋市昭和区": "nagoya-showa",
  "名古屋市瑞穂区": "nagoya-mizuho",
  "名古屋市熱田区": "nagoya-atsuta",
  "名古屋市中川区": "nagoya-nakagawa",
  "名古屋市港区": "nagoya-minato",
  "名古屋市南区": "nagoya-minami",
  "名古屋市守山区": "nagoya-moriyama",
  "名古屋市緑区": "nagoya-midori",
  "名古屋市名東区": "nagoya-meito",
  "名古屋市天白区": "nagoya-tempaku",
  "豊橋市": "toyohashi",
  "春日井市": "kasugai",
  "豊田市": "toyota",
  "岡崎市": "okazaki",
  "一宮市": "ichinomiya",

  // 福岡県
  "福岡市博多区": "fukuoka-hakata",
  "福岡市中央区": "fukuoka-chuo",
  "福岡市西区": "fukuoka-nishi",
  "福岡市南区": "fukuoka-minami",
  "福岡市東区": "fukuoka-higashi",
  "福岡市城南区": "fukuoka-jonan",
  "福岡市早良区": "fukuoka-sawara",
  "北九州市門司区": "kitakyushu-moji",
  "北九州市小倉北区": "kitakyushu-kokurakita",
  "北九州市小倉南区": "kitakyushu-kokuraminami",
  "北九州市若松区": "kitakyushu-wakamatsu",
  "北九州市八幡東区": "kitakyushu-yahatahigashi",
  "北九州市八幡西区": "kitakyushu-yahatanishi",
  "北九州市戸畑区": "kitakyushu-tobata",
  "久留米市": "kurume",

  // 北海道
  "札幌市中央区": "sapporo-chuo",
  "札幌市北区": "sapporo-kita",
  "札幌市東区": "sapporo-higashi",
  "札幌市白石区": "sapporo-shiroishi",
  "札幌市豊平区": "sapporo-toyohira",
  "札幌市南区": "sapporo-minami",
  "札幌市西区": "sapporo-nishi",
  "札幌市厚別区": "sapporo-atsubetsu",
  "札幌市手稲区": "sapporo-teine",
  "札幌市清田区": "sapporo-kiyota",
  "旭川市": "asahikawa",
  "函館市": "hakodate",

  // 京都府
  "京都市中京区": "kyoto-nakagyo",
  "京都市北区": "kyoto-kita",
  "京都市上京区": "kyoto-kamigyo",
  "京都市左京区": "kyoto-sakyo",
  "京都市東山区": "kyoto-higashiyama",
  "京都市下京区": "kyoto-shimogyo",
  "京都市南区": "kyoto-minami",
  "京都市右京区": "kyoto-ukyo",
  "京都市伏見区": "kyoto-fushimi",
  "京都市山科区": "kyoto-yamashina",
  "京都市西京区": "kyoto-nishikyo",

  // 静岡県
  "浜松市中央区": "hamamatsu-chuo",

  // 石川県
  "金沢市": "kanazawa",

  // 大分県
  "大分市": "oita",

  // 岐阜県
  "岐阜市": "gifu",

  // 鹿児島県
  "鹿児島市": "kagoshima",

  // 高知県
  "高知市": "kochi",

  // 富山県
  "富山市": "toyama",
  "高岡市": "takaoka",

  // 群馬県
  "高崎市": "takasaki",

  // 山形県
  "山形市": "yamagata",
  "酒田市": "sakata",

  // 福井県
  "福井市": "fukui",

  // 三重県
  "津市": "tsu",

  // 宮崎県
  "宮崎市": "miyazaki",

  // 山口県
  "宇部市": "ube",

  // 鳥取県
  "米子市": "yonago",

  // 埼玉県
  "所沢市": "tokorozawa",
  "川越市": "kawagoe",

  // 新潟県
  "長岡市": "nagaoka",

  // 長野県
  "長野市": "nagano",
  "松本市": "matsumoto",

  // 岡山県
  "岡山市北区": "okayama-kita",

  // 熊本県
  "熊本市東区": "kumamoto-higashi",
  "天草市": "amakusa",

  // 秋田県
  "秋田市": "akita",

  // 茨城県
  "つくば市": "tsukuba",

  // 島根県
  "松江市": "matsue",

  // 愛媛県
  "松山市": "matsuyama",

  // 沖縄県
  "沖縄市": "okinawa",

  // 福島県
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
