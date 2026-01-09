import { Metadata } from 'next'
import { FileText, Download, Search, Folder } from 'lucide-react'
import prisma from '@/lib/db'
import DocumentList from '@/components/DocumentList'

export const metadata: Metadata = {
  title: 'Perpustakaan Digital',
  description: 'Dokumen dan formulir penting Dusun Dlingo'
}

async function getDocuments() {
  try {
    const documents = await prisma.document.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
    return documents
  } catch {
    return []
  }
}

export default async function DokumenPage() {
  const documents = await getDocuments()

  // Default documents jika database kosong
  const defaultDocuments = [
    {
      id: '1',
      title: 'Formulir Surat Pengantar',
      description: 'Template surat pengantar untuk berbagai keperluan administrasi',
      fileName: 'formulir-surat-pengantar.pdf',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: 245000,
      category: 'FORMULIR',
      downloads: 150,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Peraturan Dusun tentang Kebersihan Lingkungan',
      description: 'Peraturan dan tata tertib menjaga kebersihan lingkungan dusun',
      fileName: 'peraturan-kebersihan.pdf',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: 512000,
      category: 'PERATURAN',
      downloads: 89,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Panduan Pengelolaan Bank Sampah',
      description: 'Panduan lengkap untuk warga dalam mengelola sampah rumah tangga',
      fileName: 'panduan-bank-sampah.pdf',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: 1024000,
      category: 'PANDUAN',
      downloads: 203,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'Formulir Keterangan Domisili',
      description: 'Template surat keterangan domisili untuk warga',
      fileName: 'form-keterangan-domisili.pdf',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: 198000,
      category: 'SURAT_KETERANGAN',
      downloads: 276,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const displayDocuments = documents.length > 0 ? documents : defaultDocuments

  const categories = {
    PERATURAN: { label: 'Peraturan', icon: FileText, color: 'bg-red-100 text-red-800' },
    SURAT_KETERANGAN: { label: 'Surat Keterangan', icon: FileText, color: 'bg-blue-100 text-blue-800' },
    FORMULIR: { label: 'Formulir', icon: FileText, color: 'bg-green-100 text-green-800' },
    PANDUAN: { label: 'Panduan', icon: FileText, color: 'bg-purple-100 text-purple-800' },
    LAINNYA: { label: 'Lainnya', icon: Folder, color: 'bg-gray-100 text-gray-800' }
  }

  // Group documents by category
  const groupedDocuments = Object.keys(categories).reduce((acc, key) => {
    const docs = displayDocuments.filter(doc => doc.category === key)
    if (docs.length > 0) {
      acc[key] = docs
    }
    return acc
  }, {} as Record<string, typeof displayDocuments>)

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Perpustakaan Digital</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Akses dokumen, formulir, dan panduan penting untuk keperluan administrasi dusun
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{displayDocuments.length}</p>
            <p className="text-sm text-gray-600">Total Dokumen</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Folder className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{Object.keys(groupedDocuments).length}</p>
            <p className="text-sm text-gray-600">Kategori</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {displayDocuments.reduce((sum, doc) => sum + doc.downloads, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Unduhan</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">PDF</p>
            <p className="text-sm text-gray-600">Format Utama</p>
          </div>
        </div>

        {/* Documents by Category */}
        <div className="space-y-8">
          {Object.entries(groupedDocuments).map(([categoryKey, docs]) => {
            const category = categories[categoryKey as keyof typeof categories]
            return (
              <div key={categoryKey}>
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mr-3`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{category.label}</h2>
                  <span className="ml-3 text-sm text-gray-500">({docs.length} dokumen)</span>
                </div>
                <DocumentList documents={docs} />
              </div>
            )
          })}
        </div>

        {displayDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Belum ada dokumen tersedia</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Informasi Penting:
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Semua dokumen tersedia dalam format PDF yang mudah diunduh dan dicetak</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Pastikan formulir diisi dengan lengkap dan benar sebelum diserahkan</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Untuk informasi lebih lanjut, hubungi petugas administrasi dusun</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
