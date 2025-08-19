"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BulPageClientContent } from "./bul-page-client-content"
import { Suspense } from "react"

export default function BulPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header />
      <Suspense fallback={<div>Loading search results...</div>}>
        <BulPageClientContent />
      </Suspense>
      <Footer />
    </div>
  )
}
