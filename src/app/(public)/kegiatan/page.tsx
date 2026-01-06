import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, MapPin, User, ArrowRight } from 'lucide-react'
import prisma from '@/lib/db'
import { getCategoryLabel, truncate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Kegiatan',
  description: 'Daftar kegiatan rutin dan program di Dusun Dlingo'
}

async function getActivities() {
  try {
    const activities = await prisma.activity.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' }
    })
    return activities
  } catch {
    return []
  }
}

export default async function KegiatanPage() {
  const activities = await getActivities()

  const categories = [
    { id: 'all', name: 'Semua', count: activities.length },
    { id: 'BANK_SAMPAH', name: 'Bank Sampah', count: activities.filter(a => a.category === 'BANK_SAMPAH').length },
    { id: 'PENGAJIAN', name: 'Pengajian', count: activities.filter(a => a.category === 'PENGAJIAN').length },
    { id: 'KARANG_TARUNA', name: 'Karang Taruna', count: activities.filter(a => a.category === 'KARANG_TARUNA').length },
    { id: 'LAINNYA', name: 'Lainnya', count: activities.filter(a => a.category === 'LAINNYA').length },
  ]

  // Default activities if none exist
  const defaultActivities = [
    {
      id: '1',
      title: 'Bank Sampah Dlingo',
      slug: 'bank-sampah',
      description: 'Program pengelolaan sampah berbasis masyarakat untuk menjaga kebersihan lingkungan dusun.',
      category: 'BANK_SAMPAH',
      schedule: 'Setiap Minggu, 08:00 WIB',
      location: 'Balai Dusun Dlingo',
      image: null
    },
    {
      id: '2',
      title: 'Pengajian Rutin',
      slug: 'pengajian',
      description: 'Kegiatan keagamaan rutin untuk meningkatkan keimanan dan ketakwaan warga.',
      category: 'PENGAJIAN',
      schedule: 'Setiap Jumat, 19:30 WIB',
      location: 'Masjid Al-Ikhlas',
      image: null
    },
    {
      id: '3',
      title: 'Kegiatan Karang Taruna',
      slug: 'karang-taruna',
      description: 'Program pemberdayaan pemuda untuk pengembangan kreativitas dan kegiatan sosial.',
      category: 'KARANG_TARUNA',
      schedule: 'Setiap Sabtu, 16:00 WIB',
      location: 'Sekretariat Karang Taruna',
      image: null
    }
  ]

  const displayActivities = activities.length > 0 ? activities : defaultActivities

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Kegiatan Dusun</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Program dan kegiatan rutin yang dilaksanakan di Dusun Dlingo
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors cursor-pointer"
            >
              {cat.name}
              {cat.count > 0 && (
                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
              )}
            </span>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Link href="/kegiatan/bank-sampah" className="card p-6 hover:shadow-md transition-all group bg-green-50 border-green-100">
            <h3 className="font-semibold text-gray-900 group-hover:text-green-600 flex items-center justify-between">
              Bank Sampah
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-gray-600 mt-1">Program pengelolaan sampah</p>
          </Link>
          <Link href="/kegiatan/pengajian" className="card p-6 hover:shadow-md transition-all group bg-blue-50 border-blue-100">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 flex items-center justify-between">
              Pengajian
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-gray-600 mt-1">Kegiatan keagamaan rutin</p>
          </Link>
          <Link href="/kegiatan/karang-taruna" className="card p-6 hover:shadow-md transition-all group bg-amber-50 border-amber-100">
            <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 flex items-center justify-between">
              Karang Taruna
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-gray-600 mt-1">Program pemberdayaan pemuda</p>
          </Link>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayActivities.map((activity) => (
            <Link key={activity.id} href={`/kegiatan/${activity.slug}`} className="card group hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                {activity.image ? (
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-white/50" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {getCategoryLabel(activity.category)}
                </span>
                <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {activity.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {truncate(activity.description, 100)}
                </p>
                <div className="mt-4 space-y-2">
                  {activity.schedule && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {activity.schedule}
                    </p>
                  )}
                  {activity.location && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      {activity.location}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {displayActivities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Belum ada kegiatan</p>
          </div>
        )}
      </div>
    </div>
  )
}
