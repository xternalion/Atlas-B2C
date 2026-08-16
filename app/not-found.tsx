import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full pt-16 overflow-hidden flex flex-col items-center justify-center text-center bg-[#0d0d0d]">

      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#dd9e5e18_0%,#b8792820_40%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6">

        <p className="text-sm md:text-base font-bold tracking-[0.10em] uppercase text-[#dd9e5e]">
          ATLAS
        </p>

        <h1 className="playfair text-[8rem] md:text-[11rem] font-bold text-white leading-none">
          404
        </h1>

        <div className="w-12 h-[3px] rounded-full bg-[#dd9e5e]" />

        <h2 className="text-xl md:text-2xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="text-sm text-white/60 max-w-sm leading-relaxed">
          Looks like this listing doesn&apos;t exist on our site. Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="max-w-fit select-none btn-primary-base btn-dynamic mt-4"
        >
          Back to Home <TbArrowRight size={20} />
        </Link>

      </div>
    </div>
  );
}