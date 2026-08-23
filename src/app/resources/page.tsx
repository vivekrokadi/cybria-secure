"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiBookOpen, FiFileText, FiDownload, FiArrowRight,
  FiCalendar, FiUser, FiClock, FiTag, FiFilter,
  FiSearch, FiExternalLink, FiShield, FiAlertTriangle,
} from "react-icons/fi";
import { getAllBlogPosts } from "../../../lib/markdown";
import documentsData from "../../content/documents/index.json";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "blog" | "case-studies" | "documents";

// ─── Static case study data (until you add a CMS) ────────────────────────────
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
    icon: FiAlertTriangle,
    gradient: "from-[#FF5CA8] to-[#7C3AED]",
    glowColor: "rgba(255,92,168,0.2)",
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
    icon: FiShield,
    gradient: "from-[#2B7BE4] to-[#7C3AED]",
    glowColor: "rgba(43,123,228,0.2)",
  },
];

// ─── Category colours ─────────────────────────────────────────────────────────
const categoryColor: Record<string, string> = {
  Compliance: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Guide: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Template: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Awareness: "bg-green-500/10 text-green-400 border-green-500/20",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function BlogGrid({ posts }: { posts: ReturnType<typeof getAllBlogPosts> }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
          <FiBookOpen className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
        <p className="text-gray-400">Our experts are preparing the first articles. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group bg-[#141d2e] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#2B7BE4]/40 transition-all duration-300 flex flex-col"
        >
          <div className="h-40 bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] rounded-full flex items-center justify-center">
              <FiBookOpen className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <span className="inline-block px-3 py-1 bg-[#2B7BE4]/10 text-[#2B7BE4] text-xs font-semibold rounded-full mb-3 border border-[#2B7BE4]/20">
              {post.category}
            </span>

            <h3 className="text-white font-bold mb-3 group-hover:text-[#2B7BE4] transition-colors leading-snug flex-1">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-[#2B7BE4] text-sm font-medium hover:text-[#FF5CA8] transition-colors mt-auto"
            >
              Read Article <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function CaseStudiesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {caseStudies.map((cs) => {
        const Icon = cs.icon;
        return (
          <Link
            key={cs.slug}
            href={`/resources/case-studies/${cs.slug}`}
            className="group bg-[#141d2e] rounded-2xl p-7 border border-gray-800 hover:border-transparent transition-all duration-300 relative overflow-hidden cursor-pointer block"
            style={{ boxShadow: "none", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 40px ${cs.glowColor}`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            {/* top accent */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cs.gradient}`} />

            <div className="flex items-start gap-4 mb-4">
              <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${cs.gradient} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">{cs.industry}</p>
                <p className="text-xs text-gray-400">{cs.service}</p>
              </div>
            </div>

            <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#2B7BE4] transition-colors">
              {cs.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">{cs.excerpt}</p>

            {/* Outcome badge */}
            <div className="flex items-center gap-2 bg-green-500/8 border border-green-500/20 rounded-lg px-3 py-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-green-400 text-xs font-semibold">{cs.outcome}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {cs.tags.map((tag) => (
                <span key={tag} className="text-xs bg-[#0b1220] border border-gray-800 text-gray-400 rounded-full px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5" />
                {new Date(cs.date).toLocaleDateString("en-IN", { year: "numeric", month: "short" })}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <FiUser className="w-3.5 h-3.5" /> {cs.client}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-[#2B7BE4] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Read Case Study <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        );
      })}

      {/* Placeholder — invite more */}
      <div className="bg-[#141d2e] rounded-2xl p-7 border border-dashed border-gray-700 flex flex-col items-center justify-center text-center col-span-full md:col-span-1">
        <div className="w-12 h-12 rounded-xl bg-[#0b1220] border border-gray-800 flex items-center justify-center mb-4">
          <FiFileText className="w-5 h-5 text-gray-600" />
        </div>
        <h3 className="text-gray-400 font-semibold mb-2">More Coming Soon</h3>
        <p className="text-gray-600 text-sm mb-4">New case studies are published quarterly. Want your success story featured?</p>
        <Link href="/contact" className="text-[#2B7BE4] text-sm font-medium hover:text-[#FF5CA8] transition-colors flex items-center gap-1">
          Contact Us <FiArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function DocumentsGrid({ search, filter }: { search: string; filter: string }) {
  const filtered = documentsData.filter((doc) => {
    const matchSearch =
      !search ||
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = !filter || filter === "All" || doc.category === filter;
    return matchSearch && matchFilter;
  });

  const categories = ["All", ...Array.from(new Set(documentsData.map((d) => d.category)))];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filter !== cat && void 0}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              filter === cat
                ? "bg-gradient-to-r from-[#2B7BE4] to-[#7C3AED] text-white border-transparent"
                : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No documents match your search.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((doc) => (
            <div key={doc.id} className="group bg-[#141d2e] rounded-xl p-6 border border-gray-800 hover:border-[#2B7BE4]/40 transition-all duration-300 flex flex-col">
              {/* File type badge + icon */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColor[doc.category] || "bg-gray-800 text-gray-400 border-gray-700"}`}>
                  {doc.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-500 uppercase">{doc.fileType}</span>
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED] flex items-center justify-center">
                    <FiFileText className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-white font-bold mb-2 leading-snug group-hover:text-[#2B7BE4] transition-colors flex-1">
                {doc.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{doc.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {doc.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs bg-[#0b1220] border border-gray-800 text-gray-500 rounded-full px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-600">{doc.fileSize}</span>
                <a
                  href={doc.downloadUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#2B7BE4] to-[#7C3AED] text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-[#2B7BE4]/20 transition-all duration-200"
                >
                  <FiDownload className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("blog");
  const [search, setSearch] = useState("");
  const [docFilter, setDocFilter] = useState("All");

  const blogPosts = getAllBlogPosts();
  const categories = ["All", ...Array.from(new Set(documentsData.map((d) => d.category)))];

  const tabs: { id: Tab; label: string; icon: React.ElementType; count: number | null }[] = [
    { id: "blog", label: "Blog", icon: FiBookOpen, count: blogPosts.length || null },
    { id: "case-studies", label: "Case Studies", icon: FiShield, count: caseStudies.length },
    { id: "documents", label: "Documents & PDFs", icon: FiDownload, count: documentsData.length },
  ];

  return (
    <div className="min-h-screen bg-[#0b1220]">

      {/* Hero */}
      <section className="pt-28 pb-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-6 bg-blue-400/5">
            <FiBookOpen className="w-3.5 h-3.5" />
            Knowledge Hub
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Cybersecurity </span>
            <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Resources
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert articles, real-world case studies, and downloadable guides to help Indian businesses stay ahead of cyber threats.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[68px] z-30 bg-[#0b1220]/95 backdrop-blur-md border-b border-gray-800/60">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-[#2B7BE4] text-white"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-[#2B7BE4]/20 text-[#2B7BE4]" : "bg-gray-800 text-gray-500"}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl px-4 py-12">

        {/* Search bar — shown for blog + documents */}
        {(activeTab === "blog" || activeTab === "documents") && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder={activeTab === "blog" ? "Search articles..." : "Search documents..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#141d2e] border border-gray-800 rounded-full text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#2B7BE4]/50 transition-colors"
              />
            </div>

            {activeTab === "documents" && (
              <div className="flex items-center gap-2">
                <FiFilter className="w-4 h-4 text-gray-500" />
                <select
                  value={docFilter}
                  onChange={(e) => setDocFilter(e.target.value)}
                  className="bg-[#141d2e] border border-gray-800 rounded-full text-sm text-gray-300 px-4 py-2.5 focus:outline-none focus:border-[#2B7BE4]/50"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Tab Panels */}
        {activeTab === "blog" && (
          <BlogGrid
            posts={search ? blogPosts.filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase()) ||
              p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
              p.category.toLowerCase().includes(search.toLowerCase())
            ) : blogPosts}
          />
        )}

        {activeTab === "case-studies" && <CaseStudiesGrid />}

        {activeTab === "documents" && <DocumentsGrid search={search} filter={docFilter} />}
      </div>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="rounded-2xl p-10 md:p-14" style={{ background: "linear-gradient(135deg,rgba(43,123,228,0.12),rgba(255,92,168,0.08),rgba(124,58,237,0.12))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">Need Expert Cybersecurity Guidance?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Our team is ready to help. Free consultation — no obligation, no jargon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 text-white font-semibold rounded-full transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
                Get Free Consultation
              </Link>
              <a href="tel:+918080424274" className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all">
                Call +91 80804 24274
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}