'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    vision: '',
    mission: '',
    history: '',
    address: '',
    mapEmbed: '',
    phone: '',
    email: ''
  })

  useEffect(() => {
    fetch('/api/admin/profile')
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setForm({
            vision: data.profile.vision || '',
            mission: data.profile.mission || '',
            history: data.profile.history || '',
            address: data.profile.address || '',
            mapEmbed: data.profile.mapEmbed || '',
            phone: data.profile.phone || '',
            email: data.profile.email || ''
          })
        }
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        alert('Profil berhasil disimpan')
      } else {
        alert('Gagal menyimpan profil')
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
        <h1 className="text-2xl font-bold text-gray-900">Profil Desa</h1>
        <p className="text-gray-600 mt-1">Kelola informasi profil dusun</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid gap-6">
          <div>
            <label className="label">Visi</label>
            <textarea
              value={form.vision}
              onChange={(e) => setForm({ ...form, vision: e.target.value })}
              rows={3}
              className="input"
              placeholder="Visi dusun"
            />
          </div>

          <div>
            <label className="label">Misi</label>
            <textarea
              value={form.mission}
              onChange={(e) => setForm({ ...form, mission: e.target.value })}
              rows={6}
              className="input"
              placeholder="Misi dusun (gunakan format: 1. Misi pertama)"
            />
          </div>

          <div>
            <label className="label">Sejarah/Tentang Dusun</label>
            <textarea
              value={form.history}
              onChange={(e) => setForm({ ...form, history: e.target.value })}
              rows={4}
              className="input"
              placeholder="Sejarah atau deskripsi tentang dusun"
            />
          </div>

          <div>
            <label className="label">Alamat</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={2}
              className="input"
              placeholder="Alamat lengkap dusun"
            />
          </div>

          <div>
            <label className="label">Embed Google Maps</label>
            <input
              type="text"
              value={form.mapEmbed}
              onChange={(e) => setForm({ ...form, mapEmbed: e.target.value })}
              className="input"
              placeholder="URL embed Google Maps"
            />
            <p className="text-xs text-gray-500 mt-1">Salin URL dari Google Maps &gt; Bagikan &gt; Sematkan peta</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Telepon</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input"
                placeholder="+62 812 3456 7890"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="email@example.com"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  )
}
