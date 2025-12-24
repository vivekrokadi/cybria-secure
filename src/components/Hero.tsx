"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const GSAPHero = dynamic(() => import("./GSAPHero"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('/cybriasecure-logo.png')] bg-no-repeat bg-center">
       <div className="absolute inset-0 bg-[#0F1729]/90"></div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#2B7BE4]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-[#FF5CA8]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-[#7C3AED]/10 via-transparent to-transparent"></div>

        {/* Animated Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2B7BE4] rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5CA8] rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#7C3AED] rounded-full filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        

          <h1 className="text-3xl sm:text-5xl text-gray-300 mb-2 leading-relaxed font-bold">From Threats to Trust – We Secure It All</h1>
        <div className="mt-12 max-w-3xl mx-auto">
          <p className="text-[15px] sm:text-xl text-gray-300 mb-8 leading-relaxed font-medium ">
            We are problem-solvers! Cybria Secure, a leading cyber security risk
            advisory firm that helps organizations reduce risk & enhance
            competitive advantage. With a core team of experienced domain
            experts and certified professionals, we offer economically viable
            solutions to all our valued customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-linear-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300 transform hover:-translate-y-1"
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

        
      </div>
    </section>
  );
}
