import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Heart, ShieldCheck, Sparkles } from "lucide-react"

export default function WomensPillPage() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-70" />
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              <span>新しい自分に出会う、女性のためのヘルスケア</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-in fade-in slide-in-from-bottom-4 duration-1000">
              オンライン・ピル処方で<br className="hidden sm:inline" />
              もっと自由に、もっと快適に
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              通院不要、スマホで完結。あなたのライフスタイルに合わせたピル処方をサポートします。
              安心・安全なクリニックを厳選してご紹介。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-w-[200px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button size="lg" className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" asChild>
                <Link href="/search?category=pill">
                  クリニックを探す <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base bg-background/50 backdrop-blur-sm hover:bg-background/80" asChild>
                <Link href="/about-pill">
                  ピルについて知る
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold">体調管理をサポート</h3>
            <p className="text-muted-foreground">
              生理痛の緩和やPMSの改善など、避妊以外のメリットもたくさん。毎日の体調管理がスムーズに。
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold">安心のオンライン診療</h3>
            <p className="text-muted-foreground">
              忙しいあなたも、スマホ一つで医師の診察を受けられます。プライバシーにも配慮した配送でお届け。
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold">厳選されたクリニック</h3>
            <p className="text-muted-foreground">
              料金体系が明確で、信頼できるクリニックのみを掲載。口コミや評判もチェックできます。
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/10 px-6 py-16 md:px-12 md:py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              あなたにぴったりの<br />クリニックを見つけよう
            </h2>
            <p className="text-muted-foreground md:text-lg">
              初めての方でも安心。オンライン診療対応、即日発送、安価なプランなど、<br className="hidden md:inline" />
              あなたの希望に合うクリニックがきっと見つかります。
            </p>
            <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all" asChild>
              <Link href="/search?category=pill">
                今すぐ検索する
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
