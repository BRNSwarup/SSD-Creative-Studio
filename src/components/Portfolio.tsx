import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { Play, Eye, Film, Camera, Share2, Code2, Sparkles } from 'lucide-react';

interface PortfolioProps {
  portfolio: PortfolioItem[];
  onOpenVideo: (url: string, title: string) => void;
  onOpenImage: (image: string, title: string, desc: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio, onOpenVideo, onOpenImage }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'video' | 'photography' | 'social' | 'web' | 'branding'>('all');

  const filteredItems = selectedFilter === 'all'
    ? portfolio
    : portfolio.filter((item) => item.category === selectedFilter);

  const filters = [
    { id: 'all', label: 'All Works' },
    { id: 'video', label: 'Video Showcase', icon: Film },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'web', label: 'Web & Tech', icon: Code2 },
    { id: 'branding', label: 'Branding & 3D', icon: Sparkles },
  ];

  return (
    <section id="portfolio" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-black/[0.06] overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[500px] bg-brand-green/[0.04] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs uppercase tracking-wider text-black font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>FEATURED WORK</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-black">
              CURATED <br />
              <span className="text-brand-green text-glow-green">STUDIO PORTFOLIO.</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Cinematic visuals, viral campaigns, bespoke brand identities, and high-performance digital products engineered for global brands.
            </p>
          </div>

          {/* Dynamic Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl border border-black/[0.06]">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-600 hover:text-black hover:bg-black/[0.03]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden luxury-card flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category & Status Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-black/80 backdrop-blur-md text-brand-green border border-brand-green/30 font-bold">
                    {item.categoryLabel}
                  </span>
                  {item.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase bg-white/90 text-black backdrop-blur-md font-bold">
                      Featured
                    </span>
                  )}
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.videoUrl ? (
                    <button
                      onClick={() => onOpenVideo(item.videoUrl!, item.title)}
                      className="w-14 h-14 rounded-full bg-brand-green text-black flex items-center justify-center shadow-glow-green hover:scale-110 transition-transform cursor-pointer"
                      title="Play Video"
                    >
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenImage(item.image, item.title, item.description)}
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="Inspect Work"
                    >
                      <Eye className="w-5 h-5 text-black" />
                    </button>
                  )}
                </div>
              </div>

              {/* Information Body */}
              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                    CLIENT: <span className="text-black">{item.client}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-black group-hover:text-brand-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Tags & Action Link */}
                <div className="space-y-4 pt-4 border-t border-black/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-black/[0.04]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {item.videoUrl ? (
                      <button
                        onClick={() => onOpenVideo(item.videoUrl!, item.title)}
                        className="text-xs font-bold uppercase text-brand-green flex items-center gap-1.5 hover:underline cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-brand-green" />
                        <span>Watch 4K Video</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenImage(item.image, item.title, item.description)}
                        className="text-xs font-bold uppercase text-brand-green flex items-center gap-1.5 hover:underline cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Project</span>
                      </button>
                    )}

                    <span className="text-xs text-neutral-400 font-bold uppercase">SSD ARCHIVE</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
