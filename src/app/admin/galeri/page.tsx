import Link from 'next/link'
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import prisma from '@/lib/db'
import { formatDate } from '@/lib/utils'
import DeleteButton from '@/components/admin/DeleteButton'

async function getPhotos() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: 'desc' },
      include: { album: { select: { title: true } } }
    })
    return photos
  } catch {
    return []
  }
}

export default async function AdminGalleryPage() {
  const photos = await getPhotos()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
          <p className="text-gray-600 mt-1">Kelola foto-foto kegiatan dusun</p>
        </div>
        <Link href="/admin/galeri/upload" className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Upload Foto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img src={photo.url} alt={photo.caption || 'Foto'} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <DeleteButton id={photo.id} type="photo" />
                </div>
                {photo.caption && (
                  <p className="text-xs text-gray-600 mt-1 truncate">{photo.caption}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada foto</h3>
            <p className="text-gray-500 mb-4">Upload foto pertama untuk galeri</p>
            <Link href="/admin/galeri/upload" className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Upload Foto
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
