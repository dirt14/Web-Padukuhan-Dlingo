'use client'

import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6']

interface DemographicsData {
  year: number
  totalPopulation: number
  maleCount: number
  femaleCount: number
  ageData: Array<{ ageGroup: string; count: number }>
  educationData: Array<{ level: string; count: number }>
  occupationData: Array<{ type: string; count: number }>
}

export default function DemographicsCharts({ data }: { data: DemographicsData }) {
  const genderData = [
    { name: 'Laki-laki', value: data.maleCount },
    { name: 'Perempuan', value: data.femaleCount }
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Gender Distribution - Pie Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Distribusi Jenis Kelamin</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : '#EC4899'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Age Distribution - Bar Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Distribusi Usia</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.ageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="ageGroup"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Education Distribution - Bar Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Tingkat Pendidikan</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.educationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="level"
                type="category"
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Occupation Distribution - Pie Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Jenis Pekerjaan</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.occupationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) =>
                  percent > 0.05 ? `${type.split(' ')[0]} ${(percent * 100).toFixed(0)}%` : ''
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                nameKey="type"
              >
                {data.occupationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
