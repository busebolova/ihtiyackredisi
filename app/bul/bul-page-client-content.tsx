"use client"

import { useSearchParams } from "next/navigation"
import { BankFilterSidebar } from "@/components/bank-filter-sidebar"
import { LoanSearchForm } from "@/components/loan-search-form" // LoanSearchForm import edildi
import { BankOfferCard } from "@/components/bank-offer-card"
import { generatePaymentPlan } from "@/lib/loan-calculations"
import { useState, useEffect } from "react"
import Link from "next/link"

// Örnek banka verileri (normalde bir API'den gelir)
const allBankOffers = [
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    bankName: "Akbank",
    rating: 4.4,
    interestRate: "%3.68",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 345,
    features: [
      "6 ay vadeli 50.000 TL'ye varan Taksitli Nakit Avans!",
      "2 ay vadeli 40.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/bank-logos/albaraka.webp",
    bankName: "Albaraka Türk",
    rating: 4.0,
    interestRate: "%0",
    loanAllocationFeeRate: 0.005,
    type: "short-term", // Keeping as short-term for existing logic
    commentCount: 678,
    features: [
      "3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!",
      "1 ay vadeli 30.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/placeholder.svg?text=Alternatif+Bank",
    bankName: "Alternatif Bank",
    rating: 4.0,
    interestRate: "%3.09",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 100,
    features: ["Hızlı başvuru", "Esnek vade"],
  },
  {
    bankLogoSrc: "/bank-logos/cepteteb.webp",
    bankName: "CEPTETEB",
    rating: 4.1,
    interestRate: "%3.39",
    loanAllocationFeeRate: 0.005,
    type: "short-term", // Keeping as short-term for existing logic
    commentCount: 901,
    features: [
      "3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!",
      "1 ay vadeli 30.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/bank-logos/denizbank.webp",
    bankName: "DenizBank",
    rating: 4.0,
    interestRate: "%2.99",
    loanAllocationFeeRate: 0.005,
    type: "short-term", // Keeping as short-term for existing logic
    commentCount: 101,
    features: [
      "3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!",
      "1 ay vadeli 30.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/bank-logos/enpara.webp",
    bankName: "Enpara.com",
    rating: 5.0,
    interestRate: "%3.64",
    loanAllocationFeeRate: 0.005,
    type: "short-term", // Keeping as short-term for existing logic
    commentCount: 890,
    features: [
      "3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!",
      "1 ay vadeli 30.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    bankName: "Garanti BBVA",
    rating: 4.7,
    interestRate: "%3.79",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 534,
    features: [
      "3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!",
      "1 ay vadeli 30.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/placeholder.svg?text=GetirFinans",
    bankName: "GetirFinans",
    rating: 3.8,
    interestRate: "%3.65",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 50,
    features: ["Hızlı ve kolay başvuru", "Mobil odaklı"],
  },
  {
    bankLogoSrc: "/placeholder.svg?text=HSBC",
    bankName: "HSBC",
    rating: 4.1,
    interestRate: "%3.52",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 70,
    features: ["Uluslararası standartlar", "Özel bankacılık"],
  },
  {
    bankLogoSrc: "/bank-logos/halkbank.webp",
    bankName: "Halkbank",
    rating: 4.2,
    interestRate: "%5.06",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 180,
    features: ["Esnek ödeme planları", "Uygun faiz oranları"],
  },
  {
    bankLogoSrc: "/placeholder.svg?text=ICBC",
    bankName: "ICBC",
    rating: 3.9,
    interestRate: "%4.58",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 30,
    features: ["Global bankacılık deneyimi"],
  },
  {
    bankLogoSrc: "/bank-logos/ing.webp",
    bankName: "ING Bank",
    rating: 4.0,
    interestRate: "%0.99",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 534,
    features: ["Avantajlı faiz oranları", "Esnek ödeme planları"],
  },
  {
    bankLogoSrc: "/placeholder.svg?text=N+Kolay",
    bankName: "N Kolay",
    rating: 3.7,
    interestRate: "%3.79",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 40,
    features: ["Dijital kolaylık", "Hızlı onay"],
  },
  {
    bankLogoSrc: "/bank-logos/on-dijital-bank.webp",
    bankName: "ON Dijital Bank",
    rating: 4.2,
    interestRate: "%3.39",
    loanAllocationFeeRate: 0.005,
    type: "short-term", // Keeping as short-term for existing logic
    cardVariant: "green",
    commentCount: 789,
    features: [
      "3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!",
      "1 ay vadeli 30.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
    bankName: "QNB Finansbank",
    rating: 4.6,
    interestRate: "%0",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 456,
    features: [
      "9 ay vadeli 75.000 TL'ye varan Taksitli Nakit Avans!",
      "3 ay vadeli 60.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/placeholder.svg?text=TEB",
    bankName: "TEB",
    rating: 4.3,
    interestRate: "%3.39",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 90,
    features: ["Hızlı ve kolay başvuru", "Esnek geri ödeme"],
  },
  {
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    bankName: "Türkiye İş Bankası",
    rating: 4.6,
    interestRate: "%4.00",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 123,
    features: [
      "15 ay vadeli 125.000 TL'ye varan Taksitli Nakit Avans!",
      "5 ay vadeli 100.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/bank-logos/ziraat.webp",
    bankName: "T.C. Ziraat Bankası",
    rating: 4.5,
    interestRate: "%4.99",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 234,
    features: [
      "12 ay vadeli 100.000 TL'ye varan Taksitli Nakit Avans!",
      "4 ay vadeli 80.000 TL'ye varan Ek Hesap!",
    ],
  },
  {
    bankLogoSrc: "/placeholder.svg?text=Şekerbank",
    bankName: "Şekerbank",
    rating: 3.5,
    interestRate: "%5.33",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 20,
    features: ["KOBİ ve esnaf dostu", "Geleneksel bankacılık"],
  },
];

export function BulPageClientContent() {
  const searchParams = useSearchParams();

  const amount = searchParams.get('amount') || '50000';
  const maturity = searchParams.get('maturity') || '12';
  const loanType = searchParams.get('loanType') || 'ihtiyac';

  const loanAmountNum = parseFloat(amount);
  const maturityNum = parseInt(maturity, 10);

  const [filteredOffers, setFilteredOffers] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [selectedInterestRateOption, setSelectedInterestRateOption] = useState<string>("");

  useEffect(() => {
    let currentProcessedOffers = allBankOffers.map(offer => {
      // Faiz oranı bir aralık ise ilk değeri al
      const rateString = offer.interestRate.includes('-') ? offer.interestRate.split('-')[0].trim() : offer.interestRate;
      const bankInterestRate = parseFloat(rateString.replace('%', '').replace(',', '.')) / 100;

      const { monthlyInstallment, totalInterestPaid } = generatePaymentPlan(
        loanAmountNum,
        bankInterestRate,
        maturityNum
      );

      const calculatedTahsisUcreti = loanAmountNum * (offer.loanAllocationFeeRate || 0);
      const calculatedTotalPayment = loanAmountNum + totalInterestPaid + calculatedTahsisUcreti;

      return {
        ...offer,
        loanAmount: loanAmountNum.toLocaleString('tr-TR'),
        maturity: maturityNum.toString(),
        monthlyPayment: monthlyInstallment.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalPayment: calculatedTotalPayment.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      };
    });

    if (selectedBanks.length > 0) {
      currentProcessedOffers = currentProcessedOffers.filter(offer =>
        selectedBanks.includes(offer.bankName)
      );
    }

    if (selectedInterestRateOption === "zero-interest") {
      currentProcessedOffers = currentProcessedOffers.filter(offer =>
        parseFloat(offer.interestRate.replace('%', '').replace(',', '.')) === 0
      );
    } else if (selectedInterestRateOption === "new-user-offers") {
      // Bu kısım için banka verilerinde "Yeni müşterilere özel" gibi bir özellik olması gerekir.
      // Şimdilik bu filtreyi atlıyorum veya örnek bir özellik ekliyorum.
      // Örneğin, banka objesinde `isNewUserOffer: boolean` gibi bir alan olabilir.
      // currentProcessedOffers = currentProcessedOffers.filter(offer => offer.isNewUserOffer);
    }

    setFilteredOffers(currentProcessedOffers);
  }, [amount, maturity, selectedBanks, selectedInterestRateOption, loanAmountNum, maturityNum]);

  const handleFilterChange = (filters: { selectedBanks: string[]; selectedInterestRateOption: string }) => {
    setSelectedBanks(filters.selectedBanks);
    setSelectedInterestRateOption(filters.selectedInterestRateOption);
  };

  return (
    <main className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline" prefetch={false}>ihtiyackredisi.com</Link> / Kredi Bul
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar */}
          <BankFilterSidebar onFilterChange={handleFilterChange} />

          {/* Right Content */}
          <div>
            {/* SelectedLoanCriteria yerine LoanSearchForm kullanıldı */}
            <LoanSearchForm
              initialLoanType={loanType}
              initialAmount={amount}
              initialMaturity={maturity}
              hideMaturity={true} // Vade süresi kaldırıldı
            />

            <div className="grid grid-cols-1 gap-6">
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer, index) => (
                  <BankOfferCard key={index} {...offer} />
                ))
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-600">
                  Seçtiğiniz filtrelere uygun teklif bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
