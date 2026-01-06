import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Target, Flag, Calendar, User, Phone, ArrowRight } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Karang Taruna',
  description: 'Profil Karang Taruna Dusun Dlingo - Organisasi kepemudaan untuk pemberdayaan masyarakat'
}

async function getData() {
  try {
    const [ktProfile, members, activities, photos] = await Promise.all([
      prisma.karangTarunaProfile.findFirst(),
      prisma.organizationMember.findMany({
        where: { type: 'KARANG_TARUNA' },
        orderBy: { order: 'asc' }
      }),
      prisma.activity.findMany({
        where: { category: 'KARANG_TARUNA', status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        take: 4
      }),
      prisma.photo.findMany({
        where: { category: 'KARANG_TARUNA' },
        orderBy: { createdAt: 'desc' },
        take: 6
      })
    ])
    return { ktProfile, members, activities, photos }
  } catch {
    return { ktProfile: null, members: [], activities: [], photos: [] }
  }
}

export default async function KarangTarunaPage() {
  const { ktProfile, members, activities, photos } = await getData()

  const defaultVision = 'Menjadi organisasi kepemudaan yang kreatif, inovatif, dan berdaya guna bagi masyarakat Dusun Dlingo'
  const defaultMission = `1. Mengembangkan potensi dan kreativitas pemuda dusun
2. Melaksanakan kegiatan sosial kemasyarakatan
3. Menjadi wadah aspirasi dan pemberdayaan pemuda
4. Membangun jaringan kerjasama dengan berbagai pihak
5. Melestarikan budaya dan kearifan lokal`

  const defaultMembers = [
    { id: '1', name: 'Ketua Karang Taruna', position: 'Ketua', image: null, phone: '+62 813 1234 5678', order: 1 },
    { id: '2', name: 'Wakil Ketua', position: 'Wakil Ketua', image: null, phone: null, order: 2 },
    { id: '3', name: 'Sekretaris', position: 'Sekretaris', image: null, phone: null, order: 3 },
    { id: '4', name: 'Bendahara', position: 'Bendahara', image: null, phone: null, order: 4 },
  ]

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

  const vision = ktProfile?.vision || defaultVision
  const missionText = ktProfile?.mission || defaultMission
  const missions = missionText.split('\n').filter(m => m.trim() && m.match(/^\d+\./))
  const workProgram = ktProfile?.workProgram || defaultWorkProgram
  const displayMembers = members.length > 0 ? members : defaultMembers

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Karang Taruna Dusun Dlingo</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {ktProfile?.description || 'Organisasi kepemudaan yang bergerak di bidang pemberdayaan pemuda dan kegiatan sosial kemasyarakatan di Dusun Dlingo'}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="card p-8 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Visi</h2>
            <p className="text-primary-100 leading-relaxed">&ldquo;{vision}&rdquo;</p>
          </div>

          {/* Mission */}
          <div className="card p-8">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <Flag className="h-7 w-7 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi</h2>
            <ul className="space-y-3">
              {missions.map((mission, index) => {
                const cleanMission = mission.replace(/^\d+\.\s*/, '')
                return (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-600 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{cleanMission}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Members */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Struktur Pengurus</h2>
            <p className="mt-2 text-gray-600">Pengurus Karang Taruna periode saat ini</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {displayMembers.map((member) => (
              <div key={member.id} className="card p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 text-white" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium">{member.position}</p>
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="mt-2 text-xs text-gray-500 flex items-center justify-center hover:text-primary-600">
                    <Phone className="h-3 w-3 mr-1" />
                    {member.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Work Program */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Program Kerja</h2>
            <p className="mt-2 text-gray-600">Program dan kegiatan Karang Taruna</p>
          </div>
          <div className="card p-8">
            <div className="prose prose-gray max-w-none">
              {workProgram.split('\n').map((line, i) => {
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-3 first:mt-0">{line.replace('### ', '')}</h3>
                } else if (line.startsWith('- ')) {
                  return <p key={i} className="text-gray-600 my-1 ml-4">• {line.replace('- ', '')}</p>
                } else if (line.trim()) {
                  return <p key={i} className="text-gray-600">{line}</p>
                }
                return null
              })}
            </div>
          </div>
        </div>

        {/* Activities */}
        {activities.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Kegiatan Terbaru</h2>
                <p className="mt-2 text-gray-600">Dokumentasi kegiatan Karang Taruna</p>
              </div>
              <Link href="/kegiatan/karang-taruna" className="btn-secondary hidden sm:flex">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.map((activity) => (
                <Link key={activity.id} href={`/kegiatan/${activity.slug}`} className="card group hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {activity.image ? (
                      <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <Calendar className="h-10 w-10 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {activity.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {photos.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Galeri</h2>
                <p className="mt-2 text-gray-600">Foto-foto kegiatan Karang Taruna</p>
              </div>
              <Link href="/galeri" className="btn-secondary hidden sm:flex">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img src={photo.url} alt={photo.caption || 'Foto Karang Taruna'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Bergabung dengan Karang Taruna</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Pemuda usia 15-40 tahun yang berdomisili di Dusun Dlingo dapat bergabung dengan Karang Taruna.
            Mari bersama-sama membangun dusun kita!
          </p>
          <Link href="/kontak" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
            Hubungi Kami
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
