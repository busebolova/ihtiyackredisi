"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react'

interface LoanSearchFormProps {
  initialLoanType?: string;
  initialAmount?: string;
  initialMaturity?: string;
  hideLoanType?: boolean;
  hideAmount?: boolean;
  hideMaturity?: boolean;
  hideSearchButton?: boolean;
}

export function LoanSearchForm({
  initialLoanType = "ihtiyac",
  initialAmount = "50000",
  initialMaturity = "12",
  hideLoanType = false,
  hideAmount = false,
  hideMaturity = false,
  hideSearchButton = false,
}: LoanSearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loanType, setLoanType] = useState(initialLoanType);
  const [amount, setAmount] = useState(initialAmount);
  const [maturity, setMaturity] = useState(initialMaturity);

  // URL'deki parametreleri başlangıç değerleri olarak kullan
  useEffect(() => {
    setLoanType(searchParams.get('loanType') || initialLoanType);
    setAmount(searchParams.get('amount') || initialAmount);
    setMaturity(searchParams.get('maturity') || initialMaturity);
  }, [searchParams, initialLoanType, initialAmount, initialMaturity]);


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    router.push(
      pathname +
      "?" +
      createQueryString("loanType", loanType) +
      "&" +
      createQueryString("amount", amount) +
      "&" +
      createQueryString("maturity", maturity)
    );
  };

  const getBorderClass = () => {
    let count = 0;
    if (!hideLoanType) count++;
    if (!hideAmount) count++;
    if (!hideMaturity) count++;
    if (!hideSearchButton) count++; // Consider search button as part of form elements for border logic

    if (count === 1) return "rounded-full";
    if (count > 1) {
      if (!hideLoanType && !hideAmount && !hideMaturity && !hideSearchButton) {
        return ""; // All visible, no special border
      }
      if (hideLoanType && hideAmount && hideMaturity && !hideSearchButton) {
        return "rounded-full"; // Only button visible
      }
    }
    return "rounded-full"; // Default or other cases, maintain rounded
  };


  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-full shadow-lg p-2 flex items-center mb-8 sticky top-20 z-10 w-full`}>
      {!hideLoanType && (
        <div className="flex-1 px-4 border-r">
          <Label htmlFor="loan-type" className="text-xs text-gray-500 block">Kredi Türü</Label>
          <Select value={loanType} onValueChange={setLoanType}>
            <SelectTrigger id="loan-type" className="w-full border-none shadow-none h-auto p-0 focus:ring-0 text-base font-semibold">
              <SelectValue placeholder="Kredi Türü Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ihtiyac">İhtiyaç Kredisi</SelectItem>
              <SelectItem value="konut">Konut Kredisi</SelectItem>
              <SelectItem value="tasit">Taşıt Kredisi</SelectItem>
              <SelectItem value="faizsiz">Faizsiz Kredi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {!hideAmount && (
        <div className="flex-1 px-4 border-r">
          <Label htmlFor="amount" className="text-xs text-gray-500 block">Tutar (TL)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Örn: 50.000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-none shadow-none h-auto p-0 text-base font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      )}

      {!hideMaturity && (
        <div className="flex-1 px-4 border-r">
          <Label htmlFor="maturity" className="text-xs text-gray-500 block">Vade (Ay)</Label>
          <Input
            id="maturity"
            type="number"
            placeholder="Örn: 12"
            value={maturity}
            onChange={(e) => setMaturity(e.target.value)}
            className="w-full border-none shadow-none h-auto p-0 text-base font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      )}

      {!hideSearchButton && (
        <Button type="submit" className={`bg-[#FF7A00] hover:bg-[#E66F00] text-white font-bold py-3 px-6 h-auto ${getBorderClass()}`}>
          <Search className="w-5 h-5 mr-2" />
          Bul
        </Button>
      )}
    </form>
  )
}
