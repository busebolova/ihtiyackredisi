import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Gift, TrendingUp } from "lucide-react"
import Link from "next/link"

interface CreditCardOfferCardProps {
  bankLogoSrc: string
  cardName: string
  bankName: string
  features: string[]
  annualFee: string
  welcomeBonus: string
  monthlyEarning: string
  promotion?: string
  slug: string
  bankUrl: string
}

export function CreditCardOfferCard({
  bankLogoSrc,
  cardName,
  bankName,
  features,
  annualFee,
  welcomeBonus,
  monthlyEarning,
  promotion,
  slug,
  bankUrl,
}: CreditCardOfferCardProps) {
  return (
    <Card className="p-6 rounded-xl shadow-md flex flex-col justify-between h-full bg-white hover:shadow-lg transition-shadow">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href={`/kredi-karti/${slug}`} prefetch={false}>
            <div className="bg-white p-2 rounded logo-container">
              <Image
                src={bankLogoSrc || "/placeholder.svg"}
                alt={`${cardName} logo`}
                width={100}
                height={30}
                className="object-contain cursor-pointer"
                style={{ backgroundColor: "#ffffff" }}
              />
            </div>
          </Link>
          {promotion && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{promotion}</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          {bankName} {cardName}
        </h3>

        <div className="grid grid-cols-1 gap-y-3 text-sm mb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Yıllık Aidat</span>
            <span className="text-right text-gray-800 font-bold">{annualFee}</span>
          </div>

          {welcomeBonus !== "-" && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700 flex items-center gap-1">
                <Gift className="w-4 h-4 text-orange-500" />
                Hoş Geldin Bonusu
              </span>
              <span className="text-right text-orange-600 font-bold">{welcomeBonus}</span>
            </div>
          )}

          {monthlyEarning !== "-" && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Aylık Kazanç
              </span>
              <span className="text-right text-green-600 font-bold">{monthlyEarning}</span>
            </div>
          )}
        </div>

        <div className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Link href={`/kredi-karti/${slug}`} prefetch={false} className="flex-1">
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal"
          >
            Detayları Gör
          </Button>
        </Link>
        <a href={bankUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white rounded-full font-normal">
            Hemen Başvur
          </Button>
        </a>
      </div>
    </Card>
  )
}
