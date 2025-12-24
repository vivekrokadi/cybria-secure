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
  },
  {
    id: 2,
    title: "Governance Risk Assessment",
    description:
      "Identify, assess and manage cybersecurity risks with our expert governance framework.",
    icon: FiBarChart2,
    gradient: "from-[#FF5CA8] to-[#EC4899]",
    slug: "governance-risk-assessment",
  },
  {
    id: 3,
    title: "Training and Awareness",
    description:
      "Empower your team with cybersecurity awareness training to prevent security breaches.",
    icon: FiBookOpen,
    gradient: "from-[#7C3AED] to-[#8B5CF6]",
    slug: "training-awareness",
  },
  {
    id: 4,
    title: "Banking Security",
    description:
      "Specialized security solutions for banking and financial institutions.",
    icon: FiCreditCard,
    gradient: "from-[#2B7BE4] to-[#FF5CA8]",
    slug: "banking-security",
  },
  {
    id: 5,
    title: "Incident Response",
    description:
      "24/7 incident response services to quickly mitigate and recover from security incidents.",
    icon: FiAlertTriangle,
    gradient: "from-[#FF5CA8] to-[#7C3AED]",
    slug: "incident-response",
  },
  {
  id: 6,
  title: "Red Teaming",
  description: "We simulate real-world attacks to test your defenses and strengthen your response to real cyber threats.",
  icon: FiTarget,
  gradient: "from-[#10B981] to-[#059669]",
  slug: "red-teaming",
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
            Comprehensive cybersecurity solutions tailored to modern businesses—designed to scale, adapt, and protect in an evolving global threat landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id} // Move key prop here to the first element
              href={`/services/${service.slug}`}
              onClick={() => handleClick(service.slug)}
              className="block group" // Added class for styling
            >
              <div className="relative bg-[#1a2236] rounded-2xl p-8 border border-gray-800 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-[#2B7BE4]/10 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>

                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 relative z-10`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>

                  <div className="relative z-20">
                    <span className="inline-flex items-center text-sm font-medium text-[#2B7BE4] hover:text-[#FF5CA8] transition-colors group/link relative z-30">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
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
                    </span>
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
          >
            View All Services
            <svg
              className="w-5 h-5 ml-2"
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
