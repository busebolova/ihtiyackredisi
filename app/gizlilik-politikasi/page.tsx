export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Gizlilik Politikası</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Amaç ve Kapsam</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bu Gizlilik Politikası'nın amacı ("Politika"), ihtiyackredisi.com'un kullanımı sırasında işlenmekte olan
                kişisel veriler hakkındaki kuralları belirlemektedir.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Bu Politika kapsamında ihtiyackredisi.com, Veri Sahiplerinin kişisel verilerinin 6698 sayılı Kişisel
                Verilerin Korunması Kanunu ("KVKK") ile diğer ilgili mevzuata uygun şekilde işlenmesini sağlamaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Politika'nın Kapsamı Dışında Kalan Haller</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                ihtiyackredisi.com üzerinden üçüncü taraflara ait internet sitelerine, uygulamalara ya da benzeri
                unsurlara bağlantı verilmesi halinde, söz konusu bağlantının kullanımı neticesinde erişilen üçüncü
                taraflara ait internet siteleri, uygulamalar ya da benzeri unsurlar bu Politika'nın kapsamı dışındadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Temel Prensiplerimiz</h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com olarak gerçekleştirmiş olduğumuz kişisel veri işleme faaliyetleri kapsamında KVKK
                m.4'te yer alan genel ilkelere riayet etmekteyiz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                4. İşlenen Kişisel Veriler ve Veri Kategorileri
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                        Veri Kategorisi
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Kişisel Veri</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600 font-medium">İşlem Güvenliği Bilgisi</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        Kullanıcı Adı ve Şifre, Çerezler, Log Kayıtları, Erişim Kayıtları ve Trafik Bilgileri, IP Adres
                        Bilgileri, MAC Adresi Bilgileri
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600 font-medium">Pazarlama ve Analiz Bilgileri</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        Ürün ve Hizmetler Hakkında Şikayet Bilgileri, Talep Bilgileri, Tanıtım ve Pazarlama Faaliyetleri
                        Kapsamında Elde Edilen Bilgiler
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Kişisel Verileri Toplama Yöntemimiz</h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com olarak kişisel verilerinizi İnternet Sitesi'ni kullanımınız kapsamında elektronik
                olarak çerezler ve internet sitesinde yer alan formları doldurmanız, talep ve şikayetlerinizi iletmeniz
                kaydıyla otomatik yöntemlerle toplamaktayız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. İşleme Amaçlarımız ve Hukuki Sebeplerimiz</h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">Talep/Öneri/Şikayetlerin Yürütülmesi</h3>
                <p className="text-blue-700 text-sm mb-2">
                  • İnternet Sitesi üzerinden talep, öneri ve şikayetlerin alınması
                  <br />• Talep, öneri ve şikayetlerin değerlendirilmesi ve çözülmesi
                </p>
                <p className="text-blue-600 text-xs">
                  Hukuki Sebep: İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun
                  meşru menfaatleri için veri işlenmesinin zorunlu olması.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Bilgi Güvenliği & Siber Güvenlik</h3>
                <p className="text-green-700 text-sm mb-2">
                  • Hızlı, güvenli ve düşük maliyetli hizmet sunumu
                  <br />• Log kayıtlarının takibi ve arşivi
                </p>
                <p className="text-green-600 text-xs">
                  Hukuki Sebep: Hukuki yükümlülüklerin yerine getirilmesi ve meşru menfaatler.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                7. Kişisel Verilerinizi Kimlerle Paylaşıyoruz?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com olarak, bu Politika kapsamında işlenen kişisel verilerinizin yurt içinde aktarımının
                gerekli olması halinde Kanun'un 8. maddesine, yurt dışına aktarımının gerekli olması halinde ise
                Kanun'un 9. maddesinde yer alan düzenlemelere uygun hareket ederek aktarmaktayız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Çocukların Kişisel Verileri</h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com olarak çocukların mahremiyetine ve kişisel verilerin korunmasına önem veriyoruz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Aldığımız Veri Güvenliği Tedbirleri</h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com olarak kişisel verilerinizin hukuka aykırı olarak işlenmemesini, kişisel verilerinize
                hukuka aykırı olarak erişilmemesini ve kişisel verilerinizin güvenli şekilde saklanmasını sağlamak
                amacıyla gerekli tüm idari ve teknik tedbirleri almaktayız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. İlgili Kişi Olarak Haklarınız</h2>
              <p className="text-gray-600 leading-relaxed">
                KVKK m.11'de yer alan "İlgili Kişinin Hakları" uyarınca veri sorumlusu olan ihtiyackredisi.com'a
                başvurarak haklarınızı kullanabilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                11. Politika'nın Değiştirilmesi ve Güncellenmesi
              </h2>
              <p className="text-gray-600 leading-relaxed">
                ihtiyackredisi.com, işbu Politika'yı dilediği zaman dilediği şekilde değiştirme hakkını saklı
                tutmaktadır. Değiştirilmiş politikanın İnternet Sitesinde yayınlanması anında yürürlüğe girmiş
                olacaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">12. İletişim</h2>
              <p className="text-gray-600 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için mail@ihtiyackredisi.com adresinden bizimle iletişime
                geçebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
