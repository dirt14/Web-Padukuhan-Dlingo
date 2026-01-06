import { Metadata } from 'next'
import { User, Phone } from 'lucide-react'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Struktur Organisasi',
  description: 'Struktur organisasi pemerintahan Dusun Dlingo'
}

async function getMembers() {
  try {
    const members = await prisma.organizationMember.findMany({
      where: { type: 'VILLAGE' },
      orderBy: { order: 'asc' }
    })
    return members
  } catch {
    return []
  }
}

export default async function StrukturPage() {
  const members = await getMembers()

  const defaultMembers = [
    { id: '1', name: 'Bapak Dukuh', position: 'Kepala Dusun', image: null, phone: '+62 812 3456 7890', order: 1 },
    { id: '2', name: 'Wakil Dukuh', position: 'Wakil Kepala Dusun', image: null, phone: null, order: 2 },
    { id: '3', name: 'Sekretaris', position: 'Sekretaris Dusun', image: null, phone: null, order: 3 },
    { id: '4', name: 'Bendahara', position: 'Bendahara Dusun', image: null, phone: null, order: 4 },
    { id: '5', name: 'Ketua RT 01', position: 'Ketua RT 01', image: null, phone: null, order: 5 },
    { id: '6', name: 'Ketua RT 02', position: 'Ketua RT 02', image: null, phone: null, order: 6 },
  ]

  const displayMembers = members.length > 0 ? members : defaultMembers

  // Group members by position level
  const kepala = displayMembers.filter(m => m.position.toLowerCase().includes('kepala dusun') && !m.position.toLowerCase().includes('wakil'))
  const wakil = displayMembers.filter(m => m.position.toLowerCase().includes('wakil'))
  const pengurus = displayMembers.filter(m =>
    m.position.toLowerCase().includes('sekretaris') ||
    m.position.toLowerCase().includes('bendahara')
  )
  const rt = displayMembers.filter(m => m.position.toLowerCase().includes('rt'))
  const lainnya = displayMembers.filter(m =>
    !kepala.includes(m) && !wakil.includes(m) && !pengurus.includes(m) && !rt.includes(m)
  )

  const MemberCard = ({ member }: { member: typeof displayMembers[0] }) => (
    <div className="card p-6 text-center hover:shadow-md transition-shadow">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
        {member.image ? (
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <User className="h-12 w-12 text-white" />
        )}
      </div>
      <h3 className="font-semibold text-gray-900">{member.name}</h3>
      <p className="text-sm text-primary-600 font-medium">{member.position}</p>
      {member.phone && (
        <a href={`tel:${member.phone}`} className="mt-2 text-sm text-gray-500 flex items-center justify-center hover:text-primary-600">
          <Phone className="h-4 w-4 mr-1" />
          {member.phone}
        </a>
      )}
    </div>
  )

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Struktur Organisasi</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Susunan pengurus dan perangkat pemerintahan Dusun Dlingo
          </p>
        </div>

        {/* Organization Chart */}
        <div className="space-y-12">
          {/* Kepala Dusun */}
          {kepala.length > 0 && (
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <MemberCard member={kepala[0]} />
              </div>
            </div>
          )}

          {/* Wakil */}
          {wakil.length > 0 && (
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <MemberCard member={wakil[0]} />
              </div>
            </div>
          )}

          {/* Sekretaris & Bendahara */}
          {pengurus.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Pengurus</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {pengurus.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* RT */}
          {rt.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Ketua RT</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {rt.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Others */}
          {lainnya.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Pengurus Lainnya</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {lainnya.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
