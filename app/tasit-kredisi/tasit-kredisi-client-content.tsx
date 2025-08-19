"use client"

import { useSearchParams } from "next/navigation"
import { BankFilterSidebar } from "@/components/bank-filter-sidebar"
import { LoanSearchForm } from "@/components/loan-search-form"
import { BankOfferCard } from "@/components/bank-offer-card"
import { generatePaymentPlan } from "@/lib/loan-calculations"
import { useState, useEffect } from "react"
import Link from "next/link"

const allBankOffers = [
  {
    bankLogoSrc: "/bank-logos/garanti-bbva.webp",
    bankName: "Garanti BBVA",
    rating: 4.7,
    interestRate: "%2.50", // Taşıt kredisi faiz oranı
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 534, // Add commentCount
    bankUrl: "https://www.garantibbva.com.tr", // Added bankUrl for proper "Hemen Başvur" button functionality
    features: ["Hızlı onay süreci", "Uygun faiz oranları", "Kasko avantajları"],
  },
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    bankName: "Akbank",
    rating: 4.4,
    interestRate: "%2.55",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 321, // Add commentCount
    bankUrl: "http://www.akbank.com.tr", // Added bankUrl for proper "Hemen Başvur" button functionality
    features: ["Dijital başvuru", "Kolay ödeme seçenekleri", "Kasko entegrasyonu"],
  },
  {
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    bankName: "Türkiye İş Bankası",
    rating: 4.6,
    interestRate: "%2.45",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 456, // Add commentCount
    bankUrl: "http://www.isbank.com.tr", // Added bankUrl for proper "Hemen Başvur" button functionality
    features: ["24/7 müşteri hizmetleri", "Online kredi başvurusu", "Kasko indirimleri"],
  },
]

export function TasitKredisiPageClientContent() {
  const searchParams = useSearchParams()

  const amount = searchParams.get("amount") || "100000"
  const maturity = searchParams.get("maturity") || "48"
  const loanType = searchParams.get("loanType") || "tasit" // Varsayılan olarak taşıt kredisi

  const loanAmountNum = Number.parseFloat(amount)
  const maturityNum = Number.parseInt(maturity, 10)

  const [filteredOffers, setFilteredOffers] = useState([])
  const [selectedBanks, setSelectedBanks] = useState<string[]>([])
  const [selectedInterestRateOption, setSelectedInterestRateOption] = useState<string>("")
  const [showMoreContent, setShowMoreContent] = useState(false)

  useEffect(() => {
    let currentProcessedOffers = allBankOffers.map((offer) => {
      const bankInterestRate = Number.parseFloat(offer.interestRate.replace("%", "").replace(",", ".")) / 100
      const { monthlyInstallment, totalInterestPaid } = generatePaymentPlan(
        loanAmountNum,
        bankInterestRate,
        maturityNum,
      )

      const calculatedTahsisUcreti = loanAmountNum * (offer.loanAllocationFeeRate || 0)
      const calculatedTotalPayment = loanAmountNum + totalInterestPaid + calculatedTahsisUcreti

      return {
        ...offer,
        loanAmount: loanAmountNum.toLocaleString("tr-TR"),
        maturity: maturityNum.toString(),
        monthlyPayment: monthlyInstallment.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        totalPayment: calculatedTotalPayment.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      }
    })

    if (selectedBanks.length > 0) {
      currentProcessedOffers = currentProcessedOffers.filter((offer) => selectedBanks.includes(offer.bankName))
    }

    if (selectedInterestRateOption === "zero-interest") {
      currentProcessedOffers = currentProcessedOffers.filter(
        (offer) => Number.parseFloat(offer.interestRate.replace("%", "").replace(",", ".")) === 0,
      )
    } else if (selectedInterestRateOption === "new-user-offers") {
      // Implement new user offer filtering if applicable
    }

    setFilteredOffers(currentProcessedOffers)
  }, [amount, maturity, selectedBanks, selectedInterestRateOption, loanAmountNum, maturityNum])

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
          / Taşıt Kredisi
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            En Uygun Taşıt Kredisi Tekliflerini Karşılaştırın
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Hayalinizdeki araca sahip olun. Türkiye'nin önde gelen bankalarının taşıt kredisi tekliflerini karşılaştırın
            ve en uygun faiz oranlarını keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <BankFilterSidebar onFilterChange={handleFilterChange} />

          <div>
            <LoanSearchForm
              initialLoanType={loanType}
              initialAmount={amount}
              initialMaturity={maturity}
              hideLoanType={true} // Kredi Türü seçeneğini gizle
            />

            <div className="grid grid-cols-1 gap-6">
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer, index) => <BankOfferCard key={index} {...offer} />)
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-600">
                  Seçtiğiniz filtrelere uygun teklif bulunamadı.
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Taşıt Kredisi Hakkında Genel Bilgiler</h2>

              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg leading-relaxed mb-4">
                  Taşıt kredileri, hayalinizdeki araca sahip olmanın en pratik yoludur. Garanti BBVA, Akbank ve İş
                  Bankası gibi Türkiye'nin önde gelen finansal kurumları, rekabetçi faiz oranları ve esnek ödeme
                  seçenekleri ile taşıt kredisi piyasasında güçlü konumlarını sürdürmektedir.
                </p>

                <p className="leading-relaxed mb-6">
                  %2.45 ile %2.55 arasında değişen faiz oranları ile taşıt kredileri, ihtiyaç kredilerine göre daha
                  avantajlı şartlar sunmaktadır. 12 ay ile 60 ay arasındaki geniş vade seçenekleri sayesinde aylık ödeme
                  planınızı rahatça ayarlayabilir, kasko avantajları ile de aracınızı güvence altına alabilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Rekabetçi Faiz Oranları
                  </h3>
                  <p className="text-sm text-blue-700">
                    %2.45 ile %2.55 arasında değişen faiz oranları ile piyasanın en uygun taşıt kredisi tekliflerini
                    bulabilirsiniz.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Esnek Vade Seçenekleri
                  </h3>
                  <p className="text-sm text-green-700">
                    12 ay ile 60 ay arasında geniş vade seçenekleri ile aylık ödeme planınızı rahatça
                    ayarlayabilirsiniz.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Kasko Avantajları
                  </h3>
                  <p className="text-sm text-orange-700">
                    Birçok banka kasko sigortasında özel indirimler ve avantajlı anlaşmalar sunmaktadır.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Taşıt Kredisi Başvuru Şartları ve Önemli Bilgiler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Başvuru Gereksinimleri</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>21-65 yaş aralığında olmak</li>
                      <li>Düzenli gelir belgesi</li>
                      <li>Minimum 1 yıl iş deneyimi</li>
                      <li>Araç fatura veya proforma faturası</li>
                      <li>Kimlik ve ikametgah belgesi</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Avantajlar ve Özellikler</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Hızlı onay süreci (1-2 gün)</li>
                      <li>Kasko sigortası indirimleri</li>
                      <li>Erken ödeme seçenekleri</li>
                      <li>Dijital başvuru imkanı</li>
                      <li>24/7 müşteri hizmetleri</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-8">
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowMoreContent(!showMoreContent)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
                  >
                    {showMoreContent ? "Daha Az Göster" : "Daha Fazla Gör"}
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${showMoreContent ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {showMoreContent && (
                  <div className="mt-8 space-y-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Yüzde Hesaplama: Kredilerde Doğru Kararın Anahtarı
                      </h3>

                      <div className="prose max-w-none text-gray-700 space-y-6">
                        <p className="text-lg leading-relaxed">
                          Finansın dili sayılardır, ama bu dilin en kritik kelimesi hiç şüphesiz "yüzde"dir. Kredi
                          çekerken karşılaştığınız ilk engel, faiz oranlarının gerçekte ne anlama geldiğini kavramaktır.
                          Bankalar bazen aylık bazda çok cazip görünen oranlar sunar ama bunu yıllık bazda
                          hesapladığınızda tablo değişir.
                        </p>

                        <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-800 mb-3">Pratik Örnek</h4>
                          <p className="text-gray-700">
                            300.000 TL'lik bir taşıt kredisi çekeceksiniz. Bir banka size %2.4 faiz oranı verirken,
                            diğeri %2.25 veriyor. Aradaki fark küçük görünebilir ama 48 aylık vadeyle hesapladığınızda,
                            bu %0.15'lik fark yaklaşık 3.800 TL'lik bir fark yaratıyor.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-green-50 p-6 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-3">Faiz Oranları</h4>
                            <p className="text-sm text-green-700">
                              Taşıt kredilerinde faiz oranları genellikle ihtiyaç kredilerinden daha düşüktür. Bunun
                              sebebi, aracın teminat olarak gösterilmesidir.
                            </p>
                          </div>
                          <div className="bg-orange-50 p-6 rounded-lg">
                            <h4 className="font-semibold text-orange-800 mb-3">Masraflar</h4>
                            <p className="text-sm text-orange-700">
                              Dosya masrafı, hayat sigortası, ekspertiz ücreti gibi kalemlerle aslında faizi başka bir
                              cebinizden alınabilir. Bu masrafları da hesaba katmak önemlidir.
                            </p>
                          </div>
                        </div>

                        <p className="leading-relaxed">
                          Kredi notunuz da faiz oranınızı belirlemede kritik rol oynuyor. Bankalar risk profiline göre
                          müşterilere farklı faiz uyguluyor. İyi bir kredi notu (750 ve üzeri), size %1-1.5 daha düşük
                          faiz oranı sağlayabilir.
                        </p>

                        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-yellow-800 mb-3">💡 Önemli Tavsiye</h4>
                          <p className="text-yellow-700">
                            Yüzde hesaplamalarını doğru yapmak, finansal kararlarınızda sizi bir adım öne geçirir. Küçük
                            görünen yüzde farkları, uzun vadede binlerce liralık farklar yaratabilir. Bu nedenle kredi
                            çekerken acele etmeyin, detaylı karşılaştırma yapın.
                          </p>
                        </div>

                        <p className="leading-relaxed">
                          Erken ödeme seçeneklerini de hesaba katmak lazım. Çoğu banka erken ödemelerde ceza uyguluyor
                          ama bu ceza genellikle kalan anaparın %1-2'si kadar oluyor. Kredinizin son yıllarında erken
                          ödeme yaparsanız, ödeyeceğiniz ceza çok daha düşük olacaktır.
                        </p>

                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3">Sonuç</h4>
                          <p className="text-blue-700">
                            Doğru hesaplanmış her yüzde, cebinizde kalacak parayı artırır ve finansal özgürlüğünüze bir
                            adım daha yaklaştırır. Paranızı yönetmek, hayatınızı yönetmektir.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
