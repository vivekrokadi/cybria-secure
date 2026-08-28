import Link from "next/link";
import { FiPhone, FiMail, FiMapPin, FiLinkedin, FiTwitter, FiYoutube, FiInstagram } from "react-icons/fi";

const services = [
  { name: "Web Application VAPT",    href: "/services/web-application-vapt" },
  { name: "Network Security Audit",  href: "/services/network-security-audit" },
  { name: "Red Team Operations",     href: "/services/red-teaming" },
  { name: "Incident Response",       href: "/services/incident-response" },
  { name: "RBI Compliance",          href: "/services/rbi-compliance" },
  { name: "ISO 27001",               href: "/services/iso-27001" },
  { name: "Security Training",       href: "/services/security-awareness-training" },
  { name: "Virtual CISO",            href: "/services/vciso" },
];

const compliance = [
  { name: "ISO 27001:2022",  href: "/services/iso-27001" },
  { name: "SOC 2",           href: "/compliance/soc2" },
  { name: "PCI-DSS 4.0",    href: "/compliance/pci-dss" },
  { name: "HIPAA",           href: "/compliance/hipaa" },
  { name: "GDPR",            href: "/compliance/gdpr" },
  { name: "DPDPA (India)",   href: "/compliance/dpdpa" },
  { name: "NIST CSF",        href: "/compliance/nist-csf" },
  { name: "RBI Framework",   href: "/services/rbi-compliance" },
];

const resources = [
  { name: "Blog",           href: "/resources" },
  { name: "Case Studies",   href: "/resources" },
  { name: "Documents",      href: "/resources" },
  { name: "About Us",       href: "/about" },
  { name: "Contact Us",     href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

// const locations = [
//   { city: "Kolhapur (HQ)", href: "/services/kolhapur" },
//   { city: "Pune",          href: "/services/pune" },
//   { city: "Mumbai",        href: "/services/mumbai" },
//   { city: "Sangli",        href: "/services/sangli" },
//   { city: "Ichalkaranji",  href: "/services/ichalkaranji" },
//   { city: "Solapur",       href: "/services/solapur" },
// ];

export default function Footer() {
  return (
    <footer className="bg-[#070d1a] border-t border-gray-800/60">

      {/* Top CTA bar */}
      <div className="border-b border-gray-800/60 py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">Ready to Secure Your Organization?</p>
            <p className="text-gray-400 text-sm mt-1">Multiple ways to connect with our security experts.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/918080424274?text=Hi%20Cybria%20Secure%2C%20I%20would%20like%20to%20know%20more%20about%20your%20cybersecurity%20services."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-all">
              WhatsApp
            </a>
            <Link href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-full transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
              Book a Meeting
            </Link>
            <a href="mailto:sales@cybriasecure.com"
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-700 text-gray-300 text-sm font-semibold rounded-full hover:text-white hover:border-gray-500 transition-all">
              <FiMail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/cybriasecure-logo.png" className="w-10 h-10 object-contain" alt="Cybria Secure" />
              <span className="text-white font-bold text-sm">Cybria Secure</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Leading cybersecurity risk advisory firm. Reduce business risk — not just fix vulnerabilities.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://linkedin.com", icon: FiLinkedin },
                { href: "https://twitter.com",  icon: FiTwitter },
                { href: "https://youtube.com",  icon: FiYoutube },
                { href: "https://instagram.com",icon: FiInstagram },
              ].map(({ href, icon: Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-[#2B7BE4]/20 border border-gray-700 hover:border-[#2B7BE4]/40 flex items-center justify-center text-gray-400 hover:text-[#2B7BE4] transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Compliance</h3>
            <ul className="space-y-2.5">
              {compliance.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          {/* <div>
            <h3 className="text-white font-semibold text-sm mb-4">Locations</h3>
            <ul className="space-y-2.5">
              {locations.map((item) => (
                <li key={item.city}>
                  <Link href={item.href} className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#2B7BE4] flex-shrink-0" />
                    {item.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact + Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <div className="space-y-3 mb-6">
              <a href="tel:+918080424274"
                className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors">
                <FiPhone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#2B7BE4]" />
                <span className="text-sm">+91 80804 24274</span>
              </a>
              <a href="tel:+917559135608"
                className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors">
                <FiPhone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#2B7BE4]" />
                <span className="text-sm">+91 75591 35608</span>
              </a>
              <a href="mailto:sales@cybriasecure.com"
                className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors">
                <FiMail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#2B7BE4]" />
                <span className="text-sm">sales@cybriasecure.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-gray-500">
                <FiMapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#2B7BE4]" />
                <span className="text-xs leading-relaxed">
                  110, Mark 1034 Commercial Complex,<br />
                  E Ward, Rajaram Road,<br />
                  Kolhapur, MH — 416008
                </span>
              </div>
            </div>

            
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/60 py-5 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Cybria Secure. All rights reserved. · Kolhapur, Maharashtra, India
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <Link href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}