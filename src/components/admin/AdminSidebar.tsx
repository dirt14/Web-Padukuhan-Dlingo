'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NextImage from 'next/image'
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Image,
  Users,
  Settings,
  FileText,
  MapPin,
  Menu,
  X,
  Home,
  UserCircle,
  BarChart3,
  MessageSquare,
  BookOpen
} from 'lucide-react'

interface AdminSidebarProps {
  user: {
    name?: string | null
    role: string
  }
}

// Urutan sesuai prioritas: Dashboard > Profil > Pengumuman > Kegiatan > Karang Taruna > Demografi > Edukasi > Galeri > Kotak Saran > Pengaturan
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Profil Dusun', href: '/admin/profil', icon: FileText },
  { name: 'Struktur Organisasi', href: '/admin/struktur', icon: Users },
  { name: 'Pengumuman', href: '/admin/pengumuman', icon: Bell },
  { name: 'Kegiatan', href: '/admin/kegiatan', icon: Calendar },
  { name: 'Karang Taruna', href: '/admin/karang-taruna', icon: UserCircle },
  { name: 'Data Demografi', href: '/admin/demografi', icon: BarChart3 },
  { name: 'Edukasi', href: '/admin/edukasi', icon: BookOpen },
  { name: 'Galeri', href: '/admin/galeri', icon: Image },
  { name: 'Kotak Saran', href: '/admin/saran', icon: MessageSquare },
  { name: 'Pengaturan', href: '/admin/pengaturan', icon: Settings },
]

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // All users have access to all features - no filtering needed
  const filteredNavigation = navigation

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 shadow-soft">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2 group">
            <NextImage
              src="/images/logo_dusun.svg"
              alt="Logo Dusun Dlingo"
              width={32}
              height={32}
              className="w-8 h-8 transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-600">Admin</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
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

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-200 animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Mobile sidebar */}
          <div
            className="fixed inset-y-0 left-0 w-72 bg-white shadow-strong animate-slide-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col pt-16 pb-4">
              {/* Navigation */}
              <div className="flex-1 px-4 overflow-y-auto">
                <nav className="space-y-1">
                  {filteredNavigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 animate-fade-in ${
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-700 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                      }`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <div className="px-4 pt-4 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <Home className="h-5 w-5" />
                  <span>Lihat Website</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-soft">
          {/* Logo & Brand */}
          <div className="flex items-center flex-shrink-0 px-4 h-16 border-b border-gray-200">
            <Link href="/admin" className="flex items-center space-x-2 group">
              <NextImage
                src="/images/logo_dusun.svg"
                alt="Logo Dusun Dlingo"
                width={40}
                height={40}
                className="w-10 h-10 transition-transform duration-200 group-hover:scale-110"
              />
              <div>
                <span className="font-bold text-gray-900 block transition-colors duration-200 group-hover:text-primary-600">
                  Dusun Dlingo
                </span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto scrollbar-hide">
            <nav className="flex-1 px-3 space-y-1">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600 hover:pl-4'
                  }`}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                    !isActive(item.href) ? 'group-hover:scale-110' : ''
                  }`} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Footer Link */}
            <div className="px-3 mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/"
                target="_blank"
                className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-primary-600 transition-all duration-200"
              >
                <Home className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span>Lihat Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
