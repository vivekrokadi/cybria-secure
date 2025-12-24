import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact Cybria Secure | Cybersecurity Services in Kolhapur",
  description:
    "Get in touch with Cybria Secure for cybersecurity solutions in Kolhapur, Ichalkaranji, Miraj, Sangli, Solapur. Call +91 80804 24274",
  keywords:
    "contact cybersecurity, Kolhapur security services, cybersecurity consultation, incident response contact",
};

const contactInfo = [
  {
    icon: FiMapPin,
    title: "Our Office",
    details:
      "110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008",
  },
  {
    icon: FiPhone,
    title: "Phone Numbers",
    details: "+91 80804 24274\n+91 75591 35608",
  },
  {
    icon: FiMail,
    title: "Email Address",
    details: "sales@cybriasecure.com",
    link: "mailto:sales@cybriasecure.com",
  },
  {
    icon: FiClock,
    title: "Working Hours",
    details: "Monday - Friday: 9:30 AM - 6:30 PM",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Cybria Secure",
    description: "Contact page for Cybria Secure cybersecurity services",
    url: "https://www.cybriasecure.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Cybria Secure",
      telephone: "+918080424274",
      email: "sales@cybriasecure.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "110, Mark 1034 Commercial Complex, E Ward, Rajaram Road, Near Parvati Multiplex, Kolhapur, 416008",
        addressLocality: "Kolhapur",
        addressRegion: "Maharashtra",
        postalCode: "416110",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Get in </span>
              <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to secure your digital assets? Contact our cybersecurity
              experts for a free consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gradient-to-br from-[#2B7BE4]/20 to-[#7C3AED]/20 rounded-lg">
                          <item.icon className="w-6 h-6 text-[#2B7BE4]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-gray-400 hover:text-[#2B7BE4] transition-colors whitespace-pre-line"
                          >
                            {item.details}
                          </a>
                        ) : (
                          <p className="text-gray-400 whitespace-pre-line">
                            {item.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center">
                    Follow Us
                  </h3>
                  <div className="flex space-x-6 justify-center">
                    <a
                      href="https://www.linkedin.com/company/cybria-secure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#1a2236] rounded-lg hover:bg-[#2B7BE4] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="https://instagram.com/cybria_secure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#1a2236] rounded-lg hover:bg-gradient-to-r hover:from-[#2B7BE4] hover:via-[#FF5CA8] hover:to-[#7C3AED] transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <FiInstagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://wa.me/918080424274?text=Hello%20Cybria%20Secure%2C%20I%20need%20cybersecurity%20assistance."
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="p-3 bg-gradient-to-r from-[#1a2236] to-[#2B7BE4]/10 rounded-lg hover:bg-gradient-to-r hover:from-[#25D366] hover:to-[#128C7E] transition-all duration-300 group relative overflow-hidden"
                      aria-label="Start WhatsApp chat with Cybria Secure"
                      title="Message us on WhatsApp for immediate help"
                    >
                      {/* WhatsApp gradient background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/10 to-[#128C7E]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <FaWhatsapp className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />

                      {/* Tooltip on hover (optional) */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Chat on WhatsApp
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#1a2236] rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and our cybersecurity experts will get
                  back to you within 24 hours.
                </p>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
