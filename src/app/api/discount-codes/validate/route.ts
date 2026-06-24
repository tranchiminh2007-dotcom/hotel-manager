import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { code, nights, totalPrice } = await request.json()

  if (!code) {
    return Response.json({ error: 'Vui lòng nhập mã giảm giá' }, { status: 400 })
  }

  const dc = await prisma.discountCode.findUnique({
    where: { code: code.toUpperCase() },
  })

  if (!dc) {
    return Response.json({ error: 'Mã giảm giá không hợp lệ' }, { status: 404 })
  }

  if (!dc.isActive) {
    return Response.json({ error: 'Mã giảm giá đã hết hiệu lực' }, { status: 400 })
  }

  const now = new Date()
  if (now < dc.validFrom || now > dc.validTo) {
    return Response.json({ error: 'Mã giảm giá không trong thời gian áp dụng' }, { status: 400 })
  }

  if (dc.usedCount >= dc.maxUses) {
    return Response.json({ error: 'Mã giảm giá đã hết lượt sử dụng' }, { status: 400 })
  }

  if (nights && nights < dc.minNights) {
    return Response.json({ error: `Mã giảm giá yêu cầu tối thiểu ${dc.minNights} đêm` }, { status: 400 })
  }

  let discountAmount = 0
  if (dc.type === 'PERCENTAGE') {
    discountAmount = totalPrice ? Math.round(totalPrice * dc.value / 100) : 0
  } else {
    discountAmount = dc.value
  }

  return Response.json({
    code: dc.code,
    type: dc.type,
    value: dc.value,
    discountAmount,
    description: dc.type === 'PERCENTAGE' ? `Giảm ${dc.value}%` : `Giảm ${dc.value.toLocaleString('vi-VN')}đ`,
  })
}
