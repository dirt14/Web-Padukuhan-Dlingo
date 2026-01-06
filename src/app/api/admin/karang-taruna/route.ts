import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const profile = await prisma.karangTarunaProfile.findFirst()
    return NextResponse.json({ profile })
  } catch {
    return NextResponse.json({ profile: null })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const existing = await prisma.karangTarunaProfile.findFirst()

    if (existing) {
      const profile = await prisma.karangTarunaProfile.update({
        where: { id: existing.id },
        data: {
          vision: data.vision,
          mission: data.mission,
          description: data.description,
          workProgram: data.workProgram
        }
      })
      return NextResponse.json({ profile })
    } else {
      const profile = await prisma.karangTarunaProfile.create({
        data: {
          vision: data.vision,
          mission: data.mission,
          description: data.description,
          workProgram: data.workProgram
        }
      })
      return NextResponse.json({ profile })
    }
  } catch (error) {
    console.error('KT Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
