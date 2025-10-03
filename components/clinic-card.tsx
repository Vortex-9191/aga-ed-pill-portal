import Link from "next/link"
import { MapPin, Clock, Phone, Star, ChevronRight } from "lucide-react"
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
    distance: string
    specialties: string[]
    rating: number
    reviewCount: number
    openNow: boolean
    features: string[]
    phone: string
    hours: string
  }
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-3">
            {/* Clinic Name */}
            <div>
              <Link href={`/clinics/${clinic.slug}`}>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                  {clinic.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="ml-1 text-sm font-medium text-foreground">{clinic.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({clinic.reviewCount}件の口コミ)</span>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2">
              {clinic.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>

            {/* Location */}
            <div className="space-y-1 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{clinic.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground ml-6">
                <span>
                  {clinic.station}から徒歩{clinic.distance}
                </span>
              </div>
            </div>

            {/* Hours and Status */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{clinic.hours}</span>
              </div>
              {clinic.openNow && (
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  診療中
                </Badge>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {clinic.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 md:w-40">
            <Button asChild className="w-full">
              <Link href={`/clinics/${clinic.slug}`}>
                詳細を見る
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href={`tel:${clinic.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                電話する
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
