import React from "react";

export type TestimonialItem = {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
};

type TestimonialsProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  items: TestimonialItem[];
};

const Testimonials = ({ eyebrow, title, subtitle, items }: TestimonialsProps) => {
  return (
    <section id="testimonials" className="bg-white text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(221,158,94,0.04),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto py-24 2xl:py-32 px-6 md:px-12 2xl:px-0 flex flex-col gap-12 relative z-10">
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-[11px] w-fit font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
            {eyebrow}
          </span>
          <h2 className="cursive text-4xl 2xl:text-5xl text-gray-900 leading-[1.05]">{title}</h2>
          <p className="text-gray-400 text-sm font-light leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 hover:border-[#dd9e5e]/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
                <p className="text-[10px] text-gray-500 font-medium">{t.role}</p>
                <p className="text-[10px] text-gray-400">{t.location}</p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-[#dd9e5e] text-[11px] ${
                        i < t.rating ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;