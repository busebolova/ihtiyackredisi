"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, CreditCard, Calendar, Search } from 'lucide-react'
import { useRouter } from "next/navigation" // useRouter import edildi

export function HeroSection() {
  const [loanType, setLoanType] = useState("ihtiyac")
  const [amount, setAmount] = useState("50000")
  const [maturity, setMaturity] = useState("12")

  const router = useRouter() // useRouter hook'u kullanıldı

  const maturityOptions = {
    ihtiyac: [
      { value: "3", label: "3 Ay" },
      { value: "6", label: "6 Ay" },
      { value: "12", label: "12 Ay" },
      { value: "18", label: "18 Ay" },
      { value: "24", label: "24 Ay" },
    ],
    konut: [
      { value: "36", label: "36 Ay" },
      { value: "48", label: "48 Ay" },
      { value: "60", label: "60 Ay" },
      { value: "90", label: "90 Ay" },
      { value: "120", label: "120 Ay" },
      { value: "180", label: "180 Ay" },
      { value: "240", label: "240 Ay" },
      { value: "360", label: "360 Ay" },
    ],
    tasit: [
      { value: "12", label: "12 Ay" },
      { value: "24", label: "24 Ay" },
      { value: "36", label: "36 Ay" },
      { value: "48", label: "48 Ay" },
      { value: "60", label: "60 Ay" },
    ],
  }

  useEffect(() => {
    const currentOptions = maturityOptions[loanType as keyof typeof maturityOptions]
    if (currentOptions && !currentOptions.some((option) => option.value === maturity)) {
      setMaturity(currentOptions[0].value)
    }
  }, [loanType, maturity, maturityOptions])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/[^0-9]/g, "")
    setAmount(numericValue)
  }

  const handleSearch = () => {
    // Kredi türüne göre farklı sayfalara yönlendir
    let targetPage = "";
    
    switch(loanType) {
      case "ihtiyac":
        targetPage = "/ihtiyac-kredisi";
        break;
      case "konut":
        targetPage = "/konut-kredisi";
        break;
      case "tasit":
        targetPage = "/tasit-kredisi";
        break;
      default:
        targetPage = "/ihtiyac-kredisi";
    }
    
    const queryParams = new URLSearchParams({
      loanType,
      amount,
      maturity,
    }).toString();
    
    router.push(`${targetPage}?${queryParams}`);
  };

  return (
    <section className="pt-12 md:pt-20 pb-8 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          En <span className="text-[#FF7A00]">Uygun</span> Kredi Hesaplama
        </h1>
        <div className="bg-white p-2 rounded-full shadow-lg max-w-3xl mx-auto flex items-center justify-between">
          {/* Kredi Türü */}
          <div className="flex items-center gap-3 px-4 py-2 border-r border-gray-200 flex-1">
            <Users className="w-6 h-6 text-gray-500" />
            <div className="flex flex-col items-start flex-1">
              <label htmlFor="loan-type" className="text-xs font-medium text-gray-500">
                Kredi Türü
              </label>
              <Select value={loanType} onValueChange={setLoanType}>
                <SelectTrigger
                  id="loan-type"
                  className="w-full border-none h-auto p-0 text-base font-normal outline-none focus:outline-none focus:ring-0 focus:border-0"
                >
                  <SelectValue placeholder="İhtiyaç kredisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ihtiyac">İhtiyaç kredisi</SelectItem>
                  <SelectItem value="konut">Konut Kredisi</SelectItem>
                  <SelectItem value="tasit">Taşıt Kredisi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tutar */}
          <div className="flex items-center gap-3 px-4 py-2 border-r border-gray-200 flex-1">
            <CreditCard className="w-6 h-6 text-gray-500" />
            <div className="flex flex-col items-start flex-1">
              <label htmlFor="amount" className="text-xs font-medium text-gray-500">
                Tutar
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full border-none h-auto p-0 text-base font-normal outline-none focus:outline-none focus:ring-0 focus:border-0"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
          </div>

          {/* Vade Süresi - Dinamik seçenekler */}
          <div className="flex items-center gap-3 px-4 py-2 flex-1">
            <Calendar className="w-6 h-6 text-gray-500" />
            <div className="flex flex-col items-start flex-1">
              <label htmlFor="maturity" className="text-xs font-medium text-gray-500">
                Vade Süresi
              </label>
              <Select value={maturity} onValueChange={setMaturity}>
                <SelectTrigger
                  id="maturity"
                  className="w-full border-none h-auto p-0 text-base font-normal outline-none focus:outline-none focus:ring-0 focus:border-0"
                >
                  <SelectValue placeholder="Vade Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {maturityOptions[loanType as keyof typeof maturityOptions].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bul Button - Adjusted height and padding */}
          <Button
            className="bg-[#FF7A00] hover:bg-[#E66F00] text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center justify-center h-auto ml-4"
            onClick={handleSearch} // Arama fonksiyonunu çağır
          >
            <Search className="w-5 h-5" /> Bul
          </Button>
        </div>
      </div>
    </section>
  )
}
