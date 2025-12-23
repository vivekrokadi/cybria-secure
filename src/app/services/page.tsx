import type { Metadata } from "next";
import Link from "next/link";
import {
  FiShield,
  FiBarChart2,
  FiBookOpen,
  FiCreditCard,
  FiAlertTriangle,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Cybersecurity Services | Cybria Secure - Complete Protection",
  description:
    "Comprehensive cybersecurity services in Kolhapur: Cyber Security, Risk Assessment, Training, Banking Security, Incident Response. Protect your business today.",
  keywords:
    "cybersecurity services, security solutions, risk assessment, incident response, banking security",
};

const services = [
  {
    id: 1,
    title: "Cyber Security",
    icon: FiShield,
    description:
      "Protect systems, networks and data from cyber threats with our comprehensive security solutions.",
    features: [
      "Network Security & Firewall Management",
      "Endpoint Protection & Antivirus Solutions",
      "Data Encryption & Backup Solutions",
      "24/7 Threat Monitoring & Detection",
      "Vulnerability Assessment & Penetration Testing",
    ],
    gradient: "from-[#2B7BE4] to-[#3B82F6]",
    slug: "cyber-security"
  },
  {
    id: 2,
    title: "Governance Risk Assessment",
    icon: FiBarChart2,
    description:
      "Identify, assess and manage cybersecurity risks with our expert governance framework.",
    features: [
      "Comprehensive Risk Assessment",
      "Regulatory Compliance Management",
      "Security Policy Development",
      "Third-Party Risk Management",
      "Continuous Monitoring & Reporting",
    ],
    gradient: "from-[#FF5CA8] to-[#EC4899]",
    slug: "governance-risk-assessment"
  },
  {
    id: 3,
    title: "Training and Awareness",
    icon: FiBookOpen,
    description:
      "Empower your team with cybersecurity awareness training to prevent security breaches.",
    features: [
      "Phishing Simulation & Testing",
      "Security Awareness Workshops",
      "Executive Cybersecurity Training",
      "Incident Response Drills",
      "Custom Training Modules",
    ],
    gradient: "from-[#7C3AED] to-[#8B5CF6]",
    slug: "training-awareness"
  },
  {
    id: 4,
    title: "Banking Security",
    icon: FiCreditCard,
    description:
      "Specialized security solutions for banking and financial institutions.",
    features: [
      "Bank-Grade Encryption",
      "Fraud Detection Systems",
      "Transaction Monitoring",
      "Compliance with RBI Guidelines",
      "Secure Banking Applications",
    ],
    gradient: "from-[#2B7BE4] to-[#FF5CA8]",
    slug: "banking-security"
  },
  {
    id: 5,
    title: "Incident Response",
    icon: FiAlertTriangle,
    description:
      "24/7 incident response services to quickly mitigate and recover from security incidents.",
    features: [
      "Rapid Response Team",
      "Forensic Investigation",
      "Breach Containment",
      "Data Recovery Services",
      "Post-Incident Analysis",
    ],
    gradient: "from-[#FF5CA8] to-[#7C3AED]",
    slug: "incident-response"
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cybersecurity Services",
    description: "Complete cybersecurity services offered by Cybria Secure",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "Cybria Secure",
      },
    })),
  };

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
              <span className="text-white">Complete </span>
              <span className="text-gradient">Cybersecurity</span>
              <span className="text-white"> Solutions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive protection services for businesses in India. From threat prevention
              to incident response, we've got you covered.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-12 max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#1a2236] rounded-2xl overflow-hidden border border-gray-800 hover:border-transparent transition-all duration-300"
              >
                <div className="p-8 md:p-12">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Icon Section */}
                    <div className="lg:w-1/4">
                      <div
                        className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${service.gradient}`}
                      >
                        <service.icon className="w-12 h-12 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white mt-6">
                        {service.title}
                      </h2>
                      <p className="text-gray-400 mt-3">
                        {service.description}
                      </p>
                      <Link
                        href={`/services/${service.slug}`} // Using the slug property
                        className="inline-flex items-center mt-6 text-[#2B7BE4] font-medium hover:text-[#FF5CA8] transition-colors"
                      >
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>

                    {/* Features Section */}
                    <div className="lg:w-3/4">
                      <h3 className="text-xl font-bold text-white mb-6">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-4 bg-[#0b1220]/50 rounded-lg border border-gray-800"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-[#2B7BE4] to-[#FF5CA8] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Secure Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a free security assessment and discover how we can protect
              your business from cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
              >
                Get Free Assessment
              </Link>
              <a
                href="tel:+918080424274"
                className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                Call +91 80804 24274
              </a>
            </div>
          </div>

          {/* Local SEO Section */}
          <div className="mt-16">
            <div className="prose prose-lg prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-white mb-6">
                Cybersecurity Services Across Maharashtra
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">
                    Why Choose Local Cybersecurity?
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#2B7BE4] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        Immediate on-site support in Kolhapur and surrounding
                        areas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#FF5CA8] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        Understanding of local business requirements and
                        regulations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        Cost-effective solutions tailored for Maharashtra
                        businesses
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">
                    Our Service Areas
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#2B7BE4] to-[#FF5CA8] rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        Kolhapur: Manufacturing & Educational Institutions
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#FF5CA8] to-[#7C3AED] rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        Ichalkaranji: Textile & Small Industries
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#7C3AED] to-[#2B7BE4] rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        Miraj, Sangli, Solapur: Healthcare, Banking & Commercial
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}