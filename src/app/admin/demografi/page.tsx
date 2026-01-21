'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, Save, AlertCircle, CheckCircle2 } from 'lucide-react'

interface DemographicsData {
  year: number
  totalPopulation: number
  maleCount: number
  femaleCount: number
  ageData: Array<{ ageGroup: string; count: number }>
  educationData: Array<{ level: string; count: number }>
  occupationData: Array<{ type: string; count: number }>
  rtData: Array<{ rt: string; households: number; population: number }>
}

export default function DemografiAdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const currentYear = new Date().getFullYear()

  const [formData, setFormData] = useState<DemographicsData>({
    year: currentYear,
    totalPopulation: 0,
    maleCount: 0,
    femaleCount: 0,
    ageData: [
      { ageGroup: '0-5 tahun', count: 0 },
      { ageGroup: '6-12 tahun', count: 0 },
      { ageGroup: '13-18 tahun', count: 0 },
      { ageGroup: '19-30 tahun', count: 0 },
      { ageGroup: '31-50 tahun', count: 0 },
      { ageGroup: '51-65 tahun', count: 0 },
      { ageGroup: '65+ tahun', count: 0 }
    ],
    educationData: [
      { level: 'Tidak/Belum Sekolah', count: 0 },
      { level: 'SD/Sederajat', count: 0 },
      { level: 'SMP/Sederajat', count: 0 },
      { level: 'SMA/Sederajat', count: 0 },
      { level: 'D1-D3', count: 0 },
      { level: 'S1', count: 0 },
      { level: 'S2/S3', count: 0 }
    ],
    occupationData: [
      { type: 'Petani', count: 0 },
      { type: 'Wiraswasta', count: 0 },
      { type: 'PNS/TNI/Polri', count: 0 },
      { type: 'Karyawan Swasta', count: 0 },
      { type: 'Buruh', count: 0 },
      { type: 'Pelajar/Mahasiswa', count: 0 },
      { type: 'Ibu Rumah Tangga', count: 0 },
      { type: 'Lainnya', count: 0 }
    ],
    rtData: [
      { rt: 'RT 22', households: 0, population: 0 },
      { rt: 'RT 23', households: 0, population: 0 },
      { rt: 'RT 24', households: 0, population: 0 },
      { rt: 'RT 25', households: 0, population: 0 },
      { rt: 'RT 26', households: 0, population: 0 },
      { rt: 'RT 27', households: 0, population: 0 },
      { rt: 'RT 28', households: 0, population: 0 },
      { rt: 'RT 29', households: 0, population: 0 }
    ]
  })

  useEffect(() => {
    fetchDemographics()
  }, [])

  const fetchDemographics = async () => {
    try {
      const response = await fetch('/api/admin/demographics')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setFormData({
            year: data.year,
            totalPopulation: data.totalPopulation,
            maleCount: data.maleCount,
            femaleCount: data.femaleCount,
            ageData: JSON.parse(data.ageData),
            educationData: JSON.parse(data.educationData),
            occupationData: JSON.parse(data.occupationData),
            rtData: data.rtData ? JSON.parse(data.rtData) : [
              { rt: 'RT 22', households: 0, population: 0 },
              { rt: 'RT 23', households: 0, population: 0 },
              { rt: 'RT 24', households: 0, population: 0 },
              { rt: 'RT 25', households: 0, population: 0 },
              { rt: 'RT 26', households: 0, population: 0 },
              { rt: 'RT 27', households: 0, population: 0 },
              { rt: 'RT 28', households: 0, population: 0 },
              { rt: 'RT 29', households: 0, population: 0 }
            ]
          })
        }
      }
    } catch (error) {
      console.error('Error fetching demographics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/demographics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Data demografi berhasil disimpan!' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: result.error || 'Gagal menyimpan data' })
      }
    } catch (error) {
      console.error('Error saving demographics:', error)
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan data' })
    } finally {
      setSaving(false)
    }
  }

  const updateAgeData = (index: number, value: number) => {
    const newAgeData = [...formData.ageData]
    newAgeData[index].count = value
    setFormData({ ...formData, ageData: newAgeData })
  }

  const updateEducationData = (index: number, value: number) => {
    const newEducationData = [...formData.educationData]
    newEducationData[index].count = value
    setFormData({ ...formData, educationData: newEducationData })
  }

  const updateOccupationData = (index: number, value: number) => {
    const newOccupationData = [...formData.occupationData]
    newOccupationData[index].count = value
    setFormData({ ...formData, occupationData: newOccupationData })
  }

  const updateRtData = (index: number, field: 'households' | 'population', value: number) => {
    const newRtData = [...formData.rtData]
    newRtData[index][field] = value
    setFormData({ ...formData, rtData: newRtData })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Data Demografi</h1>
            <p className="text-gray-600">Update data kependudukan dan statistik dusun</p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Umum</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="label">Tahun</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Total Penduduk</label>
              <input
                type="number"
                value={formData.totalPopulation}
                onChange={(e) => setFormData({ ...formData, totalPopulation: parseInt(e.target.value) })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Laki-laki</label>
              <input
                type="number"
                value={formData.maleCount}
                onChange={(e) => setFormData({ ...formData, maleCount: parseInt(e.target.value) })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Perempuan</label>
              <input
                type="number"
                value={formData.femaleCount}
                onChange={(e) => setFormData({ ...formData, femaleCount: parseInt(e.target.value) })}
                className="input"
                required
              />
            </div>
          </div>
        </div>

        {/* Age Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Distribusi Usia</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {formData.ageData.map((item, index) => (
              <div key={index}>
                <label className="label">{item.ageGroup}</label>
                <input
                  type="number"
                  value={item.count}
                  onChange={(e) => updateAgeData(index, parseInt(e.target.value) || 0)}
                  className="input"
                  placeholder="Jumlah jiwa"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Education Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tingkat Pendidikan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {formData.educationData.map((item, index) => (
              <div key={index}>
                <label className="label">{item.level}</label>
                <input
                  type="number"
                  value={item.count}
                  onChange={(e) => updateEducationData(index, parseInt(e.target.value) || 0)}
                  className="input"
                  placeholder="Jumlah jiwa"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Occupation Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Jenis Pekerjaan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {formData.occupationData.map((item, index) => (
              <div key={index}>
                <label className="label">{item.type}</label>
                <input
                  type="number"
                  value={item.count}
                  onChange={(e) => updateOccupationData(index, parseInt(e.target.value) || 0)}
                  className="input"
                  placeholder="Jumlah jiwa"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RT Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Data Per RT (RT 22 - RT 29)</h2>
          <p className="text-sm text-gray-600 mb-4">Masukkan jumlah Kepala Keluarga (KK) dan jumlah jiwa untuk setiap RT</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">RT</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Jumlah KK</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Jumlah Jiwa</th>
                </tr>
              </thead>
              <tbody>
                {formData.rtData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.rt}</td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={item.households}
                        onChange={(e) => updateRtData(index, 'households', parseInt(e.target.value) || 0)}
                        className="input w-32"
                        placeholder="Jumlah KK"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={item.population}
                        onChange={(e) => updateRtData(index, 'population', parseInt(e.target.value) || 0)}
                        className="input w-32"
                        placeholder="Jumlah jiwa"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-bold text-gray-900">Total</td>
                  <td className="py-3 px-4 font-bold text-primary-600">
                    {formData.rtData.reduce((sum, item) => sum + item.households, 0)} KK
                  </td>
                  <td className="py-3 px-4 font-bold text-primary-600">
                    {formData.rtData.reduce((sum, item) => sum + item.population, 0)} Jiwa
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="btn-secondary"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Simpan Data
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
