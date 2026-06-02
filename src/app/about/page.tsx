"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FiShield,
  FiUsers,
  FiTarget,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiGlobe,
} from "react-icons/fi";



export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Cybria Secure",
    description:
      "Cybria Secure is a leading cybersecurity risk advisory firm based in Kolhapur, Maharashtra",
    url: "https://www.cybriasecure.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "Cybria Secure",
      description:
        "We are problem-solvers! Cybria Secure, a leading cyber security risk advisory firm that helps organizations reduce risk & enhance competitive advantage.",
      foundingDate: "2020",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008",
        addressLocality: "Kolhapur",
        addressRegion: "Maharashtra",
        postalCode: "416110",
        addressCountry: "IN",
      },
      telephone: "+918080424274",
      email: "sales@cybriasecure.com",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "50+",
      }
    },
  };

  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const teamMembers = [
    {
      name: "Sameer Nejkar",
      role: "Founder & CEO",
      description:
        "OT Security Engineer with 5+ years Cyber Security experience in banking and enterprise security",
      gradient: "from-[#2B7BE4] to-[#3B82F6]",
      image: "/images/team/sameer.jpeg",
    },
    {
      name: "Tanvi Dhatrak",
      role: "Founder & Managing Director",
      description: "Sales and Marketing leader with 5+ years experience in IT services and cybersecurity",
      gradient: "from-[#FF5CA8] to-[#EC4899]",
      image: "/images/team/tanvi.jpeg",
    }
  ];

  const handleImageError = (name: string) => {
    setImageErrors((prev) => new Set(prev).add(name));
  };

  const benefits = [
    {
      icon: FiShield,
      title: "Certified Experts",
      description:
        "Our team holds CISSP, CEH, CISM certifications with years of hands-on experience.",
    },
    {
      icon: FiUsers,
      title: "Client Partnership",
      description:
        "We build long-term relationships based on trust, transparency, and mutual success.",
    },
    {
      icon: FiTarget,
      title: "Tailored Solutions",
      description:
        "Customized security strategies that fit your unique business needs and budget.",
    },
    {
      icon: FiAward,
      title: "Proven Track Record",
      description:
        "200+ successful projects and 98% client satisfaction across industries.",
    },
    {
      icon: FiClock,
      title: "24/7 Support",
      description:
        "Round-the-clock incident response and monitoring to keep you protected.",
    },
    {
      icon: FiTrendingUp,
      title: "Proactive Approach",
      description:
        "We don't just react; we anticipate threats and stay ahead of risks.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-20 bg-[#0b1220]">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="text-gradient">Cybria Secure</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A leading cybersecurity risk advisory firm helping organizations
              reduce risk and enhance competitive advantage worldwide.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-[#2B7BE4]/10 via-[#FF5CA8]/10 to-[#7C3AED]/10 rounded-2xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <FiShield className="w-12 h-12 text-[#2B7BE4] mr-4" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-2xl text-center text-white mb-6">
                From Threats to Trust – We Secure It All.
              </p>
              <p className="text-xl text-gray-300 text-center">
                Our mission is to empower organizations to overcome modern
                cybersecurity challenges by delivering integrated security
                solutions that combine advanced technology, strategic expertise,
                and continuous awareness. We aim to reduce risk arising from
                skill gaps, budget constraints, evolving threats, and human
                error through proactive protection and education.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FiShield,
                  title: "Security First",
                  description:
                    "Protecting our clients digital assets is our top priority in every solution we deliver.",
                  gradient: "from-[#2B7BE4] to-[#3B82F6]",
                },
                {
                  icon: FiUsers,
                  title: "Client Partnership",
                  description:
                    "We build long-term relationships based on trust, transparency, and mutual success.",
                  gradient: "from-[#FF5CA8] to-[#EC4899]",
                },
                {
                  icon: FiTarget,
                  title: "Excellence",
                  description:
                    "Striving for excellence in every aspect of our cybersecurity services and solutions.",
                  gradient: "from-[#7C3AED] to-[#8B5CF6]",
                },
                {
                  icon: FiAward,
                  title: "Innovation",
                  description:
                    "Continuously evolving our solutions to counter emerging cyber threats effectively.",
                  gradient: "from-[#2B7BE4] to-[#FF5CA8]",
                },
              ].map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-[#1a2236] rounded-xl p-6 border border-gray-800 hover:border-transparent transition-all duration-300"
                  >
                    <div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${value.gradient} mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Cybria Secure
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine expertise and dedication to protect what matters most
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-[#1a2236] rounded-xl p-6 border border-gray-800 hover:border-[#2B7BE4] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#0b1220] rounded-lg group-hover:bg-[#2B7BE4]/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#2B7BE4]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { number: "50+", label: "Experts", icon: FiUsers },
              { number: "200+", label: "Projects", icon: FiTarget },
              { number: "24/7", label: "Support", icon: FiClock },
              { number: "100+", label: "Clients", icon: FiGlobe },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex justify-center items-center w-16 h-16 bg-[#1a2236] rounded-lg mb-2">
                    <Icon className="w-10 h-10 text-[#2B7BE4]" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Team Section */}
          <div className="mb-16 mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Our Leadership Team
            </h2>
            <p className="text-gray-400 mb-12 max-w-4xl mx-auto text-center">
              Founded by Sameer Nejkar (Founder & CEO) and Tanvi Dhatrak (Founder & Managing Director), CYBRIA SECURE brings together cybersecurity expertise and strategic leadership. United by a commitment to trust, innovation, and resilience, they are dedicated to helping organizations navigate the digital landscape with confidence and security.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {teamMembers.map((member) => {
                const hasImageError = imageErrors.has(member.name);
                const initials = member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <div
                    key={member.name}
                    className="bg-[#1a2236] rounded-2xl p-8 text-center border border-gray-800 hover:border-transparent transition-all duration-300 group"
                  >
                    <div
                      className={`relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.gradient} p-1`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#1a2236]">
                        {!hasImageError ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={96}
                            height={96}
                            className="object-cover object-top w-full h-full"
                            onError={() => handleImageError(member.name)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#0b1220] text-2xl font-bold text-white">
                            {initials}
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#2B7BE4] font-medium mb-4">
                      {member.role}
                    </p>
                  </div>
                  
                );
              })}
            </div>
          </div>

          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Partner with Cybersecurity Experts
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              A leading cybersecurity risk advisory firm helping organizations
              reduce risk and strengthen their competitive advantage worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#2B7BE4] via-[#FF5CA8] to-[#7C3AED] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#2B7BE4]/30 transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}