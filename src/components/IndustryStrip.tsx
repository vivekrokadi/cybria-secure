import Link from "next/link";
import {
  FiCreditCard, FiHeart, FiSettings, FiFlag,
  FiShoppingCart, FiMonitor, FiZap, FiPhone,
} from "react-icons/fi";

const industries = [
  { id: "bfsi",           label: "BFSI",              icon: FiCreditCard,   desc: "Banks, NBFCs, cooperative banks and fintech",   slug: "bfsi" },
  { id: "healthcare",     label: "Healthcare",         icon: FiHeart,        desc: "Hospitals, pharma and health-tech companies",    slug: "healthcare" },
  { id: "manufacturing",  label: "Manufacturing",      icon: FiSettings,     desc: "Foundry, textile, auto and industrial OT/IT",   slug: "manufacturing" },
  { id: "government",     label: "Government",         icon: FiFlag,         desc: "PSUs, municipalities and government agencies",   slug: "government" },
  { id: "retail",         label: "Retail & E-Commerce",icon: FiShoppingCart, desc: "E-commerce, retail and payment platforms",       slug: "retail" },
  { id: "technology",     label: "Technology",         icon: FiMonitor,      desc: "IT, SaaS, startups and software companies",     slug: "technology" },
  { id: "energy",         label: "Energy & Utilities", icon: FiZap,          desc: "Power, utilities and critical infrastructure",   slug: "energy" },
  { id: "telecom",        label: "Telecom",            icon: FiPhone,        desc: "Telecom operators and communication firms",      slug: "telecom" },
];

export default function IndustryStrip() {
  return (
    <section className="py-20 bg-[#0d1628]">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-5 bg-blue-400/5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Industries
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Securing Every Sector
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Deep domain expertise across critical industries with security frameworks tailored to sector-specific threats and compliance requirements.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-6xl mx-auto mb-10">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col items-center text-center p-4 bg-[#141d2e] rounded-xl border border-gray-800 hover:border-[#2B7BE4]/40 hover:bg-[#1a2440] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 border border-[#2B7BE4]/20 flex items-center justify-center mb-3 group-hover:from-[#2B7BE4]/30 group-hover:to-[#7C3AED]/30 transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#2B7BE4]" />
                </div>
                <span className="text-white text-xs font-semibold group-hover:text-[#2B7BE4] transition-colors leading-tight">
                  {ind.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-[#2B7BE4] font-medium text-sm hover:text-[#FF5CA8] transition-colors"
          >
            View All Industries →
          </Link>
        </div>

      </div>
    </section>
  );
}