'use client'

import { useState, useEffect } from 'react'
import { Plus, Save, Trash2, User } from 'lucide-react'

interface Member {
  id?: string
  name: string
  position: string
  phone: string
  image: string
  order: number
  type: string
}

interface KTProfile {
  vision: string
  mission: string
  description: string
  workProgram: string
}

export default function AdminKarangTarunaPage() {
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
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
      if (profileData.profile) setProfile({
        vision: profileData.profile.vision || '',
        mission: profileData.profile.mission || '',
        description: profileData.profile.description || '',
        workProgram: profileData.profile.workProgram || ''
      })
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
    setMembers(members.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

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
          body: JSON.stringify(profile)
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
            <div>
              <label className="label">Program Kerja</label>
              <textarea
                value={profile.workProgram}
                onChange={(e) => setProfile({ ...profile, workProgram: e.target.value })}
                rows={6}
                className="input"
                placeholder="Program kerja Karang Taruna"
              />
            </div>
          </div>
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
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-amber-600" />
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
