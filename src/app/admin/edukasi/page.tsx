'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Eye, BookOpen, Trash2 } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  status: string
  views: number
  image: string | null
  createdAt: string
  publishedAt: string | null
}

const categories: Record<string, string> = {
  KESEHATAN: 'Kesehatan',
  PERTANIAN: 'Pertanian',
  KEWIRAUSAHAAN: 'Kewirausahaan',
  PENDIDIKAN: 'Pendidikan',
  LAINNYA: 'Lainnya'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export default function AdminEdukasiPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles')
      const data = await res.json()
      if (data.articles) {
        setArticles(data.articles)
      }
    } catch {
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      return
    }

    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || 'Gagal menghapus artikel')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portal Edukasi</h1>
          <p className="text-gray-600 mt-1">Kelola artikel dan konten edukatif</p>
        </div>
        <Link href="/admin/edukasi/baru" className="btn-primary">
          <Plus className="h-4 w-4" />
          Buat Artikel Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Artikel</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{articles.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dipublikasi</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {articles.filter(a => a.status === 'PUBLISHED').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {articles.filter(a => a.status === 'DRAFT').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Edit className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {articles.reduce((sum, a) => sum + a.views, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="card overflow-hidden">
        {articles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <div className="flex items-start space-x-3">
                        {article.image ? (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-6 w-6 text-primary-600" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 line-clamp-2">{article.title}</p>
                          {article.excerpt && (
                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">{article.excerpt}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary">
                        {categories[article.category] || article.category}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600 flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.views}
                      </span>
                    </td>
                    <td>
                      {article.status === 'PUBLISHED' ? (
                        <span className="badge badge-success">Terbit</span>
                      ) : (
                        <span className="badge badge-gray">Draft</span>
                      )}
                    </td>
                    <td>
                      <span className="text-sm text-gray-600">
                        {article.publishedAt ? formatDate(article.publishedAt) : formatDate(article.createdAt)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/edukasi/${article.slug}`}
                          target="_blank"
                          className="btn-sm btn-ghost"
                          title="Lihat"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/edukasi/${article.id}`}
                          className="btn-sm btn-ghost"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={deleting === article.id}
                          className="btn-sm btn-ghost text-red-600 hover:bg-red-50 disabled:opacity-50"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Artikel</h3>
            <p className="text-gray-500 mb-6">Mulai buat artikel edukatif untuk warga dusun</p>
            <Link href="/admin/edukasi/baru" className="btn-primary">
              <Plus className="h-4 w-4" />
              Buat Artikel Pertama
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
