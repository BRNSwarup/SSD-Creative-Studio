import React from 'react';
import { SiteContent } from '../types';
import { Target, Sparkles, Video, TrendingUp, Cpu, Award, CheckCircle } from 'lucide-react';

interface WhyUsProps {
  content: SiteContent;
}

export const WhyUs: React.FC<WhyUsProps> = ({ content }) => {
  const highlights = [
    {
      title: 'CREATIVE-FIRST APPROACH',
      tag: 'Aesthetic Dominance',
      desc: 'We discard generic templates and cookie-cutter formulas. Every visual, narrative, and interaction is tailor-crafted to arrest attention in noisy markets.',
      icon: Sparkles
    },
    {
      title: 'COMPLETE DIGITAL SOLUTIONS',
      tag: 'Zero Silos',
      desc: 'No finger-pointing between camera crews and developers. From your initial showreel shoot to your enterprise SaaS portal, we handle the entire spectrum.',
      icon: Target
    },
    {
      title: 'PROFESSIONAL VISUAL PRODUCTION',
      tag: 'Cinema Grade',
      desc: 'Equipped with Hollywood-grade cinema cameras, high-altitude FPV drones, anamorphic glass, and color-calibrated suites for peerless quality.',
      icon: Video
    },
    {
      title: 'BUSINESS-FOCUSED STRATEGIES',
      tag: 'Measurable ROI',
      desc: 'Stunning creative that moves balance sheets. Every campaign and design decision ties directly back to customer acquisition, retention, and brand equity.',
      icon: TrendingUp
    },
    {
      title: 'TECHNOLOGY-DRIVEN EXECUTION',
      tag: 'Full-Stack Mastery',
      desc: 'Leveraging modern WebGL, 3D interactive graphics, cloud architectures, and intelligent automations that future-proof your digital presence.',
      icon: Cpu
    }
  ];

  return (
    <section id="why-us" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-green/[0.04] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs uppercase tracking-wider text-black font-bold">
            <Award className="w-3.5 h-3.5 text-brand-green" />
            <span>{content.why_badge}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-black leading-tight">
            {content.why_title_line1} <br />
            <span className="text-brand-green text-glow-green">
              {content.why_title_highlight}
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg">
            {content.why_description}
          </p>
        </div>

        {/* 5 Distinct Pillars Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl luxury-card flex flex-col justify-between ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-1 border-brand-green/40' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black/[0.03] border border-black/[0.08] flex items-center justify-center group-hover:border-brand-green group-hover:bg-brand-green/10 transition-colors">
                      <Icon className="w-6 h-6 text-black group-hover:text-brand-green transition-colors" />
                    </div>
                    <span className="text-xs text-brand-green uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-brand-green/15 border border-brand-green/30">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-black tracking-wide">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/[0.06] flex items-center gap-1.5 text-xs font-bold text-neutral-500">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>SSD STANDARD OF EXCELLENCE</span>
                </div>
              </div>
            );
          })}

          {/* Quick Studio Promise Card */}
          <div className="p-8 rounded-3xl bg-neutral-900 border border-black flex flex-col justify-between text-white shadow-xl">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-brand-green font-bold">
                STUDIO PROMISE
              </span>
              <h3 className="font-display text-2xl font-black text-white leading-snug">
                "We don't make noise. We create cultural artifacts."
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Every project is backed by our full creative and engineering weight, with direct director involvement from kickoff to launch.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
              <span>CREATE &bull; CAPTURE &bull; GROW</span>
              <span className="text-brand-green">SSD STUDIO</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
