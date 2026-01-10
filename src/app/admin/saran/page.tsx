'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Trash2, CheckCircle, Eye, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Suggestion {
  id: string
  name: string
  email: string
  phone?: string
  category: string
  message: string
  status: 'PENDING' | 'REVIEWED' | 'RESPONDED'
  createdAt: string
}

export default function SaranAdminPage() {
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    fetchSuggestions()
  }, [])

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredSuggestions(suggestions)
    } else {
      setFilteredSuggestions(suggestions.filter(s => s.status === filter))
    }
  }, [filter, suggestions])

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('/api/admin/suggestions')
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data)
        setFilteredSuggestions(data)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/suggestions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        fetchSuggestions()
        router.refresh()
      }
    } catch (error) {
      console.error('Error updating suggestion:', error)
    }
  }

  const deleteSuggestion = async (id: string) => {
    if (!confirm('Yakin ingin menghapus saran ini?')) return

    try {
      const response = await fetch(`/api/admin/suggestions/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchSuggestions()
        router.refresh()
        setShowDetail(false)
      }
    } catch (error) {
      console.error('Error deleting suggestion:', error)
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      INFRASTRUKTUR: 'Infrastruktur',
      PELAYANAN: 'Pelayanan',
      KEGIATAN: 'Kegiatan',
      LAINNYA: 'Lainnya'
    }
    return labels[category] || category
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      REVIEWED: 'bg-blue-100 text-blue-800',
      RESPONDED: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Menunggu',
      REVIEWED: 'Ditinjau',
      RESPONDED: 'Ditanggapi'
    }
    return labels[status] || status
  }

  const stats = {
    total: suggestions.length,
    pending: suggestions.filter(s => s.status === 'PENDING').length,
    reviewed: suggestions.filter(s => s.status === 'REVIEWED').length,
    responded: suggestions.filter(s => s.status === 'RESPONDED').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kotak Saran</h1>
              <p className="text-gray-600">Kelola saran dan masukan dari warga</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-gray-600">Total Saran</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-600">Menunggu</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-600">Ditinjau</p>
          <p className="text-2xl font-bold text-blue-600">{stats.reviewed}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-600">Ditanggapi</p>
          <p className="text-2xl font-bold text-green-600">{stats.responded}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          {['ALL', 'PENDING', 'REVIEWED', 'RESPONDED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'ALL' ? 'Semua' : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions List */}
      <div className="card overflow-hidden">
        {filteredSuggestions.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada saran</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pesan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSuggestions.map((suggestion) => (
                  <tr key={suggestion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{suggestion.name}</p>
                        <p className="text-sm text-gray-500">{suggestion.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{getCategoryLabel(suggestion.category)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{suggestion.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={suggestion.status}
                        onChange={(e) => updateStatus(suggestion.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(suggestion.status)}`}
                      >
                        <option value="PENDING">Menunggu</option>
                        <option value="REVIEWED">Ditinjau</option>
                        <option value="RESPONDED">Ditanggapi</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(suggestion.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedSuggestion(suggestion)
                            setShowDetail(true)
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteSuggestion(suggestion.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetail && selectedSuggestion && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detail Saran</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nama</label>
                <p className="text-gray-900">{selectedSuggestion.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedSuggestion.email}</p>
              </div>
              {selectedSuggestion.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Telepon</label>
                  <p className="text-gray-900">{selectedSuggestion.phone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700">Kategori</label>
                <p className="text-gray-900">{getCategoryLabel(selectedSuggestion.category)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Pesan</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedSuggestion.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <p>
                  <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(selectedSuggestion.status)}`}>
                    {getStatusLabel(selectedSuggestion.status)}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setShowDetail(false)} className="btn-secondary">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
