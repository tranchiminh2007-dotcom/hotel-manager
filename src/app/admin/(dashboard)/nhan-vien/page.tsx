import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatDate } from '@/lib/format'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { TASK_PRIORITY, TASK_STATUS } from '@/lib/constants'

async function updateTaskStatus(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const status = formData.get('status') as string
  await prisma.task.update({ where: { id }, data: { status } })
  redirect('/admin/nhan-vien')
}

export default async function AdminTasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ status: 'asc' }, { priority: 'desc' }, { createdAt: 'desc' }],
    include: { assignedTo: true },
  })

  const grouped = {
    PENDING: tasks.filter((t) => t.status === 'PENDING'),
    IN_PROGRESS: tasks.filter((t) => t.status === 'IN_PROGRESS'),
    COMPLETED: tasks.filter((t) => t.status === 'COMPLETED'),
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý công việc</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([status, items]) => {
          const statusInfo = TASK_STATUS[status]
          return (
            <div key={status}>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                <span className="text-sm text-gray-500">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((task) => {
                  const priority = TASK_PRIORITY[task.priority]
                  return (
                    <Card key={task.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                        <Badge className={priority.color}>{priority.label}</Badge>
                      </div>
                      {task.description && (
                        <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                        {task.roomNumber && <span>Phòng {task.roomNumber}</span>}
                        {task.assignedTo && <span>→ {task.assignedTo.name}</span>}
                        {task.dueDate && <span>Hạn: {formatDate(task.dueDate)}</span>}
                      </div>
                      <div className="flex gap-1">
                        {status !== 'IN_PROGRESS' && status !== 'COMPLETED' && (
                          <form action={updateTaskStatus}>
                            <input type="hidden" name="id" value={task.id} />
                            <input type="hidden" name="status" value="IN_PROGRESS" />
                            <Button type="submit" size="sm" variant="outline" className="text-xs">
                              Bắt đầu
                            </Button>
                          </form>
                        )}
                        {status !== 'COMPLETED' && (
                          <form action={updateTaskStatus}>
                            <input type="hidden" name="id" value={task.id} />
                            <input type="hidden" name="status" value="COMPLETED" />
                            <Button type="submit" size="sm" className="text-xs">
                              Hoàn thành
                            </Button>
                          </form>
                        )}
                      </div>
                    </Card>
                  )
                })}
                {items.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">Không có công việc</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
