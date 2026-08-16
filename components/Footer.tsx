import Link from "next/link";
import Image from "next/image";
import { Copyright } from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { config } from "@/lib/config";

const WA_LINK = `https://wa.me/${config.whatsapp.number}`;

const Footer = () => {
  return (
    <footer className="bg-black text-gray-600">
      <div className="max-w-6xl mx-auto pt-20 pb-10 px-6 md:px-12 2xl:px-0 flex flex-col gap-8">
        {/* Top — brand + columns */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-6 max-w-xs shrink-0">
            <Link href="/" className="flex flex-col gap-1">
              <div className="relative w-12 h-12">
                <Image
                  src="/favicon.ico"
                  alt="Atlas"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="cursive text-2xl text-white uppercase font-medium">
                  Atlas
                </h2>
                <p className="text-[11px] text-[#dd9e5e] font-bold tracking-wide">
                  {config.showTravel ? "SaaS & Travel, One Platform" : "Digital Infrastructure, Done Right"}
                </p>
              </div>
            </Link>
            <p className="text-xs leading-relaxed">
              {config.showTravel
                ? "Building SaaS tools and AI-powered travel experiences that help you operate smarter and explore further."
                : "Building SaaS tools and digital systems that help businesses operate smarter."}
            </p>
            <ul className="flex gap-2">
              {[
                { href: WA_LINK, icon: <FaWhatsapp size={16} /> },
                {
                  href: config.social.instagramUrl,
                  icon: <FaInstagram size={16} />,
                },
                {
                  href: "https://www.linkedin.com/",
                  icon: <FaLinkedin size={16} />,
                },
                {
                  href: `mailto:${config.contact.email}`,
                  icon: <FaEnvelope size={16} />,
                },
              ].map(({ href, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex rounded-xl bg-white/5 hover:bg-[#dd9e5e]/10 border border-white/10 p-2 hover:border-[#dd9e5e]/20 hover:scale-105 duration-300 text-white/40 hover:text-[#dd9e5e]"
                  >
                    {icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns — mirrors NAV_LINKS structure */}
          <div className={`grid grid-cols-2 gap-8 text-[12px] font-medium w-full ${config.showTravel ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
            {/* SaaS — mirrors nav dropdown */}
            <div>
              <h6 className="text-white text-sm font-semibold mb-4">SaaS</h6>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "Dashboard", href: "/billing" },
                  { label: "Subscription Plans", href: "/software#get-started-pricing" },
                  { label: "Support", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-[#dd9e5e] transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel — mirrors nav dropdown */}
            {config.showTravel && (
              <div>
                <h6 className="text-white text-sm font-semibold mb-4">Travel</h6>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { label: "Overview", href: "/travel/itinerary" },
                    { label: "Book", href: "/travel/book" },
                    { label: "Discover", href: "/travel/explore" },
                    { label: "Travel Guides", href: "/travel/insights" },
                    { label: "About", href: "/travel/about" },
                    { label: "Contact", href: "/travel/contact" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-[#dd9e5e] transition-colors duration-200">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Connect */}
            <div>
              <h6 className="text-white text-sm font-semibold mb-4">Connect</h6>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "WhatsApp Us", href: WA_LINK, external: true },
                  { label: "Instagram", href: config.social.instagramUrl, external: true },
                  { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
                  { label: config.contact.email, href: `mailto:${config.contact.email}` },
                ].map(({ label, href, external }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="hover:text-[#dd9e5e] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company — Home + About Us + Contact nav items */}
            <div>
              <h6 className="text-white text-sm font-semibold mb-4">Company</h6>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "Overview", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Insights", href: "/insights" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-[#dd9e5e] transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter strip */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h6 className="text-white text-sm font-semibold mb-2">
              Stay in the loop
            </h6>
            <p className="text-xs text-gray-500">
              Systems insights, product updates, and resources — straight to
              your inbox.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-2.5 rounded-3xl text-xs bg-white/10 text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-white/20"
            />
            <button className="btn-primary-sm">Subscribe</button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <Copyright size={12} />
            <span>2026 Atlas. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/terms" className="hover:text-[#dd9e5e] transition-colors duration-200">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[#dd9e5e] transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
