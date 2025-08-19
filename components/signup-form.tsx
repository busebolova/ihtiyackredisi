"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { OtpVerificationModal } from "@/components/otp-verification-modal" // OTP modalını import ediyoruz

export function SignupForm() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false) // OTP modalının açık olup olmadığını kontrol eden state
  const [phoneNumber, setPhoneNumber] = useState("") // Telefon numarasını tutmak için state

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada normalde form validasyonu ve backend'e kayıt isteği gönderilir.
    // Başarılı olursa veya telefon doğrulaması gerekiyorsa modalı açarız.
    // Şimdilik doğrudan modalı açıyoruz.
    setIsOtpModalOpen(true)
  }

  const handleOtpVerify = (otp: string) => {
    console.log("OTP Doğrulandı:", otp)
    // Burada OTP'yi backend'e gönderip doğrulatma işlemi yapılır.
    // Başarılı olursa modalı kapatıp kullanıcıyı yönlendirebiliriz.
    setIsOtpModalOpen(false)
    // Örneğin: router.push('/dashboard');
  }

  const handleOtpResend = () => {
    console.log("OTP Tekrar Gönderildi")
    // Burada backend'e yeni bir OTP gönderme isteği yapılır.
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="text-sm text-gray-500 mb-4">
        ihtiyackredisi.com / <span className="text-[#FF7A00] font-normal">Kayıt Ol</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ücretsiz Kayıt Ol</h2>

      <form className="space-y-4" onSubmit={handleSignup}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Adınız"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Soyadınız"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
            />
          </div>
        </div>

        <div>
          <Input
            type="email"
            placeholder="ornek@mailadresi.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00]"
          />
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Telefonunuz"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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

        <div className="relative">
          <Input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Şifreniz (Tekrardan)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#FF7A00] focus:border-[#FF7A00] pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-transparent"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            {confirmPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Checkbox id="terms" className="border-gray-300 data-[state=checked]:bg-[#FF7A00]" />
          <label htmlFor="terms" className="text-gray-600">
            <Link href="#" className="text-[#FF7A00] hover:underline font-normal" prefetch={false}>
              İhtiyaçkredisi.com Üyelik Sözleşmesi
            </Link>
            'ni okudum ve kabul ediyorum.
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white py-2 rounded-full text-lg font-normal"
        >
          Hesap Oluştur
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Zaten hesabın var mı?{" "}
        <Link href="/login" className="text-[#FF7A00] hover:underline font-normal" prefetch={false}>
          Giriş Yap
        </Link>
      </div>

      {/* OTP Doğrulama Modalı */}
      <OtpVerificationModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerify={handleOtpVerify}
        onResend={handleOtpResend}
        phoneNumber={phoneNumber}
      />
    </div>
  )
}
