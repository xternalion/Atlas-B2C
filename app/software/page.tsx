import type { Metadata } from "next";
import SoftwareHero from "@/components/Software/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Modules from "@/components/Home/Modules";
import SelectedWork from "@/components/Software/SelectedWork";
import GetStarted from "@/components/Home/GetStarted";
import Testimonials, { TestimonialItem } from "@/components/Software/Testimonials";
import CTA from "@/components/Software/CTA";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Software | Atlas",
  description:
    "AtlasCore — the digital infrastructure Atlas builds on. Websites, CMS platforms, and business automation, built to scale.",
  alternates: { canonical: `${baseUrl}/software` },
};

const CLIENT_TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Shihan",
    role: "Executive Director, TravQuest Travel and Tourism",
    location: "Colombo, LK",
    rating: 5,
    text: "Atlas built us a platform that genuinely understands the travel trade — reliable, fast, and built by people who took the time to understand how our business actually operates.",
  },
  {
    name: "Roy",
    role: "Managing Director, Dlink Colombo",
    location: "Colombo, LK",
    rating: 5,
    text: "As a DMC, we need technology partners who move as fast as we do. Atlas's platform slotted straight into our operations and has since become core to how we manage bookings and coordinate with clients.",
  },
];

export default function SoftwarePage() {
  return (
    <div className="relative bg-white">
      <SoftwareHero />
      <HowItWorks />
      <Modules />
      <SelectedWork />
      <GetStarted />
      <Testimonials
        eyebrow="Client Stories"
        title={
          <>
            Trusted by <span className="text-[#dd9e5e]">Companies</span>
          </>
        }
        subtitle="What clients say after we've shipped their systems, platforms, and digital infrastructure."
        items={CLIENT_TESTIMONIALS}
      />
      <CTA />
    </div>
  );
}
