'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useLanguage } from '@/lib/language-context'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<{ id: string; guestName: string; rating: number; content: string | null; createdAt: string }[]>([])
  const [loaded, setLoaded] = useState(false)
  const [formData, setFormData] = useState({ guestName: '', rating: 0, content: '' })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const { t } = useLanguage()

  async function loadReviews() {
    const res = await fetch('/api/reviews')
    if (res.ok) {
      const data = await res.json()
      setReviews(data)
    }
    setLoaded(true)
  }

  useEffect(() => {
    loadReviews()
  }, [])

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.guestName || formData.rating === 0) return

    setSubmitting(true)
    setMessage('')

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setMessage('Cảm ơn bạn đã đánh giá!')
      setFormData({ guestName: '', rating: 0, content: '' })
      loadReviews()
    } else {
      setMessage('Có lỗi xảy ra, vui lòng thử lại.')
    }
    setSubmitting(false)
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('reviews.title')}</h1>
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Star className="h-8 w-8 text-amber-400 fill-current" />
              <span className="text-4xl font-bold text-gray-900">{avgRating}</span>
              <span className="text-gray-500 text-lg">/ 5 ({reviews.length} {t('reviews.reviews')})</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                {review.content && <p className="text-gray-600 mb-3">{review.content}</p>}
                <p className="font-semibold text-gray-900 text-sm">{review.guestName}</p>
              </Card>
            ))}
            {reviews.length === 0 && loaded && (
              <p className="text-center text-gray-500 py-8">Chưa có đánh giá nào.</p>
            )}
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('reviews.writeReview')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Họ tên"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="Nhập họ tên của bạn"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá</label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        className="p-0.5"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            i < formData.rating ? 'text-amber-400 fill-current' : 'text-gray-300 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhận xét (tùy chọn)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {message && (
                  <p className={`text-sm ${message.includes('lỗi') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={submitting || formData.rating === 0}>
                  {submitting ? t('reviews.submitting') : t('reviews.submit')}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
