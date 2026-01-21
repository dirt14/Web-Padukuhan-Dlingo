'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'

const categories = [
  { value: 'KESEHATAN', label: 'Kesehatan' },
  { value: 'PERTANIAN', label: 'Pertanian' },
  { value: 'KEWIRAUSAHAAN', label: 'Kewirausahaan' },
  { value: 'PENDIDIKAN', label: 'Pendidikan' },
  { value: 'LAINNYA', label: 'Lainnya' },
]

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'LAINNYA',
    tags: '',
    status: 'DRAFT',
    image: ''
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
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        router.push('/admin/edukasi')
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Gagal menyimpan artikel')
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
        <Link href="/admin/edukasi" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Buat Artikel Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid gap-6">
          <div>
            <label className="label">Judul Artikel *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="input"
              placeholder="Judul artikel"
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
              <label className="label">Tags</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="input"
                placeholder="Pisahkan dengan koma (opsional)"
              />
              <p className="text-xs text-gray-500 mt-1">Contoh: kesehatan, tips, keluarga</p>
            </div>
          </div>

          <div>
            <label className="label">Ringkasan</label>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="input"
              placeholder="Ringkasan singkat artikel (opsional)"
            />
          </div>

          <div>
            <label className="label">Konten Artikel *</label>
            <RichTextEditor
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
              placeholder="Tulis konten artikel..."
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
                Terbitkan
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end space-x-4">
          <Link href="/admin/edukasi" className="btn-secondary">
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
