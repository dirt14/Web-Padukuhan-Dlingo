import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-white">Dusun Dlingo</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Website resmi Dusun Dlingo. Portal informasi untuk warga tentang pengumuman, kegiatan, dan layanan dusun.
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
                <span className="text-sm">Dusun Dlingo, Desa Dlingo, Kecamatan Dlingo, Kabupaten Bantul, DIY</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm">dusundlingo@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Dusun Dlingo. Semua hak dilindungi.
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
