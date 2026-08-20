'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'
import SocialIcons from '@/components/ui/SocialIcons'

export default function Footer() {
  const { t } = useLanguage()
  const tel = HOTEL_CONFIG.phone.replace(/\s/g, '')

  return (
    <footer className="bg-night text-white/70">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        {/* Logo giữa */}
        <div className="border-b border-white/10 pb-12 text-center">
          <span className="block text-2xl font-light uppercase tracking-[0.18em] text-white lg:text-3xl">
            Long Hải
          </span>
          <span className="mt-2 block text-[12px] uppercase tracking-[0.3em] text-white/70 lg:text-[12px]">
            — {t('ui.hotelSub')} —
          </span>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.75] text-white/75">
            {t('hero.tagline')}
          </p>
          <SocialIcons
            className="mt-7 justify-center gap-5 text-white/70"
            iconClassName="h-4 w-4 hover:text-brand"
          />
        </div>

        <div className="grid grid-cols-1 gap-12 py-12 sm:grid-cols-3">
          <div>
            <h3 className="mb-5 text-[12px] uppercase tracking-[0.14em] text-white">
              {t('ui.contactUs')}
            </h3>
            <div className="space-y-3.5 text-[15px]">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand" strokeWidth={1.5} />
                <span>{HOTEL_CONFIG.address}</span>
              </div>
              <a
                href={`tel:${tel}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-brand" strokeWidth={1.5} />
                <span>{HOTEL_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${HOTEL_CONFIG.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-brand" strokeWidth={1.5} />
                <span>{HOTEL_CONFIG.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[12px] uppercase tracking-[0.14em] text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3 text-[15px]">
              {[
                { k: 'nav.rooms', href: '/phong' },
                { k: 'nav.booking', href: '/dat-phong' },
                { k: 'nav.amenities', href: '/tien-ich' },
                { k: 'nav.area', href: '/khu-vuc' },
                { k: 'nav.contact', href: '/lien-he' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-brand">
                    {t(l.k)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[12px] uppercase tracking-[0.14em] text-white">
              {t('footer.explore')}
            </h3>
            <ul className="space-y-3 text-[15px]">
              {[
                { k: 'nav.about', href: '/ve-chung-toi' },
                { k: 'nav.reviews', href: '/danh-gia' },
                { k: 'nav.offers', href: '/uu-dai' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-brand">
                    {t(l.k)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-[12px] uppercase tracking-[0.12em] text-white/70">
          &copy; {new Date().getFullYear()} Long Hải Hotel. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
