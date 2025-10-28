import Link from "next/link"
import { MapPin, Phone, ChevronRight, Clock, User } from "lucide-react"
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
    <Card className="group transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-3">
            <div>
              <Link href={`/clinics/${clinic.slug}`}>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                  {clinic.name}
                </h3>
              </Link>
            </div>

            {clinic.directorName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>院長: {clinic.directorName}</span>
              </div>
            )}

            {clinic.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-1 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{clinic.address}</span>
              </div>
              {clinic.station && (
                <div className="flex items-center gap-2 text-muted-foreground ml-6">
                  <span>{clinic.station}</span>
                </div>
              )}
              {clinic.hours && (
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{clinic.hours}</span>
                </div>
              )}
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
            {clinic.phone && (
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href={`tel:${clinic.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  電話する
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
