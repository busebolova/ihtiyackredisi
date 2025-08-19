"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCardOfferCard } from "@/components/credit-card-offer-card"
import { CreditCardSearchForm } from "@/components/credit-card-search-form"
import { ChevronDown, ChevronUp, CreditCard, TrendingUp, Shield, AlertTriangle } from "lucide-react"

const allCreditCards = [
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    cardName: "Axess",
    bankName: "Akbank",
    features: [
      "Yeni müşterilere özel 3 ay vadeli, faizsiz 25.000 TL'ye varan taksitli avans",
      "Her 3.000 TL ve üzeri harcamaya 800 TL, toplam 8.000 TL'ye varan Chip-para",
    ],
    annualFee: "909,5 TL (İlk yıl ücretsiz)",
    welcomeBonus: "Faizsiz 25.000 TL",
    monthlyEarning: "8.000 Chip-para",
    promotion: "Yeni müşterilere özel",
    slug: "akbank-axess",
    bankUrl: "http://www.akbank.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/getir-finans.png",
    cardName: "Kredi Kartı",
    bankName: "Getirfinans",
    features: ["Bitaksi'de %3 getirpara", "Starbucks harcamana %10 getirpara"],
    annualFee: "Ücretsiz",
    welcomeBonus: "-",
    monthlyEarning: "1.000 TL",
    promotion: "Getirpara kazanım fırsatı",
    slug: "getirfinans-kredi-karti",
    bankUrl: "https://www.getir.com/finans/",
  },
  {
    bankLogoSrc: "/bank-logos/enpara.webp",
    cardName: "Encard",
    bankName: "Enpara.com",
    features: ["Ücretsiz EFT/FAST/havale ve fatura ödeme işlemleri", "Aidatsız banka kartı"],
    annualFee: "Ücretsiz",
    welcomeBonus: "-",
    monthlyEarning: "-",
    promotion: "Tamamen ücretsiz",
    slug: "enpara-encard",
    bankUrl: "https://www.enpara.com/",
  },
  {
    bankLogoSrc: "/bank-logos/yapikredi-new.webp",
    cardName: "Worldcard",
    bankName: "Yapı Kredi Bankası",
    features: [
      "Casper'da 6.000 TL'ye varan Worldpuan",
      "TatilBudur'dan yapılacak rezervasyonlarda 7.500 TL'ye varan Worldpuan",
    ],
    annualFee: "846,5 TL",
    welcomeBonus: "-",
    monthlyEarning: "-",
    promotion: "Worldpuan kazanım fırsatı",
    slug: "yapi-kredi-worldcard",
    bankUrl: "https://www.yapikredi.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    cardName: "Bonus Card",
    bankName: "Garanti BBVA",
    features: [
      "Yeni müşterilere özel 3 ay vadeli, faizsiz 25.000 TL'ye varan nakit avans fırsatı",
      "Ayda 15.000 TL'ye Varan Bonus",
    ],
    annualFee: "841,5 TL",
    welcomeBonus: "Faizsiz 25.000 TL",
    monthlyEarning: "15.000 TL",
    promotion: "Yeni müşterilere özel",
    slug: "garanti-bonus-card",
    bankUrl: "https://www.garantibbva.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    cardName: "Wings",
    bankName: "Akbank",
    features: [
      "Yeni müşterilere özel %0 faizli 25.000 TL'ye varan taksitli avans fırsatı",
      "12.000 TL'ye varan uçak bileti değerinde 600.000 Mil Puan fırsatı",
    ],
    annualFee: "1.114,5 TL (İlk yıl ücretsiz)",
    welcomeBonus: "Faizsiz 25.000 TL",
    monthlyEarning: "600.000 Mil Puan",
    promotion: "Yeni müşterilere özel",
    slug: "akbank-wings",
    bankUrl: "http://www.akbank.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/enpara.webp",
    cardName: "Kredi Kartı",
    bankName: "Enpara.com",
    features: ["Ömür boyu aidatsız kredi kartı", "Aidat alan değil, 750 TL aidat veren kredi kartı"],
    annualFee: "Ücretsiz",
    welcomeBonus: "500 TL",
    monthlyEarning: "-",
    promotion: "Ömür boyu ücretsiz",
    slug: "enpara-kredi-karti",
    bankUrl: "https://www.enpara.com/",
  },
  {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    cardName: "Bonus Gold",
    bankName: "Garanti BBVA",
    features: ["Ayda 15.000 TL'ye varan bonus kazanın", "Kazanılan her 1 bonus 1 TL değerinde"],
    annualFee: "979,5 TL",
    welcomeBonus: "Faizsiz 25.000 TL",
    monthlyEarning: "15.000 TL Bonus",
    promotion: "Bonus kazanım programı",
    slug: "garanti-bonus-gold",
    bankUrl: "https://www.garantibbva.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/yapikredi-new.webp",
    cardName: "World Gold",
    bankName: "Yapı Kredi Bankası",
    features: ["Yurt dışı online alışverişlerde 250 TL Worldpuan", "Hepsiburada'da peşin fiyatına 3 taksit"],
    annualFee: "961,5 TL",
    welcomeBonus: "-",
    monthlyEarning: "-",
    promotion: "Worldpuan avantajları",
    slug: "yapi-kredi-world-gold",
    bankUrl: "https://www.yapikredi.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/yapikredi-new.webp",
    cardName: "World Platinum",
    bankName: "Yapıkredi",
    features: [
      "World Platinum ile seçkin otel ve restoranlarda %10 indirim ayrıcalığı",
      "Yurt dışı online alışverişlerde 250 TL Worldpuan",
    ],
    annualFee: "1.085,5 TL",
    welcomeBonus: "-",
    monthlyEarning: "-",
    promotion: "Platinum ayrıcalıkları",
    slug: "yapi-kredi-world-platinum",
    bankUrl: "https://www.yapikredi.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/albaraka.webp",
    cardName: "İhtiyaç Kart / Sağlam Kart",
    bankName: "Kuveyt Türk",
    features: [
      "İhtiyaç Kart ile 30.000 TL'ye kadar harcamaya vade farksız 9 taksit",
      "Sağlam Kart Troy ile 50.000 TL'ye kadar harcamaya vade farksız 5 taksit",
    ],
    annualFee: "Ücretsiz",
    welcomeBonus: "80.000 TL",
    monthlyEarning: "-",
    promotion: "Yeni müşterilere özel",
    slug: "kuveyt-turk-ihtiyac-kart",
    bankUrl: "http://www.kuveytturk.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    cardName: "Bonus Genç",
    bankName: "Garanti BBVA",
    features: [
      "Toplam 1.000 TL'ye varan bonus kazan",
      "Aidatsız bir kredi kartıdır, yıllık herhangi bir ücret ödemene gerek yoktur",
    ],
    annualFee: "Ücretsiz",
    welcomeBonus: "-",
    monthlyEarning: "-",
    promotion: "Gençlere özel",
    slug: "garanti-bonus-genc",
    bankUrl: "https://www.garantibbva.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    cardName: "Axess Öğrenci Kartı",
    bankName: "Akbank",
    features: ["İlk yıl kart ücreti yok", "Öğrenci Kartına Başvur 1.200 TL Chip-para"],
    annualFee: "207,5 TL (İlk yıl ücretsiz)",
    welcomeBonus: "1.200 TL",
    monthlyEarning: "-",
    promotion: "Öğrencilere özel",
    slug: "akbank-axess-ogrenci",
    bankUrl: "http://www.akbank.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    cardName: "Shop&Fly Platinum",
    bankName: "Garanti BBVA",
    features: ["10.000 TL harcamaya 50.000 mil kazan", "Yurtışı harcamalarınıza ekstra 175.000 mil ayrıcalığı"],
    annualFee: "1.632 TL",
    welcomeBonus: "Faizsiz 25.000 TL",
    monthlyEarning: "-",
    promotion: "Mil kazanım programı",
    slug: "garanti-shop-fly-platinum",
    bankUrl: "https://www.garantibbva.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/odeabank.png",
    cardName: "Ayrıcalıklı Kart",
    bankName: "Odea",
    features: [
      "Odea Ayrıcalıklar Dünyası Programı ile Türkiye'de ilk kez harcamalar yatırıma dönüşüyor",
      "Ayda 3.500 TL'ye varan yatırım fırsatı",
      "Programdan faydalanmak için Odea'da en az 500.000 TL varlık bulundurmanız gerekmektedir",
    ],
    annualFee: "Ücretsiz",
    welcomeBonus: "-",
    monthlyEarning: "3.500 TL",
    promotion: "3.500 TL'ye varan yatırım fırsatı",
    slug: "odea-ayricalikli-kart",
    bankUrl: "http://www.odeabank.com.tr",
  },
  {
    bankLogoSrc: "/bank-logos/odeabank.png",
    cardName: "Private Kart",
    bankName: "Odea",
    features: [
      "Odea Ayrıcalıklar Dünyası Programı ile Türkiye'de ilk kez harcamalar yatırıma dönüşüyor",
      "Ayda 5.000 TL'ye varan yatırım fırsatı",
      "Programdan faydalanmak için Odea'da en az 5.000.000 TL varlık bulundurmanız gerekmektedir",
    ],
    annualFee: "Ücretsiz",
    welcomeBonus: "-",
    monthlyEarning: "5.000 TL",
    promotion: "5.000 TL'ye varan yatırım fırsatı",
    slug: "odea-private-kart",
    bankUrl: "http://www.odeabank.com.tr",
  },
]

export function KrediKartiClientContent() {
  const [filteredCards, setFilteredCards] = useState(allCreditCards)
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const handleSearch = (filters: any) => {
    let filtered = allCreditCards

    if (filters.bankName && filters.bankName !== "all") {
      filtered = filtered.filter((card) => card.bankName.toLowerCase().includes(filters.bankName.toLowerCase()))
    }

    if (filters.cardType && filters.cardType !== "all") {
      // Kart türüne göre filtreleme mantığı eklenebilir
    }

    if (filters.annualFee && filters.annualFee !== "all") {
      const feeLimit = Number.parseInt(filters.annualFee)
      filtered = filtered.filter((card) => {
        if (card.annualFee.toLowerCase().includes("ücretsiz")) return feeLimit >= 0
        const cardFee = Number.parseInt(card.annualFee.replace(/[^\d]/g, ""))
        return cardFee <= feeLimit
      })
    }

    setFilteredCards(filtered)
  }

  return (
    <main className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline" prefetch={false}>
            ihtiyackredisi.com
          </Link>{" "}
          / <span className="text-[#FF7A00] font-medium">Kredi Kartı</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            En Uygun Kredi Kartı Tekliflerini Karşılaştırın
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Türkiye'nin önde gelen bankalarının kredi kartı tekliflerini karşılaştırın ve size en uygun kartı bulun.
            Yıllık aidat, hoş geldin bonusları ve aylık kazanç fırsatlarını tek sayfada görün.
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <CreditCardSearchForm onSearch={handleSearch} />
        </div>

        {/* Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Kredi Kartı Teklifleri ({filteredCards.length} sonuç)
          </h2>

          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card, index) => (
                <CreditCardOfferCard key={index} {...card} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Arama kriterlerinize uygun kredi kartı bulunamadı.</p>
              <p className="text-gray-500 mt-2">Lütfen filtreleri değiştirerek tekrar deneyin.</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kredi Kartı Seçerken Dikkat Edilmesi Gerekenler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Yıllık Aidat</h3>
              <p className="text-sm">
                Kredi kartınızın yıllık maliyetini belirleyen en önemli faktördür. İlk yıl ücretsiz olan kartlarda
                ikinci yıl aidatını kontrol edin.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Hoş Geldin Bonusları</h3>
              <p className="text-sm">
                Yeni müşterilere özel olarak sunulan bonusları ve yatırım fırsatlarını değerlendirin.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Aylık Kazançlar</h3>
              <p className="text-sm">Her ay kazanabileceğiniz puan veya yatırım fırsatlarını karşılaştırın.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Kampanyalar</h3>
              <p className="text-sm">
                Anlaşmalı iş yerlerindeki indirimler ve özel kampanyalar kartın değerini artırır.
              </p>
            </div>
          </div>
        </div>

        {/* Comprehensive Read More Section */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-[#FF7A00]" />
              Kredi Kartları Hakkında Detaylı Bilgi
            </h2>
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF7A00] text-white rounded-lg hover:bg-[#e66a00] transition-colors"
            >
              {showMoreInfo ? "Daha Az Gör" : "Daha Fazla Gör"}
              {showMoreInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showMoreInfo && (
            <div className="space-y-6 text-gray-700">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Kredi Kartı: Finansal Özgürlüğün Anahtarı mı, Yoksa Borç Kıskacı mı?
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  Kredi kartları, modern çağın belki de en ikircikli icatlarından biri. Bir yanda anında harcama gücü
                  sunan, acil ihtiyaçlarımızda imdadımıza yetişen bir kurtarıcı; diğer yanda yanlış kullanıldığında bizi
                  borç batağına sürükleyen bir tuzak. Peki bu küçük plastik parçasıyla kurduğumuz ilişki neden bu kadar
                  karmaşık?
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Türkiye'de Kredi Kartı Kullanımının Artışı
                </h4>
                <p className="text-green-700 leading-relaxed mb-3">
                  Türkiye'de kredi kartı kullanımı son 20 yılda beklenmedik derecede arttı. TCMB verilerine göre, 2003
                  yılında 16 milyon olan kredi kartı, 2023 itibarıyla 85 milyonu aştı. Bu artışın ardında yatan
                  nedenlerden biri, bankaların agresif pazarlama stratejileriyse, diğeri ise tüketicilerin "gelecekteki
                  geliri bugünden harcama" alışkanlığı.
                </p>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-green-800 font-medium">
                    💡 <strong>Önemli İstatistik:</strong> Bu kartların sadece %35'i düzenli olarak tam ödeme yapılarak
                    kullanılıyor. Geri kalanıysa asgari ödeme tuzağında debelenip duruyor.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                <h4 className="text-lg font-semibold text-orange-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Kredi Kartı Seçerken Dikkat Edilmesi Gerekenler
                </h4>
                <p className="text-orange-700 leading-relaxed mb-3">
                  Kredi kartı seçerken dikkat edilmesi gereken ilk şey, elbette faiz oranları. Ancak çoğu tüketici,
                  bankaların reklamlarda vurguladığı "puanlar, miler, cashback'ler" gibi süslü vaatlere kanıp asıl
                  önemli olan detayları gözden kaçırıyor.
                </p>
                <div className="bg-white p-4 rounded border border-orange-200">
                  <p className="text-orange-800">
                    <strong>Gerçek Örnek:</strong> Bir arkadaşım, "uçuş mili biriktiriyorum" diye yıllarca yüksek faizli
                    bir kart kullandı, ta ki basit bir hesap yapana kadar: Ödediği faizler, aldığı biletin değerinin
                    neredeyse iki katıydı!
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Ödeme Disiplini ve Faiz Masrafları</h4>
                <p className="text-purple-700 leading-relaxed mb-3">
                  Bir diğer kritik konu da ödeme disiplini. Kredi kartı borcunu tam ödeyenler için bu araç neredeyse
                  bedava kredi demek. 2022'de yapılan bir araştırma, düzenli tam ödeme yapanların ortalama 1.200 TL faiz
                  masrafından kurtulduğunu gösteriyor.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-100 p-4 rounded border border-green-300">
                    <p className="text-green-800 font-medium">✅ Tam Ödeme Yapanlar</p>
                    <p className="text-green-700 text-sm">Yılda ortalama 1.200 TL tasarruf</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded border border-red-300">
                    <p className="text-red-800 font-medium">❌ Asgari Ödeme Yapanlar</p>
                    <p className="text-red-700 text-sm">Yılda ortalama 4.800 TL fazla faiz</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Dijital Güvenlik ve Dolandırıcılık Riskleri
                </h4>
                <p className="text-red-700 leading-relaxed mb-3">
                  Dijital çağın getirdiği yeni risklere değinmeden olmaz. Özellikle online alışverişlerde kart
                  bilgilerinin çalınması vakaları son yıllarda ciddi artış gösterdi. Türkiye Bankalar Birliği verilerine
                  göre, 2022'de yaşanan 243.000 dolandırıcılık vakasının %67'si kredi kartıyla ilişkiliydi.
                </p>
                <div className="bg-white p-4 rounded border border-red-200">
                  <h5 className="font-semibold text-red-800 mb-2">Güvenlik Önlemleri:</h5>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Sanal kart kullanmak</li>
                    <li>• SMS onayı açık tutmak</li>
                    <li>• Şüpheli linklere tıklamamak</li>
                    <li>• Düzenli hesap kontrolü yapmak</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Doğru Kredi Kartı Nasıl Seçilir?</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Tüm bu karmaşada doğru kredi kartı nasıl seçilir? Cevap aslında basit: Kendi finansal davranışlarınızı
                  iyi analiz edin. Eğer ayda 5.000 TL'yi aşan harcama yapıyorsanız, puan sistemli bir kart mantıklı
                  olabilir. Ama ayda sadece 1.000-2.000 TL harcıyorsanız, düşük aidatlı basit bir kart sizin için daha
                  uygun.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="text-gray-800">
                    <strong>Sonuç:</strong> Kredi kartı akıllıca kullanıldığında güçlü bir finansal araçtır, ancak
                    disiplinsiz kullanım felakete davetiye çıkarabilir. Bu noktada ihtiyackredisi.com gibi karşılaştırma
                    platformlarının değeri ortaya çıkıyor - gerçek sayılarla konuşarak en uygun kartı bulmanızı
                    kolaylaştırıyor.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
