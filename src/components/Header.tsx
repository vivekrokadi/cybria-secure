'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiShield } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0b1220]/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <img src="/logorm.png" className="w-20" alt="Cybria Secure Logo" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-[#2B7BE4] ${
                  pathname === item.path 
                    ? 'text-[#2B7BE4]' 
                    : 'text-gray-300'
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]"></span>
                )}
              </Link>
            ))}

            <Link
              href="/contact"
              className="px-6 py-2 bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#2B7BE4]/20 transition-all duration-300"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Fixed with proper background */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 pt-4">
            {/* Backdrop overlay - covers the entire screen behind menu */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile menu content */}
            <div className="relative z-50 bg-[#0b1220] border border-gray-800 rounded-xl shadow-2xl">
              <div className="p-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                      pathname === item.path
                        ? 'bg-linear-to-r from-[#2B7BE4]/20 via-[#FF5CA8]/20 to-[#7C3AED]/20 text-[#2B7BE4] border border-[#2B7BE4]/30'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        pathname === item.path 
                          ? 'bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]' 
                          : 'bg-gray-600'
                      }`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-gray-800">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#2B7BE4]/30 transition-all duration-300"
                >
                  Contact Us
                </Link>
                <p className="text-center text-gray-400 text-sm mt-3">
                  Call us: +91 80804 24274
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}