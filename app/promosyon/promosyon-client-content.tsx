"use client"

import { PromotionCard } from "@/components/promotion-card"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const allPromotions = [
  {
    id: 1,
    title: "Garanti BBVA Yeni Müşteri Kampanyası",
    description: "İlk kredi başvurunuzda %0.5 faiz indirimi kazanın!",
    bankName: "Garanti BBVA",
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    discountRate: "%0.5",
    validUntil: "31 Aralık 2025",
    category: "Faiz İndirimi",
    isActive: true,
    bankUrl: "https://www.garantibbva.com.tr",
    features: ["Yeni müşterilere özel", "İlk 6 ay geçerli", "Minimum 50.000 TL kredi tutarı"],
  },
  {
    id: 2,
    title: "Akbank Dijital Kredi Avantajı",
    description: "Mobil uygulamadan başvuruda masraf ücreti yok!",
    bankName: "Akbank",
    bankLogoSrc: "/bank-logos/akbank.png",
    discountRate: "Masraf Yok",
    validUntil: "30 Kasım 2025",
    category: "Masraf İndirimi",
    isActive: true,
    bankUrl: "http://www.akbank.com.tr",
    features: ["Dijital başvuru avantajı", "Hızlı onay süreci", "Tüm kredi türlerinde geçerli"],
  },
  {
    id: 3,
    title: "QNB Finansbank Erken Ödeme Fırsatı",
    description: "Erken ödeme yapanlara %1 faiz iadesi!",
    bankName: "QNB Finansbank",
    bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
    discountRate: "%1 İade",
    validUntil: "15 Ekim 2025",
    category: "Erken Ödeme",
    isActive: true,
    bankUrl: "http://www.qnbfinansbank.com",
    features: ["Erken ödeme teşviki", "Faiz iadesi garantisi", "Tüm kredi türlerinde geçerli"],
  },
  {
    id: 4,
    title: "Ziraat Bankası Emekli Kampanyası",
    description: "Emekliler için özel faiz oranları ve avantajlar!",
    bankName: "T.C. Ziraat Bankası",
    bankLogoSrc: "/bank-logos/ziraat.webp",
    discountRate: "%0.75",
    validUntil: "31 Aralık 2025",
    category: "Emekli Avantajı",
    isActive: true,
    bankUrl: "http://www.ziraat.com.tr",
    features: ["Emeklilere özel", "Düşük faiz oranı", "Kolay başvuru süreci"],
  },
  {
    id: 5,
    title: "İş Bankası Maaş Müşterisi Kampanyası",
    description: "Maaşınızı İş Bankası'ndan alanlara özel indirim!",
    bankName: "Türkiye İş Bankası",
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    discountRate: "%0.6",
    validUntil: "30 Kasım 2025",
    category: "Maaş Müşterisi",
    isActive: true,
    bankUrl: "http://www.isbank.com.tr",
    features: ["Maaş müşterilerine özel", "Otomatik onay avantajı", "Yüksek kredi limiti"],
  },
  {
    id: 6,
    title: "Alternatifbank Genç Kampanyası",
    description: "18-30 yaş arası gençlere özel kredi kampanyası!",
    bankName: "Alternatifbank",
    bankLogoSrc: "/bank-logos/alternatifbank.webp",
    discountRate: "%0.8",
    validUntil: "31 Ekim 2025",
    category: "Genç Avantajı",
    isActive: true,
    bankUrl: "http://www.alternatifbank.com.tr",
    features: ["18-30 yaş arası", "Düşük faiz oranı", "Esnek ödeme seçenekleri"],
  },
]

const categories = [
  "Tümü",
  "Faiz İndirimi",
  "Masraf İndirimi",
  "Erken Ödeme",
  "Emekli Avantajı",
  "Maaş Müşterisi",
  "Genç Avantajı",
]

export function PromosyonPageClientContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [filteredPromotions, setFilteredPromotions] = useState(allPromotions)
  const [showMoreContent, setShowMoreContent] = useState(false)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === "Tümü") {
      setFilteredPromotions(allPromotions)
    } else {
      setFilteredPromotions(allPromotions.filter((promo) => promo.category === category))
    }
  }

  return (
    <main className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline" prefetch={false}>
            ihtiyackredisi.com
          </Link>{" "}
          / Promosyonlar
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Güncel Promosyonlar</h1>
          <p className="text-gray-600 text-lg">Bankaların sunduğu özel kampanya ve indirimlerden yararlanın!</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#FF7A00] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.length > 0 ? (
            filteredPromotions.map((promotion) => <PromotionCard key={promotion.id} {...promotion} />)
          ) : (
            <div className="col-span-full bg-white p-8 rounded-xl shadow-lg text-center text-gray-600">
              Seçtiğiniz kategoride aktif promosyon bulunamadı.
            </div>
          )}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Promosyonlu Kredi Fırsatları Hakkında</h2>
            <Button
              onClick={() => setShowMoreContent(!showMoreContent)}
              variant="outline"
              className="text-[#FF7A00] border-[#FF7A00] hover:bg-[#FF7A00] hover:text-white"
            >
              {showMoreContent ? "Daha Az Gör" : "Daha Fazla Gör"}
            </Button>
          </div>

          {showMoreContent && (
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">
                  Promosyonlu Kredi Fırsatları: Kazançlı Çıkmanın Yolları
                </h3>
                <p className="text-orange-700">
                  Kredi çekerken sadece faiz oranlarına bakıyorsanız, büyük resmi kaçırıyorsunuz olabilir. Çünkü
                  bankalar, müşterilerini cezbetmek için sık sık promosyon kampanyaları düzenliyor. Kimi zaman nakit
                  avansla, kimi zaman da hediye çekiyle… Peki bu promosyonlar gerçekten karlı mı, yoksa göz boyamaktan
                  mı ibaret? Gelin, bu sorunun cevabını birlikte arayalım.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Promosyonların Gerçek Değeri</h4>
                <p className="text-blue-700">
                  Öncelikle şunu söylemeliyim: Promosyonlu krediler, doğru zamanda ve doğru şartlarda
                  değerlendirildiğinde gerçekten avantaj sağlayabiliyor. Mesela geçen sene bir yakınım, yılbaşı
                  döneminde açılan kampanyadan faydalanarak çektiği ihtiyaç kredisinden %1 daha düşük faizle yararlandı.
                  Üstelik yanında bir de 500 TL'lik market çeki verilmişti. Tabii burada dikkat edilmesi gereken şey,
                  promosyonun sizi asıl kredi maliyetinden uzaklaştırmaması.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                <h4 className="text-lg font-semibold text-green-800 mb-3">Bankalar Neden Promosyon Yapıyor?</h4>
                <p className="text-green-700">
                  Bankaların rekabeti artıkça, müşteri çekmek için farklı yollar denemeleri kaçınılmaz. 2023'ün ilk
                  çeyreğinde yapılan bir araştırmaya göre, Türkiye'deki bankaların %65'i dönemsel promosyon kampanyaları
                  düzenliyor. Özellikle bayram öncesi veya yaz tatili dönemlerinde bu tür fırsatlar daha sık karşımıza
                  çıkıyor. Ama unutmayın, her parlayan şey altın değildir.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Karşılaştırma Platformlarının Önemi</h4>
                <p className="text-purple-700">
                  Bu noktada devreye kredi karşılaştırma siteleri giriyor. Mesela ihtiyackredisi.com, tam da bu
                  karmaşada size yol gösteren bir rehber gibi. Bankaların güncel promosyonlarını tek bir ekranda
                  görmenizi sağlıyor, üstelik faiz oranlarını ve ekstra masrafları da detaylıca karşılaştırma imkanı
                  sunuyor. Böylece sadece promosyona kanıp yüksek maliyetli bir krediye mahkum olmuyorsunuz.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                <h4 className="text-lg font-semibold text-red-800 mb-3">Dikkat Edilmesi Gereken Noktalar</h4>
                <p className="text-red-700">
                  Promosyonlu kredilerde nelere dikkat etmeli? Öncelikle, kampanyanın süresini kontrol edin. Bazı
                  bankalar, "ilk 100 müşteriye özel" gibi kısıtlamalar koyabiliyor. Ayrıca promosyonun geri çekilme
                  şartlarını da mutlaka okuyun. Mesela krediyi belirli bir süre erken kapatırsanız, verilen hediyeyi
                  iade etmek zorunda kalabilirsiniz.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Sonuç</h4>
                <p className="text-gray-700">
                  Son olarak şunu eklemek isterim: Promosyonlar, kredi maliyetini düşürmek için bir araç sadece. Asıl
                  odaklanmanız gereken, toplam geri ödeme miktarı. Çünkü 100 TL'lik bir hediye çeki için 1000 TL fazla
                  faiz ödüyorsanız, bu bir kazanç değil kayıptır. Bu yüzden, ihtiyackredisi.com gibi platformları
                  kullanarak tüm şartları yan yana koyup hesabınızı iyi yapın.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
