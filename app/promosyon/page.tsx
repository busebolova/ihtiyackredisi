import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromosyonPageClientContent } from "./promosyon-client-content"

export default function PromosyonPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header />
      <PromosyonPageClientContent />
      <Footer />
    </div>
  )
}
