import TravelProviders from "./providers";

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return <TravelProviders>{children}</TravelProviders>;
}
