import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BedDouble, Users, Maximize, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { prisma } from '@/lib/prisma'
import { formatVND } from '@/lib/format'
import { placeholderImage } from '@/lib/utils'
import CoverImage from '@/components/ui/CoverImage'

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
    <div className="px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/phong"
          className="text-[12px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-brand"
        >
          <T k="rooms.backToList" />
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Thư viện ảnh */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <CoverImage src={roomType.images[0]?.url || placeholderImage()} alt={roomType.name} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            {roomType.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {roomType.images.slice(1).map((img) => (
                  <div key={img.id} className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <CoverImage src={img.url} alt={img.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Thông tin */}
          <div className="lg:pt-4">
            <h1 className="text-2xl font-light uppercase leading-tight tracking-[0.12em] text-ink lg:text-4xl">
              <TD>{roomType.name}</TD>
            </h1>
            <span className="mt-5 block h-px w-14 bg-brand" />

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.08em] text-ink-soft">
              <span className="flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-brand" strokeWidth={1.3} />
                <TD>{roomType.bedType}</TD>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand" strokeWidth={1.3} />
                <T k="rooms.maxGuests" /> {roomType.maxGuests} <T k="rooms.guests" />
              </span>
              <span className="flex items-center gap-2">
                <Maximize className="h-4 w-4 text-brand" strokeWidth={1.3} />
                {roomType.size} m²
              </span>
            </div>

            <p className="mt-8 text-base leading-[1.8] text-ink-soft">
              <TD>{roomType.description}</TD>
            </p>

            <div className="mt-10 border-t border-line pt-8">
              <h2 className="text-[12px] uppercase tracking-[0.12em] text-ink">
                <T k="rooms.amenities" />
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2.5 text-[15px] text-ink-soft"
                  >
                    <Check className="h-3 w-3 flex-shrink-0 text-brand" strokeWidth={2} />
                    <TD>{a}</TD>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 bg-sand p-8 text-center">
              <span className="text-3xl font-light text-ink lg:text-4xl">
                {formatVND(roomType.basePrice)}
              </span>
              <span className="ml-2 text-[12px] uppercase tracking-[0.12em] text-ink-soft">
                <T k="rooms.perNight" />
              </span>
              <Link href={`/dat-phong?type=${roomType.slug}`} className="mt-7 block">
                <Button size="lg" className="w-full">
                  <T k="rooms.bookNow" />
                </Button>
              </Link>
              <p className="mt-4 text-[12px] uppercase tracking-[0.12em] text-ink-soft">
                <T k="rooms.bookDirect" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
