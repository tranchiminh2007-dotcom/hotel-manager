import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guests = searchParams.get('guests')
  const type = searchParams.get('type')

  if (!checkIn || !checkOut) {
    return Response.json({ error: 'Vui lòng chọn ngày nhận và trả phòng' }, { status: 400 })
  }

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const numGuests = guests ? parseInt(guests) : 1

  const bookedRoomIds = await prisma.booking.findMany({
    where: {
      status: { in: ['PENDING', 'CONFIRMED', 'CHECKED_IN'] },
      OR: [
        { checkIn: { lt: checkOutDate }, checkOut: { gt: checkInDate } },
      ],
    },
    select: { roomId: true },
  })

  const bookedIds = bookedRoomIds.map((b) => b.roomId)

  const roomTypes = await prisma.roomType.findMany({
    where: {
      maxGuests: { gte: numGuests },
      ...(type ? { slug: type } : {}),
    },
    include: {
      images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      rooms: {
        where: {
          status: 'AVAILABLE',
          id: { notIn: bookedIds },
        },
      },
    },
    orderBy: { basePrice: 'asc' },
  })

  const result = roomTypes
    .filter((rt) => rt.rooms.length > 0)
    .map((rt) => ({
      id: rt.id,
      name: rt.name,
      slug: rt.slug,
      basePrice: rt.basePrice,
      maxGuests: rt.maxGuests,
      size: rt.size,
      bedType: rt.bedType,
      imageUrl: rt.images[0]?.url || null,
      availableRooms: rt.rooms.map((r) => ({
        id: r.id,
        number: r.number,
        floor: r.floor,
      })),
      availableCount: rt.rooms.length,
    }))

  return Response.json(result)
}
