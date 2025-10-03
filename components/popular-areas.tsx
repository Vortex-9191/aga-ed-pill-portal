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
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            また病院に
            <br />
            行くほどでは...
          </h2>

          <div className="mb-12 text-center">
            <p className="mb-6 text-lg">
              <span className="text-[#FF6B6B] font-bold">お悩みやまよう</span>
              <br />
              <span className="text-[#FF6B6B] font-bold">1つでも当てはまったら</span>
            </p>

            <div className="mb-8 space-y-4">
              {[
                { number: "1", text: "症状はあるけど、忙しくて病院に行けない" },
                { number: "2", text: "病院に行くほどではないと思うけど、薬は欲しい" },
                { number: "3", text: "待ち時間が長くて、病院に行くのが億劫" },
              ].map((item) => (
                <div key={item.number} className="flex items-start gap-3 text-left max-w-md mx-auto">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFE5E5] text-sm font-bold text-[#FF6B6B]">
                    {item.number}
                  </div>
                  <p className="pt-1 text-sm">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-2">医師がオンラインで診察します</p>
            <p className="text-xs text-muted-foreground">※症状によっては対面診療をおすすめする場合があります</p>
          </div>

          <div className="text-center">
            <Link
              href="/search"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#06C755] px-12 text-base font-bold text-white shadow-lg hover:bg-[#06C755]/90 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEで無料予約
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
