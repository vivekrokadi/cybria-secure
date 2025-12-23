import type { Metadata } from 'next'
import Link from 'next/link'
import { FiMapPin, FiPhone, FiMail, FiShield, FiCheckCircle } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Cybersecurity Services in Kolhapur | Cybria Secure - Local Experts',
  description: 'Professional cybersecurity services in Kolhapur. Protect your business from cyber threats with local experts. Network security, risk assessment, incident response.',
  keywords: 'cybersecurity Kolhapur, security services Kolhapur, cyber protection Kolhapur, IT security Kolhapur, data protection Kolhapur',
}

export default function KolhapurPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cybria Secure - Kolhapur',
    description: 'Cybersecurity services provider in Kolhapur, Maharashtra',
    url: 'https://www.cybriasecure.com/kolhapur',
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '16.6919',
      longitude: '74.2314',
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '₹₹₹',
    areaServed: {
      '@type': 'City',
      name: 'Kolhapur',
    },
    sameAs: [
      'https://linkedin.com/company/cybriasecure',
      'https://instagram.com/cybriasecure'
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-20 bg-[#0b1220]">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Cybersecurity Services in </span>
              <span className="text-gradient">Kolhapur</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Local cybersecurity experts protecting businesses in Kolhapur from evolving cyber threats. 
              On-site support, rapid response, and customized solutions for Kolhapur industries.
            </p>
          </div>

          {/* Local Office Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Our Kolhapur Office</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <FiMapPin className="w-6 h-6 text-[#2B7BE4] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Address</h3>
                      <p className="text-gray-400">
                        110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FiPhone className="w-6 h-6 text-[#2B7BE4] flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Contact Numbers</h3>
                      <div className="text-gray-400 space-y-1">
                        <a href="tel:+918080424274" className="block hover:text-white transition-colors">
                          +91 80804 24274
                        </a>
                        <a href="tel:+917559135608" className="block hover:text-white transition-colors">
                          +91 75591 35608
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FiMail className="w-6 h-6 text-[#2B7BE4] flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <a
                        href="mailto:sales@cybriasecure.com"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        sales@cybriasecure.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-[#2B7BE4]/10 to-[#7C3AED]/10 rounded-2xl p-8 border border-[#2B7BE4]/20">
                <h2 className="text-2xl font-bold text-white mb-6">Quick Contact</h2>
                <Link
                  href="/contact"
                  className="block w-full px-6 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-lg text-center hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300 mb-4"
                >
                  Send Message
                </Link>
                <a
                  href="tel:+918080424274"
                  className="block w-full px-6 py-4 border-2 border-gray-700 text-white font-semibold rounded-lg text-center hover:bg-white/5 transition-all duration-300"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Local SEO Content */}
          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              Cybersecurity Solutions for Kolhapur Businesses
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Why Kolhapur Needs Cybersecurity</h3>
                <p className="text-gray-300 mb-4">
                  As Kolhapur continues to grow as an industrial and educational hub, businesses face increasing cyber threats. 
                  Manufacturing units, educational institutions, healthcare facilities, and retail businesses in Kolhapur are 
                  prime targets for cybercriminals due to valuable data and intellectual property.
                </p>
                <p className="text-gray-300">
                  Local businesses in Kolhapur require cybersecurity solutions that understand the regional business landscape, 
                  compliance requirements, and specific threats targeting Maharashtra-based organizations.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Local Advantage</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FiCheckCircle className="w-5 h-5 text-[#2B7BE4] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">On-site support within hours in Kolhapur</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-5 h-5 text-[#FF5CA8] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Understanding of local business regulations</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-5 h-5 text-[#7C3AED] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Custom solutions for Kolhapur industries</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-5 h-5 text-[#2B7BE4] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">24/7 local incident response team</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">Services for Kolhapur Industries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Manufacturing',
                  desc: 'Protect intellectual property and production systems',
                  icon: '🏭'
                },
                {
                  title: 'Education',
                  desc: 'Secure student data and research information',
                  icon: '🎓'
                },
                {
                  title: 'Healthcare',
                  desc: 'Protect patient records and medical data',
                  icon: '🏥'
                },
                {
                  title: 'Retail & E-commerce',
                  desc: 'Secure online transactions and customer data',
                  icon: '🛍️'
                },
                {
                  title: 'SMEs & Startups',
                  desc: 'Affordable security for growing businesses',
                  icon: '🚀'
                },
                {
                  title: 'Government & NGOs',
                  desc: 'Compliance and data protection solutions',
                  icon: '🏛️'
                },
              ].map((industry) => (
                <div
                  key={industry.title}
                  className="bg-[#1a2236] rounded-xl p-6 border border-gray-800 hover:border-[#2B7BE4] transition-colors"
                >
                  <div className="text-3xl mb-4">{industry.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{industry.title}</h4>
                  <p className="text-gray-400">{industry.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">Local Success Stories</h3>
            <div className="bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">Manufacturing Company</h4>
                  <p className="text-gray-300">
                    A leading manufacturing company in Kolhapur faced repeated ransomware attacks targeting their 
                    production systems. We implemented comprehensive network security, employee training, and 
                    24/7 monitoring. Result: <strong>Zero successful attacks</strong> in 12 months with improved 
                    production efficiency.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">Educational Institute</h4>
                  <p className="text-gray-300">
                    A university in Kolhapur needed to secure student data and research information. 
                    We deployed data encryption, access controls, and security awareness programs. 
                    Result: <strong>100% compliance</strong> with data protection regulations and 
                    <strong> 80% reduction</strong> in phishing attempts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Offered in Kolhapur */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Cybersecurity Services Available in Kolhapur
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Network Security',
                  desc: 'Protect your business network from external threats',
                  features: ['Firewall Management', 'Intrusion Detection', 'VPN Solutions']
                },
                {
                  title: 'Data Protection',
                  desc: 'Secure sensitive business and customer data',
                  features: ['Encryption', 'Backup Solutions', 'Access Controls']
                },
                {
                  title: 'Incident Response',
                  desc: '24/7 support for security incidents',
                  features: ['Rapid Response', 'Forensic Analysis', 'Recovery Services']
                },
                {
                  title: 'Risk Assessment',
                  desc: 'Identify and mitigate security risks',
                  features: ['Security Audits', 'Vulnerability Scanning', 'Compliance Checks']
                },
                {
                  title: 'Employee Training',
                  desc: 'Security awareness for your team',
                  features: ['Phishing Simulations', 'Workshops', 'Policy Training']
                },
                {
                  title: 'Cloud Security',
                  desc: 'Secure your cloud infrastructure',
                  features: ['Cloud Configuration', 'Data Security', 'Access Management']
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="bg-[#1a2236] rounded-xl p-6 border border-gray-800 hover:border-transparent transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <FiShield className="w-6 h-6 text-[#2B7BE4] mr-3" />
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#2B7BE4] rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Secure Your Kolhapur Business Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our local cybersecurity experts for a free security assessment of your Kolhapur business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
              >
                Free Security Assessment
              </Link>
              <a
                href="tel:+918080424274"
                className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                Call Kolhapur Office
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}