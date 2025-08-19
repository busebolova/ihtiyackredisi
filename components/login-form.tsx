"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="text-sm text-gray-500 mb-4">
        ihtiyackredisi.com / <span className="text-[#FF7A00] font-medium">Giriş Yap</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hesabınıza Giriş Yapın</h2>

      <form className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="E-Posta Adresiniz"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
          />
        </div>

        <div className="relative">
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder="Şifreniz"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00] pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-transparent"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-[#FF7A00]" />
            <label htmlFor="remember" className="text-gray-600">
              Beni hatırla
            </label>
          </div>
          <Link href="#" className="text-gray-600 hover:text-[#FF7A00] font-medium" prefetch={false}>
            Şifremi Unuttum
          </Link>
        </div>

        <Button className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white py-2 rounded-full text-lg font-normal">
          Giriş Yap
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hesabın yok mu?{" "}
        <Link href="/signup" className="text-[#FF7A00] hover:underline font-medium" prefetch={false}>
          Hesap Oluşturun
        </Link>
      </div>
    </div>
  )
}
