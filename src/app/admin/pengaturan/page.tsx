'use client'

import { useState, useEffect } from 'react'
import { Save, Image as ImageIcon, Settings as SettingsIcon } from 'lucide-react'

export default function AdminPengaturanPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [form, setForm] = useState({
    siteName: 'Dusun Dlingo',
    tagline: '',
    logo: '',
    heroImage: '',
    heroImage2: '',
    heroImage3: '',
    heroTitle: '',
    heroSubtitle: '',
    footerText: '',

    // Feature toggles
    showDemographics: true,
    showSuggestionBox: true,
    showGallery: true,
    showKegiatan: true,
    showPengumuman: true,
    showKarangTaruna: true,
    showEdukasi: true,

    // Static content
    aboutDusun: '',
    footerAbout: '',

    // Contact info
    phone: '',
    email: '',
    address: '',

    // Pak Dukuh contact
    dukuhName: '',
    dukuhPhone: '',
    dukuhEmail: '',

    // Karang Taruna contact
    karangTarunaName: '',
    karangTarunaPhone: '',

    // Secretariat
    secretariatAddress: '',
    secretariatMapUrl: '',

    // Social media
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: ''
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
            heroImage2: data.settings.heroImage2 || '',
            heroImage3: data.settings.heroImage3 || '',
            heroTitle: data.settings.heroTitle || '',
            heroSubtitle: data.settings.heroSubtitle || '',
            footerText: data.settings.footerText || '',

            showDemographics: data.settings.showDemographics !== false,
            showSuggestionBox: data.settings.showSuggestionBox !== false,
            showGallery: data.settings.showGallery !== false,
            showKegiatan: data.settings.showKegiatan !== false,
            showPengumuman: data.settings.showPengumuman !== false,
            showKarangTaruna: data.settings.showKarangTaruna !== false,
            showEdukasi: data.settings.showEdukasi !== false,

            aboutDusun: data.settings.aboutDusun || '',
            footerAbout: data.settings.footerAbout || '',

            phone: data.settings.phone || '',
            email: data.settings.email || '',
            address: data.settings.address || '',

            dukuhName: data.settings.dukuhName || '',
            dukuhPhone: data.settings.dukuhPhone || '',
            dukuhEmail: data.settings.dukuhEmail || '',

            karangTarunaName: data.settings.karangTarunaName || '',
            karangTarunaPhone: data.settings.karangTarunaPhone || '',

            secretariatAddress: data.settings.secretariatAddress || '',
            secretariatMapUrl: data.settings.secretariatMapUrl || '',

            facebook: data.settings.facebook || '',
            instagram: data.settings.instagram || '',
            twitter: data.settings.twitter || '',
            youtube: data.settings.youtube || ''
          })
        }
      })
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'heroImage' | 'heroImage2' | 'heroImage3') => {
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
      setMessage({ type: 'error', text: 'Gagal mengupload gambar' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' })
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setMessage({ type: 'error', text: data.details || data.error || 'Gagal menyimpan pengaturan' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <SettingsIcon className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
            <p className="text-gray-600">Kelola pengaturan dan tampilan website</p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Pengaturan Umum</h2>
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
                <div className="flex-1">
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

        {/* Feature Toggles */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Fitur Menu</h2>
          <p className="text-sm text-gray-600 mb-4">Aktifkan atau nonaktifkan menu yang tampil di navbar</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: 'showDemographics', label: 'Data Demografi' },
              { key: 'showSuggestionBox', label: 'Kotak Saran' },
              { key: 'showGallery', label: 'Galeri' },
              { key: 'showKegiatan', label: 'Kegiatan' },
              { key: 'showPengumuman', label: 'Pengumuman' },
              { key: 'showKarangTaruna', label: 'Karang Taruna' },
              { key: 'showEdukasi', label: 'Portal Edukasi' }
            ].map((item) => (
              <label key={item.key} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[item.key as keyof typeof form] as boolean}
                  onChange={(e) => setForm({ ...form, [item.key]: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-gray-900">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Static Content */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Konten Statis</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Tentang Dusun Dlingo (Homepage)</label>
              <textarea
                value={form.aboutDusun}
                onChange={(e) => setForm({ ...form, aboutDusun: e.target.value })}
                rows={4}
                className="input"
                placeholder="Teks tentang dusun yang muncul di homepage. Kosongkan untuk menggunakan teks default."
              />
            </div>
            <div>
              <label className="label">Tentang Website (Footer)</label>
              <textarea
                value={form.footerAbout}
                onChange={(e) => setForm({ ...form, footerAbout: e.target.value })}
                rows={3}
                className="input"
                placeholder="Deskripsi singkat website di footer"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Kontak</h2>

          <div className="space-y-6">
            {/* Kontak Umum */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Kontak Umum</h3>
              <div className="grid sm:grid-cols-2 gap-4">
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
                    placeholder="dusundlingo@gmail.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Alamat</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={2}
                    className="input"
                    placeholder="Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo"
                  />
                </div>
              </div>
            </div>

            {/* Kontak Pak Dukuh */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Kontak Pak Dukuh</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Nama Pak Dukuh</label>
                  <input
                    type="text"
                    value={form.dukuhName}
                    onChange={(e) => setForm({ ...form, dukuhName: e.target.value })}
                    className="input"
                    placeholder="Bapak..."
                  />
                </div>
                <div>
                  <label className="label">Telepon / WhatsApp</label>
                  <input
                    type="text"
                    value={form.dukuhPhone}
                    onChange={(e) => setForm({ ...form, dukuhPhone: e.target.value })}
                    className="input"
                    placeholder="+62 812 3456 7890"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Email Pak Dukuh</label>
                  <input
                    type="email"
                    value={form.dukuhEmail}
                    onChange={(e) => setForm({ ...form, dukuhEmail: e.target.value })}
                    className="input"
                    placeholder="pakdukuh@dusundlingo.com"
                  />
                </div>
              </div>
            </div>

            {/* Kontak Karang Taruna */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Kontak Karang Taruna</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Nama Ketua Karang Taruna</label>
                  <input
                    type="text"
                    value={form.karangTarunaName}
                    onChange={(e) => setForm({ ...form, karangTarunaName: e.target.value })}
                    className="input"
                    placeholder="Nama Ketua Karang Taruna"
                  />
                </div>
                <div>
                  <label className="label">WhatsApp Karang Taruna</label>
                  <input
                    type="text"
                    value={form.karangTarunaPhone}
                    onChange={(e) => setForm({ ...form, karangTarunaPhone: e.target.value })}
                    className="input"
                    placeholder="+62 813 9876 5432"
                  />
                </div>
              </div>
            </div>

            {/* Alamat Sekretariat */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Alamat Sekretariat</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Alamat Lengkap Sekretariat</label>
                  <textarea
                    value={form.secretariatAddress}
                    onChange={(e) => setForm({ ...form, secretariatAddress: e.target.value })}
                    rows={2}
                    className="input"
                    placeholder="Alamat lengkap lokasi sekretariat"
                  />
                </div>
                <div>
                  <label className="label">Google Maps Embed URL</label>
                  <textarea
                    value={form.secretariatMapUrl}
                    onChange={(e) => setForm({ ...form, secretariatMapUrl: e.target.value })}
                    rows={3}
                    className="input"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Cara mendapatkan: Buka Google Maps → Pilih lokasi → Klik &quot;Share&quot; → Klik &quot;Embed a map&quot; → Salin URL dari src=&quot;...&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Media Sosial</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Facebook URL</label>
              <input
                type="url"
                value={form.facebook}
                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                className="input"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="label">Instagram URL</label>
              <input
                type="url"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                className="input"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="label">Twitter URL</label>
              <input
                type="url"
                value={form.twitter}
                onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                className="input"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <label className="label">YouTube URL</label>
              <input
                type="url"
                value={form.youtube}
                onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                className="input"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>

        {/* Hero Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Hero Section (Homepage)</h2>
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

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-4">Upload hingga 3 gambar untuk carousel hero. Gambar akan berganti otomatis setiap 5 detik.</p>

              <div className="space-y-4">
                <div>
                  <label className="label">Gambar Hero 1</label>
                  <div className="flex items-start space-x-4">
                    {form.heroImage ? (
                      <div className="w-48 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img src={form.heroImage} alt="Hero 1" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-48 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
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

                <div>
                  <label className="label">Gambar Hero 2 (Opsional)</label>
                  <div className="flex items-start space-x-4">
                    {form.heroImage2 ? (
                      <div className="w-48 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img src={form.heroImage2} alt="Hero 2" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-48 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'heroImage2')}
                        className="input"
                      />
                      <p className="text-xs text-gray-500 mt-1">Gambar kedua untuk carousel</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="label">Gambar Hero 3 (Opsional)</label>
                  <div className="flex items-start space-x-4">
                    {form.heroImage3 ? (
                      <div className="w-48 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img src={form.heroImage3} alt="Hero 3" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-48 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'heroImage3')}
                        className="input"
                      />
                      <p className="text-xs text-gray-500 mt-1">Gambar ketiga untuk carousel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Footer</h2>
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

        <div className="flex justify-end space-x-4">
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </div>
      </form>
    </div>
  )
}
