import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'VILLAGE'

    const members = await prisma.organizationMember.findMany({
      where: { type },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ members })
  } catch {
    return NextResponse.json({ members: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { members, type } = await request.json()

    // Delete existing members of this type
    await prisma.organizationMember.deleteMany({
      where: { type }
    })

    // Create new members
    for (const member of members) {
      await prisma.organizationMember.create({
        data: {
          name: member.name,
          position: member.position,
          phone: member.phone || null,
          image: member.image || null,
          order: member.order,
          type
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Members update error:', error)
    return NextResponse.json({ error: 'Failed to update members' }, { status: 500 })
  }
}
