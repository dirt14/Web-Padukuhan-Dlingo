'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  UserCircle
} from 'lucide-react'

interface AdminSidebarProps {
  user: {
    name?: string | null
    role: string
  }
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Pengumuman', href: '/admin/pengumuman', icon: Bell },
  { name: 'Kegiatan', href: '/admin/kegiatan', icon: Calendar },
  { name: 'Galeri', href: '/admin/galeri', icon: Image },
  { name: 'Profil Desa', href: '/admin/profil', icon: FileText, adminOnly: true },
  { name: 'Struktur Organisasi', href: '/admin/struktur', icon: Users },
  { name: 'Karang Taruna', href: '/admin/karang-taruna', icon: UserCircle },
  { name: 'Notifikasi', href: '/admin/notifikasi', icon: Bell, adminOnly: true },
  { name: 'Pengaturan', href: '/admin/pengaturan', icon: Settings, adminOnly: true },
]

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = user.role === 'ADMIN'

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || isAdmin
  )

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-gray-900">Admin</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="pt-16 pb-4 px-4">
              <nav className="space-y-1">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <Home className="h-5 w-5 mr-3" />
                  Lihat Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4 h-16 border-b border-gray-200">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Dusun Dlingo</span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
            </Link>
          </div>
          <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-3 space-y-1">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="px-3 mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/"
                target="_blank"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Home className="h-5 w-5 mr-3" />
                Lihat Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
