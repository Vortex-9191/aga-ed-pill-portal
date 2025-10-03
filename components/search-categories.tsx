import Link from "next/link"

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="28" rx="4" stroke="#FF6B6B" strokeWidth="2" />
        <path d="M16 8V16M32 8V16" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 20H40" stroke="#FF6B6B" strokeWidth="2" />
      </svg>
    ),
    title: "初診でも",
    subtitle: "当日受診可能",
    description: "24時間いつでも予約可能！\n初診でも当日受診できます",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="14" width="28" height="24" rx="2" stroke="#FF6B6B" strokeWidth="2" />
        <circle cx="24" cy="26" r="6" stroke="#FF6B6B" strokeWidth="2" />
        <path d="M24 23V26L26 28" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "土日祝×24時間まで",
    subtitle: "診療あり",
    description: "平日忙しい方も安心\n土日祝日も診療可能です",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 15.163 32.837 8 24 8Z"
          stroke="#FF6B6B"
          strokeWidth="2"
        />
        <path d="M24 16V24L30 27" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "お財布に優しい",
    subtitle: "診察0円",
    description: "相談料・診察料は無料\nお薬代のみで受診できます",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="12" y="10" width="24" height="28" rx="4" stroke="#FF6B6B" strokeWidth="2" />
        <path d="M20 18H28M20 24H28M20 30H24" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "お薬の",
    subtitle: "当日配送まで対応可能",
    description: "処方箋は最短当日配送\n自宅で受け取れます",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 8L8 16V24C8 32 16 38 24 40C32 38 40 32 40 24V16L24 8Z"
          stroke="#FF6B6B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M18 24L22 28L30 20" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "予約から",
    subtitle: "診療完了まで自宅で完結",
    description: "外出不要で診療完了\n待ち時間もありません",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="20" cy="20" r="8" stroke="#FF6B6B" strokeWidth="2" />
        <circle cx="28" cy="28" r="8" stroke="#FF6B6B" strokeWidth="2" />
        <path d="M26 18L30 22M22 26L18 30" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "現役の無料科医",
    subtitle: "が診察",
    description: "経験豊富な医師が\nしっかり診察します",
  },
]

export function SearchCategories() {
  return (
    <section className="py-16 md:py-20 bg-[#FFF5F5]">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm text-[#FF6B6B]">初診の方へのご案内</p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              こんな<span className="text-[#FF6B6B]">お悩み</span>
              <br />
              ありませんか？
            </h2>
          </div>

          {/* Checklist */}
          <div className="mb-12 mx-auto max-w-md space-y-3">
            {["予約がなかなか取れない", "仕事・家事忙しくて行く時間がない", "通うに遠くて大変"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 10L8 13L15 6"
                    stroke="#FF6B6B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Main heading */}
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold md:text-3xl">
              <span className="text-[#FF6B6B]">エニキュア</span>が
              <br />
              選ばれる理由
            </h3>
          </div>

          {/* Features grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <p className="mb-1 text-xs text-[#FF6B6B]">{feature.title}</p>
                <h4 className="mb-3 text-lg font-bold text-[#FF6B6B]">{feature.subtitle}</h4>
                <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-muted-foreground">24時間予約可能、年中受診可能です</p>
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
