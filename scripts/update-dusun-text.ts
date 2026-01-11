import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const settings = await prisma.siteSettings.findFirst()

    if (settings) {
      // Update aboutDusun if it contains "Bantul"
      if (settings.aboutDusun?.includes('Bantul')) {
        const updatedText = settings.aboutDusun.replace(
          'Desa Dlingo, Kecamatan Dlingo, Kabupaten Bantul, Daerah Istimewa Yogyakarta',
          'Dusun Dlingo, Kelurahan Banyuroto, Kecamatan Nanggulan, Kabupaten Kulon Progo'
        )

        await prisma.siteSettings.update({
          where: { id: settings.id },
          data: { aboutDusun: updatedText }
        })

        console.log('✅ Database updated successfully!')
        console.log('Old text:', settings.aboutDusun)
        console.log('New text:', updatedText)
      } else {
        console.log('ℹ️ No Bantul text found in database')
      }
    } else {
      console.log('ℹ️ No settings found in database')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
