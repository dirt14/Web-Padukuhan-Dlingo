'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Bell, AlertTriangle, Save, Info, Clock } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'

interface Announcement {
  id: string
  title: string
  slug: string
  category: string
  status: string
  priority: string
  createdAt: string
  activeStart?: string | null
  activeEnd?: string | null
  author?: { name: string } | null
}

interface Notification {
  id?: string
  title: string
  message: string
  link: string
  type: string
  active: boolean
  startDate: string
  endDate: string
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    BANTUAN_SOSIAL: 'Bantuan Sosial',
    KESEHATAN: 'Kesehatan',
    KEGIATAN_DUSUN: 'Kegiatan Dusun',
    UMUM: 'Umum'
  }
  return labels[category] || category
}

export default function AdminPengumumanPage() {
  const [activeTab, setActiveTab] = useState<'pengumuman' | 'notifikasi'>('pengumuman')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Fetch announcements
    fetch('/api/admin/announcements')
      .then(res => res.json())
      .then(data => {
        if (data.announcements) {
          setAnnouncements(data.announcements)
        }
      })
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false))

    // Fetch notifications
    fetch('/api/admin/notifications')
      .then(res => res.json())
      .then(data => {
        if (data.notifications) {
          const formatted = data.notifications.map((n: Notification & { startDate?: string; endDate?: string }) => ({
            ...n,
            startDate: n.startDate ? new Date(n.startDate).toISOString().slice(0, 16) : '',
            endDate: n.endDate ? new Date(n.endDate).toISOString().slice(0, 16) : ''
          }))
          setNotifications(formatted)
        }
      })
  }, [])

  // Notification functions
  const addNotification = () => {
    setNotifications([...notifications, {
      title: '',
      message: '',
      link: '',
      type: 'INFO',
      active: true,
      startDate: '',
      endDate: ''
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

  const handleAnnouncementDeleted = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

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
          const formatted = data.notifications.map((n: Notification & { startDate?: string; endDate?: string }) => ({
            ...n,
            startDate: n.startDate ? new Date(n.startDate).toISOString().slice(0, 16) : '',
            endDate: n.endDate ? new Date(n.endDate).toISOString().slice(0, 16) : ''
          }))
          setNotifications(formatted)
        }
      } else {
        alert('Gagal menyimpan')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengumuman & Notifikasi</h1>
          <p className="text-gray-600 mt-1">Kelola pengumuman dan banner notifikasi</p>
        </div>
        {activeTab === 'pengumuman' ? (
          <Link href="/admin/pengumuman/baru" className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Buat Pengumuman
          </Link>
        ) : (
          <button onClick={addNotification} className="btn-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Notifikasi
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pengumuman')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'pengumuman'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bell className="h-4 w-4 mr-2" />
              Pengumuman
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {announcements.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('notifikasi')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'notifikasi'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Info className="h-4 w-4 mr-2" />
              Banner Notifikasi
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {notifications.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'pengumuman' ? (
          // Pengumuman Tab
          loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Memuat data...</p>
            </div>
          ) : announcements.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Aktif</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {announcements.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.priority === 'IMPORTANT' && (
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.author?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded">
                          {getCategoryLabel(item.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          item.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status === 'PUBLISHED' ? 'Terbit' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {item.activeStart || item.activeEnd ? (
                          <div className="text-xs text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.activeStart ? formatDate(item.activeStart) : 'Tanpa batas'}
                              {' - '}
                              {item.activeEnd ? formatDate(item.activeEnd) : 'Tanpa batas'}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Selalu aktif</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/pengumuman/${item.slug}`}
                            target="_blank"
                            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Lihat"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/pengumuman/${item.id}`}
                            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <DeleteButton id={item.id} type="announcement" onDeleted={() => handleAnnouncementDeleted(item.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pengumuman</h3>
              <p className="text-gray-500 mb-4">Buat pengumuman pertama untuk warga dusun</p>
              <Link href="/admin/pengumuman/baru" className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Buat Pengumuman
              </Link>
            </div>
          )
        ) : (
          // Notifikasi Tab
          <form onSubmit={handleSaveNotifications} className="p-6">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <Info className="h-4 w-4 inline mr-1" />
                Banner notifikasi akan ditampilkan di bagian atas website publik. Gunakan untuk informasi penting atau pengumuman singkat.
              </p>
            </div>

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

                      {/* Kurun Waktu Aktif */}
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-3">Kurun Waktu Tampil (Opsional)</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label text-blue-800">Tanggal Mulai</label>
                            <input
                              type="datetime-local"
                              value={notif.startDate}
                              onChange={(e) => updateNotification(index, 'startDate', e.target.value)}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="label text-blue-800">Tanggal Berakhir</label>
                            <input
                              type="datetime-local"
                              value={notif.endDate}
                              onChange={(e) => updateNotification(index, 'endDate', e.target.value)}
                              className="input"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Belum ada notifikasi banner</p>
                <button type="button" onClick={addNotification} className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Notifikasi Pertama
                </button>
              </div>
            )}

            {notifications.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                <button type="submit" disabled={saving} className="btn-primary">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Menyimpan...' : 'Simpan Notifikasi'}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
