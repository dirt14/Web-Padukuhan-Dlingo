import { Metadata } from 'next'
import Link from 'next/link'
import { Bell, Calendar, AlertTriangle } from 'lucide-react'
import prisma from '@/lib/db'
import { getCategoryLabel, formatDate, truncate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Pengumuman',
  description: 'Daftar pengumuman dan informasi penting untuk warga Dusun Dlingo'
}

async function getAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      include: { author: { select: { name: true } } }
    })
    return announcements
  } catch {
    return []
  }
}

export default async function PengumumanPage() {
  const announcements = await getAnnouncements()

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'BANTUAN_SOSIAL', name: 'Bantuan Sosial' },
    { id: 'KESEHATAN', name: 'Kesehatan' },
    { id: 'KEGIATAN_DUSUN', name: 'Kegiatan Dusun' },
    { id: 'UMUM', name: 'Umum' },
  ]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Pengumuman</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Informasi penting dan pengumuman terbaru untuk warga Dusun Dlingo
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        {announcements.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((item) => (
              <Link key={item.id} href={`/pengumuman/${item.slug}`} className="card group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <Bell className="h-12 w-12 text-white/50" />
                    </div>
                  )}
                  {item.priority === 'IMPORTANT' && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Penting
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                    {getCategoryLabel(item.category)}
                  </span>
                  <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {item.excerpt || truncate(item.content, 100)}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {item.publishedAt ? formatDate(item.publishedAt) : formatDate(item.createdAt)}
                    </span>
                    {item.author && <span>oleh {item.author.name}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Pengumuman</h3>
            <p className="text-gray-500">Pengumuman baru akan muncul di sini</p>
          </div>
        )}
      </div>
    </div>
  )
}
