import Image from "next/image"
import { Calendar, CheckCircle } from "lucide-react"

interface PromotionCardProps {
  id: number
  title: string
  description: string
  bankName: string
  bankLogoSrc: string
  discountRate: string
  validUntil: string
  category: string
  isActive: boolean
  features: string[]
  bankUrl?: string
}

export function PromotionCard({
  title,
  description,
  bankName,
  bankLogoSrc,
  discountRate,
  validUntil,
  category,
  isActive,
  features,
  bankUrl,
}: PromotionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image
              src={bankLogoSrc || "/placeholder.svg"}
              alt={`${bankName} logo`}
              width={40}
              height={40}
              className="rounded-lg bg-white p-1"
            />
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{bankName}</h3>
              <span className="text-xs text-gray-500">{category}</span>
            </div>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{discountRate}</div>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Kampanya Avantajları:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{validUntil}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className={`text-xs font-medium ${isActive ? "text-green-600" : "text-red-600"}`}>
              {isActive ? "Aktif" : "Süresi Doldu"}
            </span>
          </div>
        </div>

        {bankUrl ? (
          <a href={bankUrl} target="_blank" rel="noopener noreferrer">
            <button className="w-full mt-4 bg-[#FF7A00] hover:bg-[#e66a00] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Kampanyadan Yararlan
            </button>
          </a>
        ) : (
          <button className="w-full mt-4 bg-[#FF7A00] hover:bg-[#e66a00] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Kampanyadan Yararlan
          </button>
        )}
      </div>
    </div>
  )
}
