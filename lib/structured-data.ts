import type { Clinic, ClinicWithPrices } from "./types/clinic"

export function generateClinicStructuredData(clinic: Clinic | ClinicWithPrices) {
  const clinicWithPrices = clinic as ClinicWithPrices

  // 診療時間を生成（OpeningHoursSpecification形式）
  const openingHours = []
  const daysMap = [
    { field: clinic.hours_monday, day: "Monday" },
    { field: clinic.hours_tuesday, day: "Tuesday" },
    { field: clinic.hours_wednesday, day: "Wednesday" },
    { field: clinic.hours_thursday, day: "Thursday" },
    { field: clinic.hours_friday, day: "Friday" },
    { field: clinic.hours_saturday, day: "Saturday" },
    { field: clinic.hours_sunday, day: "Sunday" },
  ]

  for (const { field, day } of daysMap) {
    if (field && field !== "-") {
      // 時間をパース（例: "09:00-18:00"）
      const match = field.match(/(\d{2}:\d{2})-(\d{2}:\d{2})/)
      if (match) {
        openingHours.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens: match[1],
          closes: match[2],
        })
      }
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.clinic_name,
    description: clinic.notes || clinic.clinic_spec || `${clinic.clinic_name}の情報ページ`,
    url: clinic.url || undefined,
    telephone: clinic.corp_tel || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.municipalities,
      addressRegion: clinic.prefecture,
      addressCountry: "JP",
    },
    ...(clinicWithPrices.min_price && {
      priceRange: `¥${clinicWithPrices.min_price.toLocaleString()}〜`,
    }),
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
    ...(clinic.director_name && {
      employee: {
        "@type": "Person",
        name: clinic.director_name,
        jobTitle: "院長",
      },
    }),
    ...(clinic.non_medical_response && {
      paymentAccepted: clinic.non_medical_response,
    }),
    ...(clinic.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: clinic.rating,
        reviewCount: clinic.review_count || 0,
      },
    }),
  }

  // Remove undefined fields
  return JSON.parse(JSON.stringify(structuredData))
}
