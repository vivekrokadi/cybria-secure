import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Cybria Secure - Leading Cybersecurity Services in Kolhapur',
  description: 'Defending your digital existence. Professional cybersecurity services in Kolhapur, Ichalkaranji, Miraj, Sangli, Solapur.',
  keywords: 'cybersecurity, security services, Kolhapur, Ichalkaranji, Miraj, Sangli, Solapur, incident response, risk assessment',
  authors: [{ name: 'Cybria Secure' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cybriasecure.com',
    title: 'Cybria Secure - Leading Cybersecurity Services',
    description: 'Defending your digital existence in Maharashtra',
    siteName: 'Cybria Secure',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cybria Secure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybria Secure - Leading Cybersecurity Services',
    description: 'Defending your digital existence',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cybria Secure',
  description: 'Leading cybersecurity services company in Kolhapur, Maharashtra',
  url: 'https://www.cybriasecure.com',
  logo: 'https://www.cybriasecure.com/logo.svg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008',
    addressLocality: 'Kolhapur',
    addressRegion: 'Maharashtra',
    postalCode: '416110',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '16.6919',
    longitude: '74.2314',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  telephone: '+918080424274',
  email: 'sales@cybriasecure.com',
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '16.6919',
      longitude: '74.2314',
    },
    geoRadius: '100000',
  },
  areaServed: [
    'Kolhapur',
    'Ichalkaranji', 
    'Miraj',
    'Sangli',
    'Solapur'
  ],
  priceRange: '₹₹₹',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
      </head>
      <body 
        className="min-h-screen bg-[#0b1220] text-white font-sans antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}