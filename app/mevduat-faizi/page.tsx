import { Suspense } from "react"
import { MevduatFaiziPageClientContent } from "./mevduat-faizi-client-content"
import Loading from "./loading"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MevduatFaiziPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header />
      <Suspense fallback={<Loading />}>
        <MevduatFaiziPageClientContent />
      </Suspense>
      <Footer />
    </div>
  )
}
