import React from 'react';
import { HeroScene } from './3d/HeroScene';
import { SiteContent } from '../types';
import { ArrowDown, Play, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  content: SiteContent;
  onOpenVideo: (url: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onOpenVideo }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[92vh] w-full flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAFAFA]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[450px] bg-brand-green/[0.08] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-neutral-200/50 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 light-dot-grid opacity-40 pointer-events-none" />

      {/* Main Grid Container */}
      <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Headlines & Editorial Content */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10 space-y-7 text-center lg:text-left">
          
          {/* Studio Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-sm self-center lg:self-start transition-transform hover:scale-105 duration-300">
            <span className="w-2 h-2 rounded-full bg-brand-green shadow-glow-green-sm"></span>
            <span className="text-xs uppercase tracking-wider text-black font-extrabold">
              {content.hero_badge}
            </span>
          </div>

          {/* Main Headline - Sculptural Typography */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl xl:text-[76px] font-black tracking-tight text-black leading-[1.03]">
              {content.hero_title_line1} <br />
              INTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-brand-green to-[#00C853] drop-shadow-sm">
                {content.hero_title_highlight}
              </span>
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            {content.hero_description}
          </p>

          {/* Brand Tagline Banner */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-black">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Create
            </span>
            <span className="text-neutral-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Capture
            </span>
            <span className="text-neutral-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Grow
            </span>
            <span className="text-neutral-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Digitize
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
            <button
              onClick={() => scrollTo('services')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white hover:bg-brand-green hover:text-black font-extrabold uppercase tracking-wider text-xs transition-all duration-300 shadow-md hover:shadow-glow-green hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-black border border-black/15 font-extrabold uppercase tracking-wider text-xs transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Let's Work Together</span>
            </button>

            {/* Quick Reel Button */}
            <button
              onClick={() => onOpenVideo(content.hero_reel_url, 'SSD Creative Studio Showreel')}
              className="flex items-center gap-2.5 px-4 py-3 rounded-full text-xs text-neutral-800 hover:text-black transition-colors group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-brand-green/15 border border-brand-green/30 flex items-center justify-center group-hover:bg-brand-green transition-all shadow-sm">
                <Play className="w-4 h-4 fill-brand-green text-brand-green ml-0.5 group-hover:fill-black group-hover:text-black" />
              </div>
              <span className="text-xs uppercase tracking-wider font-extrabold">Watch Reel</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Optical Cinema Installation */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[540px] rounded-3xl overflow-hidden luxury-card bg-white shadow-luxury">
            <HeroScene />
          </div>
        </div>

      </div>

      {/* Scroll Down Pill */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-500 hover:text-black transition-colors z-20 group cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase font-extrabold">Explore</span>
        <div className="w-7 h-7 rounded-full border border-black/15 group-hover:border-black flex items-center justify-center transition-all animate-bounce shadow-sm bg-white">
          <ArrowDown className="w-3.5 h-3.5 text-neutral-700 group-hover:text-black" />
        </div>
      </button>
    </section>
  );
};
