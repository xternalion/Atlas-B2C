import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { config } from "@/lib/config";

export default function Founder() {
  return (
    <section id="why-atlas" className="relative overflow-hidden bg-white py-24 2xl:py-32">
      <div className="max-w-6xl mx-auto px-8 md:px-12 2xl:px-0 grid lg:grid-cols-[320px_1fr] gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-6 bg-[#dd9e5e]/10 rounded-[2rem] blur-2xl pointer-events-none" />
          <div className="relative rounded-3xl border border-black/8 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="relative w-full aspect-square bg-[#0d0d0d]">
              <Image
                src="/X.svg"
                alt="Atlas"
                fill
                className="object-contain p-16 opacity-70"
              />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-[#0a0908] text-sm font-extrabold">Atlas</p>
                <p className="text-black/40 text-xs">Remote-First · Global</p>
              </div>
              <div className="flex items-center gap-2 text-black/40">
                <a
                  href={config.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#dd9e5e] transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href={`https://wa.me/${config.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#dd9e5e] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="hover:text-[#dd9e5e] transition-colors"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8874a]" />
            <span className="text-[#c8874a] text-[11px] font-bold tracking-[0.3em] uppercase">
              Why Atlas
            </span>
          </div>
          <h2 className="cursive font-medium text-[#0a0908] uppercase text-4xl md:text-5xl leading-tight mb-6">
            Built like a
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              product company.
            </span>
          </h2>
          <p className="text-black/55 text-sm md:text-base leading-relaxed mb-4 max-w-xl">
            Atlas runs on process, not improvisation — discovery, architecture,
            build, and support, applied the same way on every engagement.
            No revolving door of freelancers, no reinventing the approach each
            time: one team, one standard, every project.
          </p>
          <p className="text-black/40 text-sm md:text-base leading-relaxed max-w-xl">
            {config.showTravel
              ? "From CMS platforms to AI-powered travel booking, every product ships through the same pipeline — tested, documented, and built to be handed off cleanly."
              : "From CMS platforms to full-stack automation, every product ships through the same pipeline — tested, documented, and built to be handed off cleanly."}
          </p>
        </div>
      </div>
    </section>
  );
}
