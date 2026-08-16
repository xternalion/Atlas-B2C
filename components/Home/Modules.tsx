import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  CreditCard,
  Workflow,
  BarChart3,
  Sparkles,
} from "lucide-react";

const MODULES = [
  {
    icon: ShieldCheck,
    title: "Auth & Access",
    desc: "Secure sign-in and role-based access across every product.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "One account to manage subscriptions, builds, and bookings.",
  },
  {
    icon: FileText,
    title: "CMS & Content",
    desc: "Full content management with media uploads built in.",
  },
  {
    icon: CreditCard,
    title: "Billing & Subscriptions",
    desc: "One-time builds or monthly plans, invoiced automatically.",
  },
  {
    icon: Workflow,
    title: "Automation & Workflows",
    desc: "Forms, waitlists, and notifications that run themselves.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Track usage, performance, and growth in real time.",
  },
  {
    icon: Sparkles,
    title: "AI Tools",
    desc: "AI-assisted features across the platform — itinerary generation included.",
  },
];

export default function Modules() {
  return (
    <section id="modules" className="relative overflow-hidden bg-[#0d0d0d] text-white py-24 2xl:py-32">
      <div className="absolute -bottom-32 -left-32 w-125 h-125 bg-[#dd9e5e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 md:px-12 2xl:px-0">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#dd9e5e]" />
            <span className="text-[#dd9e5e] text-[11px] font-bold tracking-[0.3em] uppercase">
              Features &amp; Modules
            </span>
            <div className="h-px w-8 bg-[#dd9e5e]" />
          </div>
          <h2 className="cursive font-medium uppercase text-4xl md:text-5xl leading-tight mb-4">
            Seven modules.
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              One AtlasCore.
            </span>
          </h2>
          <p className="text-white/45 text-sm md:text-base leading-relaxed">
            Every build ships on the same core system — pick the modules your
            business needs, add more as you grow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-[#dd9e5e]/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#dd9e5e]/10 border border-[#dd9e5e]/20 flex items-center justify-center group-hover:bg-[#dd9e5e] group-hover:border-[#dd9e5e] transition-all duration-300">
                <Icon size={18} className="text-[#dd9e5e] group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                <p className="text-white/40 text-[12px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
