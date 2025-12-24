import type { Metadata } from "next";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Link from "next/link";
import {
  FiGlobe,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiMap,
  FiUsers,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Cybria Secure | Leading Cybersecurity Services in Kolhapur",
  description:
    "From Threats to Trust – We Secure It All. Professional cybersecurity services in Kolhapur, Ichalkaranji, Miraj, Sangli, Solapur. Defending your digital existence.",
  keywords:
    "cybersecurity Kolhapur, security services Maharashtra, cyber protection, incident response, risk assessment",
};

export default function HomePage() {
  return (
    <>
     
      <Hero />
      <Services />
      <Testimonials />

      <section className="py-20 bg-[#0b1220]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Cybersecurity </span>
                  <span className="text-gradient">Protection </span>
                  <span className="text-white">Across The Globe</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive security solutions serving businesses across
                  every corner of the Globe with consistent quality and
                  expertise
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  {
                    title: "Pan-India Coverage",
                    description:
                      "Unified security solutions available across all regions of India",
                    icon: FiGlobe,
                    features: [
                      "Service in 100+ cities",
                      "Multi-lingual support",
                      "Regional compliance expertise",
                    ],
                  },
                  {
                    title: "24/7 Response Network",
                    description:
                      "Round-the-clock security monitoring and incident response",
                    icon: FiShield,
                    features: [
                      "Instant threat detection",
                      "Rapid response teams",
                      "Emergency support",
                    ],
                  },
                  {
                    title: "Expertise",
                    description:
                      "Security solutions tailored to regional business environments",
                    icon: FiTarget,
                    features: [
                      "Cultural understanding",
                      "Local regulations",
                      "Industry-specific knowledge",
                    ],
                  },
                  {
                    title: "Scalable Solutions",
                    description:
                      "Security that grows with your business across locations",
                    icon: FiTrendingUp,
                    features: [
                      "Multi-location deployment",
                      "Centralized management",
                      "Consistent standards",
                    ],
                  },
                ].map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-[#1a2236]/50 rounded-2xl p-6 border border-gray-800 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-[#2B7BE4]/10"
                    >
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 mb-4`}
                      >
                        <Icon className="w-6 h-6 text-[#2B7BE4]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-[#2B7BE4] rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

             

              <div className="mt-12 pt-8 border-t border-gray-800">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#2B7BE4]/10 to-[#7C3AED]/10 mb-6">
                    {/* <FiShield className="w-8 h-8 text-[#2B7BE4]" /> */}
                    <img src="/cybriasecure-logo.png" alt="Cybria Secure Logo" className="w-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Secure Your Business worldwide?
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Whether you operate in one contry or multiple contries across
                    the Globe, we provide consistent, reliable cybersecurity
                    protection.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Get Free Consultation
                    </Link>
                    <Link
                      href="/services"
                      className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
                    >
                      Our Services
                    </Link>
                  </div>
                  <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
                    <FiCheckCircle className="w-4 h-4 mr-2" />
                    Serving businesses across Globe with uniform security
                    standards and expertise
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
