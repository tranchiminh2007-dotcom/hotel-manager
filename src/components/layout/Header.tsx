'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, MapPin, BedDouble } from 'lucide-react'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'
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
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tel = HOTEL_CONFIG.phone.replace(/\s/g, '')

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Thanh tiện ích trên cùng */}
      <div
        className={cn(
          'overflow-hidden bg-brand-deep transition-all duration-500',
          scrolled ? 'max-h-0' : 'max-h-12'
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2.5 lg:px-10">
          <div className="flex items-center gap-5">
            <LanguageSwitcher />
            <span className="hidden md:flex items-center gap-2.5">
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/60">
                {t('ui.ourSocial')}
              </span>
              <SocialIcons
                className="gap-3 text-white/60"
                iconClassName="h-3 w-3 hover:text-white"
              />
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/phong"
              className="hidden sm:flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
            >
              <BedDouble className="h-3 w-3" strokeWidth={1.5} />
              {t('ui.ourRooms')}
            </Link>
            <Link
              href="/lien-he"
              className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
            >
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              {t('ui.contactUs')}
            </Link>
          </div>
        </div>
      </div>

      {/* Logo + điều hướng */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Logo */}
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-500 lg:justify-center',
              scrolled ? 'py-3' : 'py-6 lg:py-8'
            )}
          >
            <Link href="/" className="text-center">
              <span
                className={cn(
                  'block font-extralight uppercase leading-none tracking-[0.3em] text-ink transition-all duration-500',
                  scrolled ? 'text-lg lg:text-xl' : 'text-2xl lg:text-4xl'
                )}
              >
                Long Hải
              </span>
              <span
                className={cn(
                  'mt-1.5 block text-[8px] uppercase tracking-[0.42em] text-ink-soft transition-all duration-500 lg:text-[9px]',
                  scrolled && 'opacity-0 lg:opacity-100'
                )}
              >
                — {t('ui.hotelSub')} —
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-ink lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>

          {/* Nav desktop */}
          <nav className="hidden items-center justify-center gap-0 pb-5 lg:flex">
            {NAV_KEYS.map((item, i) => (
              <span key={item.href} className="flex items-center">
                {i > 0 && <span className="mx-0.5 h-3 w-px bg-line" />}
                <Link
                  href={item.href}
                  className="px-4 text-[10px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-brand"
                >
                  {t(item.key)}
                </Link>
              </span>
            ))}
            <span className="mx-0.5 h-3 w-px bg-line" />
            <Link
              href="/dat-phong"
              className="ml-3 bg-brand px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-deep"
            >
              {t('nav.bookNow')}
            </Link>
          </nav>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="border-b border-line bg-white lg:hidden">
          <div className="px-6 py-4">
            {NAV_KEYS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-line/60 py-3 text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-brand"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-5 space-y-3">
              <a
                href={`tel:${tel}`}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-deep"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                {HOTEL_CONFIG.phone}
              </a>
              <Link
                href="/dat-phong"
                onClick={() => setMobileOpen(false)}
                className="block bg-brand py-3.5 text-center text-[11px] uppercase tracking-[0.2em] text-white"
              >
                {t('nav.bookNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
