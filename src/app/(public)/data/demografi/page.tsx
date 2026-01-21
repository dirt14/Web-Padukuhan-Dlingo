import { Metadata } from 'next'
import { Users, GraduationCap, Briefcase, TrendingUp, Home } from 'lucide-react'
import prisma from '@/lib/db'
import DemographicsCharts from '@/components/DemographicsCharts'

export const metadata: Metadata = {
  title: 'Data Demografi',
  description: 'Informasi kependudukan dan statistik Dusun Dlingo'
}

async function getDemographics() {
  try {
    const demographics = await prisma.demographics.findFirst({
      orderBy: { updatedAt: 'desc' }
    })
    return demographics
  } catch {
    return null
  }
}

export default async function DemografiPage() {
  const demographics = await getDemographics()

  // Default data jika belum ada di database
  const currentYear = new Date().getFullYear()
  const data = demographics ? {
    year: demographics.year,
    totalPopulation: demographics.totalPopulation,
    maleCount: demographics.maleCount,
    femaleCount: demographics.femaleCount,
    ageData: JSON.parse(demographics.ageData),
    educationData: JSON.parse(demographics.educationData),
    occupationData: JSON.parse(demographics.occupationData),
    rtData: demographics.rtData ? JSON.parse(demographics.rtData) : null
  } : {
    year: currentYear,
    totalPopulation: 1250,
    maleCount: 625,
    femaleCount: 625,
    ageData: [
      { ageGroup: '0-5 tahun', count: 120 },
      { ageGroup: '6-12 tahun', count: 150 },
      { ageGroup: '13-18 tahun', count: 180 },
      { ageGroup: '19-30 tahun', count: 250 },
      { ageGroup: '31-50 tahun', count: 350 },
      { ageGroup: '51-65 tahun', count: 150 },
      { ageGroup: '65+ tahun', count: 50 }
    ],
    educationData: [
      { level: 'Tidak/Belum Sekolah', count: 80 },
      { level: 'SD/Sederajat', count: 300 },
      { level: 'SMP/Sederajat', count: 250 },
      { level: 'SMA/Sederajat', count: 400 },
      { level: 'D1-D3', count: 80 },
      { level: 'S1', count: 120 },
      { level: 'S2/S3', count: 20 }
    ],
    occupationData: [
      { type: 'Petani', count: 300 },
      { type: 'Wiraswasta', count: 250 },
      { type: 'PNS/TNI/Polri', count: 100 },
      { type: 'Karyawan Swasta', count: 200 },
      { type: 'Buruh', count: 150 },
      { type: 'Pelajar/Mahasiswa', count: 180 },
      { type: 'Ibu Rumah Tangga', count: 200 },
      { type: 'Lainnya', count: 120 }
    ],
    rtData: null
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Data Demografi & Statistik</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Informasi kependudukan dan data statistik Dusun Dlingo tahun {data.year}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Penduduk</p>
                <p className="text-3xl font-bold mt-2">{data.totalPopulation.toLocaleString()}</p>
                <p className="text-blue-100 text-xs mt-1">jiwa</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Laki-laki</p>
                <p className="text-3xl font-bold mt-2">{data.maleCount.toLocaleString()}</p>
                <p className="text-green-100 text-xs mt-1">
                  {((data.maleCount / data.totalPopulation) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Perempuan</p>
                <p className="text-3xl font-bold mt-2">{data.femaleCount.toLocaleString()}</p>
                <p className="text-pink-100 text-xs mt-1">
                  {((data.femaleCount / data.totalPopulation) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Kepadatan</p>
                <p className="text-3xl font-bold mt-2">~{Math.round(data.totalPopulation / 100)}</p>
                <p className="text-purple-100 text-xs mt-1">jiwa/km²</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <DemographicsCharts data={data} />

        {/* Data Tables */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* Age Distribution */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Distribusi Usia</h3>
            </div>
            <div className="space-y-3">
              {data.ageData.map((item: { ageGroup: string; count: number }, index: number) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.ageGroup}</span>
                  <span className="font-medium text-gray-900">{item.count} jiwa</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education Distribution */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Tingkat Pendidikan</h3>
            </div>
            <div className="space-y-3">
              {data.educationData.map((item: { level: string; count: number }, index: number) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.level}</span>
                  <span className="font-medium text-gray-900">{item.count} jiwa</span>
                </div>
              ))}
            </div>
          </div>

          {/* Occupation Distribution */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Jenis Pekerjaan</h3>
            </div>
            <div className="space-y-3">
              {data.occupationData.map((item: { type: string; count: number }, index: number) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.type}</span>
                  <span className="font-medium text-gray-900">{item.count} jiwa</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RT Distribution */}
        {data.rtData && data.rtData.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Data Per RT</h2>
              <p className="text-gray-600 mt-2">Distribusi penduduk berdasarkan wilayah RT</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.rtData.map((item: { rt: string; households: number; population: number }, index: number) => (
                <div key={index} className="card p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Home className="h-5 w-5 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{item.rt}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Jumlah KK</span>
                      <span className="font-semibold text-gray-900">{item.households} KK</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Jumlah Jiwa</span>
                      <span className="font-semibold text-primary-600">{item.population} jiwa</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="mt-6 card p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Home className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-primary-100 text-sm">Total Seluruh RT</p>
                    <p className="text-xl font-bold">RT 22 - RT 29</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {data.rtData.reduce((sum: number, item: { households: number }) => sum + item.households, 0)}
                    </p>
                    <p className="text-primary-100 text-sm">Total KK</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {data.rtData.reduce((sum: number, item: { population: number }) => sum + item.population, 0)}
                    </p>
                    <p className="text-primary-100 text-sm">Total Jiwa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Catatan:</strong> Data statistik ini diperbarui secara berkala.
            {demographics && demographics.updatedAt ? (
              <> Terakhir diperbarui: {new Date(demographics.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</>
            ) : (
              <> Data terakhir diperbarui: 1 Januari {currentYear}</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
