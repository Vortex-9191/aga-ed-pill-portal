export default function CitiesLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FF6B6B] border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">読み込み中...</p>
      </div>
    </div>
  )
}
