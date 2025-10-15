import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="#FF6B6B" opacity="0.2"/>
              <path d="M16 8C16 7.44772 16.4477 7 17 7C17.5523 7 18 7.44772 18 8V15H24C24.5523 15 25 15.4477 25 16C25 16.5523 24.5523 17 24 17H18V24C18 24.5523 17.5523 25 17 25C16.4477 25 16 24.5523 16 24V17H10C9.44772 17 9 16.5523 9 16C9 15.4477 9.44772 15 10 15H16V8Z" fill="#FF6B6B"/>
            </svg>
            <span className="text-xl font-bold text-[#FF6B6B]">全国精神科ドットコム</span>
          </div>
        </Link>

        <Button variant="ghost" size="icon" className="text-accent">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}
