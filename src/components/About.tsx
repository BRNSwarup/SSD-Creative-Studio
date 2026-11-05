import React from 'react';
import { SiteContent } from '../types';
import { Camera, Share2, Palette, Code2 } from 'lucide-react';

interface AboutProps {
  content: SiteContent;
}

export const About: React.FC<AboutProps> = ({ content }) => {
  const philosophyPillars = [
    {
      step: '01',
      title: 'CREATE',
      subtitle: 'Original Storytelling',
      desc: 'We ideate bold creative concepts, script cinematic narratives, and design visual ecosystems that defy conventional agency boredom.',
      icon: Palette
    },
    {
      step: '02',
      title: 'CAPTURE',
      subtitle: 'Cinema-Grade Production',
      desc: 'Armed with high-end cinema rigs, autonomous 4K/8K cameras, FPV drones, and seasoned directors, we capture the pure soul of your brand.',
      icon: Camera
    },
    {
      step: '03',
      title: 'GROW',
      subtitle: 'Social & Brand Velocity',
      desc: 'Content without distribution is invisible. We execute high-ROI social strategies, viral community campaigns, and algorithmic reach.',
      icon: Share2
    },
    {
      step: '04',
      title: 'DIGITIZE',
      subtitle: 'Full-Stack Technology',
      desc: 'We engineer bespoke web applications, interactive 3D portals, SaaS platforms, and workflow automations built for speed and conversion.',
      icon: Code2
    }
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-black/[0.06] overflow-hidden">
      {/* Subtle Light Ambience */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-green/[0.05] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs uppercase tracking-wider text-black font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>{content.about_badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-[1.08]">
              {content.about_title_line1} <br />
              <span className="text-brand-green text-glow-green">
                {content.about_title_highlight}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-6 text-neutral-600 text-base sm:text-lg leading-relaxed lg:pt-4">
            <p>{content.about_desc1}</p>
            <p>{content.about_desc2}</p>
            
            {/* Studio Capabilities Overview Pill */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-neutral-50 border border-black/[0.08] text-center sm:text-left">
              <div>
                <div className="text-[11px] text-brand-green uppercase tracking-wider font-extrabold">PRODUCTION</div>
                <div className="text-black font-extrabold text-sm sm:text-base mt-0.5">Cinema & FPV</div>
              </div>
              <div>
                <div className="text-[11px] text-brand-green uppercase tracking-wider font-extrabold">MARKETING</div>
                <div className="text-black font-extrabold text-sm sm:text-base mt-0.5">Social & Growth</div>
              </div>
              <div>
                <div className="text-[11px] text-brand-green uppercase tracking-wider font-extrabold">TECH</div>
                <div className="text-black font-extrabold text-sm sm:text-base mt-0.5">3D Web & SaaS</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Philosophy Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-green font-extrabold">OUR PHILOSOPHY</span>
            <h3 className="font-display text-3xl font-black text-black">How We Elevate Brands</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="group relative p-8 rounded-3xl luxury-card flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black font-display text-neutral-300 group-hover:text-brand-green transition-colors">
                        {pillar.step}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-black/[0.03] border border-black/[0.08] flex items-center justify-center group-hover:border-brand-green group-hover:bg-brand-green/10 transition-all">
                        <Icon className="w-6 h-6 text-black group-hover:text-brand-green transition-colors" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display text-xl font-bold text-black tracking-wide">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-brand-green uppercase font-bold mt-1">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-neutral-500 group-hover:text-black">
                    <span>EXPLORE PHASE</span>
                    <span className="text-brand-green font-bold">&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
