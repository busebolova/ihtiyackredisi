"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { CreditCardOfferCard } from "@/components/credit-card-offer-card" // İlgili kartları göstermek için

// Örnek kredi kartı detay verileri
const creditCardDetailsData = {
  "garanti-bonus-card": {
    bankLogoSrc: "/card-logos/bonus-card.png",
    cardName: "Garanti BBVA Bonus Card",
    description:
      "Garanti BBVA Bonus Card, geniş üye iş yeri ağı ve zengin bonus programı ile alışverişlerinizi kazanca dönüştürür. Peşin fiyatına taksit imkanları ve özel kampanyalarla finansal esneklik sunar.",
    features: [
      "Yaygın Bonus Programı",
      "Taksitli alışveriş imkanı",
      "Yurt içi ve yurt dışı kampanyalar",
      "Nakit avans çekim imkanı",
      "Ek kart avantajları",
    ],
    annualFee: "250 TL",
    interestRate: "%4.25",
    promotion: "İlk Yıl Aidat Yok",
    aboutCard: {
      title: "Garanti BBVA Bonus Card Hakkında",
      description1:
        "Bonus Card, Türkiye'nin en köklü ve yaygın kredi kartı programlarından biridir. Milyonlarca üye iş yerinde geçerli olup, her alışverişinizde bonus kazanma fırsatı sunar. Kazandığınız bonusları dilediğiniz gibi harcayabilir, anlaşmalı noktalarda indirimlerden faydalanabilirsiniz.",
      description2:
        "Garanti BBVA'nın güçlü altyapısı ve müşteri odaklı hizmet anlayışıyla Bonus Card, finansal ihtiyaçlarınıza pratik çözümler sunar. Online işlemler, mobil bankacılık ve 7/24 müşteri hizmetleri ile kartınızı kolayca yönetebilirsiniz.",
      website: "www.bonus.com.tr",
      phoneNumber: "444 0 333",
      supportEmail: "destek@bonus.com.tr",
      bankUrl: "https://www.bonus.com.tr/basvur",
    },
  },
  "yapi-kredi-worldcard": {
    bankLogoSrc: "/card-logos/world-card.png",
    cardName: "Yapı Kredi Worldcard",
    description:
      "Yapı Kredi Worldcard, Worldpuan kazandıran, taksitli alışveriş imkanı sunan ve seyahat avantajlarıyla öne çıkan bir kredi kartıdır. Geniş kampanya ağı ile harcamalarınızdan maksimum fayda sağlayın.",
    features: [
      "Worldpuan kazanma fırsatı",
      "Peşin fiyatına taksit imkanı",
      "Seyahat ve eğlence indirimleri",
      "Ekstre erteleme seçenekleri",
      "Yurt dışı harcamalarda avantajlar",
    ],
    annualFee: "220 TL",
    interestRate: "%4.25",
    promotion: "Hoş Geldin Kampanyası",
    aboutCard: {
      title: "Yapı Kredi Worldcard Hakkında",
      description1:
        "Worldcard, Yapı Kredi'nin amiral gemisi kredi kartı markasıdır. Yıllardır milyonlarca kullanıcının tercihi olan Worldcard, sunduğu Worldpuanlar ve geniş kampanya yelpazesiyle dikkat çeker. Alışverişlerinizde puan kazanırken, anlaşmalı markalarda özel indirimlerden faydalanabilirsiniz.",
      description2:
        "Yapı Kredi'nin dijital bankacılık çözümleriyle Worldcard'ınızı kolayca yönetebilir, harcamalarınızı takip edebilir ve kampanyalara katılabilirsiniz. Güvenli alışveriş deneyimi ve 7/24 destek hizmetleriyle Worldcard her zaman yanınızda.",
      website: "www.worldcard.com.tr",
      phoneNumber: "444 0 444",
      supportEmail: "destek@worldcard.com.tr",
      bankUrl: "https://www.worldcard.com.tr/basvur",
    },
  },
  "is-bankasi-maximum-card": {
    bankLogoSrc: "/card-logos/maximum-card.png",
    cardName: "İş Bankası Maximum Card",
    description:
      "İş Bankası Maximum Card, Maxipuan kazandıran, anlaşmalı iş yerlerinde indirimler sunan ve taksitli alışveriş imkanı sağlayan bir kredi kartıdır. İş Bankası'nın köklü güvencesiyle finansal işlemlerinizi kolaylaştırın.",
    features: [
      "Maxipuan kazanma",
      "Anlaşmalı iş yerlerinde indirimler",
      "Taksitli alışveriş",
      "Nakit avans ve taksitli nakit avans",
      "Ek kart avantajları",
    ],
    annualFee: "200 TL",
    interestRate: "%4.25",
    promotion: "Yeni Müşterilere Özel",
    aboutCard: {
      title: "İş Bankası Maximum Card Hakkında",
      description1:
        "Maximum Card, Türkiye İş Bankası'nın en popüler kredi kartlarından biridir. Maxipuan programı sayesinde yaptığınız harcamalardan puan kazanabilir, bu puanları anlaşmalı iş yerlerinde veya Maximum üyesi bankaların POS cihazlarında kullanabilirsiniz.",
      description2:
        "İş Bankası'nın geniş şube ve ATM ağı ile Maximum Card'ınızla her an her yerde işlem yapabilirsiniz. Mobil bankacılık uygulaması ve internet şubesi üzerinden kartınızı kolayca yönetebilir, güncel kampanyaları takip edebilirsiniz.",
      website: "www.maximum.com.tr",
      phoneNumber: "0850 724 0 724",
      supportEmail: "destek@maximum.com.tr",
      bankUrl: "https://www.maximum.com.tr/basvur",
    },
  },
  "qnb-finansbank-cardfinans": {
    bankLogoSrc: "/card-logos/cardfinans.png",
    cardName: "QNB Finansbank CardFinans",
    description:
      "QNB Finansbank CardFinans, ParaPuan kazandıran, avantajlı taksit seçenekleri sunan ve Finansbank ATM'lerinden ücretsiz nakit avans imkanı sağlayan bir kredi kartıdır. Finansbank'ın yenilikçi çözümleriyle finansal özgürlüğünüzü artırın.",
    features: [
      "ParaPuan kazanma",
      "Avantajlı taksit seçenekleri",
      "Finansbank ATM'lerinden ücretsiz nakit avans",
      "Ekstre erteleme ve taksitlendirme",
      "Yurt dışı harcamalarda avantajlar",
    ],
    annualFee: "230 TL",
    interestRate: "%4.25",
    promotion: "İlk 3 Ay Faizsiz Taksit",
    aboutCard: {
      title: "QNB Finansbank CardFinans Hakkında",
      description1:
        "CardFinans, QNB Finansbank'ın sunduğu, ParaPuan kazandıran ve geniş kampanya ağına sahip bir kredi kartıdır. Yaptığınız alışverişlerden ParaPuan kazanabilir, bu puanları anlaşmalı iş yerlerinde harcayabilir veya nakit olarak kullanabilirsiniz.",
      description2:
        "QNB Finansbank'ın dijital kanalları üzerinden CardFinans'ınızı kolayca yönetebilir, harcamalarınızı takip edebilir ve size özel kampanyalardan faydalanabilirsiniz. Güvenli ve hızlı işlem imkanlarıyla CardFinans, finansal hayatınızı kolaylaştırır.",
      website: "www.cardfinans.com.tr",
      phoneNumber: "0850 222 0 900",
      supportEmail: "destek@cardfinans.com.tr",
      bankUrl: "https://www.cardfinans.com.tr/basvur",
    },
  },
  "akbank-axess-card": {
    bankLogoSrc: "/card-logos/axess-card.png",
    cardName: "Akbank Axess Card",
    description:
      "Akbank Axess Card, Chip-para kazandıran, ekstre erteleme imkanı sunan ve Akbank kampanyalarına özel katılım sağlayan bir kredi kartıdır. Akbank'ın dinamik yapısıyla finansal işlemlerinizi hızlandırın.",
    features: [
      "Chip-para kazanma",
      "Ekstre erteleme imkanı",
      "Akbank kampanyalarına özel katılım",
      "Taksitli nakit avans",
      "Yurt dışı harcamalarda avantajlar",
    ],
    annualFee: "240 TL",
    interestRate: "%4.25",
    promotion: "Hoş Geldin Chip-para",
    aboutCard: {
      title: "Akbank Axess Card Hakkında",
      description1:
        "Axess Card, Akbank'ın en popüler kredi kartlarından biridir. Chip-para programı sayesinde yaptığınız harcamalardan chip-para kazanabilir, bu chip-paraları anlaşmalı iş yerlerinde veya Akbank POS cihazlarında kullanabilirsiniz.",
      description2:
        "Akbank'ın mobil uygulaması ve internet şubesi üzerinden Axess Card'ınızı kolayca yönetebilir, harcamalarınızı takip edebilir ve size özel kampanyalardan faydalanabilirsiniz. Güvenli ve hızlı işlem imkanlarıyla Axess Card, finansal hayatınızı kolaylaştırır.",
      website: "www.axess.com.tr",
      phoneNumber: "444 25 25",
      supportEmail: "destek@axess.com.tr",
      bankUrl: "https://www.axess.com.tr/basvur",
    },
  },
  "ziraat-bankasi-bankkart": {
    bankLogoSrc: "/placeholder.svg?height=30&width=100",
    cardName: "Ziraat Bankası Bankkart",
    description:
      "Ziraat Bankası Bankkart, hem banka kartı hem de kredi kartı özelliklerini bir arada sunan, Bankkart Lira kazandıran ve tarım ile esnaf destekleri sağlayan bir karttır. Ziraat Bankası'nın güvencesiyle finansal işlemlerinizi tek kartla yönetin.",
    features: [
      "Hem banka kartı hem kredi kartı",
      "Bankkart Lira kazanma",
      "Tarım ve esnaf destekleri",
      "Taksitli alışveriş imkanı",
      "Nakit avans çekim imkanı",
    ],
    annualFee: "180 TL",
    interestRate: "%4.25",
    promotion: "Tarım Kredilerinde Avantaj",
    aboutCard: {
      title: "Ziraat Bankası Bankkart Hakkında",
      description1:
        "Bankkart, Ziraat Bankası'nın hem banka kartı hem de kredi kartı özelliklerini bir arada sunan yenilikçi ürünüdür. Yaptığınız harcamalardan Bankkart Lira kazanabilir, bu liraları anlaşmalı iş yerlerinde veya Ziraat Bankası POS cihazlarında kullanabilirsiniz.",
      description2:
        "Ziraat Bankası'nın geniş şube ve ATM ağı ile Bankkart'ınızla her an her yerde işlem yapabilirsiniz. Mobil bankacılık uygulaması ve internet şubesi üzerinden kartınızı kolayca yönetebilir, güncel kampanyaları takip edebilirsiniz.",
      website: "www.bankkart.com.tr",
      phoneNumber: "444 00 00",
      supportEmail: "destek@bankkart.com.tr",
      bankUrl: "https://www.bankkart.com.tr/basvur",
    },
  },
}

// Tüm kredi kartları için örnek veri
const allCreditCards = Object.values(creditCardDetailsData)

// İlgili kredi kartları için örnek veri (mevcut kartlar arasından seçildi)
const relatedCreditCards = [
  {
    bankLogoSrc: "/card-logos/bonus-card.png",
    cardName: "Garanti BBVA Bonus Card",
    features: ["Yaygın Bonus Programı", "Taksitli alışveriş imkanı"],
    annualFee: "250 TL",
    interestRate: "%4.25",
    promotion: "İlk Yıl Aidat Yok",
    slug: "garanti-bonus-card",
  },
  {
    bankLogoSrc: "/card-logos/world-card.png",
    cardName: "Yapı Kredi Worldcard",
    features: ["Worldpuan kazanma fırsatı", "Peşin fiyatına taksit imkanı"],
    annualFee: "220 TL",
    interestRate: "%4.25",
    promotion: "Hoş Geldin Kampanyası",
    slug: "yapi-kredi-worldcard",
  },
  {
    bankLogoSrc: "/card-logos/maximum-card.png",
    cardName: "İş Bankası Maximum Card",
    features: ["Maxipuan kazanma", "Anlaşmalı iş yerlerinde indirimler"],
    annualFee: "200 TL",
    interestRate: "%4.25",
    promotion: "Yeni Müşterilere Özel",
    slug: "is-bankasi-maximum-card",
  },
]

export default function CreditCardDetailPage({ params }: { params: { slug: string } }) {
  const card = creditCardDetailsData[params.slug as keyof typeof creditCardDetailsData]

  if (!card) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="text-center text-gray-600">
            Aradığınız kredi kartı bulunamadı. Lütfen{" "}
            <Link href="/kredi-karti" className="text-[#FF7A00] hover:underline">
              kredi kartları sayfasına
            </Link>{" "}
            geri dönün.
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline" prefetch={false}>
              ihtiyackredisi.com
            </Link>{" "}
            /{" "}
            <Link href="/kredi-karti" className="hover:underline" prefetch={false}>
              Kredi Kartı
            </Link>{" "}
            / <span className="text-[#FF7A00] font-medium">{card.cardName}</span>
          </div>

          {/* Main Content Area: Card Details + About Card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Left Column: Card Details */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Image
                  src={card.bankLogoSrc || "/placeholder.svg"}
                  alt={`${card.cardName} logo`}
                  width={120}
                  height={40}
                  className="object-contain"
                />
                {card.promotion && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {card.promotion}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{card.cardName}</h1>
              <p className="text-gray-700 text-sm leading-relaxed mb-8">{card.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm mb-8">
                <div>
                  <div className="font-medium text-gray-700">Yıllık Aidat</div>
                  <div className="text-gray-800 font-bold text-lg">{card.annualFee}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Alışveriş Faiz Oranı</div>
                  <div className="text-gray-800 font-bold text-lg">{card.interestRate}</div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">Kart Özellikleri</h2>
              <div className="mb-8 space-y-2">
                {card.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white py-3 rounded-full text-lg font-normal"
                onClick={() => {
                  // Find the card data to get bankUrl
                  const cardData = allCreditCards.find((c) => c.slug === params.slug)
                  if (cardData?.aboutCard.bankUrl) {
                    window.open(cardData.aboutCard.bankUrl, "_blank")
                  }
                }}
              >
                Hemen Başvur
              </Button>
            </div>

            {/* Right Column: About Card & Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{card.aboutCard.title}</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{card.aboutCard.description1}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{card.aboutCard.description2}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Web Sitesi:</span>
                    <Link
                      href={`https://${card.aboutCard.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {card.aboutCard.website}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Telefon:</span>
                    <span className="text-gray-800 font-semibold">{card.aboutCard.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">E-Posta:</span>
                    <span className="text-gray-800 font-semibold">{card.aboutCard.supportEmail}</span>
                  </div>
                </div>
              </Card>

              {/* İlgili Kredi Kartları */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">İlgili Kredi Kartları</h2>
              {relatedCreditCards
                .filter((rc) => rc.slug !== params.slug)
                .map((relatedCard, index) => (
                  <CreditCardOfferCard key={index} {...relatedCard} />
                ))}
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
