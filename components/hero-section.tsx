"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
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
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            <span className="text-primary">AGA・ED・アフターピル治療を探す</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            エリア・駅から、あなたに合った治療クリニックを見つけよう
          </p>

          <div className="mx-auto mb-12 max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="エリア、駅名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-base rounded-full border-2 border-primary/20 focus:border-primary shadow-sm"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90"
              >
                検索
              </Button>
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-full border-primary/30 hover:bg-blue-50 hover:border-primary bg-transparent"
              asChild
            >
              <a href="/areas">エリアから探す</a>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-primary/30 hover:bg-blue-50 hover:border-primary bg-transparent"
              asChild
            >
              <a href="/stations">駅から探す</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
