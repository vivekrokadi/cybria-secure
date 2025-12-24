'use client'

import { useEffect, useRef, useState } from 'react'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'Ashok Patil',
    role: 'CEO, Manufacturing Company',
    content: 'Cybria Secure transformed our cybersecurity posture. Their team in Kolhapur provided excellent on-site support and helped us achieve compliance with industry standards.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Harshad More',
    role: 'IT Manager, Banking Sector',
    content: 'The banking security solutions provided by Cybria Secure are exceptional. Their understanding of financial sector requirements in Maharashtra is impressive.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Asmita Khamkar',
    role: 'Director, Healthcare Facility',
    content: 'Our patient data security was a major concern. Cybria Secure implemented robust protection measures and provided excellent training to our staff in Miraj.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)


  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <section className="py-20 bg-[#0b1220] overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">What Our </span>
            <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Trusted by organizations ranging from fast-growing local enterprises to established businesses across multiple regions and sectors.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800 hover:border-transparent transition-all duration-300">
                    {/* Rating */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-lg text-gray-300 mb-8 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                        <p className="text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = setInterval(() => {
                      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
                    }, 5000)
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] w-8'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Quotes */}
          <div className="absolute -top-6 -left-6 text-[#2B7BE4] opacity-20">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <div className="absolute -bottom-6 -right-6 text-[#7C3AED] opacity-20 rotate-180">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}