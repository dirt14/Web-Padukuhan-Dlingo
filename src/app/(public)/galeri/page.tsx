'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
  id: string
  url: string
  caption: string | null
  category: string | null
  album: { title: string } | null
}

interface Album {
  id: string
  title: string
  description: string | null
  coverImage: string | null
  _count: { photos: number }
}

export default function GaleriPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [photosRes, albumsRes] = await Promise.all([
          fetch('/api/photos'),
          fetch('/api/albums')
        ])
        const photosData = await photosRes.json()
        const albumsData = await albumsRes.json()
        setPhotos(photosData.photos || [])
        setAlbums(albumsData.albums || [])
      } catch {
        // Use default empty arrays
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const goToPrevious = () => {
    const newIndex = (selectedIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[newIndex])
    setSelectedIndex(newIndex)
  }

  const goToNext = () => {
    const newIndex = (selectedIndex + 1) % photos.length
    setSelectedPhoto(photos[newIndex])
    setSelectedIndex(newIndex)
  }

  // Default placeholder photos
  const placeholderPhotos = [
    { id: '1', url: '', caption: 'Kegiatan Bank Sampah', category: 'BANK_SAMPAH' },
    { id: '2', url: '', caption: 'Pengajian Rutin', category: 'PENGAJIAN' },
    { id: '3', url: '', caption: 'Kegiatan Karang Taruna', category: 'KARANG_TARUNA' },
    { id: '4', url: '', caption: 'Gotong Royong', category: 'KEGIATAN_DUSUN' },
  ]

  const displayPhotos = photos.length > 0 ? photos : []

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Galeri Foto</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen di Dusun Dlingo
          </p>
        </div>

        {/* Albums Section */}
        {albums.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Album</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {albums.map((album) => (
                <div key={album.id} className="card group hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {album.coverImage ? (
                      <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{album._count.photos} foto</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : displayPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo, index)}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group relative"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm truncate">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Foto</h3>
            <p className="text-gray-500">Foto-foto kegiatan akan muncul di sini</p>
          </div>
        )}

        {/* Lightbox */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={closeLightbox}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <div className="max-w-4xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Foto'}
                className="max-w-full max-h-[80vh] object-contain"
              />
              {selectedPhoto.caption && (
                <p className="text-white text-center mt-4">{selectedPhoto.caption}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
