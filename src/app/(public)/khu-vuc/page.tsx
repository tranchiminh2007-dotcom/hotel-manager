import { MapPin, Navigation } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { prisma } from '@/lib/prisma'
import { placeholderImage } from '@/lib/utils'
import CoverImage from '@/components/ui/CoverImage'

export const metadata = {
  title: 'Khu vực lân cận',
  description:
    'Khám phá các điểm du lịch nổi tiếng gần Long Hải Hotel: Tràng An, Bái Đính, Phố Cổ Hoa Lư.',
}

export default async function LocalAreaPage() {
  const attractions = await prisma.attraction.findMany()

  const grouped = attractions.reduce(
    (acc, a) => {
      if (!acc[a.category]) acc[a.category] = []
      acc[a.category].push(a)
      return acc
    },
    {} as Record<string, typeof attractions>
  )

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <PageHeader titleKey="area.title" subtitleKey="area.subtitle" descKey="area.desc" />

        <div className="space-y-16">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="mb-10 flex items-center gap-5">
                <h2 className="whitespace-nowrap eyebrow text-ink">
                  <T k={`area.cat.${category}`} />
                </h2>
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((attraction) => (
                  <div key={attraction.id} className="group border border-line">
                    <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                      <CoverImage src={attraction.imageUrl || placeholderImage()} alt={attraction.name} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute bottom-4 left-4 right-4 text-base uppercase tracking-[0.08em] text-white">
                        <TD>{attraction.name}</TD>
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="body-text leading-[1.75] text-ink-soft line-clamp-4">
                        <TD>{attraction.description}</TD>
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                        <span className="flex items-center gap-1.5 eyebrow text-brand">
                          <Navigation className="h-3 w-3" strokeWidth={1.5} />
                          <TD>{attraction.distance}</TD>
                        </span>
                        {attraction.mapUrl && (
                          <a
                            href={attraction.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 eyebrow text-ink-soft transition-colors hover:text-ink"
                          >
                            <MapPin className="h-3 w-3" strokeWidth={1.5} />
                            <T k="area.viewMap" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
