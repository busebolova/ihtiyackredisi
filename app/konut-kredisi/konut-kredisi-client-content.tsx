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
    interestRate: "%1.85", // Konut kredisi faiz oranı
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 534, // Add commentCount
    bankUrl: "https://www.garantibbva.com.tr", // Added bankUrl for proper "Hemen Başvur" button functionality
    features: ["Düşük faiz oranları", "Uzun vade seçenekleri", "Esnek ödeme planları"],
  },
  {
    bankLogoSrc: "/bank-logos/akbank.png",
    bankName: "Akbank",
    rating: 4.4,
    interestRate: "%1.90",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 321, // Add commentCount
    bankUrl: "http://www.akbank.com.tr", // Added bankUrl for proper "Hemen Başvur" button functionality
    features: ["Hızlı kredi başvurusu", "Online ödeme seçenekleri", "Kredi garantisi"],
  },
  {
    bankLogoSrc: "/bank-logos/ziraat.webp",
    bankName: "T.C. Ziraat Bankası",
    rating: 4.5,
    interestRate: "%1.75",
    loanAllocationFeeRate: 0.005,
    type: "interest",
    commentCount: 456, // Add commentCount
    bankUrl: "http://www.ziraat.com.tr", // Added bankUrl for proper "Hemen Başvur" button functionality
    features: ["Krediye hızlı erişim", "Çoklu kredi türleri", "Krediye özel danışmanlık"],
  },
]

export function KonutKredisiPageClientContent() {
  const searchParams = useSearchParams()

  const amount = searchParams.get("amount") || "200000"
  const maturity = searchParams.get("maturity") || "120"
  const loanType = searchParams.get("loanType") || "konut" // Varsayılan olarak konut kredisi

  const loanAmountNum = Number.parseFloat(amount)
  const maturityNum = Number.parseInt(maturity, 10)

  const [filteredOffers, setFilteredOffers] = useState([])
  const [selectedBanks, setSelectedBanks] = useState<string[]>([])
  const [selectedInterestRateOption, setSelectedInterestRateOption] = useState<string>("")
  const [showMoreInfo, setShowMoreInfo] = useState(false)

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
          / Konut Kredisi
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            En Uygun Konut Kredisi Tekliflerini Karşılaştırın
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Ev sahibi olma hayalinizi gerçekleştirin. Türkiye'nin önde gelen bankalarının konut kredisi tekliflerini
            karşılaştırın ve en uygun faiz oranlarını keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <BankFilterSidebar onFilterChange={handleFilterChange} />

          <div>
            <LoanSearchForm
              initialLoanType={loanType}
              initialAmount={amount}
              initialMaturity={maturity}
              hideLoanType={true}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Konut Kredisi Hakkında Genel Bilgiler</h2>

              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg leading-relaxed mb-4">
                  Konut kredileri, ev sahibi olma hayalini gerçekleştirmek isteyen vatandaşlar için bankaların sunduğu
                  en avantajlı kredi türlerinden biridir. Türkiye'nin köklü bankaları olan Garanti BBVA, Akbank ve
                  Ziraat Bankası, rekabetçi faiz oranları ile konut kredisi piyasasında öncü konumdadır.
                </p>

                <p className="leading-relaxed mb-6">
                  %1.75 ile %1.90 arasında değişen faiz oranları ile konut kredileri, diğer kredi türlerine göre çok
                  daha avantajlı şartlar sunmaktadır. 120 aya kadar uzanan vade seçenekleri sayesinde aylık taksit
                  yükünüz minimum seviyede tutulabilir ve ev sahibi olma süreciniz kolaylaşır.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Düşük Faiz Oranları
                  </h3>
                  <p className="text-sm text-blue-700">
                    %1.75 ile %1.90 arasında değişen faiz oranları ile piyasanın en avantajlı konut kredisi tekliflerini
                    bulabilirsiniz.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Uzun Vade Seçenekleri
                  </h3>
                  <p className="text-sm text-green-700">
                    120 aya kadar uzayan vade seçenekleri ile aylık taksit yükünüzü minimize edebilirsiniz.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Yüksek Kredi Limiti
                  </h3>
                  <p className="text-sm text-orange-700">
                    Konut değerinin %80'ine kadar kredi kullanabilir, sadece %20 peşinat ile ev sahibi olabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Konut Kredisi Başvuru Şartları ve Önemli Bilgiler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Başvuru Gereksinimleri</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>25-65 yaş aralığında olmak</li>
                      <li>Düzenli gelir belgesi (maaş bordrosu)</li>
                      <li>Minimum 2 yıl iş deneyimi</li>
                      <li>Konut değerleme raporu</li>
                      <li>Tapu senedi ve imar durumu</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Maliyet Hesaplaması</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Tahsis ücreti (%0.5)</li>
                      <li>Konut sigortası (zorunlu)</li>
                      <li>Hayat sigortası (zorunlu)</li>
                      <li>Ekspertiz ücreti</li>
                      <li>Dosya masrafları</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Konut Kredisi Hakkında Detaylı Bilgiler</h2>
                <button
                  onClick={() => setShowMoreInfo(!showMoreInfo)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  {showMoreInfo ? "Daha Az Göster" : "Daha Fazla Gör"}
                </button>
              </div>

              {showMoreInfo && (
                <div className="prose max-w-none text-gray-700 space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      Konut Kredisi Hesaplama: Ekonomik Bir Denklemden Çok Daha Fazlası
                    </h3>

                    <div className="prose max-w-none text-gray-700 space-y-6">
                      <p className="text-lg leading-relaxed">
                        Konut kredisi hesaplama, yalnızca rakamlardan ibaret bir işlem değil aslında. Hayatınızın belki
                        de en büyük finansal kararlarından birinin temelini oluşturuyor. Benzer bir süreçten geçmiş biri
                        olarak söyleyebilirim ki, bu hesabı doğru yapmak, yalnızca matematiksel bir doğruluk meselesi
                        değil, aynı zamanda psikolojik bir rahatlık sağlama meselesi.
                      </p>

                      <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-gray-800 mb-3">Faiz Oranları Tarihsel Perspektif</h4>
                        <p className="text-gray-700">
                          Türkiye'de konut kredisi faizleri son 10 yılda inanılmaz bir dalgalanma gösterdi. 2013 yılında
                          %8'lerde seyreden faizler, 2020'de %0.8'lere kadar geriledi, şimdilerde ise %2.5-4 bandında
                          dengelenmiş durumda. Bu dalgalanmalar, konut kredisi hesaplama yaparken "doğru zaman"ın ne
                          olduğu sorusunu akıllara getiriyor.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-3">Vade Seçimi Stratejisi</h4>
                          <p className="text-sm text-green-700">
                            20 yıllık bir krediyle 10 yıllık bir krediyi karşılaştırdığınızda, aylık ödemelerde ciddi
                            farklar görebilirsiniz. Ancak unutmayın ki, vade uzadıkça toplam ödediğiniz faiz miktarı da
                            katlanarak artıyor.
                          </p>
                          <div className="mt-3 p-3 bg-white rounded border">
                            <div className="text-xs text-green-600">
                              <strong>Örnek:</strong> 500.000 TL kredi, %3 faiz
                              <br />
                              10 yıl: Toplam 582.000 TL
                              <br />
                              20 yıl: Toplam 666.000 TL
                              <br />
                              <span className="text-red-600">Fark: 84.000 TL</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-3">Peşinat Paradoksu</h4>
                          <p className="text-sm text-orange-700">
                            2015'te İstanbul'da ortalama bir dairenin fiyatı 300.000 TL civarındayken, bugün bu rakam
                            1.500.000 TL'yi aşmış durumda. %20 peşinat için gerekli olan miktar 60.000 TL'den 300.000
                            TL'ye fırlamış.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-3">Gizli Masraflar</h4>
                        <p className="text-yellow-700 leading-relaxed mb-4">
                          Bankaların uyguladığı masraflar genellikle gözden kaçan ama ciddi fark yaratan kalemler.
                          Örneğin, dosya masrafı kredi tutarının %1'i kadar olabiliyor. 500.000 TL'lik bir kredi için bu
                          5.000 TL demek.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center bg-white p-3 rounded">
                            <div className="font-semibold text-yellow-800">Dosya Masrafı</div>
                            <div className="text-yellow-600">Kredi tutarının %1'i</div>
                          </div>
                          <div className="text-center bg-white p-3 rounded">
                            <div className="font-semibold text-yellow-800">Ekspertiz</div>
                            <div className="text-yellow-600">1.000-3.000 TL</div>
                          </div>
                          <div className="text-center bg-white p-3 rounded">
                            <div className="font-semibold text-yellow-800">Sigortalar</div>
                            <div className="text-yellow-600">Yıllık %0.3-0.5</div>
                          </div>
                          <div className="text-center bg-white p-3 rounded">
                            <div className="font-semibold text-yellow-800">Toplam</div>
                            <div className="text-yellow-600">%3-5</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-3">Sabit vs Değişken Faiz</h4>
                        <p className="text-purple-700 leading-relaxed mb-4">
                          2018'de yaşananlar bunun en acı örneği. O dönemde değişken faizle kredi alanlar, bir gecede
                          ödemelerinin %40 arttığını gördüler. Sabit faiz ise bütçe planlaması yapmak isteyenler için
                          daha güvenli bir liman.
                        </p>
                        <div className="bg-white p-4 rounded border border-purple-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h5 className="font-medium text-purple-800 mb-2">Sabit Faiz Avantajları:</h5>
                              <ul className="text-purple-700 space-y-1">
                                <li>• Öngörülebilir ödemeler</li>
                                <li>• Bütçe planlaması kolaylığı</li>
                                <li>• Faiz artışından korunma</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-purple-800 mb-2">Değişken Faiz Riskleri:</h5>
                              <ul className="text-purple-700 space-y-1">
                                <li>• Ani ödeme artışları</li>
                                <li>• Ekonomik belirsizlik</li>
                                <li>• Bütçe planlaması zorluğu</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-3">Kredi Notu Etkisi</h4>
                        <p className="text-red-700 leading-relaxed mb-4">
                          2023 verilerine göre, kredi notu 1.800 ve üzeri olanlar %2.5 faiz alabilirken, 1.200 puan
                          altındakiler %4'ün üzerinde faiz ödemek zorunda kalıyor. Aradaki %1.5'luk fark, 500.000 TL'lik
                          10 yıllık bir kredide tam 85.000 TL'ye denk geliyor.
                        </p>
                        <div className="bg-white p-4 rounded border border-red-200">
                          <h5 className="font-medium text-red-800 mb-2">Kredi Notunu Yükseltmek İçin:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700">
                            <ul className="space-y-1">
                              <li>• Kredi kartı borçlarını zamanında ödeyin</li>
                              <li>• Mevcut kredilerde düzenli ödemeler yapın</li>
                            </ul>
                            <ul className="space-y-1">
                              <li>• Çok sık kredi başvurusunda bulunmayın</li>
                              <li>• Borç/gelir oranınızı düşük tutun</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-3">Erken Ödeme Stratejileri</h4>
                        <p className="text-blue-700 leading-relaxed mb-4">
                          Çoğu banka, kredinin belirli bir kısmını erken ödemeniz durumunda ceza uyguluyor. Ancak bu
                          ceza oranları bankadan bankaya değişiklik gösteriyor. Bazı bankalar %2 ceza uygularken,
                          bazıları bu oranı %5'e kadar çıkarabiliyor.
                        </p>
                        <div className="bg-white p-4 rounded border border-blue-200">
                          <div className="text-sm text-blue-700">
                            <strong>Örnek Hesaplama:</strong>
                            <br />5 yıllık kredinizin 4. yılında kalan 50.000 TL'yi kapatırsanız:
                            <br />• %2 ceza ile 1.000 TL ödersiniz
                            <br />• Ama 6.000 TL faiz ödemekten kurtulursunuz
                            <br />• <span className="text-green-600 font-semibold">Net kazanç: 5.000 TL</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-3">Uzman Tavsiyeleri</h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded border border-gray-300">
                            <p className="text-gray-700 leading-relaxed mb-3">
                              Ekonomistlerin %80'i konut kredisi ödemelerinin hane halkı gelirinin %35'ini geçmemesi
                              gerektiği konusunda hemfikir. Bu sadece bir rakam oyunu değil, hayatınızı şekillendiren
                              bir karar.
                            </p>
                            <div className="bg-blue-100 p-3 rounded">
                              <p className="text-blue-800 font-medium text-center text-sm">
                                "Doğru bilgiyle donanmış bir tüketici, her zaman daha avantajlıdır."
                              </p>
                            </div>
                          </div>

                          <div className="bg-green-100 p-4 rounded border border-green-300">
                            <h5 className="font-medium text-green-800 mb-2">Son Tavsiyeler:</h5>
                            <ul className="text-sm text-green-700 space-y-1">
                              <li>• Acele etmeyin, birkaç hafta beklemek daha uygun koşullar sağlayabilir</li>
                              <li>• En az 3-4 farklı bankanın teklifini alın ve karşılaştırın</li>
                              <li>
                                • Sadece bankaların resmi web sitelerine güvenmeyin, şubelerde daha avantajlı
                                kampanyalar olabilir
                              </li>
                              <li>• Yıl sonuna doğru bankalar hedeflerini tutturmak için daha esnek davranabilir</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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
