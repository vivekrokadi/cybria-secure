import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import ContactChannels from "../../components/ContactChannels";
import Link from "next/link";
import {
  FiMapPin, FiPhone, FiMail, FiClock,
  FiAlertCircle, FiMessageCircle,
  FiLinkedin, FiTwitter, FiInstagram,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact Cybria Secure | Cybersecurity Advisory | +91 80804 24274",
  description:
    "Contact Cybria Secure for cybersecurity services across India. VAPT, RBI compliance, incident response and security consulting. Call +91 80804 24274 or email sales@cybriasecure.com.",
  keywords: [
    "contact Cybria Secure", "cybersecurity Kolhapur contact",
    "cybersecurity consultation India", "incident response contact",
    "VAPT inquiry India", "RBI compliance contact",
  ],
  alternates: { canonical: "https://www.cybriasecure.com/contact" },
  openGraph: {
    title: "Contact Cybria Secure | Cybersecurity Advisory",
    description: "Get in touch with our cybersecurity experts. Free consultation — no commitment required.",
    url: "https://www.cybriasecure.com/contact",
    type: "website",
  },
};

const officeInfo = [
  {
    icon: FiMapPin,
    title: "Head Office",
    lines: [
      "110, Mark 1034 Commercial Complex",
      "E Ward, Rajaram Road,",
      "Near Parvati Multiplex,",
      "Kolhapur, Maharashtra — 416008",
    ],
  },
  {
    icon: FiClock,
    title: "Business Hours",
    lines: [
      "Monday – Friday: 9:30 AM – 6:30 PM",
      "Saturday: 10:00 AM – 2:00 PM",
      "Sunday: Closed",
      "Emergency response: 24/7",
    ],
  },
  {
    icon: FiPhone,
    title: "Phone",
    lines: ["+91 80804 24274 (Primary)", "+91 75591 35608 (Secondary)"],
  },
  {
    icon: FiMail,
    title: "Email",
    lines: ["sales@cybriasecure.com"],
  },
];

const services = [
  "Web Application VAPT", "Network Security Audit", "Mobile App Security",
  "Cloud Security Assessment", "Red Team Operations", "Incident Response",
  "RBI Compliance", "ISO 27001 Implementation", "Security Awareness Training",
  "Virtual CISO (vCISO)",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Cybria Secure",
  url: "https://www.cybriasecure.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Cybria Secure",
    telephone: "+918080424274",
    email: "sales@cybriasecure.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex",
      addressLocality: "Kolhapur",
      addressRegion: "Maharashtra",
      postalCode: "416008",
      addressCountry: "IN",
    },
    openingHours: "Mo-Fr 09:30-18:30",
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#0b1220]">

        {/* Hero */}
        <section className="pt-28 pb-14 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-6 bg-blue-400/5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Talk to Our </span>
              <span style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Security Experts
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Free consultation. Honest advice. No commitment required.
            </p>

            {/* Emergency strip */}
            <div className="inline-flex items-center gap-3 bg-red-900/30 border border-red-700/40 rounded-full px-6 py-3 text-sm">
              <FiAlertCircle className="w-4 h-4 text-red-400 animate-pulse flex-shrink-0" />
              <span className="text-red-200 font-semibold">Security Incident?</span>
              <span className="text-red-300 hidden sm:inline">Call immediately:</span>
              <a href="tel:+918080424274" className="text-white font-bold hover:text-red-200 transition-colors">
                +91 80804 24274
              </a>
              <span className="text-red-400 text-xs hidden md:inline">· 24/7 Emergency Response</span>
            </div>
          </div>
        </section>

        {/* Contact Channels — client component handles hover events */}
        <section className="pb-14 px-4">
          <div className="container mx-auto max-w-6xl">
            <ContactChannels />
          </div>
        </section>

        {/* Form + Info */}
        <section id="form" className="py-14 px-4 bg-[#0d1628]">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Form — 3/5 */}
              <div className="lg:col-span-3">
                <div className="bg-[#141d2e] rounded-2xl p-8 border border-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <FiMessageCircle className="w-5 h-5 text-[#2B7BE4]" />
                    <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                  </div>
                  <p className="text-gray-400 text-sm mb-8">
                    Our team responds within 4 business hours.
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Info sidebar — 2/5 */}
              <div className="lg:col-span-2 space-y-5">

                {/* Office info */}
                <div className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-white font-bold text-lg mb-5">Contact Information</h3>
                  <div className="space-y-5">
                    {officeInfo.map((info) => {
                      const Icon = info.icon;
                      return (
                        <div key={info.title} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 border border-[#2B7BE4]/20 flex items-center justify-center mt-0.5">
                            <Icon className="w-4 h-4 text-[#2B7BE4]" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">{info.title}</p>
                            {info.lines.map((line, i) => (
                              <p key={i} className="text-gray-300 text-sm">{line}</p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Social links */}
                  <div className="mt-6 pt-5 border-t border-gray-800">
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-3">Follow Us</p>
                    <div className="flex gap-3">
                      {[
                        { href: "https://linkedin.com", icon: FiLinkedin, label: "LinkedIn" },
                        { href: "https://twitter.com", icon: FiTwitter, label: "Twitter" },
                        { href: "https://instagram.com", icon: FiInstagram, label: "Instagram" },
                      ].map(({ href, icon: Icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#2B7BE4]/20 border border-gray-700 hover:border-[#2B7BE4]/40 flex items-center justify-center text-gray-400 hover:text-[#2B7BE4] transition-all"
                          aria-label={label}>
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services quick links */}
                <div className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-white font-bold mb-4">Enquire About</h3>
                  <div className="flex flex-wrap gap-2">
                    {services.map((svc) => (
                      <Link key={svc}
                        href={`/services/${svc.toLowerCase().replace(/[\s()]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}`}
                        className="text-xs bg-[#0b1220] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 rounded-full px-3 py-1.5 transition-all">
                        {svc}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="bg-[#141d2e] rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-white font-bold mb-4">We Serve</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { city: "Kolhapur (HQ)", href: "/services/kolhapur" },
                      { city: "Pune", href: "/services/pune" },
                      { city: "Mumbai", href: "/services/mumbai" },
                      { city: "Sangli", href: "/services/sangli" },
                      { city: "Ichalkaranji", href: "/services/ichalkaranji" },
                      { city: "Pan-India", href: "/services" },
                    ].map(({ city, href }) => (
                      <Link key={city} href={href}
                        className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#2B7BE4] flex-shrink-0" />
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="py-14 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Location</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-800 h-64 bg-[#141d2e] flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="w-10 h-10 text-[#2B7BE4] mx-auto mb-3" />
                <p className="text-white font-bold mb-1">Cybria Secure</p>
                <p className="text-gray-400 text-sm mb-4">110, Mark 1034 Commercial Complex, Kolhapur 416008</p>
                <a href="https://maps.google.com/?q=110+Mark+1034+Commercial+Complex+Kolhapur"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#2B7BE4] text-sm font-medium hover:text-[#FF5CA8] transition-colors">
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}