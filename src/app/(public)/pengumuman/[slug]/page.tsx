import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, AlertTriangle, Share2 } from 'lucide-react'
import prisma from '@/lib/db'
import { getCategoryLabel, formatDateTime } from '@/lib/utils'

// Disable caching - always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

async function getAnnouncement(slug: string) {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } }
    })
    return announcement
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const announcement = await getAnnouncement(slug)

  if (!announcement) {
    return { title: 'Pengumuman Tidak Ditemukan' }
  }

  return {
    title: announcement.title,
    description: announcement.excerpt || announcement.content.slice(0, 160)
  }
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const { slug } = await params
  const announcement = await getAnnouncement(slug)

  if (!announcement) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/pengumuman" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Pengumuman
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {getCategoryLabel(announcement.category)}
            </span>
            {announcement.priority === 'IMPORTANT' && (
              <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full flex items-center">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                Penting
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{announcement.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              {announcement.publishedAt ? formatDateTime(announcement.publishedAt) : formatDateTime(announcement.createdAt)}
            </span>
            {announcement.author && (
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                {announcement.author.name}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        {announcement.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={announcement.image} alt={announcement.title} className="w-full h-auto" />
          </div>
        )}

        {/* Content */}
        <div className="card p-6 md:p-8">
          <div
            className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          />
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <span className="text-sm text-gray-600">Bagikan pengumuman ini:</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white rounded-lg border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pengumuman Lainnya</h2>
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">Lihat pengumuman lainnya di halaman daftar pengumuman</p>
            <Link href="/pengumuman" className="btn-primary mt-4">
              Lihat Semua Pengumuman
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
