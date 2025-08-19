import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

interface PromotionOfferCardProps {
  bankLogoSrc: string
  bankName: string
  title: string
  description: string
  features: string[]
  promotionType: string // E.g., "Faizsiz Kredi", "Kredi Kartı Kampanyası", "Mevduat Promosyonu"
  slug: string // Detay sayfasına gitmek için slug
  bankUrl?: string
}

export function PromotionOfferCard({
  bankLogoSrc,
  bankName,
  title,
  description,
  features,
  promotionType,
  slug,
  bankUrl,
}: PromotionOfferCardProps) {
  return (
    <Card className="p-6 rounded-xl shadow-md flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href={`/promosyon/${slug}`} prefetch={false}>
            <Image
              src={bankLogoSrc || "/placeholder.svg"}
              alt={`${bankName} logo`}
              width={100}
              height={30}
              className="object-contain cursor-pointer bg-white p-2 rounded"
            />
          </Link>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{promotionType}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">{description}</p>

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
        <Link href={`/promosyon/${slug}`} prefetch={false} className="flex-1">
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-gray-100 rounded-full font-normal"
          >
            Detayları Gör
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
