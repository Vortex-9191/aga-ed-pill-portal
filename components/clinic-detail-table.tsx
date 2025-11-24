import { FileText } from "lucide-react"
import type { Clinic } from "@/lib/types/clinic"

interface ClinicDetailTableProps {
  clinic: Clinic
}

export function ClinicDetailTable({ clinic }: ClinicDetailTableProps) {
  const formatHours = () => {
    if (clinic.hours_monday) {
      return `${clinic.hours_monday} (月曜) ※その他曜日は詳細情報をご確認ください`
    }
    return "要問い合わせ"
  }

  return (
    <section className="mb-10 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      <div className="bg-muted px-6 py-4 border-b border-border">
        <h2 className="font-bold text-foreground flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          クリニック詳細情報
        </h2>
      </div>
      <div className="p-6 md:p-8">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="border-b border-border pb-4">
            <dt className="text-xs font-bold text-muted-foreground mb-1">クリニック名</dt>
            <dd className="text-sm font-bold text-foreground">{clinic.clinic_name}</dd>
          </div>
          <div className="border-b border-border pb-4">
            <dt className="text-xs font-bold text-muted-foreground mb-1">院長</dt>
            <dd className="text-sm text-foreground">{clinic.director_name || "未登録"}</dd>
          </div>
          <div className="border-b border-border pb-4">
            <dt className="text-xs font-bold text-muted-foreground mb-1">住所</dt>
            <dd className="text-sm text-foreground">{clinic.address}</dd>
          </div>
          <div className="border-b border-border pb-4">
            <dt className="text-xs font-bold text-muted-foreground mb-1">診療時間</dt>
            <dd className="text-sm text-foreground">{formatHours()}</dd>
          </div>
          <div className="border-b border-border pb-4">
            <dt className="text-xs font-bold text-muted-foreground mb-1">休診日</dt>
            <dd className="text-sm text-foreground">{clinic.closed_days || "要確認"}</dd>
          </div>
          <div className="border-b border-border pb-4">
            <dt className="text-xs font-bold text-muted-foreground mb-1">アクセス</dt>
            <dd className="text-sm text-foreground">{clinic.stations || clinic.access_info || "要確認"}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
