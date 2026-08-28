"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiShield, FiCalendar } from "react-icons/fi";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { value: 640,  suffix: "+", label: "Clients" },
  { value: 30,   suffix: "+", label: "Countries" },
  { value: 5800, suffix: "+", label: "Projects" },
  { value: 9,    suffix: "+", label: "Years" },
];

function StatItem({ value, suffix, label, animate }: { value: number; suffix: string; label: string; animate: boolean }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-5 px-2 sm:px-4">
      <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none"
        style={{ background: "linear-gradient(135deg,#e53e3e,#fc4f4f,#ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {animate ? count : 0}{suffix}
      </span>
      <span className="mt-2 text-[10px] sm:text-xs font-semibold tracking-widest text-gray-400 uppercase">{label}</span>
    </div>
  );
}

const trustBadges = [
  { label: "Certified Experts", sub: "CEH · OSCP · CISM" },
  { label: "RBI Compliant", sub: "Empanelled Auditor" },
  { label: "ISO 27001", sub: "Certified Operations" },
  { label: "Pan-India + Global", sub: "Remote & On-site" },
];

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimateStats(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0b1220]">

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-[#2B7BE4] rounded-full filter blur-3xl opacity-[0.12] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-[#FF5CA8] rounded-full filter blur-3xl opacity-[0.10] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-[#7C3AED] rounded-full filter blur-3xl opacity-[0.08] animate-pulse" style={{ animationDelay: "0.5s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-10 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/20 rounded-full px-4 py-2 mb-8 bg-blue-400/5">
          <FiShield className="w-3.5 h-3.5" />
          Trusted Cybersecurity Risk Advisory
        </div>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 max-w-5xl mx-auto">
          <span className="text-white">Reduce Business Risk.</span>
          <br />
          <span style={{ background: "linear-gradient(135deg,#2B7BE4 0%,#FF5CA8 50%,#7C3AED 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Not Just Fix Vulnerabilities.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
          Cybria Secure is a leading cybersecurity risk advisory firm serving 640+ organizations across 30+ countries.
          Layered security across offensive testing, compliance, and continuous monitoring.
        </p>
        <p className="text-sm text-gray-500 mb-10">
          Headquartered in Kolhapur, Maharashtra · Serving all of India & Global clients
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#2B7BE4]/30"
            style={{ background: "linear-gradient(135deg,#2B7BE4,#FF5CA8,#7C3AED)" }}>
            Book a Security Assessment
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+918080424274"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 hover:border-gray-500 transition-all duration-300">
            <FiCalendar className="w-4 h-4" />
            Schedule a Meeting
          </a>
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="max-w-3xl mx-auto mb-10">
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(15,20,40,0.85)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
            <div className="flex divide-x divide-white/[0.07]">
              {stats.map((stat) => (
                <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} animate={animateStats} />
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 bg-[#141d2e] border border-gray-800 rounded-full px-4 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-xs text-white font-semibold">{badge.label}</span>
              <span className="text-xs text-gray-500">{badge.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}