import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FiShield, FiGlobe, FiSmartphone, FiCloud, FiCode, FiCpu,
  FiTarget, FiAlertTriangle, FiClipboard, FiBarChart2,
  FiUsers, FiBookOpen, FiServer, FiArrowRight, FiPhone,
  FiCheck, FiChevronDown, FiArrowLeft,
} from "react-icons/fi";
import { services, categories, getServiceBySlug } from "@/lib/servicesData";

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

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Cybria Secure — Cybersecurity Services India`,
    description: service.shortDesc,
    keywords: service.keywords,
    alternates: { canonical: `https://www.cybriasecure.com/services/${slug}` },
    openGraph: {
      title: `${service.title} | Cybria Secure`,
      description: service.shortDesc,
      url: `https://www.cybriasecure.com/services/${slug}`,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.iconName] || FiShield;
  const cat = categories.find((c) => c.id === service.category);

  // Related: same category, exclude current
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDesc,
    url: `https://www.cybriasecure.com/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "Cybria Secure",
      url: "https://www.cybriasecure.com",
      telephone: "+918080424274",
      address: {
        "@type": "PostalAddress",
        streetAddress: "110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex",
        addressLocality: "Kolhapur",
        addressRegion: "Maharashtra",
        postalCode: "416008",
        addressCountry: "IN",
      },
    },
    areaServed: { "@type": "Country", name: "India" },
    serviceType: "Cybersecurity",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-[#0b1220]">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-28 pb-14 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `${service.glowColor}` }} />

          <div className="container mx-auto max-w-6xl relative">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              {cat && <span className="hover:text-white transition-colors" style={{ color: cat.color }}>{cat.label}</span>}
              <span>/</span>
              <span className="text-gray-400">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border rounded-full px-4 py-2 mb-6"
                  style={{ color: service.accentColor, borderColor: `${service.accentColor}30`, background: `${service.accentColor}08` }}>
                  <Icon className="w-3.5 h-3.5" />
                  {cat?.label}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {service.heroDesc}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-7 py-4 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                    Get Free Consultation
                  </Link>
                  <a href="tel:+918080424274" className="px-7 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
                    <FiPhone className="w-4 h-4" /> Call Us
                  </a>
                </div>
              </div>

              {/* Right — Features card */}
              <div className="bg-[#141d2e] rounded-2xl p-7 border border-gray-800">
                <h3 className="text-white font-bold text-lg mb-5">What's Included</h3>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-gray-800">
                  <p className="text-gray-500 text-xs mb-3">Trusted by 100+ Indian businesses</p>
                  <Link href="/contact" className="block w-full text-center py-3 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${service.accentColor}, #7C3AED)` }}>
                    Request Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ───────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Why {service.title} Matters
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              The business and regulatory case for investing in this service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.whyItMatters.map((item, i) => (
                <div key={i} className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient}`} />
                  <div className="text-3xl font-black mb-4 leading-none" style={{
                    background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    0{i + 1}
                  </div>
                  <h3 className="text-white font-bold mb-3">{item.heading}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT WE ASSESS ───────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">What We Assess</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Our {service.title} engagement covers all critical areas — nothing is left untested.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.whatWeAssess.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-[#141d2e] rounded-xl p-4 border border-gray-800">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${service.accentColor}, #7C3AED)` }}>
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits sidebar */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Key Benefits</h2>
                <div className="space-y-4">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-4 bg-[#141d2e] rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${service.accentColor}, #7C3AED)` }}>
                        {i + 1}
                      </div>
                      <span className="text-gray-300 leading-relaxed pt-1">{b}</span>
                    </div>
                  ))}
                </div>

                {/* Mid-page CTA */}
                <div className="mt-8 rounded-2xl p-6 text-center"
                  style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.1),rgba(124,58,237,0.1))", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-white font-semibold mb-4">Ready to get started?</p>
                  <Link href="/contact" className="inline-block px-6 py-3 text-white font-semibold rounded-full text-sm transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                    Schedule Free Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── METHODOLOGY ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Our Methodology
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              A systematic, transparent process — you always know what we're doing and why.
            </p>

            {/* Desktop: horizontal stepped timeline */}
            <div className="hidden md:block relative mb-6">
              <div className="absolute left-0 right-0 top-7 h-0.5" style={{ background: `linear-gradient(90deg, ${service.accentColor}, #7C3AED)` }} />
              <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${service.methodology.length}, 1fr)` }}>
                {service.methodology.map((step) => (
                  <div key={step.step} className="flex flex-col items-center">
                    <div className="relative mb-4 z-10 bg-[#0d1628] rounded-full p-1">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: `linear-gradient(135deg, ${service.accentColor}, #7C3AED)` }}>
                        {String(step.step).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="bg-[#141d2e] rounded-xl p-4 border border-gray-800 text-center w-full">
                      <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical */}
            <div className="md:hidden space-y-4">
              {service.methodology.map((step, i) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${service.accentColor}, #7C3AED)` }}>
                      {String(step.step).padStart(2, "0")}
                    </div>
                    {i < service.methodology.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ background: `${service.accentColor}40` }} />
                    )}
                  </div>
                  <div className="bg-[#141d2e] rounded-xl p-4 border border-gray-800 flex-1 pb-6">
                    <h3 className="text-white font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MID CTA BANNER ───────────────────────────────────────────────── */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: `linear-gradient(135deg, ${service.accentColor}18, rgba(124,58,237,0.12))`, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to get {service.title}?</h3>
                <p className="text-gray-400">Free scoping call. Transparent pricing. No obligation.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/contact" className="px-7 py-3.5 text-white font-semibold rounded-full text-sm transition-all hover:scale-105 whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Get Free Consultation
                </Link>
                <a href="tel:+918080424274" className="px-7 py-3.5 border border-gray-700 text-white font-semibold rounded-full text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  <FiPhone className="w-4 h-4" /> +91 80804 24274
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              Everything you need to know before engaging our {service.title} service.
            </p>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <details key={i} className="group bg-[#141d2e] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                    <span className="text-white font-semibold pr-4 leading-snug">{faq.q}</span>
                    <FiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500 mb-4">Still have questions?</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#2B7BE4] font-medium hover:text-[#FF5CA8] transition-colors">
                Talk to our team <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((s) => {
                  const RelIcon = iconMap[s.iconName] || FiShield;
                  return (
                    <Link key={s.slug} href={`/services/${s.slug}`}
                      className="group bg-[#141d2e] rounded-xl p-5 border border-gray-800 hover:border-[#2B7BE4]/40 transition-all duration-300 flex flex-col hover:shadow-[0_4px_24px_var(--glow)]"
                      style={{ "--glow": s.glowColor } as React.CSSProperties}>
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3`}>
                        <RelIcon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2 group-hover:text-[#2B7BE4] transition-colors">{s.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed flex-1">{s.shortDesc}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.accentColor }}>
                        Explore <FiArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="rounded-2xl p-10 md:p-14"
              style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Secure Your Business?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Our certified experts are available 24/7. Get a free consultation and discover exactly what {service.title} means for your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Get Free Consultation
                </Link>
                <a href="tel:+918080424274" className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  <FiPhone className="w-4 h-4" /> +91 80804 24274
                </a>
              </div>
              <p className="mt-6 text-gray-500 text-sm">
                Based in Kolhapur · Serving all of India · Remote & On-site
              </p>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="pb-8 px-4 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
            <FiArrowLeft className="w-4 h-4" /> Back to all Services
          </Link>
        </div>

      </div>
    </>
  );
}