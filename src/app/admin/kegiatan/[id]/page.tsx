'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'

const categories = [
  { value: 'SOSIAL', label: 'Sosial' },
  { value: 'KEAGAMAAN', label: 'Keagamaan' },
  { value: 'BUDAYA', label: 'Budaya' },
  { value: 'LAINNYA', label: 'Lainnya' },
]

export default function EditActivityPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    category: 'LAINNYA',
    schedule: '',
    location: '',
    responsible: '',
    status: 'PUBLISHED',
    image: ''
  })

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(`/api/admin/activitys/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          const activity = data.activity
          setForm({
            title: activity.title || '',
            description: activity.description || '',
            content: activity.content || '',
            category: activity.category || 'LAINNYA',
            schedule: activity.schedule || '',
            location: activity.location || '',
            responsible: activity.responsible || '',
            status: activity.status || 'PUBLISHED',
            image: activity.image || ''
          })
        } else {
          alert('Gagal memuat data kegiatan')
          router.push('/admin/kegiatan')
        }
      } catch {
        alert('Terjadi kesalahan')
        router.push('/admin/kegiatan')
      } finally {
        setLoadingData(false)
      }
    }

    if (params.id) {
      fetchActivity()
    }
  }, [params.id, router])

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
      const res = await fetch(`/api/admin/activitys/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        router.push('/admin/kegiatan')
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Gagal menyimpan kegiatan')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Memuat data...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/kegiatan" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Kegiatan</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid gap-6">
          <div>
            <label className="label">Judul Kegiatan *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="input"
              placeholder="Nama kegiatan"
            />
          </div>

          <div>
            <label className="label">Deskripsi Singkat *</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              className="input"
              placeholder="Deskripsi singkat kegiatan"
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
              <label className="label">Jadwal</label>
              <input
                type="text"
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="input"
                placeholder="Contoh: Setiap Minggu, 08:00 WIB"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Lokasi</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="input"
                placeholder="Tempat pelaksanaan"
              />
            </div>
            <div>
              <label className="label">Penanggung Jawab</label>
              <input
                type="text"
                value={form.responsible}
                onChange={(e) => setForm({ ...form, responsible: e.target.value })}
                className="input"
                placeholder="Nama penanggung jawab"
              />
            </div>
          </div>

          <div>
            <label className="label">Detail Kegiatan</label>
            <RichTextEditor
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
              placeholder="Tulis detail kegiatan..."
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
                Aktifkan
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end space-x-4">
          <Link href="/admin/kegiatan" className="btn-secondary">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="btn-primary">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}
