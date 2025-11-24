import type { ClinicPrice } from "@/lib/types/clinic"

interface ClinicPriceTableProps {
  prices: ClinicPrice[]
}

export function ClinicPriceTable({ prices }: ClinicPriceTableProps) {
  if (!prices || prices.length === 0) {
    return null
  }

  return (
    <section className="mb-10 bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 border-l-4 border-primary pl-3">
        料金プラン・費用
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-foreground">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">プラン名</th>
              <th className="px-4 py-3">月額目安</th>
              <th className="px-4 py-3 rounded-r-lg">備考</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {prices.map((item, idx) => (
              <tr key={idx} className="hover:bg-muted transition">
                <td className="px-4 py-4 font-bold text-foreground">{item.name}</td>
                <td className="px-4 py-4 text-primary font-bold text-lg">
                  ¥{item.price.toLocaleString()}~
                </td>
                <td className="px-4 py-4 text-muted-foreground text-xs">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-right">
        ※価格は全て税込表示です。自由診療のため保険適用外となります。
      </p>
    </section>
  )
}
