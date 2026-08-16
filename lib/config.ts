export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io",
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://atlascreate.io",
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Atlas'Create",

  // Single switch for all Travel-facing marketing content (nav, footer, home,
  // about). Flip to true to advertise Travel again — /travel/* pages stay live
  // and directly reachable by URL either way, so this only controls whether
  // the site links to them.
  showTravel: false,

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@atlasinc.io",
    softwareEmail: process.env.NEXT_PUBLIC_SOFTWARE_EMAIL ?? "hello@atlasinc.io",
    travelEmail: process.env.NEXT_PUBLIC_TRAVEL_EMAIL ?? "info@atlastravel.com",
    phone: process.env.NEXT_PUBLIC_PHONE ?? "+94 77 581 4420",
    phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "+94775814420",
  },

  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94775814420",
    pricingNumber: process.env.NEXT_PUBLIC_WHATSAPP_PRICING_NUMBER ?? "94774374420",
    travelNumber: process.env.NEXT_PUBLIC_WHATSAPP_TRAVEL_NUMBER ?? "94774374420",
    defaultMessage:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
      "Hello! I'm interested in your digital services.",
  },

  social: {
    instagramUrl:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://www.instagram.com/atlascreate_official/",
    instagramTravelUrl:
      process.env.NEXT_PUBLIC_INSTAGRAM_TRAVEL_URL ??
      "https://www.instagram.com/atlastravel_official/",
  },
} as const;
