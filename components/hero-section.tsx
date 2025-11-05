"use client"

import { Button } from "@/components/ui/button"
import { Search, MapPin, Building2, Users, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl">
          {/* Trust Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Award className="h-4 w-4" />
              信頼できる医療機関のみ掲載
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            <span className="text-foreground">専門クリニックで</span>
            <br />
            <span className="text-primary">確かな治療を</span>
          </h1>

          <p className="mb-10 text-center text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
            AGA治療の専門クリニックを、お住まいの地域から簡単検索
          </p>

          {/* Search Box */}
          <div className="mx-auto mb-12 max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="エリア、駅名、クリニック名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 pl-14 pr-32 text-base rounded-2xl border-2 border-border/50 focus:border-primary shadow-lg bg-background"
              />
              <Button
                type="submit"
                size="lg"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary hover:bg-primary/90 h-12"
              >
                検索する
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Button
              variant="outline"
              className="rounded-xl border-border hover:bg-primary/5 hover:border-primary bg-background"
              asChild
            >
              <a href="/areas">
                <MapPin className="h-4 w-4 mr-2" />
                エリアから探す
              </a>
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-border hover:bg-primary/5 hover:border-primary bg-background"
              asChild
            >
              <a href="/stations">
                <Building2 className="h-4 w-4 mr-2" />
                駅から探す
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">掲載クリニック数</div>
            </div>
            <div className="text-center border-x border-border/50">
              <div className="text-3xl font-bold text-primary mb-1">47</div>
              <div className="text-sm text-muted-foreground">都道府県対応</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">専門医在籍</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
