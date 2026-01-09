import { Metadata } from 'next'
import { HelpCircle, ChevronDown } from 'lucide-react'
import prisma from '@/lib/db'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan Umum',
  description: 'Pertanyaan yang sering diajukan tentang Dusun Dlingo'
}

async function getFAQs() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { published: true },
      orderBy: { order: 'asc' }
    })
    return faqs
  } catch {
    return []
  }
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  // Default FAQ jika database kosong
  const defaultFAQs = [
    {
      id: '1',
      category: 'ADMINISTRASI',
      question: 'Bagaimana cara mengurus surat pengantar?',
      answer: 'Untuk mengurus surat pengantar, warga dapat datang langsung ke rumah Pak Dukuh dengan membawa KTP dan KK. Surat pengantar biasanya dapat selesai dalam 1-2 hari kerja.',
      order: 1
    },
    {
      id: '2',
      category: 'ADMINISTRASI',
      question: 'Dokumen apa saja yang diperlukan untuk pembuatan KK?',
      answer: 'Untuk pembuatan Kartu Keluarga (KK), dokumen yang diperlukan: 1) Surat Pengantar RT/RW, 2) Fotocopy KTP Kepala Keluarga, 3) Fotocopy Akta Kelahiran seluruh anggota keluarga, 4) Fotocopy Buku Nikah (jika sudah menikah), 5) Surat Keterangan Pindah (jika pindahan).',
      order: 2
    },
    {
      id: '3',
      category: 'PELAYANAN',
      question: 'Kapan jam pelayanan administrasi dusun?',
      answer: 'Pelayanan administrasi dusun tersedia setiap hari Senin-Jumat pukul 08.00-15.00 WIB. Untuk urusan mendesak di luar jam tersebut, silakan hubungi Pak Dukuh terlebih dahulu.',
      order: 3
    },
    {
      id: '4',
      category: 'KEGIATAN',
      question: 'Kegiatan apa saja yang rutin dilaksanakan di dusun?',
      answer: 'Kegiatan rutin di dusun meliputi: 1) Bank Sampah setiap hari Minggu, 2) Pengajian rutin setiap malam Jumat, 3) Kegiatan Karang Taruna setiap 2 minggu sekali, 4) Kerja bakti lingkungan setiap bulan, 5) Arisan RT/RW.',
      order: 4
    },
    {
      id: '5',
      category: 'KEGIATAN',
      question: 'Bagaimana cara bergabung dengan Karang Taruna?',
      answer: 'Pemuda/i usia 17-35 tahun dapat bergabung dengan Karang Taruna dengan mendaftar ke pengurus atau datang langsung saat pertemuan rutin. Tidak ada biaya pendaftaran.',
      order: 5
    },
    {
      id: '6',
      category: 'PELAYANAN',
      question: 'Apakah ada layanan konsultasi untuk warga?',
      answer: 'Ya, warga dapat berkonsultasi dengan Pak Dukuh mengenai berbagai hal terkait administrasi, sosial kemasyarakatan, atau permasalahan warga. Konsultasi dapat dilakukan saat jam pelayanan atau dengan membuat janji terlebih dahulu.',
      order: 6
    },
    {
      id: '7',
      category: 'UMUM',
      question: 'Bagaimana cara menyampaikan saran atau keluhan?',
      answer: 'Warga dapat menyampaikan saran atau keluhan melalui: 1) Kotak saran online di website, 2) Langsung ke Pak Dukuh/RT/RW, 3) Melalui WhatsApp resmi dusun, 4) Saat pertemuan warga.',
      order: 7
    },
    {
      id: '8',
      category: 'UMUM',
      question: 'Apakah ada program bantuan sosial di dusun?',
      answer: 'Ya, dusun memiliki beberapa program bantuan sosial seperti bantuan untuk warga kurang mampu, bantuan bencana, dan program pemberdayaan masyarakat. Informasi lengkap dapat dilihat di pengumuman atau menghubungi pengurus.',
      order: 8
    }
  ]

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs

  // Group FAQs by category
  const categories = {
    ADMINISTRASI: 'Administrasi & Surat Menyurat',
    PELAYANAN: 'Pelayanan Dusun',
    KEGIATAN: 'Kegiatan & Program',
    UMUM: 'Umum'
  }

  const groupedFAQs = Object.entries(categories).reduce((acc, [key, label]) => {
    const categoryFAQs = displayFAQs.filter(faq => faq.category === key)
    if (categoryFAQs.length > 0) {
      acc[key] = { label, faqs: categoryFAQs }
    }
    return acc
  }, {} as Record<string, { label: string; faqs: typeof displayFAQs }>)

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Pertanyaan Umum (FAQ)</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang pelayanan dan kegiatan di Dusun Dlingo
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {Object.entries(groupedFAQs).map(([categoryKey, { label, faqs }]) => (
            <div key={categoryKey}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                {label}
              </h2>
              <FAQAccordion faqs={faqs} />
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 card p-8 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-100">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tidak menemukan jawaban yang Anda cari?
            </h3>
            <p className="text-gray-600 mb-6">
              Hubungi kami langsung untuk mendapatkan informasi lebih lanjut
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontak"
                className="btn-primary"
              >
                Hubungi Kami
              </a>
              <a
                href="/informasi/saran"
                className="btn-secondary"
              >
                Kirim Pertanyaan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
