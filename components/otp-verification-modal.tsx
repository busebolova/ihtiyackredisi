"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface OtpVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
  onResend: () => void
  phoneNumber?: string // Opsiyonel olarak telefon numarasını gösterebiliriz
}

export function OtpVerificationModal({ isOpen, onClose, onVerify, onResend, phoneNumber }: OtpVerificationModalProps) {
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(60) // 60 saniye başlangıç
  const [canResend, setCanResend] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isOpen) {
      setCountdown(60)
      setCanResend(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isOpen])

  const handleResend = () => {
    setOtp("") // Kodu sıfırla
    onResend()
    setCountdown(60)
    setCanResend(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-xl shadow-lg">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-bold text-gray-800 text-center">
            Telefon Numaranıza Doğrulama Kodu Gönderdik
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
            aria-label="Kapat"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="otp"
            type="text"
            placeholder="109-123"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-center text-lg tracking-widest focus:ring-[#FF7A00] focus:border-[#FF7A00]"
            maxLength={6} // Genellikle 6 haneli olur
          />
          <div className="text-center text-sm text-gray-600">
            {canResend ? (
              <Button variant="link" onClick={handleResend} className="text-[#FF7A00] hover:underline p-0 h-auto">
                Tekrar Kod Gönder
              </Button>
            ) : (
              <span>
                {countdown} Saniye sonra <span className="text-gray-400 cursor-not-allowed">Tekrar Kod Gönder</span>
              </span>
            )}
          </div>
        </div>
        <Button
          onClick={() => onVerify(otp)}
          className="w-full bg-[#FF7A00] hover:bg-[#E66F00] text-white py-2 rounded-full text-lg font-normal"
        >
          Doğrula
        </Button>
      </DialogContent>
    </Dialog>
  )
}
