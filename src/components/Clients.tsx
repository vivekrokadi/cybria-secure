"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clients = [
  { id: 1,  name: "Suntel Global",  logo: "/images/suntel_global.webp" },
  { id: 2,  name: "Synergy Green Industries",  logo: "/images/synergy_green_industries_ltd.png" },
  { id: 3,  name: "shivaji university kolhapur",  logo: "/images/shivaji_university_kolhapur.jpeg" },
  { id: 4,  name: "nashik zilla bank",  logo: "/images/nashik_zilla_bank.webp" },
  { id: 5,  name: "latur urban bank",  logo: "/images/latur_urban_bank.png" },
  { id: 6,  name: "Deendayal_Bank",  logo: "/images/Deendayal_Bank.webp" },
  { id: 7,  name: "talk2_site",  logo: "/images/talk2_site.webp" },
  { id: 8,  name: "rags_bank",  logo: "/images/rags_bank.png" },
  { id: 9,  name: "pratap_industries",  logo: "/images/pratap_industries.jpg" },
  { id: 10,  name: "pdp bank",  logo: "/images/pdp_bank.jpg" },
  { id: 11,  name: "koyana bank",  logo: "/images/koyana_bank.jpg" },
  { id: 12,  name: "neelkanth_bank",  logo: "/images/neelkanth_bank.png" },
  { id: 13,  name: "vikas_sahakari_bank",  logo: "/images/vikas_sahakari_bank.jpg" },
  { id: 14,  name: "lokavikas_bank",  logo: "/images/lokavikas_bank.png" },
  { id: 15,  name: "shivdaulat_bank",  logo: "/images/shivdaulat_bank.png" },
  { id: 15,  name: "the_jalna_co_op_bank",  logo: "/images/the_jalna_co_op_bank.jpg" },
];

export default function Clients() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const isHoveredRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scrollSpeed = 0.6;

    const smoothScroll = () => {
      if (!isHoveredRef.current) {
        scrollPositionRef.current += scrollSpeed;
        if (scrollPositionRef.current >= scrollElement.scrollWidth / 2) {
          scrollPositionRef.current = 0;
        }
        scrollElement.scrollLeft = scrollPositionRef.current;
      }
      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    animationRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // no dependency on state — use ref for hover to avoid restarting RAF
  }, []);

  // Duplicated for seamless loop
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-16 bg-[#0b1220] overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-gradient">Trusted</span>
            <span className="text-white"> Clients</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're proud to work with innovative companies across various industries
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0b1220] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0b1220] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => { isHoveredRef.current = true }}
          onMouseLeave={() => { isHoveredRef.current = false }}
        >
          <div className="inline-flex gap-16 items-center py-8 px-4">
            {duplicatedClients.map((client, index) => {
              const uniqueKey = `${client.id}-${index}`;
              const hasError = imageErrors.has(client.id);

              return (
                <div key={uniqueKey} className="flex-shrink-0">
                  <div className="relative w-44 h-28">
                    {!hasError ? (
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                        onError={() =>
                          setImageErrors((prev) => new Set(prev).add(client.id))
                        }
                        sizes="176px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a2236] rounded-lg flex items-center justify-center border border-gray-800">
                        <span className="text-sm text-gray-500 font-medium">
                          {client.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
