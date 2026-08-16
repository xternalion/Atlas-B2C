import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Terms & Conditions | Atlas",
  description: "Terms and conditions governing the use of AtlasInc.io and Atlas services.",
  alternates: { canonical: `${baseUrl}/terms` },
};

const sections = [
  {
    title: "Website Terms & Conditions",
    items: [
      "By using AtlasInc.io, users agree to these terms.",
      "Atlas provides software development, websites, CMS platforms, automation, consulting, and related digital services.",
      "Users may not misuse, copy, reverse engineer, or attempt unauthorized access to Atlas systems.",
      "Atlas content, branding, designs, code, and materials are protected by intellectual property laws.",
      "Atlas may modify, suspend, or discontinue services at any time.",
      "Atlas is not liable for indirect, incidental, or consequential damages.",
      "These terms may be updated periodically.",
    ],
  },
  {
    title: "Client Service Agreement",
    items: [
      "All projects require written approval before commencement.",
      "Clients must provide required content, feedback, and approvals in a timely manner.",
      "Delays caused by the client may affect delivery timelines.",
      "Change requests outside agreed scope may require additional fees.",
      "Atlas will provide reasonable progress updates throughout the project.",
      "Either party may terminate the agreement subject to outstanding obligations.",
    ],
  },
  {
    title: "Source Code & Intellectual Property",
    items: [
      "Clients own their logos, branding, content, images, documents, and business data.",
      "Atlas retains ownership of reusable frameworks, CMS engines, templates, automation tools, libraries, internal systems, and platform architecture.",
      "Source code transfer is only provided if explicitly agreed in writing.",
      "Atlas may reuse its own proprietary methods and systems across future projects.",
      "Any custom ownership arrangements must be documented in the project agreement.",
    ],
  },
  {
    title: "Payment Policy",
    items: [
      "Payment schedules must be agreed before project commencement.",
      "Late payments may result in project suspension.",
      "Completed work remains payable regardless of project completion status.",
      "Atlas reserves the right to withhold delivery until payments are settled.",
    ],
  },
  {
    title: "Refund Policy",
    items: [
      "Deposits become non-refundable once work has commenced.",
      "Time already invested, completed work, and consumed resources remain billable.",
      "Refund requests are assessed on a case-by-case basis.",
    ],
  },
  {
    title: "Maintenance & Support",
    items: [
      "Maintenance services are separate unless included in the proposal.",
      "Support covers agreed services only.",
      "New features and enhancements are treated as separate work unless otherwise specified.",
    ],
  },
  {
    title: "Portfolio Rights",
    items: [
      "Atlas may display completed public-facing work in its portfolio, website, proposals, and marketing materials unless a written confidentiality agreement states otherwise.",
    ],
  },
  {
    title: "Contact",
    items: [
      "Questions regarding these policies should be directed through the official contact channels published on AtlasInc.io.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative bg-[#0d0d0d] text-white min-h-screen">
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-[#dd9e5e]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
            Legal
          </span>
          <h1 className="cursive text-3xl md:text-4xl font-medium text-white uppercase mt-6 mb-4 leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-white/40 text-sm leading-relaxed">
            Last updated: 2026. By using AtlasInc.io you agree to the terms below.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((section, i) => (
            <div key={section.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-white font-semibold text-base tracking-wide">
                  {section.title}
                </h2>
              </div>
              <div className="border-l border-white/8 pl-5 flex flex-col gap-3">
                {section.items.map((item, j) => (
                  <p key={j} className="text-white/45 text-sm leading-relaxed">
                    {section.items.length > 1 && (
                      <span className="text-white/20 mr-2 font-semibold">{j + 1}.</span>
                    )}
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
