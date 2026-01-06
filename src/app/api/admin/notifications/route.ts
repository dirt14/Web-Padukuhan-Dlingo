import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

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
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { notifications } = await request.json()

    // Update or create notifications
    const results = []
    for (const notif of notifications) {
      if (notif.id) {
        const updated = await prisma.notification.update({
          where: { id: notif.id },
          data: {
            title: notif.title,
            message: notif.message,
            link: notif.link || null,
            type: notif.type,
            active: notif.active
          }
        })
        results.push(updated)
      } else {
        const created = await prisma.notification.create({
          data: {
            title: notif.title,
            message: notif.message,
            link: notif.link || null,
            type: notif.type,
            active: notif.active
          }
        })
        results.push(created)
      }
    }

    return NextResponse.json({ notifications: results })
  } catch (error) {
    console.error('Notifications update error:', error)
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 })
  }
}
