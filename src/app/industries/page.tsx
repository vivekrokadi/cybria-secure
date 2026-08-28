import type { Metadata } from "next";
import Link from "next/link";
import {
  FiCreditCard, FiHeart, FiSettings, FiFlag,
  FiShoppingCart, FiMonitor, FiZap, FiPhone, FiArrowRight,
} from "react-icons/fi";
import { industries } from "@/lib/industriesData";

export const metadata: Metadata = {
  title: "Industries We Serve | Cybersecurity Across Every Sector | Cybria Secure",
  description: "Cybria Secure delivers sector-specific cybersecurity for BFSI, Healthcare, Manufacturing, Government, Retail, Technology, Energy and Telecom. Deep domain expertise, tailored frameworks.",
  keywords: ["cybersecurity BFSI India", "healthcare cybersecurity India", "manufacturing OT security", "government cybersecurity India", "retail PCI-DSS India"],
  alternates: { canonical: "https://www.cybriasecure.com/industries" },
  openGraph: {
    title: "Industries We Serve | Cybria Secure",
    description: "Sector-specific cybersecurity for every major Indian industry vertical.",
    url: "https://www.cybriasecure.com/industries",
    type: "website",
  },
};

const iconMap: Record<string, React.ElementType> = {
  FiCreditCard, FiHeart, FiSettings, FiFlag,
  FiShoppingCart, FiMonitor, FiZap, FiPhone,
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-[#0b1220]">

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-6 bg-blue-400/5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Industries
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Security Tailored to </span>
            <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Your Industry
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Generic cybersecurity doesn't work. Every industry has unique threats, compliance obligations and attack surfaces. Cybria Secure brings deep domain expertise across 8 critical sectors.
          </p>
        </div>
      </section>

      {/* Industry grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {industries.map((industry) => {
              const Icon = iconMap[industry.iconName] || FiMonitor;
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group bg-[#141d2e] rounded-2xl p-7 border border-gray-800 hover:border-[#2B7BE4]/40 hover:bg-[#1a2440] transition-all duration-300 flex gap-5 relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mt-0.5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-[#2B7BE4] transition-colors">
                      {industry.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{industry.shortDesc}</p>

                    {/* Key regulations */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {industry.regulations.slice(0, 3).map((reg) => (
                        <span key={reg} className="text-xs bg-[#0b1220] border border-gray-800 text-gray-500 rounded-full px-2.5 py-1">
                          {reg}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#2B7BE4] opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore Industry Security <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/60">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="rounded-2xl p-10 md:p-14" style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Industry?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              We serve organizations across all sectors. Talk to our team — we'll tailor a security program to your specific environment and risk profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                Talk to Our Team
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