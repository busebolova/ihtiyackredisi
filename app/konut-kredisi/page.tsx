import { Suspense } from "react"
import { KonutKredisiPageClientContent } from "./konut-kredisi-client-content"
import Loading from "./loading"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function KonutKredisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<Loading />}>
        <KonutKredisiPageClientContent />
      </Suspense>
      <Footer />
    </div>
  )
}
