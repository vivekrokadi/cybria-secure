"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setShowMessage(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "918080424274";
  const message = encodeURIComponent(
    "Hello Cybria Secure! I'm interested in your cybersecurity services. Can you help me?"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleChatClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  if (!isClient) return null;

  return (
    // FIXED: pointer-events-none on the container so it never blocks page content.
    // Each interactive child has pointer-events-auto.
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Chat panel */}
      <div
        className={`mb-4 transition-all duration-300 pointer-events-auto ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-[#1a2236] rounded-2xl shadow-2xl border border-gray-800 w-72 overflow-hidden">
          <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Cybria Secure</h3>
                <p className="text-xs text-white/80">Typically replies instantly</p>
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

          <div className="p-4 bg-[#0b1220]">
            <div className="flex items-start gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center flex-shrink-0">
                <FiMessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#1a2236] rounded-lg p-3 text-sm text-gray-300">
                Hi! 👋 How can we help you with cybersecurity today?
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {["💬 Chat with our security experts", "📞 Request a callback", "📋 Get a free quote"].map(
                (label) => (
                  <button
                    key={label}
                    onClick={handleChatClick}
                    className="w-full text-left bg-[#1a2236] hover:bg-[#2a3347] p-3 rounded-lg text-sm text-gray-300 transition-colors border border-gray-800"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification badge */}
      {!isOpen && showMessage && (
        <div
          className="mb-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-2 rounded-full shadow-lg animate-bounce cursor-pointer pointer-events-auto"
          onClick={() => setIsOpen(true)}
        >
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Chat with us! 👋
          </p>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative group pointer-events-auto"
        aria-label="WhatsApp chat"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <div
          className={`relative w-16 h-16 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <IoClose className="w-8 h-8 text-white" />
          ) : (
            <FaWhatsapp className="w-8 h-8 text-white" />
          )}
        </div>
      </button>
    </div>
  );
}
