export default function StationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 border">
              <div className="h-6 w-32 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
