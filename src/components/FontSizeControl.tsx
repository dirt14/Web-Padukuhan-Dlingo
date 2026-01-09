'use client'

import { useState, useEffect } from 'react'
import { Type } from 'lucide-react'

export default function FontSizeControl() {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved font size from localStorage
    const saved = localStorage.getItem('fontSize') as 'normal' | 'large' | 'larger' | null
    if (saved) {
      setFontSize(saved)
      applyFontSize(saved)
    }
  }, [])

  const applyFontSize = (size: 'normal' | 'large' | 'larger') => {
    const root = document.documentElement
    switch (size) {
      case 'normal':
        root.style.fontSize = '16px'
        break
      case 'large':
        root.style.fontSize = '18px'
        break
      case 'larger':
        root.style.fontSize = '20px'
        break
    }
  }

  const handleFontSizeChange = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size)
    applyFontSize(size)
    localStorage.setItem('fontSize', size)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[180px]">
            <p className="text-xs font-semibold text-gray-700 mb-2 px-2">Ukuran Teks</p>
            <button
              onClick={() => handleFontSizeChange('normal')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                fontSize === 'normal'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Normal (16px)
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`w-full text-left px-3 py-2 rounded-md text-base transition-colors ${
                fontSize === 'large'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Besar (18px)
            </button>
            <button
              onClick={() => handleFontSizeChange('larger')}
              className={`w-full text-left px-3 py-2 rounded-md text-lg transition-colors ${
                fontSize === 'larger'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Lebih Besar (20px)
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Ubah ukuran teks"
        >
          <Type className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
