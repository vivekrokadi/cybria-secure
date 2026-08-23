'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: "Resources", path: "/resources" },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  const shouldShowBackground = !isHomePage || scrolled || isOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowBackground
          ? 'bg-[#0b1220]/95 backdrop-blur-lg border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative z-10">
            <img
              src="/cybriasecure-logo.png"
              className="w-16"
              alt="Cybria Secure Logo"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-[#2B7BE4] ${
                  pathname === item.path
                    ? 'text-[#2B7BE4]'
                    : shouldShowBackground
                    ? 'text-gray-300'
                    : 'text-white/90'
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />
                )}
              </Link>
            ))}

            <Link
              href="/contact"
              className="px-6 py-2 text-white font-medium rounded-full transition-all duration-300 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] hover:shadow-lg hover:shadow-[#2B7BE4]/20"
            >
              Get Started
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg transition-colors relative z-10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FiX className="w-6 h-6 text-white" />
            ) : (
              <FiMenu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu — rendered outside the header flow to avoid stacking issues */}
      {isOpen && (
        <>
          {/* Backdrop — pointer-events only on the backdrop div, not on the menu */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="fixed top-[60px] left-0 right-0 z-50 px-4">
            <div className="bg-[#0b1220] border border-gray-800 rounded-xl shadow-2xl">
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      pathname === item.path
                        ? 'bg-gradient-to-r from-[#2B7BE4]/20 via-[#FF5CA8]/20 to-[#7C3AED]/20 text-[#2B7BE4] border border-[#2B7BE4]/30'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                        pathname === item.path ? 'bg-[#2B7BE4]' : 'bg-gray-600'
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="p-4 border-t border-gray-800">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#2B7BE4]/30 transition-all duration-300"
                >
                  Contact Us
                </Link>
                <p className="text-center text-gray-400 text-sm mt-3">
                  Call us: +91 80804 24274
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}