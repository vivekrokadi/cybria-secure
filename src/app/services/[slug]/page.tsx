import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  FiShield, 
  FiBarChart2, 
  FiBookOpen, 
  FiCreditCard, 
  FiAlertTriangle,
  FiCheckCircle,
  FiArrowLeft
} from 'react-icons/fi'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

const serviceDetails = {
  'cyber-security': {
    title: 'Cyber Security',
    icon: FiShield,
    description: 'Protect systems, networks and data from cyber threats with our comprehensive security solutions.',
    gradient: 'from-[#2B7BE4] to-[#3B82F6]',
    features: [
      'Network Security & Firewall Management',
      'Endpoint Protection & Antivirus Solutions',
      'Data Encryption & Backup Solutions',
      '24/7 Threat Monitoring & Detection',
      'Vulnerability Assessment & Penetration Testing',
      'Email Security & Spam Protection',
      'Mobile Device Security Management',
      'Cloud Security Configuration'
    ],
    benefits: [
      'Prevent data breaches and unauthorized access',
      'Ensure business continuity and data availability',
      'Meet compliance and regulatory requirements',
      'Protect customer and business data',
      'Reduce risk of financial losses'
    ],
    process: [
      { step: 1, title: 'Assessment', desc: 'Comprehensive security evaluation' },
      { step: 2, title: 'Planning', desc: 'Custom security strategy development' },
      { step: 3, title: 'Implementation', desc: 'Deployment of security solutions' },
      { step: 4, title: 'Monitoring', desc: '24/7 threat detection and response' },
      { step: 5, title: 'Optimization', desc: 'Continuous improvement and updates' }
    ]
  },
  'governance-risk-assessment': {
    title: 'Governance Risk Assessment',
    icon: FiBarChart2,
    description: 'Identify, assess and manage cybersecurity risks with our expert governance framework.',
    gradient: 'from-[#FF5CA8] to-[#EC4899]',
    features: [
      'Comprehensive Risk Assessment',
      'Regulatory Compliance Management',
      'Security Policy Development',
      'Third-Party Risk Management',
      'Continuous Monitoring & Reporting',
      'Risk Treatment Planning',
      'Security Control Implementation',
      'Audit Preparation & Support'
    ],
    benefits: [
      'Identify and prioritize security risks',
      'Ensure regulatory compliance',
      'Establish clear security policies',
      'Manage third-party vendor risks',
      'Improve overall security posture'
    ],
    process: [
      { step: 1, title: 'Risk Identification', desc: 'Identify potential security threats' },
      { step: 2, title: 'Risk Analysis', desc: 'Assess impact and likelihood' },
      { step: 3, title: 'Risk Evaluation', desc: 'Prioritize risks based on impact' },
      { step: 4, title: 'Risk Treatment', desc: 'Implement risk mitigation strategies' },
      { step: 5, title: 'Monitoring', desc: 'Continuous risk assessment' }
    ]
  },
  'training-awareness': {
    title: 'Training and Awareness',
    icon: FiBookOpen,
    description: 'Empower your team with cybersecurity awareness training to prevent security breaches.',
    gradient: 'from-[#7C3AED] to-[#8B5CF6]',
    features: [
      'Phishing Simulation & Testing',
      'Security Awareness Workshops',
      'Executive Cybersecurity Training',
      'Incident Response Drills',
      'Custom Training Modules',
      'Security Policy Training',
      'Social Engineering Awareness',
      'Secure Coding Practices'
    ],
    benefits: [
      'Reduce human error in security incidents',
      'Create security-conscious culture',
      'Meet compliance training requirements',
      'Improve incident response readiness',
      'Protect against social engineering'
    ],
    process: [
      { step: 1, title: 'Needs Assessment', desc: 'Identify training requirements' },
      { step: 2, title: 'Program Design', desc: 'Create customized training modules' },
      { step: 3, title: 'Implementation', desc: 'Conduct training sessions' },
      { step: 4, title: 'Testing', desc: 'Phishing simulations and assessments' },
      { step: 5, title: 'Evaluation', desc: 'Measure effectiveness and improve' }
    ]
  },
  'banking-security': {
    title: 'Banking Security',
    icon: FiCreditCard,
    description: 'Specialized security solutions for banking and financial institutions.',
    gradient: 'from-[#2B7BE4] to-[#FF5CA8]',
    features: [
      'Bank-Grade Encryption',
      'Fraud Detection Systems',
      'Transaction Monitoring',
      'Compliance with RBI Guidelines',
      'Secure Banking Applications',
      'ATM & Branch Security',
      'Payment Gateway Security',
      'Customer Data Protection'
    ],
    benefits: [
      'Protect financial transactions',
      'Prevent fraud and financial crimes',
      'Meet RBI compliance requirements',
      'Secure customer banking data',
      'Build customer trust and confidence'
    ],
    process: [
      { step: 1, title: 'Security Assessment', desc: 'Evaluate current security posture' },
      { step: 2, title: 'Compliance Review', desc: 'Check RBI guideline compliance' },
      { step: 3, title: 'Solution Design', desc: 'Design bank-specific security measures' },
      { step: 4, title: 'Implementation', desc: 'Deploy security solutions' },
      { step: 5, title: 'Continuous Audit', desc: 'Regular security audits and updates' }
    ]
  },
  'incident-response': {
    title: 'Incident Response',
    icon: FiAlertTriangle,
    description: '24/7 incident response services to quickly mitigate and recover from security incidents.',
    gradient: 'from-[#FF5CA8] to-[#7C3AED]',
    features: [
      'Rapid Response Team',
      'Forensic Investigation',
      'Breach Containment',
      'Data Recovery Services',
      'Post-Incident Analysis',
      'Incident Response Planning',
      'Threat Intelligence',
      'Business Continuity Support'
    ],
    benefits: [
      'Minimize damage from security incidents',
      'Quick recovery and restoration',
      'Forensic evidence collection',
      'Prevent future incidents',
      'Maintain business operations'
    ],
    process: [
      { step: 1, title: 'Preparation', desc: 'Incident response planning' },
      { step: 2, title: 'Detection', desc: '24/7 monitoring and alerting' },
      { step: 3, title: 'Containment', desc: 'Immediate threat isolation' },
      { step: 4, title: 'Eradication', desc: 'Remove threat from systems' },
      { step: 5, title: 'Recovery', desc: 'Restore systems and operations' },
      { step: 6, title: 'Lessons Learned', desc: 'Improve security measures' }
    ]
  }
} as const


type ServiceKey = keyof typeof serviceDetails
type ServiceDetail = typeof serviceDetails[ServiceKey]

// Get all valid slugs
const validSlugs = Object.keys(serviceDetails) as ServiceKey[]

// Validate if a slug is valid
function isValidSlug(slug: string | undefined): slug is ServiceKey {
  return !!slug && validSlugs.includes(slug as ServiceKey)
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  
  if (!isValidSlug(slug)) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  const service = serviceDetails[slug]

  return {
    title: `${service.title} | Cybria Secure - Cybersecurity Services`,
    description: service.description,
    keywords: `${service.title.toLowerCase()}, cybersecurity services, ${slug} Kolhapur, Maharashtra security`,
  }
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }))
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  
  if (!isValidSlug(slug)) {
    notFound()
  }

  const service = serviceDetails[slug]

  const Icon = service.icon

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Cybria Secure',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008',
        addressLocality: 'Kolhapur',
        addressRegion: 'Maharashtra',
        postalCode: '416110',
        addressCountry: 'IN',
      },
      telephone: '+918080424274',
      areaServed: ['Kolhapur', 'Ichalkaranji', 'Miraj', 'Sangli', 'Solapur'],
    },
    serviceType: 'Cybersecurity',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '16.6919',
        longitude: '74.2314',
      },
      geoRadius: '100000',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-20 bg-[#0b1220] px-4">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
            >
              <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          {/* Service Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient}`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-400 mt-2">{service.description}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
            >
              Get This Service
            </Link>
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Features */}
            <div className="lg:col-span-2">
              <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Service Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-[#0b1220]/50 rounded-lg border border-gray-800"
                    >
                      <FiCheckCircle className="w-5 h-5 text-[#2B7BE4] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                        index % 3 === 0 ? 'bg-[#2B7BE4]' : 
                        index % 3 === 1 ? 'bg-[#FF5CA8]' : 
                        'bg-[#7C3AED]'
                      }`} />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Our Implementation Process
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] transform -translate-y-1/2 hidden lg:block " />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
                {service.process.map((item) => (
                  <div key={item.step} className="relative">
                    {/* Step Indicator */}
                    <div className="w-12 h-12 bg-[#1a2236] border-2 border-[#2B7BE4] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-white font-bold ">{item.step}</span>
                    </div>
                    
                    {/* Step Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Local Service Coverage */}
          <div className="bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Available in Maharashtra Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { city: 'Kolhapur', desc: 'Primary Service Hub' },
                { city: 'Ichalkaranji', desc: 'Textile Industry Focus' },
                { city: 'Miraj', desc: 'Healthcare & Medical' },
                { city: 'Sangli', desc: 'Banking & Finance' },
                { city: 'Solapur', desc: 'Industrial Sector' },
              ].map((location) => (
                <div
                  key={location.city}
                  className="bg-[#1a2236]/50 rounded-xl p-4 text-center border border-gray-800 hover:border-[#2B7BE4] transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-sm">{location.city[0]}</span>
                  </div>
                  <h4 className="font-bold text-white mb-1">{location.city}</h4>
                  <p className="text-gray-400 text-xs">{location.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Implement {service.title}?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our cybersecurity experts for a consultation tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
              >
                Schedule Consultation
              </Link>
              <a
                href="tel:+918080424274"
                className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                Call +91 80804 24274
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}