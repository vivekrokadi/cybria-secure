import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppWidget from '../components/WhatsAppWidget'
import EmergencyBanner from '../components/EmergencyBanner'
import { Toaster } from 'react-hot-toast'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cybriasecure.com'),
  title: 'Cybria Secure | Cybersecurity Risk Advisory | VAPT & Compliance India',
  description: 'Reduce Business Risk. Not Just Fix Vulnerabilities. Leading cybersecurity risk advisory firm serving 640+ organizations across 30+ countries. VAPT, RBI Compliance, ISO 27001, Incident Response.',
  keywords: 'cybersecurity India, VAPT India, RBI compliance, ISO 27001, incident response, cybersecurity Kolhapur, penetration testing India',
  authors: [{ name: 'Cybria Secure' }],
  robots: 'index, follow',
  alternates: { canonical: 'https://www.cybriasecure.com' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cybriasecure.com',
    title: 'Cybria Secure | Cybersecurity Risk Advisory India',
    description: 'Reduce Business Risk. Not Just Fix Vulnerabilities. 640+ organizations secured across 30+ countries.',
    siteName: 'Cybria Secure',
    images: [{ url: '/cybriasecure-logo.png', width: 512, height: 512, alt: 'Cybria Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybria Secure | Cybersecurity Risk Advisory India',
    description: 'Reduce Business Risk. Not Just Fix Vulnerabilities.',
    images: ['/cybriasecure-logo.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cybria Secure',
  description: 'Leading cybersecurity risk advisory firm. VAPT, RBI Compliance, ISO 27001, Incident Response.',
  url: 'https://www.cybriasecure.com',
  logo: 'https://www.cybriasecure.com/cybriasecure-logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex',
    addressLocality: 'Kolhapur',
    addressRegion: 'Maharashtra',
    postalCode: '416008',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '16.6919', longitude: '74.2314' },
  openingHours: 'Mo-Fr 09:30-18:30',
  telephone: '+918080424274',
  email: 'sales@cybriasecure.com',
  areaServed: { '@type': 'Country', name: 'India' },
  priceRange: '₹₹₹',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-screen bg-[#0b1220] text-white font-sans antialiased overflow-x-hidden"
        style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}
        suppressHydrationWarning
      >
        <EmergencyBanner />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', fontFamily: 'var(--font-outfit), system-ui, sans-serif' },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}