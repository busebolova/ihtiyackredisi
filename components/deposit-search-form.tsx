"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface DepositSearchFormProps {
  initialAmount?: string
  initialMaturity?: string
}

export function DepositSearchForm({ initialAmount = "10000", initialMaturity = "3" }: DepositSearchFormProps) {
  const [amount, setAmount] = useState(initialAmount)
  const [maturity, setMaturity] = useState(initialMaturity)
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams({
      amount,
      maturity,
    })
    router.push(`/mevduat-faizi?${params.toString()}`)
  }

  return (
    <Card className="mb-8 shadow-lg border-0">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mevduat Tutarı</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10.000"
              className="h-12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vade Süresi</label>
            <Select value={maturity} onValueChange={setMaturity}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Vade seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Ay</SelectItem>
                <SelectItem value="3">3 Ay</SelectItem>
                <SelectItem value="6">6 Ay</SelectItem>
                <SelectItem value="12">12 Ay</SelectItem>
                <SelectItem value="24">24 Ay</SelectItem>
                <SelectItem value="36">36 Ay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Mevduat Tekliflerini Bul
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
