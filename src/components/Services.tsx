"use client";

import Link from "next/link";
import {
  FiShield, FiGlobe, FiSmartphone, FiCloud, FiCode, FiCpu,
  FiTarget, FiAlertTriangle, FiClipboard, FiBarChart2,
  FiUsers, FiBookOpen, FiServer, FiArrowRight,
} from "react-icons/fi";

const iconMap: Record<string, React.ElementType> = {
  FiGlobe, FiServer, FiSmartphone, FiCloud, FiCode, FiCpu,
  FiTarget, FiAlertTriangle, FiClipboard, FiShield, FiBarChart2, FiUsers, FiBookOpen,
};

// Featured 6 services shown on homepage — representative mix across categories
const featured = [
  {
    slug: "web-application-vapt",
    title: "Web Application VAPT",
    shortDesc: "OWASP-based manual and automated testing for injections, broken auth, IDOR and API vulnerabilities.",
    iconName: "FiGlobe",
    gradient: "from-[#2B7BE4] to-[#3B82F6]",
    accentColor: "#2B7BE4",
    glowColor: "rgba(43,123,228,0.35)",
    tag: "VAPT",
  },
  {
    slug: "network-security-audit",
    title: "Network Security Audit",
    shortDesc: "Internal and external network penetration testing — firewalls, AD, segmentation and VPN.",
    iconName: "FiServer",
    gradient: "from-[#2B7BE4] to-[#0EA5E9]",
    accentColor: "#0EA5E9",
    glowColor: "rgba(14,165,233,0.35)",
    tag: "VAPT",
  },
  {
    slug: "red-teaming",
    title: "Red Team Operations",
    shortDesc: "Full-scope adversarial simulation — digital, physical and social vectors to test real-world defences.",
    iconName: "FiTarget",
    gradient: "from-[#EF4444] to-[#B91C1C]",
    accentColor: "#EF4444",
    glowColor: "rgba(239,68,68,0.35)",
    tag: "Advanced",
  },
  {
    slug: "incident-response",
    title: "Incident Response",
    shortDesc: "24/7 rapid response to contain, investigate and recover from ransomware and breaches.",
    iconName: "FiAlertTriangle",
    gradient: "from-[#FF5CA8] to-[#7C3AED]",
    accentColor: "#FF5CA8",
    glowColor: "rgba(255,92,168,0.35)",
    tag: "Advanced",
  },
  {
    slug: "rbi-compliance",
    title: "RBI Cybersecurity Compliance",
    shortDesc: "End-to-end RBI framework compliance for cooperative banks, UCBs and NBFCs.",
    iconName: "FiClipboard",
    gradient: "from-[#7C3AED] to-[#2B7BE4]",
    accentColor: "#7C3AED",
    glowColor: "rgba(124,58,237,0.35)",
    tag: "Compliance",
  },
  {
    slug: "security-awareness-training",
    title: "Security Awareness Training",
    shortDesc: "Employee training and phishing simulations in English, Hindi and Marathi.",
    iconName: "FiBookOpen",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    accentColor: "#F59E0B",
    glowColor: "rgba(245,158,11,0.35)",
    tag: "Training",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-[#0b1220] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-6 bg-blue-400/5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            What We Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            <span className="text-white">Our </span>
            <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Cybersecurity
            </span>
            <span className="text-white"> Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive protection across testing, compliance, managed security and training — for Indian businesses of every size.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featured.map((service) => {
            const Icon = iconMap[service.iconName] || FiShield;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-[#141d2e] rounded-2xl p-7 border border-gray-800 hover:border-transparent transition-all duration-300 flex flex-col relative overflow-hidden hover:shadow-[0_12px_40px_var(--glow)]"
                style={{ "--glow": service.glowColor } as React.CSSProperties}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0b1220] border border-gray-800 text-gray-500">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-white font-bold text-xl mb-3 leading-snug group-hover:text-[#2B7BE4] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {service.shortDesc}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200"
                  style={{ color: service.accentColor }}>
                  Explore Service
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-14">
          <Link href="/services"
            className="group inline-flex items-center gap-2.5 px-8 py-4 font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", boxShadow: "0 0 40px rgba(43,123,228,0.2)" }}>
            View All Services
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <p className="text-gray-500 text-sm mt-4">12 services across 5 categories</p>
        </div>
      </div>
    </section>
  );
}