import { MapPin, Navigation } from 'lucide-react'
import Card from '@/components/ui/Card'
import { prisma } from '@/lib/prisma'
import { placeholderImage } from '@/lib/utils'

export const metadata = {
  title: 'Khu vực lân cận',
  description: 'Khám phá các điểm du lịch nổi tiếng gần Khách Sạn Ninh Bình: Tràng An, Bái Đính, Phố Cổ Hoa Lư.',
}

const categoryLabels: Record<string, string> = {
  NATURE: 'Thiên nhiên',
  CULTURE: 'Văn hóa & Lịch sử',
  FOOD: 'Ẩm thực',
  ACTIVITY: 'Hoạt động',
}

export default async function LocalAreaPage() {
  const attractions = await prisma.attraction.findMany()

  const grouped = attractions.reduce((acc, a) => {
    if (!acc[a.category]) acc[a.category] = []
    acc[a.category].push(a)
    return acc
  }, {} as Record<string, typeof attractions>)

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Khu vực lân cận</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ninh Bình - vùng đất di sản với nhiều danh thắng nổi tiếng. Khám phá những điểm đến tuyệt vời ngay gần khách sạn.
          </p>
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {categoryLabels[category] || category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((attraction) => (
                <Card key={attraction.id} hover className="overflow-hidden">
                  <div className="aspect-[16/10] bg-gray-200">
                    <img
                      src={attraction.imageUrl || placeholderImage(600, 375, attraction.name)}
                      alt={attraction.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{attraction.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{attraction.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-amber-700">
                        <Navigation className="h-4 w-4" />
                        <span>{attraction.distance}</span>
                      </div>
                      {attraction.mapUrl && (
                        <a
                          href={attraction.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <MapPin className="h-4 w-4" />
                          Xem bản đồ
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
