import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Çerez Politikası | İhtiyaç Kredisi",
  description: "İhtiyaç Kredisi platformunun çerez kullanımı ve çerez politikası hakkında detaylı bilgiler.",
  keywords: "çerez politikası, cookie policy, çerez kullanımı, web analitik",
}

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Çerez Aydınlatma Metni</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Amaç ve Kapsam</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                İşbu ihtiyackredisi.com Çerez Aydınlatma Metni ("Aydınlatma Metni") internet sitesinin kullanımı
                sırasında ihtiyackredisi.com tarafından çerezler vasıtasıyla işlenmekte olan kişisel verileriniz
                hakkında 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") m. 10 çerçevesinde aydınlatılmanızı
                sağlamak amacıyla hazırlanmıştır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Benimsediğimiz Genel İlkeler</h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com kişisel verilerinizin işlenmesine ilişkin KVKK, yönetmelikler, tebliğler ve ilgili
                kurumların rehberlerini temel almakla birlikte, veri gizliliğinizin sağlanması amacıyla yerel ve/veya
                uluslararası en iyi uygulamaları da benimsemektedir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. İşlenen Çerezler</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Çerezler, bir internet sayfası ziyaret edildiğinde kullanıcılara ilişkin birtakım bilgilerin
                kullanıcıların terminal cihazlarında depolanmasına izin veren düşük boyutlu zengin metin biçimli text
                formatları olarak tanımlanmaktadır.
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                        Çerez Sağlayıcı
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Çerezin Adı</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Amacı</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Saklama Süresi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600 font-medium">Google Analytics</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <ul className="space-y-1">
                          <li>• _ga</li>
                          <li>• _gid</li>
                          <li>• _gcl_au</li>
                          <li>• IDE</li>
                          <li>• DSIT</li>
                          <li>• ar_debug</li>
                          <li>• ga_JQ4DN2976E</li>
                        </ul>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        Bu çerezler, ziyaretçilerin web sitemizi nasıl kullandığı hakkında bilgi toplamak, kullanıcıları
                        birbirinden ayırt etmek için anonim olarak toplanır.
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <ul className="space-y-1">
                          <li>• 2 Yıl</li>
                          <li>• 24 Saat</li>
                          <li>• 1 Dakika</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                4. Çerezleri İşleme Amaçlarımız ve Hukuki Sebeplerimiz
              </h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">İnternet Sitesinin Zorunlu Fonksiyonları</h3>
                <p className="text-blue-700 text-sm">
                  İnternet Sitesi'nin sunduğu hizmetlerden en iyi şekilde yararlanmanızı sağlamak için zorunlu
                  fonksiyonların sunulması
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <h3 className="font-semibold text-green-800 mb-2">Hukuki Yükümlülüklerin Yerine Getirilmesi</h3>
                <p className="text-green-700 text-sm">
                  Hukuki ihtilaf durumlarında veya kamu kurumlarının bilgi talebinde bulunması halinde hukuk ve dava
                  işlerinin yürütülmesi
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">İnternet Sitesinin İyileştirilmesi</h3>
                <p className="text-purple-700 text-sm">
                  İnternet Sitesi'nin performansının ve işlevselliğinin geliştirilmesi ve iyileştirilmesine yönelik
                  faaliyetlerin yürütülmesi
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Çerezleri Toplama Yöntemimiz</h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com olarak kişisel veri işleme amaçlarını gerçekleştirmek için ihtiyaç duyduğumuz kişisel
                verilerinizi elektronik ortamda ve çerezler vasıtasıyla otomatik olan yöntemlerle toplamaktayız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Kişisel Verilerinizin Aktarılması</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                ihtiyackredisi.com olarak, bu Aydınlatma Metni kapsamında işlenen kişisel verilerinizin yurt içinde veya
                yurt dışına aktarımının gerekli olması halinde KVKK'nın ilgili maddelerine uygun hareket ederek
                aktarmaktayız.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Kişisel verileriniz, hizmet aldığımız üçüncü kişilerle, yazılım kaynaklı hataların giderilmesi amacıyla
                ve yasal süreçlerin yürütülmesi amacıyla adli ve idari makamlarla paylaşılabilecektir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Veri Güvenliği Önlemlerimiz</h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com olarak kişisel verilerinizin güvenliğini sağlamak amacıyla gerekli tüm idari ve
                teknik tedbirleri almaktayız ve bu tedbirleri sürekli olarak gözden geçirmekteyiz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. İlgili Kişi Haklarınız</h2>
              <p className="text-gray-600 leading-relaxed">
                KVKK m.11'de yer alan haklarınızı ihtiyackredisi.com'a başvurarak kullanabilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
