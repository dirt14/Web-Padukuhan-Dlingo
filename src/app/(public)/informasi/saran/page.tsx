import { Metadata } from 'next'
import { MessageSquare, Send } from 'lucide-react'
import SuggestionForm from '@/components/SuggestionForm'

export const metadata: Metadata = {
  title: 'Kotak Saran',
  description: 'Sampaikan saran dan masukan Anda untuk Dusun Dlingo'
}

export default function SaranPage() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Kotak Saran</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Kami menghargai setiap saran dan masukan dari warga untuk kemajuan Dusun Dlingo
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Suara Anda Penting</h3>
                <p className="text-sm text-gray-600">
                  Setiap saran akan ditinjau dan dipertimbangkan untuk perbaikan pelayanan dusun
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Send className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Respon Cepat</h3>
                <p className="text-sm text-gray-600">
                  Tim kami akan merespon saran Anda sesegera mungkin melalui email atau telepon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sampaikan Saran Anda</h2>
          <SuggestionForm />
        </div>

        {/* Guidelines */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">Panduan Pengisian:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Sampaikan saran dengan bahasa yang sopan dan konstruktif</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Berikan detail yang jelas agar mudah dipahami</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Sertakan kontak yang aktif agar kami dapat merespon</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Saran akan ditinjau dalam 3-5 hari kerja</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
