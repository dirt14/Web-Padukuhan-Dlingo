'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedWave() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inject keyframes if not already present
    const styleId = 'wave-animation-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 overflow-hidden"
      style={{ height: '180px' }}
    >
      {/* Wave Layer 1 - Back (slowest) */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '100%',
          animation: 'waveMove 25s linear infinite'
        }}
        viewBox="0 0 2880 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C240 90 480 100 720 90C960 80 1200 50 1440 60C1680 70 1920 100 2160 100C2400 100 2640 70 2880 60V120H0V60Z"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>

      {/* Wave Layer 2 - Middle */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '85%',
          animation: 'waveMove 18s linear infinite'
        }}
        viewBox="0 0 2880 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80C360 50 720 30 1080 50C1440 70 1800 110 2160 100C2520 90 2700 60 2880 80V120H0V80Z"
          fill="white"
          fillOpacity="0.5"
        />
      </svg>

      {/* Wave Layer 3 - Front (fastest) */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '70%',
          animation: 'waveMove 12s linear infinite'
        }}
        viewBox="0 0 2880 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 90C480 60 960 40 1440 60C1920 80 2400 110 2880 90V120H0V90Z"
          fill="white"
        />
      </svg>
    </div>
  )
}
