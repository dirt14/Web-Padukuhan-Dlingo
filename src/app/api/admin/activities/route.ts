import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { slugify } from '@/lib/utils'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const slug = slugify(data.title) + '-' + Date.now().toString(36)

    const activity = await prisma.activity.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        content: data.content || null,
        image: data.image || null,
        category: data.category,
        schedule: data.schedule || null,
        location: data.location || null,
        responsible: data.responsible || null,
        status: data.status,
        authorId: session.user.id
      }
    })

    return NextResponse.json({ activity })
  } catch (error) {
    console.error('Create activity error:', error)
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 })
  }
}
