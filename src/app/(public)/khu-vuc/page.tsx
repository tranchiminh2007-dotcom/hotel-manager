import { MapPin, Navigation } from 'lucide-react'
import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { prisma } from '@/lib/prisma'
import { placeholderImage } from '@/lib/utils'

export const metadata = {
  title: 'Khu vực lân cận',
  description: 'Khám phá các điểm du lịch nổi tiếng gần Khách Sạn Ninh Bình: Tràng An, Bái Đính, Phố Cổ Hoa Lư.',
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
        <PageHeader titleKey="area.title" descKey="area.desc" />

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              <T k={`area.cat.${category}`} />
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2"><TD>{attraction.name}</TD></h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3"><TD>{attraction.description}</TD></p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-amber-700">
                        <Navigation className="h-4 w-4" />
                        <span><TD>{attraction.distance}</TD></span>
                      </div>
                      {attraction.mapUrl && (
                        <a
                          href={attraction.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <MapPin className="h-4 w-4" />
                          <T k="area.viewMap" />
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
