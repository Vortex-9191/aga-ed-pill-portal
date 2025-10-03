import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V24C16 25.1046 15.1046 26 14 26H10C8.89543 26 8 25.1046 8 24V8Z"
              fill="#FF6B6B"
            />
            <path
              d="M20 12C20 10.8954 20.8954 10 22 10H26C27.1046 10 28 10.8954 28 12V24C28 25.1046 27.1046 26 26 26H22C20.8954 26 20 25.1046 20 24V12Z"
              fill="#FF6B6B"
            />
            <text x="36" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="700" fill="#FF6B6B">
              クリニック
            </text>
          </svg>
        </Link>

        <Button variant="ghost" size="icon" className="text-accent">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}
