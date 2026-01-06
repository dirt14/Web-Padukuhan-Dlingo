'use client'

import { useState, useEffect } from 'react'
import { X, Bell, AlertTriangle, Info } from 'lucide-react'
import Link from 'next/link'

interface Notification {
  id: string
  title: string
  message: string
  link?: string | null
  type: 'INFO' | 'WARNING' | 'URGENT' | string
}

interface NotificationBannerProps {
  notifications: Notification[]
}

export default function NotificationBanner({ notifications }: NotificationBannerProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('dismissedNotifications')
    if (stored) {
      setDismissed(new Set(JSON.parse(stored)))
    }
  }, [])

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissed)
    newDismissed.add(id)
    setDismissed(newDismissed)
    localStorage.setItem('dismissedNotifications', JSON.stringify(Array.from(newDismissed)))
  }

  if (!mounted) return null

  const activeNotifications = notifications.filter((n) => !dismissed.has(n.id))

  if (activeNotifications.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'URGENT':
        return <AlertTriangle className="h-5 w-5" />
      case 'WARNING':
        return <Bell className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getStyles = (type: string) => {
    switch (type) {
      case 'URGENT':
        return 'bg-red-500 text-white'
      case 'WARNING':
        return 'bg-amber-500 text-white'
      default:
        return 'bg-primary-500 text-white'
    }
  }

  return (
    <div className="space-y-0">
      {activeNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getStyles(notification.type)} py-3 px-4`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getIcon(notification.type)}
              <div>
                <span className="font-medium">{notification.title}</span>
                <span className="mx-2">-</span>
                <span>{notification.message}</span>
                {notification.link && (
                  <Link
                    href={notification.link}
                    className="ml-2 underline font-medium hover:no-underline"
                  >
                    Selengkapnya
                  </Link>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDismiss(notification.id)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
