import { MapPin, Train, Clock, Phone, CheckCircle2, ExternalLink } from "lucide-react"
import type { Clinic } from "@/lib/types/clinic"

interface ClinicHeaderCardProps {
  clinic: Clinic
}

export function ClinicHeaderCard({ clinic }: ClinicHeaderCardProps) {
  // ヘルパー関数: タグをパース
  const parseTags = (str: string | null) => (str ? str.split(",").map((s) => s.trim()) : [])

  // ヘルパー関数: 診療時間をフォーマット（簡易版）
  const formatHours = () => {
    if (clinic.hours_monday) {
      return `${clinic.hours_monday} (月曜) ※その他曜日は詳細情報をご確認ください`
    }
    return "要問い合わせ"
  }

  const featureTags = parseTags(clinic.features)
  const responseTags = parseTags(clinic.non_medical_response)
  const allTags = [...featureTags, ...responseTags]

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-slate-200 overflow-hidden mb-8">
      {/* メイン画像エリア */}
      <div className="relative h-48 sm:h-72 bg-slate-100 group">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
          <span className="flex flex-col items-center gap-2">
            <span className="text-4xl">🏥</span>
            <span className="text-sm">CLINIC IMAGE</span>
          </span>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            おすすめPICKUP
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">
          {clinic.clinic_name}
        </h1>

        {/* タグ */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/20 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 基本情報グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm text-foreground">住所</p>
                <p className="text-sm text-muted-foreground">{clinic.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Train size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm text-foreground">アクセス</p>
                <p className="text-sm text-muted-foreground">{clinic.stations || clinic.access_info || "要確認"}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm text-foreground">診療時間</p>
                <p className="text-sm text-muted-foreground">{formatHours()}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm text-foreground">電話番号</p>
                <p className="text-sm text-muted-foreground">{clinic.corp_tel || "要確認"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ポイント & CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
          <div className="flex-1">
            <p className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 size={18} />
              ここがポイント！
            </p>
            <p className="text-slate-700 text-sm font-medium leading-relaxed">
              {clinic.notes || clinic.clinic_spec || "詳細はお問い合わせください"}
            </p>
          </div>
          {clinic.url && (
            <a
              href={clinic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              公式サイトを見る <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
