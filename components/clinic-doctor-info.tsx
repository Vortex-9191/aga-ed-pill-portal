interface ClinicDoctorInfoProps {
  directorName: string
  specialistDoctors?: string | null
}

export function ClinicDoctorInfo({ directorName, specialistDoctors }: ClinicDoctorInfoProps) {
  return (
    <section className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 border-l-4 border-primary pl-3">
        医師紹介
      </h2>
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl overflow-hidden border-2 border-card shadow-sm">
            👨‍⚕️
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-primary mb-1">院長</p>
          <h3 className="text-lg font-bold text-foreground mb-3">{directorName}</h3>
          {specialistDoctors && (
            <div className="bg-muted p-4 rounded-xl relative">
              <p className="text-sm text-muted-foreground leading-relaxed">
                資格: {specialistDoctors}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
