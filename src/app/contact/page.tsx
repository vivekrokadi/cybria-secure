import type { Metadata } from 'next'
import ContactForm from '../../components/ContactForm'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Contact Cybria Secure | Cybersecurity Services in Kolhapur',
  description: 'Get in touch with Cybria Secure for cybersecurity solutions in Kolhapur, Ichalkaranji, Miraj, Sangli, Solapur. Call +91 80804 24274',
  keywords: 'contact cybersecurity, Kolhapur security services, cybersecurity consultation, incident response contact',
}

const contactInfo = [
  {
    icon: FiMapPin,
    title: 'Our Office',
    details: '110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008',
  },
  {
    icon: FiPhone,
    title: 'Phone Numbers',
    details: '+91 80804 24274\n+91 75591 35608',
  },
  {
    icon: FiMail,
    title: 'Email Address',
    details: 'sales@cybriasecure.com',
    link: 'mailto:sales@cybriasecure.com',
  },
  {
    icon: FiClock,
    title: 'Working Hours',
    details: 'Monday - Friday: 9:30 AM - 6:30 PM',
  },
]

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Cybria Secure',
    description: 'Contact page for Cybria Secure cybersecurity services',
    url: 'https://www.cybriasecure.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Cybria Secure',
      telephone: '+918080424274',
      email: 'sales@cybriasecure.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008',
        addressLocality: 'Kolhapur',
        addressRegion: 'Maharashtra',
        postalCode: '416110',
        addressCountry: 'IN',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Get in </span>
              <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to secure your digital assets? Contact our cybersecurity experts in Kolhapur for a free consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 rounded-lg">
                          <item.icon className="w-6 h-6 text-[#2B7BE4]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-gray-400 hover:text-[#2B7BE4] transition-colors whitespace-pre-line"
                          >
                            {item.details}
                          </a>
                        ) : (
                          <p className="text-gray-400 whitespace-pre-line">{item.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com/company/cybriasecure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-[#2B7BE4] hover:via-[#FF5CA8] hover:to-[#7C3AED] transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/cybriasecure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-[#2B7BE4] hover:via-[#FF5CA8] hover:to-[#7C3AED] transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and our cybersecurity experts will get back to you within 24 hours.
                </p>
                
                <ContactForm />
              </div>

              {/* Local SEO Content */}
              <div className="mt-12 bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8 border border-[#2B7BE4]/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Cybria Secure - Your Local Cybersecurity Partner
                </h3>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300">
                    As the leading cybersecurity service provider in <strong>Kolhapur</strong>, we serve businesses across 
                    <strong> Ichalkaranji, Miraj, Sangli, and Solapur</strong>. Our local presence allows us to provide 
                    immediate on-site support and personalized security solutions tailored to the unique needs of 
                    businesses in Maharashtra.
                  </p>
                  <p className="text-gray-300 mt-4">
                    Whether you need <strong>incident response</strong> for a security breach, <strong>risk assessment</strong> 
                    for regulatory compliance, or <strong>cybersecurity training</strong> for your employees, our team of 
                    certified professionals is ready to help secure your digital infrastructure.
                  </p>
                  <p className="text-gray-300 mt-4">
                    Contact us today for a <strong>free security audit</strong> and discover how we can protect your 
                    business from evolving cyber threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}