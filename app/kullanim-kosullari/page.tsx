export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Kullanım Koşulları</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              İhtiyaçkredisi.com web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Hizmet Kapsamı</h2>
            <p className="text-gray-600 mb-4">
              Web sitemiz, çeşitli bankaların kredi ürünlerini karşılaştırmanızı sağlayan bir platformdur. Kredi
              başvuruları doğrudan bankalar tarafından değerlendirilir.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Kullanıcı Sorumlulukları</h2>
            <p className="text-gray-600 mb-4">
              Verdiğiniz bilgilerin doğru ve güncel olmasından sorumlusunuz. Yanlış bilgi verilmesi durumunda ortaya
              çıkabilecek sorunlardan sitemiz sorumlu değildir.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Sorumluluk Reddi</h2>
            <p className="text-gray-600 mb-4">
              Sitemizdeki bilgiler genel bilgilendirme amaçlıdır. Kredi kararları tamamen bankaların takdirindedir ve
              sitemiz bu kararlardan sorumlu tutulamaz.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Değişiklikler</h2>
            <p className="text-gray-600">
              Bu kullanım koşulları önceden haber verilmeksizin değiştirilebilir. Güncel koşulları düzenli olarak
              kontrol etmenizi öneririz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
