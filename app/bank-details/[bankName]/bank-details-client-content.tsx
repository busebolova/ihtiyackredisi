"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Share2, Star, Check, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generatePaymentPlan } from "@/lib/loan-calculations"

interface BankDetails {
  bankName: string
  bankLogoSrc: string
  rating: number
  commentCount: number
  interestRate: string // Updated to be flexible for range
  loanAllocationFeeRate: number
  loanApplicationLink: string
  features: string[]
  contactInfo: {
    address: string
    phoneNumber: string
    supportEmail: string
  }
  loanTypes: {
    ihtiyac: {
      minAmount: number
      maxAmount: number
      minMaturity: number
      maxMaturity: number
      interestRate: string
      features: string[]
    }
    konut: {
      minAmount: number
      maxAmount: number
      minMaturity: number
      maxMaturity: number
      interestRate: string
      features: string[]
    }
    tasit: {
      minAmount: number
      maxAmount: number
      minMaturity: number
      maxMaturity: number
      interestRate: string
      features: string[]
    }
    faizsiz: {
      minAmount: number
      maxAmount: number
      minMaturity: number
      maxMaturity: number
      interestRate: string
      features: string[]
    }
  }
  generalInfo?: string
}

// Örnek banka detay verileri (normalde bir API'den gelir)
const bankDetailsData: BankDetails[] = [
  {
    bankName: "Akbank",
    bankLogoSrc: "/bank-logos/akbank.png",
    rating: 4.4,
    commentCount: 321,
    interestRate: "%3.68 - %4.28",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.akbank.com/tr-tr/bireysel/krediler/ihtiyac-kredileri",
    features: [
      "Mobil uygulama üzerinden kolay başvuru",
      "Esnek ödeme seçenekleri",
      "Kredi kartı ile taksitli nakit avans",
    ],
    contactInfo: {
      address: "Sabancı Center, 4. Levent, 34330 İstanbul",
      phoneNumber: "444 25 25",
      supportEmail: "musterihizmetleri@akbank.com",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 10000000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%3.68",
        features: ["3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!", "1 ay vadeli 30.000 TL'ye varan Ek Hesap!"],
      },
      konut: {
        minAmount: 100000,
        maxAmount: 5000000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.50",
        features: ["Düşük faiz oranları", "Uzun vade seçenekleri"],
      },
      tasit: {
        minAmount: 10000,
        maxAmount: 1000000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%2.80",
        features: ["Uygun faiz oranları", "Hızlı onay süreci"],
      },
      faizsiz: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "Garanti BBVA",
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    rating: 4.7,
    commentCount: 534,
    interestRate: "%3.79 - %5.19",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.garantibbva.com.tr/bireysel/krediler/ihtiyac-kredisi",
    features: [
      "28 milyon müşteri",
      "Dijital bankacılık öncüsü",
      "BBVA küresel ortaklığı",
      "Anında kredi onayı",
      "Yapay zeka destekli analiz",
    ],
    contactInfo: {
      address: "Levent, Nispetiye Cd No:2, 34330 Beşiktaş/İstanbul",
      phoneNumber: "444 0 333",
      supportEmail: "musterihizmetleri@garantibbva.com.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 450000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%3.79",
        features: ["5 dakikada onay", "Dijital başvuru", "Esnek ödeme planları"],
      },
      konut: {
        minAmount: 150000,
        maxAmount: 7000000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.60",
        features: ["3.8 trilyon TL aktif büyüklük", "Güçlü sermaye yapısı"],
      },
      tasit: {
        minAmount: 15000,
        maxAmount: 1500000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%2.90",
        features: ["Anında başvuru", "Rekabetçi faiz oranları"],
      },
      faizsiz: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
    },
    generalInfo: `Garanti Bankası, Türkiye'nin finansal tarihine adını altın harflerle yazdırmış bir kurum. 1946 yılında Ankara'da mütevazı bir şube ile başlayan yolculuk, bugün 28 milyon müşteriye ulaşan dev bir ekosisteme dönüştü. Öyle ki, ülkedeki her iki bankacılık müşterisinden biri Garanti BBVA'yı tercih ediyor.

Garanti Bankası'nın kredi portföyü, neredeyse her ihtiyaca hitap edecek şekilde tasarlanmış. İhtiyaç kredisinden konut kredisini, taşıt finansmanından KOBİ kredilerine kadar uzanan bu geniş yelpaze, müşterilere esnek çözümler sunuyor. 2025 verilerine göre, ihtiyaç kredilerinde %15.5 pazar payı ile özel bankalar arasında lider konumda.

Dijital bankacılıkta öncü olan Garanti BBVA, Türkiye'de internet ve mobil bankacılığı aynı anda sunan ilk finans kuruluşu. Bugün 17 milyondan fazla aktif mobil kullanıcısı var ve her 5 işlemden biri Garanti BBVA Mobil uygulaması üzerinden gerçekleşiyor.

Güçlü sermaye yapısı ve küresel iş birliği sayesinde 2025 yılı itibarıyla aktif büyüklüğü 3.8 trilyon TL'yi aşmış durumda. İspanyol devi BBVA ile stratejik ortaklığı sayesinde uluslararası piyasalarda da güçlü bir konuma sahip.`,
  },
  {
    bankName: "Türkiye İş Bankası",
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    rating: 4.6,
    commentCount: 789,
    interestRate: "%4.00 - %4.55",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.isbank.com.tr/bireysel/krediler/ihtiyac-kredisi",
    features: [
      "100 yıllık tecrübe",
      "85 bin çalışan",
      "16.4 milyon dijital müşteri",
      "3.7 trilyon TL aktif",
      "Anında kredi sistemi",
    ],
    contactInfo: {
      address: "İş Kuleleri 1, 34330 Levent, İstanbul",
      phoneNumber: "0850 724 0 724",
      supportEmail: "info@isbank.com.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 3000,
        maxAmount: 250000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%4.00",
        features: ["Anında kredi onayı", "3 ay ertelemeli taksitler", "Dijital başvuru"],
      },
      konut: {
        minAmount: 120000,
        maxAmount: 6000000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.70",
        features: ["280 milyar TL konut kredisi portföyü", "Esnek ödeme seçenekleri"],
      },
      tasit: {
        minAmount: 12000,
        maxAmount: 1200000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%3.00",
        features: ["Sıfır ve ikinci el araçlara kredi", "Düşük faiz"],
      },
      faizsiz: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
    },
    generalInfo: `Türkiye İş Bankası, bu toprakların ekonomik hafızasıdır. 26 Ağustos 1924'te, henüz yeni kurulmuş bir cumhuriyetin bankacılıkla imtihanı olarak doğduğunda, kimse bu kadar uzun soluklu olacağını tahmin edemezdi belki. Atatürk'ün, Kurtuluş Savaşı'ndan arta kalan 250 bin lirasını sermaye yapmasıyla başladı her şey.

Bugün, 100. yılına yaklaşırken, sadece bir banka değil, adeta Türkiye'nin ekonomik DNA'sının bir parçası haline geldi. 85 binin üzerinde çalışanı, 1.300'ü aşkın şubesi ve 16,4 milyon dijital müşterisiyle ülkenin finansal omurgasını oluşturuyor.

Kredi konusundaki performansı gerçekten dikkat çekici. Özellikle KOBİ'lere sağladığı destek, adeta Türk ekonomisinin can damarı. 2025'in ilk çeyreğinde KOBİ'lere açılan kredi hacmi 450 milyar TL'yi aşmış durumda. Bireysel kredilerde ise "Anında Kredi" ürünüyle 250 bin TL'ye kadar nakit ihtiyacınızı 3 ay ertelemeli taksitlerle karşılayabiliyorsunuz.

Dijital dönüşümde sınırları zorlayan İş Bankası, Global Finance'tan iki yıl üst üste "dünyanın en iyi mobil bankacılık uygulaması" ödülü alan İşCep ile 16,4 milyon kullanıcıya ulaşmış durumda. 3,7 trilyon TL aktif büyüklüğüyle Türkiye'nin en büyük özel bankası konumunda.`,
  },
  {
    bankName: "Yapı Kredi",
    bankLogoSrc: "/bank-logos/yapikredi.webp",
    rating: 4.3,
    commentCount: 450,
    interestRate: "%4.10", // Example rate, not in user's list, keep existing structure
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.yapikredi.com.tr/bireysel/ihtiyac-kredileri",
    features: ["Anında kredi başvuru imkanı", "Uygun faiz oranları", "SMS ile bilgilendirme"],
    contactInfo: {
      address: "Yapı Kredi Plaza, Levent, 34330 İstanbul",
      phoneNumber: "444 0 444",
      supportEmail: "iletisim@yapikredi.com.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 500000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%4.10",
        features: ["Anında kredi başvuru imkanı", "Uygun faiz oranları"],
      },
      konut: {
        minAmount: 100000,
        maxAmount: 4000000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.80",
        features: ["Uzun vade", "Esnek ödeme"],
      },
      tasit: {
        minAmount: 10000,
        maxAmount: 800000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%3.10",
        features: ["Hızlı değerlendirme", "Avantajlı oranlar"],
      },
      faizsiz: {
        minAmount: 1000,
        maxAmount: 25000,
        minMaturity: 6,
        maxMaturity: 36,
        interestRate: "%0",
        features: ["Özel kampanyalar"],
      },
    },
  },
  {
    bankName: "Ziraat Bankası",
    bankLogoSrc: "/bank-logos/ziraat.webp",
    rating: 4.5,
    commentCount: 234,
    interestRate: "%4.99",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.ziraatbank.com.tr/tr/bireysel/krediler/ihtiyac-kredisi",
    features: ["Uygun geri ödeme koşulları", "Kamu bankası güvencesi", "Çeşitli ihtiyaçlara yönelik çözümler"],
    contactInfo: {
      address: "Finans Merkezi, Barbaros Mahallesi, Şerifali Çiftliği Cd. No:3, 34746 Ataşehir/İstanbul",
      phoneNumber: "444 00 00",
      supportEmail: "destek@ziraatbank.com.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 1000000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%4.99",
        features: [
          "12 ay vadeli 100.000 TL'ye varan Taksitli Nakit Avans!",
          "4 ay vadeli 80.000 TL'ye varan Ek Hesap!",
        ],
      },
      konut: {
        minAmount: 80000,
        maxAmount: 3000000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.40",
        features: ["Düşük faiz oranları", "Uzun vade"],
      },
      tasit: {
        minAmount: 8000,
        maxAmount: 600000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%2.70",
        features: ["Sıfır ve ikinci el araçlara kredi", "Kolay başvuru"],
      },
      faizsiz: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "Halkbank",
    bankLogoSrc: "/bank-logos/halkbank.webp",
    rating: 4.2,
    commentCount: 180,
    interestRate: "%5.06",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.halkbank.com.tr/bireysel/krediler/ihtiyac-kredileri",
    features: ["Esnek ödeme planları", "Uygun faiz oranları", "Devlet destekli kredi seçenekleri"],
    contactInfo: {
      address: "Halkbank Kuleleri, Barbaros Mahallesi, Şerifali Çiftliği Cd. No:3, 34746 Ataşehir/İstanbul",
      phoneNumber: "444 0 400",
      supportEmail: "halkbank@hs01.kep.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 200000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%5.06",
        features: ["Esnek ödeme planları", "Uygun faiz oranları"],
      },
      konut: {
        minAmount: 90000,
        maxAmount: 3500000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.45",
        features: ["Düşük maliyetli konut kredisi", "Uzun vade"],
      },
      tasit: {
        minAmount: 9000,
        maxAmount: 700000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%2.75",
        features: ["Anında başvuru", "Sıfır ve ikinci el araç"],
      },
      faizsiz: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "QNB Finansbank",
    bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
    rating: 4.6,
    commentCount: 456,
    interestRate: "%0 - %3.94",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.qnbfinansbank.com/bireysel/ihtiyac-kredileri",
    features: ["Hızlı ve kolay başvuru", "Dijital kanallardan anında onay", "Esnek ödeme planları"],
    contactInfo: {
      address: "Büyükdere Cad. No:129, Esentepe, Şişli 34394 İstanbul",
      phoneNumber: "444 0 900",
      supportEmail: "musterihizmetleri@qnbfinansbank.com",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 400000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%0",
        features: ["9 ay vadeli 75.000 TL'ye varan Taksitli Nakit Avans!", "3 ay vadeli 60.000 TL'ye varan Ek Hesap!"],
      },
      konut: {
        minAmount: 110000,
        maxAmount: 4500000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.55",
        features: ["Uygun konut kredisi", "Esnek ödeme"],
      },
      tasit: {
        minAmount: 11000,
        maxAmount: 900000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%2.85",
        features: ["Kolay başvuru", "Rekabetçi oranlar"],
      },
      faizsiz: { minAmount: 1000, maxAmount: 10000, minMaturity: 3, maxMaturity: 36, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "Enpara.com",
    bankLogoSrc: "/bank-logos/enpara.webp",
    rating: 5.0,
    commentCount: 890,
    interestRate: "%3.64 - %4.14",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.qnbfinansbank.com/enpara-krediler",
    features: ["Şubesiz bankacılık deneyimi", "Düşük masraflı işlemler", "Hızlı müşteri hizmetleri"],
    contactInfo: {
      address: "Esentepe, Tekfen Tower, Büyükdere Cd. No:209, 34394 Şişli/İstanbul",
      phoneNumber: "0850 222 36 63",
      supportEmail: "cozum@enpara.com",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 500000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%3.64",
        features: ["3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!", "1 ay vadeli 30.000 TL'ye varan Ek Hesap!"],
      },
      konut: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      tasit: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      faizsiz: { minAmount: 1000, maxAmount: 10000, minMaturity: 3, maxMaturity: 36, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "Albaraka Türk",
    bankLogoSrc: "/bank-logos/albaraka.webp",
    rating: 4.0,
    commentCount: 678,
    interestRate: "%0 - %3.50",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.albarakaturk.com.tr/bireysel/finansmanlar/ihtiyac-finansmani",
    features: ["Katılım bankacılığı prensipleri", "Kişisel finansman çözümleri", "Uygun kar payı oranları"],
    contactInfo: {
      address: "Saray Mahallesi, Dr. Adnan Büyükdeniz Cad. No:6, 34768 Ümraniye/İstanbul",
      phoneNumber: "444 5 666",
      supportEmail: "albaraka@albarakaturk.com.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 250,
        maxAmount: 50000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%0",
        features: ["3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!", "1 ay vadeli 30.000 TL'ye varan Ek Hesap!"],
      },
      konut: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      tasit: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      faizsiz: { minAmount: 1000, maxAmount: 15000, minMaturity: 6, maxMaturity: 36, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "TEB",
    bankLogoSrc: "/bank-logos/teb.webp",
    rating: 4.3,
    commentCount: 1247,
    interestRate: "%3.39 - %4.15",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.teb.com.tr/bireysel-bankacilik/krediler/ihtiyac-kredisi",
    features: [
      "CEPTETEB dijital bankacılık kolaylığı",
      "930 bin aktif kullanıcı",
      "Diğer bankaların ATM'lerinden ayda 3 kez bedava para çekme",
      "7/24 müşteri hizmetleri",
      "Yapay zeka destekli chatbot",
    ],
    contactInfo: {
      address: "Tekfen Tower, Büyükdere Cad. No:209, 34394 Şişli/İstanbul",
      phoneNumber: "0850 200 0 666",
      supportEmail: "info@teb.com.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 500000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%3.39",
        features: [
          "CEPTETEB uygulaması ile kolay başvuru",
          "Esnek ödeme planları",
          "Pandemi döneminde KOBİ'lere özel destek",
        ],
      },
      konut: {
        minAmount: 50000,
        maxAmount: 2000000,
        minMaturity: 60,
        maxMaturity: 180,
        interestRate: "%2.85",
        features: ["Rekabetçi faiz oranları", "BNP Paribas güvencesi"],
      },
      tasit: {
        minAmount: 10000,
        maxAmount: 800000,
        minMaturity: 12,
        maxMaturity: 48,
        interestRate: "%3.20",
        features: ["Hızlı onay süreci", "Esnek ödeme seçenekleri"],
      },
      faizsiz: {
        minAmount: 1000,
        maxAmount: 25000,
        minMaturity: 6,
        maxMaturity: 36,
        interestRate: "%0",
        features: ["Özel kampanyalar"],
      },
    },
  },
  {
    bankName: "DenizBank",
    bankLogoSrc: "/bank-logos/denizbank.webp",
    rating: 4.0,
    commentCount: 101,
    interestRate: "%2.99",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.denizbank.com/bireysel/krediler/ihtiyac-kredisi",
    features: ["Uygun faiz oranları", "Çeşitli ödeme seçenekleri", "Esnek kredi limitleri"],
    contactInfo: {
      address: "DenizBank Genel Müdürlük, Büyükdere Cd. No:141, 34394 Esentepe/İstanbul",
      phoneNumber: "0850 222 0 800",
      supportEmail: "iletisim@denizbank.com",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 500000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%2.99",
        features: ["3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!", "1 ay vadeli 30.000 TL'ye varan Ek Hesap!"],
      },
      konut: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      tasit: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      faizsiz: { minAmount: 1000, maxAmount: 25000, minMaturity: 6, maxMaturity: 36, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "Fibabanka A.Ş.",
    bankLogoSrc: "/bank-logos/fibabanka.webp",
    rating: 4.5,
    commentCount: 300,
    interestRate: "%0 - %3.50",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.fibabanka.com.tr/bireysel/krediler/ihtiyac-kredisi",
    features: ["Mobil uygulama", "Esnek ödeme seçenekleri", "Faizsiz kredi"],
    contactInfo: {
      address: "Fibabanka Plaza, Levent, 34330 İstanbul",
      phoneNumber: "444 0 555",
      supportEmail: "info@fibabanka.com.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 500000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%0",
        features: ["3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!", "1 ay vadeli 30.000 TL'ye varan Ek Hesap!"],
      },
      konut: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      tasit: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      faizsiz: { minAmount: 1000, maxAmount: 15000, minMaturity: 6, maxMaturity: 36, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "ING Bank",
    bankLogoSrc: "/bank-logos/ing.webp",
    rating: 4.0, // Default rating
    commentCount: 534, // Example comment count
    interestRate: "%0.99 - %3.99",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.ing.com.tr/tr/bireysel/krediler/ihtiyac-kredisi",
    features: ["Avantajlı faiz oranları", "Esnek ödeme planları", "İhtiyaçlarınıza özel çözümler"],
    contactInfo: {
      address: "Maslak Mah. Eski Büyükdere Cad. No. 233 34485 Maslak Sarıyer / İstanbul",
      phoneNumber: "0850 222 0 600",
      supportEmail: "ingbank@hs01.kep.tr",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 1000,
        maxAmount: 350000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%0.99",
        features: ["Avantajlı faiz oranları", "Esnek ödeme planları"],
      },
      konut: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      tasit: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      faizsiz: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
    },
  },
  {
    bankName: "ON Dijital Bank",
    bankLogoSrc: "/bank-logos/on-dijital-bank.webp",
    rating: 4.2,
    commentCount: 789,
    interestRate: "%3.39 - %3.59",
    loanAllocationFeeRate: 0.005,
    loanApplicationLink: "https://www.ondijitalbank.com/ihtiyac-kredisi",
    features: ["Tamamen dijital başvuru", "Anında kredi onayı", "Kişiye özel teklifler"],
    contactInfo: {
      address: "Mecidiyeköy Mah. Büyükdere Cad. No:108 34394 Şişli/İstanbul",
      phoneNumber: "0850 222 29 29",
      supportEmail: "info@ondijitalbank.com",
    },
    loanTypes: {
      ihtiyac: {
        minAmount: 10000,
        maxAmount: 400000,
        minMaturity: 3,
        maxMaturity: 36,
        interestRate: "%3.39",
        features: ["Tamamen dijital başvuru", "Anında kredi onayı"],
      },
      konut: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      tasit: { minAmount: 0, maxAmount: 0, minMaturity: 0, maxMaturity: 0, interestRate: "%0", features: [] },
      faizsiz: { minAmount: 1000, maxAmount: 15000, minMaturity: 3, maxMaturity: 36, interestRate: "%0", features: [] },
    },
  },
]

interface BankDetailsPageClientContentProps {
  bankNameParam: string
}

export function BankDetailsPageClientContent({ bankNameParam }: BankDetailsPageClientContentProps) {
  const router = useRouter()
  const searchParams =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()

  const initialAmount = searchParams.get("amount") || ""
  const initialMaturity = searchParams.get("maturity") || ""
  const initialInterestRate = searchParams.get("interestRate") || ""

  const [loanAmount, setLoanAmount] = useState(initialAmount)
  const [maturity, setMaturity] = useState(initialMaturity)
  const [interestRate, setInterestRate] = useState(initialInterestRate)
  const [monthlyInstallment, setMonthlyInstallment] = useState<string | null>(null)
  const [totalPayment, setTotalPayment] = useState<string | null>(null)
  const [loanCalculationError, setLoanCalculationError] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState("")

  const bank = bankDetailsData.find(
    (b) => encodeURIComponent(b.bankName.toLowerCase().replace(/\s+/g, "-")) === bankNameParam,
  )

  useEffect(() => {
    if (loanAmount && maturity && interestRate) {
      try {
        const amountNum = Number.parseFloat(loanAmount.replace(/\./g, "").replace(",", "."))
        const maturityNum = Number.parseInt(maturity, 10)
        const rateNum = Number.parseFloat(interestRate)

        if (isNaN(amountNum) || isNaN(maturityNum) || isNaN(rateNum) || amountNum <= 0 || maturityNum <= 0) {
          setLoanCalculationError("Geçersiz giriş. Lütfen geçerli sayılar girin.")
          setMonthlyInstallment(null)
          setTotalPayment(null)
          return
        }

        const { monthlyInstallment, totalInterestPaid } = generatePaymentPlan(amountNum, rateNum / 100, maturityNum)

        const calculatedTahsisUcreti = amountNum * (bank?.loanAllocationFeeRate || 0)
        const calculatedTotalPayment = amountNum + totalInterestPaid + calculatedTahsisUcreti

        setMonthlyInstallment(
          monthlyInstallment.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        )
        setTotalPayment(
          calculatedTotalPayment.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        )
        setLoanCalculationError(null)
      } catch (error) {
        console.error("Kredi hesaplama hatası:", error)
        setLoanCalculationError("Kredi hesaplanırken bir hata oluştu.")
        setMonthlyInstallment(null)
        setTotalPayment(null)
      }
    } else {
      setMonthlyInstallment(null)
      setTotalPayment(null)
      setLoanCalculationError(null)
    }
  }, [loanAmount, maturity, interestRate, bank?.loanAllocationFeeRate])

  if (!bank) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Banka Bulunamadı</h1>
        <p className="text-gray-600 mb-6">Aradığınız banka detayları mevcut değil.</p>
        <Button onClick={() => router.back()}>Geri Dön</Button>
      </div>
    )
  }

  const handleCopyLink = () => {
    const urlToCopy = window.location.href
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        setCopySuccess("Link kopyalandı!")
        setTimeout(() => setCopySuccess(""), 2000) // 2 saniye sonra mesajı temizle
      })
      .catch(() => {
        setCopySuccess("Kopyalama başarısız!")
      })
  }

  const bankGeneralInfo: Record<string, { title: string; content: string[] }> = {
    Akbank: {
      title: "Akbank: Halkın Bankası",
      content: [
        "Akbank, 1948 yılından bu yana Türkiye'nin finansal hayatında önemli bir yer tutmaktadır. 'Halkın Bankası' sloganıyla yola çıkan banka, bugün 14 milyon müşteriye hizmet veren köklü bir finans kuruluşu haline gelmiştir.",
        "Özellikle dijital bankacılık alanındaki yatırımlarıyla öne çıkan Akbank, mobil uygulaması Akbank Direkt ile müşterilerine 7/24 kesintisiz hizmet sunmaktadır. Para transferi, kredi başvurusu ve yatırım işlemleri artık saniyeler içinde gerçekleştirilebilmektedir.",
        "İhtiyaç kredileri konusunda uygun faiz oranları ve esnek ödeme seçenekleri ile dikkat çekmektedir. Özellikle genç müşteriler için tasarlanan kampanyalar ve dijital kanallar üzerinden kolay başvuru imkanı sunmaktadır.",
        "Akbank'ın güçlü finansal yapısı ve risk yönetimi anlayışı, müşterilerine güvenli bir bankacılık deneyimi yaşatmaktadır. Şube ağının yanı sıra ATM ve dijital kanallarla geniş bir hizmet ağına sahiptir.",
      ],
    },
    "Albaraka Türk": {
      title: "Albaraka Türk: Bereketin Finansal Serüveni",
      content: [
        "1984 yılında kurulan Albaraka Türk Katılım Bankası, Türkiye'de faizsiz bankacılığın öncü kurumlarından biridir. Adındaki 'Al-Barakah' kelimesi bereket anlamına gelir ve banka bu ismi hakkıyla taşımaktadır.",
        "250'yi aşkın şubesi ve 210 milyar TL'lik mevduat hacmiyle katılım bankacılığında lider konumdadır. Son beş yılda aktif büyüklüğünü neredeyse üç katına çıkararak sektördeki başarısını kanıtlamıştır.",
        "Faizsiz finans modelinin başarısının somut göstergesi olan takipteki kredilerin toplam kredilere oranı sadece %1,2'dir. Bu oran, geleneksel bankalardaki %3-4'lük oranın oldukça altındadır.",
        "Müşteri memnuniyetinde katılım bankaları arasında birinci sırada yer alan Albaraka Türk, özellikle küçük ve orta ölçekli işletmelere yönelik çözümleriyle dikkat çekmektedir. Dijital dönüşüme 1,2 milyar TL'den fazla yatırım yapmıştır.",
      ],
    },
    "Fibabanka A.Ş.": {
      title: "Fibabanka: Sağlam Temeller Üzerine Kurulu Güven",
      content: [
        "2001 yılında Family Bank olarak kurulan, 2012'de Fiba Grubu'nun desteğiyle Fibabanka adını alan bu kuruluş, Türk bankacılık sektörünün mütevazı ama güçlü temsilcilerinden biridir.",
        "25 milyar TL'yi aşan toplam aktif büyüklüğü ve son 5 yılda %140 artış gösteren mevduat hacmiyle istikrarlı bir büyüme sergilemektedir. Özellikle küçük ve orta ölçekli işletmelere verdiği destekle tanınır.",
        "Tüketici kredilerinde sektör ortalamasının yaklaşık %1 altında faiz oranları sunarak müşterilerine önemli tasarruf imkanı sağlamaktadır. 100.000 TL'lik bir kredi için yılda yaklaşık 960 TL tasarruf anlamına gelmektedir.",
        "Mobil uygulamasının sadeliği ve kullanım kolaylığı ile öne çıkan Fibabanka, teknolojiyi insanileştirme konusunda başarılı bir yaklaşım sergilemektedir. Müşteri hizmetlerinde 7/24 ulaşılabilirlik sağlar.",
      ],
    },
    DenizBank: {
      title: "DenizBank: Türkiye'nin Finans Denizinde Güçlü Bir Kaptan",
      content: [
        "1997'de kurulan DenizBank, Türkiye'nin finans denizinde açılan bir yelkenlinin zamanla okyanusları aşan bir transatlantiğe dönüşmesi gibi bir hikayeye sahiptir. 14 milyon müşteri ve 700 şube ile güçlü bir konumdadır.",
        "2012'de Emirates NBD'nin bünyesine katılmasıyla küresel bir vizyon kazanan banka, Türkiye'nin en güçlü 5. özel bankası konumuna yükselmiştir. Uluslararası sermaye desteği ile büyüme hızını artırmıştır.",
        "Özellikle yenilenebilir enerji yatırımlarına sağladığı finansmanlarla sosyal sorumluluk odaklı çalıştığını göstermektedir. Portföyünün %15'ini oluşturan bu yatırımlar her yıl istikrarlı büyüme göstermektedir.",
        "Dijital bankacılık uygulaması 'Afili Bankacılık' konseptiyle gençler arasında popülerdir. Siber Güvenlik Merkezi günde ortalama 1.5 milyon siber saldırıyı bertaraf ederek müşteri güvenliğini sağlamaktadır.",
      ],
    },
    "QNB Finansbank": {
      title: "QNB Bank: Dönüşüm Ustası",
      content: [
        "1987'de Finansbank olarak kurulan, 2016'da Katar'lı dev QNB Group tarafından satın alınan banka, küresel bir finans grubunun parçası olarak bambaşka bir kimliğe bürünmüştür.",
        "1.2 trilyon TL'lik aktif büyüklük, 14.500'den fazla çalışan, 650'ye yakın şube ve 8 milyonu aşkın müşteri ile Türkiye'nin önde gelen bankalarından biridir.",
        "İhtiyaç kredilerinde 60.000 TL'ye kadar 3 ay %0 faiz kampanyası, konut kredisinde TL bazında %2.9, taşıt kredisinde %1.99 gibi rekabetçi oranlarla müşterilerine avantaj sağlamaktadır.",
        "QNB Mobil uygulaması parmak izi ve yüz tanıma teknolojileri ile güvenli bankacılık deneyimi sunar. Anlık kredi onayı ve borç transferi kolaylığı gibi özelliklerle dijital bankacılıkta öncü konumdadır.",
      ],
    },
    TEB: {
      title: "TEB: Dijital Bankacılık ve Esneklik",
      content: [
        "Türkiye Elektrik Elektronik Tabancacılık (TEB), 2000 yılında kurulan ve dijital bankacılığın öncü kurumlarından biridir. 930 bin aktif kullanıcıya hizmet veren TEB, dijital dönüşümüyle sektörde öne çıkmaktadır.",
        "CEPTETEB uygulaması ile müşterilerine tamamen dijital bir bankacılık deneyimi sunmaktadır. Diğer bankaların ATM'lerinden ayda 3 kez bedava para çekme imkanı sunarak, müşterilerin finansal ihtiyaçlarını kolayca karşılamalarına yardımcı olmaktadır.",
        "Yapay zeka destekli chatbot ile 7/24 müşteri hizmetleri sunulmaktadır. Bu, müşterilerin sorularını hızlı ve etkili bir şekilde cevaplamak için kullanılabilir.",
        "TEB, rekabetçi faiz oranları ve esnek ödeme seçenekleriyle bireysel ve kurumsal müşterilerine uygun kredi çözümleri sunmaktadır. Ayrıca, pandemi döneminde KOBİ'lere özel destekler de vermektedir.",
      ],
    },
  }

  return (
    <main className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">
            ihtiyackredisi.com
          </Link>{" "}
          /{" "}
          <Link href="/bul" className="hover:underline">
            Kredi Bul
          </Link>{" "}
          / {bank.bankName}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="p-6 rounded-xl shadow-md mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={bank.bankLogoSrc || "/placeholder.svg"}
                    alt={`${bank.bankName} logo`}
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                  <h1 className="text-3xl font-bold">{bank.bankName}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{bank.rating}</span>
                  </div>
                  <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Link Paylaş</DialogTitle>
                        <DialogDescription>Bu sayfanın linkini paylaşmak için kopyalayabilirsiniz.</DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="share-link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            id="share-link"
                            defaultValue={typeof window !== "undefined" ? window.location.href : ""}
                            readOnly
                          />
                        </div>
                        <Button type="submit" onClick={handleCopyLink} size="sm" className="px-3">
                          <span className="sr-only">Kopyala</span>
                          <span>{copySuccess || "Kopyala"}</span>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {bank.commentCount} kişi {bank.bankName} hakkında yorum yazdı
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold mb-3">Kredi Hesaplama</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="loan-amount">Kredi Tutarı (TL)</Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Örn: 50000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maturity">Vade (Ay)</Label>
                    <Input
                      id="maturity"
                      type="number"
                      value={maturity}
                      onChange={(e) => setMaturity(e.target.value)}
                      placeholder="Örn: 12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interest-rate">Faiz Oranı (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Örn: 1.99"
                    />
                  </div>
                </div>
                {loanCalculationError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> {loanCalculationError}
                  </p>
                )}
                {monthlyInstallment && totalPayment && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="grid grid-cols-2 gap-2 text-base">
                      <div className="font-medium text-gray-700">Aylık Ödeme:</div>
                      <div className="text-right text-gray-900 font-bold">{monthlyInstallment} TL</div>
                      <div className="font-medium text-gray-700">Toplam Geri Ödeme:</div>
                      <div className="text-right text-gray-900 font-bold">{totalPayment} TL</div>
                    </div>
                    {bank.loanAllocationFeeRate > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        *Tahsis ücreti dahil edilmiştir: %{(bank.loanAllocationFeeRate * 100).toFixed(1)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Kredi Özellikleri</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bank.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white py-3 text-lg rounded-lg">
                <a href={bank.loanApplicationLink} target="_blank" rel="noopener noreferrer">
                  Hemen Başvur
                </a>
              </Button>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="loan-types">Kredi Türleri</TabsTrigger>
                <TabsTrigger value="contact">İletişim</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Genel Bilgiler</CardTitle>
                    <CardDescription>{bank.bankName} hakkında detaylı bilgi.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bank.generalInfo ? (
                      <>
                        <p className="text-gray-700 leading-relaxed">{bank.generalInfo}</p>
                      </>
                    ) : (
                      <>
                        <p>
                          {bank.bankName}, geniş hizmet ağı ve müşteri odaklı yaklaşımıyla finans sektöründe önde gelen
                          bankalardan biridir. Bireysel ve kurumsal müşterilerine çeşitli bankacılık ürünleri ve
                          hizmetleri sunmaktadır.
                        </p>
                        <p>
                          Özellikle ihtiyaç kredileri konusunda uygun faiz oranları ve esnek ödeme seçenekleri ile
                          dikkat çekmektedir. Dijital kanallar üzerinden kolayca başvuru yapılabilen kredi ürünleri,
                          müşterilerin finansal ihtiyaçlarına hızlı çözümler sunar.
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="loan-types">
                <Card>
                  <CardHeader>
                    <CardTitle>{bank.bankName} Kredi Türleri</CardTitle>
                    <CardDescription>Banka tarafından sunulan başlıca kredi türleri ve özellikleri.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {bank.loanTypes.ihtiyac.minAmount > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">İhtiyaç Kredisi</h3>
                        <p className="text-gray-700">
                          <strong>Tutar Aralığı:</strong> {bank.loanTypes.ihtiyac.minAmount.toLocaleString("tr-TR")} TL
                          - {bank.loanTypes.ihtiyac.maxAmount.toLocaleString("tr-TR")} TL
                        </p>
                        <p className="text-gray-700">
                          <strong>Vade Aralığı:</strong> {bank.loanTypes.ihtiyac.minMaturity} -{" "}
                          {bank.loanTypes.ihtiyac.maxMaturity} Ay
                        </p>
                        <p className="text-gray-700">
                          <strong>Faiz Oranı:</strong> {bank.loanTypes.ihtiyac.interestRate}
                        </p>
                        {bank.loanTypes.ihtiyac.features.length > 0 && (
                          <ul className="list-disc list-inside text-gray-700 mt-2">
                            {bank.loanTypes.ihtiyac.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {bank.loanTypes.konut.minAmount > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Konut Kredisi</h3>
                        <p className="text-gray-700">
                          <strong>Tutar Aralığı:</strong> {bank.loanTypes.konut.minAmount.toLocaleString("tr-TR")} TL -{" "}
                          {bank.loanTypes.konut.maxAmount.toLocaleString("tr-TR")} TL
                        </p>
                        <p className="text-gray-700">
                          <strong>Vade Aralığı:</strong> {bank.loanTypes.konut.minMaturity} -{" "}
                          {bank.loanTypes.konut.maxMaturity} Ay
                        </p>
                        <p className="text-gray-700">
                          <strong>Faiz Oranı:</strong> {bank.loanTypes.konut.interestRate}
                        </p>
                        {bank.loanTypes.konut.features.length > 0 && (
                          <ul className="list-disc list-inside text-gray-700 mt-2">
                            {bank.loanTypes.konut.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {bank.loanTypes.tasit.minAmount > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Taşıt Kredisi</h3>
                        <p className="text-gray-700">
                          <strong>Tutar Aralığı:</strong> {bank.loanTypes.tasit.minAmount.toLocaleString("tr-TR")} TL -{" "}
                          {bank.loanTypes.tasit.maxAmount.toLocaleString("tr-TR")} TL
                        </p>
                        <p className="text-gray-700">
                          <strong>Vade Aralığı:</strong> {bank.loanTypes.tasit.minMaturity} -{" "}
                          {bank.loanTypes.tasit.maxMaturity} Ay
                        </p>
                        <p className="text-gray-700">
                          <strong>Faiz Oranı:</strong> {bank.loanTypes.tasit.interestRate}
                        </p>
                        {bank.loanTypes.tasit.features.length > 0 && (
                          <ul className="list-disc list-inside text-gray-700 mt-2">
                            {bank.loanTypes.tasit.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {bank.loanTypes.faizsiz.minAmount > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Faizsiz Kredi / Mikro Kredi</h3>
                        <p className="text-gray-700">
                          <strong>Tutar Aralığı:</strong> {bank.loanTypes.faizsiz.minAmount.toLocaleString("tr-TR")} TL
                          - {bank.loanTypes.faizsiz.maxAmount.toLocaleString("tr-TR")} TL
                        </p>
                        <p className="text-gray-700">
                          <strong>Vade Aralığı:</strong> {bank.loanTypes.faizsiz.minMaturity} -{" "}
                          {bank.loanTypes.faizsiz.maxMaturity} Ay
                        </p>
                        <p className="text-gray-700">
                          <strong>Faiz Oranı:</strong> {bank.loanTypes.faizsiz.interestRate}
                        </p>
                        {bank.loanTypes.faizsiz.features.length > 0 && (
                          <ul className="list-disc list-inside text-gray-700 mt-2">
                            {bank.loanTypes.faizsiz.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>İletişim Bilgileri</CardTitle>
                    <CardDescription>{bank.bankName} ile iletişime geçin.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      <strong>Adres:</strong> {bank.contactInfo.address}
                    </p>
                    <p>
                      <strong>Telefon:</strong> {bank.contactInfo.phoneNumber}
                    </p>
                    <p>
                      <strong>E-posta:</strong> {bank.contactInfo.supportEmail}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:w-1/3">
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader>
                <CardTitle>Diğer Banka Teklifleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Buraya diğer banka teklifleri eklenebilir */}
                <p className="text-gray-600">Bu alana benzer banka teklifleri listelenebilir.</p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/ihtiyac-kredisi">Tüm Teklifleri Gör</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
