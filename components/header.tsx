import Link from "next/link"
import { Menu, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95 shadow-sm">
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md group-hover:shadow-lg transition-all">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground tracking-tight">aga治療.com</span>
              <span className="text-xs text-muted-foreground">薄毛治療の専門クリニック検索</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/womens-pill" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              女性向けピル
            </Link>
            <Link href="/search" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              クリニック検索
            </Link>
            <Link href="/areas" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              エリアから探す
            </Link>
            <Link href="/stations" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              駅から探す
            </Link>
            <Link href="/help" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              よくある質問
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
