import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const photo = await prisma.photo.create({
      data: {
        url: data.url,
        caption: data.caption || null,
        category: data.category || null,
        albumId: data.albumId || null,
        activityId: data.activityId || null
      }
    })

    return NextResponse.json({ photo })
  } catch (error) {
    console.error('Create photo error:', error)
    return NextResponse.json({ error: 'Failed to create photo' }, { status: 500 })
  }
}
