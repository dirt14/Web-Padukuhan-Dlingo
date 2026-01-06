import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, User, ArrowLeft, Clock } from 'lucide-react'
import prisma from '@/lib/db'
import { getCategoryLabel, formatDate } from '@/lib/utils'

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

// Default content for specific activities
const defaultContent: Record<string, { title: string; description: string; content: string; schedule: string; location: string }> = {
  'bank-sampah': {
    title: 'Bank Sampah Dlingo',
    description: 'Program pengelolaan sampah berbasis masyarakat untuk menjaga kebersihan lingkungan dusun.',
    content: `
## Tentang Bank Sampah

Bank Sampah Dlingo adalah program pengelolaan sampah berbasis masyarakat yang bertujuan untuk mengurangi volume sampah dan meningkatkan kesadaran warga akan pentingnya pengelolaan sampah yang baik.

## Manfaat

- Mengurangi volume sampah yang dibuang ke TPA
- Memberikan nilai ekonomis dari sampah yang dikumpulkan
- Meningkatkan kesadaran lingkungan warga
- Menciptakan lingkungan yang bersih dan sehat

## Jenis Sampah yang Diterima

- **Plastik**: Botol plastik, kantong plastik, kemasan plastik
- **Kertas**: Koran, majalah, kardus, kertas HVS
- **Logam**: Kaleng, aluminium, besi
- **Kaca**: Botol kaca, gelas kaca

## Cara Bergabung

1. Datang ke lokasi Bank Sampah pada jam operasional
2. Daftarkan diri sebagai anggota
3. Pilah sampah dari rumah sesuai kategori
4. Setor sampah dan dapatkan nilai tabungan
    `,
    schedule: 'Setiap Minggu, 08:00 - 11:00 WIB',
    location: 'Balai Dusun Dlingo'
  },
  'pengajian': {
    title: 'Pengajian Rutin',
    description: 'Kegiatan keagamaan rutin untuk meningkatkan keimanan dan ketakwaan warga.',
    content: `
## Tentang Pengajian Rutin

Pengajian rutin Dusun Dlingo adalah kegiatan keagamaan yang dilaksanakan secara berkala untuk meningkatkan keimanan dan ketakwaan warga serta mempererat tali silaturahmi antar warga.

## Jadwal Pengajian

### Pengajian Bapak-bapak
- **Hari**: Jumat malam
- **Waktu**: 19:30 WIB
- **Tempat**: Masjid Al-Ikhlas

### Pengajian Ibu-ibu
- **Hari**: Minggu siang
- **Waktu**: 13:00 WIB
- **Tempat**: Bergilir di rumah warga

### Pengajian Remaja
- **Hari**: Sabtu malam
- **Waktu**: 19:30 WIB
- **Tempat**: Mushola Al-Hidayah

## Kegiatan

- Pembacaan yasin dan tahlil
- Kajian kitab
- Ceramah agama
- Doa bersama
    `,
    schedule: 'Setiap Jumat, 19:30 WIB',
    location: 'Masjid Al-Ikhlas'
  },
  'karang-taruna': {
    title: 'Kegiatan Karang Taruna',
    description: 'Program pemberdayaan pemuda untuk pengembangan kreativitas dan kegiatan sosial.',
    content: `
## Tentang Karang Taruna

Karang Taruna Dusun Dlingo adalah organisasi kepemudaan yang bergerak di bidang pemberdayaan pemuda dan kegiatan sosial kemasyarakatan.

## Program Kerja

### Program Rutin
- Rapat koordinasi bulanan
- Kerja bakti lingkungan
- Olahraga bersama
- Pelatihan keterampilan

### Program Tahunan
- Peringatan Hari Kemerdekaan
- Festival Budaya Dusun
- Bakti sosial
- Turnamen olahraga

## Kegiatan Unggulan

- **Pelatihan Kewirausahaan**: Membekali pemuda dengan skill bisnis
- **Program Literasi**: Meningkatkan minat baca di kalangan pemuda
- **Olahraga Rutin**: Menjaga kesehatan jasmani anggota
- **Kegiatan Sosial**: Membantu warga yang membutuhkan

## Bergabung

Pemuda usia 15-40 tahun yang berdomisili di Dusun Dlingo dapat bergabung dengan Karang Taruna.
    `,
    schedule: 'Setiap Sabtu, 16:00 WIB',
    location: 'Sekretariat Karang Taruna'
  }
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params
  let activity = await getActivity(slug)

  // Use default content if not found in database
  if (!activity && defaultContent[slug]) {
    const def = defaultContent[slug]
    activity = {
      id: slug,
      title: def.title,
      slug,
      description: def.description,
      content: def.content,
      image: null,
      category: slug === 'bank-sampah' ? 'BANK_SAMPAH' : slug === 'pengajian' ? 'PENGAJIAN' : 'KARANG_TARUNA',
      schedule: def.schedule,
      location: def.location,
      responsible: null,
      status: 'PUBLISHED',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '',
      author: { name: 'Admin' },
      photos: []
    } as any
  }

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
            <div className="prose prose-gray max-w-none">
              {activity.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('## ', '')}</h2>
                } else if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-semibold text-gray-900 mt-4 mb-2">{line.replace('### ', '')}</h3>
                } else if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
                  if (match) {
                    return (
                      <p key={i} className="text-gray-600 my-1">
                        <strong className="text-gray-900">{match[1]}</strong>: {match[2]}
                      </p>
                    )
                  }
                  return <p key={i} className="text-gray-600 my-1">{line.replace('- **', '• ').replace('**', '')}</p>
                } else if (line.startsWith('- ')) {
                  return <p key={i} className="text-gray-600 my-1">• {line.replace('- ', '')}</p>
                } else if (line.match(/^\d+\. /)) {
                  return <p key={i} className="text-gray-600 my-1">{line}</p>
                } else if (line.trim()) {
                  return <p key={i} className="text-gray-600 my-2">{line}</p>
                }
                return null
              })}
            </div>
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
