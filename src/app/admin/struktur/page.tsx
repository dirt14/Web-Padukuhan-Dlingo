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

export default function AdminStrukturPage() {
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    fetch('/api/admin/members?type=VILLAGE')
      .then(res => res.json())
      .then(data => {
        if (data.members) {
          setMembers(data.members)
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
      type: 'VILLAGE'
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
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members, type: 'VILLAGE' })
      })

      if (res.ok) {
        alert('Struktur organisasi berhasil disimpan')
      } else {
        alert('Gagal menyimpan')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Struktur Organisasi</h1>
          <p className="text-gray-600 mt-1">Kelola pengurus dusun</p>
        </div>
        <button onClick={addMember} className="btn-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pengurus
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {members.length > 0 ? (
          <div className="space-y-4">
            {members.map((member, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-primary-600" />
                </div>
                <div className="flex-1 grid sm:grid-cols-4 gap-4">
                  <div>
                    <label className="label">Nama</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      className="input"
                      placeholder="Nama lengkap"
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
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Belum ada data pengurus</p>
            <button type="button" onClick={addMember} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pengurus Pertama
            </button>
          </div>
        )}

        {members.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary">
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
