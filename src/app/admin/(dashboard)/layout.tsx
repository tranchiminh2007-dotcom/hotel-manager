import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/layout/AdminSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/dang-nhap')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar userName={session.user.name} userRole={session.user.role} />
      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Hệ thống quản trị khách sạn</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
