import { Suspense } from 'react'
import { FaizsizKrediPageClientContent } from './faizsiz-kredi-client-content'
import Loading from './loading'
import { Header } from "@/components/header" // Header import edildi
import { Footer } from "@/components/footer" // Footer import edildi

export default function FaizsizKrediPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header /> {/* Header eklendi */}
      <Suspense fallback={<Loading />}>
        <FaizsizKrediPageClientContent />
      </Suspense>
      <Footer /> {/* Footer eklendi */}
    </div>
  )
}
