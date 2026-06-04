"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clients = [
  { id: 1,  name: "Client 1",  logo: "/images/client9.webp" },
  { id: 2,  name: "Client 2",  logo: "/images/client5.webp" },
  { id: 3,  name: "Client 3",  logo: "/images/client3.jpeg" },
  { id: 4,  name: "Client 4",  logo: "/images/client1.png" },
  { id: 5,  name: "Client 5",  logo: "/images/client2.webp" },
  { id: 6,  name: "Client 6",  logo: "/images/client6.png" },
  { id: 7,  name: "Client 7",  logo: "/images/client7.jpg" },
  { id: 8,  name: "Client 8",  logo: "/images/client8.png" },
  // FIXED: was duplicate id:8 — changed to id:9
  { id: 9,  name: "Client 9",  logo: "/images/client10.jpg" },
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
