import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Cybria Secure",
  description: "Privacy Policy for Cybria Secure — how we collect, use and protect your personal information.",
  alternates: { canonical: "https://www.cybriasecure.com/privacy-policy" },
  robots: "noindex, follow",
};

const sections = [
  {
    title: "Information We Collect",
    content: `When you use our website or contact us, we may collect the following information:

**Information you provide directly:**
- Name, email address and phone number submitted via our contact form
- Business name and details shared during consultations
- Messages and enquiries you send us

**Information collected automatically:**
- IP address and browser type (via standard web server logs)
- Pages visited and time spent on the site (via analytics)
- Referring URL and general geographic location

We do not collect payment card data, government IDs, or sensitive personal data through this website.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:

- Respond to your enquiries and provide the services you request
- Send you information about our cybersecurity services when you have requested it
- Improve our website and services based on usage patterns
- Comply with legal obligations under Indian law (IT Act 2000, DPDPA 2023)
- Prevent fraud and ensure the security of our systems

We do not sell, rent or trade your personal information to third parties. We do not use your information for automated decision-making.`,
  },
  {
    title: "Legal Basis for Processing",
    content: `Under India's Digital Personal Data Protection Act 2023 (DPDPA) and applicable data protection principles, we process your personal data on the following bases:

- **Consent:** When you submit our contact form, you consent to us using your information to respond to your enquiry
- **Legitimate Interest:** We may process limited data to improve our services and prevent abuse of our systems
- **Legal Obligation:** Where required to comply with applicable Indian law

You may withdraw consent at any time by contacting us at sales@cybriasecure.com.`,
  },
  {
    title: "Data Retention",
    content: `We retain your personal information only for as long as necessary:

- Contact form submissions: Up to 2 years from the date of last contact
- Client engagement records: 7 years (for legal and accounting compliance)
- Website analytics: 26 months in aggregated, anonymized form

After the applicable retention period, your data is securely deleted or anonymized.`,
  },
  {
    title: "Data Security",
    content: `As a cybersecurity firm, we apply robust security controls to protect your information:

- All data transmitted via our website is encrypted using TLS 1.2 or higher
- Access to personal data is restricted to authorized personnel on a need-to-know basis
- Our systems undergo regular security assessments consistent with our own service standards
- We maintain an Incident Response Plan that covers personal data breaches

In the event of a data breach affecting your personal information, we will notify you in accordance with applicable legal requirements.`,
  },
  {
    title: "Sharing Your Information",
    content: `We do not sell your personal information. We may share it only in the following limited circumstances:

- **Service providers:** Third-party tools we use to operate our website (e.g., email delivery, analytics) — bound by data processing agreements
- **Legal requirement:** If required by court order, law enforcement or applicable Indian law
- **Business transfer:** If Cybria Secure is acquired or merges with another entity, your information may transfer as part of that transaction with equivalent protections

All third parties with whom we share data are required to maintain appropriate confidentiality and security measures.`,
  },
  {
    title: "Cookies",
    content: `Our website uses minimal cookies:

- **Strictly necessary cookies:** Required for the website to function (e.g., form security tokens). These cannot be disabled.
- **Analytics cookies:** We use anonymized analytics to understand how visitors use our site. You may opt out by adjusting your browser settings.

We do not use advertising or tracking cookies. We do not track you across other websites.`,
  },
  {
    title: "Your Rights",
    content: `Under applicable Indian data protection law (DPDPA 2023) and general data protection principles, you have the right to:

- **Access:** Request a copy of the personal information we hold about you
- **Correction:** Request correction of inaccurate or incomplete information
- **Erasure:** Request deletion of your personal information, subject to legal retention obligations
- **Withdraw consent:** Withdraw consent to processing at any time
- **Grievance:** Lodge a complaint with us or with the Data Protection Board of India

To exercise any of these rights, contact us at: **sales@cybriasecure.com** or **+91 80804 24274**

We will respond to rights requests within 30 days.`,
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites (e.g., LinkedIn, Google Maps). We are not responsible for the privacy practices of those websites. We encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    title: "Children's Privacy",
    content: `Our services are directed at businesses and professionals. We do not knowingly collect personal information from individuals under the age of 18. If you believe we have inadvertently collected such information, please contact us immediately at sales@cybriasecure.com and we will delete it promptly.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. When we make material changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact & Grievance Officer",
    content: `For any privacy-related questions, requests or grievances, contact our Grievance Officer:

**Cybria Secure**
110, Mark 1034 Commercial Complex,
E Ward, Rajaram Road, Near Parvati Multiplex,
Kolhapur, Maharashtra — 416008

Email: **sales@cybriasecure.com**
Phone: **+91 80804 24274**

We aim to resolve all privacy grievances within 30 days of receipt.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0b1220]">
      <section className="pt-28 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto max-w-3xl relative">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last Updated: January 2025</p>
          <p className="text-gray-300 mt-6 leading-relaxed">
            Cybria Secure ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store and protect your data when you visit our website or use our services. We comply with the Information Technology Act 2000, the Digital Personal Data Protection Act 2023 (DPDPA), and applicable data protection principles.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i} className="bg-[#141d2e] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#2B7BE4,#7C3AED)" }}>
                    {i + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                  {section.content.split('\n\n').map((para, j) => {
                    if (para.startsWith('- ') || para.includes('\n- ')) {
                      return (
                        <ul key={j} className="space-y-1.5">
                          {para.split('\n').filter(l => l.trim()).map((line, k) => (
                            <li key={k} className="flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#2B7BE4] flex-shrink-0 mt-2" />
                              <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={j} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-full transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
              Contact Us With Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}