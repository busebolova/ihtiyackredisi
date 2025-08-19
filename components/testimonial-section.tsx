import { TestimonialCard } from "@/components/testimonial-card"

const testimonials = [
  {
    rating: 5,
    comment:
      "Garanti BBVA'dan aldığım ihtiyaç kredisi gerçekten çok avantajlıydı. Dijital kanallar üzerinden başvuru yapmak çok kolaydı ve faiz oranları oldukça rekabetçiydi. 28 milyon müşteriye hizmet veren bir bankanın deneyimi gerçekten fark yaratıyor.",
    author: "Mehmet Özkan",
  },
  {
    rating: 5,
    comment:
      "Akbank'ın dijital dönüşümü gerçekten etkileyici. Mobil uygulama üzerinden kredi başvurum dakikalar içinde onaylandı. 25 yıllık müşteri deneyimim boyunca bu kadar hızlı bir süreç görmemiştim. Axess kartımla da ek avantajlar elde ediyorum.",
    author: "Fatma Demir",
  },
  {
    rating: 4,
    comment:
      "Ziraat Bankası'nın 160 yıllık köklü geçmişi güven veriyor. Tarım sektöründeki uzmanlıkları sayesinde işletme kredim için çok uygun şartlar sunuldu. Dijital bankacılık hizmetleri de oldukça gelişmiş durumda.",
    author: "Ahmet Yıldırım",
  },
  {
    rating: 5,
    comment:
      "İhtiyaçkredisi.com sayesinde banka banka gezmeden en uygun kredi teklifini buldum. Süreç çok hızlı ve kolaydı, herkese tavsiye ederim!",
    author: "Ayşe Yılmaz",
  },
  {
    rating: 4,
    comment:
      "Kredi başvurumda çok yardımcı oldular. Farklı bankaların tekliflerini karşılaştırmak harika bir özellik. Teşekkürler!",
    author: "Ali Durmaz",
  },
  {
    rating: 5,
    comment:
      "Hızlı ve güvenilir bir platform. İhtiyaç kredisi arayışımda bana çok zaman kazandırdı. Kesinlikle tekrar kullanacağım.",
    author: "Muhammed Erhan",
  },
]

export function TestimonialSection() {
  return (
    <section className="bg-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Ziyaretçilerimiz Ne Düşünüyor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
