import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  rating: number
  comment: string
  author: string
}

export function TestimonialCard({ rating, comment, author }: TestimonialCardProps) {
  return (
    <Card className="p-6 rounded-xl shadow-md flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="text-sm text-gray-700 mb-4 line-clamp-4">{comment}</p>
      </div>
      <p className="text-sm font-semibold text-gray-800">- {author}</p>
    </Card>
  )
}
