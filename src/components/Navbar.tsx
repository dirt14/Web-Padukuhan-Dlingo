'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, ChevronDown, Home, Users, Calendar, Bell, Image as ImageIcon, Phone, BarChart3, BookOpen, MessageSquare, Inbox, UsersRound } from 'lucide-react'

interface SiteSettings {
  siteName?: string | null
  showForum?: boolean | null
  showDemographics?: boolean | null
  showSuggestionBox?: boolean | null
  showGallery?: boolean | null
  showKegiatan?: boolean | null
  showPengumuman?: boolean | null
  showKarangTaruna?: boolean | null
  showEdukasi?: boolean | null
}

interface NavbarClientProps {
  settings: SiteSettings | null
}

interface NavItem {
  name: string
  href?: string
  icon?: any
  children?: Array<{ name: string; href: string }>
}

export default function Navbar({ settings }: NavbarClientProps) {
  const siteName = settings?.siteName || 'Dusun Dlingo'

  // Build dynamic navigation based on settings
  // Urutan: Beranda > Profil > Pengumuman > Kegiatan > Karang Taruna > Demografi > Edukasi > Galeri > Kotak Saran > Kontak
  const buildNavigation = () => {
    const nav: NavItem[] = [
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

    // Pengumuman - informasi penting untuk warga
    if (settings?.showPengumuman !== false) {
      nav.push({ name: 'Pengumuman', href: '/pengumuman', icon: Bell })
    }

    // Kegiatan - aktivitas rutin dusun
    if (settings?.showKegiatan !== false) {
      nav.push({ name: 'Kegiatan', href: '/kegiatan', icon: Calendar })
    }

    // Karang Taruna - organisasi pemuda
    if (settings?.showKarangTaruna !== false) {
      nav.push({ name: 'Karang Taruna', href: '/karang-taruna', icon: UsersRound })
    }

    // Demografi - data statistik penduduk
    if (settings?.showDemographics !== false) {
      nav.push({ name: 'Demografi', href: '/data/demografi', icon: BarChart3 })
    }

    // Portal Edukasi - artikel edukatif
    if (settings?.showEdukasi !== false) {
      nav.push({ name: 'Edukasi', href: '/edukasi', icon: BookOpen })
    }

    // Galeri - dokumentasi foto
    if (settings?.showGallery !== false) {
      nav.push({ name: 'Galeri', href: '/galeri', icon: ImageIcon })
    }

    // Kotak Saran - feedback warga
    if (settings?.showSuggestionBox !== false) {
      nav.push({ name: 'Kotak Saran', href: '/informasi/saran', icon: Inbox })
    }

    // Kontak - selalu di akhir
    nav.push({ name: 'Kontak', href: '/kontak', icon: Phone })

    return nav
  }

  const navigation = buildNavigation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/images/logo_dusun.svg"
                  alt="Logo Dusun Dlingo"
                  width={40}
                  height={40}
                  className="w-10 h-10 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-600">
                {siteName}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1" ref={dropdownRef}>
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        item.children.some((child) => isActive(child.href))
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-strong border border-gray-100 py-2 animate-slide-in-down overflow-hidden">
                        {item.children.map((child, index) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                              isActive(child.href)
                                ? 'text-primary-600 bg-primary-50 font-medium'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600 hover:pl-5'
                            }`}
                            style={{ animationDelay: `${index * 30}ms` }}
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
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href!)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
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
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-in-down">
          <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navigation.map((item, index) => (
              <div
                key={item.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      className="flex items-center justify-between w-full px-3 py-2.5 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="ml-8 mt-1 space-y-1 animate-slide-in-down">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                              isActive(child.href)
                                ? 'text-primary-600 bg-primary-50 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
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
                    className={`flex items-center gap-2 px-3 py-2.5 text-base font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href!)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
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
