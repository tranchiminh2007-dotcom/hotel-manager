import { prisma } from '@/lib/prisma'
import { reviewSchema } from '@/lib/validators'

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(reviews)
}

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = reviewSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 })
  }

  const review = await prisma.review.create({
    data: {
      guestName: parsed.data.guestName,
      rating: parsed.data.rating,
      content: parsed.data.content || null,
    },
  })

  return Response.json(review, { status: 201 })
}
