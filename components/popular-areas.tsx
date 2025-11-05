import Link from "next/link"

const regions = [
  {
    name: "関東",
    prefectures: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
  },
  {
    name: "関西",
    prefectures: ["大阪府", "京都府", "兵庫県", "奈良県", "和歌山県", "滋賀県"],
  },
  {
    name: "中部",
    prefectures: ["愛知県", "静岡県", "岐阜県", "三重県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県"],
  },
  {
    name: "九州・沖縄",
    prefectures: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
  },
  {
    name: "東北",
    prefectures: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  },
  {
    name: "北海道",
    prefectures: ["北海道"],
  },
  {
    name: "中国・四国",
    prefectures: ["広島県", "岡山県", "山口県", "鳥取県", "島根県", "香川県", "愛媛県", "徳島県", "高知県"],
  },
]

export function PopularAreas() {
  // This component is currently disabled - popular areas content to be added later
  return null
}
