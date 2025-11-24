import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ClinicBreadcrumbsProps {
  prefecture: string
  municipalities: string
  clinicName: string
}

export function ClinicBreadcrumbs({ prefecture, municipalities, clinicName }: ClinicBreadcrumbsProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center text-xs text-muted-foreground overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-primary transition">
                TOP
              </Link>
            </li>
            <ChevronRight size={12} className="flex-shrink-0" aria-hidden="true" />
            <li>
              <Link href={`/areas/${prefecture}`} className="hover:text-primary transition">
                {prefecture}
              </Link>
            </li>
            <ChevronRight size={12} className="flex-shrink-0" aria-hidden="true" />
            <li>
              <Link href={`/areas/${prefecture}/${municipalities}`} className="hover:text-primary transition">
                {municipalities}
              </Link>
            </li>
            <ChevronRight size={12} className="flex-shrink-0" aria-hidden="true" />
            <li>
              <span className="font-bold text-foreground truncate" aria-current="page">
                {clinicName}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  )
}
