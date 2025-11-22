import { Metadata } from "next"

export const metadata: Metadata = {
  title: "女性向けピル処方 | AGA治療・ピル処方ポータル",
  description: "オンラインで手軽にピル処方。女性の健康をサポートするクリニックを検索。",
}

export default function WomensPillLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
