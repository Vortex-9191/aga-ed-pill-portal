import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-slate-900 text-teal-400 p-1.5 rounded-lg group-hover:bg-slate-800 transition">
              <TrendingUp size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">AGA治療.com</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
            <Link href="/areas" className="hover:text-teal-600 transition py-2 border-b-2 border-transparent hover:border-teal-600">エリアから探す</Link>
            <Link href="/stations" className="hover:text-teal-600 transition py-2 border-b-2 border-transparent hover:border-teal-600">駅から探す</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
