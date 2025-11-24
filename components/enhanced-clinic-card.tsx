import Link from "next/link"
import { MapPin, Phone, ChevronRight, Clock, User, Star, CreditCard, Banknote, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EnhancedClinicCardProps {
  clinic: {
    id: string
    no: number
    clinic_name: string
    slug: string
    address: string
    prefecture: string
    municipalities: string | null
    stations: string | null
    url: string | null
    featured_subjects: string | null
    clinic_spec: string | null
    corp_tel: string | null
    non_medical_response: string | null
    rating: number | null
    review_count: number | null
    特徴: string | null
    備考: string | null
    月曜?: string | null
    火曜?: string | null
    水曜?: string | null
    木曜?: string | null
    金曜?: string | null
    土曜?: string | null
    日曜?: string | null
  }
  position?: number
}

export function EnhancedClinicCard({ clinic, position }: EnhancedClinicCardProps) {
  // Extract payment methods from non_medical_response
  const paymentMethods = clinic.non_medical_response?.split(',').map(s => s.trim()).filter(Boolean) || []

  // Parse features
  const features = clinic.特徴?.split(',').map(s => s.trim()).filter(Boolean) || []

  // Get operating hours
  const weekdayHours = [
    { day: '月', hours: clinic.月曜 },
    { day: '火', hours: clinic.火曜 },
    { day: '水', hours: clinic.水曜 },
    { day: '木', hours: clinic.木曜 },
    { day: '金', hours: clinic.金曜 },
    { day: '土', hours: clinic.土曜 },
    { day: '日', hours: clinic.日曜 },
  ].filter(d => d.hours && d.hours !== '-')

  const firstHours = weekdayHours[0]

  // Parse notes for pricing info
  const notes = clinic.備考?.split('\n').filter(Boolean) || []
  const pricingInfo = notes.find(n => n.includes('カウンセリング') || n.includes('診察料'))

  return (
    <article
      className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
      itemScope
      itemType="https://schema.org/MedicalClinic"
    >
      <div className="p-0">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-5 border-b border-border/50">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <Link href={`/clinics/${clinic.slug}`}>
                  <h2
                    className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2"
                    itemProp="name"
                  >
                    {position && (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold mr-2">
                        {position}
                      </span>
                    )}
                    {clinic.clinic_name}
                  </h2>
                </Link>

                {/* Clinic Spec/Type */}
                {clinic.clinic_spec && (
                  <p className="text-sm text-muted-foreground mb-2" itemProp="medicalSpecialty">
                    {clinic.clinic_spec}
                  </p>
                )}
              </div>

              {clinic.rating && (
                <div
                  className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50 shadow-sm"
                  itemProp="aggregateRating"
                  itemScope
                  itemType="https://schema.org/AggregateRating"
                >
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm" itemProp="ratingValue">{clinic.rating}</span>
                  {clinic.review_count && (
                    <>
                      <span className="text-xs text-muted-foreground">
                        (<span itemProp="reviewCount">{clinic.review_count}</span>)
                      </span>
                      <meta itemProp="bestRating" content="5" />
                      <meta itemProp="worstRating" content="1" />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 py-5 space-y-4">
            {/* Featured Subjects/Treatments */}
            {clinic.featured_subjects && (
              <div className="flex flex-wrap gap-2">
                {clinic.featured_subjects.split(',').map((subject, idx) => {
                  const trimmed = subject.trim()
                  return trimmed ? (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                      {trimmed}
                    </Badge>
                  ) : null
                })}
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((feature, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            )}

            {/* Address & Access */}
            <div
              className="space-y-2.5 text-sm"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <span className="font-medium text-foreground" itemProp="streetAddress">
                    {clinic.address}
                  </span>
                  <meta itemProp="addressRegion" content={clinic.prefecture} />
                  {clinic.municipalities && (
                    <meta itemProp="addressLocality" content={clinic.municipalities} />
                  )}
                  {clinic.stations && (
                    <div className="mt-1 text-xs">
                      <Building2 className="h-3 w-3 inline mr-1" />
                      最寄り駅: {clinic.stations}
                    </div>
                  )}
                </div>
              </div>

              {/* Operating Hours */}
              {firstHours && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <span className="line-clamp-1">
                      {firstHours.day}曜: {firstHours.hours}
                    </span>
                    {weekdayHours.length > 1 && (
                      <span className="text-xs ml-1">他</span>
                    )}
                  </div>
                </div>
              )}

              {/* Pricing Info */}
              {pricingInfo && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Banknote className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <span className="text-xs">{pricingInfo}</span>
                </div>
              )}

              {/* Payment Methods */}
              {paymentMethods.length > 0 && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <CreditCard className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="text-xs">
                    {paymentMethods.join(', ')}
                  </div>
                </div>
              )}
            </div>

            {/* Notes/Recommendations */}
            {notes.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
                {notes.slice(0, 2).map((note, idx) => (
                  <p key={idx} className="line-clamp-1">{note}</p>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild className="flex-1 rounded-xl" size="lg">
                <Link href={`/clinics/${clinic.slug}`}>
                  詳細を見る
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              {clinic.corp_tel && (
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-xl border-primary/30 hover:bg-primary/5 hover:border-primary"
                  asChild
                >
                  <a href={`tel:${clinic.corp_tel}`} itemProp="telephone">
                    <Phone className="mr-2 h-4 w-4" />
                    電話予約
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden schema.org metadata */}
      {clinic.url && <meta itemProp="url" content={clinic.url} />}
    </article>
  )
}
