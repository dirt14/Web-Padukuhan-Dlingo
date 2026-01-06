'use client'

import { signOut } from 'next-auth/react'
import { LogOut, User } from 'lucide-react'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    role: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const roleLabel = user.role === 'ADMIN' ? 'Pak Dukuh' : 'Karang Taruna'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 lg:top-0 mt-14 lg:mt-0">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{roleLabel}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
