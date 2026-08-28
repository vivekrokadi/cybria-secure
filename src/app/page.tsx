import type { Metadata } from "next";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Clients from "../components/Clients";
import Testimonials from "../components/Testimonials";
import IndustryStrip from "../components/IndustryStrip";
import HomeFAQ from "../components/HomeFAQ";
import ScrollReveal from "../components/ScrollReveal";
import Link from "next/link";
import {
  FiShield, FiUsers, FiTarget, FiAward, FiClock,
  FiGlobe, FiArrowRight, FiPhone, FiCheckCircle,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Cybria Secure | Cybersecurity Risk Advisory | VAPT & Compliance India",
  description:
    "Reduce Business Risk. Not Just Fix Vulnerabilities. Leading cybersecurity risk advisory firm — VAPT, RBI Compliance, ISO 27001, Incident Response, Red Teaming. 640+ clients across 30+ countries.",
  keywords: [
    "cybersecurity company India",
    "VAPT India",
    "cybersecurity Kolhapur",
    "RBI compliance India",
    "ISO 27001 India",
    "incident response India",
    "red teaming India",
    "cybersecurity risk advisory",
    "penetration testing India",
    "cybersecurity services Maharashtra",
  ],
  alternates: { canonical: "https://www.cybriasecure.com" },
  openGraph: {
    title: "Cybria Secure | Cybersecurity Risk Advisory India",
    description: "Reduce Business Risk. Not Just Fix Vulnerabilities. 640+ organizations secured across 30+ countries.",
    url: "https://www.cybriasecure.com",
    type: "website",
  },
};

// Why Choose Us data
const whyUs = [
  {
    icon: FiShield,
    title: "Certified Security Experts",
    desc: "CEH, OSCP, CISM certified professionals with deep hands-on experience across offensive security, compliance and incident response.",
  },
  {
    icon: FiTarget,
    title: "Outcome-Focused Testing",
    desc: "We don't just run scanners. Every engagement combines automated tools with manual testing by certified professionals — uncovering what automated tools miss.",
  },
  {
    icon: FiGlobe,
    title: "Pan-India & Global Reach",
    desc: "Headquartered in Kolhapur, serving 640+ organizations across 30+ countries. Remote-first delivery; on-site available anywhere in India.",
  },
  {
    icon: FiClock,
    title: "24/7 Incident Response",
    desc: "Security incidents don't follow business hours. Our incident response team is available 24/7 — remote response within 2 hours, on-site within 4.",
  },
  {
    icon: FiUsers,
    title: "Local Language Support",
    desc: "Security awareness training and advisory in Marathi, Hindi and English — removing communication barriers for Maharashtra's cooperative banks and businesses.",
  },
  {
    icon: FiAward,
    title: "RBI & Compliance Specialists",
    desc: "Deep expertise in RBI Master Directions, ISO 27001, PCI-DSS, DPDPA and other Indian and global compliance frameworks — with a 100% RBI audit pass rate.",
  },
];

// Approach steps
const approach = [
  { step: "01", title: "Understand", desc: "We start by understanding your business, assets, threat landscape and regulatory obligations — not just your IT systems." },
  { step: "02", title: "Assess", desc: "Manual and automated assessment by certified professionals. We find what scanners miss, including business logic flaws and chained attack paths." },
  { step: "03", title: "Report", desc: "Clear, actionable reports — executive summary for management, technical details for your team, evidence-backed findings for auditors." },
  { step: "04", title: "Remediate", desc: "We don't disappear after the report. Our team supports remediation, answers questions and re-tests fixes before sign-off." },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Trusted Clients */}
      <ScrollReveal>
        <Clients />
      </ScrollReveal>

      {/* 3 — Services (tabbed) */}
      <ScrollReveal>
        <Services />
      </ScrollReveal>

      {/* 4 — Our Approach */}
      <ScrollReveal>
        <section className="py-20 bg-[#0d1628]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-5 bg-blue-400/5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                How We Work
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Approach
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Security engagements that deliver real risk reduction — not just compliance paperwork.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {approach.map((item, i) => (
                <div key={item.step} className="relative bg-[#141d2e] rounded-2xl p-6 border border-gray-800">
                  {/* Connector line */}
                  {i < approach.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-5 h-px bg-gradient-to-r from-[#2B7BE4] to-[#7C3AED] z-10" />
                  )}
                  <div className="text-4xl font-black mb-4 leading-none"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {item.step}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5 — Industries */}
      <ScrollReveal>
        <IndustryStrip />
      </ScrollReveal>

      {/* 6 — Why Choose Us */}
      <ScrollReveal>
        <section className="py-20 bg-[#0b1220]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-5 bg-blue-400/5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                Why Cybria Secure
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Makes Us Different
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We reduce business risk — not just fix vulnerabilities. Here's what that means in practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyUs.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}
                    className="bg-[#141d2e] rounded-xl p-6 border border-gray-800 hover:border-[#2B7BE4]/30 hover:bg-[#1a2440] transition-all duration-300 group">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 border border-[#2B7BE4]/20 flex items-center justify-center mb-5 group-hover:from-[#2B7BE4]/30 group-hover:to-[#7C3AED]/30 transition-all">
                      <Icon className="w-5 h-5 text-[#2B7BE4]" />
                    </div>
                    <h3 className="text-white font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 7 — Testimonials */}
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      {/* 8 — Compliance strip */}
      <ScrollReveal>
        <section className="py-16 bg-[#0d1628] border-y border-gray-800/60">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">Compliance Frameworks We Support</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                End-to-end implementation and certification support for every major framework applicable to Indian businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-5xl mx-auto mb-8">
              {[
                { label: "RBI Framework", href: "/compliance/rbi-framework" },
                { label: "ISO 27001:2022", href: "/compliance/iso-27001" },
                { label: "SOC 2 Type II", href: "/compliance/soc2" },
                { label: "PCI-DSS 4.0", href: "/compliance/pci-dss" },
                { label: "DPDPA 2023", href: "/compliance/dpdpa" },
                { label: "HIPAA", href: "/compliance/hipaa" },
                { label: "NIST CSF 2.0", href: "/compliance/nist-csf" },
                { label: "IEC 62443", href: "/compliance/iec62443" },
              ].map((item) => (
                <Link key={item.label} href={item.href}
                  className="group flex flex-col items-center text-center p-3 bg-[#141d2e] rounded-xl border border-gray-800 hover:border-[#7C3AED]/40 hover:bg-[#1a2440] transition-all duration-300">
                  <FiCheckCircle className="w-4 h-4 text-[#7C3AED] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] font-semibold group-hover:text-[#7C3AED] transition-colors leading-tight">{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/compliance" className="inline-flex items-center gap-1.5 text-[#7C3AED] text-sm font-medium hover:text-[#FF5CA8] transition-colors">
                View All Compliance Services <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 9 — FAQ */}
      <ScrollReveal>
        <HomeFAQ />
      </ScrollReveal>

      {/* 10 — Final CTA */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-5xl">
            <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.15),rgba(255,92,168,0.08),rgba(124,58,237,0.15))", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#2B7BE4]/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-6 bg-blue-400/5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  Get Started Today
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                  Ready to Reduce Your<br />
                  <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Cybersecurity Risk?
                  </span>
                </h2>

                <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
                  Join 640+ organizations who trust Cybria Secure to protect their business. Free consultation — no commitment required.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-2xl"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                    Book a Security Assessment
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="tel:+918080424274"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-full hover:bg-white/5 hover:border-gray-500 transition-all">
                    <FiPhone className="w-4 h-4" />
                    +91 80804 24274
                  </a>
                </div>

                {/* Contact options */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Available 24/7 for emergencies
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Free scoping call
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    Serving India & Global
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}