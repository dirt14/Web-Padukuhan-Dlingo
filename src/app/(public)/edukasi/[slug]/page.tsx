import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Eye, Clock, Tag } from 'lucide-react'
import prisma from '@/lib/db'
import { formatDate } from '@/lib/utils'
import ArticleComments from '@/components/ArticleComments'

// Disable caching - always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug }
    })

    // Increment views
    if (article && article.status === 'PUBLISHED') {
      await prisma.article.update({
        where: { id: article.id },
        data: { views: { increment: 1 } }
      })
    }

    return article
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: 'Artikel Tidak Ditemukan' }
  }

  return {
    title: article.title,
    description: article.excerpt || article.content.slice(0, 160)
  }
}

const categories = {
  KESEHATAN: { label: 'Kesehatan', color: 'bg-green-100 text-green-800' },
  PERTANIAN: { label: 'Pertanian', color: 'bg-yellow-100 text-yellow-800' },
  KEWIRAUSAHAAN: { label: 'Kewirausahaan', color: 'bg-blue-100 text-blue-800' },
  PENDIDIKAN: { label: 'Pendidikan', color: 'bg-purple-100 text-purple-800' },
  LAINNYA: { label: 'Lainnya', color: 'bg-gray-100 text-gray-800' }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article || article.status !== 'PUBLISHED') {
    notFound()
  }

  const categoryInfo = categories[article.category as keyof typeof categories] || categories.LAINNYA
  const tags = article.tags ? article.tags.split(',').map(t => t.trim()).filter(Boolean) : []

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/edukasi" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Portal Edukasi
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${categoryInfo.color}`}>
              {categoryInfo.label}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {article.views} views
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {article.publishedAt ? formatDate(article.publishedAt) : formatDate(article.createdAt)}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{article.title}</h1>
          {article.excerpt && (
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">{article.excerpt}</p>
          )}
        </div>

        {/* Image */}
        {article.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-auto" />
          </div>
        )}

        {/* Content */}
        <div className="card p-6 md:p-8 mb-8">
          <div
            className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="card p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Bagikan Artikel</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Salin Link
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <ArticleComments articleSlug={slug} />
      </div>
    </div>
  )
}
