import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ notifications })
  } catch {
    return NextResponse.json({ notifications: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { notifications } = await request.json()

    // Update or create notifications
    const results = []
    for (const notif of notifications) {
      const data = {
        title: notif.title,
        message: notif.message,
        link: notif.link || null,
        type: notif.type,
        active: notif.active,
        startDate: notif.startDate ? new Date(notif.startDate) : null,
        endDate: notif.endDate ? new Date(notif.endDate) : null
      }

      if (notif.id) {
        const updated = await prisma.notification.update({
          where: { id: notif.id },
          data
        })
        results.push(updated)
      } else {
        const created = await prisma.notification.create({ data })
        results.push(created)
      }
    }

    return NextResponse.json({ notifications: results })
  } catch (error) {
    console.error('Notifications update error:', error)
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 })
  }
}
