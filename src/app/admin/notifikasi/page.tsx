'use client'

import { useState, useEffect } from 'react'
import { Plus, Save, Trash2, Bell, AlertTriangle, Info } from 'lucide-react'

interface Notification {
  id?: string
  title: string
  message: string
  link: string
  type: string
  active: boolean
}

export default function AdminNotifikasiPage() {
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    fetch('/api/admin/notifications')
      .then(res => res.json())
      .then(data => {
        if (data.notifications) {
          setNotifications(data.notifications)
        }
      })
  }, [])

  const addNotification = () => {
    setNotifications([...notifications, {
      title: '',
      message: '',
      link: '',
      type: 'INFO',
      active: true
    }])
  }

  const updateNotification = (index: number, field: keyof Notification, value: string | boolean) => {
    const updated = [...notifications]
    updated[index] = { ...updated[index], [field]: value }
    setNotifications(updated)
  }

  const removeNotification = async (index: number) => {
    const notif = notifications[index]
    if (notif.id) {
      await fetch(`/api/admin/notifications/${notif.id}`, { method: 'DELETE' })
    }
    setNotifications(notifications.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notifications })
      })

      if (res.ok) {
        alert('Notifikasi berhasil disimpan')
        const data = await res.json()
        if (data.notifications) {
          setNotifications(data.notifications)
        }
      } else {
        alert('Gagal menyimpan')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
          <p className="text-gray-600 mt-1">Kelola banner notifikasi di homepage</p>
        </div>
        <button onClick={addNotification} className="btn-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Notifikasi
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Judul</label>
                      <input
                        type="text"
                        value={notif.title}
                        onChange={(e) => updateNotification(index, 'title', e.target.value)}
                        className="input"
                        placeholder="Judul notifikasi"
                      />
                    </div>
                    <div>
                      <label className="label">Tipe</label>
                      <select
                        value={notif.type}
                        onChange={(e) => updateNotification(index, 'type', e.target.value)}
                        className="input"
                      >
                        <option value="INFO">Info (Biru)</option>
                        <option value="WARNING">Peringatan (Kuning)</option>
                        <option value="URGENT">Urgent (Merah)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Pesan</label>
                    <input
                      type="text"
                      value={notif.message}
                      onChange={(e) => updateNotification(index, 'message', e.target.value)}
                      className="input"
                      placeholder="Isi pesan notifikasi"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Link (Opsional)</label>
                      <input
                        type="text"
                        value={notif.link}
                        onChange={(e) => updateNotification(index, 'link', e.target.value)}
                        className="input"
                        placeholder="/pengumuman/xxx"
                      />
                    </div>
                    <div className="flex items-end space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={notif.active}
                          onChange={(e) => updateNotification(index, 'active', e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Aktif</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeNotification(index)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Belum ada notifikasi</p>
            <button type="button" onClick={addNotification} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Notifikasi Pertama
            </button>
          </div>
        )}

        {notifications.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary">
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
