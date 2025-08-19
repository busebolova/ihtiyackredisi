"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface BankFilterSidebarProps {
  onFilterChange: (filters: { selectedBanks: string[]; selectedInterestRateOption: string }) => void;
  initialSelectedBanks?: string[];
  initialSelectedInterestRateOption?: string;
}

export function BankFilterSidebar({ onFilterChange, initialSelectedBanks = [], initialSelectedInterestRateOption = "" }: BankFilterSidebarProps) {
  const [selectedBanks, setSelectedBanks] = useState<string[]>(initialSelectedBanks);
  const [selectedInterestRateOption, setSelectedInterestRateOption] = useState<string>(initialSelectedInterestRateOption);

  const bankOptions = [
    "T.C. Ziraat Bankası",
    "Garanti BBVA",
    "Ziraat Katılım",
    "QNB Bank",
    "On Dijital Bank",
    "Fibabanka",
    "Türkiye İş Bankası",
    "Vakıf Bank",
    "Ziraat Bankası",
    "Albaraka Türk",
    "Türkiye Finans Katılım Bankası",
    "Halkbank",
  ];

  const handleBankChange = (bankName: string, checked: boolean) => {
    const newSelectedBanks = checked
      ? [...selectedBanks, bankName]
      : selectedBanks.filter((name) => name !== bankName);
    setSelectedBanks(newSelectedBanks);
    onFilterChange({ selectedBanks: newSelectedBanks, selectedInterestRateOption });
  };

  const handleInterestRateChange = (value: string) => {
    setSelectedInterestRateOption(value);
    onFilterChange({ selectedBanks, selectedInterestRateOption: value });
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Banka Filtreleme */}
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-b border-gray-200">
          <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:no-underline py-3">
            Banka Filtreleme
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            {bankOptions.map((bankName) => (
              <div key={bankName} className="flex items-center space-x-2">
                <Checkbox
                  id={bankName.replace(/\s+/g, '-').toLowerCase()}
                  checked={selectedBanks.includes(bankName)}
                  onCheckedChange={(checked) => handleBankChange(bankName, checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-[#FF7A00]"
                />
                <Label htmlFor={bankName.replace(/\s+/g, '-').toLowerCase()} className="text-gray-700 text-sm">
                  {bankName}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Faiz Oranı */}
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-b border-gray-200">
          <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:no-underline py-3">
            Faiz Oranı
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            <RadioGroup value={selectedInterestRateOption} onValueChange={handleInterestRateChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="zero-interest" id="zero-interest" className="data-[state=checked]:bg-[#FF7A00]" />
                <Label htmlFor="zero-interest" className="text-gray-700 text-sm">
                  Sadece %0 Faizli Teklifler
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new-user-offers" id="new-user-offers" className="data-[state=checked]:bg-[#FF7A00]" />
                <Label htmlFor="new-user-offers" className="text-gray-700 text-sm">
                  Yeni Kullanıcılara Özel Teklifler
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
