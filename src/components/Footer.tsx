import Link from "next/link";
import {
  FiShield,
  FiMapPin,
  FiPhone,
  FiMail,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

const services = [
  { name: "Cyber Security", href: "/services/cyber-security" },
  {
    name: "Governance Risk Assessment",
    href: "/services/governance-risk-assessment",
  },
  { name: "Training and Awareness", href: "/services/training-awareness" },
  { name: "Banking Security", href: "/services/banking-security" },
  { name: "Incident Response", href: "/services/incident-response" },
];

const locations = [
  { name: "Kolhapur", href: "/kolhapur" },
  { name: "Ichalkaranji", href: "/ichalkaranji" },
  { name: "Miraj", href: "/miraj" },
  { name: "Sangli", href: "/sangli" },
  { name: "Solapur", href: "/solapur" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a111f] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img src="/logorm.png" className="w-24" alt="" />
            </div>
            <p className="text-gray-400 mb-6">
              Defending your digital existence. Leading cybersecurity services
              provider serving businesses across Globe.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/cybria-secure"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1a2236] rounded-lg hover:bg-[#2B7BE4] transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/cybria_secure"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1a2236] rounded-lg hover:bg-gradient-to-r hover:from-[#2B7BE4] hover:via-[#FF5CA8] hover:to-[#7C3AED] transition-all duration-300"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#2B7BE4] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-[#2B7BE4] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-[#2B7BE4] mt-1 flex-shrink-0" />
                <a href="https://maps.app.goo.gl/2qtzNYL1KRo7MXci7">
                  <span className="text-gray-400 hover:text-white transition-colors">
                    110, Mark 1034 Commercial Complex, E Ward, Rajaram Road,
                    Near Parvati Multiplex, Kolhapur, 416008
                  </span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-[#2B7BE4] flex-shrink-0" />
                <div className="text-gray-400">
                  <a
                    href="tel:+918080424274"
                    className="hover:text-white transition-colors block"
                  >
                    +91 80804 24274
                  </a>
                  <a
                    href="tel:+917559135608"
                    className="hover:text-white transition-colors block"
                  >
                    +91 75591 35608
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-[#2B7BE4] flex-shrink-0" />
                <a
                  href="mailto:sales@cybriasecure.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  sales@cybriasecure.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-center items-center ">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Cybria Secure. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
