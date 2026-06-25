'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState('')
  const { t } = useLanguage()

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
      setResult('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } else {
      const data = await res.json()
      setResult(data.error || 'Có lỗi xảy ra, vui lòng thử lại.')
    }
    setSubmitting(false)
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('contact.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center">
            <MapPin className="h-8 w-8 text-amber-700 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">{t('contact.address')}</h3>
            <p className="text-sm text-gray-600">{HOTEL_CONFIG.address}</p>
          </Card>
          <a href={`tel:${HOTEL_CONFIG.phone.replace(/\s/g, '')}`}>
            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <Phone className="h-8 w-8 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{t('contact.phone')}</h3>
              <p className="text-sm text-amber-700 font-medium underline">{HOTEL_CONFIG.phone}</p>
            </Card>
          </a>
          <a href={`mailto:${HOTEL_CONFIG.email}`}>
            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <Mail className="h-8 w-8 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{t('contact.email')}</h3>
              <p className="text-sm text-amber-700 font-medium underline">{HOTEL_CONFIG.email}</p>
            </Card>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('contact.sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Họ tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập họ tên"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Số điện thoại"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Nhập số điện thoại"
                  required
                />
                <Input
                  label="Tiêu đề"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Tiêu đề tin nhắn"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Nhập nội dung tin nhắn..."
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {result && (
                <p className={`text-sm ${result.includes('lỗi') ? 'text-red-600' : 'text-green-600'}`}>
                  {result}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </Card>

          <div>
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('contact.hours')}</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-700" />
                  <div>
                    <p className="font-medium text-gray-900">Lễ tân: 24/7</p>
                    <p className="text-sm text-gray-600">Luôn sẵn sàng phục vụ bạn</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-700" />
                  <div>
                    <p className="font-medium text-gray-900">Nhà hàng: 06:00 - 22:00</p>
                    <p className="text-sm text-gray-600">Bữa sáng: 06:00 - 09:30</p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478434.8515894383!2d105.60869!3d20.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136751d83b0d05b%3A0x6b5e2e6e7b0b0b0b!2sNinh%20B%C3%ACnh!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí khách sạn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
