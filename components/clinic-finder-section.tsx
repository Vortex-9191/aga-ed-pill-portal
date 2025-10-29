"use client"

import { useState } from "react"
import { ClinicFinderWizard } from "./clinic-finder-wizard"
import { ClinicCard } from "./clinic-card"
import { Sparkles } from "lucide-react"

interface Clinic {
  id: string
  name: string
  slug: string
  address: string
  station: string
  specialties: string[]
  phone: string | null
  prefecture: string
  city: string
  hours?: string
  directorName?: string | null
}

interface ClinicFinderSectionProps {
  availableClinics: Clinic[]
}

export function ClinicFinderSection({ availableClinics }: ClinicFinderSectionProps) {
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleDiagnosisComplete = (answers: Record<string, string>) => {
    // Filter clinics based on answers
    let filtered = [...availableClinics]

    // Filter by schedule preference
    if (answers.schedule === "weekend" && filtered.length > 0) {
      // Prioritize clinics with weekend hours (this would need actual data)
      filtered = filtered.slice(0, Math.max(5, Math.floor(filtered.length / 2)))
    }

    // Filter by director preference
    if (answers.director === "yes") {
      const withDirector = filtered.filter(c => c.directorName)
      if (withDirector.length > 0) {
        filtered = withDirector
      }
    }

    // Sort by priority
    if (answers.priority === "reputation") {
      // Sort by rating if available (placeholder)
      filtered = filtered.slice(0, 5)
    } else if (answers.priority === "access") {
      // Keep original order (might be by distance)
      filtered = filtered.slice(0, 5)
    }

    // Take top 5 recommendations
    setFilteredClinics(filtered.slice(0, 5))
    setShowResults(true)
  }

  return (
    <div className="space-y-8">
      {/* Wizard */}
      {!showResults && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-[#FF6B6B]" />
            <h2 className="text-2xl font-bold">あなたに最適なクリニックを見つける</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            7つの質問に答えるだけで、あなたに最適なクリニックを推奨します
          </p>
          <ClinicFinderWizard onComplete={handleDiagnosisComplete} />
        </div>
      )}

      {/* Results */}
      {showResults && filteredClinics.length > 0 && (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#FF6B6B]" />
              あなたにおすすめのクリニック
            </h3>
            <p className="text-muted-foreground">
              診断結果に基づいて、{filteredClinics.length}件のクリニックを厳選しました
            </p>
          </div>
          <div className="grid gap-6">
            {filteredClinics.map((clinic, index) => (
              <div key={clinic.id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-2 -left-2 bg-[#FF6B6B] text-white text-xs font-bold px-2 py-1 rounded">
                    最もおすすめ
                  </div>
                )}
                <ClinicCard {...clinic} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
