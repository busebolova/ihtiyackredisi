"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Check } from "lucide-react"
import Link from "next/link"

interface SearchResultBankCardProps {
  bankLogoSrc: string
  bankName: string
  interestRate: string // E.g., "%3.49" or "%0.00"
  monthlyPayment: string
  totalPayment: string
  features: string[]
  rating: number
  commentCount: number
  buttonColor?: string // Optional prop for button color
  bankUrl?: string // Added bankUrl prop for loan applications
}

export function SearchResultBankCard({
  bankLogoSrc,
  bankName,
  interestRate,
  monthlyPayment,
  totalPayment,
  features,
  rating,
  commentCount,
  buttonColor = "#FF7A00", // Default to orange
  bankUrl, // Added bankUrl prop for loan applications
}: SearchResultBankCardProps) {
  const bankNameForUrl = encodeURIComponent(bankName.toLowerCase().replace(/\s+/g, "-"))

  // Query parametrelerini oluştur
  const queryParams = new URLSearchParams({
    interestRate: interestRate,
    monthlyPayment: monthlyPayment,
    totalPayment: totalPayment,
    // Diğer gerekli bilgileri de ekleyebilirsiniz, örneğin loanAmount ve maturity
    // Ancak bu kartta bu bilgiler doğrudan bulunmadığı için şimdilik eklemiyorum.
    // Eğer bu kartta loanAmount ve maturity olsaydı, onları da eklerdim.
  }).toString()

  return (
    <Card className="p-6 rounded-xl shadow-md flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Link href={`/bank-details/${bankNameForUrl}?${queryParams}`} prefetch={false}>
          <div
            className="bg-white p-2 rounded logo-container"
            style={{ backgroundColor: "#ffffff !important", background: "#ffffff" }}
          >
            <div className="bg-white p-1 rounded" style={{ backgroundColor: "#ffffff", background: "#ffffff" }}>
              <Image
                src={bankLogoSrc || "/placeholder.svg"}
                alt={`${bankName} logo`}
                width={100}
                height={30}
                className="object-contain cursor-pointer"
                style={{
                  backgroundColor: "#ffffff",
                  background: "#ffffff",
                  padding: "4px",
                  borderRadius: "4px",
                  boxShadow: "inset 0 0 0 1000px #ffffff",
                }}
              />
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-y-2 text-sm mb-4">
        <div>
          <div className="text-gray-700">Faiz Oranı</div>
          <div className="text-gray-800 font-bold text-lg">{interestRate}</div>
        </div>
        <div>
          <div className="text-gray-700">Aylık Ödeme</div>
          <div className="text-gray-800 font-bold text-lg">{monthlyPayment} TL</div>
        </div>
        <div>
          <div className="text-gray-700">Toplam Ödeme</div>
          <div className="text-gray-800 font-bold text-lg">{totalPayment} TL</div>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          <span className="font-semibold">
            {commentCount} kişi {bankName} hakkında yorum yazdı
          </span>
        </p>
        <div className="flex gap-2">
          <Link href={`/bank-details/${bankNameForUrl}?${queryParams}`} prefetch={false}>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal px-4 py-2 text-sm"
            >
              Kredi Detayları
            </Button>
          </Link>
          {bankUrl ? (
            <a href={bankUrl} target="_blank" rel="noopener noreferrer">
              <Button className="text-white rounded-full font-normal px-4 py-2 text-sm bg-[#FF7A00] hover:bg-[#E66F00]">
                Hemen Başvur
              </Button>
            </a>
          ) : (
            <Button className="text-white rounded-full font-normal px-4 py-2 text-sm bg-[#FF7A00] hover:bg-[#E66F00]">
              Hemen Başvur
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
