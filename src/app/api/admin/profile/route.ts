import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const profile = await prisma.villageProfile.findFirst()
    return NextResponse.json({ profile })
  } catch {
    return NextResponse.json({ profile: null })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const existing = await prisma.villageProfile.findFirst()

    if (existing) {
      const profile = await prisma.villageProfile.update({
        where: { id: existing.id },
        data: {
          vision: data.vision,
          mission: data.mission,
          history: data.history,
          address: data.address,
          mapEmbed: data.mapEmbed,
          phone: data.phone,
          email: data.email
        }
      })
      return NextResponse.json({ profile })
    } else {
      const profile = await prisma.villageProfile.create({
        data: {
          vision: data.vision,
          mission: data.mission,
          history: data.history,
          address: data.address,
          mapEmbed: data.mapEmbed,
          phone: data.phone,
          email: data.email
        }
      })
      return NextResponse.json({ profile })
    }
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
