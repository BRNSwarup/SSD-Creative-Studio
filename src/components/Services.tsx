import React from 'react';
import { ServiceItem } from '../types';
import { ServiceCard3D } from './3d/ServiceCard3D';
import { Camera, Share2, Palette, Code2, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceName: string) => void;
}

const getServiceIcon = (visualType: string) => {
  switch (visualType) {
    case 'camera':
      return Camera;
    case 'network':
      return Share2;
    case 'prism':
      return Palette;
    case 'code':
    default:
      return Code2;
  }
};

export const Services: React.FC<ServicesProps> = React.memo(({ services, onSelectService }) => {
  const getIcon = getServiceIcon;

  return (
    <section id="services" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.08] pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-[11px] uppercase tracking-[0.16em] text-[#0A0A0A] font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>03 // OUR DISCIPLINES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-[-0.03em] text-[#0A0A0A] leading-[1.05]">
              INTERACTIVE 3D <br />
              <span className="text-brand-green">SERVICE EXPERIENCES.</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Explore our four core creative and technology practices. Every capability is crafted with cinema-grade standards and engineering rigor.
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-[11px] text-brand-green font-extrabold uppercase tracking-[0.16em]">SOCIAL MEDIA &amp; CREATIVE SUITE</div>
            <div className="text-sm text-neutral-500 font-medium mt-0.5">Select any discipline to launch your next campaign</div>
          </div>
        </div>

        {/* 4 Signature Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.visualType);
            const cardImage =
              service.image ||
              (service.id === 'creative-media'
                ? '/services/creative-media-3d.jpg'
                : service.id === 'social-media'
                ? '/services/social-media-3d.png'
                : service.id === 'branding-design'
                ? '/services/branding-design-3d.jpg'
                : service.id === 'web-technology'
                ? '/services/web-technology-3d.jpg'
                : undefined);

            const badgeTop =
              service.id === 'creative-media'
                ? '3D CINEMA RIG'
                : service.id === 'branding-design'
                ? '3D IDENTITY SUITE'
                : service.id === 'web-technology'
                ? '3D FULL-STACK LAB'
                : '3D SPATIAL ASSET';
            const badgeBottom =
              service.id === 'creative-media'
                ? '4K/8K • DRONE & EDIT'
                : service.id === 'branding-design'
                ? 'VECTOR • PRISM • COLLATERAL'
                : service.id === 'web-technology'
                ? 'REACT • CLOUD • SAAS • 3D'
                : 'MULTI-PLATFORM GROWTH';

            return (
              <div
                key={service.id}
                className="group relative rounded-3xl luxury-card p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] group-hover:border-brand-green/40 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors shrink-0">
                        <Icon className="w-5 h-5 text-[#0A0A0A] group-hover:text-brand-green transition-colors" />
                      </div>
                      <div>
                        <span className="text-[11px] text-neutral-400 uppercase tracking-[0.18em] font-bold">
                          SERVICE 0{index + 1}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* 3D Visual Stage */}
                  <div className="relative">
                    {cardImage ? (
                      <div className="relative w-full h-52 sm:h-60 flex items-center justify-center overflow-hidden rounded-2xl bg-[#0A0A0A] border border-black/10 group-hover:border-brand-green/40 transition-all duration-500 shadow-sm">
                        <img
                          src={cardImage}
                          alt={service.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Refined Edge Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

                        {/* Top HUD Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-bold tracking-[0.12em] text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                          <span>{badgeTop}</span>
                        </div>

                        {/* Bottom Telemetry Tag */}
                        <div className="absolute bottom-3 right-3 text-[10px] font-mono font-semibold text-white/90 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 uppercase tracking-wider">
                          {badgeBottom}
                        </div>
                      </div>
                    ) : (
                      <ServiceCard3D type={service.visualType} />
                    )}
                  </div>

                  {/* Tagline & Description */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-brand-green font-extrabold uppercase tracking-[0.14em]">
                      {service.tagline}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2.5 pt-1">
                    <div className="text-[11px] uppercase text-neutral-400 tracking-[0.16em] font-bold">
                      WHAT WE DELIVER
                    </div>
                    <ul className="space-y-2">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="pt-5 mt-7 border-t border-black/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border border-black/[0.08] text-xs font-bold uppercase tracking-[0.12em] transition-all cursor-pointer"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.16em]">
                    SSD VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

Services.displayName = 'Services';
