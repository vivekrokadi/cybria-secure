'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run GSAP if user hasn't opted for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (elementRef.current) {
        elementRef.current.style.opacity = '1'
        elementRef.current.style.transform = 'translateY(0)'
      }
      return
    }

    const loadScrollTrigger = async () => {
      const gsapModule = await import('gsap')
      const { gsap } = gsapModule
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (elementRef.current) {
        gsap.fromTo(elementRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
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