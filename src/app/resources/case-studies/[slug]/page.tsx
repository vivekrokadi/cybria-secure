import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft, FiCalendar, FiShield, FiAlertTriangle,
  FiCheck, FiTag, FiArrowRight,
} from "react-icons/fi";

// ─── Static case study data ───────────────────────────────────────────────────
const caseStudies = [
  {
    slug: "cooperative-bank-kolhapur",
    title: "How Cybria Secure Secured a Kolhapur Cooperative Bank Against Ransomware",
    client: "Urban Cooperative Bank, Kolhapur",
    industry: "Banking & Finance",
    service: "Incident Response + VAPT",
    outcome: "Zero data loss. Full recovery in 18 hours.",
    date: "2024-09-15",
    excerpt:
      "A Kolhapur-based urban cooperative bank hit by ransomware was fully recovered in 18 hours — zero data loss, RBI notification filed on time.",
    tags: ["Ransomware", "Incident Response", "Banking", "Maharashtra"],
    icon: "alert",
    gradient: "from-[#FF5CA8] to-[#7C3AED]",
    content: {
      background:
        "A mid-sized urban cooperative bank in Kolhapur with 12 branches discovered that their Core Banking Solution (CBS) server had been encrypted by ransomware. Operations were halted, teller systems were offline, and customers couldn't access accounts.",
      challenge: [
        "Ransomware had spread from a phishing email opened by a staff member",
        "CBS server fully encrypted — no backups verified in 6 months",
        "RBI notification deadline: 6 hours from detection",
        "12 branches and 40,000+ customer accounts affected",
      ],
      approach: [
        {
          phase: "Hour 0–2: Containment",
          detail:
            "Our incident response team remotely isolated the infected systems, preventing further lateral movement across the network.",
        },
        {
          phase: "Hour 2–6: RBI Reporting & Forensics",
          detail:
            "Drafted and submitted the mandatory RBI cyber incident report within the 6-hour window. Initiated forensic imaging of affected systems.",
        },
        {
          phase: "Hour 6–14: Recovery",
          detail:
            "Identified a clean backup from 3 days prior on an isolated tape system. Rebuilt the CBS environment on clean infrastructure, restored from backup, and validated data integrity.",
        },
        {
          phase: "Hour 14–18: Hardening",
          detail:
            "Patched the phishing vector, implemented email filtering, disabled legacy RDP access, and enabled endpoint detection across all branch systems.",
        },
      ],
      results: [
        "Full CBS restoration in 18 hours with zero data loss",
        "RBI notification filed within the mandatory 6-hour window",
        "No ransom paid",
        "Post-incident VAPT — 23 critical vulnerabilities found and remediated",
        "Bank now on quarterly security review program with Cybria Secure",
      ],
      lesson:
        "Every cooperative bank needs a tested Incident Response Plan before an attack happens, not after. Backup verification is not optional — untested backups are not backups.",
    },
  },
  {
    slug: "manufacturing-company-vapt",
    title: "Critical OT/IT Infrastructure VAPT for a Kolhapur Foundry",
    client: "Engineering & Foundry Company, Kolhapur",
    industry: "Manufacturing",
    service: "VAPT + OT Security Assessment",
    outcome: "31 critical vulnerabilities remediated before exploitation.",
    date: "2024-07-20",
    excerpt:
      "31 critical vulnerabilities including unauthenticated SCADA access discovered and remediated before any production disruption occurred.",
    tags: ["OT Security", "VAPT", "Manufacturing", "SCADA"],
    icon: "shield",
    gradient: "from-[#2B7BE4] to-[#7C3AED]",
    content: {
      background:
        "A large engineering and foundry company in Kolhapur had recently connected their OT (Operational Technology) systems — including SCADA and PLCs — to their corporate IT network for remote monitoring. They had no prior security assessment of the combined OT/IT environment.",
      challenge: [
        "OT systems never designed for internet-connected environments",
        "Flat network — no segmentation between corporate IT and shop floor OT",
        "Legacy PLCs running outdated firmware with no vendor patch support",
        "Production disruption risk: any testing had to be non-intrusive to live systems",
      ],
      approach: [
        {
          phase: "Phase 1: Passive OT Discovery",
          detail:
            "Non-intrusive asset discovery across the OT network without sending active probes to sensitive PLCs. Mapped all connected devices, protocols (Modbus, DNP3, OPC-UA), and communication paths.",
        },
        {
          phase: "Phase 2: IT Network VAPT",
          detail:
            "Active penetration testing of the corporate network. Discovered a direct, unauthenticated path from the corporate WiFi network to the SCADA HMI server.",
        },
        {
          phase: "Phase 3: OT Risk Assessment",
          detail:
            "Assessed all PLC firmware versions, default credentials, and remote access configurations. Found 6 PLCs using default vendor credentials.",
        },
      ],
      results: [
        "31 critical vulnerabilities across IT and OT environments remediated",
        "Emergency network segmentation implemented within 1 week",
        "All PLCs credential-hardened and firmware updated where possible",
        "SCADA HMI isolated behind jump server with MFA",
        "Staff trained on OT-specific threats",
        "Follow-up VAPT in 90 days confirmed all findings remediated",
      ],
      lesson:
        "OT/IT convergence creates attack paths that neither IT nor OT teams fully understand alone. A specialist OT security assessment before connecting shop floor systems to corporate networks is essential.",
    },
  },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.title} | Cybria Secure Case Study`,
    description: cs.excerpt,
    alternates: { canonical: `https://www.cybriasecure.com/resources/case-studies/${slug}` },
    openGraph: {
      title: cs.title,
      description: cs.excerpt,
      type: "article",
      url: `https://www.cybriasecure.com/resources/case-studies/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const Icon = cs.icon === "alert" ? FiAlertTriangle : FiShield;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.excerpt,
    datePublished: cs.date,
    author: { "@type": "Organization", name: "Cybria Secure" },
    publisher: {
      "@type": "Organization",
      name: "Cybria Secure",
      url: "https://www.cybriasecure.com",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#0b1220]">

        {/* Hero */}
        <section className="pt-28 pb-12 px-4 relative overflow-hidden">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto max-w-4xl relative">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-white transition-colors">Case Studies</Link>
              <span>/</span>
              <span className="text-gray-500 truncate max-w-xs">{cs.title.slice(0, 40)}…</span>
            </div>

            {/* Meta tags row */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${cs.gradient} text-white`}>
                <Icon className="w-3.5 h-3.5" /> {cs.industry}
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#141d2e] border border-gray-800 text-gray-400">
                {cs.service}
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#141d2e] border border-gray-800 text-gray-400 flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                {new Date(cs.date).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {cs.title}
            </h1>

            {/* Outcome hero badge */}
            <div className="inline-flex items-center gap-2.5 bg-green-500/10 border border-green-500/25 rounded-xl px-5 py-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-green-400 font-semibold">{cs.outcome}</span>
            </div>
          </div>
        </section>

        {/* Client strip */}
        <div className="border-y border-gray-800/60 bg-[#0d1628]">
          <div className="container mx-auto max-w-4xl px-4 py-5">
            <div className="flex flex-wrap gap-8 text-sm">
              <div>
                <p className="text-gray-600 uppercase text-xs tracking-widest mb-1">Client</p>
                <p className="text-gray-300 font-medium">{cs.client}</p>
              </div>
              <div>
                <p className="text-gray-600 uppercase text-xs tracking-widest mb-1">Industry</p>
                <p className="text-gray-300 font-medium">{cs.industry}</p>
              </div>
              <div>
                <p className="text-gray-600 uppercase text-xs tracking-widest mb-1">Service</p>
                <p className="text-gray-300 font-medium">{cs.service}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">

          {/* Background */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Background</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{cs.content.background}</p>
          </section>

          {/* Challenges */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">The Challenge</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.content.challenge.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#141d2e] rounded-xl p-4 border border-gray-800">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <span className="text-red-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Approach */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">What Cybria Secure Did</h2>
            <div className="space-y-4">
              {cs.content.approach.map((phase, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${cs.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                      {i + 1}
                    </div>
                    {i < cs.content.approach.length - 1 && (
                      <div className="w-px flex-1 bg-gray-800 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="text-white font-bold mb-2">{phase.phase}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{phase.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Outcome</h2>
            <div className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800">
              <ul className="space-y-3">
                {cs.content.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Key lesson */}
          <section>
            <div className={`rounded-2xl p-6 bg-gradient-to-br ${cs.gradient} bg-opacity-10 relative overflow-hidden`}
              style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.08),rgba(124,58,237,0.08))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <span className="text-lg">💡</span> Key Lesson
              </h3>
              <p className="text-gray-300 leading-relaxed">{cs.content.lesson}</p>
            </div>
          </section>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 text-xs bg-[#141d2e] border border-gray-800 text-gray-400 rounded-full px-3 py-1.5">
                <FiTag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Nav between case studies */}
        <div className="border-t border-gray-800 bg-[#0d1628]">
          <div className="container mx-auto max-w-4xl px-4 py-6 flex items-center justify-between">
            <Link href="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <FiArrowLeft className="w-4 h-4" /> Back to Resources
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-full transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
              Discuss Your Project <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="rounded-2xl p-10" style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-2xl font-bold text-white mb-3">Facing a Similar Challenge?</h2>
              <p className="text-gray-300 mb-7">Get expert advice tailored to your business. Free consultation — no obligation.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-7 py-3.5 text-white font-semibold rounded-full transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                  Get Free Consultation
                </Link>
                <a href="tel:+918080424274" className="px-7 py-3.5 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all">
                  Call +91 80804 24274
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}