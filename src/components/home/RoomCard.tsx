'use client'

import Link from 'next/link'
import { Users, Maximize, Star } from 'lucide-react'
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
    <Link href={`/phong/${slug}`} className="group relative block overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={imageUrl || placeholderImage(700, 525, label)}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
      </div>

      {/* Nhãn tên phòng */}
      <span className="absolute left-1/2 top-5 -translate-x-1/2 bg-white/95 px-5 py-2 text-[9px] uppercase tracking-[0.22em] text-ink shadow-sm">
        {label}
      </span>

      {/* Thông tin dưới ảnh */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-4 pt-12">
        <div className="flex items-end justify-between gap-2 text-[9px] uppercase tracking-[0.16em] text-white">
          <span className="flex items-center gap-1.5">
            <Users className="h-3 w-3" strokeWidth={1.5} />
            {maxGuests} {t('card.guests')}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3 w-3" strokeWidth={1.5} />
            {size} m²
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3 w-3" strokeWidth={1.5} />
            {t('card.from')} {formatVND(basePrice)}
          </span>
        </div>
      </div>
    </Link>
  )
}
