'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

const serviceGroups = [
  {
    label: "Security Testing",
    items: [
      { name: "Web Application VAPT", href: "/services/web-application-vapt" },
      { name: "Network Security Audit", href: "/services/network-security-audit" },
      { name: "Mobile App Security", href: "/services/mobile-app-security" },
      { name: "Cloud Security Assessment", href: "/services/cloud-security-assessment" },
      { name: "API Security Testing", href: "/services/api-security-testing" },
      { name: "OT / SCADA Security", href: "/services/ot-scada-security" },
    ],
  },
  {
    label: "Advanced",
    items: [
      { name: "Red Team Operations", href: "/services/red-teaming" },
      { name: "Incident Response", href: "/services/incident-response" },
    ],
  },
  {
    label: "Compliance & GRC",
    items: [
      { name: "RBI Cybersecurity Compliance", href: "/services/rbi-compliance" },
      { name: "ISO 27001 Implementation", href: "/services/iso-27001" },
      { name: "Governance, Risk & Compliance", href: "/services/governance-risk-assessment" },
      { name: "Virtual CISO (vCISO)", href: "/services/vciso" },
    ],
  },
  {
    label: "Training",
    items: [
      { name: "Security Awareness Training", href: "/services/security-awareness-training" },
    ],
  },
]

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const closeMenu = useCallback(() => setIsOpen(false), [])
  const shouldShowBg = !isHomePage || scrolled || isOpen
  const isServicesActive = pathname.startsWith('/services')

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shouldShowBg ? 'bg-[#0b1220]/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative z-10">
            <img src="/cybriasecure-logo.png" className="w-14" alt="Cybria Secure Logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-[#2B7BE4] relative ${pathname === '/' ? 'text-[#2B7BE4]' : shouldShowBg ? 'text-gray-300' : 'text-white/90'}`}>
              Home
              {pathname === '/' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />}
            </Link>

            <Link href="/about" className={`text-sm font-medium transition-colors hover:text-[#2B7BE4] relative ${pathname === '/about' ? 'text-[#2B7BE4]' : shouldShowBg ? 'text-gray-300' : 'text-white/90'}`}>
              About
              {pathname === '/about' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />}
            </Link>

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen((p) => !p)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#2B7BE4] relative ${isServicesActive ? 'text-[#2B7BE4]' : shouldShowBg ? 'text-gray-300' : 'text-white/90'}`}
              >
                Services
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                {isServicesActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />}
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] bg-[#0b1220] border border-gray-800 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6 z-50">
                  {serviceGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{group.label}</p>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={() => setServicesOpen(false)}
                              className="block text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-3 py-2 transition-all">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-2 pt-4 border-t border-gray-800 flex justify-between items-center">
                    <span className="text-gray-500 text-xs">12 services across 5 categories</span>
                    <Link href="/services" onClick={() => setServicesOpen(false)}
                      className="text-sm text-[#2B7BE4] font-medium hover:text-[#FF5CA8] transition-colors flex items-center gap-1">
                      View all services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/resources" className={`text-sm font-medium transition-colors hover:text-[#2B7BE4] relative ${pathname === '/resources' ? 'text-[#2B7BE4]' : shouldShowBg ? 'text-gray-300' : 'text-white/90'}`}>
              Resources
              {pathname === '/resources' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />}
            </Link>

            <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-[#2B7BE4] relative ${pathname === '/contact' ? 'text-[#2B7BE4]' : shouldShowBg ? 'text-gray-300' : 'text-white/90'}`}>
              Contact
              {pathname === '/contact' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />}
            </Link>

            <Link href="/contact" className="px-5 py-2.5 text-white text-sm font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg" style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
              Get Started
            </Link>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setIsOpen((p) => !p)} className="lg:hidden p-2 rounded-lg relative z-10" aria-label="Toggle menu" aria-expanded={isOpen}>
            {isOpen ? <FiX className="w-6 h-6 text-white" /> : <FiMenu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={closeMenu} aria-hidden="true" />
          <div className="fixed top-[64px] left-0 right-0 z-50 px-4 max-h-[80vh] overflow-y-auto">
            <div className="bg-[#0b1220] border border-gray-800 rounded-2xl shadow-2xl">
              <div className="p-4 space-y-1">
                {[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }].map((item) => (
                  <Link key={item.path} href={item.path} onClick={closeMenu}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${pathname === item.path ? 'bg-[#2B7BE4]/10 text-[#2B7BE4] border border-[#2B7BE4]/20' : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'}`}>
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Services accordion */}
                <div>
                  <button onClick={() => setMobileServicesOpen((p) => !p)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isServicesActive ? 'bg-[#2B7BE4]/10 text-[#2B7BE4] border border-[#2B7BE4]/20' : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'}`}>
                    <span>Services</span>
                    <FiChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-1 ml-4 space-y-3 pb-2">
                      {serviceGroups.map((group) => (
                        <div key={group.label}>
                          <p className="text-xs uppercase tracking-widest text-gray-600 px-4 py-1">{group.label}</p>
                          {group.items.map((item) => (
                            <Link key={item.href} href={item.href} onClick={closeMenu}
                              className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <Link href="/services" onClick={closeMenu} className="block px-4 py-2.5 text-sm text-[#2B7BE4] font-medium">
                        View all services →
                      </Link>
                    </div>
                  )}
                </div>

                {[{ name: 'Resources', path: '/resources' }, { name: 'Contact', path: '/contact' }].map((item) => (
                  <Link key={item.path} href={item.path} onClick={closeMenu}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${pathname === item.path ? 'bg-[#2B7BE4]/10 text-[#2B7BE4] border border-[#2B7BE4]/20' : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'}`}>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="p-4 border-t border-gray-800">
                <Link href="/contact" onClick={closeMenu} className="block w-full text-center px-6 py-3 text-white font-semibold rounded-xl transition-all" style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Get Free Consultation
                </Link>
                <p className="text-center text-gray-500 text-xs mt-3">+91 80804 24274</p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}