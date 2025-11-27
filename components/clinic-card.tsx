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
    rating?: number | null
    reviewCount?: number | null
  }
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-teal-500 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
            <div className="flex justify-between items-start gap-4">
              <Link href={`/clinics/${clinic.slug}`} className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors mb-2 line-clamp-2 leading-tight tracking-tight">
                  {clinic.name}
                </h3>
              </Link>
              {clinic.rating && (
                <div className="flex items-center gap-1 bg-white backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm">{clinic.rating}</span>
                  {clinic.reviewCount && (
                    <span className="text-xs text-slate-500">({clinic.reviewCount})</span>
                  )}
                </div>
              )}
            </div>

            {clinic.directorName && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
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
                  <Badge key={specialty} variant="secondary" className="bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100">
                    {specialty}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-teal-600" />
                <div>
                  <span className="font-medium text-slate-900">{clinic.address}</span>
                  {clinic.station && (
                    <div className="mt-1 text-xs">最寄り: {clinic.station}</div>
                  )}
                </div>
              </div>
              {clinic.hours && (
                <div className="flex items-start gap-3 text-slate-600">
                  <Clock className="h-5 w-5 mt-0.5 flex-shrink-0 text-teal-600" />
                  <span className="line-clamp-2">{clinic.hours}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild className="flex-1 rounded-xl bg-teal-600 hover:bg-teal-700" size="lg">
                <Link href={`/clinics/${clinic.slug}`}>
                  詳細を見る
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              {clinic.phone && (
                <Button variant="outline" size="lg" className="flex-1 rounded-xl border-teal-300 hover:bg-teal-50 hover:border-teal-500 text-teal-600" asChild>
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
