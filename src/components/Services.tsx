"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiShield,
  FiBarChart2,
  FiBookOpen,
  FiCreditCard,
  FiAlertTriangle,
  FiTarget,
  FiArrowRight,
} from "react-icons/fi";

const services = [
  {
    id: 1,
    title: "Cyber Security",
    description:
      "Protect systems, networks and data from cyber threats with our comprehensive security solutions.",
    icon: FiShield,
    gradient: "from-blue-500 to-blue-600",
    glowColor: "rgba(43, 123, 228, 0.35)",
    accentColor: "#2B7BE4",
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
    gradient: "from-pink-500 to-pink-600",
    glowColor: "rgba(255, 92, 168, 0.35)",
    accentColor: "#FF5CA8",
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
    gradient: "from-violet-600 to-violet-700",
    glowColor: "rgba(124, 58, 237, 0.35)",
    accentColor: "#7C3AED",
    slug: "training-awareness",
    features: [
      "Phishing Simulation",
      "Security Workshops",
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
    gradient: "from-blue-500 to-pink-500",
    glowColor: "rgba(43, 123, 228, 0.3)",
    accentColor: "#3B9EFF",
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
    gradient: "from-pink-500 to-violet-600",
    glowColor: "rgba(255, 92, 168, 0.3)",
    accentColor: "#FF5CA8",
    slug: "incident-response",
    features: [
      "Rapid Response",
      "Digital Forensics",
      "Breach Containment",
      "Data Recovery",
    ],
  },
  {
    id: 6,
    title: "Red Teaming",
    description: "We simulate real-world attacks to rigorously test your defenses.",
    icon: FiTarget,
    gradient: "from-red-500 to-red-700",
    glowColor: "rgba(239, 68, 68, 0.35)",
    accentColor: "#EF4444",
    slug: "red-teaming",
    features: [
      "APT Simulation",
      "Social Engineering",
      "Physical Security",
      "Cloud Attacks",
    ],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/services/${service.slug}`}
      className="block h-[380px]"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse at center, ${service.glowColor}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          filter: "blur(18px)",
          transform: "scale(1.1)",
        }}
      />

      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/[0.07] bg-[#141d2e] p-8 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: hovered
              ? `0 20px 60px -10px ${service.glowColor}`
              : "0 4px 24px -4px rgba(0,0,0,0.5)",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Top accent line */}
         

          <div
            className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 w-fit`}
            style={{ boxShadow: `0 8px 24px -4px ${service.glowColor}` }}
          >
            <service.icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-3 leading-tight">
            {service.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed flex-1">
            {service.description}
          </p>

          <div
            className="mt-5 flex items-center gap-1.5 text-sm font-medium"
            style={{ color: service.accentColor }}
          >
            <span>Hover to see features</span>
            <FiArrowRight className="w-3.5 h-3.5 translate-x-0 transition-transform duration-300" />
          </div>
        </div>

        {/* Back Face */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} p-8 flex flex-col justify-center`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: `0 20px 60px -10px ${service.glowColor}`,
          }}
        >
          <h3 className="text-xl font-bold text-white mb-7 text-center tracking-wide">
            {service.title}
          </h3>
          <ul className="space-y-3.5">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center text-white"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateX(0)" : "translateX(-12px)",
                  transition: `opacity 0.35s ease ${idx * 0.06 + 0.15}s, transform 0.35s ease ${idx * 0.06 + 0.15}s`,
                }}
              >
                <span className="w-1.5 h-1.5 bg-white/80 rounded-full mr-3 shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-1.5 text-white/80 text-xs font-medium border border-white/20 rounded-full px-3.5 py-1.5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200">
              Click to learn more <FiArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  return (
    <section className="py-24 bg-[#0b1220] relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient blobs */}
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
            <span
              style={{
                background: "linear-gradient(135deg, #2B7BE4 0%, #FF5CA8 50%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Cybersecurity
            </span>
            <span className="text-white"> Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive cybersecurity solutions tailored to modern businesses.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="relative">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-8 py-4 font-semibold text-white rounded-full relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #2B7BE4 0%, #FF5CA8 50%, #7C3AED 100%)",
              boxShadow: "0 0 40px rgba(43, 123, 228, 0.25)",
            }}
          >
            <span className="relative z-10">View All Services</span>
            <FiArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          
          </Link>
        </div>
      </div>
    </section>
  );
}