import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { ROOM_STATUS } from '@/lib/constants'

async function updateRoomStatus(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const status = formData.get('status') as string
  await prisma.room.update({ where: { id }, data: { status } })
  redirect('/admin/phong')
}

export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({
    orderBy: [{ floor: 'asc' }, { number: 'asc' }],
    include: { roomType: true },
  })

  const floors = [...new Set(rooms.map((r) => r.floor))].sort()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý phòng</h1>

      <div className="flex gap-4 mb-6 text-sm">
        {Object.entries(ROOM_STATUS).map(([key, val]) => {
          const count = rooms.filter((r) => r.status === key).length
          return (
            <div key={key} className="flex items-center gap-2">
              <Badge className={val.color}>{val.label}</Badge>
              <span className="text-gray-500">{count}</span>
            </div>
          )
        })}
      </div>

      {floors.map((floor) => (
        <div key={floor} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tầng {floor}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {rooms
              .filter((r) => r.floor === floor)
              .map((room) => {
                const status = ROOM_STATUS[room.status] || { label: room.status, color: 'bg-gray-100' }
                return (
                  <Card key={room.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-gray-900">{room.number}</span>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{room.roomType.name}</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(ROOM_STATUS).map(([key, val]) => {
                        if (key === room.status) return null
                        return (
                          <form key={key} action={updateRoomStatus}>
                            <input type="hidden" name="id" value={room.id} />
                            <input type="hidden" name="status" value={key} />
                            <button
                              type="submit"
                              className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 text-gray-600"
                            >
                              {val.label}
                            </button>
                          </form>
                        )
                      })}
                    </div>
                  </Card>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
