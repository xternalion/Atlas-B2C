import type { Metadata } from "next";
import Intro from "@/components/About/Intro";

export const metadata: Metadata = {
  title: "About Us | Atlas Travel",
  description:
    "Learn about Atlas Travel — our mission, values, and commitment to making travel seamless, affordable, and transparent for everyone.",
  alternates: { canonical: "https://www.atlasinc.io/travel/about" },
};
import Values from "@/components/About/Values";

export default function About() {
  return (
    <div>
      <Intro />
      <Values />
    </div>
  );
}
