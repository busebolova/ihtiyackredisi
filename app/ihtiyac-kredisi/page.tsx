import { Suspense } from "react"
import { IhtiyacKredisiPageClientContent } from "./ihtiyac-kredisi-client-content"
import Loading from "./loading"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "İhtiyaç Kredisi Karşılaştırma | En Uygun Faiz Oranları 2025", // Updated from 2024
  description:
    "İhtiyaç kredisi faiz oranlarını karşılaştırın. Garanti BBVA, Akbank, QNB Finansbank ve diğer bankaların en uygun ihtiyaç kredisi tekliflerini inceleyin.",
  keywords: "ihtiyaç kredisi, kredi karşılaştırma, faiz oranları, banka kredisi, en uygun kredi",
  openGraph: {
    title: "İhtiyaç Kredisi Karşılaştırma | En Uygun Faiz Oranları",
    description:
      "Türkiye'nin önde gelen bankalarının ihtiyaç kredisi tekliflerini karşılaştırın ve size en uygun krediyi bulun.",
    type: "website",
  },
}

export default function IhtiyacKredisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<Loading />}>
        <IhtiyacKredisiPageClientContent />
      </Suspense>
      <Footer />
    </div>
  )
}
