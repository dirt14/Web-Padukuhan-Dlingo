'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number // delay in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number // duration in ms
  distance?: string // e.g., '20px', '50px'
  once?: boolean // only animate once
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 600,
  distance = '30px',
  once = true
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && currentRef) {
            observer.unobserve(currentRef)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once])

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance})`
      case 'down':
        return `translateY(-${distance})`
      case 'left':
        return `translateX(${distance})`
      case 'right':
        return `translateX(-${distance})`
      case 'none':
        return 'none'
      default:
        return `translateY(${distance})`
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Stagger container for multiple children with sequential animation
interface StaggerContainerProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number // delay between each child in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  distance?: string
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 100,
  direction = 'up',
  duration = 600,
  distance = '30px'
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={index * staggerDelay}
          direction={direction}
          duration={duration}
          distance={distance}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}
