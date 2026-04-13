import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  TwitterIcon,
  Facebook01Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Data structure for mapped link columns
  const footerLinks = [
    {
      title: "Shop",
      links: ["All Footwear", "New Arrivals", "Best Sellers", "Accessories"],
    },
    {
      title: "Company",
      links: ["Our Story", "Sustainability", "Materials", "Journal"],
    },
    {
      title: "Help",
      links: ["Shipping", "Returns", "Size Guide", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Use", "Cookies"],
    },
  ];

  const socialLinks = [
    { icon: InstagramIcon, href: "#" },
    { icon: TwitterIcon, href: "#" },
    { icon: Facebook01Icon, href: "#" },
  ];

  return (
    <footer className="w-full bg-secondary border-t border-gray-100 pt-20 pb-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="max-w-md">
            <h2 className="text-3xl font-light tracking-tighter mb-6 uppercase text-white">
              Nimble
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Crafting sustainable steps for the conscious explorer. Our
              footwear is designed to move with you and the planet.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  <HugeiconsIcon icon={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-white">
              Join the Journey
            </h3>
            <p className="text-white/70 mb-6">
              Receive early access to drops and sustainability reports.
            </p>
            <form className="relative flex items-center border-b border-white/30 pb-2 group">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-lg font-light text-white placeholder:text-white/30"
              />
              <button
                type="submit"
                className="text-white/50 group-hover:text-primary transition-colors"
              >
                <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Mapped Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {footerLinks.map((column, colIndex) => (
            <div key={colIndex}>
              <h4 className="font-medium text-sm mb-6 uppercase tracking-wider text-white">
                {column.title}
              </h4>
              <ul className="space-y-4 text-white/60 text-sm font-light">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <p>© {currentYear} Nimble Footwear. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built for the conscious path.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
