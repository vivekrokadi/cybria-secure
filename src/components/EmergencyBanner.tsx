"use client";

import { useState } from "react";
import { FiX, FiPhone, FiShield } from "react-icons/fi";

export default function EmergencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative z-[60] bg-[#0b1220] border-b border-gray-800/80">
      {/* Top gradient hairline — echoes the site's brand gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg,#2B7BE4,#FF5CA8,#7C3AED)" }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-2.5 text-sm relative">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5CA8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5CA8]" />
            </span>
            <FiShield className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="text-gray-300 font-semibold hidden sm:inline">
              Experiencing a Security Incident?
            </span>
            <span className="text-gray-300 font-semibold sm:hidden">Security Incident?</span>
          </div>

          <div className="h-4 w-px bg-gray-700 hidden sm:block" />

          <a
            href="tel:+918080424274"
            className="group flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}
          >
            <FiPhone className="w-3.5 h-3.5 group-hover:animate-pulse" />
            <span className="whitespace-nowrap">24/7 Emergency Response: +91 80804 24274</span>
          </a>

          <span className="hidden md:inline text-gray-500 text-xs">
            → Immediate assistance available
          </span>

          <button
            onClick={() => setDismissed(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
            aria-label="Dismiss"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}