import Link from "next/link"
import { MapPin, Phone, ChevronRight, Clock, User, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ClinicCardProps {
  clinic: {
    id: string
    name: string
    slug: string
    address: string
    station: string
    specialties: string[]
    phone: string | null
    prefecture: string
    city: string
    hours?: string | null
    directorName?: string | null
  }
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-5 border-b border-border/50">
            <Link href={`/clinics/${clinic.slug}`}>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {clinic.name}
              </h3>
            </Link>

            {clinic.directorName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>院長: {clinic.directorName}</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="px-6 py-5 space-y-4">
            {clinic.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    {specialty}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <span className="font-medium text-foreground">{clinic.address}</span>
                  {clinic.station && (
                    <div className="mt-1 text-xs">最寄り: {clinic.station}</div>
                  )}
                </div>
              </div>
              {clinic.hours && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <span className="line-clamp-2">{clinic.hours}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild className="flex-1 rounded-xl" size="lg">
                <Link href={`/clinics/${clinic.slug}`}>
                  詳細を見る
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              {clinic.phone && (
                <Button variant="outline" size="lg" className="flex-1 rounded-xl border-primary/30 hover:bg-primary/5 hover:border-primary" asChild>
                  <a href={`tel:${clinic.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    電話予約
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
