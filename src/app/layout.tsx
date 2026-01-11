import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'), // Change in production
  title: {
    default: 'Dusun Dlingo - Website Resmi',
    template: '%s | Dusun Dlingo'
  },
  description: 'Website resmi Dusun Dlingo. Portal informasi untuk warga tentang pengumuman, kegiatan, dan layanan dusun.',
  keywords: ['Dusun Dlingo', 'Desa', 'Pengumuman', 'Kegiatan', 'Karang Taruna', 'Banyuroto', 'Nanggulan', 'Kulon Progo'],
  authors: [{ name: 'Dusun Dlingo' }],
  creator: 'Dusun Dlingo',
  publisher: 'Dusun Dlingo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/logo_dusun.svg',
    shortcut: '/images/logo_dusun.svg',
    apple: '/images/logo_dusun.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'Dusun Dlingo - Website Resmi',
    description: 'Website resmi Dusun Dlingo. Portal informasi untuk warga tentang pengumuman, kegiatan, dan layanan dusun.',
    siteName: 'Dusun Dlingo',
    images: [
      {
        url: '/images/og-image.png', // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: 'Dusun Dlingo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dusun Dlingo - Website Resmi',
    description: 'Website resmi Dusun Dlingo. Portal informasi untuk warga.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Add when you have it
    // yandex: 'your-yandex-verification-code',
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
