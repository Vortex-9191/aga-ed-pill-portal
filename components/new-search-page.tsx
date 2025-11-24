"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  MapPin,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  SlidersHorizontal,
  ChevronLeft,
} from 'lucide-react'
import { EnhancedClinicCard } from "@/components/enhanced-clinic-card"
import { DiagnosisTool } from "@/components/diagnosis-tool"
import { SearchFilters } from "@/components/search-filters"

interface NewSearchPageProps {
  clinics: any[]
  facetData: any
  totalCount: number
  currentPage: number
  totalPages: number
  from: number
  to: number
  query: string
  prefecture: string
  onlineOnly?: boolean
}

export function NewSearchPage(props: NewSearchPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const { clinics, facetData, totalCount, currentPage, totalPages, from, to, query, prefecture, onlineOnly } = props

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-slate-900 text-teal-400 p-1.5 rounded-lg group-hover:bg-slate-800 transition">
                <TrendingUp size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">AGA治療.com</span>
            </Link>

            <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
              <Link href="#" className="hover:text-teal-600 transition py-2">AGAとは</Link>
              <Link href="/areas" className="hover:text-teal-600 transition py-2">クリニック検索</Link>
              <Link href="#" className="hover:text-teal-600 transition py-2">治療薬・費用</Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-slate-600 hover:text-slate-900 font-bold text-sm">ログイン</button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg transition">
                無料カウンセリング
              </button>
            </div>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-2">
            <Link href="/areas" className="block px-4 py-3 rounded-lg hover:bg-slate-50 font-bold">クリニック検索</Link>
          </div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-teal-600">ホーム</Link>
            <ChevronRight size={16} />
            <span className="text-slate-900 font-medium">検索結果</span>
          </nav>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">
            {onlineOnly ? "オンライン診療対応クリニック" : query ? `「${query}」の検索結果` : prefecture ? `${prefecture}のクリニック` : "クリニック検索"}
          </h1>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <SearchFilters facets={facetData} />
            </div>
          </aside>

          <div className="space-y-6">
            <DiagnosisTool />

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                {totalCount}件中 {totalCount > 0 ? from + 1 : 0}〜{Math.min(to + clinics.length, totalCount)}件を表示
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm"
              >
                <SlidersHorizontal size={16} />
                絞り込み
              </button>
            </div>

            {showFilters && (
              <div className="lg:hidden bg-white p-6 rounded-2xl border">
                <SearchFilters facets={facetData} />
              </div>
            )}

            <div className="space-y-4">
              {clinics && clinics.length > 0 ? (
                clinics.map((clinic, index) => (
                  <EnhancedClinicCard
                    key={clinic.id}
                    clinic={clinic}
                    position={from + index + 1}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border">
                  <p className="text-slate-500">検索条件に一致するクリニックが見つかりませんでした。</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                {currentPage > 1 && (
                  <Link href={`?page=${currentPage - 1}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
                      <ChevronLeft size={16} />
                      前へ
                    </button>
                  </Link>
                )}
                <span className="px-4 py-2 text-sm text-slate-600">
                  {currentPage} / {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link href={`?page=${currentPage + 1}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
                      次へ
                      <ChevronRight size={16} />
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-xs opacity-40">
            &copy; 2025 AGA治療.com. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
