import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { slugify } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const slug = slugify(data.title) + '-' + Date.now().toString(36)

    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt || null,
        image: data.image || null,
        category: data.category,
        priority: data.priority,
        status: data.status,
        showAsNotification: data.showAsNotification || false,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        authorId: session.user.id
      }
    })

    return NextResponse.json({ announcement })
  } catch (error) {
    console.error('Create announcement error:', error)
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
}
