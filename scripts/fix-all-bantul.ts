import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    let updateCount = 0

    // Update SiteSettings
    const settings = await prisma.siteSettings.findFirst()
    if (settings) {
      const updates: any = {}

      if (settings.aboutDusun?.includes('Bantul')) {
        updates.aboutDusun = settings.aboutDusun
          .replace(/Desa Dlingo,?\s*Kecamatan Dlingo,?\s*Kabupaten Bantul,?\s*Daerah Istimewa Yogyakarta/gi, 'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo')
          .replace(/Kabupaten Bantul/gi, 'Kabupaten Kulon Progo')
      }

      if (settings.address?.includes('Bantul')) {
        updates.address = settings.address
          .replace(/Desa Dlingo,?\s*Kecamatan Dlingo,?\s*Kabupaten Bantul,?\s*Daerah Istimewa Yogyakarta/gi, 'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo')
          .replace(/Kabupaten Bantul/gi, 'Kabupaten Kulon Progo')
      }

      if (settings.footerAbout?.includes('Bantul')) {
        updates.footerAbout = settings.footerAbout
          .replace(/Desa Dlingo,?\s*Kecamatan Dlingo,?\s*Kabupaten Bantul,?\s*Daerah Istimewa Yogyakarta/gi, 'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo')
          .replace(/Kabupaten Bantul/gi, 'Kabupaten Kulon Progo')
      }

      if (Object.keys(updates).length > 0) {
        await prisma.siteSettings.update({
          where: { id: settings.id },
          data: updates
        })
        updateCount++
        console.log('✅ Updated SiteSettings')
      }
    }

    // Update VillageProfile
    const profile = await prisma.villageProfile.findFirst()
    if (profile) {
      const updates: any = {}

      if (profile.history?.includes('Bantul')) {
        updates.history = profile.history
          .replace(/Desa Dlingo,?\s*Kecamatan Dlingo,?\s*Kabupaten Bantul,?\s*Daerah Istimewa Yogyakarta/gi, 'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo')
          .replace(/Kabupaten Bantul/gi, 'Kabupaten Kulon Progo')
      }

      if (profile.address?.includes('Bantul')) {
        updates.address = profile.address
          .replace(/Desa Dlingo,?\s*Kecamatan Dlingo,?\s*Kabupaten Bantul,?\s*Daerah Istimewa Yogyakarta/gi, 'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo')
          .replace(/Kabupaten Bantul/gi, 'Kabupaten Kulon Progo')
      }

      if (Object.keys(updates).length > 0) {
        await prisma.villageProfile.update({
          where: { id: profile.id },
          data: updates
        })
        updateCount++
        console.log('✅ Updated VillageProfile')
      }
    }

    if (updateCount === 0) {
      console.log('ℹ️ No Bantul references found in database')
    } else {
      console.log(`\n✅ Successfully updated ${updateCount} record(s)`)
      console.log('\n🔄 Please refresh your browser to see the changes')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
