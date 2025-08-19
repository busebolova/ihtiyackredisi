import { Users, CreditCard, Calendar } from 'lucide-react'

interface SelectedLoanCriteriaProps {
  loanType: string
  amount: string
  maturity: string
}

export function SelectedLoanCriteria({ loanType, amount, maturity }: SelectedLoanCriteriaProps) {
  const displayLoanType = loanType === "ihtiyac" ? "İhtiyaç Kredisi" : loanType === "konut" ? "Konut Kredisi" : "Taşıt Kredisi";
  const displayMaturity = `${maturity} Ay`;

  return (
    <div className="bg-white p-2 rounded-full shadow-lg max-w-3xl mx-auto flex items-center justify-between mb-8">
      {/* Kredi Türü */}
      <div className="flex items-center gap-3 px-4 py-2 border-r border-gray-200 flex-1">
        <Users className="w-6 h-6 text-gray-500" />
        <div className="flex flex-col items-start flex-1">
          <label className="text-xs font-medium text-gray-500">Kredi Türü</label>
          <span className="text-base font-normal text-gray-800">{displayLoanType}</span>
        </div>
      </div>

      {/* Tutar */}
      <div className="flex items-center gap-3 px-4 py-2 border-r border-gray-200 flex-1">
        <CreditCard className="w-6 h-6 text-gray-500" />
        <div className="flex flex-col items-start flex-1">
          <label className="text-xs font-medium text-gray-500">Tutar</label>
          <span className="text-base font-normal text-gray-800">{parseFloat(amount).toLocaleString('tr-TR')} TL</span>
        </div>
      </div>

      {/* Vade Süresi */}
      <div className="flex items-center gap-3 px-4 py-2 flex-1">
        <Calendar className="w-6 h-6 text-gray-500" />
        <div className="flex flex-col items-start flex-1">
          <label className="text-xs font-medium text-gray-500">Vade Süresi</label>
          <span className="text-base font-normal text-gray-800">{displayMaturity}</span>
        </div>
      </div>

      {/* Bul Button - Bu bileşende olmayacak, ana sayfadan yönlendirme yapılıyor */}
    </div>
  )
}
