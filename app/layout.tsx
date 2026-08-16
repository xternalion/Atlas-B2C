import type { Metadata } from "next";
import "./globals.css";
import HideNavbar from "@/components/HideNavbar";
import HideFooter from "@/components/HideFooter";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Atlas | One Brand. Multiple Ventures.",
    template: "%s | Atlas",
  },
  description:
    "Atlas creates software that empowers businesses to operate smarter, grow faster, and build lasting digital foundations.",
  keywords: [
    "atlas",
    "atlasinc",
    "atlascore",
    "software solutions",
    "business systems",
    "CMS platforms",
    "custom software",
    "web design",
    "business automation",
    "digital products",
    "digital infrastructure",
    "scalable platforms",
  ],
  alternates: { canonical: baseUrl },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Atlas",
    title: "Atlas — One Brand. Multiple Ventures.",
    description:
      "Atlas is a software solutions company focused on building reliable digital products, business systems, and scalable platforms. We combine design, technology, and strategy to help organizations improve efficiency, strengthen their online presence, and unlock new opportunities for growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas — One Brand. Multiple Ventures.",
    description:
      "Atlas is a software solutions company focused on building reliable digital products, business systems, and scalable platforms. We combine design, technology, and strategy to help organizations improve efficiency, strengthen their online presence, and unlock new opportunities for growth.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atlas",
    url: baseUrl,
    logo: `${baseUrl}/XB.svg`,
    description:
      "Atlas creates software that empowers businesses to operate smarter, grow faster, and build lasting digital foundations.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atlas",
    url: baseUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["Software", "Solutions", "About", "Contact"],
    url: [
      `${baseUrl}/software`,
      `${baseUrl}/#solutions`,
      `${baseUrl}/about`,
      `${baseUrl}/contact`,
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HideNavbar />
        <main className="min-h-full flex flex-col">{children}</main>
        <HideFooter />
      </body>
    </html>
  );
}
