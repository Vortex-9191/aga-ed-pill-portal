import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SearchCategories } from "@/components/search-categories"
import { PopularAreas } from "@/components/popular-areas"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SearchCategories />
        <PopularAreas />
      </main>
      <Footer />
    </div>
  )
}
