"use client"

import { useSearchParams } from "next/navigation"
import { BankFilterSidebar } from "@/components/bank-filter-sidebar"
// import { LoanSearchForm } from "@/components/loan-search-form" // LoanSearchForm artık kullanılmayacak
import { BankOfferCard } from "@/components/bank-offer-card"
import { generatePaymentPlan } from "@/lib/loan-calculations"
import { useState, useEffect } from "react"
import Link from "next/link"

const allBankOffers = [
  {
    bankLogoSrc: "/bank-logos/albaraka.webp",
    bankName: "Albaraka Türk",
    rating: 4.0,
    interestRate: "%0.00",
    loanAllocationFeeRate: 0.005,
    type: "short-term",
  },
  {
    bankLogoSrc: "/bank-logos/on-dijital-bank.webp",
    bankName: "ON Dijital Bank",
    rating: 4.2,
    interestRate: "%0.00",
    loanAllocationFeeRate: 0.005,
    type: "short-term",
  },
  {
    bankLogoSrc: "/bank-logos/enpara.webp",
    bankName: "Enpara.com",
    rating: 5.0,
    interestRate: "%0.00",
    loanAllocationFeeRate: 0.005,
    type: "short-term",
  },
  {
    bankLogoSrc: "/bank-logos/cepteteb.webp",
    bankName: "CEPTETEB",
    rating: 4.1,
    interestRate: "%0.00",
    loanAllocationFeeRate: 0.005,
    type: "short-term",
  },
  {
    bankLogoSrc: "/bank-logos/denizbank.webp",
    bankName: "DenizBank",
    rating: 4.0,
    interestRate: "%0.00",
    loanAllocationFeeRate: 0.005,
    type: "short-term",
  },
]

export function FaizsizKrediPageClientContent() {
  const searchParams = useSearchParams()

  const amount = searchParams.get("amount") || "15000"
  const maturity = searchParams.get("maturity") || "6"
  const loanType = "ihtiyac" // Faizsiz kredi için varsayılan olarak 'ihtiyac' olarak sabit tutulabilir veya kaldırılabilir. LoanSearchForm'da gizlenecek.

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

    // Faizsiz kredi sayfasında sadece %0 faizli teklifleri göster
    currentProcessedOffers = currentProcessedOffers.filter(
      (offer) => Number.parseFloat(offer.interestRate.replace("%", "").replace(",", ".")) === 0,
    )

    if (selectedBanks.length > 0) {
      currentProcessedOffers = currentProcessedOffers.filter((offer) => selectedBanks.includes(offer.bankName))
    }

    // "Yeni müşterilere özel" filtresi bu sayfada geçerli olmayabilir, duruma göre ayarlanabilir.
    // if (selectedInterestRateOption === "new-user-offers") {
    //   currentProcessedOffers = currentProcessedOffers.filter(offer => offer.isNewUserOffer);
    // }

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
          / Faizsiz Kredi
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            %0 Faizli Kredi Tekliflerini Karşılaştırın
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Sadece %0 faiz oranına sahip özel kredi tekliflerini keşfedin. Kısa vadeli finansman ihtiyaçlarınız için en
            uygun faizsiz kredi seçeneklerini karşılaştırın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <BankFilterSidebar onFilterChange={handleFilterChange} />

          <div>
            {/* LoanSearchForm kaldırıldı */}
            {/* <LoanSearchForm
              initialLoanType={loanType}
              initialAmount={amount}
              initialMaturity={maturity}
              hideLoanType={true}
              hideAmount={true}
              hideMaturity={true}
              hideSearchButton={true}
            /> */}

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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Faizsiz Kredi Hakkında Genel Bilgiler</h2>

              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg leading-relaxed mb-4">
                  Faizsiz krediler, özellikle kısa vadeli finansman ihtiyaçları için bankaların sunduğu özel kampanya
                  kredileridir. Bu krediler genellikle yeni müşterilere veya mevcut müşterilere özel promosyonlar
                  kapsamında sunulmaktadır.
                </p>

                <p className="leading-relaxed mb-6">
                  Türkiye'de önde gelen bankalar olan Albaraka Türk, ON Dijital Bank, Enpara.com, TEB ve DenizBank gibi
                  kurumlar dijital kanalları üzerinden bu özel teklifleri müşterilerine sunmaktadır. Bu bankalar,
                  müşteri memnuniyetini artırmak ve yeni müşteri kazanmak amacıyla belirli dönemlerde %0 faizli kredi
                  kampanyaları düzenlemektedir.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    %0 Faiz Avantajı
                  </h3>
                  <p className="text-sm text-blue-700">
                    Hiç faiz ödemeden kredi kullanabilirsiniz. Sadece anapara ve minimal tahsis ücreti ödersiniz.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Hızlı Onay Süreci
                  </h3>
                  <p className="text-sm text-green-700">
                    Dijital kanallar üzerinden dakikalar içinde başvuru yapabilir ve hızlı onay alabilirsiniz.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Esnek Vade Seçenekleri
                  </h3>
                  <p className="text-sm text-orange-700">
                    3-6 ay arası vade seçenekleri ile ödeme planınızı ihtiyaçlarınıza göre ayarlayabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Başvuru Şartları ve Önemli Notlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Genel Şartlar</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>18-65 yaş aralığında olmak</li>
                      <li>Düzenli gelir belgesi</li>
                      <li>Kredi notu uygunluğu</li>
                      <li>Kimlik ve ikametgah belgesi</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Dikkat Edilecek Hususlar</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Kampanya süreleri sınırlıdır</li>
                      <li>Tahsis ücreti %0.5 oranında alınır</li>
                      <li>Erken ödeme seçenekleri mevcuttur</li>
                      <li>Kredi tutarı gelir durumuna göre belirlenir</li>
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
                <div className="prose max-w-none text-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Sıfır Faizli Kredi: Rüya mı, Gerçek mi?</h2>

                  <p className="text-lg leading-relaxed mb-4">
                    Sıfır faizli kredi denildiğinde insanın aklına hemen "bedava para" geliyor. Kim istemez ki? Faiz
                    ödemeden, sadece ana parayı geri ödeyeceğin bir kredi… Ama işin aslı göründüğü kadar basit değil.
                    Ekonomi, matematiğiyle acımasız bir oyun oynar bize. Piyasada dolaşan her "sıfır faiz" vaadi,
                    mutlaka bir başka masrafı, bir başka maliyeti saklar cebinde.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Gerçekten Faizsiz Kredi Var mı?</h3>
                  <p className="leading-relaxed mb-4">
                    Önce şunu netleştirelim: Gerçekten faizsiz kredi diye bir şey yok. En azından klasik bankacılık
                    sisteminde. Çünkü bankalar para kazanmak için var. Onlar hayır kurumu değil. Peki bu kadar reklamı
                    yapılan "sıfır faizli kredi"ler neyin nesi? Genelde ya kampanya dönemlerinde belirli bir vade için
                    sunulan promosyonlar oluyor ya da faiz maliyeti başka kalemlere yediriliyor.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Gizli Maliyetler</h3>
                  <p className="leading-relaxed mb-4">
                    Bir örnek verelim: 2023'ün ilk çeyreğinde bir banka, 12 ay vadeli "sıfır faizli" konut kredisi
                    kampanyası başlattı. Aylık %0 faiz diye büyük puntolarla duyuruldu. Ancak küçük yazıya baktığınızda,
                    kredinin toplam maliyetinin aslında yıllık %15'e yakın olduğunu görüyorsunuz. Nasıl mı? Kredi
                    tutarının %3'ü dosya masrafı, %1'i hayat sigortası, ayrıca her ay sabit bir "hizmet bedeli" çıkıyor
                    karşınıza.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Gerçek Faizsiz Kredi Seçenekleri</h3>
                  <p className="leading-relaxed mb-4">
                    Peki gerçekten avantajlı sıfır faizli kredi seçenekleri hiç mi yok? Var tabii, ama bunlar genellikle
                    tüketici kredilerinden ziyade üreticiye yönelik destek paketlerinde karşımıza çıkıyor. Mesela
                    KOSGEB'in girişimcilere sunduğu bazı destek kredilerinde faiz sıfırlanabiliyor. Ya da tarım
                    kredilerinde devlet faiz desteği sağlayarak çiftçiyi rahatlatmaya çalışıyor.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Kimler İçin Uygun?</h3>
                  <p className="leading-relaxed mb-4">
                    Peki bu krediler kimler için uygun? Eğer nakit sıkışıklığınız varsa ve kısa vadede
                    ödeyebilecekseniz, evet, sıfır faizli kampanyalar işinize yarayabilir. Ama uzun vadede
                    borçlanacaksanız, faiz oranından çok "toplam geri ödeme"ye bakmalısınız. Çünkü bazı bankalar düşük
                    faiz verip uzun vadede yüksek masraflarla sizi vuracaktır.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tarihsel Gelişim</h3>
                  <p className="leading-relaxed mb-4">
                    Sıfır faizli kredi kavramı aslında yeni değil. 2008 küresel finans krizi sonrasında birçok ülkede
                    merkez bankaları faizleri sıfıra yakın seviyelere çekmişti. Amaç, ekonomiyi canlandırmaktı.
                    Türkiye'de ise bu tür kampanyalar daha çok perakende bankacılık alanında 2010'ların ortalarından
                    itibaren yaygınlaştı.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Sonuç</h3>
                  <p className="leading-relaxed mb-4">
                    Sonuç olarak, sıfır faizli kredi kampanyaları her zaman göründüğü kadar cazip olmayabilir. Eğer kısa
                    vadeli bir ihtiyacınız varsa ve tüm masrafları hesapladıktan sonra hala avantajlı görünüyorsa, neden
                    olmasın? Ancak uzun vadeli bir borçlanmaya girecekseniz, mutlaka farklı bankaları karşılaştırmalı ve
                    ihtiyackredisi.com gibi güvenilir bir kredi karşılaştırma platformundan destek almalısınız.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-600 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">%0 Faizli Kredi Tekliflerini Karşılaştırın</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
                Sadece %0 faiz oranına sahip özel kredi tekliflerini keşfedin. Kısa vadeli finansman ihtiyaçlarınız için
                en uygun faizsiz kredi seçeneklerini karşılaştırın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
