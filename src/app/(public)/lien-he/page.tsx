'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState('')
  const [ok, setOk] = useState(false)
  const { t } = useLanguage()

  const tel = HOTEL_CONFIG.phone.replace(/\s/g, '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setResult('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setOk(true)
      setResult(t('contact.success'))
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } else {
      const data = await res.json()
      setOk(false)
      setResult(data.error || t('reviews.error'))
    }
    setSubmitting(false)
  }

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-light uppercase leading-tight tracking-[0.12em] text-ink lg:text-[2.75rem]">
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-brand">
            — {t('contact.subtitle')} —
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.75] text-ink-soft">
            {t('contact.desc')}
          </p>
        </div>

        {/* Thẻ liên hệ */}
        <div className="mb-14 grid gap-px bg-line lg:grid-cols-3">
          <div className="bg-white p-9 text-center">
            <MapPin className="mx-auto mb-5 h-6 w-6 text-brand" strokeWidth={1} />
            <h3 className="text-[12px] uppercase tracking-[0.12em] text-ink">
              {t('contact.address')}
            </h3>
            <p className="mt-3 text-[15px] text-ink-soft">{HOTEL_CONFIG.address}</p>
          </div>
          <a
            href={`tel:${tel}`}
            className="group bg-white p-9 text-center transition-colors hover:bg-sand"
          >
            <Phone className="mx-auto mb-5 h-6 w-6 text-brand" strokeWidth={1} />
            <h3 className="text-[12px] uppercase tracking-[0.12em] text-ink">
              {t('contact.phone')}
            </h3>
            <p className="mt-3 text-[15px] text-brand-deep group-hover:underline">
              {HOTEL_CONFIG.phone}
            </p>
          </a>
          <a
            href={`mailto:${HOTEL_CONFIG.email}`}
            className="group bg-white p-9 text-center transition-colors hover:bg-sand"
          >
            <Mail className="mx-auto mb-5 h-6 w-6 text-brand" strokeWidth={1} />
            <h3 className="text-[12px] uppercase tracking-[0.12em] text-ink">
              {t('contact.email')}
            </h3>
            <p className="mt-3 text-[15px] text-brand-deep group-hover:underline">
              {HOTEL_CONFIG.email}
            </p>
          </a>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Form */}
          <div className="border border-line p-8 lg:p-10">
            <h2 className="text-[13px] uppercase tracking-[0.12em] text-ink">
              {t('contact.sendMessage')}
            </h2>
            <span className="mt-4 mb-8 block h-px w-10 bg-brand" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label={t('contact.name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.namePlaceholder')}
                  required
                />
                <Input
                  label={t('contact.email')}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('contact.emailPlaceholder')}
                  required
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label={t('contact.phone')}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t('contact.phonePlaceholder')}
                  required
                />
                <Input
                  label={t('contact.subject')}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t('contact.subjectPlaceholder')}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-ink-soft">
                  {t('contact.message')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact.messagePlaceholder')}
                  rows={5}
                  required
                  className="w-full border border-line bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-soft/60 focus:border-brand focus:outline-none"
                />
              </div>

              {result && (
                <p
                  className={`text-[15px] ${ok ? 'text-brand-deep' : 'text-red-600'}`}
                >
                  {result}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </div>

          {/* Giờ làm việc + bản đồ */}
          <div className="space-y-6">
            <div className="bg-sand p-8">
              <h2 className="text-[13px] uppercase tracking-[0.12em] text-ink">
                {t('contact.hours')}
              </h2>
              <span className="mt-4 mb-7 block h-px w-10 bg-brand" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" strokeWidth={1.2} />
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.08em] text-ink">
                      {t('contact.reception')}
                    </p>
                    <p className="mt-1.5 text-[15px] text-ink-soft">
                      {t('contact.receptionDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" strokeWidth={1.2} />
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.08em] text-ink">
                      {t('contact.restaurant')}
                    </p>
                    <p className="mt-1.5 text-[15px] text-ink-soft">
                      {t('contact.breakfast')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] overflow-hidden border border-line bg-sand">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478434.8515894383!2d105.60869!3d20.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136751d83b0d05b%3A0x6b5e2e6e7b0b0b0b!2sNinh%20B%C3%ACnh!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Long Hải Hotel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
