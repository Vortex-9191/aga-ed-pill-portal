import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          {/* Main heading in coral red */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance">
            <span className="text-[#FF6B6B]">当日受診可能</span>
          </h1>

          {/* Subheading */}
          <p className="mb-3 text-lg text-foreground/70 md:text-xl">安心あなたに</p>
          <p className="mb-8 text-lg text-foreground/70 md:text-xl">オンライン診療</p>

          {/* Simple illustration placeholder */}
          <div className="mx-auto mb-8 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-2 h-24 w-24 rounded-full bg-[#FFE5E5] flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="16" r="8" stroke="#FF6B6B" strokeWidth="2" />
                  <path
                    d="M12 36C12 28 16 24 24 24C32 24 36 28 36 36"
                    stroke="#FF6B6B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground">患者様</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-2 h-20 w-16 rounded-2xl bg-card border-2 border-[#FF6B6B] flex items-center justify-center">
                <div className="h-12 w-10 rounded-lg bg-[#FFE5E5]"></div>
              </div>
              <p className="text-xs text-muted-foreground">スマホで予約</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-2 h-24 w-24 rounded-full bg-[#FFE5E5] flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="16" r="8" stroke="#FF6B6B" strokeWidth="2" />
                  <path
                    d="M12 36C12 28 16 24 24 24C32 24 36 28 36 36"
                    stroke="#FF6B6B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 14L22 16L28 10"
                    stroke="#FF6B6B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground">医師</p>
            </div>
          </div>

          {/* Feature badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border/50">
              <span className="text-[#FF6B6B]">●</span>
              <span>相談料・診察料 0円</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border/50">
              <span className="text-[#FF6B6B]">●</span>
              <span>土日祝も 診療可能</span>
            </div>
          </div>

          {/* CTA text */}
          <p className="mb-4 text-sm text-muted-foreground">24時間予約可能、年中受診可能です</p>

          {/* LINE button */}
          <Button
            size="lg"
            className="h-14 px-12 text-base font-bold rounded-full bg-[#06C755] hover:bg-[#06C755]/90 text-white shadow-lg"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEで無料予約
          </Button>
        </div>
      </div>
    </section>
  )
}
