import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BedDouble, Users, Maximize, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { prisma } from '@/lib/prisma'
import { formatVND } from '@/lib/format'
import { placeholderImage } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const roomType = await prisma.roomType.findUnique({ where: { slug } })
  if (!roomType) return { title: 'Không tìm thấy phòng' }
  return {
    title: roomType.name,
    description: roomType.description.slice(0, 160),
  }
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const roomType = await prisma.roomType.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  })

  if (!roomType) notFound()

  const amenities: string[] = JSON.parse(roomType.amenities)

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/phong" className="text-amber-700 hover:text-amber-800 text-sm font-medium">
            <T k="rooms.backToList" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
              <img
                src={roomType.images[0]?.url || placeholderImage(800, 600, roomType.name)}
                alt={roomType.name}
                className="w-full h-full object-cover"
              />
            </div>
            {roomType.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {roomType.images.slice(1).map((img) => (
                  <div key={img.id} className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4"><TD>{roomType.name}</TD></h1>
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <BedDouble className="h-5 w-5 text-amber-700" />
                <span><TD>{roomType.bedType}</TD></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-5 w-5 text-amber-700" />
                <span><T k="rooms.maxGuests" /> {roomType.maxGuests} <T k="rooms.guests" /></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize className="h-5 w-5 text-amber-700" />
                <span>{roomType.size} m²</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8"><TD>{roomType.description}</TD></p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4"><T k="rooms.amenities" /></h2>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span><TD>{a}</TD></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-amber-700">{formatVND(roomType.basePrice)}</span>
                  <span className="text-gray-500"> <T k="rooms.perNight" /></span>
                </div>
              </div>
              <Link href={`/dat-phong?type=${roomType.slug}`}>
                <Button size="lg" className="w-full"><T k="rooms.bookNow" /></Button>
              </Link>
              <p className="text-xs text-gray-500 mt-2 text-center">
                <T k="rooms.bookDirect" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
