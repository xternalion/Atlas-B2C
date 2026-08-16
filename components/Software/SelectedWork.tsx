import { Building2, PlaneTakeoff, ArrowUpRight } from "lucide-react";

const CASE_STUDIES = [
  {
    icon: Building2,
    name: "DLink Estate",
    url: "dlink-estate.com",
    href: "https://dlink-estate.com",
    tags: ["Real Estate", "Listings", "CMS"],
    description:
      "A full property marketplace — thousands of verified listings across houses, apartments, villas, and commercial spaces, with transparent pricing and expert guidance built in.",
  },
  {
    icon: PlaneTakeoff,
    name: "TravQuest Travel & Tourism",
    url: "travquesttravel.com",
    href: "https://travquesttravel.com",
    tags: ["Travel Agency", "Bookings", "Dubai"],
    description:
      "The digital storefront for a licensed Dubai travel agency — luxury holiday packages, city tours, desert safaris, visa services, and serviced apartments across the UAE and worldwide.",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="relative overflow-hidden bg-white py-24 2xl:py-32">
      <div className="max-w-6xl mx-auto px-8 md:px-12 2xl:px-0">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8874a]" />
            <span className="text-[#c8874a] text-[11px] font-bold tracking-[0.3em] uppercase">
              Selected Work
            </span>
            <div className="h-px w-8 bg-[#c8874a]" />
          </div>
          <h2 className="cursive font-medium text-[#0a0908] uppercase leading-tight mb-6 text-4xl md:text-5xl">
            Real businesses,
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              running on AtlasCore.
            </span>
          </h2>
          <p className="text-black/45 text-sm md:text-base leading-relaxed">
            A look at live platforms we&apos;ve built and shipped — each one running
            on the same core modules powering Atlas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CASE_STUDIES.map(({ icon: Icon, name, url, href, tags, description }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-6 p-8 rounded-3xl border border-black/8 bg-[#faf9f7] hover:border-[#dd9e5e]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#dd9e5e]/10 border border-[#dd9e5e]/20 flex items-center justify-center group-hover:bg-[#dd9e5e] group-hover:border-[#dd9e5e] transition-all duration-300 shrink-0">
                  <Icon size={20} className="text-[#c8874a] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black/35 group-hover:text-[#a0622e] transition-colors duration-300">
                  {url}
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </div>

              <div>
                <h3 className="font-bold text-[#0a0908] text-xl leading-snug mb-2.5">{name}</h3>
                <p className="text-black/45 text-sm leading-relaxed">{description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-[#dd9e5e]/25 bg-[#dd9e5e]/8 px-3 py-1 text-[11px] font-semibold text-[#a0622e]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
