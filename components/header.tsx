"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BadgePercent, Banknote, Home, Car, CreditCard, Gift, BarChart3, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [menuAcikMi, setMenuAcikMi] = useState(false)

  const navigasyonOgeleri = [
    { href: "/faizsiz-kredi", label: "Faizsiz Kredi", icon: BadgePercent },
    { href: "/ihtiyac-kredisi", label: "İhtiyaç Kredisi", icon: Banknote },
    { href: "/konut-kredisi", label: "Konut Kredisi", icon: Home },
    { href: "/tasit-kredisi", label: "Taşıt Kredisi", icon: Car },
    { href: "/kredi-karti", label: "Kredi Kartı", icon: CreditCard },
    { href: "/promosyon", label: "Promosyon", icon: Gift },
    { href: "/mevduat-faizi", label: "Mevduat Faizi", icon: BarChart3 },
  ]

  return (
    <header className="w-full bg-white flex items-center justify-center py-2 px-6 md:px-8 sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src="/images/ihtiyackredisi-logo.png"
            alt="Kredi Karşılaştırma Platformu Logo"
            width={180}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center justify-center flex-grow gap-6 text-sm font-medium">
          {navigasyonOgeleri.map((oge) => {
            const IkonBileseni = oge.icon
            return (
              <Link
                key={oge.href}
                href={oge.href}
                className="hover:text-primary transition-colors flex flex-col items-center gap-1"
                prefetch={false}
              >
                <IkonBileseni className="w-5 h-5 text-blue-600" />
                {oge.label}
              </Link>
            )
          })}
        </nav>

        <div className="lg:hidden">
          <Sheet open={menuAcikMi} onOpenChange={setMenuAcikMi}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="text-lg font-semibold text-gray-800 mb-4">Kredi Menüsü</div>
                {navigasyonOgeleri.map((oge) => {
                  const IkonBileseni = oge.icon
                  return (
                    <Link
                      key={oge.href}
                      href={oge.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      prefetch={false}
                      onClick={() => setMenuAcikMi(false)}
                    >
                      <IkonBileseni className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 font-medium">{oge.label}</span>
                    </Link>
                  )
                })}
                {/* 
                <div className="border-t pt-4 mt-4">
                  <Link href="/login" onClick={() => setMenuAcikMi(false)}>
                    <Button className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white rounded-full px-6 py-2 flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Giriş / Üyelik
                    </Button>
                  </Link>
                </div>
                */}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 
        <Link href="/login" passHref className="hidden lg:block">
          <Button className="bg-[#FF7A00] hover:bg-[#E66F00] text-white rounded-full px-6 py-2 flex items-center gap-2">
            <LogIn className="w-4 h-4 mr-1" />
            Giriş / Üyelik
          </Button>
        </Link>
        */}
      </div>
    </header>
  )
}
