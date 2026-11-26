import React from 'react';
import { SiteContent } from '../types';
import { Target, Sparkles, Video, TrendingUp, Cpu, Award, CheckCircle } from 'lucide-react';

interface WhyUsProps {
  content: SiteContent;
}

const WHY_US_HIGHLIGHTS = [
  {
    title: 'CREATIVE-FIRST APPROACH',
    tag: 'Aesthetic Dominance',
    desc: 'We discard generic templates and cookie-cutter formulas. Every visual, narrative, and interaction is tailor-crafted to arrest attention in noisy markets.',
    icon: Sparkles,
  },
  {
    title: 'COMPLETE DIGITAL SOLUTIONS',
    tag: 'Zero Silos',
    desc: 'No finger-pointing between camera crews and developers. From your initial showreel shoot to your enterprise SaaS portal, we handle the entire spectrum.',
    icon: Target,
  },
  {
    title: 'PROFESSIONAL VISUAL PRODUCTION',
    tag: 'Cinema Grade',
    desc: 'Equipped with Hollywood-grade cinema cameras, high-altitude FPV drones, anamorphic glass, and color-calibrated suites for peerless quality.',
    icon: Video,
  },
  {
    title: 'BUSINESS-FOCUSED STRATEGIES',
    tag: 'Measurable ROI',
    desc: 'Stunning creative that moves balance sheets. Every campaign and design decision ties directly back to customer acquisition, retention, and brand equity.',
    icon: TrendingUp,
  },
  {
    title: 'TECHNOLOGY-DRIVEN EXECUTION',
    tag: 'Full-Stack Mastery',
    desc: 'Leveraging modern WebGL, 3D interactive graphics, cloud architectures, and intelligent automations that future-proof your digital presence.',
    icon: Cpu,
  },
];

export const WhyUs: React.FC<WhyUsProps> = React.memo(({ content }) => {
  const highlights = WHY_US_HIGHLIGHTS;

  return (
    <section id="why-us" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-[11px] uppercase tracking-[0.16em] text-[#0A0A0A] font-bold shadow-sm">
            <Award className="w-3.5 h-3.5 text-brand-green" />
            <span>{content.why_badge}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-[-0.03em] text-[#0A0A0A] leading-[1.06]">
            {content.why_title_line1} <br />
            <span className="text-brand-green">
              {content.why_title_highlight}
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            {content.why_description}
          </p>
        </div>

        {/* 5 Distinct Pillars + Dark Contrast Studio Promise */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative p-7 sm:p-8 rounded-3xl luxury-card flex flex-col justify-between ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-11 h-11 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] flex items-center justify-center group-hover:border-brand-green/50 group-hover:bg-brand-green/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#0A0A0A] group-hover:text-brand-green transition-colors" />
                    </div>
                    <span className="text-[10px] text-brand-green uppercase tracking-[0.14em] font-extrabold px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/25">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-black text-[#0A0A0A] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-black/[0.06] flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400 group-hover:text-[#0A0A0A] transition-colors">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                  <span>SSD STANDARD OF EXCELLENCE</span>
                </div>
              </div>
            );
          })}

          {/* Studio Promise Dark Contrast Anchor Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-black flex flex-col justify-between text-white shadow-xl">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-green font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                STUDIO PROMISE
              </span>
              <h3 className="font-display text-2xl font-black text-white leading-snug tracking-tight">
                &ldquo;We don&rsquo;t just post content. We engineer viral brand moments.&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                From scroll-stopping Reels and paid social funnels to bespoke brand worlds, every campaign is led directly by our senior creative directors.
              </p>
            </div>

            <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              <span>CREATE &bull; CAPTURE &bull; GROW</span>
              <span className="text-brand-green">SSD STUDIO</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

WhyUs.displayName = 'WhyUs';
