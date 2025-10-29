"use client"

import { useState } from "react"
import { ClinicFinderWizard } from "./clinic-finder-wizard"
import { Sparkles, X } from "lucide-react"
import { Button } from "./ui/button"

export function ClinicFinderWrapper() {
  const [isOpen, setIsOpen] = useState(true)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleComplete = (newAnswers: Record<string, string>) => {
    setAnswers(newAnswers)

    // Construct filter URL based on answers
    const params = new URLSearchParams(window.location.search)

    if (newAnswers.schedule === "weekend") {
      params.set("weekend", "true")
    }
    if (newAnswers.schedule === "weekday_evening") {
      params.set("evening", "true")
    }
    if (newAnswers.director === "yes") {
      params.set("director", "true")
    }

    // Update URL with filters
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, "", newUrl)

    // Reload to apply filters
    window.location.reload()
  }

  if (!isOpen) {
    return (
      <div className="mb-6">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FFF5F5]"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          あなたに最適なクリニックを見つける
        </Button>
      </div>
    )
  }

  return (
    <div className="mb-8 relative">
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-[#FF6B6B]" />
          <h2 className="text-2xl font-bold">あなたに最適なクリニックを見つける</h2>
        </div>
        <p className="text-muted-foreground">
          7つの質問に答えるだけで、条件に合うクリニックが表示されます
        </p>
      </div>
      <ClinicFinderWizard onComplete={handleComplete} />
    </div>
  )
}
