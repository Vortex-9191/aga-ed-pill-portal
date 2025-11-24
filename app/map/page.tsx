import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMapView } from "@/components/location-map-view"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { createClient } from "@/lib/supabase/server"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function MapPage() {
  const supabase = await createClient()

  // Fetch all clinics
  const { data: clinics, error } = await supabase
    .from("clinics")
    .select("*")
    .order("rating", { ascending: false, nullsLast: true })
    .limit(100) // Limit to 100 for performance

  if (error) {
    console.error("[map] Error fetching clinics:", error)
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>地図から探す</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <LocationMapView clinics={clinics || []} />
      </main>
      <Footer />
    </div>
  )
}
