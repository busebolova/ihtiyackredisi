import { Banknote } from 'lucide-react' // Wallet yerine Banknote import edildi

export function InfoCards() {
  return (
    <section className="container mx-auto px-4 pt-0 pb-8">
      {" "}
      {/* Added pb-8 */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Item 1 */}
        <div className="flex items-center gap-4 text-left">
          <Banknote className="w-8 h-8 text-blue-600 flex-shrink-0" /> {/* İkon güncellendi */}
          <div className="flex flex-col">
            <h3 className="text-sm text-gray-800 font-normal">30'dan Fazla Bankayı Karşılaştırın</h3>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-4 text-left">
          <Banknote className="w-8 h-8 text-blue-600 flex-shrink-0" /> {/* İkon güncellendi */}
          <div className="flex flex-col">
            <h3 className="text-sm text-gray-800 font-normal">Tüm Bankaların Puanlayan ve Yorumlayın</h3>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center gap-4 text-left">
          <Banknote className="w-8 h-8 text-blue-600 flex-shrink-0" /> {/* İkon güncellendi */}
          <div className="flex flex-col">
            <h3 className="text-sm text-gray-800 font-normal">En Cazip Teklifler ile Kredi Başvurusu Gerçekleştirin</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
