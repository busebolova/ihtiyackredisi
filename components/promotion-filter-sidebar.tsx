"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface PromotionFilterSidebarProps {
  onFilterChange: (filters: { selectedBanks: string[]; selectedPromotionTypes: string[] }) => void;
  initialSelectedBanks?: string[];
  initialSelectedPromotionTypes?: string[];
}

export function PromotionFilterSidebar({ onFilterChange, initialSelectedBanks = [], initialSelectedPromotionTypes = [] }: PromotionFilterSidebarProps) {
  const [selectedBanks, setSelectedBanks] = useState<string[]>(initialSelectedBanks);
  const [selectedPromotionTypes, setSelectedPromotionTypes] = useState<string[]>(initialSelectedPromotionTypes);

  const bankOptions = [
    "Garanti BBVA",
    "Akbank",
    "QNB Finansbank",
    "Yapı Kredi",
    "Türkiye İş Bankası",
    "Ziraat Bankası",
    "Albaraka Türk",
    "ON Dijital Bank",
    "Enpara.com",
    "CEPTETEB",
    "DenizBank",
    "Halkbank",
  ];

  const promotionTypeOptions = [
    "Faizsiz Kredi",
    "Kredi Kartı Kampanyası",
    "Mevduat Promosyonu",
    "Yeni Müşteri Kampanyası",
    "Taksitli Nakit Avans",
  ];

  const handleBankChange = (bankName: string, checked: boolean) => {
    const newSelectedBanks = checked
      ? [...selectedBanks, bankName]
      : selectedBanks.filter((name) => name !== bankName);
    setSelectedBanks(newSelectedBanks);
    onFilterChange({ selectedBanks: newSelectedBanks, selectedPromotionTypes });
  };

  const handlePromotionTypeChange = (type: string, checked: boolean) => {
    const newSelectedPromotionTypes = checked
      ? [...selectedPromotionTypes, type]
      : selectedPromotionTypes.filter((name) => name !== type);
    setSelectedPromotionTypes(newSelectedPromotionTypes);
    onFilterChange({ selectedBanks, selectedPromotionTypes: newSelectedPromotionTypes });
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
                  id={`bank-${bankName.replace(/\s+/g, '-').toLowerCase()}`}
                  checked={selectedBanks.includes(bankName)}
                  onCheckedChange={(checked) => handleBankChange(bankName, checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-[#FF7A00]"
                />
                <Label htmlFor={`bank-${bankName.replace(/\s+/g, '-').toLowerCase()}`} className="text-gray-700 text-sm">
                  {bankName}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Promosyon Türü */}
      <Accordion type="single" collapsible defaultValue="item-2" className="w-full">
        <AccordionItem value="item-2" className="border-b border-gray-200">
          <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:no-underline py-3">
            Promosyon Türü
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            {promotionTypeOptions.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`promo-type-${type.replace(/\s+/g, '-').toLowerCase()}`}
                  checked={selectedPromotionTypes.includes(type)}
                  onCheckedChange={(checked) => handlePromotionTypeChange(type, checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-[#FF7A00]"
                />
                <Label htmlFor={`promo-type-${type.replace(/\s+/g, '-').toLowerCase()}`} className="text-gray-700 text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
