"use client";

import { FiPhone, FiMail, FiCalendar } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const contactChannels = [
  {
    icon: FiPhone,
    label: "Call Us",
    value: "+91 80804 24274",
    sub: "Also: +91 75591 35608",
    href: "tel:+918080424274",
    gradient: "from-[#2B7BE4] to-[#3B82F6]",
    glowColor: "rgba(43,123,228,0.25)",
    badge: "24/7 for emergencies",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "sales@cybriasecure.com",
    sub: "We respond within 4 hours",
    href: "mailto:sales@cybriasecure.com",
    gradient: "from-[#FF5CA8] to-[#EC4899]",
    glowColor: "rgba(255,92,168,0.25)",
    badge: "Quick response",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "Chat with us",
    sub: "Instant messaging available",
    href: "https://wa.me/918080424274?text=Hi%20Cybria%20Secure%2C%20I%27d%20like%20to%20discuss%20your%20cybersecurity%20services.",
    gradient: "from-[#25D366] to-[#128C7E]",
    glowColor: "rgba(37,211,102,0.25)",
    badge: "Instant reply",
  },
  {
    icon: FiCalendar,
    label: "Book a Meeting",
    value: "Schedule a call",
    sub: "Mon–Fri, 9:30 AM – 6:30 PM IST",
    href: "#form",
    gradient: "from-[#7C3AED] to-[#8B5CF6]",
    glowColor: "rgba(124,58,237,0.25)",
    badge: "Free consultation",
  },
];

export default function ContactChannels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {contactChannels.map((ch) => {
        const Icon = ch.icon;
        return (
          <a
            key={ch.label}
            href={ch.href}
            target={ch.href.startsWith("http") ? "_blank" : undefined}
            rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group bg-[#141d2e] rounded-2xl p-6 border border-gray-800 hover:border-transparent transition-all duration-300 flex flex-col relative overflow-hidden"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${ch.glowColor}`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${ch.gradient}`} />
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ch.gradient} flex items-center justify-center mb-4`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{ch.label}</span>
            <p className="text-white font-bold mb-1 group-hover:text-[#2B7BE4] transition-colors">{ch.value}</p>
            <p className="text-gray-500 text-xs mb-3">{ch.sub}</p>
            <div className="mt-auto">
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0b1220] border border-gray-800 text-gray-400">
                {ch.badge}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}