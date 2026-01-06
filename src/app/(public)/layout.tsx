import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NotificationBanner from '@/components/NotificationBanner'
import prisma from '@/lib/db'

async function getNotifications() {
  try {
    const now = new Date()
    const notifications = await prisma.notification.findMany({
      where: {
        active: true,
        OR: [
          { startDate: null, endDate: null },
          {
            AND: [
              { startDate: { lte: now } },
              { endDate: { gte: now } }
            ]
          },
          { startDate: { lte: now }, endDate: null },
          { startDate: null, endDate: { gte: now } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
    return notifications
  } catch {
    return []
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const notifications = await getNotifications()

  return (
    <div className="min-h-screen flex flex-col">
      <NotificationBanner notifications={notifications} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
