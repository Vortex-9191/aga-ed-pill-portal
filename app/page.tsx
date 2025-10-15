import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PopularAreas } from "@/components/popular-areas"
import { Footer } from "@/components/footer"
import { PopularStations } from "@/components/popular-stations"
import { PopularMunicipalities } from "@/components/popular-municipalities"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularAreas />
        <PopularMunicipalities />
        <PopularStations />
      </main>
      <Footer />
    </div>
  )
}
