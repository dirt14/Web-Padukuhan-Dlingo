import prisma from '@/lib/db'
import HomeContent from '@/components/HomeContent'

// Disable caching - always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getData() {
  try {
    const now = new Date()

    const [announcements, activities, articles, settings, profile, ktProfile, demographics, totalActivities] = await Promise.all([
      prisma.announcement.findMany({
        where: {
          status: 'PUBLISHED',
          // Filter berdasarkan kurun waktu aktif
          OR: [
            { activeStart: null, activeEnd: null },
            { activeStart: { lte: now }, activeEnd: { gte: now } },
            { activeStart: { lte: now }, activeEnd: null },
            { activeStart: null, activeEnd: { gte: now } }
          ]
        },
        orderBy: { publishedAt: 'desc' },
        take: 6
      }),
      prisma.activity.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        take: 6
      }),
      prisma.siteSettings.findFirst(),
      prisma.villageProfile.findFirst(),
      prisma.karangTarunaProfile.findFirst(),
      prisma.demographics.findFirst({
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.activity.count({
        where: { status: 'PUBLISHED' }
      })
    ])
    return { announcements, activities, articles, settings, profile, ktProfile, demographics, totalActivities }
  } catch {
    return { announcements: [], activities: [], articles: [], settings: null, profile: null, ktProfile: null, demographics: null, totalActivities: 0 }
  }
}

export default async function HomePage() {
  const data = await getData()

  return <HomeContent {...data} />
}
