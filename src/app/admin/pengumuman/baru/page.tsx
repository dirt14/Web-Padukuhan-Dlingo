'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'

const categories = [
  { value: 'BANTUAN_SOSIAL', label: 'Bantuan Sosial' },
  { value: 'KESEHATAN', label: 'Kesehatan' },
  { value: 'KEGIATAN_DUSUN', label: 'Kegiatan Dusun' },
  { value: 'UMUM', label: 'Umum' },
]

export default function NewAnnouncementPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'UMUM',
    priority: 'NORMAL',
    status: 'DRAFT',
    image: '',
    showAsNotification: false
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (data.url) {
        setForm({ ...form, image: data.url })
      }
    } catch {
      alert('Gagal mengupload gambar')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        router.push('/admin/pengumuman')
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Gagal menyimpan pengumuman')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/pengumuman" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Buat Pengumuman Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid gap-6">
          <div>
            <label className="label">Judul *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="input"
              placeholder="Judul pengumuman"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Prioritas</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="input"
              >
                <option value="NORMAL">Normal</option>
                <option value="IMPORTANT">Penting</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Ringkasan</label>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="input"
              placeholder="Ringkasan singkat (opsional)"
            />
          </div>

          <div>
            <label className="label">Isi Pengumuman *</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={8}
              className="input"
              placeholder="Tulis isi pengumuman..."
            />
          </div>

          <div>
            <label className="label">Gambar</label>
            <div className="flex items-start space-x-4">
              {form.image ? (
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={form.image} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="input"
                />
                <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG. Max 5MB</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notification"
              checked={form.showAsNotification}
              onChange={(e) => setForm({ ...form, showAsNotification: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="notification" className="text-sm text-gray-700">
              Tampilkan sebagai notifikasi di homepage
            </label>
          </div>

          <div>
            <label className="label">Status</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="DRAFT"
                  checked={form.status === 'DRAFT'}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="mr-2"
                />
                Draft
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="PUBLISHED"
                  checked={form.status === 'PUBLISHED'}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="mr-2"
                />
                Terbitkan
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end space-x-4">
          <Link href="/admin/pengumuman" className="btn-secondary">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="btn-primary">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  )
}
