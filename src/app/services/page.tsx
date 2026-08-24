import type { Metadata } from "next";
import Link from "next/link";
import {
  FiShield, FiGlobe, FiSmartphone, FiCloud, FiCode, FiCpu,
  FiTarget, FiAlertTriangle, FiClipboard, FiBarChart2,
  FiUsers, FiBookOpen, FiServer, FiArrowRight, FiPhone,
} from "react-icons/fi";
import { services, categories } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Cybersecurity Services in India | VAPT, Compliance & Managed Security | Cybria Secure",
  description:
    "Complete cybersecurity services across India — Web App VAPT, Network Security, OT/SCADA, Red Teaming, RBI Compliance, ISO 27001, Incident Response and Security Training. Based in Kolhapur, serving pan-India.",
  keywords: [
    "cybersecurity services India",
    "VAPT India",
    "network security audit India",
    "RBI compliance India",
    "ISO 27001 India",
    "incident response India",
    "red teaming India",
    "OT SCADA security India",
    "security awareness training India",
    "cybersecurity company Kolhapur",
  ],
  alternates: { canonical: "https://www.cybriasecure.com/services" },
  openGraph: {
    title: "Cybersecurity Services | Cybria Secure",
    description: "VAPT, compliance, managed security and training — complete cybersecurity services for Indian businesses.",
    url: "https://www.cybriasecure.com/services",
    type: "website",
  },
};

const iconMap: Record<string, React.ElementType> = {
  FiGlobe: FiGlobe,
  FiServer: FiServer,
  FiSmartphone: FiSmartphone,
  FiCloud: FiCloud,
  FiCode: FiCode,
  FiCpu: FiCpu,
  FiTarget: FiTarget,
  FiAlertTriangle: FiAlertTriangle,
  FiClipboard: FiClipboard,
  FiShield: FiShield,
  FiBarChart2: FiBarChart2,
  FiUsers: FiUsers,
  FiBookOpen: FiBookOpen,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cybersecurity Services by Cybria Secure",
  description: "Complete cybersecurity services for Indian businesses — VAPT, compliance, managed security and training.",
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.shortDesc,
    url: `https://www.cybriasecure.com/services/${s.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#0b1220]">

        {/* Hero */}
        <section className="pt-28 pb-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-6 bg-blue-400/5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              What We Offer
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Complete </span>
              <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Cybersecurity
              </span>
              <span className="text-white"> Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              From penetration testing to compliance and managed security — comprehensive protection for Indian businesses of every size, sector and location.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} className="px-4 py-2 text-sm font-medium rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services by Category */}
        <div className="container mx-auto max-w-6xl px-4 pb-20 space-y-20">
          {categories.map((cat) => {
            const catServices = services.filter((s) => s.category === cat.id);
            if (!catServices.length) return null;
            return (
              <section key={cat.id} id={cat.id}>
                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gray-800" />
                  <h2 className="text-lg font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: cat.color }}>
                    {cat.label}
                  </h2>
                  <div className="h-px flex-1 bg-gray-800" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catServices.map((service) => {
                    const Icon = iconMap[service.iconName] || FiShield;
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group bg-[#141d2e] rounded-2xl p-6 border border-gray-800 hover:border-transparent transition-all duration-300 flex flex-col relative overflow-hidden hover:shadow-[0_8px_40px_var(--glow)]"
                        style={{ "--glow": service.glowColor } as React.CSSProperties}
                      >
                        {/* Top gradient accent */}
                        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <h3 className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-[#2B7BE4] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                          {service.shortDesc}
                        </p>

                        <div className="flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: service.accentColor }}>
                          Explore Service <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <section className="py-16 px-4 border-t border-gray-800/60">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="rounded-2xl p-10 md:p-14" style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Talk to our team. We'll assess your current security posture and recommend the right starting point — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl" style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Get Free Consultation
                </Link>
                <a href="tel:+918080424274" className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  <FiPhone className="w-4 h-4" /> +91 80804 24274
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}