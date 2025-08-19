"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const faqs = [
  {
    question: "Neden İhtiyaçkredisi.com'u tercih etmeliyim?",
    answer:
      "İhtiyaçkredisi.com, Türkiye'nin önde gelen kredi karşılaştırma platformudur. En uygun kredi tekliflerini bulmak için hemen karşılaştırmaya başlayın. Geniş banka ağı, kolay karşılaştırma araçları ve güvenli başvuru süreci ile size en iyi deneyimi sunarız.",
  },
  {
    question: "Kredi başvurusu için hangi belgeler gerekli?",
    answer:
      "Genellikle kimlik belgesi, gelir belgesi (maaş bordrosu, vergi levhası vb.) ve ikametgah belgesi istenir. Bankadan bankaya farklılık gösterebilir.",
  },
  {
    question: "Kredi notum düşükse kredi çekebilir miyim?",
    answer:
      "Kredi notu, bankaların kredi değerlendirmesinde önemli bir faktördür. Düşük kredi notuyla kredi çekmek zor olabilir ancak bazı bankalar daha esnek koşullar sunabilir.",
  },
  {
    question: "Online kredi başvurusu güvenli mi?",
    answer:
      "Evet, ihtiyaçkredisi.com üzerinden yapılan başvurular SSL şifreleme ile korunmaktadır. Bilgileriniz güvenli bir şekilde bankalara iletilir.",
  },
  {
    question: "Kredi hesaplama aracı nasıl çalışır?",
    answer:
      "Kredi hesaplama aracımız, girdiğiniz kredi tutarı, vade ve faiz oranına göre aylık ödeme ve toplam geri ödeme tutarını otomatik olarak hesaplar.",
  },
]

export function FAQSection() {
  const [showFullText, setShowFullText] = useState(false)

  const toggleShowFullText = () => {
    setShowFullText(!showFullText)
  }

  const aboutTextPart1 =
    "İhtiyaçkredisi.com, Türkiye'nin önde gelen kredi karşılaştırma platformudur. Kullanıcılarımıza en uygun kredi tekliflerini sunarak finansal kararlarını kolaylaştırmayı hedefliyoruz."
  const aboutTextPart2 =
    " Platformumuz, farklı bankaların kredi ürünlerini tek bir çatı altında toplayarak şeffaf bir karşılaştırma imkanı sunar. Güvenli altyapımız sayesinde kişisel bilgileriniz korunur ve başvurularınız hızlıca ilgili bankalara iletilir. Amacımız, kredi arayışında olan herkesin zaman ve paradan tasarruf etmesini sağlamaktır."

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">Sıkça Sorulan Sorular</h2>
      <p className="text-gray-600 text-center mb-8">Sadece ihtiyackredisi.com'a özel harika fırsatlar.</p>
      <div className="max-w-3xl mx-auto">
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
      <div className="max-w-3xl mx-auto mt-12 p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">İhtiyaçkredisi.com Hakkında</h3>
        <p className="text-gray-600 text-sm leading-relaxed inline">
          {aboutTextPart1}
          {!showFullText && (
            <Button
              variant="link"
              onClick={toggleShowFullText}
              className="text-[#FF7A00] hover:underline p-0 h-auto inline-block ml-1"
            >
              Daha fazla gör
            </Button>
          )}
          {showFullText && aboutTextPart2}
        </p>
        {showFullText && (
          <Button
            variant="link"
            onClick={toggleShowFullText}
            className="text-[#FF7A00] hover:underline p-0 h-auto mt-2 block"
          >
            Daha az gör
          </Button>
        )}
      </div>
    </section>
  )
}
