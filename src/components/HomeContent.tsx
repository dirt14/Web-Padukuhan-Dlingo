'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Bell, Users, Recycle, BookOpen, TrendingUp, Heart, Eye, Sparkles, MapPin, Phone, Mail, Target, Flag } from 'lucide-react'
import { formatDate, truncate, getCategoryLabel } from '@/lib/utils'
import HeroCarousel from '@/components/HeroCarousel'
import AnimatedWave from '@/components/AnimatedWave'
import ScrollReveal from '@/components/ScrollReveal'

interface HomeContentProps {
  announcements: any[]
  activities: any[]
  articles: any[]
  settings: any
  profile: any
  ktProfile: any
  demographics: any
  totalActivities: number
}

export default function HomeContent({
  announcements,
  activities,
  articles,
  settings,
  ktProfile,
  demographics,
  totalActivities
}: HomeContentProps) {
  // Default work program Karang Taruna
  const defaultWorkProgram = `### Program Rutin
- Rapat koordinasi bulanan
- Kerja bakti lingkungan setiap minggu
- Olahraga bersama setiap Sabtu

### Program Tahunan
- Peringatan HUT RI
- Festival Budaya Dusun
- Bakti sosial
- Turnamen olahraga antar RT

### Program Unggulan
- Pelatihan kewirausahaan pemuda
- Program literasi dan edukasi
- Pemberdayaan ekonomi kreatif`

  const workProgram = ktProfile?.workProgram || defaultWorkProgram

  // Prepare hero images - support up to 3 images
  const heroImages = []
  if (settings?.heroImage) heroImages.push(settings.heroImage)
  if (settings?.heroImage2) heroImages.push(settings.heroImage2)
  if (settings?.heroImage3) heroImages.push(settings.heroImage3)

  // Featured announcement (penting)
  const featuredAnnouncement = announcements.find(a => a.priority === 'IMPORTANT')

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {heroImages.length > 0 ? (
          <HeroCarousel images={heroImages} />
        ) : (
          <div className="absolute inset-0 bg-black/20"></div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 lg:py-52 z-10">
          <div className="max-w-4xl">
            <ScrollReveal delay={0} direction="down" distance="20px">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Portal Informasi Resmi Dusun Dlingo</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100} direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                {settings?.heroTitle || 'Selamat Datang di Dusun Dlingo'}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="up">
              <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl">
                {settings?.heroSubtitle || 'Portal informasi resmi Dusun Dlingo. Temukan pengumuman, kegiatan, dan layanan untuk warga dusun.'}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300} direction="up">
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pengumuman"
                  className="group btn-primary bg-white text-primary-600 hover:bg-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Lihat Pengumuman
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/profil/visi-misi"
                  className="btn-secondary border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  Tentang Dusun
                </Link>
                <Link
                  href="/kontak"
                  className="btn-secondary border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  Hubungi Kami
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Animated Wave Separator */}
        <AnimatedWave />
      </section>

      {/* Featured Alert - Pengumuman Penting */}
      {featuredAnnouncement && (
        <section className="py-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/pengumuman/${featuredAnnouncement.slug}`} className="flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <Bell className="h-6 w-6 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-wide">Pengumuman Penting</p>
                  <p className="font-medium truncate group-hover:underline">{featuredAnnouncement.title}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      )}

      {/* Quick Stats - Enhanced */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Bell, value: announcements.length, label: 'Pengumuman', color: 'from-primary-500 to-primary-600' },
              { icon: Calendar, value: activities.length, label: 'Kegiatan', color: 'from-green-500 to-green-600' },
              { icon: Users, value: demographics?.totalPopulation || 0, label: 'Warga', color: 'from-amber-500 to-amber-600' },
              { icon: TrendingUp, value: totalActivities, label: 'Program Aktif', color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 100} direction="up">
                <div className="group text-center p-6 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <stat.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                <Bell className="h-4 w-4" />
                Update Terbaru
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pengumuman Terbaru</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Informasi penting dan terkini untuk warga dusun</p>
            </div>
          </ScrollReveal>

          {announcements.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {announcements.slice(0, 6).map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 100} direction="up">
                    <Link
                      href={`/pengumuman/${item.slug}`}
                      className="card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block h-full"
                    >
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <Bell className="h-16 w-16 text-white/50" />
                          </div>
                        )}
                        {item.priority === 'IMPORTANT' && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Penting
                          </span>
                        )}
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                          {formatDate(item.publishedAt || item.createdAt)}
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
                          {getCategoryLabel(item.category)}
                        </span>
                        <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {item.excerpt || truncate(item.content, 100)}
                        </p>
                        <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                          Baca Selengkapnya
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal delay={400} direction="up">
                <div className="mt-12 text-center">
                  <Link href="/pengumuman" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                    Lihat Semua Pengumuman
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <ScrollReveal direction="up">
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Belum ada pengumuman</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Activities Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                <Calendar className="h-4 w-4" />
                Agenda Dusun
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kegiatan Dusun</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Program dan kegiatan rutin yang melibatkan masyarakat</p>
            </div>
          </ScrollReveal>

          {activities.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {activities.slice(0, 6).map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 100} direction="up">
                    <Link
                      href={`/kegiatan/${item.slug}`}
                      className="card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block h-full"
                    >
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <Calendar className="h-16 w-16 text-white/50" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                          {getCategoryLabel(item.category)}
                        </span>
                        <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {truncate(item.description, 100)}
                        </p>
                        {item.schedule && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{item.schedule}</span>
                          </div>
                        )}
                        <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                          Lihat Detail
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal delay={400} direction="up">
                <div className="mt-12 text-center">
                  <Link href="/kegiatan" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                    Lihat Semua Kegiatan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <ScrollReveal direction="up">
              <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Belum ada kegiatan</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Karang Taruna Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                <Users className="h-4 w-4" />
                Organisasi Pemuda
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Program Kerja Karang Taruna</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {ktProfile?.description || 'Program dan kegiatan Karang Taruna untuk pemberdayaan pemuda Dusun Dlingo'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {(() => {
              const sections: { title: string; items: string[] }[] = []
              let currentSection: { title: string; items: string[] } | null = null

              workProgram.split('\n').forEach((line: string) => {
                if (line.startsWith('### ')) {
                  if (currentSection) sections.push(currentSection)
                  currentSection = { title: line.replace('### ', ''), items: [] }
                } else if (line.startsWith('- ') && currentSection) {
                  currentSection.items.push(line.replace('- ', ''))
                }
              })
              if (currentSection) sections.push(currentSection)

              const colors = [
                { bg: 'from-amber-500 to-amber-600', icon: 'bg-amber-100', iconText: 'text-amber-600' },
                { bg: 'from-orange-500 to-orange-600', icon: 'bg-orange-100', iconText: 'text-orange-600' },
                { bg: 'from-yellow-500 to-yellow-600', icon: 'bg-yellow-100', iconText: 'text-yellow-600' }
              ]

              return sections.slice(0, 3).map((section, index) => (
                <ScrollReveal key={index} delay={index * 150} direction="up">
                  <div className="card p-8 hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`w-14 h-14 ${colors[index]?.icon || 'bg-amber-100'} rounded-2xl flex items-center justify-center mb-6`}>
                      {index === 0 && <Calendar className={`h-7 w-7 ${colors[index]?.iconText || 'text-amber-600'}`} />}
                      {index === 1 && <Flag className={`h-7 w-7 ${colors[index]?.iconText || 'text-amber-600'}`} />}
                      {index === 2 && <Target className={`h-7 w-7 ${colors[index]?.iconText || 'text-amber-600'}`} />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-gray-600">
                          <span className={`w-2 h-2 ${colors[index]?.icon.replace('100', '500') || 'bg-amber-500'} rounded-full mt-2 flex-shrink-0`}></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))
            })()}
          </div>

          <ScrollReveal delay={450} direction="up">
            <div className="mt-12 text-center">
              <Link href="/karang-taruna" className="btn-primary bg-amber-500 hover:bg-amber-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                Selengkapnya Karang Taruna
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portal Edukasi Section - Enhanced */}
      {articles.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                  <BookOpen className="h-4 w-4" />
                  Artikel Edukatif
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Portal Edukasi</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Kumpulan artikel bermanfaat seputar kesehatan, pertanian, dan kewirausahaan</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
              {articles.slice(0, 3).map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 100} direction="up">
                  <Link
                    href={`/edukasi/${article.slug}`}
                    className="card overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white block h-full"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-primary-400" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Eye className="h-3 w-3 text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">{article.views}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-100 text-purple-700">
                        {article.category === 'KESEHATAN' && 'Kesehatan'}
                        {article.category === 'PERTANIAN' && 'Pertanian'}
                        {article.category === 'KEWIRAUSAHAAN' && 'Kewirausahaan'}
                        {article.category === 'PENDIDIKAN' && 'Pendidikan'}
                        {article.category === 'LAINNYA' && 'Lainnya'}
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatDate(article.publishedAt || article.createdAt)}
                        </span>
                        <span className="text-primary-600 font-medium text-sm group-hover:gap-1 flex items-center transition-all">
                          Baca
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Remaining articles in horizontal layout */}
            {articles.length > 3 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(3, 6).map((article, index) => (
                  <ScrollReveal key={article.id} delay={(index + 3) * 100} direction="up">
                    <Link
                      href={`/edukasi/${article.slug}`}
                      className="card p-4 flex gap-4 group hover:shadow-lg transition-all duration-300 bg-white"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <BookOpen className="h-10 w-10 text-primary-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                          {article.category === 'KESEHATAN' && 'Kesehatan'}
                          {article.category === 'PERTANIAN' && 'Pertanian'}
                          {article.category === 'KEWIRAUSAHAAN' && 'Kewirausahaan'}
                          {article.category === 'PENDIDIKAN' && 'Pendidikan'}
                          {article.category === 'LAINNYA' && 'Lainnya'}
                        </span>
                        <h3 className="mt-2 font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm leading-snug">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}

            <ScrollReveal delay={500} direction="up">
              <div className="mt-12 text-center">
                <Link href="/edukasi" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                  Jelajahi Semua Artikel
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Call to Action - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" distance="50px">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Bergabung dengan Komunitas Dusun Dlingo</h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Bersama kita membangun dusun yang lebih baik melalui gotong royong dan partisipasi aktif dalam berbagai kegiatan kemasyarakatan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/informasi/saran" className="btn-primary bg-white text-primary-600 hover:bg-gray-50 shadow-xl">
                    <Heart className="mr-2 h-5 w-5" />
                    Kirim Saran
                  </Link>
                  <Link href="/kontak" className="btn-secondary border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary-600">
                    <Phone className="mr-2 h-5 w-5" />
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Recycle, title: 'Bank Sampah', desc: 'Program pengelolaan sampah berbasis masyarakat' },
                { icon: BookOpen, title: 'Pengajian Rutin', desc: 'Kegiatan keagamaan untuk meningkatkan keimanan' },
                { icon: Users, title: 'Karang Taruna', desc: 'Organisasi pemuda untuk pemberdayaan' },
                { icon: TrendingUp, title: 'Program Aktif', desc: 'Berbagai program pemberdayaan masyarakat' }
              ].map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 100} direction="right" distance="30px">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                    <item.icon className="h-10 w-10 mb-3" />
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info - New Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: MapPin, title: 'Alamat', content: 'Dusun Dlingo, Kelurahan Banyuroto\nKecamatan Nanggulan\nKabupaten Kulon Progo', color: 'primary' },
              { icon: Phone, title: 'Telepon', content: '+62 xxx xxxx xxxx\nSenin - Jumat\n08:00 - 16:00 WIB', color: 'green' },
              { icon: Mail, title: 'Email', content: 'info@dusundlingo.id\nRespon dalam 1-2 hari kerja', color: 'blue' }
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100} direction="up">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Google Maps */}
          <ScrollReveal delay={300} direction="up">
            <div className="mt-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Lokasi Kami</h3>
                <p className="text-gray-600">Temukan kami di peta</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15811.128144646558!2d110.16893834172407!3d-7.81288261617394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7afa84548b5ebd%3A0x540c49b381b32922!2sDlingo%2C%20Banyuroto%2C%20Kec.%20Nanggulan%2C%20Kabupaten%20Kulon%20Progo%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1768383160642!5m2!1sid!2sid"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
