import { Suspense } from "react"
import { TasitKredisiPageClientContent } from "./tasit-kredisi-client-content"
import Loading from "./loading"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TasitKredisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<Loading />}>
        <TasitKredisiPageClientContent />
      </Suspense>
      <Footer />
    </div>
  )
}
