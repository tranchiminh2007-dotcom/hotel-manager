import { prisma } from '@/lib/prisma'
import { bookingCreateSchema } from '@/lib/validators'
import { calculateNights } from '@/lib/format'

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = bookingCreateSchema.safeParse(body)

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
    return Response.json({ error: firstError || 'Dữ liệu không hợp lệ' }, { status: 400 })
  }

  const { checkIn, checkOut, numGuests, roomId, fullName, email, phone, idNumber, nationality, specialRequests, discountCode } = parsed.data

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: { roomType: true },
  })

  if (!room) {
    return Response.json({ error: 'Phòng không tồn tại' }, { status: 404 })
  }

  const nights = calculateNights(checkIn, checkOut)
  if (nights < 1) {
    return Response.json({ error: 'Ngày trả phòng phải sau ngày nhận phòng' }, { status: 400 })
  }

  let totalPrice = room.roomType.basePrice * nights
  let discountCodeId: string | null = null

  if (discountCode) {
    const dc = await prisma.discountCode.findUnique({
      where: { code: discountCode },
    })

    if (dc && dc.isActive && dc.usedCount < dc.maxUses && nights >= dc.minNights && new Date() >= dc.validFrom && new Date() <= dc.validTo) {
      if (dc.type === 'PERCENTAGE') {
        totalPrice = Math.round(totalPrice * (1 - dc.value / 100))
      } else {
        totalPrice = Math.max(0, totalPrice - dc.value)
      }
      discountCodeId = dc.id

      await prisma.discountCode.update({
        where: { id: dc.id },
        data: { usedCount: { increment: 1 } },
      })
    }
  }

  let guest = await prisma.guest.findFirst({
    where: { phone },
  })

  if (!guest) {
    guest = await prisma.guest.create({
      data: { fullName, email: email || null, phone, idNumber: idNumber || null, nationality },
    })
  }

  const now = new Date()
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const count = await prisma.booking.count()
  const code = `BK-${dateStr}-${String(count + 1).padStart(3, '0')}`

  const booking = await prisma.booking.create({
    data: {
      code,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      numGuests,
      totalPrice,
      status: 'PENDING',
      specialRequests: specialRequests || null,
      guestId: guest.id,
      roomId,
      discountCodeId,
    },
    include: {
      room: { include: { roomType: true } },
      guest: true,
    },
  })

  return Response.json(booking, { status: 201 })
}
