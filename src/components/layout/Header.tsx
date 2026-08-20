'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, MapPin, BedDouble } from 'lucide-react'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'
import SocialIcons from '@/components/ui/SocialIcons'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_KEYS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.rooms', href: '/phong' },
  { key: 'nav.amenities', href: '/tien-ich' },
  { key: 'nav.reviews', href: '/danh-gia' },
  { key: 'nav.offers', href: '/uu-dai' },
  { key: 'nav.area', href: '/khu-vuc' },
  { key: 'nav.about', href: '/ve-chung-toi' },
  { key: 'nav.contact', href: '/lien-he' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()
  const tel = HOTEL_CONFIG.phone.replace(/\s/g, '')

  return (
    <header>
      {/* Thanh tiện ích — cuộn đi cùng trang */}
      <div className="hidden bg-brand-deep lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2.5 lg:px-10">
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <span className="flex items-center gap-3">
              <span className="text-[12px] tracking-[0.1em] text-white/70">
                {t('ui.ourSocial')}
              </span>
              <SocialIcons
                className="gap-3 text-white/70"
                iconClassName="h-3.5 w-3.5 hover:text-white"
              />
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/phong"
              className="flex items-center gap-1.5 text-[12px] tracking-[0.1em] text-white/70 transition-colors hover:text-white"
            >
              <BedDouble className="h-3.5 w-3.5" strokeWidth={1.6} />
              {t('ui.ourRooms')}
            </Link>
            <Link
              href="/lien-he"
              className="flex items-center gap-1.5 text-[12px] tracking-[0.1em] text-white/70 transition-colors hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
              {t('ui.contactUs')}
            </Link>
          </div>
        </div>
      </div>

      {/* Logo lớn — chỉ hiện ở đầu trang, cuộn đi cùng trang */}
      <div className="hidden bg-white lg:block">
        <div className="mx-auto max-w-[1400px] px-10 py-8 text-center">
          <Link href="/" className="inline-block">
            <span className="block text-[2rem] font-light uppercase leading-none tracking-[0.18em] text-ink">
              Long Hải
            </span>
            <span className="mt-2.5 block text-[12px] uppercase tracking-[0.22em] text-ink-muted">
              — {t('ui.hotelSub')} —
            </span>
          </Link>
        </div>
      </div>

      {/* Thanh điều hướng — dính khi cuộn (thuần CSS, không dùng JS) */}
      <div className="sticky top-0 z-50 border-y border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Mobile: tên + nút menu */}
          <div className="flex items-center justify-between py-4 lg:hidden">
            <Link href="/" className="text-lg font-light uppercase tracking-[0.16em] text-ink">
              Long Hải
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="-mr-2 p-2 text-ink"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" strokeWidth={1.6} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={1.6} />
              )}
            </button>
          </div>

          {/* Desktop: điều hướng canh giữa */}
          <nav className="hidden items-center justify-center py-3.5 lg:flex">
            {NAV_KEYS.map((item, i) => (
              <span key={item.href} className="flex items-center">
                {i > 0 && <span className="h-3.5 w-px bg-line" />}
                <Link
                  href={item.href}
                  className="px-4 text-[13px] tracking-[0.06em] text-ink-soft transition-colors hover:text-brand-deep"
                >
                  {t(item.key)}
                </Link>
              </span>
            ))}
            <Link
              href="/dat-phong"
              className="ml-5 bg-brand-deep px-6 py-2.5 text-[13px] tracking-[0.06em] text-white transition-colors hover:bg-night"
            >
              {t('nav.bookNow')}
            </Link>
          </nav>
        </div>

        {/* Menu mobile */}
        {mobileOpen && (
          <div className="border-t border-line bg-white lg:hidden">
            <div className="px-6 py-3">
              {NAV_KEYS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-line/70 py-3.5 text-[15px] text-ink-soft transition-colors hover:text-brand-deep"
                >
                  {t(item.key)}
                </Link>
              ))}

              <div className="mt-5 mb-2 space-y-3">
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${tel}`}
                    className="flex items-center gap-2 text-[15px] text-brand-deep"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.6} />
                    {HOTEL_CONFIG.phone}
                  </a>
                  <LanguageSwitcher compact />
                </div>
                <Link
                  href="/dat-phong"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-brand-deep py-3.5 text-center text-[14px] tracking-[0.06em] text-white"
                >
                  {t('nav.bookNow')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
