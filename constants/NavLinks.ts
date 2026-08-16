import { config } from "@/lib/config";

export type DropdownLink = { href: string; key: string; label: string };
export type NavItem = {
  key: string;
  label: string;
  href: string;
  dropdown?: DropdownLink[];
};

const TRAVEL_NAV_ITEM: NavItem = {
  key: "travel",
  label: "Travel",
  href: "/travel/itinerary",
  dropdown: [
    { href: "/travel/book",      key: "booking",  label: "Book" },
    { href: "/travel/itinerary", key: "ai",        label: "WanderMind AI" },
    { href: "/travel/explore",   key: "explore",   label: "Explore" },
    { href: "/travel/insights",  key: "blogs",     label: "Blogs" },
  ],
};

export const NAV_LINKS: NavItem[] = [
  { key: "overview", label: "Overview", href: "/" },
  {
    key: "software",
    label: "Software",
    href: "/software",
    dropdown: [
      { href: "/software#how-it-works",       key: "sw-how-it-works", label: "How It Works" },
      { href: "/software#modules",             key: "sw-modules",      label: "Features & Modules" },
      { href: "/software#get-started-pricing", key: "sw-pricing",      label: "Pricing" },
      { href: "/software#testimonials",        key: "sw-stories",      label: "Testimonials" },
    ],
  },
  ...(config.showTravel ? [TRAVEL_NAV_ITEM] : []),
  { key: "solutions", label: "Solutions", href: "/#solutions" },
  { key: "about", label: "About", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];
