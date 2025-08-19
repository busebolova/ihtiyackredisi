import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InfoCards } from "@/components/info-cards"
import { BankOfferSection } from "@/components/bank-offer-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

// Ana sayfa için banka tekliflerini getiren fonksiyon
async function getBankOffers() {
  // Güncel banka teklifleri - API'den çekilecek veriler
  return {
    // Faizli kredi teklifleri
    interestOffers: [
      {
        bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
        bankName: "QNB Finansbank",
        rating: 4.6,
        loanAmount: "50.000",
        maturity: "3",
        monthlyPayment: "2.133,33",
        interestRate: "%0", // Updated based on provided data
        totalPayment: "63.999,99",
        displayMode: "homepage",
        bankUrl: "http://www.qnbfinansbank.com",
      },
      {
        bankLogoSrc: "/bank-logos/ziraat.webp",
        bankName: "Ziraat Bankası",
        rating: 4.5,
        loanAmount: "50.000",
        maturity: "3",
        monthlyPayment: "2.133,33",
        interestRate: "%4.99", // Updated based on provided data
        totalPayment: "64.500,00",
        displayMode: "homepage",
        bankUrl: "http://www.ziraat.com.tr/",
      },
      {
        bankLogoSrc: "/bank-logos/is-bankasi.webp",
        bankName: "Türkiye İş Bankası",
        rating: 4.6,
        loanAmount: "50.000",
        maturity: "3",
        monthlyPayment: "2.133,33",
        interestRate: "%4.00", // Updated based on provided data
        totalPayment: "63.500,00",
        displayMode: "homepage",
        bankUrl: "http://www.isbank.com.tr",
      },
      {
        bankLogoSrc: "/bank-logos/garanti-bbva.webp",
        bankName: "Garanti BBVA",
        rating: 4.7,
        loanAmount: "75.000",
        maturity: "6",
        monthlyPayment: "3.500,00",
        interestRate: "%3.79", // Updated based on provided data
        totalPayment: "78.000,00",
        displayMode: "homepage",
        bankUrl: "https://www.garantibbva.com.tr",
      },
      {
        bankLogoSrc: "/bank-logos/akbank.png",
        bankName: "Akbank",
        rating: 4.4,
        loanAmount: "40.000",
        maturity: "12",
        monthlyPayment: "1.800,00",
        interestRate: "%3.68", // Updated based on provided data
        totalPayment: "43.200,00",
        displayMode: "homepage",
        bankUrl: "http://www.akbank.com.tr",
      },
    ],
    // Kısa vadeli avantajlı teklifler
    shortTermOffers: [
      {
        bankLogoSrc: "/bank-logos/garanti-bbva.webp",
        bankName: "Garanti BBVA",
        loanAmount: "25.000",
        maturity: "6",
        monthlyPayment: "4.166",
        interestRate: "%0.00",
        totalPayment: "25.000",
        bankUrl: "https://www.garantibbva.com.tr",
      },
      {
        bankLogoSrc: "/bank-logos/akbank.png",
        bankName: "Akbank",
        loanAmount: "25.000",
        maturity: "6",
        monthlyPayment: "4.166",
        interestRate: "%0.00",
        totalPayment: "25.000",
        bankUrl: "http://www.akbank.com.tr",
      },
      {
        bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
        bankName: "QNB Finansbank",
        loanAmount: "25.000",
        maturity: "6",
        monthlyPayment: "4.166",
        interestRate: "%0",
        totalPayment: "25.000",
        bankUrl: "http://www.qnbfinansbank.com",
      },
      {
        bankLogoSrc: "/bank-logos/albaraka.webp",
        bankName: "Albaraka",
        loanAmount: "15.000",
        maturity: "6",
        monthlyPayment: "2.500",
        interestRate: "%0",
        totalPayment: "15.000",
        bankUrl: "http://www.albarakaturk.com.tr",
      },
      {
        bankLogoSrc: "/bank-logos/on-dijital-bank.webp",
        bankName: "ON Dijital Bank",
        loanAmount: "15.000",
        maturity: "3",
        monthlyPayment: "5.000",
        interestRate: "%0",
        totalPayment: "15.000",
        cardVariant: "green",
        bankUrl: "https://on.com.tr/",
      },
      {
        bankLogoSrc: "/bank-logos/enpara.webp",
        bankName: "Enpara.com",
        loanAmount: "10.000",
        maturity: "3",
        monthlyPayment: "3.333",
        interestRate: "%0",
        totalPayment: "10.000",
        bankUrl: "https://www.enpara.com/",
      },
      // Yeni eklenen bankalar
      {
        bankLogoSrc: "/bank-logos/cepteteb.webp",
        bankName: "CEPTETEB",
        loanAmount: "25.000",
        maturity: "6",
        monthlyPayment: "4.166",
        interestRate: "%0",
        totalPayment: "25.000",
        bankUrl: "https://www.cepteteb.com.tr/",
      },
      {
        bankLogoSrc: "/bank-logos/denizbank.webp",
        bankName: "DenizBank",
        loanAmount: "25.000",
        maturity: "6",
        monthlyPayment: "4.166",
        interestRate: "%0",
        totalPayment: "25.000",
        bankUrl: "http://www.denizbank.com",
      },
      {
        bankLogoSrc: "/bank-logos/is-bankasi.webp", // Türkiye İş Bankası logosu zaten mevcut
        bankName: "Türkiye İş Bankası",
        loanAmount: "25.000",
        maturity: "3",
        monthlyPayment: "8.333",
        interestRate: "%0",
        totalPayment: "25.000",
        bankUrl: "http://www.isbank.com.tr",
      },
    ],
  }
}

// Ana sayfa bileşeni - Türkiye'nin en kapsamlı kredi karşılaştırma platformu
export default async function Home() {
  // Banka tekliflerini getir
  const { interestOffers, shortTermOffers } = await getBankOffers()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sayfa başlığı */}
      <Header />
      {/* Ana içerik alanı */}
      <main className="flex-1 pt-20">
        {/* Hero bölümü */}
        <HeroSection />
        {/* Bilgi kartları */}
        <InfoCards />
        {/* Faizli kredi teklifleri bölümü */}
        <BankOfferSection
          title="%0 Faizli Muhteşem Teklifler"
          description="Sadece platformumuza özel harika teklifler."
          type="interest"
          offers={interestOffers}
          viewAllLink="/ihtiyac-kredisi"
        />
        {/* Kısa vadeli teklifler bölümü */}
        <BankOfferSection
          title="Kısa Süreli Avantajlı Teklifler"
          description="Sadece platformumuza özel harika fırsatlar."
          type="short-term"
          offers={shortTermOffers}
          viewAllLink="/faizsiz-kredi"
        />
        {/* Müşteri yorumları */}
        <TestimonialSection />
        {/* Sık sorulan sorular */}
        <FAQSection />
      </main>
      {/* Sayfa alt bilgisi */}
      <Footer />
    </div>
  )
}
