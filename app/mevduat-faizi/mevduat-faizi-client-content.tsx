"use client"

import { useSearchParams } from "next/navigation"
import { BankFilterSidebar } from "@/components/bank-filter-sidebar"
import { DepositSearchForm } from "@/components/deposit-search-form"
import { DepositOfferCard } from "@/components/deposit-offer-card"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const allDepositOffers = [
  {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    bankName: "Garanti BBVA",
    rating: 4.7,
    interestRate: "%45.00",
    type: "deposit",
    commentCount: 234,
    features: [
      "Minimum 1.000 TL ile başlayın",
      "İnternet şubesi üzerinden kolay işlem",
      "Otomatik vade uzatma seçeneği",
    ],
    minAmount: 1000,
    maxAmount: 1000000,
  },
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    bankName: "Akbank",
    rating: 4.4,
    interestRate: "%44.50",
    type: "deposit",
    commentCount: 189,
    features: ["500 TL'den başlayan mevduat", "Mobil bankacılık avantajı", "Esnek vade seçenekleri"],
    minAmount: 500,
    maxAmount: 2000000,
  },
  {
    bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
    bankName: "QNB Finansbank",
    rating: 4.6,
    interestRate: "%46.00",
    type: "deposit",
    commentCount: 312,
    features: ["Yüksek faiz oranları", "1.000 TL minimum tutar", "Dijital bankacılık kolaylığı"],
    minAmount: 1000,
    maxAmount: 1500000,
  },
  {
    bankLogoSrc: "/bank-logos/ziraat.webp",
    bankName: "T.C. Ziraat Bankası",
    rating: 4.5,
    interestRate: "%43.75",
    type: "deposit",
    commentCount: 456,
    features: ["Devlet güvencesi", "Şube ağı avantajı", "Güvenilir yatırım"],
    minAmount: 100,
    maxAmount: 5000000,
  },
  {
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    bankName: "Türkiye İş Bankası",
    rating: 4.6,
    interestRate: "%44.25",
    type: "deposit",
    commentCount: 378,
    features: ["Köklü banka güvencesi", "Çeşitli vade seçenekleri", "Online işlem kolaylığı"],
    minAmount: 250,
    maxAmount: 3000000,
  },
  {
    bankLogoSrc: "/bank-logos/denizbank.webp",
    bankName: "DenizBank",
    rating: 4.3,
    interestRate: "%45.50",
    type: "deposit",
    commentCount: 267,
    features: ["Rekabetçi faiz oranları", "Hızlı işlem süreci", "Müşteri odaklı hizmet"],
    minAmount: 1000,
    maxAmount: 2500000,
  },
]

export function MevduatFaiziPageClientContent() {
  const searchParams = useSearchParams()

  const amount = searchParams.get("amount") || "10000"
  const maturity = searchParams.get("maturity") || "3"

  const depositAmountNum = Number.parseFloat(amount)
  const maturityNum = Number.parseInt(maturity, 10)

  const [filteredOffers, setFilteredOffers] = useState([])
  const [selectedBanks, setSelectedBanks] = useState<string[]>([])
  const [selectedInterestRateOption, setSelectedInterestRateOption] = useState<string>("")
  const [showMoreContent, setShowMoreContent] = useState(false)

  useEffect(() => {
    let currentProcessedOffers = allDepositOffers.map((offer) => {
      const bankInterestRate = Number.parseFloat(offer.interestRate.replace("%", "").replace(",", ".")) / 100

      const monthlyInterestRate = bankInterestRate / 12
      const totalReturn = depositAmountNum * Math.pow(1 + monthlyInterestRate, maturityNum)
      const interestEarned = totalReturn - depositAmountNum
      const monthlyInterest = interestEarned / maturityNum

      return {
        ...offer,
        depositAmount: depositAmountNum.toLocaleString("tr-TR"),
        maturity: maturityNum.toString(),
        monthlyInterest: monthlyInterest.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        totalReturn: totalReturn.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        interestEarned: interestEarned.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      }
    })

    currentProcessedOffers = currentProcessedOffers.filter(
      (offer) => depositAmountNum >= offer.minAmount && depositAmountNum <= offer.maxAmount,
    )

    if (selectedBanks.length > 0) {
      currentProcessedOffers = currentProcessedOffers.filter((offer) => selectedBanks.includes(offer.bankName))
    }

    if (selectedInterestRateOption === "high-interest") {
      currentProcessedOffers = currentProcessedOffers.filter(
        (offer) => Number.parseFloat(offer.interestRate.replace("%", "").replace(",", ".")) >= 45,
      )
    }

    setFilteredOffers(currentProcessedOffers)
  }, [amount, maturity, selectedBanks, selectedInterestRateOption, depositAmountNum, maturityNum])

  const handleFilterChange = (filters: { selectedBanks: string[]; selectedInterestRateOption: string }) => {
    setSelectedBanks(filters.selectedBanks)
    setSelectedInterestRateOption(filters.selectedInterestRateOption)
  }

  return (
    <main className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline" prefetch={false}>
            ihtiyackredisi.com
          </Link>{" "}
          / Mevduat Faizi
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <BankFilterSidebar onFilterChange={handleFilterChange} />

          <div>
            <DepositSearchForm initialAmount={amount} initialMaturity={maturity} />

            <div className="grid grid-cols-1 gap-6">
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer, index) => <DepositOfferCard key={index} {...offer} />)
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-600">
                  Seçtiğiniz filtrelere uygun mevduat teklifi bulunamadı.
                </div>
              )}
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mevduat Faizi Hesaplama Rehberi</h2>
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
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">
                      Mevduat Faizi: Paranızın Zamana Karşı Sınavı
                    </h3>
                    <p className="text-blue-700">
                      Mevduat faizi denince aklınıza ne geliyor? Bankaya yatırdığınız paranın üzerine eklenen küçük bir
                      kâr payı mı? Yoksa enflasyon karşısında paranızı korumanın bir yolu mu? Aslında ikisi de doğru,
                      ama işin özü çok daha derin. Mevduat faizi, ekonomik dengelerin, bankaların stratejilerinin ve
                      hatta devlet politikalarının kesiştiği bir noktada duruyor.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Reel Faiz Kavramı</h4>
                    <p className="text-green-700">
                      Mesela, 10.000 TL'nizi yıllık %20 faizle bir bankaya yatırdığınızı düşünün. Bir yıl sonra 12.000
                      TL'niz olacak, değil mi? Ama işin içine enflasyon girince hesap değişiyor. Eğer o yıl enflasyon
                      %25'se, aslında paranızın alım gücü erimiş oluyor. İşte bu yüzden reel faiz diye bir kavram var.
                      Nominal faizden enflasyonu çıkarınca gerçek getiriniz ortaya çıkıyor.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">
                      Bankalar Neden Mevduat Faizi Veriyor?
                    </h4>
                    <p className="text-orange-700">
                      Basitçe söylersek, sizden topladıkları parayı daha yüksek faizle kredi olarak dağıtıyorlar.
                      Aradaki fark da onların kârı oluyor. 2023 yılında Türkiye'deki bankaların mevduat faizleriyle
                      kredi faizleri arasında yaklaşık %10-15'lik bir makas olduğunu görürsünüz. Yani banka size %30
                      verip, %40'tan kredi veriyor.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Merkez Bankası Etkisi</h4>
                    <p className="text-purple-700">
                      Mevduat faizlerini belirleyen en önemli faktörlerden biri de Merkez Bankası'nın politika faizi.
                      2022'de politika faizinin %9'larda seyrettiği dönemler oldu, sonra sert artışlarla %25'e kadar
                      çıktı. Bu durumda bankalar da mevduat faizlerini yukarı çekti. Ama unutmayın, her banka aynı oranı
                      vermez.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Vergi Konusu</h4>
                    <p className="text-red-700">
                      Mevduat faizini değerlendirirken dikkat etmeniz gereken bir diğer konu da vergiler. Mevduat faizi
                      geliriniz, gelir vergisine tabi. 2023 itibarıyla, mevduat faizinden elde ettiğiniz gelir üzerinden
                      %15 stopaj kesintisi yapılıyor. Yani %30 faiz alıyorsanız, aslında net %25,5'le kalıyorsunuz.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Güvenlik ve Garanti</h4>
                    <p className="text-gray-700">
                      Mevduat, neredeyse risksiz bir yatırım aracı. Bankaların devlet garantisi altında olduğunu
                      unutmayın. 100.000 TL'ye kadar olan mevduatlar, TMSF (Tasarruf Mevduatı Sigorta Fonu)
                      güvencesinde. Yani banka batarsa bile paranızı geri alıyorsunuz. Bu yüzden ihtiyackredisi.com gibi
                      bir platform üzerinden karşılaştırma yapmak, hem faiz oranlarını hem de bankaların sunduğu diğer
                      avantajları görmenizi sağlar.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
