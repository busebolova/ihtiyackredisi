import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Phone, Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function IletisimPage() {
return (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
    <Header />
    <main className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline" prefetch={false}>ihtiyackredisi.com</Link> / <span className="text-[#FF7A00] font-medium">İletişim</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Contact Info & Corporate Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">İletişim</h1>
            <p className="text-gray-700 text-sm leading-relaxed mb-8">
              Garlic beef stuffed tossed onions tossed tomato dolor sausage lovers. Hawaiian hand bell fresh bbq spinach. Anchovies large black pineapple peppers pork thin meat crust.
            </p>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <div className="bg-[#FF7A00] p-3 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-600">Telefon Numaramız</div>
                  <div className="text-lg font-semibold text-gray-800 break-words">0 850 500 00 00</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <div className="bg-[#FF7A00] p-3 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-600">E-Posta Adresimiz</div>
                  <div className="text-lg font-semibold text-gray-800 break-words">contact@domain.com</div>
                </div>
              </div>
            </div>

            {/* Corporate Information */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Kurumsal Bilgilerimiz</h2>
              <div className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-4 text-sm text-gray-700">
                <div className="font-medium">Unvan</div>
                <div>AK GİRİŞİM GAYRİMENKUL İNŞAAT YAPI SANAYİ VE TİC. A.Ş.</div>
                <div className="font-medium">Vergi Dairesi</div>
                <div>Büyük Mükellefler Vergi Dairesi</div>
                <div className="font-medium">Vergi Numarası</div>
                <div>0111295529</div>
                <div className="font-medium">Mersis Numarası</div>
                <div>0011129552900001</div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">İletişim Formu</h2>
            <p className="text-gray-600 text-sm mb-6">
              Anchovies large black pineapple peppers pork thin meat crust.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Adınız ve Soyadınız</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Aslı Kahraman"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Postanız</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@mailadresi.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+90 555 123 45 67"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                <Textarea
                  id="message"
                  placeholder="Mesajınızı buraya yazın..."
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="kvkk-consent" className="border-gray-300 data-[state=checked]:bg-[#FF7A00]" />
                <label htmlFor="kvkk-consent" className="text-sm text-gray-600">
                  Verilerimin KVKK kapsamında işlenmesine izin veriyorum.
                </label>
              </div>
              <Button className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white py-2 rounded-full text-lg font-normal">
                Mesaj Gönder
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
)
}
