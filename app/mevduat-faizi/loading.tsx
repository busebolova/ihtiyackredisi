export default function Loading() {
  return (
    <div className="flex-1 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <div className="bg-gray-200 rounded-xl h-96"></div>
            <div className="space-y-6">
              <div className="bg-gray-200 rounded-xl h-32"></div>
              <div className="bg-gray-200 rounded-xl h-48"></div>
              <div className="bg-gray-200 rounded-xl h-48"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
