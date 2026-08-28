import type { Metadata } from "next";
import Link from "next/link";
import {
  FiShield, FiClipboard, FiBarChart2, FiCreditCard,
  FiLock, FiHeart, FiCpu, FiArrowRight,
} from "react-icons/fi";
import { complianceFrameworks } from "@/lib/complianceData";

export const metadata: Metadata = {
  title: "Compliance Services | ISO 27001, RBI, PCI-DSS, DPDPA & More | Cybria Secure",
  description: "End-to-end compliance consulting for ISO 27001, RBI Framework, SOC 2, PCI-DSS, DPDPA, HIPAA, NIST CSF and IEC 62443. Indian businesses, pan-India delivery.",
  keywords: ["ISO 27001 India", "RBI compliance India", "SOC 2 India", "PCI-DSS India", "DPDPA compliance", "HIPAA India", "NIST CSF India", "IEC 62443 India"],
  alternates: { canonical: "https://www.cybriasecure.com/compliance" },
  openGraph: {
    title: "Compliance Services | Cybria Secure",
    description: "ISO 27001, RBI, SOC 2, PCI-DSS, DPDPA, HIPAA, NIST CSF, IEC 62443 — complete compliance consulting for Indian businesses.",
    url: "https://www.cybriasecure.com/compliance",
    type: "website",
  },
};

const iconMap: Record<string, React.ElementType> = {
  FiShield, FiClipboard, FiBarChart2, FiCreditCard, FiLock, FiHeart, FiCpu,
};

const categoryOrder = ["Indian Regulations", "International Standards", "Industry Standards"];

export default function CompliancePage() {
  const grouped = categoryOrder.map((cat) => ({
    cat,
    items: complianceFrameworks.filter((f) => f.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-[#0b1220]">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-400 border border-violet-400/20 rounded-full px-4 py-2 mb-6 bg-violet-400/5">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Governance & Compliance
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Compliance Made </span>
            <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Simple
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Navigate complex regulatory requirements with confidence. We handle the complexity — you focus on your business.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {complianceFrameworks.map((f) => (
              <a key={f.slug} href={`#${f.category.toLowerCase().replace(/\s+/g, "-").replace(/[&/]/g, "")}`}
                className="px-4 py-2 text-sm font-semibold rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
                {f.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks by Category */}
      <div className="container mx-auto max-w-6xl px-4 pb-20 space-y-16">
        {grouped.map(({ cat, items }) => (
          <section key={cat} id={cat.toLowerCase().replace(/\s+/g, "-").replace(/[&/]/g, "")}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gray-800" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-violet-400 whitespace-nowrap">{cat}</h2>
              <div className="h-px flex-1 bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((framework) => {
                const Icon = iconMap[framework.iconName] || FiShield;
                return (
                  <Link key={framework.slug} href={`/compliance/${framework.slug}`}
                    className="group bg-[#141d2e] rounded-2xl p-6 border border-gray-800 hover:border-[#7C3AED]/40 hover:bg-[#1a2440] transition-all duration-300 flex flex-col relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${framework.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${framework.gradient} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#0b1220] border border-gray-800 text-gray-500">
                        {framework.shortTitle}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-[#7C3AED] transition-colors">
                      {framework.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{framework.shortDesc}</p>

                    <div className="flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: framework.accentColor }}>
                      Explore Compliance <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/60">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="rounded-2xl p-10 md:p-14" style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not Sure Which Framework You Need?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Different businesses have different compliance obligations. Talk to our team — we'll map out exactly what applies to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                Get Compliance Assessment
              </Link>
              <a href="tel:+918080424274" className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all">
                +91 80804 24274
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}