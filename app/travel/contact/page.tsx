import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | Atlas",
  description: "Get in touch with Atlas for software projects, travel bookings, or general inquiries.",
};

export default function ContactPage() {
  return <Contact />;
}
