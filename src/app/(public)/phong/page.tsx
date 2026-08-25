import Link from 'next/link'
import { BedDouble, Users, Maximize, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { prisma } from '@/lib/prisma'
import { formatVND } from '@/lib/format'
import { placeholderImage } from '@/lib/utils'
import CoverImage from '@/components/ui/CoverImage'

export const metadata = {
  title: 'Phòng & Giá',
  description:
    'Xem các loại phòng và giá tại Long Hải Hotel. Phòng Đơn và Phòng Family với đầy đủ tiện nghi.',
}

export default async function RoomsPage() {
  const roomTypes = await prisma.roomType.findMany({
    include: { images: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { basePrice: 'asc' },
  })

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <PageHeader titleKey="rooms.title" subtitleKey="rooms.subtitle" descKey="rooms.desc" />

        <div className="space-y-6">
          {roomTypes.map((rt, idx) => {
            const amenities: string[] = JSON.parse(rt.amenities)
            const flip = idx % 2 === 1

            return (
              <div key={rt.id} className="border border-line">
                <div className="grid lg:grid-cols-2">
                  {/* Ảnh */}
                  <div
                    className={`group relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-auto lg:min-h-[440px] ${
                      flip ? 'lg:order-2' : ''
                    }`}
                  >
                    <CoverImage src={rt.images[0]?.url || placeholderImage()} alt={rt.name} sizes="(max-width: 1024px) 100vw, 50vw" className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]" />
                    <span className="absolute left-6 top-6 bg-white/95 px-4 py-2 eyebrow text-ink">
                      <TD>{rt.name}</TD>
                    </span>
                  </div>

                  {/* Nội dung */}
                  <div className={`p-8 lg:p-12 ${flip ? 'lg:order-1' : ''}`}>
                    <h2 className="text-xl h-section text-ink lg:text-2xl">
                      <TD>{rt.name}</TD>
                    </h2>
                    <span className="mt-4 block h-px w-12 bg-brand" />

                    <p className="mt-6 body-text text-ink-soft">
                      <TD>{rt.description}</TD>
                    </p>

                    <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 eyebrow text-ink-soft">
                      <span className="flex items-center gap-2">
                        <BedDouble className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                        <TD>{rt.bedType}</TD>
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                        <T k="rooms.maxGuests" /> {rt.maxGuests} <T k="rooms.guests" />
                      </span>
                      <span className="flex items-center gap-2">
                        <Maximize className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                        {rt.size} m²
                      </span>
                    </div>

                    <div className="mt-8 border-t border-line pt-7">
                      <h3 className="eyebrow text-ink">
                        <T k="rooms.amenities" />
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {amenities.map((a) => (
                          <span
                            key={a}
                            className="flex items-center gap-2 body-text text-ink-soft"
                          >
                            <Check className="h-3 w-3 flex-shrink-0 text-brand" strokeWidth={2} />
                            <TD>{a}</TD>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-line pt-7">
                      <div>
                        <span className="text-[26px] text-ink lg:text-3xl">
                          {formatVND(rt.basePrice)}
                        </span>
                        <span className="ml-1.5 eyebrow text-ink-soft">
                          <T k="rooms.perNight" />
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/phong/${rt.slug}`}>
                          <Button variant="outline" size="sm">
                            <T k="rooms.detail" />
                          </Button>
                        </Link>
                        <Link href={`/dat-phong?type=${rt.slug}`}>
                          <Button size="sm">
                            <T k="rooms.bookRoom" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
