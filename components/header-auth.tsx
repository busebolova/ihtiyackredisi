import Link from "next/link"
import Image from "next/image" // Image bileşeni import edildi

export function HeaderAuth() {
  return (
    <header className="bg-white shadow-sm py-2 px-6 md:px-8 flex items-center justify-center sticky top-0 z-50 border-b border-gray-100">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image
          src="/images/ihtiyackredisi-logo.png"
          alt="ihtiyackredisi.com Logo"
          width={180} // Genişliği ayarlayın
          height={40} // Yüksekliği ayarlayın
          priority // LCP elementi olduğu için öncelikli yükle
        />
      </Link>
    </header>
  )
}
