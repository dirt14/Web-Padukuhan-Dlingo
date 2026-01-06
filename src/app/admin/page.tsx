import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Bell, Calendar, Image, Users, ArrowRight, TrendingUp, Plus } from 'lucide-react'
import prisma from '@/lib/db'
import { formatDate } from '@/lib/utils'

async function getStats() {
  try {
    const [announcements, activities, photos, notifications] = await Promise.all([
      prisma.announcement.count(),
      prisma.activity.count(),
      prisma.photo.count(),
      prisma.notification.count({ where: { active: true } })
    ])
    return { announcements, activities, photos, notifications }
  } catch {
    return { announcements: 0, activities: 0, photos: 0, notifications: 0 }
  }
}

async function getRecentAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { author: { select: { name: true } } }
    })
    return announcements
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getStats()
  const recentAnnouncements = await getRecentAnnouncements()

  const statCards = [
    { name: 'Pengumuman', value: stats.announcements, icon: Bell, color: 'bg-blue-500', href: '/admin/pengumuman' },
    { name: 'Kegiatan', value: stats.activities, icon: Calendar, color: 'bg-green-500', href: '/admin/kegiatan' },
    { name: 'Foto', value: stats.photos, icon: Image, color: 'bg-purple-500', href: '/admin/galeri' },
    { name: 'Notifikasi Aktif', value: stats.notifications, icon: Bell, color: 'bg-amber-500', href: '/admin/notifikasi' },
  ]

  const quickActions = [
    { name: 'Buat Pengumuman', href: '/admin/pengumuman/baru', icon: Plus, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { name: 'Tambah Kegiatan', href: '/admin/kegiatan/baru', icon: Plus, color: 'bg-green-50 text-green-600 hover:bg-green-100' },
    { name: 'Upload Foto', href: '/admin/galeri/upload', icon: Plus, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
  ]

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Selamat datang, {session?.user?.name || 'Admin'}!
        </h1>
        <p className="text-gray-600 mt-1">
          Kelola konten website Dusun Dlingo dari dashboard ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.name} href={stat.href} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className={`flex items-center justify-center space-x-2 p-4 rounded-lg font-medium transition-colors ${action.color}`}
            >
              <action.icon className="h-5 w-5" />
              <span>{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Pengumuman Terbaru</h2>
          <Link href="/admin/pengumuman" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
            Lihat Semua
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentAnnouncements.length > 0 ? (
            recentAnnouncements.map((item) => (
              <Link
                key={item.id}
                href={`/admin/pengumuman/${item.id}`}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.author?.name} • {formatDate(item.createdAt)}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  item.status === 'PUBLISHED'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.status === 'PUBLISHED' ? 'Terbit' : 'Draft'}
                </span>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Belum ada pengumuman</p>
              <Link href="/admin/pengumuman/baru" className="btn-primary mt-4">
                Buat Pengumuman
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
