"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

interface DepositOfferCardProps {
  bankLogoSrc: string
  bankName: string
  rating: number
  interestRate: string
  depositAmount: string
  maturity: string
  monthlyInterest: string
  totalReturn: string
  interestEarned: string
  commentCount: number
  features: string[]
  type?: string
}

export function DepositOfferCard({
  bankLogoSrc,
  bankName,
  rating,
  interestRate,
  depositAmount,
  maturity,
  monthlyInterest,
  totalReturn,
  interestEarned,
  commentCount,
  features,
}: DepositOfferCardProps) {
  return (
    <Card className="p-6 rounded-xl shadow-md flex flex-col bg-white">
      <div className="flex items-center justify-between mb-4">
        <Image
          src={bankLogoSrc || "/placeholder.svg"}
          alt={`${bankName} logo`}
          width={100}
          height={30}
          className="object-contain cursor-pointer bg-white p-2 rounded"
        />
        <Button className="rounded-full font-normal px-6 py-2 bg-[#FF7A00] hover:bg-[#E66F00] text-white">
          Mevduat Aç
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-y-2 text-sm mb-4">
        <div>
          <div className="text-gray-700">Faiz Oranı</div>
          <div className="text-gray-800 font-bold text-lg">{interestRate}</div>
        </div>
        <div>
          <div className="text-gray-700">Aylık Faiz</div>
          <div className="text-gray-800 font-bold text-lg">{monthlyInterest} ₺</div>
        </div>
        <div>
          <div className="text-gray-700">Toplam Getiri</div>
          <div className="text-gray-800 font-bold text-lg">{totalReturn} ₺</div>
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
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal px-4 py-2 text-sm"
        >
          Mevduat Detayları
        </Button>
      </div>
    </Card>
  )
}
