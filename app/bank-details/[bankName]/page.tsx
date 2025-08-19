"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { BankDetailsPageClientContent } from "./bank-details-client-content"

// Örnek veri - Normalde bu veriler bir API'den çekilir
const defaultRelatedOffers = [
  {
    bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
    bankName: "QNB Finansbank",
    rating: 4.6,
    loanAmount: "50.000",
    maturity: "3",
    monthlyPayment: "2.133,33",
  },
  {
    bankLogoSrc: "/bank-logos/ziraat.webp",
    bankName: "Ziraat Bankası",
    rating: 4.5,
    loanAmount: "50.000",
    maturity: "3",
    monthlyPayment: "2.133,33",
  },
  {
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    bankName: "Türkiye İş Bankası",
    rating: 4.6,
    loanAmount: "50.000",
    maturity: "3",
    monthlyPayment: "2.133,33",
  },
]

const bankDetailsData = {
  "türkiye-iş-bankası": {
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    bankName: "Türkiye İş Bankası",
    loanAmount: 50000,
    maturity: 6,
    interestRate: 0.0349,
    loanAllocationFeeRate: 0.005,
    description:
      "Mushrooms olives NY cheese marinara rib tossed and personal pepperoni. Deep banana sauce onions ranch. Pineapple NY bell red spinach personal broccoli Aussie olives pizza. Pork mozzarella pepperoni lasagna spinach thin. Lot ricotta burnt cheese lot lovers bacon pan mozzarella. Sautéed lovers ipsum Hawaiian chicken beef mouth pizza. Cheese mouth broccoli black pesto pork pork. Style spinach and mushrooms white lot bacon beef.",
    relatedOffers: defaultRelatedOffers,
    // Yeni eklenen genel puanlama bilgileri
    overallRating: 4.8,
    loanSuccessRating: 4.1,
    communicationEaseRating: 2.9,
    securityRating: 1.0,
    comments: [
      {
        id: 1,
        author: "Ayşe Yılmaz",
        anonymizedAuthor: "A*** Y***", // Anonimleştirilmiş isim
        rating: 5, // Genel yorum puanı
        date: "15.09.2025", // Updated from 15.07.2024
        comment:
          "Pepperoni tomatoes black mozzarella chicken lasagna meat. Ipsum style mozzarella Hawaiian pan pineapple mozzarella olives. Broccoli ipsum tomato cheese Aussie ipsum green pesto. Cheese mouth broccoli black pesto pork pork. Style spinach and mushrooms white lot bacon beef.",
        loanStatusRating: 4, // Kredi Verme Durumu
        communicationRating: 3, // İletişim
        securityRating: 1, // Güvenlik
      },
      {
        id: 2,
        author: "Mehmet Can",
        anonymizedAuthor: "M*** C***",
        rating: 4,
        date: "10.09.2025", // Updated from 10.07.2024
        comment:
          "Style spinach and mushrooms white lot bacon beef. Pepperoni tomatoes black mozzarella chicken lasagna meat. Ipsum style mozzarella Hawaiian pan pineapple mozzarella olives. Broccoli ipsum tomato cheese Aussie ipsum green pesto.",
        loanStatusRating: 5,
        communicationRating: 5,
        securityRating: 2,
      },
      {
        id: 3,
        author: "Zeynep Demir",
        anonymizedAuthor: "Z*** D***",
        rating: 5,
        date: "01.09.2025", // Updated from 01.07.2024
        comment:
          "Pepperoni tomatoes black mozzarella chicken lasagna meat. Ipsum style mozzarella Hawaiian pan pineapple mozzarella olives. Broccoli ipsum tomato cheese Aussie ipsum green pesto. Cheese mouth broccoli black pesto pork pork. Style spinach and mushrooms white lot bacon beef.",
        loanStatusRating: 4,
        communicationRating: 3,
        securityRating: 1,
      },
    ],
    aboutTitle: "Türkiye İş Bankası, Ülkemizin İlk Özel Bankasıdır.",
    aboutDescription1:
      "Wing mushrooms roll anchovies sauce melted. Black NY stuffed Aussie extra stuffed party. Dolor meat buffalo Chicago banana. Burnt ipsum Philly white buffalo platter platter pineapple black ranch. Extra marinara broccoli banana buffalo platter fresh. Onions roll sautéed roll hand buffalo mozzarella large. Pesto large dolor bbq NY and ranch.",
    aboutDescription2:
      "Beef pork personal mouth sausage. Deep deep sautéed buffalo green. Onions large lovers banana Philly Philly banana platter buffalo. Pepperoni tossed mushrooms style ham dolor cheese crust. Pork sautéed meatball bacon rib pepperoni large lovers extra hand. Pizza pan black white banana bacon meatball garlic. Marinara marinara pan sautéed spinach ricotta sauce. Peppers mozzarella personal rib mushrooms green. Platter pizza pork string lot ranch. Bell crust pork pan burnt ipsum. Buffalo red tossed pizza bell red sauce pie large. Olives pesto large red platter lot ham black.",
    website: "www.isbankasi.com",
    phoneNumber: "850 999 12 65",
    supportEmail: "lorem@isbank.com",
  },
  "garanti-bbva": {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    bankName: "Garanti BBVA",
    loanAmount: 25000,
    maturity: 6,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "Garanti BBVA kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 4.5,
    loanSuccessRating: 3.8,
    communicationEaseRating: 4.2,
    securityRating: 3.5,
    comments: [
      {
        id: 1,
        author: "Burak Akın",
        anonymizedAuthor: "B*** A***",
        rating: 4,
        date: "20.08.2025", // Updated from 20.06.2024
        comment: "Garanti BBVA'nın sıfır faizli kampanyası harika oldu. Süreç sorunsuzdu.",
        loanStatusRating: 4,
        communicationRating: 4,
        securityRating: 3,
      },
    ],
    aboutTitle: "Garanti BBVA, Geleceğin Bankacılığı.",
    aboutDescription1:
      "Garanti BBVA, yenilikçi ürün ve hizmetleriyle müşterilerine değer katmayı hedefleyen lider bir bankadır. Dijitalleşmeye verdiği önemle sektörde öncü konumdadır.",
    aboutDescription2:
      "Müşteri odaklı yaklaşımıyla finansal ihtiyaçlara hızlı ve etkili çözümler sunar. Geniş şube ağı ve dijital kanallarıyla her zaman yanınızdadır.",
    website: "www.garantibbva.com.tr",
    phoneNumber: "444 0 333",
    supportEmail: "destek@garantibbva.com.tr",
  },
  akbank: {
    bankLogoSrc: "/bank-logos/akbank.png",
    bankName: "Akbank",
    loanAmount: 25000,
    maturity: 6,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "Akbank kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 4.6,
    loanSuccessRating: 4.0,
    communicationEaseRating: 3.9,
    securityRating: 4.1,
    comments: [
      {
        id: 1,
        author: "Cemil Yılmaz",
        anonymizedAuthor: "C*** Y***",
        rating: 5,
        date: "25.08.2025", // Updated from 18.06.2024
        comment: "Akbank'ın mobil uygulaması üzerinden çok hızlı başvurdum. Çok memnun kaldım.",
        loanStatusRating: 5,
        communicationRating: 4,
        securityRating: 5,
      },
    ],
    aboutTitle: "Akbank, Hayatın Her Anında Yanınızda.",
    aboutDescription1:
      "Akbank, köklü geçmişi ve güçlü finansal yapısıyla Türkiye'nin önde gelen bankalarından biridir. Bireysel ve kurumsal müşterilerine geniş bir yelpazede hizmet sunar.",
    aboutDescription2:
      "Teknolojiyi yakından takip ederek dijital bankacılıkta önemli adımlar atmış, müşterilerine kolay ve hızlı işlem yapma imkanı sağlamıştır.",
    website: "www.akbank.com",
    phoneNumber: "444 25 25",
    supportEmail: "info@akbank.com",
  },
  "qnb-finansbank": {
    bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
    bankName: "QNB Finansbank",
    loanAmount: 25000,
    maturity: 6,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "QNB Finansbank kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 4.3,
    loanSuccessRating: 3.5,
    communicationEaseRating: 3.8,
    securityRating: 3.0,
    comments: [
      {
        id: 1,
        author: "Deniz Kara",
        anonymizedAuthor: "D*** K***",
        rating: 4,
        date: "20.08.2025", // Updated from 12.06.2024
        comment: "QNB Finansbank'ın faizsiz kredi teklifi çok cazip. Başvuru biraz uzun sürdü ama değdi.",
        loanStatusRating: 4,
        communicationRating: 3,
        securityRating: 3,
      },
    ],
    aboutTitle: "QNB Finansbank, Finansın Öncüsü.",
    aboutDescription1:
      "QNB Finansbank, dinamik yapısı ve müşteri odaklı hizmet anlayışıyla finans sektöründe fark yaratmaktadır. Yenilikçi çözümleriyle müşterilerinin beklentilerini aşmayı hedefler.",
    aboutDescription2:
      "Geniş ürün yelpazesi ve uzman kadrosuyla bireysel ve ticari müşterilerine özel finansal danışmanlık hizmetleri sunar.",
    website: "www.qnbfinansbank.com",
    phoneNumber: "0850 222 0 900",
    supportEmail: "iletisim@qnbfinansbank.com",
  },
  albaraka: {
    bankLogoSrc: "/bank-logos/albaraka.webp",
    bankName: "Albaraka",
    loanAmount: 15000,
    maturity: 6,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "Albaraka kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 4.0,
    loanSuccessRating: 3.0,
    communicationEaseRating: 3.2,
    securityRating: 3.8,
    comments: [],
    aboutTitle: "Albaraka Türk, Katılım Bankacılığının Lideri.",
    aboutDescription1:
      "Albaraka Türk, faizsiz bankacılık prensipleriyle hizmet veren ilk katılım bankasıdır. Müşterilerine etik ve sürdürülebilir finansal çözümler sunar.",
    aboutDescription2:
      "Geniş ürün ve hizmet ağıyla bireysel ve kurumsal müşterilerinin finansal ihtiyaçlarını karşılar, toplumsal kalkınmaya katkıda bulunur.",
    website: "www.albarakaturk.com.tr",
    phoneNumber: "0850 222 5 666",
    supportEmail: "info@albarakaturk.com.tr",
  },
  "on-dijital-bank": {
    bankLogoSrc: "/bank-logos/on-dijital-bank.webp",
    bankName: "ON Dijital Bank",
    loanAmount: 15000,
    maturity: 3,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "ON Dijital Bank kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 4.2,
    loanSuccessRating: 4.5,
    communicationEaseRating: 4.0,
    securityRating: 4.0,
    comments: [],
    aboutTitle: "ON Dijital Bank, Yeni Nesil Bankacılık.",
    aboutDescription1:
      "ON Dijital Bank, tamamen dijital altyapısıyla hızlı ve kolay bankacılık deneyimi sunar. Şubesiz bankacılık anlayışıyla müşterilerine zaman kazandırır.",
    aboutDescription2:
      "Yenilikçi mobil uygulaması ve kullanıcı dostu arayüzüyle finansal işlemleri parmaklarınızın ucuna getirir.",
    website: "www.ondijitalbank.com",
    phoneNumber: "0850 222 0 000",
    supportEmail: "destek@ondijitalbank.com",
  },
  "enpara.com": {
    bankLogoSrc: "/bank-logos/enpara.webp",
    bankName: "Enpara.com",
    loanAmount: 10000,
    maturity: 3,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "Enpara.com kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 5.0,
    loanSuccessRating: 5.0,
    communicationEaseRating: 5.0,
    securityRating: 5.0,
    comments: [
      {
        id: 1,
        author: "Ebru Güneş",
        anonymizedAuthor: "E*** G***",
        rating: 5,
        date: "15.08.2025", // Updated from 05.06.2024
        comment: "Enpara.com'un müşteri deneyimi her zaman harika. Kredi başvurusu da çok kolaydı.",
        loanStatusRating: 5,
        communicationRating: 5,
        securityRating: 5,
      },
    ],
    aboutTitle: "Enpara.com, Dijital Bankacılığın Öncüsü.",
    aboutDescription1:
      "Enpara.com, QNB Finansbank'ın dijital bankacılık markasıdır. Şubesiz ve masrafsız bankacılık anlayışıyla müşterilerine avantajlı hizmetler sunar.",
    aboutDescription2:
      "Kullanıcı dostu arayüzü, hızlı işlemleri ve cazip faiz oranlarıyla dijital bankacılıkta lider konumdadır.",
    website: "www.enpara.com",
    phoneNumber: "0850 222 22 44",
    supportEmail: "info@enpara.com",
  },
  cepteteb: {
    bankLogoSrc: "/bank-logos/cepteteb.webp",
    bankName: "CEPTETEB",
    loanAmount: 25000,
    maturity: 6,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "CEPTETEB kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 4.1,
    loanSuccessRating: 3.7,
    communicationEaseRating: 3.9,
    securityRating: 3.5,
    comments: [],
    aboutTitle: "CEPTETEB, Cebinizdeki Banka.",
    aboutDescription1:
      "CEPTETEB, TEB'in dijital bankacılık platformudur. Mobil uygulama üzerinden tüm bankacılık işlemlerini kolayca yapma imkanı sunar.",
    aboutDescription2:
      "Hızlı ve pratik çözümleriyle müşterilerine zaman kazandırır, finansal ihtiyaçlarını anında karşılar.",
    website: "www.cepteteb.com.tr",
    phoneNumber: "0850 200 0 666",
    supportEmail: "destek@cepteteb.com.tr",
  },
  denizbank: {
    bankLogoSrc: "/bank-logos/denizbank.webp",
    bankName: "DenizBank",
    loanAmount: 25000,
    maturity: 6,
    interestRate: 0,
    loanAllocationFeeRate: 0,
    description: "DenizBank kredi detayları açıklaması.",
    relatedOffers: defaultRelatedOffers,
    overallRating: 4.0,
    loanSuccessRating: 3.6,
    communicationEaseRating: 3.8,
    securityRating: 3.4,
    comments: [],
    aboutTitle: "DenizBank, Hayata Denizden Bak.",
    aboutDescription1:
      "DenizBank, geniş hizmet ağı ve yenilikçi ürünleriyle müşterilerine kapsamlı finansal çözümler sunar. Bireysel ve kurumsal bankacılıkta güçlü bir konuma sahiptir.",
    aboutDescription2:
      "Tarım bankacılığı ve dijitalleşme alanındaki öncü çalışmalarıyla dikkat çeker, müşterilerine özel avantajlar sunar.",
    website: "www.denizbank.com",
    phoneNumber: "0850 222 0 800",
    supportEmail: "iletisim@denizbank.com",
  },
}

export default function BankDetailsPage({ params }: { params: { bankName: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header />
      <Suspense fallback={<div>Loading bank details...</div>}>
        <BankDetailsPageClientContent bankNameParam={params.bankName} />
      </Suspense>
      <Footer />
    </div>
  )
}
