"use client"

import { ArrowRight } from "lucide-react"

interface ClinicStickyCTAProps {
  url?: string | null
}

export function ClinicStickyCTA({ url }: ClinicStickyCTAProps) {
  if (!url) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-card border-t border-border p-4 shadow-2xl z-40 lg:hidden">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl shadow-md active:scale-95 transition flex items-center justify-center gap-2"
      >
        公式サイトで予約する <ArrowRight size={18} />
      </a>
    </div>
  )
}
