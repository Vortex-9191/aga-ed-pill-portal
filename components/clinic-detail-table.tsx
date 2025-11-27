import { FileText, Phone, Globe, MapPin, Train, User, Clock } from "lucide-react"
import type { Clinic } from "@/lib/types/clinic"

interface ClinicDetailTableProps {
  clinic: Clinic
}

export function ClinicDetailTable({ clinic }: ClinicDetailTableProps) {
  const detailItems = [
    { label: "クリニック名", value: clinic.clinic_name, icon: FileText },
    { label: "院長", value: clinic.director_name, icon: User },
    { label: "住所", value: clinic.address, icon: MapPin },
    { label: "アクセス", value: clinic.stations || clinic.access_info, icon: Train },
    { label: "電話番号", value: clinic.corp_tel, icon: Phone },
    { label: "公式サイト", value: clinic.homepage_url || clinic.url, icon: Globe, isLink: true },
    { label: "休診日", value: clinic.closed_days, icon: Clock },
  ].filter(item => item.value && item.value !== "-")

  return (
    <section className="mb-10 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h2 className="font-bold text-slate-900 flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <FileText size={18} className="text-primary" />
          クリニック詳細情報
        </h2>
      </div>
      <div className="p-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
          {detailItems.map(({ label, value, icon: Icon, isLink }) => (
            <div key={label} className="border-b border-slate-100 py-4 last:border-0">
              <dt className="text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
                <Icon size={12} className="text-primary" />
                {label}
              </dt>
              <dd className="text-sm text-slate-700">
                {isLink ? (
                  <a
                    href={value!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    公式サイトを見る
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
