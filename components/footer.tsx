import type React from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, X, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-[#FF7A00] pb-1 inline-block">{children}</h3>
  )

  return (
    <footer className="bg-gray-50 text-gray-700 py-12 md:py-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-200">
          {/* Left Column: Logo & Contact Info */}
          <div className="flex flex-col items-start">
            <Link href="#" className="mb-4" prefetch={false}>
              <div className="text-3xl font-bold">
                <span className="text-[#FF7A00]">ihtiyaçkredisi</span>
                <span className="text-gray-800">.com</span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 mb-4">En Uygun Kredi Hesaplama</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-600" />
                <span>0 850 666 77 88</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-600" />
                <span>mail@ihtiyackredisi.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                <span>Sinanpaşa Mah. Süleyman Seba Cad. No:14/5 Beşiktaş / İstanbul</span>
              </div>
            </div>
          </div>

          {/* Middle Column: Kurumsal */}
          <div>
            <SectionHeading>Kurumsal</SectionHeading>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/sikca-sorulan-sorular" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* New Column: Hızlı Linkler */}
          <div>
            <SectionHeading>Hızlı Linkler</SectionHeading>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Kredi Hesaplama
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Kredi Başvurusu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Kredi Notu Sorgulama
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Kredi Kartları
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Yasal */}
          <div>
            <SectionHeading>Yasal</SectionHeading>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kullanim-kosullari" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Kişisel Verilerin Korunması
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="hover:text-[#FF7A00] transition-colors" prefetch={false}>
                  Aydınlatma Metni
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section: Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-200">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Şirket Bilgileri</h3>
            <p className="text-sm text-gray-600">AK GİRİŞİM GAYRİMENKUL İNŞAAT YAPI SANAYİ VE TİC. A.Ş.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Vergi Dairesi</h3>
            <p className="text-sm text-gray-600">Beşiktaş V.D. 0111295529</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Mersis No</h3>
            <p className="text-sm text-gray-600">0011129552900001</p>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>
            &copy; {currentYear} ihtiyackredisi.com &reg; {currentYear} tescilli bir marka olup, markanın kullanım hakkı
            AK GİRİŞİM GAYRİMENKUL İNŞAAT YAPI SANAYİ VE TİC. A.Ş.'ye aittir.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-600 hover:text-[#FF7A00] transition-colors" prefetch={false}>
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-[#FF7A00] transition-colors" prefetch={false}>
              <X className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-[#FF7A00] transition-colors" prefetch={false}>
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
