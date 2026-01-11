import { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, Plus, Eye, MessageCircle, Pin, User, Calendar } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Forum Diskusi',
  description: 'Forum diskusi dan tanya jawab warga Dusun Dlingo'
}

async function getForumData() {
  try {
    const [categories, topics] = await Promise.all([
      prisma.forumCategory.findMany({
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: { topics: true }
          }
        }
      }),
      prisma.forumTopic.findMany({
        where: { status: 'APPROVED' },
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' }
        ],
        take: 10,
        include: {
          category: true,
          _count: {
            select: { replies: true }
          }
        }
      })
    ])
    return { categories, topics }
  } catch {
    return { categories: [], topics: [] }
  }
}

export default async function ForumPage() {
  const { categories, topics } = await getForumData()

  // Default data jika database kosong
  const defaultCategories = [
    {
      id: '1',
      name: 'Diskusi Umum',
      slug: 'diskusi-umum',
      description: 'Diskusi umum tentang kehidupan di dusun',
      icon: '💬',
      order: 1,
      _count: { topics: 12 }
    },
    {
      id: '2',
      name: 'Tanya Jawab',
      slug: 'tanya-jawab',
      description: 'Ajukan pertanyaan seputar dusun',
      icon: '❓',
      order: 2,
      _count: { topics: 8 }
    },
    {
      id: '3',
      name: 'Saran & Kritik',
      slug: 'saran-kritik',
      description: 'Sampaikan saran dan kritik membangun',
      icon: '💡',
      order: 3,
      _count: { topics: 5 }
    }
  ]

  const defaultTopics = [
    {
      id: '1',
      title: 'Jadwal Kerja Bakti Bulan Ini',
      slug: 'jadwal-kerja-bakti',
      content: 'Kapan jadwal kerja bakti untuk bulan ini? Mohon informasinya',
      authorName: 'Budi Santoso',
      views: 45,
      isPinned: true,
      isLocked: false,
      createdAt: new Date('2024-01-10'),
      category: { name: 'Diskusi Umum', slug: 'diskusi-umum' },
      _count: { replies: 3 }
    },
    {
      id: '2',
      title: 'Tips Pengelolaan Sampah Rumah Tangga',
      slug: 'tips-sampah',
      content: 'Berbagi tips mengelola sampah rumah tangga yang baik',
      authorName: 'Siti Rahayu',
      views: 67,
      isPinned: false,
      isLocked: false,
      createdAt: new Date('2024-01-08'),
      category: { name: 'Diskusi Umum', slug: 'diskusi-umum' },
      _count: { replies: 5 }
    }
  ]

  const displayCategories = categories.length > 0 ? categories : defaultCategories
  const displayTopics = topics.length > 0 ? topics : defaultTopics

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Forum Diskusi Warga</h1>
            <p className="mt-2 text-gray-600">
              Tempat warga berdiskusi dan berbagi informasi
            </p>
          </div>
          <Link href="/forum/buat-topik" className="btn-primary">
            <Plus className="h-5 w-5 mr-2" />
            Buat Topik
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/forum/${category.slug}`}
              className="card p-6 hover:shadow-lg transition-shadow group block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{category.icon || '📁'}</div>
                <span className="text-xs font-medium px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                  {category._count.topics} topik
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-gray-600">{category.description}</p>
              )}
            </Link>
          ))}
        </div>

        {/* Recent Topics */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Topik Terbaru</h2>
            <div className="flex items-center text-sm text-gray-500">
              <MessageSquare className="h-4 w-4 mr-2" />
              {displayTopics.length} diskusi aktif
            </div>
          </div>
          <div className="space-y-3">
            {displayTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/forum/topik/${topic.slug}`}
                className="card p-5 hover:shadow-lg hover:border-primary-200 transition-all duration-200 group border-2 border-transparent"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {topic.isPinned && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full">
                          <Pin className="h-3 w-3" />
                          Disematkan
                        </span>
                      )}
                      <span className="text-xs font-medium px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {topic.category.name}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center font-medium text-gray-700">
                        <User className="h-4 w-4 mr-1.5" />
                        {topic.authorName}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1.5" />
                        {topic.views} views
                      </span>
                      <span className="flex items-center font-medium text-primary-600">
                        <MessageCircle className="h-4 w-4 mr-1.5" />
                        {topic._count.replies} balasan
                      </span>
                      <span className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {new Date(topic.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {displayTopics.length === 0 && (
          <div className="text-center py-12 card">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Belum ada topik diskusi</p>
            <Link href="/forum/buat-topik" className="btn-primary inline-flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Mulai Diskusi Pertama
            </Link>
          </div>
        )}

        {/* Rules */}
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-3">Aturan Forum:</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Gunakan bahasa yang sopan dan saling menghormati</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Topik akan dimoderasi sebelum ditampilkan</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Dilarang posting spam atau konten yang tidak pantas</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Fokus pada pembahasan yang bermanfaat untuk warga</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
