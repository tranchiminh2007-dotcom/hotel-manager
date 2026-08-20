'use client'

import Link from 'next/link'
import { Users, Maximize } from 'lucide-react'
import CoverImage from '@/components/ui/CoverImage'
import { useLanguage } from '@/lib/language-context'
import { translateData } from '@/lib/data-translations'
import { formatVND } from '@/lib/format'
import { placeholderImage } from '@/lib/utils'

interface RoomCardProps {
  name: string
  slug: string
  basePrice: number
  maxGuests: number
  size: number
  imageUrl?: string | null
}

export default function RoomCard({
  name,
  slug,
  basePrice,
  maxGuests,
  size,
  imageUrl,
}: RoomCardProps) {
  const { t, locale } = useLanguage()
  const label = translateData(name, locale)

  return (
    <Link href={`/phong/${slug}`} className="group block border border-line">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <CoverImage
          src={imageUrl || placeholderImage()}
          alt={label}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4 text-[13px] text-white">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" strokeWidth={1.6} />
            {maxGuests} {t('card.guests')}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5" strokeWidth={1.6} />
            {size} m²
          </span>
        </div>
      </div>

      <div className="px-6 py-5 text-center">
        <h3 className="text-[17px] uppercase tracking-[0.08em] text-ink">{label}</h3>
        <p className="mt-2.5 text-[15px] text-ink-soft">
          <span className="text-[19px] text-brand-deep">{formatVND(basePrice)}</span>{' '}
          {t('rooms.perNight')}
        </p>
      </div>
    </Link>
  )
}
