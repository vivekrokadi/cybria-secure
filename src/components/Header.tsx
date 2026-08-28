'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiChevronDown, FiPhone } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

// ─── Mega-nav data ────────────────────────────────────────────────────────────
const assuranceGroups = [
  {
    label: "Security Testing (VAPT)",
    items: [
      { name: "Web Application VAPT",      href: "/services/web-application-vapt" },
      { name: "Mobile App Security",        href: "/services/mobile-app-security" },
      { name: "API Security Testing",       href: "/services/api-security-testing" },
      { name: "Cloud Security Assessment",  href: "/services/cloud-security-assessment" },
      { name: "Network Security Audit",     href: "/services/network-security-audit" },
      { name: "OT / SCADA Security",        href: "/services/ot-scada-security" },
    ],
  },
  {
    label: "Advanced Assessment",
    items: [
      { name: "Red Team Operations",        href: "/services/red-teaming" },
      { name: "Incident Response",          href: "/services/incident-response" },
      { name: "AI / LLM Security Audit",    href: "/services/web-application-vapt", isNew: true },
      { name: "Digital Forensics",          href: "/services/incident-response" },
      { name: "Secure Code Review",         href: "/services/web-application-vapt" },
      { name: "DevSecOps",                  href: "/services/web-application-vapt", isNew: true },
    ],
  },
]

const governanceGroups = [
  {
    label: "Compliance Frameworks",
    items: [
      { name: "RBI Cybersecurity Compliance", href: "/services/rbi-compliance" },
      { name: "ISO 27001:2022",               href: "/services/iso-27001" },
      { name: "SOC 2",                         href: "/compliance/soc2" },
      { name: "PCI-DSS 4.0",                  href: "/compliance/pci-dss" },
      { name: "HIPAA",                         href: "/compliance/hipaa" },
      { name: "GDPR / DPDPA",                  href: "/compliance/dpdpa" },
    ],
  },
  {
    label: "GRC Services",
    items: [
      { name: "Governance, Risk & Compliance", href: "/services/governance-risk-assessment" },
      { name: "Virtual CISO (vCISO)",          href: "/services/vciso" },
      { name: "Cyber Risk Assessment",         href: "/services/governance-risk-assessment" },
      { name: "Third-Party Risk (TPRM)",       href: "/services/governance-risk-assessment" },
      { name: "NIST CSF",                      href: "/compliance/nist-csf" },
      { name: "IEC 62443 (OT)",               href: "/compliance/iec62443" },
    ],
  },
]

const resourcesGroups = [
  {
    label: "Learn",
    items: [
      { name: "Blog",          href: "/resources" },
      { name: "Case Studies",  href: "/resources?tab=case-studies" },
      { name: "Documents & PDFs", href: "/resources?tab=documents" },
    ],
  },
  {
    label: "Company",
    items: [
      { name: "About Us",    href: "/about" },
      { name: "Industries",  href: "/industries" },
      { name: "Contact Us",  href: "/contact" },
    ],
  },
]

// ─── Types ────────────────────────────────────────────────────────────────────
type DropdownKey = "assurance" | "governance" | "resources" | null

// ─── Dropdown panel ───────────────────────────────────────────────────────────
function MegaPanel({
  groups,
  footer,
}: {
  groups: { label: string; items: { name: string; href: string; isNew?: boolean }[] }[]
  footer?: { label: string; href: string }
}) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#0b1220] border border-gray-800 rounded-2xl shadow-2xl shadow-black/60 p-6 z-50 min-w-[560px]">
      <div className={`grid gap-6 ${groups.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.name + item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-3 py-2 transition-all"
                  >
                    {item.name}
                    {item.isNew && (
                      <span className="text-[9px] font-bold uppercase bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-1.5 py-0.5">
                        NEW
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {footer && (
        <div className="mt-5 pt-4 border-t border-gray-800">
          <Link href={footer.href} className="text-sm text-[#2B7BE4] hover:text-[#FF5CA8] transition-colors font-medium">
            {footer.label} →
          </Link>
        </div>
      )}
    </div>
  )
}

// ─── Main Header ─────────────────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = useCallback((key: DropdownKey) => {
    setActiveDropdown((prev) => (prev === key ? null : key))
  }, [])

  const showBg = scrolled || mobileOpen || pathname !== '/'

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showBg ? 'bg-[#0b1220]/95 backdrop-blur-lg border-b border-gray-800/80' : 'bg-transparent'
      }`}
    >
      {/* Thin top accent */}
      <div className="h-[2px] bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/cybriasecure-logo.png" className="w-12 h-12 object-contain" alt="Cybria Secure" />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">Cybria Secure</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">Cybersecurity Advisory</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">

            {/* Assurance dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('assurance')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeDropdown === 'assurance' || pathname.startsWith('/services')
                    ? 'text-[#2B7BE4] bg-[#2B7BE4]/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Assurance
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'assurance' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'assurance' && (
                <MegaPanel groups={assuranceGroups} footer={{ label: "View all assurance services", href: "/services" }} />
              )}
            </div>

            {/* Governance dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('governance')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeDropdown === 'governance' || pathname.startsWith('/compliance')
                    ? 'text-[#2B7BE4] bg-[#2B7BE4]/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Governance
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'governance' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'governance' && (
                <MegaPanel groups={governanceGroups} footer={{ label: "View all compliance services", href: "/compliance" }} />
              )}
            </div>

            {/* Industries */}
            <Link
              href="/industries"
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/industries')
                  ? 'text-[#2B7BE4] bg-[#2B7BE4]/5'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Industries
            </Link>

            {/* Resources dropdown */}
            <div className="relative">
              <button
                onClick={() => toggle('resources')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeDropdown === 'resources' || pathname.startsWith('/resources') || pathname === '/about'
                    ? 'text-[#2B7BE4] bg-[#2B7BE4]/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Resources
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'resources' && (
                <MegaPanel groups={resourcesGroups} />
              )}
            </div>

          </nav>

          {/* Desktop right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+918080424274"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
              <FiPhone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">+91 80804 24274</span>
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}
            >
              Get Assessment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden p-2 text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 top-[66px] bg-black/60 backdrop-blur-sm z-40" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-[66px] left-0 right-0 z-50 bg-[#0b1220] border-t border-gray-800 max-h-[80vh] overflow-y-auto">
            <div className="p-4 space-y-1">

              {/* Assurance accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded((p) => (p === 'assurance' ? null : 'assurance'))}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  <span className="font-medium">Assurance</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'assurance' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'assurance' && (
                  <div className="pl-4 mt-1 space-y-3 pb-2">
                    {assuranceGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[10px] uppercase tracking-widest text-gray-600 px-4 py-1 font-bold">{group.label}</p>
                        {group.items.map((item) => (
                          <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                            {item.name}
                            {item.isNew && <span className="text-[9px] font-bold uppercase bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-1.5 py-0.5">NEW</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link href="/services" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-[#2B7BE4] font-medium">
                      View all services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Governance accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded((p) => (p === 'governance' ? null : 'governance'))}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  <span className="font-medium">Governance</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'governance' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'governance' && (
                  <div className="pl-4 mt-1 space-y-3 pb-2">
                    {governanceGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[10px] uppercase tracking-widest text-gray-600 px-4 py-1 font-bold">{group.label}</p>
                        {group.items.map((item) => (
                          <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link href="/compliance" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-[#2B7BE4] font-medium">
                      View all compliance →
                    </Link>
                  </div>
                )}
              </div>

              {/* Simple links */}
              {[
                { name: 'Industries', href: '/industries' },
                { name: 'Resources', href: '/resources' },
                { name: 'About Us',  href: '/about' },
                { name: 'Contact',   href: '/contact' },
              ].map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    pathname === item.href ? 'text-[#2B7BE4] bg-[#2B7BE4]/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-gray-800 space-y-3">
              <Link href="/contact" onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 text-white font-semibold rounded-xl transition-all"
                style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                Book a Security Assessment
              </Link>
              <a href="tel:+918080424274"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <FiPhone className="w-4 h-4" /> +91 80804 24274 (24/7 Emergency)
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  )
}