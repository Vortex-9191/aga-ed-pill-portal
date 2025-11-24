import { NewHomePage } from "@/components/new-home-page"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return <NewHomePage />
}
