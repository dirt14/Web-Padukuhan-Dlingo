'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, ChevronDown, Home, Users, Calendar, Bell, Image as ImageIcon, Phone, BarChart3, BookOpen, MessageSquare } from 'lucide-react'

interface SiteSettings {
  siteName?: string
  showForum?: boolean
  showDemographics?: boolean
  showSuggestionBox?: boolean
  showGallery?: boolean
  showKegiatan?: boolean
  showPengumuman?: boolean
  showKarangTaruna?: boolean
  showEdukasi?: boolean
}

interface NavbarClientProps {
  settings: SiteSettings | null
}

export default function Navbar({ settings }: NavbarClientProps) {
  const siteName = settings?.siteName || 'Dusun Dlingo'

  // Build dynamic navigation based on settings
  const buildNavigation = () => {
    const nav: any[] = [
      { name: 'Beranda', href: '/', icon: Home },
      {
        name: 'Profil Desa',
        icon: Users,
        children: [
          { name: 'Visi & Misi', href: '/profil/visi-misi' },
          { name: 'Struktur Organisasi', href: '/profil/struktur' },
        ],
      },
    ]

    // Data & Informasi - conditional children
    const dataInfoChildren: any[] = []
    if (settings?.showDemographics !== false) {
      dataInfoChildren.push({ name: 'Demografi', href: '/data/demografi' })
    }
    if (settings?.showSuggestionBox !== false) {
      dataInfoChildren.push({ name: 'Kotak Saran', href: '/informasi/saran' })
    }
    if (dataInfoChildren.length > 0) {
      nav.push({
        name: 'Data & Informasi',
        icon: BarChart3,
        children: dataInfoChildren,
      })
    }

    // Kegiatan - conditional display and children
    if (settings?.showKegiatan !== false) {
      const kegiatanChildren: any[] = [
        { name: 'Bank Sampah', href: '/kegiatan/bank-sampah' },
        { name: 'Pengajian', href: '/kegiatan/pengajian' },
      ]

      if (settings?.showKarangTaruna !== false) {
        kegiatanChildren.push({ name: 'Karang Taruna', href: '/kegiatan/karang-taruna' })
      }

      kegiatanChildren.push({ name: 'Semua Kegiatan', href: '/kegiatan' })

      nav.push({
        name: 'Kegiatan',
        icon: Calendar,
        children: kegiatanChildren,
      })
    }

    if (settings?.showEdukasi !== false) {
      nav.push({ name: 'Portal Edukasi', href: '/edukasi', icon: BookOpen })
    }
    if (settings?.showForum !== false) {
      nav.push({ name: 'Forum', href: '/forum', icon: MessageSquare })
    }
    if (settings?.showPengumuman !== false) {
      nav.push({ name: 'Pengumuman', href: '/pengumuman', icon: Bell })
    }
    if (settings?.showGallery !== false) {
      nav.push({ name: 'Galeri', href: '/galeri', icon: ImageIcon })
    }

    nav.push({ name: 'Kontak', href: '/kontak', icon: Phone })

    return nav
  }

  const navigation = buildNavigation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo_dusun.svg"
                alt="Logo Dusun Dlingo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-gray-900">{siteName}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        item.children.some((child) => isActive(child.href))
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-sm ${
                              isActive(child.href)
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href!)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      <span className="flex items-center">
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2 text-sm rounded-lg ${
                              isActive(child.href)
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-lg ${
                      isActive(item.href!)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
