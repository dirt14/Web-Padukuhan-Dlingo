import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Dusun Dlingo - Website Resmi',
    template: '%s | Dusun Dlingo'
  },
  description: 'Website resmi Dusun Dlingo. Portal informasi untuk warga tentang pengumuman, kegiatan, dan layanan dusun.',
  keywords: ['Dusun Dlingo', 'Desa', 'Pengumuman', 'Kegiatan', 'Karang Taruna'],
  icons: {
    icon: '/images/logo_dusun.svg',
    shortcut: '/images/logo_dusun.svg',
    apple: '/images/logo_dusun.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
