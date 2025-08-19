import Link from "next/link"
import { Card } from "@/components/ui/card"

interface BlogPostCardProps {
  title: string
  category: string
  date: string
  excerpt: string
  slug: string // Blog yazısının detay sayfasına gitmek için slug
}

export function BlogPostCard({ title, category, date, excerpt, slug }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} prefetch={false}>
      <Card className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium">{category}</span> {date}
          </div>
          <p className="text-sm text-gray-700 line-clamp-3">{excerpt}</p>
        </div>
      </Card>
    </Link>
  )
}
