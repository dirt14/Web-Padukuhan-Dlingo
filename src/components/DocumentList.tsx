'use client'

import { Download, FileText, Eye } from 'lucide-react'

interface Document {
  id: string
  title: string
  description: string | null
  fileName: string
  fileUrl: string
  fileSize: number | null
  downloads: number
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function DocumentList({ documents }: { documents: Document[] }) {
  const handleDownload = async (doc: Document) => {
    // Implement download logic here
    // For now, just log
    console.log('Downloading:', doc.fileName)

    // In production, you would:
    // 1. Increment download count via API
    // 2. Trigger file download
  }

  return (
    <div className="grid gap-4">
      {documents.map((doc) => (
        <div key={doc.id} className="card p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                {doc.description && (
                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {doc.fileName}
                  </span>
                  <span>{formatFileSize(doc.fileSize)}</span>
                  <span className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    {doc.downloads} unduhan
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {doc.fileUrl !== '#' && (
                <>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Lihat"
                  >
                    <Eye className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="p-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                    title="Unduh"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </>
              )}
              {doc.fileUrl === '#' && (
                <span className="text-xs text-gray-400 px-3 py-1 bg-gray-100 rounded-lg">
                  Segera tersedia
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
