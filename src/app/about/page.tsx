import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  FiShield, 
  FiUsers, 
  FiTarget, 
  FiAward,
  FiCheckCircle
} from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'About Cybria Secure | Cybersecurity Experts in Maharashtra',
  description: 'Learn about Cybria Secure - leading cybersecurity risk advisory firm in Kolhapur. Our team of certified professionals protects businesses across Maharashtra.',
  keywords: 'about cybria secure, cybersecurity company, security experts, Maharashtra cybersecurity',
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Cybria Secure',
    description: 'Cybria Secure is a leading cybersecurity risk advisory firm based in Kolhapur, Maharashtra',
    url: 'https://www.cybriasecure.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Cybria Secure',
      description: 'We are problem-solvers! Cybria Secure, a leading cyber security risk advisory firm that helps organizations reduce risk & enhance competitive advantage.',
      foundingDate: '2020',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008',
        addressLocality: 'Kolhapur',
        addressRegion: 'Maharashtra',
        postalCode: '416110',
        addressCountry: 'IN',
      },
      telephone: '+918080424274',
      email: 'sales@cybriasecure.com',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '50+'
      },
      areaServed: ['Kolhapur', 'Ichalkaranji', 'Miraj', 'Sangli', 'Solapur'],
    },
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
              <span className="text-white">About </span>
              <span className="text-gradient">Cybria Secure</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Leading cybersecurity risk advisory firm helping organizations reduce risk & enhance competitive advantage across India.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <FiShield className="w-12 h-12 text-[#2B7BE4] mr-4" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-2xl text-center text-white mb-6">
                "From Threats to Trust – We Secure It All."
              </p>
              <p className="text-xl text-gray-300 text-center">
                We are problem-solvers! Cybria Secure, a leading cyber security risk advisory firm that helps organizations reduce risk & enhance competitive advantage. With a core team of experienced domain experts and certified professionals, we offer economically viable solutions to all our valued customers.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FiShield,
                  title: 'Security First',
                  description: 'Protecting our clients digital assets is our top priority in every solution we deliver.',
                  gradient: 'from-[#2B7BE4] to-[#3B82F6]'
                },
                {
                  icon: FiUsers,
                  title: 'Client Partnership',
                  description: 'We build long-term relationships based on trust, transparency, and mutual success.',
                  gradient: 'from-[#FF5CA8] to-[#EC4899]'
                },
                {
                  icon: FiTarget,
                  title: 'Excellence',
                  description: 'Striving for excellence in every aspect of our cybersecurity services and solutions.',
                  gradient: 'from-[#7C3AED] to-[#8B5CF6]'
                },
                {
                  icon: FiAward,
                  title: 'Innovation',
                  description: 'Continuously evolving our solutions to counter emerging cyber threats effectively.',
                  gradient: 'from-[#2B7BE4] to-[#FF5CA8]'
                },
              ].map((value) => {
                const Icon = value.icon
                return (
                  <div
                    key={value.title}
                    className="bg-[#1a2236] rounded-xl p-6 border border-gray-800 hover:border-transparent transition-all duration-300"
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${value.gradient} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16 px-1 sm:px-6 ">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Why Choose Cybria Secure?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="space-y-6">
                  {[
                    'Experienced domain experts and certified professionals',
                    'Economically viable solutions for all business sizes',
                    '24/7 incident response and support',
                    'Comprehensive security solutions',
                    'Customized approach for each client',
                    'Proactive threat monitoring',
                    'Regular security audits and updates',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <FiCheckCircle className="w-5 h-5 text-[#2B7BE4] mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-6">Our Expertise</h3>
                  <div className="space-y-4">
                    {[
                      { field: 'Network Security', level: 95 },
                      { field: 'Risk Assessment', level: 90 },
                      { field: 'Incident Response', level: 92 },
                      { field: 'Data Protection', level: 88 },
                      { field: 'Compliance', level: 85 },
                    ].map((skill) => (
                      <div key={skill.field}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">{skill.field}</span>
                          <span className="text-[#2B7BE4] font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#2B7BE4] to-[#7C3AED] h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Our Leadership Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Security Experts',
                  role: 'Certified Professionals',
                  description: 'Team of CISSP, CEH, CISM certified experts with 10+ years experience',
                  gradient: 'from-[#2B7BE4] to-[#3B82F6]'
                },
                {
                  name: 'Domain Specialists',
                  role: 'Industry Experts',
                  description: 'Specialists in banking, healthcare, manufacturing, and education sectors',
                  gradient: 'from-[#FF5CA8] to-[#EC4899]'
                },
                {
                  name: 'Support Team',
                  role: '24/7 Operations',
                  description: 'Dedicated support team for incident response and ongoing monitoring',
                  gradient: 'from-[#7C3AED] to-[#8B5CF6]'
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-[#1a2236] rounded-2xl p-8 text-center border border-gray-800 hover:border-transparent transition-all duration-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-[#2B7BE4] font-medium mb-4">{member.role}</p>
                  <p className="text-gray-400">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Partner with Cybersecurity Experts
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses across Maharashtra who trust Cybria Secure for their cybersecurity needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}