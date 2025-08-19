"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreditCardSearchFormProps {
  onSearch: (filters: {
    bankName: string
    cardType: string
    annualFee: string
  }) => void
}

export function CreditCardSearchForm({ onSearch }: CreditCardSearchFormProps) {
  const [bankName, setBankName] = useState("all")
  const [cardType, setCardType] = useState("all")
  const [annualFee, setAnnualFee] = useState("all")

  const handleSearch = () => {
    onSearch({
      bankName,
      cardType,
      annualFee,
    })
  }

  const handleReset = () => {
    setBankName("all")
    setCardType("all")
    setAnnualFee("all")
    onSearch({
      bankName: "all",
      cardType: "all",
      annualFee: "all",
    })
  }

  return (
    <Card className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Kredi Kartı Ara</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Banka</label>
          <Select value={bankName} onValueChange={setBankName}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Banka seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Bankalar</SelectItem>
              <SelectItem value="garanti">Garanti BBVA</SelectItem>
              <SelectItem value="yapi-kredi">Yapı Kredi</SelectItem>
              <SelectItem value="is-bankasi">İş Bankası</SelectItem>
              <SelectItem value="qnb-finansbank">QNB Finansbank</SelectItem>
              <SelectItem value="akbank">Akbank</SelectItem>
              <SelectItem value="ziraat">Ziraat Bankası</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kart Türü</label>
          <Select value={cardType} onValueChange={setCardType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Kart türü seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kartlar</SelectItem>
              <SelectItem value="classic">Klasik</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="world">World</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maksimum Yıllık Aidat</label>
          <Select value={annualFee} onValueChange={setAnnualFee}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Aidat limiti" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Aidatlar</SelectItem>
              <SelectItem value="0">Ücretsiz</SelectItem>
              <SelectItem value="200">200 TL'ye kadar</SelectItem>
              <SelectItem value="300">300 TL'ye kadar</SelectItem>
              <SelectItem value="500">500 TL'ye kadar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col justify-end">
          <div className="flex gap-2">
            <Button onClick={handleSearch} className="flex-1 bg-[#FF7A00] hover:bg-[#E66F00] text-white">
              Ara
            </Button>
            <Button onClick={handleReset} variant="outline" className="px-4 bg-transparent">
              Temizle
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
