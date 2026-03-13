"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // Start as false
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Solution 1: Use useEffect to handle client-only logic
  useEffect(() => {
    setIsClient(true);

    // Only show message after hydration is complete
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "918080424274";
  const message = encodeURIComponent(
    "Hello Cybria Secure! I'm interested in your cybersecurity services. Can you help me?",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleChatClick = () => {
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Message Bubble */}
      {(showMessage || isOpen) && (
        <div
          className={`mb-4 transition-all duration-300 transform ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-[#1a2236] rounded-2xl shadow-2xl border border-gray-800 w-72 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Cybria Secure</h3>
                  <p className="text-xs text-white/80">
                    Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#0b1220]">
              <div className="flex items-start gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#1a2236] rounded-lg p-3 text-sm text-gray-300">
                  Hi! 👋 How can we help you with cybersecurity today?
                </div>
              </div>

              {/* Quick Options */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={handleChatClick}
                  className="w-full text-left bg-[#1a2236] hover:bg-[#2a3347] p-3 rounded-lg text-sm text-gray-300 transition-colors border border-gray-800"
                >
                  💬 Chat with our security experts
                </button>
                <button
                  onClick={handleChatClick}
                  className="w-full text-left bg-[#1a2236] hover:bg-[#2a3347] p-3 rounded-lg text-sm text-gray-300 transition-colors border border-gray-800"
                >
                  📞 Request a callback
                </button>
                <button
                  onClick={handleChatClick}
                  className="w-full text-left bg-[#1a2236] hover:bg-[#2a3347] p-3 rounded-lg text-sm text-gray-300 transition-colors border border-gray-800"
                >
                  📋 Get a free quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initial Hover Message - Only show on client */}
      {!isOpen && showMessage && (
        <div
          className="mb-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-2 rounded-full shadow-lg animate-bounce cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Chat with us! 👋
          </p>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group"
        aria-label="WhatsApp chat"
      >
        {/* Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>

        {/* Main Button */}
        <div
          className={`
          relative w-16 h-16 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] 
          flex items-center justify-center shadow-2xl cursor-pointer
          transform transition-all duration-300 hover:scale-110
          ${isOpen ? "rotate-90" : "rotate-0"}
        `}
        >
          {isOpen ? (
            <IoClose className="w-8 h-8 text-white" />
          ) : (
            <FaWhatsapp className="w-8 h-8 text-white" />
          )}
        </div>

        {/* Tooltip */}
        <div
          className={`
          absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg
          whitespace-nowrap transition-all duration-200
          ${isHovered && !isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}
        `}
        >
          Chat with us
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      </button>

      
      {/* {!isOpen && isClient && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
          1
        </div>
      )} */}
    </div>
  );
}
