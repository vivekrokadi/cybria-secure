import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FiShield, FiClipboard, FiBarChart2, FiCreditCard,
  FiLock, FiHeart, FiCpu, FiArrowRight, FiCheck,
  FiChevronDown, FiArrowLeft, FiPhone,
  FiGlobe, FiSmartphone, FiCloud, FiCode,
  FiTarget, FiAlertTriangle, FiUsers, FiBookOpen, FiServer,
} from "react-icons/fi";
import { complianceFrameworks, getComplianceBySlug } from "@/lib/complianceData";

const iconMap: Record<string, React.ElementType> = {
  FiShield, FiClipboard, FiBarChart2, FiCreditCard, FiLock,
  FiHeart, FiCpu, FiGlobe, FiSmartphone, FiCloud, FiCode,
  FiTarget, FiAlertTriangle, FiUsers, FiBookOpen, FiServer,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fw = getComplianceBySlug(slug);
  if (!fw) return { title: "Compliance Not Found" };
  return {
    title: `${fw.title} Compliance Services | Cybria Secure`,
    description: fw.shortDesc,
    alternates: { canonical: `https://www.cybriasecure.com/compliance/${slug}` },
    openGraph: {
      title: `${fw.title} | Cybria Secure`,
      description: fw.shortDesc,
      url: `https://www.cybriasecure.com/compliance/${slug}`,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return complianceFrameworks.map((f) => ({ slug: f.slug }));
}

export default async function ComplianceDetailPage({ params }: Props) {
  const { slug } = await params;
  const fw = getComplianceBySlug(slug);
  if (!fw) notFound();

  const Icon = iconMap[fw.iconName] || FiShield;
  const related = complianceFrameworks.filter((f) => f.slug !== slug).slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fw.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${fw.title} Compliance Services`,
    description: fw.shortDesc,
    url: `https://www.cybriasecure.com/compliance/${fw.slug}`,
    provider: {
      "@type": "Organization",
      name: "Cybria Secure",
      url: "https://www.cybriasecure.com",
      telephone: "+918080424274",
    },
    areaServed: { "@type": "Country", name: "India" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-[#0b1220]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="pt-28 pb-14 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `${fw.accentColor}15` }} />

          <div className="container mx-auto max-w-6xl relative">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link>
              <span>/</span>
              <span className="text-gray-400">{fw.shortTitle}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border rounded-full px-4 py-2 mb-6"
                  style={{ color: fw.accentColor, borderColor: `${fw.accentColor}30`, background: `${fw.accentColor}08` }}>
                  <Icon className="w-3.5 h-3.5" />
                  {fw.category}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{fw.title}</h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{fw.heroDesc}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-7 py-4 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                    Get Compliance Assessment
                  </Link>
                  <a href="tel:+918080424274" className="px-7 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
                    <FiPhone className="w-4 h-4" /> Call Us
                  </a>
                </div>
              </div>

              {/* Who needs it card */}
              <div className="bg-[#141d2e] rounded-2xl p-7 border border-gray-800 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${fw.gradient}`} />
                <h3 className="text-white font-bold text-lg mb-5">Who Needs {fw.shortTitle}?</h3>
                <ul className="space-y-3">
                  {fw.whoNeedsIt.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${fw.accentColor}, #7C3AED)` }}>
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-gray-800">
                  <Link href="/contact" className="block w-full text-center py-3 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${fw.accentColor}, #7C3AED)` }}>
                    Start {fw.shortTitle} Journey
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO ────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">How We Help You Achieve {fw.shortTitle}</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              A structured, proven approach — from gap assessment through to certification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {fw.whatWeDo.map((item, i) => (
                <div key={i} className="bg-[#141d2e] rounded-xl p-6 border border-gray-800 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${fw.gradient}`} />
                  <div className="text-2xl font-black mb-3 leading-none"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEY REQUIREMENTS + BENEFITS ───────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Key Requirements</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Core obligations you must satisfy to achieve {fw.title} compliance.
                </p>
                <div className="space-y-3">
                  {fw.keyRequirements.map((req) => (
                    <div key={req} className="flex items-start gap-3 bg-[#141d2e] rounded-xl p-4 border border-gray-800">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${fw.accentColor}, #7C3AED)` }}>
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-snug">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Key Benefits</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  What achieving {fw.shortTitle} compliance means for your business.
                </p>
                <div className="space-y-4">
                  {fw.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-4 bg-[#141d2e] rounded-xl p-5 border border-gray-800">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${fw.accentColor}, #7C3AED)` }}>
                        {i + 1}
                      </div>
                      <span className="text-gray-300 leading-relaxed pt-1">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl p-6 text-center"
                  style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.1),rgba(124,58,237,0.1))", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-white font-semibold mb-4">Ready to get {fw.shortTitle} certified?</p>
                  <Link href="/contact" className="inline-block px-6 py-3 text-white font-semibold rounded-full text-sm transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                    Start Today
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MID CTA ───────────────────────────────────────────────────── */}
        <section className="py-10 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: `linear-gradient(135deg, ${fw.accentColor}12, rgba(124,58,237,0.10))`, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Achieve {fw.shortTitle} Compliance Faster</h3>
                <p className="text-gray-400">Free scoping call. Transparent pricing. Expert guidance.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/contact" className="px-7 py-3.5 text-white font-semibold rounded-full text-sm transition-all hover:scale-105 whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Book Free Consultation
                </Link>
                <a href="tel:+918080424274" className="px-7 py-3.5 border border-gray-700 text-white font-semibold rounded-full text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  <FiPhone className="w-4 h-4" /> +91 80804 24274
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ──────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {fw.relatedServices.map((svc) => (
                <Link key={svc.slug + svc.title} href={`/services/${svc.slug}`}
                  className="group bg-[#141d2e] rounded-xl p-5 border border-gray-800 hover:border-[#2B7BE4]/40 hover:bg-[#1a2440] transition-all duration-300">
                  <div className="w-2 h-2 rounded-full mb-3 flex-shrink-0" style={{ background: fw.accentColor }} />
                  <h3 className="text-white font-semibold text-sm group-hover:text-[#2B7BE4] transition-colors mb-1">{svc.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#2B7BE4] opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                    Explore <FiArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        {fw.faqs.length > 0 && (
          <section className="py-16 px-4 bg-[#0d1628]">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {fw.faqs.map((faq, i) => (
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

        {/* ── OTHER FRAMEWORKS ──────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Other Compliance Frameworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((f) => {
                const RelIcon = iconMap[f.iconName] || FiShield;
                return (
                  <Link key={f.slug} href={`/compliance/${f.slug}`}
                    className="group bg-[#141d2e] rounded-xl p-5 border border-gray-800 hover:border-[#7C3AED]/40 hover:bg-[#1a2440] transition-all duration-300 flex items-start gap-4">
                    <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center`}>
                      <RelIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#7C3AED] transition-colors">{f.shortTitle}</h3>
                      <p className="text-gray-500 text-xs leading-snug line-clamp-2">{f.shortDesc}</p>
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
            <div className="rounded-2xl p-10 md:p-14"
              style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Your {fw.shortTitle} Journey
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Certified compliance experts. Transparent process. Free scoping call — no commitment required.
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
              <p className="mt-6 text-gray-500 text-sm">Based in Kolhapur · Serving all of India · Remote & On-site</p>
            </div>
          </div>
        </section>

        <div className="pb-8 px-4 text-center">
          <Link href="/compliance" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
            <FiArrowLeft className="w-4 h-4" /> Back to all Compliance Frameworks
          </Link>
        </div>
      </div>
    </>
  );
}