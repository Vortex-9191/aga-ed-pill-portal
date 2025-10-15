import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F5] to-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            <span className="text-[#FF6B6B]">全国の精神科・心療内科を探す</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            エリア・駅から、あなたに合った精神科・心療内科を見つけよう
          </p>

          <div className="mx-auto mb-12 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="エリア、駅名で検索..."
                className="h-14 pl-12 pr-4 text-base rounded-full border-2 border-[#FF6B6B]/20 focus:border-[#FF6B6B] shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-full border-[#FF6B6B]/30 hover:bg-[#FFE5E5] hover:border-[#FF6B6B] bg-transparent"
              asChild
            >
              <a href="/areas">エリアから探す</a>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-[#FF6B6B]/30 hover:bg-[#FFE5E5] hover:border-[#FF6B6B] bg-transparent"
              asChild
            >
              <a href="/stations">駅から探す</a>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-[#FF6B6B]/30 hover:bg-[#FFE5E5] hover:border-[#FF6B6B] bg-transparent"
              asChild
            >
              <a href="/cities">市区町村から探す</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
