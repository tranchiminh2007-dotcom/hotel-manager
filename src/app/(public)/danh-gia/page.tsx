'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useLanguage } from '@/lib/language-context'

interface Review {
  id: string
  guestName: string
  rating: number
  content: string | null
  createdAt: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loaded, setLoaded] = useState(false)
  const [formData, setFormData] = useState({ guestName: '', rating: 0, content: '' })
  const [hover, setHover] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const { t } = useLanguage()

  async function loadReviews() {
    const res = await fetch('/api/reviews')
    if (res.ok) setReviews(await res.json())
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
      setMessage(t('reviews.thanks'))
      setFormData({ guestName: '', rating: 0, content: '' })
      loadReviews()
    } else {
      setMessage(t('reviews.error'))
    }
    setSubmitting(false)
  }

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-extralight uppercase leading-tight tracking-[0.22em] text-ink lg:text-[2.75rem]">
            {t('reviews.title')}
          </h1>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-brand">
            — {t('reviews.subtitle')} —
          </p>
          {reviews.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(Number(avgRating))
                        ? 'h-3.5 w-3.5 fill-brand text-brand'
                        : 'h-3.5 w-3.5 fill-line text-line'
                    }
                    strokeWidth={0}
                  />
                ))}
              </span>
              <span className="text-2xl font-extralight text-ink">{avgRating}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                / 5 · {reviews.length} {t('reviews.reviews')}
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Danh sách đánh giá */}
          <div className="lg:col-span-2">
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < review.rating
                              ? 'h-3 w-3 fill-brand text-brand'
                              : 'h-3 w-3 fill-line text-line'
                          }
                          strokeWidth={0}
                        />
                      ))}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.16em] text-ink-soft">
                      {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  {review.content && (
                    <p className="mt-5 font-display text-base font-light italic leading-relaxed text-ink-soft">
                      “{review.content}”
                    </p>
                  )}
                  <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-ink">
                    {review.guestName}
                  </p>
                </div>
              ))}
            </div>

            {reviews.length === 0 && loaded && (
              <p className="py-16 text-center text-xs font-light text-ink-soft">
                {t('reviews.noReviews')}
              </p>
            )}
          </div>

          {/* Form viết đánh giá */}
          <div>
            <div className="sticky top-32 bg-sand p-8">
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-ink">
                {t('reviews.writeReview')}
              </h2>
              <span className="mt-4 mb-7 block h-px w-10 bg-brand" />

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label={t('reviews.yourName')}
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  required
                />

                <div>
                  <label className="mb-2.5 block text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {t('reviews.rating')}
                  </label>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        onMouseEnter={() => setHover(i + 1)}
                        onMouseLeave={() => setHover(0)}
                      >
                        <Star
                          className={
                            i < (hover || formData.rating)
                              ? 'h-6 w-6 fill-brand text-brand transition-colors'
                              : 'h-6 w-6 fill-transparent text-ink-soft/40 transition-colors'
                          }
                          strokeWidth={1}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {t('reviews.comment')}
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    className="w-full border border-line bg-white px-4 py-3 text-sm font-light text-ink transition-colors focus:border-brand focus:outline-none"
                  />
                </div>

                {message && (
                  <p className="text-xs font-light text-brand-deep">{message}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting || formData.rating === 0}
                >
                  {submitting ? t('reviews.submitting') : t('reviews.submit')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
