"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";


const clients = [
  {
    id: 1,
    name: "Client 1",
    logo: "/images/client1.png",
  },
  {
    id: 2,
    name: "Client 2",
    logo: "/images/client2.webp",
  },
  {
    id: 3,
    name: "Client 3",
    logo: "/images/client3.jpeg",
  },
  {
    id: 4,
    name: "Client 4",
    logo: "/images/client9.webp",
  },
  {
    id: 5,
    name: "Client 5",
    logo: "/images/client5.webp",
  },
  {
    id: 6,
    name: "Client 6",
    logo: "/images/client6.png",
  },
  {
    id: 7,
    name: "Client 7",
    logo: "/images/client7.jpg",
  },
  {
    id: 8,
    name: "Client 8",
    logo: "/images/client8.png",
  },
  {
    id: 8,
    name: "Client 8",
    logo: "/images/client4.png",
  },
];

export default function Clients() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredLogoId, setHoveredLogoId] = useState<number | null>(null);
  const animationRef = useRef<number>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scrollSpeed = 0.6;

    const smoothScroll = () => {
      if (!scrollElement) return;
      
      
      if (!isHovered) {
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  const handleImageError = (clientId: number) => {
    setImageErrors(prev => new Set(prev).add(clientId));
  };

  const handleContainerMouseEnter = () => {
    setIsHovered(true);
  };

  const handleContainerMouseLeave = () => {
    setIsHovered(false);
    setHoveredLogoId(null);
  };

  const handleLogoMouseEnter = (clientId: number) => {
    setHoveredLogoId(clientId);
  };

  const handleLogoMouseLeave = () => {
    setHoveredLogoId(null);
  };

  
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
        
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0b1220] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0b1220] to-transparent z-10"></div>

        
        <div
          ref={scrollRef}
          className="overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
        >
          <div className="inline-flex gap-16 items-center py-8 px-4">
            {duplicatedClients.map((client, index) => {
              const uniqueKey = `${client.id}-${index}`;
              const hasError = imageErrors.has(client.id);
              const isThisLogoHovered = hoveredLogoId === client.id;
              
              return (
                <div
                  key={uniqueKey}
                  className="flex-shrink-0 group"
                  onMouseEnter={() => handleLogoMouseEnter(client.id)}
                  onMouseLeave={handleLogoMouseLeave}
                >
                  <div className={`relative w-44 h-28 transition-all duration-300`}>
                    {!hasError ? (
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain"
                        onError={() => handleImageError(client.id)}
                        sizes="(max-width: 768px) 120px, 120px"
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

      

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        div[ref]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}