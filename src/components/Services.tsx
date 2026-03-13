"use client";

import Link from "next/link";
import {
  FiShield,
  FiBarChart2,
  FiBookOpen,
  FiCreditCard,
  FiAlertTriangle,
  FiTarget
} from "react-icons/fi";

const services = [
  {
    id: 1,
    title: "Cyber Security",
    description:
      "Protect systems, networks and data from cyber threats with our comprehensive security solutions.",
    icon: FiShield,
    gradient: "from-[#2B7BE4] to-[#3B82F6]",
    slug: "cyber-security",
    features: [
      "Network Security",
      "Endpoint Protection",
      "Threat Monitoring",
      "Penetration Testing",
    ],
  },
  {
    id: 2,
    title: "Governance Risk Assessment",
    description:
      "Identify, assess and manage cybersecurity risks with our expert governance framework.",
    icon: FiBarChart2,
    gradient: "from-[#FF5CA8] to-[#EC4899]",
    slug: "governance-risk-assessment",
    features: [
      "Risk Assessment",
      "Compliance Management",
      "Policy Development",
      "Third-Party Risk",
    ],
  },
  {
    id: 3,
    title: "Training and Awareness",
    description:
      "Empower your team with cybersecurity awareness training to prevent security breaches.",
    icon: FiBookOpen,
    gradient: "from-[#7C3AED] to-[#8B5CF6]",
    slug: "training-awareness",
    features: [
      "Phishing Simulation",
      "Workshops",
      "Incident Drills",
      "Custom Training",
    ],
  },
  {
    id: 4,
    title: "Banking Security",
    description:
      "Specialized security solutions for banking and financial institutions.",
    icon: FiCreditCard,
    gradient: "from-[#2B7BE4] to-[#FF5CA8]",
    slug: "banking-security",
    features: [
      "Fraud Detection",
      "Transaction Monitoring",
      "RBI Compliance",
      "Secure Apps",
    ],
  },
  {
    id: 5,
    title: "Incident Response",
    description:
      "24/7 incident response services to quickly mitigate and recover from security incidents.",
    icon: FiAlertTriangle,
    gradient: "from-[#FF5CA8] to-[#7C3AED]",
    slug: "incident-response",
    features: [
      "Rapid Response",
      "Forensics",
      "Breach Containment",
      "Data Recovery",
    ],
  },
  {
    id: 6,
    title: "Red Teaming",
    description: "We simulate real-world attacks to test your defenses.",
    icon: FiTarget,
    gradient: "from-[#EF4444] to-[#B91C1C]",
    slug: "red-teaming",
    features: [
      "APT Simulation",
      "Social Engineering",
      "Physical Security",
      "Cloud Attacks",
    ],
  },
];

export default function Services() {
  const handleClick = (slug: string) => {
    console.log("Service clicked:", slug);
  };

  return (
    <section className="py-20 bg-[#0b1220]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-gradient">Cybersecurity</span>
            <span className="text-white"> Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive cybersecurity solutions tailored to modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              onClick={() => handleClick(service.slug)}
              className="block group relative h-[380px]"
            >
              {/* Card container */}
              <div
                className="relative h-full rounded-2xl p-8 border border-gray-800 overflow-hidden
                          transition-all duration-500 ease-out
                          group-hover:border-transparent group-hover:shadow-2xl
                          group-hover:scale-[1.02] group-hover:-translate-y-1"
                style={{ backgroundColor: '#1a2236' }}
              >
                {/* Color fill overlay - animated from bottom to top */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} 
                              opacity-90 transform scale-y-0 group-hover:scale-y-100 
                              transition-transform duration-500 ease-in-out origin-bottom`}
                />

                {/* Content container - two layers that fade in/out */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Default content (visible when not hovered) */}
                  <div className="transition-opacity duration-300 group-hover:opacity-0">
                    <div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>

                  {/* Hover content (features) - hidden by default, appears on hover */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      {service.title}
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-white">
                          <span className="w-1.5 h-1.5 bg-white rounded-full mr-3" />
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-center">
                      <span className="inline-flex items-center text-white/90 text-sm font-medium">
                        Click to learn more
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full
                       transition-all duration-300 hover:shadow-2xl hover:shadow-[#2B7BE4]/30 hover:scale-105 hover:gap-3"
          >
            View All Services
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}