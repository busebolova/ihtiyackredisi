"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"

export default function ConfirmHumanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-[#FF7A00] mb-4">Let's confirm you are human</h1>
        <p className="text-gray-600 mb-8">
          Complete the security check before continuing. This step verifies that you are not a bot, which helps to
          protect your account and prevent spam.
        </p>
        <Button className="bg-[#FF7A00] hover:bg-[#E66F00] text-white px-8 py-3 rounded-md text-lg font-semibold flex items-center justify-center mx-auto mb-12">
          Begin <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
        <div className="w-40 mx-auto">
          <Select defaultValue="english">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="turkish">Türkçe</SelectItem>
              <SelectItem value="german">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
