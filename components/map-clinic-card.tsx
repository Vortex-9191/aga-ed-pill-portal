import Link from "next/link"
import { MapPin, Star, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MapClinicCardProps {
  clinic: {
    id: string
    name: string
    slug: string
    address: string
    distance: string
    specialties: string[]
    rating: number
    reviewCount: number
    openNow: boolean
    phone: string
  }
}

export function MapClinicCard({ clinic }: MapClinicCardProps) {
  return (
    <Card className="group transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={`/clinics/${clinic.slug}`}>
              <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                {clinic.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="ml-1 text-sm font-medium text-foreground">{clinic.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({clinic.reviewCount})</span>
              {clinic.openNow && (
                <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                  診療中
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {clinic.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{clinic.address}</span>
            </div>
            <div className="ml-5 text-accent font-medium">{clinic.distance}</div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="flex-1 h-8 text-xs" asChild>
              <Link href={`/clinics/${clinic.slug}`}>詳細</Link>
            </Button>
            <Button size="sm" variant="outline" className="h-8 px-3 bg-transparent" asChild>
              <a href={`tel:${clinic.phone}`}>
                <Phone className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
