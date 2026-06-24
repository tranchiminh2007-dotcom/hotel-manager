import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatDate } from '@/lib/format'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Star, Trash2 } from 'lucide-react'

async function deleteReview(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await prisma.review.delete({ where: { id } })
  redirect('/admin/danh-gia')
}

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đánh giá</h1>
          <p className="text-sm text-gray-500 mt-1">
            {reviews.length} đánh giá • Trung bình: {avgRating}/5
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">{review.guestName}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                </div>
                {review.content && <p className="text-sm text-gray-600">{review.content}</p>}
              </div>
              <form action={deleteReview}>
                <input type="hidden" name="id" value={review.id} />
                <Button type="submit" variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        ))}

        {reviews.length === 0 && (
          <p className="text-center text-gray-500 py-8">Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  )
}
