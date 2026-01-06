import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create users
  const adminPassword = await hash('password123', 12)
  const ktPassword = await hash('password123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@dusundlingo.com' },
    update: {},
    create: {
      email: 'admin@dusundlingo.com',
      name: 'Pak Dukuh',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  const kt = await prisma.user.upsert({
    where: { email: 'kt@dusundlingo.com' },
    update: {},
    create: {
      email: 'kt@dusundlingo.com',
      name: 'Karang Taruna',
      password: ktPassword,
      role: 'KARANG_TARUNA'
    }
  })

  console.log('Created users:', { admin: admin.email, kt: kt.email })

  // Create village profile
  await prisma.villageProfile.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      vision: 'Mewujudkan Dusun Dlingo sebagai dusun yang mandiri, sejahtera, berbudaya, dan berwawasan lingkungan.',
      mission: `1. Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan
2. Mengembangkan ekonomi kreatif berbasis potensi lokal
3. Melestarikan budaya dan kearifan lokal
4. Menjaga kelestarian lingkungan hidup
5. Meningkatkan partisipasi masyarakat dalam pembangunan dusun
6. Membangun infrastruktur yang mendukung kesejahteraan warga`,
      history: 'Dusun Dlingo adalah sebuah dusun yang terletak di Desa Dlingo, Kecamatan Dlingo, Kabupaten Bantul, Daerah Istimewa Yogyakarta. Dusun ini dikenal dengan semangat gotong royong dan kebersamaan warganya dalam berbagai kegiatan sosial dan keagamaan.',
      address: 'Dusun Dlingo, Desa Dlingo, Kecamatan Dlingo, Kabupaten Bantul, Daerah Istimewa Yogyakarta',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.123456789!2d110.4589936!3d-7.8834629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5d1234567890%3A0x1234567890abcdef!2sDlingo%2C%20Kec.%20Dlingo%2C%20Kabupaten%20Bantul%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1704500000000!5m2!1sid!2sid',
      phone: '+62 812 3456 7890',
      email: 'dusundlingo@gmail.com'
    }
  })

  console.log('Created village profile')

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Dusun Dlingo',
      tagline: 'Bersama Membangun Dusun',
      heroTitle: 'Selamat Datang di Dusun Dlingo',
      heroSubtitle: 'Portal informasi resmi Dusun Dlingo. Temukan pengumuman, kegiatan, dan layanan untuk warga dusun.'
    }
  })

  console.log('Created site settings')

  // Create organization members
  const members = [
    { name: 'Bapak Dukuh', position: 'Kepala Dusun', order: 1, type: 'VILLAGE' },
    { name: 'Wakil Dukuh', position: 'Wakil Kepala Dusun', order: 2, type: 'VILLAGE' },
    { name: 'Sekretaris Dusun', position: 'Sekretaris', order: 3, type: 'VILLAGE' },
    { name: 'Bendahara Dusun', position: 'Bendahara', order: 4, type: 'VILLAGE' },
    { name: 'Ketua RT 01', position: 'Ketua RT 01', order: 5, type: 'VILLAGE' },
    { name: 'Ketua RT 02', position: 'Ketua RT 02', order: 6, type: 'VILLAGE' },
  ]

  for (const member of members) {
    await prisma.organizationMember.create({ data: member })
  }

  console.log('Created organization members')

  // Create Karang Taruna profile
  await prisma.karangTarunaProfile.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      vision: 'Menjadi organisasi kepemudaan yang kreatif, inovatif, dan berdaya guna bagi masyarakat Dusun Dlingo',
      mission: `1. Mengembangkan potensi dan kreativitas pemuda dusun
2. Melaksanakan kegiatan sosial kemasyarakatan
3. Menjadi wadah aspirasi dan pemberdayaan pemuda
4. Membangun jaringan kerjasama dengan berbagai pihak
5. Melestarikan budaya dan kearifan lokal`,
      description: 'Karang Taruna Dusun Dlingo adalah organisasi kepemudaan yang bergerak di bidang pemberdayaan pemuda dan kegiatan sosial kemasyarakatan.',
      workProgram: `### Program Rutin
- Rapat koordinasi bulanan
- Kerja bakti lingkungan setiap minggu
- Olahraga bersama setiap Sabtu

### Program Tahunan
- Peringatan HUT RI
- Festival Budaya Dusun
- Bakti sosial
- Turnamen olahraga antar RT`
    }
  })

  // Create KT members
  const ktMembers = [
    { name: 'Ketua Karang Taruna', position: 'Ketua', order: 1, type: 'KARANG_TARUNA', phone: '+62 813 1234 5678' },
    { name: 'Wakil Ketua KT', position: 'Wakil Ketua', order: 2, type: 'KARANG_TARUNA' },
    { name: 'Sekretaris KT', position: 'Sekretaris', order: 3, type: 'KARANG_TARUNA' },
    { name: 'Bendahara KT', position: 'Bendahara', order: 4, type: 'KARANG_TARUNA' },
  ]

  for (const member of ktMembers) {
    await prisma.organizationMember.create({ data: member })
  }

  console.log('Created Karang Taruna profile and members')

  // Create activities
  const activities = [
    {
      title: 'Bank Sampah Dlingo',
      slug: 'bank-sampah',
      description: 'Program pengelolaan sampah berbasis masyarakat untuk menjaga kebersihan lingkungan dusun.',
      category: 'BANK_SAMPAH',
      schedule: 'Setiap Minggu, 08:00 - 11:00 WIB',
      location: 'Balai Dusun Dlingo',
      content: `## Tentang Bank Sampah

Bank Sampah Dlingo adalah program pengelolaan sampah berbasis masyarakat yang bertujuan untuk mengurangi volume sampah dan meningkatkan kesadaran warga akan pentingnya pengelolaan sampah yang baik.

## Manfaat

- Mengurangi volume sampah yang dibuang ke TPA
- Memberikan nilai ekonomis dari sampah yang dikumpulkan
- Meningkatkan kesadaran lingkungan warga
- Menciptakan lingkungan yang bersih dan sehat`,
      authorId: admin.id
    },
    {
      title: 'Pengajian Rutin',
      slug: 'pengajian',
      description: 'Kegiatan keagamaan rutin untuk meningkatkan keimanan dan ketakwaan warga.',
      category: 'PENGAJIAN',
      schedule: 'Setiap Jumat, 19:30 WIB',
      location: 'Masjid Al-Ikhlas',
      content: `## Tentang Pengajian Rutin

Pengajian rutin Dusun Dlingo adalah kegiatan keagamaan yang dilaksanakan secara berkala untuk meningkatkan keimanan dan ketakwaan warga serta mempererat tali silaturahmi antar warga.

## Jadwal Pengajian

- Pengajian Bapak-bapak: Jumat malam
- Pengajian Ibu-ibu: Minggu siang
- Pengajian Remaja: Sabtu malam`,
      authorId: admin.id
    },
    {
      title: 'Kegiatan Karang Taruna',
      slug: 'karang-taruna-kegiatan',
      description: 'Program pemberdayaan pemuda untuk pengembangan kreativitas dan kegiatan sosial.',
      category: 'KARANG_TARUNA',
      schedule: 'Setiap Sabtu, 16:00 WIB',
      location: 'Sekretariat Karang Taruna',
      authorId: kt.id
    }
  ]

  for (const activity of activities) {
    await prisma.activity.create({ data: activity })
  }

  console.log('Created activities')

  // Create announcements
  const announcements = [
    {
      title: 'Jadwal Vaksinasi COVID-19 Booster',
      slug: 'jadwal-vaksinasi-covid-19-booster',
      content: 'Diberitahukan kepada seluruh warga Dusun Dlingo bahwa akan dilaksanakan vaksinasi COVID-19 Booster pada:\n\nHari/Tanggal: Sabtu, 15 Januari 2025\nWaktu: 08.00 - 12.00 WIB\nTempat: Balai Dusun Dlingo\n\nHarap membawa KTP dan kartu vaksinasi sebelumnya. Terima kasih.',
      excerpt: 'Vaksinasi booster akan dilaksanakan pada hari Sabtu di Balai Dusun.',
      category: 'KESEHATAN',
      priority: 'IMPORTANT',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id
    },
    {
      title: 'Pendaftaran Bantuan Sosial Tahun 2025',
      slug: 'pendaftaran-bantuan-sosial-2025',
      content: 'Pendaftaran penerima bantuan sosial tahun 2025 telah dibuka. Bagi warga yang memenuhi kriteria, silakan mendaftar ke RT masing-masing dengan membawa:\n\n1. Fotokopi KTP\n2. Fotokopi KK\n3. Surat Keterangan Tidak Mampu\n\nBatas pendaftaran: 31 Januari 2025',
      excerpt: 'Pendaftaran bantuan sosial tahun 2025 telah dibuka.',
      category: 'BANTUAN_SOSIAL',
      priority: 'IMPORTANT',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id
    },
    {
      title: 'Kerja Bakti Bulanan',
      slug: 'kerja-bakti-bulanan-januari',
      content: 'Mengajak seluruh warga Dusun Dlingo untuk berpartisipasi dalam kerja bakti bulanan yang akan dilaksanakan pada:\n\nHari: Minggu\nWaktu: 07.00 WIB\nTitik Kumpul: Balai Dusun\n\nMari bersama-sama menjaga kebersihan lingkungan dusun kita.',
      category: 'KEGIATAN_DUSUN',
      priority: 'NORMAL',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id
    }
  ]

  for (const announcement of announcements) {
    await prisma.announcement.create({ data: announcement })
  }

  console.log('Created announcements')

  // Create notification
  await prisma.notification.create({
    data: {
      title: 'Pengumuman Penting',
      message: 'Pendaftaran bantuan sosial 2025 telah dibuka. Segera daftarkan diri Anda!',
      link: '/pengumuman/pendaftaran-bantuan-sosial-2025',
      type: 'WARNING',
      active: true
    }
  })

  console.log('Created notification')

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
