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
  FiArrowLeft,
  FiSearch,
  FiLock,
  FiGlobe,
  FiSmartphone,
  FiWifi,
  FiCloud,
  FiCode,
  FiCpu,
  FiSettings,
  FiTarget,
  FiMonitor,
  FiFileText,
  FiUsers,
  FiMail,
  FiAlertCircle,
  FiClipboard,
  FiTrendingUp,
  FiShieldOff
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
    ],
    detailedContent: [
      {
        icon: FiSearch,
        title: 'Vulnerability Assessment',
        description: 'Vulnerability assessment is used to identify, quantify, and analyze security vulnerabilities in the IT infrastructure and applications.',
        subPoints: [
          'Uses various tools, techniques, and methodologies',
          'Analyzes potential weaknesses and security flaws',
          'Identifies exploitable vulnerabilities before attackers do',
          'Provides actionable remediation recommendations'
        ]
      },
      {
        icon: FiLock,
        title: 'Penetration Testing',
        description: 'Ethical hacking to find and fix security holes before real attackers can exploit them.',
        subPoints: [
          'Proactive security testing by certified ethical hackers',
          'Simulates real-world cyber attacks',
          'Identifies exploitable vulnerabilities in systems',
          'Provides detailed remediation guidance'
        ]
      },
      {
        icon: FiGlobe,
        title: 'Web Application Security Assessment (SAST/DAST)',
        description: 'Identifies and prioritizes highest severity risks affecting web applications and supporting infrastructure.',
        subPoints: [
          'Static Application Security Testing (SAST)',
          'Dynamic Application Security Testing (DAST)',
          'Application logic and design analysis',
          'Automated and manual testing combination'
        ]
      },
      {
        icon: FiSmartphone,
        title: 'Mobile Application Security Testing',
        description: 'Evaluates security of mobile applications to identify and address vulnerabilities.',
        subPoints: [
          'iOS and Android application testing',
          'Secure coding practices verification',
          'Data storage and transmission security',
          'Authentication and authorization testing'
        ]
      },
      {
        icon: FiMonitor,
        title: 'Network Security Assessment',
        description: 'Discovers and identifies risks in network environments to prevent data leakage and intrusions.',
        subPoints: [
          'Network architecture review',
          'Firewall and router configuration analysis',
          'Intrusion detection system evaluation',
          'Data leakage prevention assessment'
        ]
      },
      {
        icon: FiCode,
        title: 'Secure Code Review',
        description: 'Manual and automatic review of application source code to uncover hidden vulnerabilities.',
        subPoints: [
          'Injection flaws detection',
          'Cross-site scripting bug identification',
          'Weak cryptography analysis',
          'Insecure coding practices detection'
        ]
      },
      {
        icon: FiCloud,
        title: 'Cloud Security Assessment',
        description: 'Comprehensive evaluation of cloud environment to identify and address security risks.',
        subPoints: [
          'Cloud infrastructure analysis',
          'Multi-cloud security assessment',
          'Data protection in cloud',
          'Compliance with cloud security standards'
        ]
      },
      {
        icon: FiCpu,
        title: 'IoT Security',
        description: 'Protects Internet of Things devices, networks, and data from cyber threats.',
        subPoints: [
          'IoT device vulnerability assessment',
          'Network communication security',
          'Firmware security analysis',
          'IoT protocol security evaluation'
        ]
      },
      {
        icon: FiSettings,
        title: 'VMDR (Vulnerability Management, Detection, and Response)',
        description: 'Integrated approach to identifying, managing, detecting, and responding to security vulnerabilities.',
        subPoints: [
          'Continuous vulnerability scanning',
          'Real-time threat detection',
          'Automated response mechanisms',
          'Remediation workflow management'
        ]
      },
      {
        icon: FiTarget,
        title: 'Threat Modelling',
        description: 'Structured approach to identify, assess, and prioritize potential threats and vulnerabilities.',
        subPoints: [
          'Attack surface analysis',
          'Threat identification and categorization',
          'Risk assessment and prioritization',
          'Countermeasure design'
        ]
      },
      {
        icon: FiSettings,
        title: 'Configuration Review/System Admin',
        description: 'Evaluates and manages system settings to ensure security, efficiency, and best practices alignment.',
        subPoints: [
          'System configuration auditing',
          'Security baseline compliance',
          'Performance optimization',
          'Patch management review'
        ]
      },
      {
        icon: FiWifi,
        title: 'Wireless Security',
        description: 'Measures and protocols to protect wireless networks and transmitted data from unauthorized access.',
        subPoints: [
          'Wireless network penetration testing',
          'Wi-Fi security configuration review',
          'Wireless intrusion detection',
          'Encryption protocol analysis'
        ]
      }
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
    ],
    detailedContent: [
      {
        icon: FiShield,
        title: 'ISO 27001',
        description: 'International standard for Information Security Management System (ISMS) implementation.',
        subPoints: [
          'Systematic approach to information security',
          'Confidentiality, integrity, and availability assurance',
          'Best practices framework implementation',
          'ISMS development and maintenance'
        ]
      },
      {
        icon: FiCreditCard,
        title: 'PCI DSS',
        description: 'Security standards for companies handling credit card information.',
        subPoints: [
          'Cardholder data protection',
          'Secure payment processing environment',
          'Regular security testing requirements',
          'Access control measures implementation'
        ]
      },
      {
        icon: FiFileText,
        title: 'GDPR',
        description: 'European Union data protection regulation for personal data privacy.',
        subPoints: [
          'Data protection impact assessments',
          'Privacy by design implementation',
          'Data breach notification compliance',
          'Individual rights management'
        ]
      },
      {
        icon: FiSettings,
        title: 'IT General Controls (ITGC)',
        description: 'Fundamental controls for IT infrastructure integrity, security, and reliability.',
        subPoints: [
          'Access control management',
          'Change management processes',
          'IT operations monitoring',
          'Backup and recovery procedures'
        ]
      },
      {
        icon: FiAlertCircle,
        title: 'IT Risk Assessment',
        description: 'Process of identifying, evaluating, and prioritizing IT infrastructure risks.',
        subPoints: [
          'Threat and vulnerability identification',
          'Risk impact and likelihood evaluation',
          'Mitigation strategy development',
          'Continuous risk monitoring'
        ]
      },
      {
        icon: FiUsers,
        title: 'Third-Party Risk Assessment',
        description: 'Evaluates risks associated with external vendors and service providers.',
        subPoints: [
          'Vendor security posture assessment',
          'Contractual compliance verification',
          'Data protection agreement review',
          'Service level agreement monitoring'
        ]
      },
      {
        icon: FiLock,
        title: 'Personal Data Protection Act',
        description: 'Ensures compliance with data protection regulations.',
        subPoints: [
          'Gap analysis and compliance assessment',
          'Privacy policy development',
          'Data classification and protection',
          'Employee training and awareness'
        ]
      },
      {
        icon: FiGlobe,
        title: 'Social Media Risk Assessment',
        description: 'Identifies risks associated with social media platforms.',
        subPoints: [
          'Brand reputation risk analysis',
          'Account security review',
          'Privacy compliance audit',
          'Incident response planning'
        ]
      },
      {
        icon: FiClipboard,
        title: 'HIPAA',
        description: 'US federal law for protecting sensitive patient health information.',
        subPoints: [
          'Patient data privacy protection',
          'Electronic health transaction security',
          'Healthcare compliance management',
          'Data breach prevention measures'
        ]
      }
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
    ],
    detailedContent: [
      {
        icon: FiShield,
        title: 'Cyber Security Training',
        description: 'Enhances team operational skills for preventing, detecting, and responding to cyber attacks.',
        subPoints: [
          'Email protection best practices',
          'Web protection techniques',
          'Social engineering awareness',
          'Threat landscape overview',
          'Password policy implementation'
        ]
      },
      {
        icon: FiMail,
        title: 'Phishing Simulation',
        description: 'Comprehensive strategy to transform organizational culture through awareness and ownership.',
        subPoints: [
          'Realistic phishing campaign simulations',
          'Behavioral change tracking',
          'Risk reduction through awareness',
          'Customized phishing scenarios',
          'Detailed reporting and analytics'
        ]
      },
      {
        icon: FiUsers,
        title: 'Awareness Campaigns',
        description: 'Tailored educational campaigns focusing on organization-specific threats.',
        subPoints: [
          'End-user security training',
          'Phishing awareness programs',
          'USB safety protocols',
          'Social media security',
          'Mobile device security'
        ]
      }
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
    ],
    detailedContent: [
      {
        icon: FiSearch,
        title: 'System Audits',
        description: 'Comprehensive audit services to identify vulnerabilities and ensure regulatory compliance.',
        subPoints: [
          'Security and risk assessment',
          'Regulatory compliance verification',
          'IT infrastructure audit',
          'Access control evaluation',
          'Operational efficiency review'
        ]
      },
      {
        icon: FiClipboard,
        title: 'Compliance Assessment Services',
        description: 'Helps businesses meet industry-specific regulatory requirements.',
        subPoints: [
          'Regulatory compliance audits',
          'Gap analysis and risk assessment',
          'Policy and procedure review',
          'Security control implementation',
          'Compliance documentation'
        ]
      },
      {
        icon: FiTrendingUp,
        title: 'Assurance & Strategy Services',
        description: 'Provides confidence in processes and strategies through risk management.',
        subPoints: [
          'Risk assurance programs',
          'Internal controls evaluation',
          'Strategic planning support',
          'Performance management',
          'Governance and compliance'
        ]
      },
      {
        icon: FiShieldOff,
        title: 'Cyber Policy',
        description: 'Procedures and guidelines for maintaining robust cybersecurity practices.',
        subPoints: [
          'Data protection policies',
          'Access control guidelines',
          'Incident response procedures',
          'Compliance framework',
          'Security awareness protocols'
        ]
      }
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
    ],
    detailedContent: [
      {
        icon: FiSearch,
        title: 'Incident Detection and Investigation',
        description: 'Proactive threat identification using advanced monitoring tools and techniques.',
        subPoints: [
          'Real-time threat monitoring',
          'Suspicious activity detection',
          'Root cause investigation',
          'Minimal disruption operations',
          'Advanced analytics integration'
        ]
      },
      {
        icon: FiAlertTriangle,
        title: 'Incident Response and Malware Analysis',
        description: 'Rapid containment and eradication of security threats with malware analysis.',
        subPoints: [
          'Immediate threat containment',
          'Malware behavior analysis',
          'Threat eradication strategies',
          'Preventive measure development',
          'Expert forensic analysis'
        ]
      },
      {
        icon: FiFileText,
        title: 'Post-Incident Analysis and Reporting',
        description: 'Comprehensive review of security incidents to strengthen future defenses.',
        subPoints: [
          'Incident impact assessment',
          'Weakness identification',
          'Detailed reporting',
          'Security measure enhancement',
          'Recurrence prevention strategies'
        ]
      },
      
    ]
  },
  'red-teaming': {
  title: 'Red Teaming',
  icon: FiTarget,
  description: 'We simulate live attack conditions to test your defense mechanisms, providing insights that help your team detect, respond to, and strengthen against actual cyber threats.',
  gradient: 'from-[#10B981] to-[#059669]',
  features: [
    'Real-World Attack Simulation',
    'Advanced Persistent Threat (APT) Emulation',
    'Social Engineering Attacks',
    'Physical Security Breach Testing',
    'Network Penetration Testing',
    'Application Security Testing',
    'Wireless Network Attacks',
    'Cloud Infrastructure Attacks'
  ],
  benefits: [
    'Test detection and response capabilities in real-world scenarios',
    'Identify security gaps before attackers do',
    'Improve incident response team effectiveness',
    'Validate security controls and configurations',
    'Enhance overall security posture'
  ],
  process: [
    { step: 1, title: 'Planning', desc: 'Define scope, rules of engagement, and objectives' },
    { step: 2, title: 'Reconnaissance', desc: 'Gather intelligence about target environment' },
    { step: 3, title: 'Initial Access', desc: 'Gain foothold using various attack vectors' },
    { step: 4, title: 'Persistence', desc: 'Maintain access and avoid detection' },
    { step: 5, title: 'Lateral Movement', desc: 'Expand access within the network' },
    { step: 6, title: 'Data Exfiltration', desc: 'Simulate data theft scenarios' },
    { step: 7, title: 'Reporting', desc: 'Detailed findings and recommendations' },
    { step: 8, title: 'Remediation', desc: 'Assist with fixing identified vulnerabilities' }
  ],
  detailedContent: [
    {
      icon: FiTarget,
      title: 'Advanced Persistent Threat (APT) Simulation',
      description: 'Emulate sophisticated, long-term cyber attacks similar to nation-state actors.',
      subPoints: [
        'Multi-vector attack campaigns',
        'Custom malware development',
        'Command and control infrastructure',
        'Data exfiltration simulation',
        'Evasion technique testing'
      ]
    },
    {
      icon: FiUsers,
      title: 'Social Engineering Attacks',
      description: 'Test human vulnerabilities through psychological manipulation techniques.',
      subPoints: [
        'Spear phishing campaigns',
        'Vishing (voice phishing) attacks',
        'Physical tailgating attempts',
        'USB drop attacks',
        'Impersonation scenarios'
      ]
    },
    {
      icon: FiShield,
      title: 'Physical Security Testing',
      description: 'Assess physical security controls and access prevention mechanisms.',
      subPoints: [
        'Facility perimeter testing',
        'Access control bypass attempts',
        'Surveillance system evaluation',
        'Social engineering at premises',
        'Asset protection testing'
      ]
    },
    {
      icon: FiGlobe,
      title: 'External Network Assessment',
      description: 'Simulate external attacker attempting to breach network defenses.',
      subPoints: [
        'External perimeter scanning',
        'Vulnerability exploitation',
        'Firewall rule testing',
        'VPN and remote access attacks',
        'DDoS simulation testing'
      ]
    },
    {
      icon: FiMonitor,
      title: 'Internal Network Penetration',
      description: 'Simulate insider threats and compromised internal accounts.',
      subPoints: [
        'Privilege escalation attempts',
        'Active Directory attacks',
        'Internal lateral movement',
        'Credential harvesting simulation',
        'Data breach scenarios'
      ]
    },
    {
      icon: FiSmartphone,
      title: 'Mobile & Wireless Attacks',
      description: 'Test mobile device security and wireless network vulnerabilities.',
      subPoints: [
        'Wi-Fi network penetration',
        'Bluetooth security testing',
        'Mobile application attacks',
        'Rogue access point deployment',
        'Mobile device management bypass'
      ]
    },
    {
      icon: FiCloud,
      title: 'Cloud Infrastructure Attacks',
      description: 'Assess security of cloud environments and configurations.',
      subPoints: [
        'Cloud misconfiguration exploitation',
        'Container security testing',
        'Serverless function attacks',
        'Cloud storage bucket testing',
        'Identity and access management attacks'
      ]
    },
    {
      icon: FiCode,
      title: 'Web Application Attacks',
      description: 'Simulate advanced web application attacks and API security testing.',
      subPoints: [
        'OWASP Top 10 exploitation',
        'API security testing',
        'Business logic flaws',
        'Authentication bypass attempts',
        'Session management attacks'
      ]
    }
  ]
},
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

          {/* Detailed Service Content */}
          {service.detailedContent && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Comprehensive {service.title} Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.detailedContent.map((item, index) => {
                  const ItemIcon = item.icon
                  return (
                    <div
                      key={index}
                      className="bg-[#1a2236] rounded-2xl p-6 border border-gray-800 hover:border-[#2B7BE4]/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          index % 3 === 0 ? 'from-[#2B7BE4] to-[#3B82F6]' :
                          index % 3 === 1 ? 'from-[#FF5CA8] to-[#EC4899]' :
                          'from-[#7C3AED] to-[#8B5CF6]'
                        }`}>
                          <ItemIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                      
                      {item.subPoints && (
                        <div className="mt-4 space-y-2">
                          {item.subPoints.map((point, pointIndex) => (
                            <div
                              key={pointIndex}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                pointIndex % 3 === 0 ? 'bg-[#2B7BE4]' :
                                pointIndex % 3 === 1 ? 'bg-[#FF5CA8]' :
                                'bg-[#7C3AED]'
                              }`} />
                              <span className="text-gray-300">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Our Implementation Process
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] transform -translate-y-1/2 hidden lg:block" />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
                {service.process.map((item) => (
                  <div key={item.step} className="relative">
                    {/* Step Indicator */}
                    <div className="w-12 h-12 bg-[#1a2236] border-2 border-[#2B7BE4] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-white font-bold">{item.step}</span>
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

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Implement {service.title}?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Speak with our cybersecurity specialists to evaluate your risks, strengthen defenses, and future-proof your business.
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