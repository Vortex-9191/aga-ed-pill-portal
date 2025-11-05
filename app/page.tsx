import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TreatmentFlow } from "@/components/treatment-flow"
import { Footer } from "@/components/footer"
import { PrefecturesWithCities } from "@/components/prefectures-with-cities"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUs />
        <TreatmentFlow />
        <PrefecturesWithCities />
      </main>
      <Footer />
    </div>
  )
}
