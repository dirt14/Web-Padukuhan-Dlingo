import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ settings: null })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const existing = await prisma.siteSettings.findFirst()

    if (existing) {
      const settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: {
          siteName: data.siteName,
          tagline: data.tagline,
          logo: data.logo,
          heroImage: data.heroImage,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          footerText: data.footerText
        }
      })
      return NextResponse.json({ settings })
    } else {
      const settings = await prisma.siteSettings.create({
        data: {
          siteName: data.siteName,
          tagline: data.tagline,
          logo: data.logo,
          heroImage: data.heroImage,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          footerText: data.footerText
        }
      })
      return NextResponse.json({ settings })
    }
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
