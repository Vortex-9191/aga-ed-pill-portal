import { MapPin, Phone, Clock, Calendar, CreditCard, Wifi, Accessibility, Car, Baby } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ClinicInfoSectionProps {
  clinic: {
    name: string
    address: string
    phone: string
    specialties: string[]
    features: string[]
    hours: {
      weekday: string
      saturday: string
      sunday: string
      holiday: string
    }
    payment: string[]
    parking: boolean
    accessibility: boolean
    wifi: boolean
    kidsSpace: boolean
  }
}

export function ClinicInfoSection({ clinic }: ClinicInfoSectionProps) {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">住所</p>
              <p className="text-sm text-muted-foreground">{clinic.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">電話番号</p>
              <a href={`tel:${clinic.phone}`} className="text-sm text-accent hover:underline">
                {clinic.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-2">診療科目</p>
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            診療時間
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm font-medium text-foreground">平日</span>
              <span className="text-sm text-muted-foreground">{clinic.hours.weekday}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm font-medium text-foreground">土曜日</span>
              <span className="text-sm text-muted-foreground">{clinic.hours.saturday}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm font-medium text-foreground">日曜日</span>
              <span className="text-sm text-muted-foreground">{clinic.hours.sunday}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium text-foreground">祝日</span>
              <span className="text-sm text-muted-foreground">{clinic.hours.holiday}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities & Payment */}
      <Card>
        <CardHeader>
          <CardTitle>設備・支払い方法</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-3">設備</p>
            <div className="grid grid-cols-2 gap-3">
              {clinic.parking && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Car className="h-4 w-4" />
                  <span>駐車場あり</span>
                </div>
              )}
              {clinic.accessibility && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Accessibility className="h-4 w-4" />
                  <span>バリアフリー</span>
                </div>
              )}
              {clinic.wifi && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wifi className="h-4 w-4" />
                  <span>Wi-Fi完備</span>
                </div>
              )}
              {clinic.kidsSpace && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Baby className="h-4 w-4" />
                  <span>キッズスペース</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              支払い方法
            </p>
            <div className="flex flex-wrap gap-2">
              {clinic.payment.map((method) => (
                <Badge key={method} variant="outline">
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
