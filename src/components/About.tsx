import React from 'react';
import { SiteContent } from '../types';
import { Camera, Share2, Palette, Code2, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  content: SiteContent;
}

const PHILOSOPHY_PILLARS = [
  {
    step: '01',
    title: 'CREATE',
    subtitle: 'Original Storytelling',
    desc: 'We ideate bold creative concepts, script cinematic narratives, and design visual ecosystems that defy conventional agency boredom.',
    icon: Palette,
  },
  {
    step: '02',
    title: 'CAPTURE',
    subtitle: 'Cinema-Grade Production',
    desc: 'Armed with high-end cinema rigs, autonomous 4K/8K cameras, FPV drones, and seasoned directors, we capture the pure soul of your brand.',
    icon: Camera,
  },
  {
    step: '03',
    title: 'GROW',
    subtitle: 'Social & Brand Velocity',
    desc: 'Content without distribution is invisible. We execute high-ROI social strategies, viral community campaigns, and algorithmic reach.',
    icon: Share2,
  },
  {
    step: '04',
    title: 'DIGITIZE',
    subtitle: 'Full-Stack Technology',
    desc: 'We engineer bespoke web applications, interactive 3D portals, SaaS platforms, and workflow automations built for speed and conversion.',
    icon: Code2,
  },
];

export const About: React.FC<AboutProps> = React.memo(({ content }) => {
  const philosophyPillars = PHILOSOPHY_PILLARS;

  return (
    <section id="about" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAFA] border border-black/[0.08] text-[11px] uppercase tracking-[0.16em] text-[#0A0A0A] font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>{content.about_badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-[-0.03em] text-[#0A0A0A] leading-[1.03]">
              {content.about_title_line1} <br />
              <span className="text-brand-green">
                {content.about_title_highlight}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-6 text-neutral-600 text-base sm:text-[17px] leading-relaxed lg:pt-3">
            <p>{content.about_desc1}</p>
            <p>{content.about_desc2}</p>
            
            {/* Studio Capabilities Overview Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 p-5 rounded-2xl bg-[#FAFAFA] border border-black/[0.08]">
              <div>
                <div className="text-[10px] text-brand-green uppercase tracking-[0.16em] font-extrabold">PRODUCTION</div>
                <div className="text-[#0A0A0A] font-bold text-sm sm:text-base mt-1">Cinema &amp; FPV</div>
              </div>
              <div className="border-l border-black/[0.08] pl-3 sm:pl-4">
                <div className="text-[10px] text-brand-green uppercase tracking-[0.16em] font-extrabold">MARKETING</div>
                <div className="text-[#0A0A0A] font-bold text-sm sm:text-base mt-1">Social &amp; Growth</div>
              </div>
              <div className="border-l border-black/[0.08] pl-3 sm:pl-4">
                <div className="text-[10px] text-brand-green uppercase tracking-[0.16em] font-extrabold">TECH</div>
                <div className="text-[#0A0A0A] font-bold text-sm sm:text-base mt-1">3D Web &amp; SaaS</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Philosophy Pillars - Architectural Bento */}
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-brand-green font-extrabold">02 // OUR PHILOSOPHY</span>
              <h3 className="font-display text-3xl sm:text-4xl font-black tracking-[-0.025em] text-[#0A0A0A] mt-1">
                How We Elevate Brands
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium max-w-sm">
              Four integrated phases that take your brand from raw concept to measurable market dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="group relative p-7 sm:p-8 rounded-3xl luxury-card flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-display text-neutral-300 group-hover:text-brand-green transition-colors tabular-nums">
                        {pillar.step}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] flex items-center justify-center group-hover:border-brand-green/50 group-hover:bg-brand-green/10 transition-all">
                        <Icon className="w-5 h-5 text-[#0A0A0A] group-hover:text-brand-green transition-colors" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display text-xl font-black text-[#0A0A0A] tracking-tight">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-brand-green uppercase tracking-[0.12em] font-bold mt-1">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400 group-hover:text-[#0A0A0A] transition-colors">
                    <span>PHASE {pillar.step}</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
});

About.displayName = 'About';
