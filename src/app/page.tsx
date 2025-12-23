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
      <div className="w-full h-[70vh] sm:h-[100vh] flex mx-auto">
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full  object-cover"
        ></video>
      </div>
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-[#1a2236]/30 rounded-2xl p-6 border border-gray-800">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-[#2B7BE4]/20 to-[#FF5CA8]/20 rounded-lg mr-4">
                      <FiMap className="w-6 h-6 text-[#2B7BE4]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Our Global Reach
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      {
                        label: "Cities Covered",
                        value: "100+",
                        icon: FiGlobe,
                        color: "from-[#2B7BE4] to-[#3B82F6]",
                      },
                      {
                        label: "Businesses Protected",
                        value: "500+",
                        icon: FiUsers,
                        color: "from-[#FF5CA8] to-[#EC4899]",
                      },
                      {
                        label: "Response Time",
                        value: "< 2 Hours",
                        icon: FiClock,
                        color: "from-[#7C3AED] to-[#8B5CF6]",
                      },
                      {
                        label: "Uptime Guarantee",
                        value: "99.9%",
                        icon: FiCheckCircle,
                        color: "from-[#10B981] to-[#34D399]",
                      },
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-[#0b1220]/50 rounded-lg hover:bg-[#0b1220]/70 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="p-2 bg-[#1a2236] rounded-lg mr-4">
                              <Icon className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className="text-gray-300">{stat.label}</span>
                          </div>
                          <div
                            className={`px-4 py-2 bg-gradient-to-r ${stat.color} text-white font-bold rounded-full`}
                          >
                            {stat.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#1a2236]/30 rounded-2xl p-6 border border-gray-800">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-[#FF5CA8]/20 to-[#7C3AED]/20 rounded-lg mr-4">
                      <FiTarget className="w-6 h-6 text-[#FF5CA8]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      How We Serve Globally
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        step: "01",
                        title: "Centralized Strategy",
                        description:
                          "Unified security framework designed for global deployment",
                        icon: FiGlobe,
                      },
                      {
                        step: "02",
                        title: "Implementation",
                        description:
                          "Customized deployment considering regional requirements",
                        icon: FiMap,
                      },
                      {
                        step: "03",
                        title: "Continuous Monitoring",
                        description:
                          "24/7 security operations center covering all locations",
                        icon: FiShield,
                      },
                      {
                        step: "04",
                        title: "Standardized Excellence",
                        description:
                          "Consistent service quality across every location",
                        icon: FiCheckCircle,
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 hover:bg-[#0b1220]/30 rounded-lg transition-colors group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-sm">
                              {item.step}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <div className="p-1.5 bg-[#1a2236] rounded mr-3">
                                <Icon className="w-4 h-4 text-[#2B7BE4]" />
                              </div>
                              <h4 className="text-lg font-semibold text-white">
                                {item.title}
                              </h4>
                            </div>
                            <p className="text-gray-400 text-sm ml-9">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-800">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#2B7BE4]/10 to-[#7C3AED]/10 mb-6">
                    <FiShield className="w-8 h-8 text-[#2B7BE4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Secure Your Business Nationwide?
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Whether you operate in one city or multiple locations across
                    India, we provide consistent, reliable cybersecurity
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
                    Serving businesses across India with uniform security
                    standards and localized expertise
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
