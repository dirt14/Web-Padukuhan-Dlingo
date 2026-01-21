import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, MapPin, User, ArrowRight } from 'lucide-react'
import prisma from '@/lib/db'
import { getCategoryLabel, truncate } from '@/lib/utils'

// Disable caching - always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
    { id: 'SOSIAL', name: 'Sosial', count: activities.filter(a => a.category === 'SOSIAL').length },
    { id: 'KEAGAMAAN', name: 'Keagamaan', count: activities.filter(a => a.category === 'KEAGAMAAN').length },
    { id: 'BUDAYA', name: 'Budaya', count: activities.filter(a => a.category === 'BUDAYA').length },
    { id: 'LAINNYA', name: 'Lainnya', count: activities.filter(a => a.category === 'LAINNYA').length },
  ]

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

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
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

        {activities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Belum ada kegiatan</p>
          </div>
        )}
      </div>
    </div>
  )
}
