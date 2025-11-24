import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "aga治療.com｜全国のAGA治療専門クリニック検索",
  description: "全国のAGA治療専門クリニックを地域・駅・条件で検索。薄毛治療の専門医による診察、オンライン診療対応クリニックも掲載。",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        {/* Analytics component removed */}
      </body>
    </html>
  )
}
