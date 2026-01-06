import { Metadata } from 'next'
import { MapPin, Navigation, Phone, Mail } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Peta Lokasi',
  description: 'Lokasi dan peta Dusun Dlingo, Kecamatan Dlingo, Kabupaten Bantul, DIY'
}

async function getProfile() {
  try {
    const profile = await prisma.villageProfile.findFirst()
    return profile
  } catch {
    return null
  }
}

export default async function PetaPage() {
  const profile = await getProfile()

  const defaultAddress = 'Dusun Dlingo, Desa Dlingo, Kecamatan Dlingo, Kabupaten Bantul, Daerah Istimewa Yogyakarta'
  const defaultMapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31611.891835066867!2d110.41!3d-7.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDlingo!5e0!3m2!1sen!2sid!4v1234567890'

  const address = profile?.address || defaultAddress
  const mapEmbed = profile?.mapEmbed || defaultMapEmbed
  const phone = profile?.phone || '+62 812 3456 7890'
  const email = profile?.email || 'dusundlingo@gmail.com'

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Peta Lokasi</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Temukan lokasi Dusun Dlingo dan petunjuk arah menuju dusun kami
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="aspect-video md:aspect-[16/10]">
                <iframe
                  src={mapEmbed}
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
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Alamat</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{address}</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Kontak</h3>
              <div className="space-y-4">
                <a href={`tel:${phone}`} className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="text-sm">{phone}</span>
                </a>
                <a href={`mailto:${email}`} className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">{email}</span>
                </a>
              </div>
            </div>

            {/* Directions Card */}
            <div className="card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Navigation className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Petunjuk Arah</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Dari pusat Kota Yogyakarta, ambil arah selatan menuju Bantul.
                    Lanjutkan perjalanan ke arah timur menuju Kecamatan Dlingo.
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Landmarks */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Titik Referensi</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Balai Desa Dlingo - 500m</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Masjid Al-Ikhlas - 200m</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>SD Negeri Dlingo - 300m</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
