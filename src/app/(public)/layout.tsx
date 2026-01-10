import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NotificationBanner from '@/components/NotificationBanner'
import FontSizeControl from '@/components/FontSizeControl'
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

async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    return settings
  } catch {
    return null
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const notifications = await getNotifications()
  const settings = await getSiteSettings()

  return (
    <div className="min-h-screen flex flex-col">
      <NotificationBanner notifications={notifications} />
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <FontSizeControl />
    </div>
  )
}
