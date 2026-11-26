import React, { useEffect, useRef } from 'react';
import { Hero3DAnimation } from './3d/Hero3DAnimation';
import { SiteContent } from '../types';
import { ArrowDown, Play, ArrowRight } from 'lucide-react';

interface HeroProps {
  content: SiteContent;
  onOpenVideo: (url: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = React.memo(({ content, onOpenVideo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Pause background agency video when scrolled out of view for 60 FPS scrolling
  useEffect(() => {
    const video = bgVideoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[94vh] w-full flex items-center justify-center pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAFAFA]"
    >
      {/* Full-Bleed Agency Workflow Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={bgVideoRef}
          src="/hero-agency-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-35 scale-[1.02]"
        />
        {/* Calibrated Porcelain Light Scrim for crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA]/95 via-[#FAFAFA]/80 to-[#FAFAFA]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA]/85 via-transparent to-[#FAFAFA]" />
      </div>

      {/* Subtle Architectural Grid & Soft Ambient Depth */}
      <div className="absolute inset-0 light-dot-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none z-[1]" />
      <div className="absolute -top-24 right-1/4 w-[520px] h-[520px] bg-brand-green/[0.06] blur-[140px] pointer-events-none rounded-full z-[1]" />

      {/* Main Grid Container */}
      <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        
        {/* Left Column: Editorial Typography & Studio Controls */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10 space-y-7 text-center lg:text-left">
          
          {/* Live Availability & Studio Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.03)] self-center lg:self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-800 font-bold">
              {content.hero_badge}
            </span>
          </div>

          {/* Main Headline - Architectural Display Typography */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl xl:text-[72px] font-black tracking-[-0.035em] text-[#0A0A0A] leading-[0.98]">
              {content.hero_title_line1} <br />
              INTO{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] via-[#00A844] to-[#00C853]">
                {content.hero_title_highlight}
              </span>
            </h1>
          </div>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-lg md:text-[19px] text-neutral-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            {content.hero_description}
          </p>

          {/* Refined Studio Discipline Strip */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-neutral-800">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Create
            </span>
            <span className="text-neutral-300">/</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Capture
            </span>
            <span className="text-neutral-300">/</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Grow
            </span>
            <span className="text-neutral-300">/</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Digitize
            </span>
          </div>

          {/* Social Media & Creative Agency Format Strip */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
            {['Reels & Shorts', 'Instagram & Meta', 'YouTube Production', 'Brand Identity', 'Web & SaaS'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[11px] font-bold text-neutral-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Primary & Secondary Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              onClick={() => scrollTo('services')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0A0A0A] text-white hover:bg-brand-green hover:text-[#0A0A0A] font-bold uppercase tracking-[0.12em] text-xs transition-all duration-300 shadow-sm hover:shadow-glow-green flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#0A0A0A] border border-black/15 font-bold uppercase tracking-[0.12em] text-xs transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Let's Work Together</span>
            </button>

            {/* Showreel Trigger */}
            <button
              onClick={() => {
                const reelUrl =
                  content.hero_reel_url && !content.hero_reel_url.includes('BigBuckBunny')
                    ? content.hero_reel_url
                    : '/showreel.mp4';
                onOpenVideo(reelUrl, 'SSD Creative Studio Showreel');
              }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full text-xs text-neutral-800 hover:text-black transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-black/10 group-hover:border-brand-green group-hover:bg-brand-green flex items-center justify-center transition-all duration-300 shadow-sm">
                <Play className="w-4 h-4 fill-[#0A0A0A] text-[#0A0A0A] ml-0.5 transition-colors" />
              </div>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-[0.14em] font-extrabold text-[#0A0A0A]">Watch Reel</div>
                <div className="text-[10px] text-neutral-500 font-medium">Studio Showcase</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Motion Graphics Showcase + Floating Social Proof */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <Hero3DAnimation />

          {/* Floating Social Growth Metric Card (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-luxury absolute -bottom-3 -left-2 lg:-left-6 z-30">
            <div className="w-9 h-9 rounded-xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center text-brand-green font-black text-sm">
              ↗
            </div>
            <div>
              <div className="text-xs font-black text-[#0A0A0A] leading-tight">12.4M+ Organic Views</div>
              <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Reels &bull; YouTube &bull; Paid Social</div>
            </div>
          </div>
        </div>

      </div>

      {/* Minimal Scroll Indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.08] text-neutral-600 hover:text-black hover:border-black/20 transition-all z-20 group cursor-pointer shadow-sm"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Scroll</span>
        <ArrowDown className="w-3 h-3 text-neutral-600 group-hover:text-brand-green group-hover:translate-y-0.5 transition-all" />
      </button>
    </section>
  );
});

Hero.displayName = 'Hero';
