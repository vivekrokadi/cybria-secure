"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const GSAPHero = dynamic(() => import("./GSAPHero"), { ssr: false });

// Animated counter hook
function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

const stats = [
  { value: 50, suffix: "+", label: "CLIENTS" },
  { value: 10,  suffix: "+", label: "CITIES" },
  { value: 175, suffix: "+", label: "PROJECTS" },
  { value: 4,   suffix: "+", label: "YEARS" },
];

function StatItem({ value, suffix, label, animate }: { value: number; suffix: string; label: string; animate: boolean }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4">
      <span
        className="text-4xl sm:text-5xl font-extrabold leading-none"
        style={{
          background: "linear-gradient(135deg, #3779E0 0%, #FA5BAB 60%, #964AE1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {animate ? count : 0}{suffix}
      </span>
      <span className="mt-2 text-xs sm:text-sm font-semibold tracking-widest text-gray-400 uppercase">
        {label}
      </span>
    </div>
  );
}

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
    <section className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center overflow-hidden bg-[url('/cybriasecure-logo.png')] bg-no-repeat bg-center">
      <div className="absolute inset-0 bg-[#0F1729]/60" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#2B7BE4]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-[#FF5CA8]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-[#7C3AED]/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2B7BE4] rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5CA8] rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#7C3AED] rounded-full filter blur-3xl opacity-20 animate-pulse delay-500" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-5xl text-gray-300 mb-2 leading-relaxed font-bold">
          From Threats to Trust – We Secure It All
        </h1>

        <div className="mt-10 max-w-3xl mx-auto">
          <p className="text-[15px] sm:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
            Cybria Secure, a leading cyber security risk advisory firm that
            helps organizations reduce risk & enhance competitive advantage.
            With a core team of experienced domain experts and certified
            professionals, we offer economically viable solutions to all our
            valued clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div ref={statsRef} className="mt-14 w-full max-w-3xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(15, 20, 40, 0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex divide-x divide-white/[0.07]">
              {stats.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  animate={animateStats}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}