import { prisma } from '@/lib/prisma'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const room = await prisma.room.findUnique({
    where: { id },
    include: { roomType: true },
  })

  if (!room) {
    return Response.json({ error: 'Phòng không tồn tại' }, { status: 404 })
  }

  return Response.json(room)
}
