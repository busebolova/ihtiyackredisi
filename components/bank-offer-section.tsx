"use client" // useState kullanıldığı için client component olarak işaretlendi

import { BankOfferCard } from "@/components/bank-offer-card"
import { Button } from "@/components/ui/button" // Button bileşeni import edildi
import { useState } from "react" // useState import edildi
import Link from "next/link" // Link bileşeni import edildi

interface BankOfferSectionProps {
  title: string
  description: string
  type: "interest" | "short-term"
  offers: any[]
  viewAllLink?: string // Yeni eklendi: Tümünü gör butonu için opsiyonel link
}

export function BankOfferSection({ title, description, type, offers, viewAllLink }: BankOfferSectionProps) {
  const [showAllOffers, setShowAllOffers] = useState(false)
  const initialDisplayCount = 3

  // Eğer viewAllLink varsa, her zaman ilk 3 teklifi göster ve butonu link olarak kullan
  // Yoksa, showAllOffers state'ine göre tümünü veya ilk 3'ü göster
  const offersToDisplay = viewAllLink
    ? offers.slice(0, initialDisplayCount)
    : showAllOffers
      ? offers
      : offers.slice(0, initialDisplayCount)

  const titleParts = title.split(" ")
  const firstWord = titleParts[0]
  const restOfTitle = titleParts.slice(1).join(" ")

  return (
    <section className="px-4 mt-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
          <span className={type === "interest" ? "text-blue-600" : ""}>{firstWord}</span> {restOfTitle}
        </h2>
        <p className="text-gray-600 text-center mb-8">{description}</p>
        <div className={type === "interest" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "grid grid-cols-1 gap-6"}>
          {offersToDisplay.map((offer, index) => (
            <BankOfferCard key={index} {...offer} type={type} />
          ))}
        </div>
        {offers.length > initialDisplayCount && (
          <div className="text-center mt-8">
            {viewAllLink ? (
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal px-6 py-2"
                asChild
              >
                <Link href={viewAllLink} prefetch={false}>
                  Tüm Teklifleri Gör
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal px-6 py-2"
                onClick={() => setShowAllOffers(!showAllOffers)}
              >
                {showAllOffers ? "Daha az gör" : "Tüm Teklifleri Gör"}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
