'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      <img
        src="/images/hotel-hero.jpg"
        alt={HOTEL_CONFIG.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{HOTEL_CONFIG.name}</h1>
        <p className="text-xl md:text-2xl mb-2 font-light">{t('hero.tagline')}</p>
        <p className="text-lg mb-8 opacity-90 flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5" />
          {HOTEL_CONFIG.address}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dat-phong">
            <Button size="lg" className="bg-white text-amber-800 hover:bg-gray-100">
              {t('hero.bookNow')}
            </Button>
          </Link>
          <Link href="/phong">
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 bg-white/10">
              {t('hero.viewRooms')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
