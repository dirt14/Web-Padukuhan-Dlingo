import { Metadata } from 'next'
import { MapPin, Phone, Mail, MessageCircle, User } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Informasi kontak dan lokasi Dusun Dlingo'
}

async function getData() {
  try {
    const [profile, ktMembers] = await Promise.all([
      prisma.villageProfile.findFirst(),
      prisma.organizationMember.findMany({
        where: { type: 'KARANG_TARUNA' },
        orderBy: { order: 'asc' },
        take: 3
      })
    ])
    return { profile, ktMembers }
  } catch {
    return { profile: null, ktMembers: [] }
  }
}

export default async function KontakPage() {
  const { profile, ktMembers } = await getData()

  const defaultAddress = 'Dusun Dlingo, Desa Dlingo, Kecamatan Dlingo, Kabupaten Bantul, Daerah Istimewa Yogyakarta'
  const defaultPhone = '+62 812 3456 7890'
  const defaultEmail = 'dusundlingo@gmail.com'
  const defaultMapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.123456789!2d110.4589936!3d-7.8834629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5d1234567890%3A0x1234567890abcdef!2sDlingo%2C%20Kec.%20Dlingo%2C%20Kabupaten%20Bantul%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1704500000000!5m2!1sid!2sid'
  const googleMapsLink = 'https://maps.app.goo.gl/uhG1RJsNNMJhgdcA8'

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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
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
                    <p className="font-medium text-gray-900">Bapak Dukuh Dlingo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telepon / WhatsApp</p>
                    <a href={`tel:${profile?.phone || defaultPhone}`} className="font-medium text-gray-900 hover:text-primary-600">
                      {profile?.phone || defaultPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${profile?.email || defaultEmail}`} className="font-medium text-gray-900 hover:text-primary-600">
                      {profile?.email || defaultEmail}
                    </a>
                  </div>
                </div>
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
                    <p className="font-medium text-gray-900">Ketua Karang Taruna Dlingo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="font-medium text-gray-900">+62 813 9876 5432</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Alamat</h2>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Alamat Sekretariat</p>
                  <p className="font-medium text-gray-900">{profile?.address || defaultAddress}</p>
                  <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block"
                  >
                    Lihat di Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="aspect-[4/3]">
                <iframe
                  src={profile?.mapEmbed || defaultMapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Dusun Dlingo"
                ></iframe>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="card p-6 bg-primary-50 border-primary-100">
              <h3 className="font-semibold text-gray-900 mb-4">Hubungi via WhatsApp</h3>
              <p className="text-sm text-gray-600 mb-4">
                Untuk respon yang lebih cepat, silakan hubungi kami melalui WhatsApp
              </p>
              <a
                href={`https://wa.me/${(profile?.phone || defaultPhone).replace(/\D/g, '')}`}
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
