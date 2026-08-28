"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    q: "What cybersecurity services does Cybria Secure offer?",
    a: "Cybria Secure offers a full range of cybersecurity services — Web Application VAPT, Network Security Audit, Mobile App Security, Cloud Security Assessment, API Security Testing, OT/SCADA Security, Red Team Operations, Incident Response, RBI Compliance, ISO 27001 Implementation, GRC, Virtual CISO, and Security Awareness Training.",
  },
  {
    q: "Where is Cybria Secure headquartered and which areas do you serve?",
    a: "We are headquartered in Kolhapur, Maharashtra. We serve clients pan-India — Mumbai, Pune, Delhi, Bengaluru, Hyderabad, Chennai, Sangli, Ichalkaranji, Solapur and beyond — as well as global clients across 30+ countries. Most services are delivered remotely; on-site support is available.",
  },
  {
    q: "Is Cybria Secure RBI empanelled for cooperative bank audits?",
    a: "We specialize in RBI cybersecurity compliance for cooperative banks, UCBs and NBFCs. Our VAPT reports are formatted to meet RBI Master Direction inspection requirements, and we support the mandatory 6-hour incident notification process.",
  },
  {
    q: "How much does a cybersecurity assessment cost?",
    a: "Pricing depends on scope — Web App VAPT starts from ₹25,000; comprehensive network + web VAPT from ₹1,00,000+. We provide transparent, fixed-scope quotes after a free scoping call. No hidden charges, no upselling.",
  },
  {
    q: "Do you offer 24/7 incident response?",
    a: "Yes. Cybria Secure provides 24/7 emergency incident response. Remote response begins within 2 hours of engagement; on-site support in Kolhapur and surrounding areas within 4 hours. Call +91 80804 24274 for immediate assistance.",
  },
  {
    q: "How long does VAPT testing take?",
    a: "Web Application VAPT: 3–7 business days. Network VAPT: 5–10 days. Comprehensive (web + network + mobile): 2–3 weeks. Timelines depend on scope. A re-test is included after you fix the critical and high findings.",
  },
  {
    q: "Do you provide training in Marathi for cooperative bank staff?",
    a: "Yes. Our security awareness training is available in Marathi, Hindi and English. Marathi-language training is particularly effective for branch staff in Kolhapur, Sangli, Ichalkaranji and Western Maharashtra.",
  },
  {
    q: "What certifications do your security testers hold?",
    a: "Our team holds CEH (Certified Ethical Hacker), OSCP (Offensive Security Certified Professional), CISM, and other industry certifications. We provide tester credentials on request before any engagement.",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#0b1220]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-5 bg-blue-400/5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Answers to the most common questions about our cybersecurity services.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-[#141d2e] rounded-xl border transition-all duration-200 overflow-hidden ${
                open === i ? "border-[#2B7BE4]/40" : "border-gray-800 hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="text-white font-semibold leading-snug">{faq.q}</span>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  open === i
                    ? "bg-gradient-to-br from-[#2B7BE4] to-[#7C3AED]"
                    : "bg-gray-800"
                }`}>
                  {open === i
                    ? <FiMinus className="w-3.5 h-3.5 text-white" />
                    : <FiPlus className="w-3.5 h-3.5 text-gray-400" />
                  }
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}