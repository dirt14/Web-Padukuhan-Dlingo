import { Metadata } from 'next'
import { Target, Flag, CheckCircle } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Visi & Misi',
  description: 'Visi dan misi Dusun Dlingo dalam membangun masyarakat yang sejahtera dan mandiri.'
}

async function getProfile() {
  try {
    const profile = await prisma.villageProfile.findFirst()
    return profile
  } catch {
    return null
  }
}

export default async function VisiMisiPage() {
  const profile = await getProfile()

  const defaultVision = 'Mewujudkan Dusun Dlingo sebagai dusun yang mandiri, sejahtera, berbudaya, dan berwawasan lingkungan.'
  const defaultMission = `1. Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan
2. Mengembangkan ekonomi kreatif berbasis potensi lokal
3. Melestarikan budaya dan kearifan lokal
4. Menjaga kelestarian lingkungan hidup
5. Meningkatkan partisipasi masyarakat dalam pembangunan dusun
6. Membangun infrastruktur yang mendukung kesejahteraan warga`

  const vision = profile?.vision || defaultVision
  const missionText = profile?.mission || defaultMission
  const missions = missionText.split('\n').filter(m => m.trim())

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Visi & Misi</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Arah dan tujuan pembangunan Dusun Dlingo untuk mewujudkan masyarakat yang sejahtera
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Visi</h2>
            <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              &ldquo;{vision}&rdquo;
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Misi</h2>
            <p className="mt-2 text-gray-600">Langkah-langkah untuk mewujudkan visi dusun</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, index) => {
              const cleanMission = mission.replace(/^\d+\.\s*/, '')
              return (
                <div key={index} className="card p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">{cleanMission}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Nilai-Nilai</h2>
            <p className="mt-2 text-gray-600">Prinsip yang menjadi landasan setiap kegiatan</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Gotong Royong', desc: 'Bersama-sama membangun dusun dengan semangat kebersamaan' },
              { title: 'Kejujuran', desc: 'Bertindak dengan integritas dalam setiap kegiatan' },
              { title: 'Keadilan', desc: 'Memberikan perlakuan yang adil kepada semua warga' },
              { title: 'Keberlanjutan', desc: 'Membangun dengan memperhatikan masa depan' }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <CheckCircle className="h-8 w-8 text-primary-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
