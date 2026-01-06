export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    BANTUAN_SOSIAL: 'Bantuan Sosial',
    KESEHATAN: 'Kesehatan',
    KEGIATAN_DUSUN: 'Kegiatan Dusun',
    UMUM: 'Umum',
    BANK_SAMPAH: 'Bank Sampah',
    PENGAJIAN: 'Pengajian',
    KARANG_TARUNA: 'Karang Taruna',
    LAINNYA: 'Lainnya'
  }
  return labels[category] || category
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    NORMAL: 'Normal',
    IMPORTANT: 'Penting'
  }
  return labels[priority] || priority
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
