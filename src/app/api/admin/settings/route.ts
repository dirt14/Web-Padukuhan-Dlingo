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
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const existing = await prisma.siteSettings.findFirst()

    const settingsData = {
      siteName: data.siteName,
      tagline: data.tagline,
      logo: data.logo,
      heroImage: data.heroImage,
      heroImage2: data.heroImage2,
      heroImage3: data.heroImage3,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      footerText: data.footerText,

      // Feature toggles
      showForum: data.showForum,
      showDemographics: data.showDemographics,
      showSuggestionBox: data.showSuggestionBox,
      showGallery: data.showGallery,
      showKegiatan: data.showKegiatan,
      showPengumuman: data.showPengumuman,
      showKarangTaruna: data.showKarangTaruna,
      showEdukasi: data.showEdukasi,

      // Static content
      aboutDusun: data.aboutDusun,
      footerAbout: data.footerAbout,

      // Contact info
      phone: data.phone,
      email: data.email,
      address: data.address,

      // Pak Dukuh contact
      dukuhName: data.dukuhName,
      dukuhPhone: data.dukuhPhone,
      dukuhEmail: data.dukuhEmail,

      // Karang Taruna contact
      karangTarunaName: data.karangTarunaName,
      karangTarunaPhone: data.karangTarunaPhone,

      // Social media
      facebook: data.facebook,
      instagram: data.instagram,
      twitter: data.twitter,
      youtube: data.youtube
    }

    if (existing) {
      const settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: settingsData
      })
      return NextResponse.json({ settings })
    } else {
      const settings = await prisma.siteSettings.create({
        data: settingsData
      })
      return NextResponse.json({ settings })
    }
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
