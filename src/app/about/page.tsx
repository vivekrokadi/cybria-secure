import type { Metadata } from "next";
import Link from "next/link";
import {
  FiShield, FiUsers, FiTarget, FiAward, FiGlobe,
  FiArrowRight, FiPhone, FiCheckCircle, FiTrendingUp,
} from "react-icons/fi";
import TeamSection from "../../components/TeamSection";

export const metadata: Metadata = {
  title: "About Cybria Secure | Cybersecurity Risk Advisory | Kolhapur, India",
  description:
    "Cybria Secure is a leading cybersecurity risk advisory firm headquartered in Kolhapur, Maharashtra. Founded by Sameer Nejkar and Tanvi Dhatrak. Serving 640+ clients across 30+ countries.",
  keywords: [
    "about Cybria Secure", "cybersecurity company Kolhapur",
    "cybersecurity experts Maharashtra", "Sameer Nejkar", "Tanvi Dhatrak",
    "cybersecurity risk advisory India",
  ],
  alternates: { canonical: "https://www.cybriasecure.com/about" },
  openGraph: {
    title: "About Cybria Secure | Cybersecurity Risk Advisory",
    description: "Reduce Business Risk. Not Just Fix Vulnerabilities. Learn about Cybria Secure — founded in Kolhapur, serving 640+ organizations globally.",
    url: "https://www.cybriasecure.com/about",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Cybria Secure",
  description: "Cybria Secure is a leading cybersecurity risk advisory firm based in Kolhapur, Maharashtra.",
  url: "https://www.cybriasecure.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Cybria Secure",
    description: "Leading cybersecurity risk advisory firm. We reduce business risk — not just fix vulnerabilities.",
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "50+" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex",
      addressLocality: "Kolhapur",
      addressRegion: "Maharashtra",
      postalCode: "416008",
      addressCountry: "IN",
    },
    telephone: "+918080424274",
    email: "sales@cybriasecure.com",
    url: "https://www.cybriasecure.com",
    logo: "https://www.cybriasecure.com/cybriasecure-logo.png",
    areaServed: { "@type": "Country", name: "India" },
  },
};

const stats = [
  { value: "640+",  label: "Clients Served",     icon: FiUsers },
  { value: "30+",   label: "Countries",           icon: FiGlobe },
  { value: "5800+", label: "Projects Completed",  icon: FiTarget },
  { value: "9+",    label: "Years of Experience", icon: FiAward },
];

const values = [
  {
    icon: FiShield,
    title: "Security First",
    desc: "Every recommendation, engagement and deliverable prioritizes meaningful security improvement over checkbox compliance.",
    gradient: "from-[#2B7BE4] to-[#3B82F6]",
  },
  {
    icon: FiUsers,
    title: "Client Partnership",
    desc: "We build long-term relationships based on honest advice, transparent pricing and genuine commitment to your security outcomes.",
    gradient: "from-[#FF5CA8] to-[#EC4899]",
  },
  {
    icon: FiTarget,
    title: "Outcome-Focused",
    desc: "We measure success by risk reduction and security maturity improvement — not by the thickness of the report we deliver.",
    gradient: "from-[#7C3AED] to-[#8B5CF6]",
  },
  {
    icon: FiTrendingUp,
    title: "Continuous Improvement",
    desc: "Threats evolve daily. Our team continuously advances skills, methods and tooling to stay ahead of adversaries.",
    gradient: "from-[#F59E0B] to-[#EF4444]",
  },
];

const expertise = [
  "Vulnerability Assessment & Penetration Testing (VAPT)",
  "Red Team Operations & Adversarial Simulation",
  "OT / SCADA Security for Manufacturing",
  "RBI Cybersecurity Compliance for Banks & NBFCs",
  "ISO 27001:2022 ISMS Implementation",
  "Incident Response & Digital Forensics (DFIR)",
  "Cloud Security (AWS, Azure, GCP)",
  "Security Awareness Training in Marathi, Hindi & English",
  "Virtual CISO (vCISO) Services",
  "API & Mobile Application Security Testing",
];

const certifications = [
  { name: "CEH", full: "Certified Ethical Hacker" },
  { name: "OSCP", full: "Offensive Security Certified Professional" },
  { name: "CISM", full: "Certified Information Security Manager" },
  { name: "ISO 27001 LA", full: "ISO 27001 Lead Auditor" },
  { name: "CISSP", full: "Certified Information Systems Security Professional" },
  { name: "CompTIA Security+", full: "CompTIA Security+" },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#0b1220]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="pt-28 pb-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-6 bg-blue-400/5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  About Us
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Reduce Business Risk.<br />
                  <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Not Just Fix Vulnerabilities.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Cybria Secure is a leading cybersecurity risk advisory firm headquartered in Kolhapur, Maharashtra. We help organizations across India and globally reduce risk and enhance competitive advantage through comprehensive, outcome-focused security services.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Founded by experienced domain experts and certified professionals, we bridge the gap between technical security and business risk — delivering solutions that are economically viable, practically implementable, and measurably effective.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-7 py-4 text-white font-semibold rounded-full transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                    Work With Us
                  </Link>
                  <Link href="/services" className="px-7 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
                    Our Services <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800 text-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 border border-[#2B7BE4]/20 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-5 h-5 text-[#2B7BE4]" />
                      </div>
                      <div className="text-3xl font-extrabold mb-1"
                        style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION ───────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="bg-[#141d2e] rounded-3xl p-10 md:p-14 border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED]" />
              <FiShield className="w-12 h-12 mx-auto mb-6 text-[#2B7BE4]" />
              <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-4">Our Mission</h2>
              <p className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                From Threats to Trust – We Secure It All.
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                To empower organizations to overcome modern cybersecurity challenges by delivering integrated security solutions that combine advanced technology, strategic expertise, and continuous awareness — reducing risk from skill gaps, budget constraints, evolving threats, and human error.
              </p>
            </div>
          </div>
        </section>

        {/* ── EXPERTISE ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Areas of Expertise</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Deep technical capability across offensive security, governance, compliance and managed services — delivered by certified professionals with hands-on experience in Indian and global environments.
                </p>
                <div className="space-y-3">
                  {expertise.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <FiCheckCircle className="w-4 h-4 text-[#2B7BE4] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Team Certifications</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Our security professionals hold industry-leading certifications — verifiable credentials you can request before any engagement begins.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="bg-[#141d2e] rounded-xl p-4 border border-gray-800">
                      <div className="text-white font-bold text-sm mb-1">{cert.name}</div>
                      <div className="text-gray-500 text-xs leading-snug">{cert.full}</div>
                    </div>
                  ))}
                </div>

                {/* Differentiators */}
                <div className="bg-gradient-to-br from-[#2B7BE4]/10 to-[#7C3AED]/10 rounded-2xl p-6 border border-[#2B7BE4]/20">
                  <h3 className="text-white font-bold mb-4">Why Clients Trust Us</h3>
                  {[
                    "Headquartered in Kolhapur — on-site visits available across Maharashtra",
                    "Training in Marathi, Hindi and English for local businesses",
                    "100% RBI audit pass rate for cooperative bank clients",
                    "Transparent pricing — no hidden fees, no upselling",
                    "Re-test included after remediation at no extra charge",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2.5 mb-3 last:mb-0">
                      <FiCheckCircle className="w-4 h-4 text-[#2B7BE4] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The principles that guide every engagement, recommendation and client relationship.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${v.gradient}`} />
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-bold mb-3">{v.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TEAM ──────────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Visionaries Behind Cybria Secure
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                United by a commitment to trust, innovation and resilience — dedicated to helping organizations navigate the digital landscape with confidence.
              </p>
            </div>
            <TeamSection />
          </div>
        </section>

        {/* ── LOCATIONS ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Where We Operate</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Headquartered in Kolhapur — serving clients across India and globally with remote-first delivery and on-site support.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto mb-10">
              {[
                { city: "Kolhapur", tag: "HQ", href: "/services/kolhapur" },
                { city: "Pune",     tag: "",   href: "/services/pune" },
                { city: "Mumbai",   tag: "",   href: "/services/mumbai" },
                { city: "Sangli",   tag: "",   href: "/services/sangli" },
                { city: "Solapur",  tag: "",   href: "/services/solapur" },
                { city: "Ichalkaranji", tag: "", href: "/services/ichalkaranji" },
              ].map(({ city, tag, href }) => (
                <Link key={city} href={href}
                  className="group flex flex-col items-center text-center p-4 bg-[#141d2e] rounded-xl border border-gray-800 hover:border-[#2B7BE4]/40 hover:bg-[#1a2440] transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#2B7BE4] mb-2 group-hover:animate-pulse" />
                  <span className="text-white text-sm font-semibold group-hover:text-[#2B7BE4] transition-colors">{city}</span>
                  {tag && <span className="text-[10px] text-[#FF5CA8] font-bold mt-0.5">{tag}</span>}
                </Link>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm">+ Pan-India & 30+ countries globally</p>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="rounded-2xl p-10 md:p-14"
              style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Partner with Cybersecurity Experts</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                640+ organizations trust Cybria Secure. Free consultation — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
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