import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Bell, Users, Recycle, BookOpen } from 'lucide-react'
import prisma from '@/lib/db'
import { formatDate, truncate, getCategoryLabel } from '@/lib/utils'

async function getData() {
  try {
    const [announcements, activities, settings, profile] = await Promise.all([
      prisma.announcement.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        take: 4
      }),
      prisma.activity.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        take: 4
      }),
      prisma.siteSettings.findFirst(),
      prisma.villageProfile.findFirst()
    ])
    return { announcements, activities, settings, profile }
  } catch {
    return { announcements: [], activities: [], settings: null, profile: null }
  }
}

export default async function HomePage() {
  const { announcements, activities, settings, profile } = await getData()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        {settings?.heroImage && (
          <div className="absolute inset-0">
            <img
              src={settings.heroImage}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 to-primary-800/70"></div>
          </div>
        )}
        {!settings?.heroImage && (
          <div className="absolute inset-0 bg-black/20"></div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {settings?.heroTitle || 'Selamat Datang di Dusun Dlingo'}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-100 leading-relaxed">
              {settings?.heroSubtitle || 'Portal informasi resmi Dusun Dlingo. Temukan pengumuman, kegiatan, dan layanan untuk warga dusun.'}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/pengumuman"
                className="btn-primary bg-white text-primary-600 hover:bg-primary-50"
              >
                Lihat Pengumuman
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/profil/visi-misi"
                className="btn-secondary border-white text-white hover:bg-white/10 bg-transparent"
              >
                Tentang Dusun
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{announcements.length}+</div>
              <div className="text-sm text-gray-600">Pengumuman</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{activities.length}+</div>
              <div className="text-sm text-gray-600">Kegiatan</div>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Warga</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Recycle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Program Aktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Pengumuman Terbaru</h2>
              <p className="section-subtitle">Informasi penting untuk warga dusun</p>
            </div>
            <Link href="/pengumuman" className="btn-secondary hidden sm:flex">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {announcements.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Penting
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {getCategoryLabel(item.category)}
                    </span>
                    <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {item.excerpt || truncate(item.content, 80)}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {item.publishedAt ? formatDate(item.publishedAt) : formatDate(item.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada pengumuman</p>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link href="/pengumuman" className="btn-secondary">
              Lihat Semua Pengumuman
            </Link>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Kegiatan Dusun</h2>
              <p className="section-subtitle">Program dan kegiatan rutin masyarakat</p>
            </div>
            <Link href="/kegiatan" className="btn-secondary hidden sm:flex">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {activities.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.map((item) => (
                <Link key={item.id} href={`/kegiatan/${item.slug}`} className="card group hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {getCategoryLabel(item.category)}
                    </span>
                    <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {truncate(item.description, 80)}
                    </p>
                    {item.schedule && (
                      <p className="mt-2 text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.schedule}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada kegiatan</p>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link href="/kegiatan" className="btn-secondary">
              Lihat Semua Kegiatan
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Tentang Dusun Dlingo</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {settings?.aboutDusun || profile?.history || 'Dusun Dlingo adalah sebuah dusun yang terletak di Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta. Dusun ini dikenal dengan semangat gotong royong dan kebersamaan warganya dalam berbagai kegiatan sosial dan keagamaan.'}
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Recycle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Bank Sampah</h3>
                    <p className="text-sm text-gray-600">Program pengelolaan sampah berbasis masyarakat</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Pengajian Rutin</h3>
                    <p className="text-sm text-gray-600">Kegiatan keagamaan untuk meningkatkan keimanan</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Karang Taruna</h3>
                    <p className="text-sm text-gray-600">Organisasi pemuda untuk pemberdayaan masyarakat</p>
                  </div>
                </div>
              </div>
              <Link href="/profil/visi-misi" className="btn-primary mt-8">
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-64 h-64 flex items-center justify-center mx-auto mb-6">
                    <Image
                      src="/images/logo_dusun.svg"
                      alt="Logo Dusun Dlingo"
                      width={256}
                      height={256}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Dusun Dlingo</h3>
                  <p className="mt-2 text-gray-600">Bersama Membangun Dusun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
