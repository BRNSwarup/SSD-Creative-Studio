import React from 'react';
import { SiteContent } from '../types';
import { Camera, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

interface HighlightsProps {
  content: SiteContent;
}

export const Highlights: React.FC<HighlightsProps> = React.memo(({ content }) => {
  const highlights = React.useMemo(
    () => [
      {
        number: content.hero_stat1_num || '4K+',
        label: content.hero_stat1_label || 'Cinematic Shoots',
        description: 'Cinema-grade camera rigs, FPV drones, and director-level visual storytelling.',
        icon: Camera,
        badge: 'PRODUCTION SCALE',
      },
      {
        number: content.hero_stat2_num || '150+',
        label: content.hero_stat2_label || 'Brands Scaled',
        description: 'Empowering ambitious brands with viral social reach and high-converting identities.',
        icon: TrendingUp,
        badge: 'MARKET IMPACT',
      },
      {
        number: content.hero_stat3_num || '99.8%',
        label: content.hero_stat3_label || 'Client Delight',
        description: 'Meticulous attention to detail, on-time execution, and transparent collaboration.',
        icon: Award,
        badge: 'STUDIO EXCELLENCE',
      },
    ],
    [
      content.hero_stat1_num,
      content.hero_stat1_label,
      content.hero_stat2_num,
      content.hero_stat2_label,
      content.hero_stat3_num,
      content.hero_stat3_label,
    ]
  );

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-black/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Clean Editorial Top Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0A0A0A]">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>01 // SOCIAL &amp; CAMPAIGN IMPACT</span>
          </div>

          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em]">
            VIRAL CONTENT &bull; SOCIAL GROWTH &bull; DIGITAL TECH
          </div>
        </div>

        {/* Architectural 3-Column Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-7 sm:p-9 rounded-3xl luxury-card bg-[#FAFAFA]/70 hover:bg-white flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-white border border-black/[0.08] text-neutral-700 group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:border-[#0A0A0A] transition-colors">
                      {item.badge}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center shadow-sm group-hover:border-brand-green/50 group-hover:bg-brand-green/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#0A0A0A] group-hover:text-brand-green transition-colors" />
                    </div>
                  </div>

                  {/* Sculptural Tabular Numeral */}
                  <div className="font-display text-5xl sm:text-6xl font-black text-[#0A0A0A] tracking-[-0.04em] tabular-nums group-hover:text-brand-green transition-colors">
                    {item.number}
                  </div>

                  <div className="font-display text-lg font-bold text-[#0A0A0A] tracking-tight">
                    {item.label}
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400 group-hover:text-[#0A0A0A] transition-colors">
                  <span>SSD BENCHMARK</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

Highlights.displayName = 'Highlights';
