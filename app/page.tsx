import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PopularAreas } from "@/components/popular-areas"
import { Footer } from "@/components/footer"
import { PrefecturesWithCities } from "@/components/prefectures-with-cities"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularAreas />
        <PrefecturesWithCities />
      </main>
      <Footer />
    </div>
  )
}
