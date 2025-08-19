import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function HakkimizdaPage() {
return (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
    <Header />
    <main className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline" prefetch={false}>ihtiyackredisi.com</Link> / <span className="text-[#FF7A00] font-medium">Hakkımızda</span>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Hakkımızda</h1>
          <p className="text-gray-700 text-sm leading-relaxed mb-8">
            İhtiyaçkredisi.com, Türkiye'nin önde gelen kredi karşılaştırma platformudur. Kullanıcılarımıza en uygun kredi tekliflerini sunarak finansal kararlarını kolaylaştırmayı hedefliyoruz. Platformumuz, farklı bankaların kredi ürünlerini tek bir çatı altında toplayarak şeffaf bir karşılaştırma imkanı sunar. Güvenli altyapımız sayesinde kişisel bilgileriniz korunur ve başvurularınız hızlıca ilgili bankalara iletilir. Amacımız, kredi arayışında olan herkesin zaman ve paradan tasarruf etmesini sağlamaktır.
          </p>

          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="About Us Image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>

          {/* Vizyonumuz Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Vizyonumuz</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Vizyonumuz, Türkiye'deki bireylerin ve işletmelerin finansal okuryazarlıklarını artırarak, en doğru ve avantajlı kredi ürünlerine kolayca ulaşmalarını sağlamaktır. Teknolojiyi ve yenilikçi yaklaşımları kullanarak, finansal hizmetleri herkes için daha erişilebilir, şeffaf ve anlaşılır hale getirmeyi amaçlıyoruz. Gelecekte, finansal kararların ilk adresi olmayı ve kullanıcılarımızın güvenle tercih ettiği lider platform olmayı hedefliyoruz.
            </p>
          </div>

          {/* Misyonumuz Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Misyonumuz</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Misyonumuz, kullanıcılarımıza tarafsız ve güncel kredi bilgilerini sunarak, onların finansal hedeflerine ulaşmalarına yardımcı olmaktır. Bankaların sunduğu farklı kredi tekliflerini detaylı bir şekilde karşılaştırma imkanı sağlayarak, en uygun faiz oranları ve vade seçenekleriyle kredi bulmalarını kolaylaştırıyoruz. Güvenli, hızlı ve kullanıcı dostu bir platform sunarak, her adımda yanlarında olmayı ve finansal süreçlerini basitleştirmeyi taahhüt ediyoruz.
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
)
}
