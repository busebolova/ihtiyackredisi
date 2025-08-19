"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "İhtiyaçkredisi.com nedir ve nasıl çalışır?",
    answer:
      "İhtiyaçkredisi.com, Türkiye'deki bankaların güncel kredi tekliflerini tek bir platformda toplayarak kullanıcıların kolayca karşılaştırma yapmasını sağlayan bir online kredi karşılaştırma sitesidir. İhtiyaç, konut ve taşıt kredisi gibi farklı kredi türleri için faiz oranlarını, vade seçeneklerini ve aylık taksit tutarlarını anında görebilir, size en uygun teklife başvurabilirsiniz.",
  },
  {
    question: "Kredi başvurusu yapmak ücretli mi?",
    answer:
      "Hayır, İhtiyaçkredisi.com üzerinden kredi tekliflerini karşılaştırmak ve bankalara başvuru yapmak tamamen ücretsizdir. Herhangi bir gizli ücret veya komisyon talep edilmez.",
  },
  {
    question: "Kişisel bilgilerim güvende mi?",
    answer:
      "Evet, kişisel bilgilerinizin güvenliği bizim için en önemli önceliktir. Platformumuz SSL şifreleme teknolojisi ile korunmaktadır ve bilgileriniz KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında gizlilik politikamıza uygun olarak işlenir ve yalnızca ilgili bankalarla paylaşılır.",
  },
  {
    question: "Kredi notum düşükse yine de kredi çekebilir miyim?",
    answer:
      "Kredi notu, bankaların kredi değerlendirmesinde önemli bir faktördür. Ancak düşük kredi notuna sahip olsanız bile, bazı bankaların esnek koşulları veya yeni müşterilere özel kampanyaları olabilir. Platformumuzda farklı bankaların tekliflerini inceleyerek size uygun bir seçenek bulma ihtimaliniz bulunmaktadır.",
  },
  {
    question: "Faizsiz kredi teklifleri gerçek mi?",
    answer:
      "Evet, bazı bankalar yeni müşterilerine veya belirli kampanyalar dahilinde %0 faizli kredi veya taksitli nakit avans imkanları sunabilmektedir. İhtiyaçkredisi.com olarak bu tür güncel faizsiz teklifleri de platformumuzda listeliyoruz. Teklif detaylarını inceleyerek şartları hakkında bilgi edinebilirsiniz.",
  },
  {
    question: "Kredi başvurum ne kadar sürede sonuçlanır?",
    answer:
      "Kredi başvurularının sonuçlanma süresi bankadan bankaya ve başvuru türüne göre değişiklik gösterebilir. Genellikle online başvurular birkaç dakika ile birkaç saat içinde ön onay alabilirken, kesin onay ve kullandırım süreci bankanın yoğunluğuna ve ek belge taleplerine göre değişebilir.",
  },
]

export default function SikcaSorulanSorularPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      <Header />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline" prefetch={false}>ihtiyackredisi.com</Link> / <span className="text-[#FF7A00] font-medium">Sıkça Sorulan Sorular</span>
          </div>

          {/* Main Content */}
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Sıkça Sorulan Sorular</h1>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-200 data-[state=open]:bg-white data-[state=open]:rounded-xl data-[state=open]:shadow-md data-[state=open]:mb-4 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-lg text-gray-700 hover:no-underline py-4 data-[state=open]:text-gray-800 flex items-center">
                    <span className="flex-1 pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4 pl-4 pr-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
