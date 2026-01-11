import { Metadata } from 'next'
import { MapPin, Phone, Mail, MessageCircle, User } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Informasi kontak dan lokasi Dusun Dlingo'
}

async function getData() {
  try {
    const [profile, ktMembers, settings] = await Promise.all([
      prisma.villageProfile.findFirst(),
      prisma.organizationMember.findMany({
        where: { type: 'KARANG_TARUNA' },
        orderBy: { order: 'asc' },
        take: 3
      }),
      prisma.siteSettings.findFirst()
    ])
    return { profile, ktMembers, settings }
  } catch {
    return { profile: null, ktMembers: [], settings: null }
  }
}

export default async function KontakPage() {
  const { profile, settings } = await getData()

  const defaultAddress = 'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo'
  const defaultPhone = '+62 812 3456 7890'
  const defaultEmail = 'dusundlingo@gmail.com'
  const defaultDukuhName = 'Kepala Dusun Dlingo'
  const defaultKarangTarunaName = 'Ketua Karang Taruna Dlingo'
  const defaultKarangTarunaPhone = '+62 813 9876 5432'

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Hubungi Kami</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Silakan hubungi kami untuk informasi lebih lanjut tentang Dusun Dlingo
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {/* Pak Dukuh */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Kontak Pak Dukuh</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kepala Dusun</p>
                    <p className="font-medium text-gray-900">{(settings as any)?.dukuhName || defaultDukuhName}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telepon / WhatsApp</p>
                    <a href={`tel:${(settings as any)?.dukuhPhone || defaultPhone}`} className="font-medium text-gray-900 hover:text-primary-600">
                      {(settings as any)?.dukuhPhone || defaultPhone}
                    </a>
                  </div>
                </div>
                {(settings as any)?.dukuhEmail && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${(settings as any).dukuhEmail}`} className="font-medium text-gray-900 hover:text-primary-600">
                        {(settings as any).dukuhEmail}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Karang Taruna */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Kontak Karang Taruna</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ketua Karang Taruna</p>
                    <p className="font-medium text-gray-900">{(settings as any)?.karangTarunaName || defaultKarangTarunaName}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <a href={`https://wa.me/${((settings as any)?.karangTarunaPhone || defaultKarangTarunaPhone).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 hover:text-primary-600">
                      {(settings as any)?.karangTarunaPhone || defaultKarangTarunaPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Alamat</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Alamat Sekretariat</p>
                    <p className="font-medium text-gray-900">{settings?.address || profile?.address || defaultAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="card p-6 bg-primary-50 border-primary-100">
              <h3 className="font-semibold text-gray-900 mb-4">Hubungi via WhatsApp</h3>
              <p className="text-sm text-gray-600 mb-4">
                Untuk respon yang lebih cepat, silakan hubungi kami melalui WhatsApp
              </p>
              <a
                href={`https://wa.me/${((settings as any)?.dukuhPhone || defaultPhone).replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
