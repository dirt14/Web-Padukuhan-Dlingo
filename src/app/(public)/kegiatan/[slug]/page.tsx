import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, User, ArrowLeft, Clock } from 'lucide-react'
import prisma from '@/lib/db'
import { getCategoryLabel, formatDate } from '@/lib/utils'

// Disable caching - always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

async function getActivity(slug: string) {
  try {
    const activity = await prisma.activity.findUnique({
      where: { slug },
      include: {
        photos: true,
        author: { select: { name: true } }
      }
    })
    return activity
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivity(slug)

  if (!activity) {
    return { title: 'Kegiatan Tidak Ditemukan' }
  }

  return {
    title: activity.title,
    description: activity.description
  }
}


export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params
  const activity = await getActivity(slug)

  if (!activity) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/kegiatan" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Kegiatan
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {getCategoryLabel(activity.category)}
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">{activity.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{activity.description}</p>
        </div>

        {/* Image */}
        {activity.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={activity.image} alt={activity.title} className="w-full h-auto" />
          </div>
        )}

        {/* Meta Info */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {activity.schedule && (
            <div className="card p-4 flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-primary-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Jadwal</p>
                <p className="text-sm font-medium text-gray-900">{activity.schedule}</p>
              </div>
            </div>
          )}
          {activity.location && (
            <div className="card p-4 flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Lokasi</p>
                <p className="text-sm font-medium text-gray-900">{activity.location}</p>
              </div>
            </div>
          )}
          {activity.responsible && (
            <div className="card p-4 flex items-start space-x-3">
              <User className="h-5 w-5 text-primary-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Penanggung Jawab</p>
                <p className="text-sm font-medium text-gray-900">{activity.responsible}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activity.content && (
          <div className="card p-6 md:p-8">
            <div
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: activity.content }}
            />
          </div>
        )}

        {/* Photos */}
        {activity.photos && activity.photos.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Foto Kegiatan</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {activity.photos.map((photo: any) => (
                <div key={photo.id} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                  <img src={photo.url} alt={photo.caption || ''} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
