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
    interestRate: "%2.15",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 534,
    bankUrl: "https://www.garantibbva.com.tr",
    features: ["3 ay vadeli 25.000 TL'ye varan Taksitli Nakit Avans!", "1 ay vadeli 30.000 TL'ye varan Ek Hesap!"],
  },
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    bankName: "Akbank",
    rating: 4.4,
    interestRate: "%2.20",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 321,
    bankUrl: "http://www.akbank.com.tr",
    features: ["2 ay vadeli 30.000 TL'ye varan Taksitli Nakit Avans!", "1 ay vadeli 20.000 TL'ye varan Ek Hesap!"],
  },
  {
    bankLogoSrc: "/bank-logos/qnb-finansbank.webp",
    bankName: "QNB Finansbank",
    rating: 4.6,
    interestRate: "%1.99",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 456,
    bankUrl: "http://www.qnbfinansbank.com",
    features: ["4 ay vadeli 35.000 TL'ye varan Taksitli Nakit Avans!", "2 ay vadeli 25.000 TL'ye varan Ek Hesap!"],
  },
  {
    bankLogoSrc: "/bank-logos/ziraat.webp",
    bankName: "T.C. Ziraat Bankası",
    rating: 4.5,
    interestRate: "%2.05",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 678,
    bankUrl: "http://www.ziraat.com.tr",
    features: ["5 ay vadeli 40.000 TL'ye varan Taksitli Nakit Avans!", "3 ay vadeli 30.000 TL'ye varan Ek Hesap!"],
  },
  {
    bankLogoSrc: "/bank-logos/is-bankasi.webp",
    bankName: "Türkiye İş Bankası",
    rating: 4.6,
    interestRate: "%1.89",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 789,
    bankUrl: "http://www.isbank.com.tr",
    features: ["6 ay vadeli 45.000 TL'ye varan Taksitli Nakit Avans!", "4 ay vadeli 35.000 TL'ye varan Ek Hesap!"],
  },
]

export function IhtiyacKredisiPageClientContent() {
  const searchParams = useSearchParams()

  const amount = searchParams.get("amount") || "50000"
  const maturity = searchParams.get("maturity") || "12"
  const loanType = searchParams.get("loanType") || "ihtiyac" // Varsayılan olarak ihtiyaç kredisi

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
          / İhtiyaç Kredisi
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            En Uygun İhtiyaç Kredisi Tekliflerini Karşılaştırın
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Türkiye'nin önde gelen bankalarının ihtiyaç kredisi tekliflerini karşılaştırın ve size en uygun krediyi
            bulun. Faiz oranları, vade seçenekleri ve aylık taksit tutarlarını tek sayfada görün.
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">İhtiyaç Kredisi Hakkında Genel Bilgiler</h2>

              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg leading-relaxed mb-4">
                  İhtiyaç kredileri, bireylerin ani ortaya çıkan finansal ihtiyaçlarını karşılamak için kullanılan en
                  yaygın kredi türlerinden biridir. Türkiye'nin önde gelen bankaları rekabetçi faiz oranları ve esnek
                  ödeme seçenekleri ile müşterilerine hizmet vermektedir.
                </p>

                <p className="leading-relaxed mb-6">
                  Garanti BBVA, Akbank, QNB Finansbank, Ziraat Bankası ve İş Bankası gibi köklü finansal kurumlar,
                  dijital dönüşüm süreçleriyle birlikte müşterilerine daha hızlı ve kolay kredi başvuru imkanları
                  sunmaktadır. Bu bankalar, %1.89 ile %2.20 arasında değişen faiz oranlarıyla piyasa da rekabet
                  etmektedir.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Rekabetçi Faiz Oranları
                  </h3>
                  <p className="text-sm text-blue-700">
                    %1.89 ile %2.20 arasında değişen faiz oranları ile piyasanın en uygun tekliflerini bulabilirsiniz.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Esnek Vade Seçenekleri
                  </h3>
                  <p className="text-sm text-green-700">
                    6 ay ile 36 ay arasında vade seçenekleri ile ödeme planınızı rahatça ayarlayabilirsiniz.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Hızlı Onay Süreci
                  </h3>
                  <p className="text-sm text-orange-700">
                    Dijital kanallar üzerinden dakikalar içinde başvuru yapabilir ve aynı gün onay alabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Kredi Seçerken Dikkat Edilmesi Gerekenler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Maliyet Analizi</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Faiz oranını detaylı karşılaştırın</li>
                      <li>Tahsis ücretini (%0.5) hesaba katın</li>
                      <li>Toplam maliyeti değerlendirin</li>
                      <li>Erken ödeme seçeneklerini araştırın</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Başvuru Süreci</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Gelir belgenizi hazırlayın</li>
                      <li>Kredi notunuzu kontrol edin</li>
                      <li>Gerekli evrakları tamamlayın</li>
                      <li>Bankanın şartlarını inceleyin</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md mt-8">
              <div className="text-center mb-6">
                <button
                  onClick={() => setShowMoreContent(!showMoreContent)}
                  className="bg-[#FF7A00] hover:bg-[#e66a00] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  {showMoreContent ? "Daha Az Göster" : "Daha Fazla Gör"}
                </button>
              </div>

              {showMoreContent && (
                <div className="prose max-w-none text-gray-700 space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">
                      İhtiyaç Kredisi: Hayatın Dümen Suyunda Bir Can Simidi
                    </h2>
                    <p className="text-blue-700 leading-relaxed">
                      İhtiyaç kredisi denince aklıma hep şu gelir: Bir sabah uyanıyorsunuz, arabanız bozulmuş,
                      çocuğunuzun okul taksiti yaklaşmış ya da beklenmedik bir sağlık harcaması çıkmış. İşte tam da o
                      anda, bir can simidi gibi uzanıyor bankalar. Peki bu can simidi gerçekten tutunmaya değer mi,
                      yoksa dibe çekilmekten beter mi eder?
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">İnanılmaz Büyüme Hikayesi</h3>
                    <p className="text-green-700 leading-relaxed mb-4">
                      İhtiyaç kredileri, Türkiye'de son 20 yılda inanılmaz bir büyüme gösterdi. 2000'li yılların başında
                      neredeyse yok denecek kadar az olan bu kredi türü, şimdilerde neredeyse her evin finansal
                      hayatında yer alıyor. BDDK'nın 2023 yılı verilerine göre, Türkiye'deki ihtiyaç kredisi stoku 1
                      trilyon TL sınırını aşmış durumda.
                    </p>
                    <div className="bg-white p-4 rounded border border-green-200">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-800">50 Milyar TL</div>
                          <div className="text-sm text-green-600">2010 Yılı</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-800">1 Trilyon TL</div>
                          <div className="text-sm text-green-600">2023 Yılı</div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-green-700 font-medium">13 yılda 20 kat artış!</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-4">Büyümenin Arkasındaki Sebepler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">Bankacılığın Yaygınlaşması</h4>
                        <p className="text-sm text-yellow-700">Artık neredeyse her ilçede bir banka şubesi var.</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">Dijital Bankacılık</h4>
                        <p className="text-sm text-yellow-700">Birkaç tıkla evinizin rahatlığında kredi başvurusu.</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">Tüketim Alışkanlıkları</h4>
                        <p className="text-sm text-yellow-700">"Şimdi alıp taksitle öderim" dönemi hakim.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 className="text-xl font-semibold text-red-800 mb-4">Kredi Kullanmadan Önce Kendinize Sorun</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-red-600 font-bold text-lg">1.</span>
                        <p className="text-red-700">"Bu kredi gerçekten bir ihtiyaç mı?"</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-600 font-bold text-lg">2.</span>
                        <p className="text-red-700">"Ödemeleri rahatlıkla yapabilecek miyim?"</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-600 font-bold text-lg">3.</span>
                        <p className="text-red-700">"Alternatif çözümlerim var mı?"</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-100 rounded border border-red-300">
                      <p className="text-red-800 font-medium text-center">
                        Unutmayın: Kredi almak her zaman son çare olmalı!
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4">Faiz Oranları: Karışık Ama Anlaşılır</h3>
                    <p className="text-purple-700 leading-relaxed mb-4">
                      İhtiyaç kredisi faizleri, Türkiye'de en çok dalgalanan finansal göstergelerden biri. 2020 yılında
                      ortalama %15-20 bandında seyreden faizler, 2023'te %40'lara kadar çıktı. Bu artışın temel sebebi
                      elbette enflasyon.
                    </p>

                    <div className="bg-white p-4 rounded border border-purple-200 mb-4">
                      <h4 className="font-semibold text-purple-800 mb-3">Faiz Hesaplama Örneği</h4>
                      <p className="text-purple-700 mb-2">50.000 TL kredi, %30 faiz, farklı vadeler:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="text-center p-2 bg-purple-100 rounded">
                          <div className="font-bold">12 Ay</div>
                          <div>58.000 TL</div>
                        </div>
                        <div className="text-center p-2 bg-purple-100 rounded">
                          <div className="font-bold">24 Ay</div>
                          <div>65.000 TL</div>
                        </div>
                        <div className="text-center p-2 bg-purple-100 rounded">
                          <div className="font-bold">36 Ay</div>
                          <div>73.000 TL</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-4">Kredi Notu: Finansal Kimlik Kartınız</h3>
                    <p className="text-indigo-700 leading-relaxed mb-4">
                      Kredi notu, geçmişteki ödeme alışkanlıklarınızı gösteren bir tür finansal kimlik kartı gibi
                      düşünülebilir. 0 ile 1900 arasında değişen bu not, ne kadar yüksekse o kadar iyi.
                    </p>

                    <div className="bg-white p-4 rounded border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-3">Kredi Notunuzu Yükseltmek İçin:</h4>
                      <ul className="space-y-2 text-indigo-700">
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                          <span>Kredi kartı borçlarınızı zamanında ödeyin</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                          <span>Mevcut kredilerinizin taksitlerini aksatmayın</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                          <span>Çok sık kredi başvurusu yapmayın</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                          <span>Kredi kullanım oranınızı düşük tutun</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-orange-800 mb-4">
                      Dikkat Edilmesi Gereken Diğer Noktalar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded border border-orange-200">
                        <h4 className="font-semibold text-orange-800 mb-2">Erken Kapanma Cezaları</h4>
                        <p className="text-sm text-orange-700">%1-5 arasında değişebilir</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-orange-200">
                        <h4 className="font-semibold text-orange-800 mb-2">Ek Masraflar</h4>
                        <p className="text-sm text-orange-700">Dosya masrafı, hayat sigortası</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-orange-200">
                        <h4 className="font-semibold text-orange-800 mb-2">Kampanyalar</h4>
                        <p className="text-sm text-orange-700">Faiz indirim dönemlerini takip edin</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Doğru Kullanımın Püf Noktaları</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Yapılması Gerekenler</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✓ Sadece gerçekten ihtiyaç olduğunda kullanın</li>
                          <li>✓ Ödeme planınızı aylık bütçenize göre yapın</li>
                          <li>✓ Mümkün olan en kısa vadeli krediyi seçin</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Araştırma Yapın</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✓ Birden fazla bankayı karşılaştırın</li>
                          <li>✓ Ek masrafları mutlaka soruşturun</li>
                          <li>✓ Karşılaştırma sitelerini kullanın</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Son Tavsiye</h3>
                    <p className="text-blue-800 leading-relaxed text-center">
                      İhtiyaç kredisi bir çözüm aracıdır. Ama yanlış kullanıldığında, kendisi bir problem haline
                      gelebilir. Hayat bazen beklenmedik sürprizler yapabiliyor. İhtiyaç kredisi de bu sürprizlerle baş
                      etmenin bir yolu. Ama unutmayın, her çözümün bir maliyeti var. Önemli olan, bu maliyeti en aza
                      indirerek en doğru kararı vermek.
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
