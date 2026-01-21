'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
  id: string
  type: 'announcement' | 'activity' | 'photo' | 'album' | 'notification' | 'member' | 'article'
  onDeleted?: () => void
}

export default function DeleteButton({ id, type, onDeleted }: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/${type}s/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        if (onDeleted) {
          onDeleted()
        } else {
          router.refresh()
        }
      } else {
        alert('Gagal menghapus item')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
