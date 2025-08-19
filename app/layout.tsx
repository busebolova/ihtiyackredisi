import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

const dm_Sans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "İhtiyaç Kredisi | En Uygun Kredi Teklifleri",
  description:
    "Türkiye'nin en kapsamlı kredi karşılaştırma sitesi. İhtiyaç, konut, taşıt kredisi ve kredi kartı tekliflerini karşılaştırın, en uygun faiz oranlarını bulun.",
  keywords:
    "kredi karşılaştırma, ihtiyaç kredisi, konut kredisi, taşıt kredisi, kredi kartı, faiz oranları, banka teklifleri",
  authors: [{ name: "Kredi Karşılaştırma Ekibi" }],
  creator: "Kredi Karşılaştırma Platformu",
  publisher: "Kredi Karşılaştırma Platformu",
  robots: {
    index: true,
    follow: true,
  },
  // Open Graph meta tagleri - sosyal medya paylaşımları için
  openGraph: {
    title: "İhtiyaç Kredisi | En Uygun Kredi Teklifleri",
    description: "Türkiye'nin en kapsamlı kredi karşılaştırma sitesi. En uygun faiz oranlarını bulun.",
    type: "website",
    locale: "tr_TR",
    siteName: "İhtiyaç Kredisi Karşılaştırma",
    images: [
      {
        url: "/icon.png",
        width: 192,
        height: 192,
        alt: "İhtiyaç Kredisi Logo",
      },
    ],
  },
  // Twitter Card meta tagleri
  twitter: {
    card: "summary",
    title: "İhtiyaç Kredisi | En Uygun Kredi Teklifleri",
    description: "Türkiye'nin en kapsamlı kredi karşılaştırma sitesi. En uygun faiz oranlarını bulun.",
    images: ["/icon.png"],
  },
  // Favicon ve icon ayarları
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icon.png", sizes: "192x192", type: "image/png" }],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={dm_Sans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTop>
            {" "}
            {/* children'ı ScrollToTop ile sarıyoruz */}
            {children}
          </ScrollToTop>
        </ThemeProvider>
      </body>
    </html>
  )
}
