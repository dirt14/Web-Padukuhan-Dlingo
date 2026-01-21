'use client'

import { useState, useEffect } from 'react'
import { Plus, Save, Trash2, User, GripVertical, Info, Camera } from 'lucide-react'

interface Member {
  id?: string
  name: string
  position: string
  phone: string
  image: string
  order: number
  type: string
}

interface ProgramItem {
  id: string
  text: string
}

interface WorkProgramCategory {
  id: string
  title: string
  items: ProgramItem[]
}

interface KTProfile {
  vision: string
  mission: string
  description: string
  workProgram: string
}

// Helper untuk generate ID unik
const generateId = () => Math.random().toString(36).substring(2, 9)

// Helper untuk parse workProgram string ke struktur data
const parseWorkProgram = (workProgramStr: string): WorkProgramCategory[] => {
  if (!workProgramStr) return []

  const categories: WorkProgramCategory[] = []
  let currentCategory: WorkProgramCategory | null = null

  workProgramStr.split('\n').forEach((line) => {
    if (line.startsWith('### ')) {
      if (currentCategory) categories.push(currentCategory)
      currentCategory = {
        id: generateId(),
        title: line.replace('### ', ''),
        items: []
      }
    } else if (line.startsWith('- ') && currentCategory) {
      currentCategory.items.push({
        id: generateId(),
        text: line.replace('- ', '')
      })
    }
  })
  if (currentCategory) categories.push(currentCategory)

  return categories
}

// Helper untuk convert struktur data ke workProgram string
const stringifyWorkProgram = (categories: WorkProgramCategory[]): string => {
  return categories
    .map(cat => {
      const items = cat.items.map(item => `- ${item.text}`).join('\n')
      return `### ${cat.title}\n${items}`
    })
    .join('\n\n')
}

export default function AdminKarangTarunaPage() {
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [workProgramCategories, setWorkProgramCategories] = useState<WorkProgramCategory[]>([])
  const [profile, setProfile] = useState<KTProfile>({
    vision: '',
    mission: '',
    description: '',
    workProgram: ''
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/members?type=KARANG_TARUNA').then(res => res.json()),
      fetch('/api/admin/karang-taruna').then(res => res.json())
    ]).then(([membersData, profileData]) => {
      if (membersData.members) setMembers(membersData.members)
      if (profileData.profile) {
        setProfile({
          vision: profileData.profile.vision || '',
          mission: profileData.profile.mission || '',
          description: profileData.profile.description || '',
          workProgram: profileData.profile.workProgram || ''
        })
        // Parse workProgram ke struktur dinamis
        setWorkProgramCategories(parseWorkProgram(profileData.profile.workProgram || ''))
      }
    })
  }, [])

  const addMember = () => {
    setMembers([...members, {
      name: '',
      position: '',
      phone: '',
      image: '',
      order: members.length + 1,
      type: 'KARANG_TARUNA'
    }])
  }

  const updateMember = (index: number, field: keyof Member, value: string | number) => {
    const updated = [...members]
    updated[index] = { ...updated[index], [field]: value }
    setMembers(updated)
  }

  const removeMember = (index: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengurus ini? Jangan lupa klik "Simpan Semua" untuk menyimpan perubahan.')) {
      setMembers(members.filter((_, i) => i !== index))
    }
  }

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
        updateMember(index, 'image', data.url)
      }
    } catch {
      alert('Gagal mengupload gambar')
    }
  }

  // Work Program Category functions
  const addCategory = () => {
    setWorkProgramCategories([
      ...workProgramCategories,
      {
        id: generateId(),
        title: '',
        items: []
      }
    ])
  }

  const updateCategoryTitle = (categoryId: string, title: string) => {
    setWorkProgramCategories(
      workProgramCategories.map(cat =>
        cat.id === categoryId ? { ...cat, title } : cat
      )
    )
  }

  const removeCategory = (categoryId: string) => {
    setWorkProgramCategories(
      workProgramCategories.filter(cat => cat.id !== categoryId)
    )
  }

  const addProgramItem = (categoryId: string) => {
    setWorkProgramCategories(
      workProgramCategories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, { id: generateId(), text: '' }] }
          : cat
      )
    )
  }

  const updateProgramItem = (categoryId: string, itemId: string, text: string) => {
    setWorkProgramCategories(
      workProgramCategories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, text } : item
              )
            }
          : cat
      )
    )
  }

  const removeProgramItem = (categoryId: string, itemId: string) => {
    setWorkProgramCategories(
      workProgramCategories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
          : cat
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Convert workProgramCategories ke string sebelum disimpan
    const workProgramStr = stringifyWorkProgram(workProgramCategories)
    const profileToSave = { ...profile, workProgram: workProgramStr }

    try {
      await Promise.all([
        fetch('/api/admin/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ members, type: 'KARANG_TARUNA' })
        }),
        fetch('/api/admin/karang-taruna', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileToSave)
        })
      ])

      alert('Data Karang Taruna berhasil disimpan')
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Karang Taruna</h1>
        <p className="text-gray-600 mt-1">Kelola profil dan pengurus Karang Taruna</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">Petunjuk:</p>
          <p>Setelah menambah, mengedit, atau menghapus data, pastikan klik tombol <strong>&quot;Simpan Semua&quot;</strong> untuk menyimpan perubahan ke database.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profil Karang Taruna</h2>
          <div className="grid gap-6">
            <div>
              <label className="label">Deskripsi</label>
              <textarea
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                rows={3}
                className="input"
                placeholder="Deskripsi Karang Taruna"
              />
            </div>
            <div>
              <label className="label">Visi</label>
              <textarea
                value={profile.vision}
                onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
                rows={2}
                className="input"
                placeholder="Visi Karang Taruna"
              />
            </div>
            <div>
              <label className="label">Misi</label>
              <textarea
                value={profile.mission}
                onChange={(e) => setProfile({ ...profile, mission: e.target.value })}
                rows={4}
                className="input"
                placeholder="Misi Karang Taruna (format: 1. Misi pertama)"
              />
            </div>
            </div>
        </div>

        {/* Work Program Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Program Kerja</h2>
              <p className="text-sm text-gray-500">Tambahkan kategori program dan item-itemnya</p>
            </div>
            <button type="button" onClick={addCategory} className="btn-secondary text-sm">
              <Plus className="h-4 w-4 mr-1" />
              Tambah Kategori
            </button>
          </div>

          {workProgramCategories.length > 0 ? (
            <div className="space-y-6">
              {workProgramCategories.map((category, catIndex) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => updateCategoryTitle(category.id, e.target.value)}
                      className="input flex-1 font-semibold"
                      placeholder="Nama Kategori (contoh: Program Rutin)"
                    />
                    <button
                      type="button"
                      onClick={() => removeCategory(category.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Hapus kategori"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="ml-8 space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></span>
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => updateProgramItem(category.id, item.id, e.target.value)}
                          className="input flex-1"
                          placeholder="Item program kerja"
                        />
                        <button
                          type="button"
                          onClick={() => removeProgramItem(category.id, item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Hapus item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addProgramItem(category.id)}
                      className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="mb-2">Belum ada program kerja</p>
              <button
                type="button"
                onClick={addCategory}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                + Tambah Kategori Program
              </button>
            </div>
          )}
        </div>

        {/* Members Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pengurus</h2>
            <button type="button" onClick={addMember} className="btn-secondary text-sm">
              <Plus className="h-4 w-4 mr-1" />
              Tambah
            </button>
          </div>

          {members.length > 0 ? (
            <div className="space-y-4">
              {members.map((member, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-amber-600" />
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors">
                      <Camera className="h-2.5 w-2.5 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex-1 grid sm:grid-cols-4 gap-4">
                    <div>
                      <label className="label">Nama</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(index, 'name', e.target.value)}
                        className="input"
                        placeholder="Nama"
                      />
                    </div>
                    <div>
                      <label className="label">Jabatan</label>
                      <input
                        type="text"
                        value={member.position}
                        onChange={(e) => updateMember(index, 'position', e.target.value)}
                        className="input"
                        placeholder="Jabatan"
                      />
                    </div>
                    <div>
                      <label className="label">Telepon</label>
                      <input
                        type="text"
                        value={member.phone}
                        onChange={(e) => updateMember(index, 'phone', e.target.value)}
                        className="input"
                        placeholder="+62 xxx"
                      />
                    </div>
                    <div>
                      <label className="label">Urutan</label>
                      <input
                        type="number"
                        value={member.order}
                        onChange={(e) => updateMember(index, 'order', parseInt(e.target.value))}
                        className="input"
                        min="1"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada data pengurus</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </form>
    </div>
  )
}
