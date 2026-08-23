"use client";

import Image from "next/image";
import { useState } from "react";

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
    description:
      "Sales and Marketing leader with 5+ years experience in IT services and cybersecurity",
    gradient: "from-[#FF5CA8] to-[#EC4899]",
    image: "/images/team/tanvi.jpeg",
  },
];

export default function TeamSection() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (name: string) => {
    setImageErrors((prev) => new Set(prev).add(name));
  };

  return (
    <div className="mb-16 mt-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Meet the Visionaries Behind CYBRIA SECURE
      </h2>
      <p className="text-gray-400 mb-12 max-w-4xl mx-auto text-center">
        Founded by Sameer Nejkar (Founder & CEO) and Tanvi Dhatrak (Founder &
        Managing Director), CYBRIA SECURE brings together cybersecurity expertise
        and strategic leadership. United by a commitment to trust, innovation,
        and resilience, they are dedicated to helping organizations navigate the
        digital landscape with confidence and security.
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
              className="bg-[#1a2236] rounded-2xl p-8 text-center border border-gray-800 hover:border-transparent transition-all duration-300"
            >
              <div
                className={`relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.gradient} p-1`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#1a2236]">
                  {!hasImageError ? (
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role} at Cybria Secure`}
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
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-[#2B7BE4] font-medium mb-4">{member.role}</p>
              {/* <p className="text-gray-400 text-sm">{member.description}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
