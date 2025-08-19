"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface CreditCardFilterSidebarProps {
  onFilterChange: (filters: { selectedBanks: string[]; selectedFeatures: string[]; selectedAnnualFeeOption: string }) => void;
  initialSelectedBanks?: string[];
  initialSelectedFeatures?: string[];
  initialSelectedAnnualFeeOption?: string;
}

export function CreditCardFilterSidebar({ onFilterChange, initialSelectedBanks = [], initialSelectedFeatures = [], initialSelectedAnnualFeeOption = "" }: CreditCardFilterSidebarProps) {
  const [selectedBanks, setSelectedBanks] = useState<string[]>(initialSelectedBanks);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialSelectedFeatures);
  const [selectedAnnualFeeOption, setSelectedAnnualFeeOption] = useState<string>(initialSelectedAnnualFeeOption);

  const bankOptions = [
    "Garanti BBVA",
    "Yapı Kredi",
    "İş Bankası",
    "QNB Finansbank",
    "Akbank",
    "Ziraat Bankası",
  ];

  const featureOptions = [
    "Puan Kazandıran",
    "Mil Kazandıran",
    "Aidatsız",
    "Taksitli Alışveriş",
    "Nakit Avans",
    "Seyahat Avantajları",
  ];

  const annualFeeOptions = [
    { value: "no-fee", label: "Aidatsız Kartlar" },
    { value: "low-fee", label: "Düşük Aidatlı Kartlar" },
  ];

  const handleBankChange = (bankName: string, checked: boolean) => {
    const newSelectedBanks = checked
      ? [...selectedBanks, bankName]
      : selectedBanks.filter((name) => name !== bankName);
    setSelectedBanks(newSelectedBanks);
    onFilterChange({ selectedBanks: newSelectedBanks, selectedFeatures, selectedAnnualFeeOption });
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const newSelectedFeatures = checked
      ? [...selectedFeatures, feature]
      : selectedFeatures.filter((name) => name !== feature);
    setSelectedFeatures(newSelectedFeatures);
    onFilterChange({ selectedBanks, selectedFeatures: newSelectedFeatures, selectedAnnualFeeOption });
  };

  const handleAnnualFeeChange = (value: string) => {
    setSelectedAnnualFeeOption(value);
    onFilterChange({ selectedBanks, selectedFeatures, selectedAnnualFeeOption: value });
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

      {/* Kart Özellikleri */}
      <Accordion type="single" collapsible defaultValue="item-2" className="w-full">
        <AccordionItem value="item-2" className="border-b border-gray-200">
          <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:no-underline py-3">
            Kart Özellikleri
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            {featureOptions.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature.replace(/\s+/g, '-').toLowerCase()}`}
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-[#FF7A00]"
                />
                <Label htmlFor={`feature-${feature.replace(/\s+/g, '-').toLowerCase()}`} className="text-gray-700 text-sm">
                  {feature}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Yıllık Aidat */}
      <Accordion type="single" collapsible defaultValue="item-3" className="w-full">
        <AccordionItem value="item-3" className="border-b border-gray-200">
          <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:no-underline py-3">
            Yıllık Aidat
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            <RadioGroup value={selectedAnnualFeeOption} onValueChange={handleAnnualFeeChange}>
              {annualFeeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`annual-fee-${option.value}`} className="data-[state=checked]:bg-[#FF7A00]" />
                  <Label htmlFor={`annual-fee-${option.value}`} className="text-gray-700 text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
