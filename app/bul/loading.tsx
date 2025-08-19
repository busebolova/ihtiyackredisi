export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white text-center py-2 text-sm border-b-2 border-blue-500">Reklam Alanı</div>
      {/* Header will be rendered by the layout */}
      <main className="flex-1 pt-20 pb-12 flex items-center justify-center">
        <div className="text-center text-gray-600 text-lg">
          Yükleniyor...
        </div>
      </main>
      {/* Footer will be rendered by the layout */}
    </div>
  );
}
