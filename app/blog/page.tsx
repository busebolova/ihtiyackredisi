import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { BlogPostCard } from "@/components/blog-post-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Güncellenmiş, web sitesiyle ilgili blog yazıları
const blogPosts = [
  {
    title: "Kredi Puanınızı Nasıl Yükseltirsiniz?",
    category: "Finansal Yaşam",
    date: "12.09.2025",
    excerpt: "Kredi puanı, finansal sağlığınızın önemli bir göstergesidir. Bu yazımızda kredi puanınızı artırmak için atabileceğiniz adımları detaylıca inceliyoruz.",
    slug: "kredi-puani-yukseltme",
  },
  {
    title: "Online Kredi Başvurusu Rehberi: Adım Adım Süreç",
    category: "Kredi Başvurusu",
    date: "15.09.2025",
    excerpt: "Online kredi başvurusu yapmak hiç bu kadar kolay olmamıştı! Süreci adım adım anlatan rehberimizle hızlıca başvurunuzu tamamlayın.",
    slug: "online-kredi-basvurusu",
  },
  {
    title: "Faiz Oranları ve Kredi Maliyeti: Bilmeniz Gerekenler",
    category: "Kredi Bilgileri",
    date: "18.09.2025",
    excerpt: "Kredi çekerken faiz oranlarının toplam maliyeti nasıl etkilediğini merak mı ediyorsunuz? Detaylı açıklamalar ve örneklerle öğrenin.",
    slug: "faiz-oranlari-kredi-maliyeti",
  },
  {
    title: "İhtiyaç Kredisi Nedir ve Nasıl Alınır?",
    category: "Kredi Türleri",
    date: "20.09.2025",
    excerpt: "Acil nakit ihtiyaçlarınız için en uygun ihtiyaç kredisini nasıl bulacağınızı ve başvuru sürecini bu yazımızda keşfedin.",
    slug: "ihtiyac-kredisi-nedir",
  },
  {
    title: "Konut Kredisi Alırken Dikkat Edilmesi Gerekenler",
    category: "Konut Kredisi",
    date: "22.09.2025",
    excerpt: "Ev sahibi olma hayalinizi gerçekleştirirken konut kredisi sürecinde nelere dikkat etmeniz gerektiğini uzmanlarımızdan öğrenin.",
    slug: "konut-kredisi-ipuclari",
  },
  {
    title: "Taşıt Kredisi Hesaplama ve Başvuru İpuçları",
    category: "Taşıt Kredisi",
    date: "25.09.2025",
    excerpt: "Yeni bir araç almayı mı düşünüyorsunuz? Taşıt kredisi hesaplama yöntemleri ve başvuru ipuçları bu yazıda.",
    slug: "tasit-kredisi-hesaplama",
  },
  {
    title: "Kredi Kartı Seçimi: İhtiyaçlarınıza En Uygun Kartı Bulun",
    category: "Kredi Kartı",
    date: "28.09.2025",
    excerpt: "Piyasada birçok kredi kartı seçeneği varken, size en uygun olanı nasıl seçeceğinizi öğrenin.",
    slug: "kredi-karti-secimi",
  },
  {
    title: "Mevduat Faizi Nedir ve Nasıl Değerlendirilir?",
    category: "Yatırım",
    date: "01.10.2025",
    excerpt: "Birikimlerinizi değerlendirmek için mevduat faizlerini mi düşünüyorsunuz? Mevduat faizi hakkında bilmeniz gereken her şey.",
    slug: "mevduat-faizi-nedir",
  },
  {
    title: "Promosyon Kredileri: Avantajları ve Dezavantajları",
    category: "Kampanyalar",
    date: "03.10.2025",
    excerpt: "Bankaların sunduğu promosyon kredileri gerçekten avantajlı mı? Detaylı analizimizle karar verin.",
    slug: "promosyon-kredileri",
  },
]

export default function BlogPage() {
  const currentPage = 1;
  const totalPages = Math.ceil(blogPosts.length / 9); // Her sayfada 9 yazı olduğunu varsayalım

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline" prefetch={false}>ihtiyackredisi.com</Link> / <span className="text-[#FF7A00] font-medium">Blog</span>
          </div>

          {/* Main Content */}
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Blog</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(0, 9).map((post, index) => ( // İlk 9 yazıyı göster
                <BlogPostCard key={index} {...post} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button variant="ghost" size="icon" disabled={currentPage === 1}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {Array.from({ length: totalPages > 5 ? 5 : totalPages }).map((_, index) => {
                const pageNum = index + 1;
                const displayPage = pageNum === 5 && totalPages > 5 ? "..." : pageNum;
                const isCurrent = pageNum === currentPage;

                if (displayPage === "...") {
                  return (
                    <span key="ellipsis" className="px-3 py-1 text-gray-600">
                      ...
                    </span>
                  );
                }

                return (
                  <Button
                    key={pageNum}
                    variant={isCurrent ? "default" : "ghost"}
                    className={isCurrent ? "bg-[#FF7A00] hover:bg-[#E66F00] text-white" : "text-gray-700 hover:bg-gray-100"}
                    size="icon"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <Button variant="ghost" className="text-gray-700 hover:bg-gray-100" size="icon">
                  {totalPages}
                </Button>
              )}
              <Button variant="ghost" size="icon" disabled={currentPage === totalPages}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Ad Zone */}
          <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
            <div className="bg-gray-200 h-32 flex items-center justify-center rounded-lg">Ad Zone (1200 x 128 px)</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
