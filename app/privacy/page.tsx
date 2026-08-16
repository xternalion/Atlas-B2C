import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Privacy Policy | Atlas",
  description: "How Atlas collects, uses, and protects your personal information.",
  alternates: { canonical: `${baseUrl}/privacy` },
};

const items = [
  "Atlas may collect contact information, inquiry details, analytics data, and information voluntarily submitted by users.",
  "Information is used to respond to inquiries, provide services, improve products, and communicate with users.",
  "Atlas may use cookies and analytics tools.",
  "Atlas does not sell personal information.",
  "Information may be shared with service providers where necessary to operate services.",
  "Reasonable security measures are implemented to protect data.",
  "Users may request correction or deletion of personal information where applicable.",
];

export default function PrivacyPage() {
  return (
    <div className="relative bg-[#0d0d0d] text-white min-h-screen">
      <div className="absolute -top-32 -right-32 w-125 h-125 bg-[#dd9e5e]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
            Legal
          </span>
          <h1 className="cursive text-3xl md:text-4xl font-medium text-white uppercase mt-6 mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm leading-relaxed">
            Last updated: 2026. This policy explains how Atlas handles your information.
          </p>
        </div>

        {/* Policy items */}
        <div className="border-l border-white/8 pl-5 flex flex-col gap-5">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-[#dd9e5e]/50 text-xs font-bold mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-white/45 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Contact note */}
        <div className="mt-14 p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
          <p className="text-white/25 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Questions?</p>
          <p className="text-white/45 text-sm leading-relaxed">
            Questions regarding this policy should be directed through the official contact channels published on{" "}
            <a href="/contact" className="text-[#dd9e5e] hover:underline">AtlasInc.io</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
