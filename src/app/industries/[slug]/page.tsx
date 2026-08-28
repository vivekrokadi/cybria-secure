import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FiCreditCard, FiHeart, FiSettings, FiFlag,
  FiShoppingCart, FiMonitor, FiZap, FiPhone,
  FiShield, FiGlobe, FiSmartphone, FiCloud, FiCode, FiCpu,
  FiTarget, FiAlertTriangle, FiClipboard, FiBarChart2, FiUsers, FiBookOpen, FiServer,
  FiArrowRight, FiCheck, FiAlertOctagon, FiChevronDown, FiArrowLeft,
} from "react-icons/fi";
import { industries, getIndustryBySlug } from "@/lib/industriesData";

const iconMap: Record<string, React.ElementType> = {
  FiCreditCard, FiHeart, FiSettings, FiFlag,
  FiShoppingCart, FiMonitor, FiZap, FiPhone,
  FiShield, FiGlobe, FiSmartphone, FiCloud, FiCode, FiCpu,
  FiTarget, FiAlertTriangle, FiClipboard, FiBarChart2, FiUsers, FiBookOpen, FiServer,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.title} Cybersecurity | Cybria Secure`,
    description: industry.shortDesc,
    alternates: { canonical: `https://www.cybriasecure.com/industries/${slug}` },
    openGraph: {
      title: `${industry.title} Cybersecurity | Cybria Secure`,
      description: industry.shortDesc,
      url: `https://www.cybriasecure.com/industries/${slug}`,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const Icon = iconMap[industry.iconName] || FiMonitor;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.title} Cybersecurity`,
    description: industry.shortDesc,
    url: `https://www.cybriasecure.com/industries/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Cybria Secure",
      url: "https://www.cybriasecure.com",
      telephone: "+918080424274",
    },
    areaServed: { "@type": "Country", name: "India" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const relatedIndustries = industries.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-[#0b1220]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="pt-28 pb-14 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `${industry.accentColor}18` }} />

          <div className="container mx-auto max-w-6xl relative">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>
              <span>/</span>
              <span className="text-gray-400">{industry.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border rounded-full px-4 py-2 mb-6"
                  style={{ color: industry.accentColor, borderColor: `${industry.accentColor}30`, background: `${industry.accentColor}08` }}>
                  <Icon className="w-3.5 h-3.5" />
                  Industry Security
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {industry.title}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{industry.heroDesc}</p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-7 py-4 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                    Get Industry Assessment
                  </Link>
                  <a href="tel:+918080424274" className="px-7 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
                    <FiPhone className="w-4 h-4" /> Call Us
                  </a>
                </div>
              </div>

              {/* Stats card */}
              <div className="bg-[#141d2e] rounded-2xl p-7 border border-gray-800">
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${industry.gradient} rounded-t-2xl`} />
                <h3 className="text-white font-bold text-lg mb-6">Key Numbers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {industry.stats.map((stat) => (
                    <div key={stat.label} className="bg-[#0b1220] rounded-xl p-4 border border-gray-800 text-center">
                      <div className="text-xl font-bold mb-1" style={{ color: industry.accentColor }}>{stat.value}</div>
                      <div className="text-gray-500 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-gray-800">
                  <p className="text-gray-500 text-xs mb-3">Applicable Regulations</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.regulations.map((reg) => (
                      <span key={reg} className="text-xs bg-[#0b1220] border border-gray-800 text-gray-400 rounded-full px-2.5 py-1">
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THREATS ───────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Threats Facing {industry.title.split(" ")[0]} Organizations
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Understanding the threat landscape is the first step to building effective defences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {industry.threats.map((threat, i) => (
                <div key={i} className="bg-[#141d2e] rounded-xl p-5 border border-gray-800 flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5">
                    <FiAlertOctagon className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <span className="text-gray-300 text-sm leading-snug">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Our Services for {industry.title.split(",")[0].split("(")[0].trim()}
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Tailored to the specific risks, compliance requirements and attack surfaces of your sector.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {industry.services.map((svc) => (
                <Link key={svc.slug + svc.title} href={`/services/${svc.slug}`}
                  className="group bg-[#141d2e] rounded-xl p-6 border border-gray-800 hover:border-[#2B7BE4]/40 hover:bg-[#1a2440] transition-all duration-300 flex flex-col">
                  <div className="w-2 h-2 rounded-full mb-4 flex-shrink-0" style={{ background: industry.accentColor }} />
                  <h3 className="text-white font-bold mb-2 group-hover:text-[#2B7BE4] transition-colors">{svc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{svc.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#2B7BE4] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MID CTA ───────────────────────────────────────────────────── */}
        <section className="py-10 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: `linear-gradient(135deg, ${industry.accentColor}12, rgba(124,58,237,0.10))`, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Protect Your {industry.title.split(",")[0].split("(")[0].trim()} Organization
                </h3>
                <p className="text-gray-400">Free assessment call. Sector-specific guidance. No obligation.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/contact" className="px-7 py-3.5 text-white font-semibold rounded-full text-sm transition-all hover:scale-105 whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Book Free Assessment
                </Link>
                <a href="tel:+918080424274" className="px-7 py-3.5 border border-gray-700 text-white font-semibold rounded-full text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  <FiPhone className="w-4 h-4" /> +91 80804 24274
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE ────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Applicable Compliance Frameworks</h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
              We align all assessments with the regulations and standards that govern your sector.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {industry.regulations.map((reg) => (
                <div key={reg} className="flex items-center gap-2.5 bg-[#141d2e] border border-gray-800 rounded-xl px-5 py-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${industry.accentColor}, #7C3AED)` }}>
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">{reg}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        {industry.faqs.length > 0 && (
          <section className="py-16 px-4 bg-[#0d1628]">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {industry.faqs.map((faq, i) => (
                  <details key={i} className="group bg-[#141d2e] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                      <span className="text-white font-semibold pr-4 leading-snug">{faq.q}</span>
                      <FiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-5">
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── RELATED INDUSTRIES ────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Other Industries We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedIndustries.map((ind) => {
                const RelIcon = iconMap[ind.iconName] || FiMonitor;
                return (
                  <Link key={ind.slug} href={`/industries/${ind.slug}`}
                    className="group bg-[#141d2e] rounded-xl p-5 border border-gray-800 hover:border-[#2B7BE4]/40 hover:bg-[#1a2440] transition-all duration-300 flex items-start gap-4">
                    <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${ind.gradient} flex items-center justify-center`}>
                      <RelIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#2B7BE4] transition-colors leading-snug">{ind.title}</h3>
                      <p className="text-gray-500 text-xs">{ind.regulations.slice(0, 2).join(" · ")}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="rounded-2xl p-10 md:p-14" style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Secure Your Organization?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Sector-specific expertise. Certified professionals. Free consultation — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Get Free Consultation
                </Link>
                <a href="tel:+918080424274" className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all">
                  Call +91 80804 24274
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="pb-8 px-4 text-center">
          <Link href="/industries" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
            <FiArrowLeft className="w-4 h-4" /> Back to all Industries
          </Link>
        </div>
      </div>
    </>
  );
}