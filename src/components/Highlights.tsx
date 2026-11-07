import React from 'react';
import { SiteContent } from '../types';
import { Camera, TrendingUp, Sparkles, Award } from 'lucide-react';

interface HighlightsProps {
  content: SiteContent;
}

export const Highlights: React.FC<HighlightsProps> = React.memo(({ content }) => {
  const highlights = React.useMemo(() => [
    {
      number: content.hero_stat1_num || '4K+',
      label: content.hero_stat1_label || 'Cinematic Shoots',
      description: 'Cinema-grade camera rigs, FPV drones, and director-level visual storytelling.',
      icon: Camera,
      badge: 'PRODUCTION SCALE'
    },
    {
      number: content.hero_stat2_num || '150+',
      label: content.hero_stat2_label || 'Brands Scaled',
      description: 'Empowering ambitious brands with viral social reach and high-converting identities.',
      icon: TrendingUp,
      badge: 'MARKET IMPACT'
    },
    {
      number: content.hero_stat3_num || '99.8%',
      label: content.hero_stat3_label || 'Client Delight',
      description: 'Meticulous attention to detail, on-time execution, and transparent collaboration.',
      icon: Award,
      badge: 'STUDIO EXCELLENCE'
    }
  ], [content.hero_stat1_num, content.hero_stat1_label, content.hero_stat2_num, content.hero_stat2_label, content.hero_stat3_num, content.hero_stat3_label]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-black/[0.08] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/[0.02] via-transparent to-brand-green/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Top Header Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] border border-black/[0.08] text-xs font-bold uppercase tracking-wider text-black">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span>PROVEN TRACK RECORD &bull; STUDIO HIGHLIGHTS</span>
          </div>

          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
            MEASURABLE EXCELLENCE ACROSS MEDIA &bull; MARKETING &bull; TECH
          </div>
        </div>

        {/* 3 Prominent Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-8 sm:p-10 rounded-3xl luxury-card bg-neutral-50/50 hover:bg-white transition-all duration-500 border border-black/[0.08] hover:border-brand-green/50 flex flex-col justify-between space-y-6 hover:shadow-luxury"
              >
                <div className="space-y-4">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-black text-white group-hover:bg-brand-green group-hover:text-black transition-colors">
                      {item.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center shadow-sm group-hover:border-brand-green group-hover:bg-brand-green/10 transition-all">
                      <Icon className="w-6 h-6 text-black group-hover:text-brand-green transition-colors" />
                    </div>
                  </div>

                  {/* Big Sculptural Number */}
                  <div className="font-display text-5xl sm:text-6xl font-black text-black tracking-tight group-hover:text-brand-green transition-colors">
                    {item.number}
                  </div>

                  {/* Primary Label */}
                  <div className="font-display text-xl font-extrabold text-black tracking-wide">
                    {item.label}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Verification Accent */}
                <div className="pt-5 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-neutral-400 group-hover:text-black">
                  <span>SSD BENCHMARK</span>
                  <span className="text-brand-green font-extrabold text-sm">&rarr;</span>
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

