'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (elementRef.current) {
        elementRef.current.style.opacity = '1'
        elementRef.current.style.transform = 'translateY(0)'
      }
      return
    }

    const loadScrollTrigger = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        if (!elementRef.current || animatedRef.current) return

        gsap.fromTo(
          elementRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: elementRef.current,
              start: 'top 85%',
              // FIXED: 'none none none none' — do NOT reverse on scroll up.
              // 'play none none none' plays once and stays visible forever.
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )

        animatedRef.current = true
      } catch (error) {
        console.error('ScrollReveal GSAP error:', error)
        if (elementRef.current) {
          elementRef.current.style.opacity = '1'
          elementRef.current.style.transform = 'translateY(0)'
        }
      }
    }

    loadScrollTrigger()
  }, [delay])

  return (
    <div ref={elementRef} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
