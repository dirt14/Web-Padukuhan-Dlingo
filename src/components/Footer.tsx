import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

interface SiteSettings {
  siteName?: string | null
  footerAbout?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  facebook?: string | null
  instagram?: string | null
  twitter?: string | null
  youtube?: string | null
}

interface FooterProps {
  settings: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const siteName = settings?.siteName || 'Dusun Dlingo'
  const footerAbout = settings?.footerAbout || 'Website resmi Dusun Dlingo. Portal informasi untuk warga tentang pengumuman, kegiatan, dan layanan dusun.'
  const phone = settings?.phone || '+62 812 3456 7890'
  const email = settings?.email || 'dusundlingo@gmail.com'
  const address = settings?.address || 'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo, DIY 55671'

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/logo_dusun.svg"
                alt="Logo Dusun Dlingo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white">{siteName}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {footerAbout}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profil/visi-misi" className="text-sm hover:text-primary-400 transition-colors">
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/profil/struktur" className="text-sm hover:text-primary-400 transition-colors">
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-sm hover:text-primary-400 transition-colors">
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/kegiatan" className="text-sm hover:text-primary-400 transition-colors">
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-sm hover:text-primary-400 transition-colors">
                  Galeri
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm">{phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm">{email}</span>
              </li>
            </ul>

            {/* Social Media */}
            {(settings?.facebook || settings?.instagram || settings?.twitter || settings?.youtube) && (
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3 text-sm">Ikuti Kami</h4>
                <div className="flex items-center space-x-3">
                  {settings?.facebook && (
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                  {settings?.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {settings?.twitter && (
                    <a
                      href={settings.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {settings?.youtube && (
                    <a
                      href={settings.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Youtube className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {siteName}. Semua hak dilindungi.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
