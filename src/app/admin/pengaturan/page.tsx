'use client'

import { useState, useEffect } from 'react'
import { Save, Image as ImageIcon } from 'lucide-react'

export default function AdminPengaturanPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    siteName: 'Dusun Dlingo',
    tagline: '',
    logo: '',
    heroImage: '',
    heroTitle: '',
    heroSubtitle: '',
    footerText: ''
  })

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings) {
          setForm({
            siteName: data.settings.siteName || 'Dusun Dlingo',
            tagline: data.settings.tagline || '',
            logo: data.settings.logo || '',
            heroImage: data.settings.heroImage || '',
            heroTitle: data.settings.heroTitle || '',
            heroSubtitle: data.settings.heroSubtitle || '',
            footerText: data.settings.footerText || ''
          })
        }
      })
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'heroImage') => {
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
        setForm({ ...form, [field]: data.url })
      }
    } catch {
      alert('Gagal mengupload gambar')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        alert('Pengaturan berhasil disimpan')
      } else {
        alert('Gagal menyimpan pengaturan')
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
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600 mt-1">Kelola pengaturan website</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pengaturan Umum</h2>
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Nama Website</label>
                <input
                  type="text"
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="input"
                  placeholder="Slogan atau tagline website"
                />
              </div>
            </div>

            <div>
              <label className="label">Logo</label>
              <div className="flex items-start space-x-4">
                {form.logo ? (
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={form.logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="input"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: PNG, SVG. Disarankan dengan background transparan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
          <div className="grid gap-6">
            <div>
              <label className="label">Judul Hero</label>
              <input
                type="text"
                value={form.heroTitle}
                onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                className="input"
                placeholder="Selamat Datang di Dusun Dlingo"
              />
            </div>
            <div>
              <label className="label">Subjudul Hero</label>
              <textarea
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                rows={2}
                className="input"
                placeholder="Deskripsi singkat di hero section"
              />
            </div>
            <div>
              <label className="label">Gambar Hero</label>
              <div className="flex items-start space-x-4">
                {form.heroImage ? (
                  <div className="w-48 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={form.heroImage} alt="Hero" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-48 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'heroImage')}
                    className="input"
                  />
                  <p className="text-xs text-gray-500 mt-1">Disarankan ukuran 1920x600 atau lebih</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer</h2>
          <div>
            <label className="label">Teks Footer</label>
            <textarea
              value={form.footerText}
              onChange={(e) => setForm({ ...form, footerText: e.target.value })}
              rows={2}
              className="input"
              placeholder="Teks yang muncul di footer website"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  )
}
