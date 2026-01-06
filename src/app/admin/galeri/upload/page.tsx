'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload, X, Image as ImageIcon } from 'lucide-react'

const categories = [
  { value: '', label: 'Pilih Kategori' },
  { value: 'BANK_SAMPAH', label: 'Bank Sampah' },
  { value: 'PENGAJIAN', label: 'Pengajian' },
  { value: 'KARANG_TARUNA', label: 'Karang Taruna' },
  { value: 'KEGIATAN_DUSUN', label: 'Kegiatan Dusun' },
  { value: 'UMUM', label: 'Umum' },
]

interface UploadedPhoto {
  url: string
  caption: string
  category: string
}

export default function UploadPhotoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const data = await res.json()
        if (data.url) {
          setPhotos(prev => [...prev, { url: data.url, caption: '', category: '' }])
        }
      } catch {
        alert('Gagal mengupload: ' + file.name)
      }
    }

    setUploading(false)
    e.target.value = ''
  }

  const updatePhoto = (index: number, field: 'caption' | 'category', value: string) => {
    const updated = [...photos]
    updated[index][field] = value
    setPhotos(updated)
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (photos.length === 0) {
      alert('Silakan upload minimal 1 foto')
      return
    }

    setLoading(true)

    try {
      for (const photo of photos) {
        await fetch('/api/admin/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(photo)
        })
      }

      router.push('/admin/galeri')
      router.refresh()
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/galeri" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Upload Foto</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag & drop foto atau klik untuk memilih</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="btn-primary cursor-pointer">
              {uploading ? 'Mengupload...' : 'Pilih Foto'}
            </label>
            <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG. Max 5MB per file</p>
          </div>
        </div>

        {photos.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Foto yang Diupload ({photos.length})</h2>
            <div className="grid gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={photo.url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Caption</label>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => updatePhoto(index, 'caption', e.target.value)}
                        className="input"
                        placeholder="Deskripsi foto"
                      />
                    </div>
                    <div>
                      <label className="label">Kategori</label>
                      <select
                        value={photo.category}
                        onChange={(e) => updatePhoto(index, 'category', e.target.value)}
                        className="input"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end space-x-4">
              <Link href="/admin/galeri" className="btn-secondary">
                Batal
              </Link>
              <button type="submit" disabled={loading} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Menyimpan...' : 'Simpan Semua'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
