"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiShield, FiGlobe, FiSmartphone, FiCloud, FiCode, FiCpu,
  FiTarget, FiAlertTriangle, FiClipboard, FiBarChart2,
  FiUsers, FiBookOpen, FiServer, FiArrowRight, FiMonitor,
  FiEye, FiLock, FiActivity,
} from "react-icons/fi";

type Tab = "offensive" | "managed" | "compliance" | "emerging";

const tabs: { id: Tab; label: string }[] = [
  { id: "offensive",  label: "Offensive Security" },
  { id: "managed",   label: "Managed Services" },
  { id: "compliance",label: "Compliance" },
  { id: "emerging",  label: "AI & Emerging" },
];

const servicesByTab: Record<Tab, { slug: string; title: string; desc: string; icon: React.ElementType; isNew?: boolean }[]> = {
  offensive: [
    { slug: "web-application-vapt",    title: "Web App VAPT",         desc: "OWASP-based manual and automated testing for web vulnerabilities, business logic and API flaws.",                icon: FiGlobe },
    { slug: "api-security-testing",    title: "API Security Testing",  desc: "REST, GraphQL and SOAP API testing against OWASP API Top 10 — BOLA, broken auth and data exposure.",         icon: FiCode },
    { slug: "cloud-security-assessment",title: "Cloud Security",       desc: "AWS, Azure and GCP configuration review — IAM, storage exposure, encryption and network controls.",           icon: FiCloud },
    { slug: "red-teaming",             title: "Red Team Operations",   desc: "Full-scope adversary simulation across digital, physical and social engineering vectors.",                     icon: FiTarget },
    { slug: "ot-scada-security",       title: "OT / SCADA Security",  desc: "Non-intrusive assessment for industrial control systems, SCADA and OT/IT convergence environments.",          icon: FiCpu },
    { slug: "network-security-audit",  title: "Network Security",      desc: "Infrastructure penetration testing, segmentation review, Active Directory assessment and wireless testing.",   icon: FiServer },
    { slug: "mobile-app-security",     title: "Mobile App Security",   desc: "iOS and Android security testing — data storage, authentication, SSL pinning and reverse engineering.",       icon: FiSmartphone },
  ],
  managed: [
    { slug: "incident-response",         title: "Incident Response",        desc: "24/7 rapid response to contain, investigate and recover from ransomware, breaches and insider threats.",     icon: FiAlertTriangle },
    { slug: "vciso",                     title: "Virtual CISO (vCISO)",     desc: "Fractional CISO service — strategic leadership, Board reporting and compliance management.",                icon: FiUsers },
    { slug: "governance-risk-assessment",title: "Virtual Security Team",    desc: "Extend your security team with our dedicated cybersecurity professionals and risk advisory experts.",       icon: FiShield },
    { slug: "governance-risk-assessment",title: "Security Monitoring",      desc: "Continuous monitoring governance, threat detection and security posture management.",                        icon: FiEye },
    { slug: "incident-response",         title: "Threat Intelligence",      desc: "Proactive cyber threat intelligence to anticipate and neutralize threats before they impact your business.", icon: FiActivity },
    { slug: "vciso",                     title: "Access Control Review",     desc: "Privileged access management, identity governance and zero-trust access control review.",                   icon: FiLock },
  ],
  compliance: [
    { slug: "rbi-compliance",            title: "RBI Cybersecurity",        desc: "End-to-end RBI Master Directions compliance for cooperative banks, UCBs and NBFCs.",                       icon: FiClipboard },
    { slug: "iso-27001",                 title: "ISO 27001:2022",           desc: "ISMS implementation, gap analysis, risk assessment and certification audit support.",                        icon: FiShield },
    { slug: "governance-risk-assessment",title: "SOC 2",                    desc: "Trust services criteria audit for security, availability, confidentiality and privacy.",                    icon: FiBarChart2 },
    { slug: "governance-risk-assessment",title: "PCI-DSS 4.0",             desc: "Payment card industry compliance for secure payment processing environments.",                               icon: FiLock },
    { slug: "governance-risk-assessment",title: "GDPR / DPDPA",            desc: "European and Indian data protection regulation compliance, consulting and implementation.",                   icon: FiClipboard },
    { slug: "governance-risk-assessment",title: "GRC Framework",           desc: "Governance, risk and compliance framework aligned with your regulatory obligations and business objectives.", icon: FiBarChart2 },
    { slug: "governance-risk-assessment",title: "HIPAA / IRDAI",           desc: "Healthcare and insurance sector data protection compliance frameworks.",                                     icon: FiShield },
    { slug: "governance-risk-assessment",title: "NIST CSF",                desc: "NIST Cybersecurity Framework implementation and maturity assessment for your organization.",                 icon: FiBarChart2 },
  ],
  emerging: [
    { slug: "web-application-vapt",      title: "AI / LLM Security Audit", desc: "Security assessment of AI/ML models, LLM integrations and AI pipelines for vulnerabilities.",             icon: FiMonitor, isNew: true },
    { slug: "governance-risk-assessment",title: "DevSecOps Integration",   desc: "Security-first CI/CD pipeline design with automated vulnerability scanning and SAST/DAST.",               icon: FiCode, isNew: true },
    { slug: "cloud-security-assessment", title: "Zero Trust Framework",    desc: "Design and implement zero trust architecture across your cloud and on-premises infrastructure.",          icon: FiShield },
    { slug: "governance-risk-assessment",title: "AI Maturity Assessment",  desc: "Assess your organization's AI security posture and implement ISO 42001 AI management controls.",         icon: FiActivity, isNew: true },
    { slug: "governance-risk-assessment",title: "SBOM & SCA",              desc: "Software bill of materials and software composition analysis for supply chain security.",                 icon: FiCode },
    { slug: "governance-risk-assessment",title: "Secure Code Review",      desc: "Manual and automated source code review to identify security vulnerabilities before deployment.",         icon: FiCode },
  ],
};

// Featured 4 highlight cards — matching Brisk's "high-value" section
const featured = [
  {
    slug: "web-application-vapt",
    badge: "CERT-In Approved",
    title: "Penetration Testing (VAPT)",
    desc: "Comprehensive vulnerability assessment and penetration testing for web, mobile, API, network, cloud and OT environments using OWASP methodologies.",
    bullets: ["OWASP-aligned testing methodology", "Certified ethical hackers (CEH/OSCP)", "Actionable remediation roadmap"],
    gradient: "from-[#2B7BE4] to-[#3B82F6]",
    accentColor: "#2B7BE4",
  },
  {
    slug: "incident-response",
    badge: "24/7 Operations",
    title: "Incident Response",
    desc: "24/7 emergency response with forensic investigation, RBI notification support and full recovery — minimising damage and downtime.",
    bullets: ["24/7 response availability", "Digital forensics (DFIR)", "RBI 6-hour notification support"],
    gradient: "from-[#FF5CA8] to-[#EC4899]",
    accentColor: "#FF5CA8",
  },
  {
    slug: "red-teaming",
    badge: "Adversary Simulation",
    title: "Red Team Operations",
    desc: "Full-spectrum adversary simulation including social engineering, physical security testing and multi-vector digital attacks.",
    bullets: ["Real-world adversary simulation", "Multi-vector attack surface testing", "Detection gap analysis"],
    gradient: "from-[#EF4444] to-[#B91C1C]",
    accentColor: "#EF4444",
  },
  {
    slug: "iso-27001",
    badge: "Compliance",
    title: "ISO 27001 Certification",
    desc: "End-to-end ISO 27001:2022 ISMS implementation, gap assessment, risk management and certification audit support.",
    bullets: ["Gap analysis & risk assessment", "Full ISMS documentation", "Certification audit support"],
    gradient: "from-[#7C3AED] to-[#8B5CF6]",
    accentColor: "#7C3AED",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<Tab>("offensive");

  return (
    <section className="py-20 bg-[#0b1220] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-5 bg-blue-400/5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-white">Expert Security </span>
            <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Across Every Layer
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From penetration testing to compliance — our certified team delivers measurable risk reduction.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-white border-transparent"
                  : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
              }`}
              style={activeTab === tab.id ? { background: "linear-gradient(135deg,#2B7BE4,#7C3AED)" } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabbed service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-14">
          {servicesByTab[activeTab].map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={`${service.slug}-${i}`}
                href={`/services/${service.slug}`}
                className="group flex items-start gap-4 bg-[#141d2e] rounded-xl p-5 border border-gray-800 hover:border-[#2B7BE4]/40 hover:bg-[#1a2440] transition-all duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] flex items-center justify-center mt-0.5">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm group-hover:text-[#2B7BE4] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    {service.isNew && (
                      <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-1.5 py-0.5">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{service.desc}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs font-medium text-[#2B7BE4] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <FiArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-6xl mx-auto mb-12">
          <div className="h-px flex-1 bg-gray-800" />
          <span className="text-xs uppercase tracking-widest text-gray-600 font-semibold">High-Value Services</span>
          <div className="h-px flex-1 bg-gray-800" />
        </div>

        {/* Featured 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
          {featured.map((f) => (
            <div key={f.title} className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col relative overflow-hidden group">
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.gradient}`} />
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit"
                style={{ color: f.accentColor, background: `${f.accentColor}15`, border: `1px solid ${f.accentColor}30` }}>
                {f.badge}
              </span>
              <h3 className="text-white font-bold text-lg mb-3 leading-snug">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{f.desc}</p>
              <ul className="space-y-2 mb-5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: f.accentColor }} />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${f.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5"
                style={{ color: f.accentColor }}>
                Learn More <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center">
          <Link href="/services"
            className="group inline-flex items-center gap-2.5 px-8 py-4 font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", boxShadow: "0 0 40px rgba(43,123,228,0.2)" }}>
            View All Services
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <p className="text-gray-500 text-sm mt-3">13 services across 5 categories · Remote & On-site delivery</p>
        </div>
      </div>
    </section>
  );
}