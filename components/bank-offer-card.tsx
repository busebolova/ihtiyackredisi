"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Check } from "lucide-react"
import Link from "next/link"

interface BankOfferCardProps {
  bankLogoSrc: string
  bankName: string
  loanAmount: string
  maturity: string
  monthlyPayment: string
  interestRate: string
  totalPayment: string
  type: "interest" | "short-term"
  rating?: number
  commentCount?: number
  isSponsored?: boolean
  isHighRated?: boolean
  features?: string[]
  cardVariant?: "default" | "green"
  displayMode?: "homepage" | "default" // Yeni eklendi: Kartın görüntüleme modu
  bankUrl?: string // Added bankUrl prop for loan applications
}

export function BankOfferCard({
  bankLogoSrc,
  bankName,
  loanAmount,
  maturity,
  monthlyPayment,
  interestRate,
  totalPayment,
  type,
  rating,
  commentCount,
  isSponsored,
  isHighRated,
  features = [],
  cardVariant = "default",
  displayMode = "default", // Varsayılan olarak "default" modu
  bankUrl, // Added bankUrl prop for loan applications
}: BankOfferCardProps) {
  const bankNameForUrl = encodeURIComponent(bankName.toLowerCase().replace(/\s+/g, "-"))

  const queryParams = new URLSearchParams()
  queryParams.append("amount", loanAmount.replace(/\./g, ""))
  queryParams.append("maturity", maturity)
  queryParams.append("interestRate", interestRate.replace("%", "").replace(",", "."))

  const detailsHref = `/bank-details/${bankNameForUrl}?${queryParams.toString()}`

  const cardBgClass = cardVariant === "green" ? "bg-[#E6F7F0]" : "bg-white"
  const buttonBgClass = cardVariant === "green" ? "bg-[#00BBA7] hover:bg-[#00A090]" : "bg-[#FF7A00] hover:bg-[#E66F00]"

  if (type === "short-term") {
    return (
      <Card className={`p-6 rounded-xl shadow-md flex flex-col justify-between h-full ${cardBgClass}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href={detailsHref} prefetch={false}>
              <div
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 logo-container"
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
            <div className="grid grid-cols-5 gap-x-12 text-sm items-end">
              <div>
                <div className="text-gray-700">Kredi</div>
                <div className="text-gray-800 font-bold">{loanAmount} TL</div>
              </div>
              <div>
                <div className="text-gray-700">Faiz Oranı</div>
                <div className="text-gray-800 font-bold">{interestRate}</div>
              </div>
              <div>
                <div className="text-gray-700">Vade</div>
                <div className="text-gray-800 font-bold">{maturity} Ay</div>
              </div>
              <div>
                <div className="text-gray-700">Aylık Ödeme</div>
                <div className="text-gray-800 font-bold">{monthlyPayment} TL</div>
              </div>
              <div>
                <div className="text-gray-700">Toplam Ödeme</div>
                <div className="text-gray-800 font-bold">{totalPayment} TL</div>
              </div>
            </div>
          </div>
          {bankUrl ? (
            <a href={bankUrl} target="_blank" rel="noopener noreferrer">
              <Button className={`rounded-full font-normal px-6 py-2 w-32 ${buttonBgClass} text-white`}>
                Hemen Başvur
              </Button>
            </a>
          ) : (
            <Button className={`rounded-full font-normal px-6 py-2 w-32 ${buttonBgClass} text-white`}>
              Hemen Başvur
            </Button>
          )}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">{/* Bu kısım yeni görselde olmadığı için kaldırıldı */}</div>
          <Link href={detailsHref} prefetch={false}>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal px-6 py-2 w-32"
            >
              Kredi Detayları
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  // Yeni layout for 'interest' type when displayMode is 'homepage'
  if (type === "interest" && displayMode === "homepage") {
    return (
      <Card className={`p-6 rounded-xl shadow-md flex flex-col ${cardBgClass}`}>
        <div className="flex items-center justify-between mb-4">
          <Link href={detailsHref} prefetch={false}>
            <div
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 min-h-[50px] flex items-center justify-center logo-container"
              style={{ backgroundColor: "#ffffff !important", background: "#ffffff" }}
            >
              <div
                className="bg-white p-1 rounded flex items-center justify-center"
                style={{ backgroundColor: "#ffffff", background: "#ffffff" }}
              >
                <Image
                  src={bankLogoSrc || "/placeholder.svg"}
                  alt={`${bankName} logo`}
                  width={120}
                  height={40}
                  className="object-contain cursor-pointer max-h-[40px]"
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
            <span>{rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
          <div className="font-medium text-gray-700">Kredi</div>
          <div className="text-right text-gray-800 font-bold">{loanAmount} TL</div>

          <div className="font-medium text-gray-700">Vade</div>
          <div className="text-right text-gray-800 font-bold">{maturity} Ay</div>

          {monthlyPayment && (
            <>
              <div className="font-medium text-gray-700">Aylık Ödeme</div>
              <div className="text-right text-gray-800 font-bold">{monthlyPayment} TL</div>
            </>
          )}
        </div>

        {commentCount && (
          <p className="text-xs text-gray-500 mb-4">
            <span className="font-semibold">
              {commentCount} kişi {bankName} hakkında yorum yazdı
            </span>
          </p>
        )}
        {isSponsored && (
          <div className="text-xs text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Sponsor Banka</span>
          </div>
        )}

        <div className="flex gap-2 mt-auto">
          <Link href={detailsHref} prefetch={false} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal"
            >
              Kredi Detayları
            </Button>
          </Link>
          {bankUrl ? (
            <a href={bankUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white rounded-full font-normal">
                Hemen Başvur
              </Button>
            </a>
          ) : (
            <Button className="flex-1 bg-[#FF7A00] hover:bg-[#E66F00] text-white rounded-full font-normal">
              Hemen Başvur
            </Button>
          )}
        </div>
      </Card>
    )
  }

  // Default layout for 'interest' type (previous detailed layout)
  return (
    <Card className={`p-6 rounded-xl shadow-md flex flex-col ${cardBgClass}`}>
      <div className="flex items-center justify-between mb-4">
        <Link href={detailsHref} prefetch={false}>
          <div
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 logo-container"
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
        {bankUrl ? (
          <a href={bankUrl} target="_blank" rel="noopener noreferrer">
            <Button className={`rounded-full font-normal px-6 py-2 ${buttonBgClass} text-white`}>Hemen Başvur</Button>
          </a>
        ) : (
          <Button className={`rounded-full font-normal px-6 py-2 ${buttonBgClass} text-white`}>Hemen Başvur</Button>
        )}
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

      {features.length > 0 && (
        <div className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          <span className="font-semibold">
            {commentCount} kişi {bankName} hakkında yorum yazdı
          </span>
        </p>
        <Link href={detailsHref} prefetch={false}>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal px-4 py-2 text-sm"
          >
            Kredi Detayları
          </Button>
        </Link>
      </div>
    </Card>
  )
}
