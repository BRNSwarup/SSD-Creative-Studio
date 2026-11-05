import React from 'react';
import { ClientItem } from '../types';
import { Quote, Star } from 'lucide-react';

interface ClientsProps {
  clients: ClientItem[];
}

export const Clients: React.FC<ClientsProps> = ({ clients }) => {
  // Duplicate for seamless infinite marquee loop
  const marqueeClients = [...clients, ...clients, ...clients];
  const testimonials = clients.filter(c => c.testimonial);
  const marqueeTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative py-28 bg-white border-t border-black/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs uppercase tracking-wider text-black font-extrabold">
          <span className="w-2 h-2 rounded-full bg-brand-green"></span>
          <span>TRUSTED BY INDUSTRY LEADERS</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-black text-black">
          PARTNERS &bull; <span className="text-brand-green text-glow-green">TESTIMONIALS</span>
        </h2>
        <p className="text-neutral-600 text-base max-w-2xl mx-auto">
          From breakthrough startups to global tech brands, hear how SSD Creative Studio transforms ambitious visions into unforgettable results.
        </p>
      </div>

      {/* 1. SLOWLY SCROLLING COMPANIES MARQUEE */}
      <div className="relative w-full py-6 border-y border-black/[0.08] bg-neutral-50/60 overflow-hidden mb-16">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
          {marqueeClients.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-black/[0.08] shadow-sm shrink-0 transition-transform hover:scale-105 cursor-default"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green shrink-0"></span>
              <span className="font-display text-lg font-black tracking-wider uppercase text-black">
                {client.name}
              </span>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2 border-l border-neutral-200">
                {client.industry}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SLOWLY SCROLLING TESTIMONIALS MARQUEE */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 whitespace-nowrap animate-marquee-reverse hover:[animation-play-state:paused]">
          {marqueeTestimonials.map((t, idx) => (
            <div
              key={`testimonial-${t.id}-${idx}`}
              className="w-[360px] sm:w-[420px] p-8 rounded-3xl luxury-card bg-white border border-black/[0.08] shadow-sm hover:shadow-luxury transition-all duration-300 shrink-0 flex flex-col justify-between whitespace-normal group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-brand-green gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-green text-brand-green" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-200 group-hover:text-brand-green/40 transition-colors" />
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed font-normal italic">
                  "{t.testimonial}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-display text-sm font-extrabold text-black">{t.author}</div>
                  <div className="text-xs text-neutral-500 font-medium">{t.role}</div>
                </div>
                <span className="text-xs font-extrabold text-brand-green px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
        Hover on any card to pause scrolling
      </div>
    </section>
  );
};
