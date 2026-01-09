import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock, Eye, ArrowRight } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Portal Edukasi',
  description: 'Artikel dan informasi edukatif untuk warga Dusun Dlingo'
}

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 12
    })
    return articles
  } catch {
    return []
  }
}

export default async function EdukasiPage() {
  const articles = await getArticles()

  // Default articles jika database kosong
  const defaultArticles = [
    {
      id: '1',
      title: 'Tips Menjaga Kesehatan di Musim Hujan',
      slug: 'tips-kesehatan-musim-hujan',
      excerpt: 'Musim hujan membawa berbagai penyakit. Simak tips menjaga kesehatan keluarga Anda di musim hujan.',
      image: '/images/placeholder-health.jpg',
      category: 'KESEHATAN',
      views: 250,
      publishedAt: new Date('2024-01-15'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Budidaya Sayuran Organik di Pekarangan Rumah',
      slug: 'budidaya-sayuran-organik',
      excerpt: 'Pelajari cara menanam sayuran organik di pekarangan rumah untuk kebutuhan keluarga sehari-hari.',
      image: '/images/placeholder-agri.jpg',
      category: 'PERTANIAN',
      views: 180,
      publishedAt: new Date('2024-01-10'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Memulai Usaha Kecil dari Rumah',
      slug: 'memulai-usaha-kecil',
      excerpt: 'Panduan lengkap memulai usaha kecil-kecilan dari rumah dengan modal terbatas.',
      image: '/images/placeholder-business.jpg',
      category: 'KEWIRAUSAHAAN',
      views: 320,
      publishedAt: new Date('2024-01-08'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'Pentingnya Pendidikan Karakter untuk Anak',
      slug: 'pendidikan-karakter-anak',
      excerpt: 'Membangun karakter anak sejak dini untuk masa depan yang lebih baik.',
      image: '/images/placeholder-education.jpg',
      category: 'PENDIDIKAN',
      views: 200,
      publishedAt: new Date('2024-01-05'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const displayArticles = articles.length > 0 ? articles : defaultArticles

  const categories = {
    KESEHATAN: { label: 'Kesehatan', color: 'bg-green-100 text-green-800' },
    PERTANIAN: { label: 'Pertanian', color: 'bg-yellow-100 text-yellow-800' },
    KEWIRAUSAHAAN: { label: 'Kewirausahaan', color: 'bg-blue-100 text-blue-800' },
    PENDIDIKAN: { label: 'Pendidikan', color: 'bg-purple-100 text-purple-800' },
    LAINNYA: { label: 'Lainnya', color: 'bg-gray-100 text-gray-800' }
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Portal Edukasi</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Kumpulan artikel dan informasi edukatif seputar kesehatan, pertanian, kewirausahaan, dan pendidikan
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            href="/edukasi"
            className="px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Semua
          </Link>
          {Object.entries(categories).map(([key, { label, color }]) => (
            <Link
              key={key}
              href={`/edukasi?category=${key}`}
              className={`px-4 py-2 rounded-full ${color} text-sm font-medium hover:opacity-80 transition-opacity`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        {displayArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <Link
                key={article.id}
                href={`/edukasi/${article.slug}`}
                className="card overflow-hidden group hover:shadow-lg transition-shadow"
              >
                {article.image && (
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary-400" />
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        categories[article.category as keyof typeof categories]?.color ||
                        categories.LAINNYA.color
                      }`}
                    >
                      {categories[article.category as keyof typeof categories]?.label ||
                        categories.LAINNYA.label}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {article.views}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline flex items-center">
                      Baca Selengkapnya
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Belum ada artikel tersedia</p>
          </div>
        )}
      </div>
    </div>
  )
}
