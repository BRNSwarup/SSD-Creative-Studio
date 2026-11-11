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
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-brand-green/[0.05] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.08] pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs uppercase tracking-wider text-black font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>OUR DISCIPLINES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-black">
              INTERACTIVE 3D <br />
              <span className="text-brand-green text-glow-green">SERVICE EXPERIENCES.</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Explore our four core creative and technology practices. Every capability is crafted with cinematic standards and engineering rigor.
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs text-brand-green font-extrabold uppercase tracking-wider">3D INTERACTIVE MODELS</div>
            <div className="text-sm text-neutral-500 font-medium">Hover & inspect individual service elements</div>
          </div>
        </div>

        {/* 4 Unique Interactive 3D Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.visualType);
            const cardImage = service.image || 
              (service.id === 'creative-media' ? '/services/creative-media-3d.jpg' : 
               service.id === 'social-media' ? '/services/social-media-3d.png' : 
               service.id === 'branding-design' ? '/services/branding-design-3d.jpg' : 
               service.id === 'web-technology' ? '/services/web-technology-3d.jpg' : undefined);

            const badgeTop = 
              service.id === 'creative-media' ? '3D CINEMA RIG' : 
              service.id === 'branding-design' ? '3D IDENTITY SUITE' : 
              service.id === 'web-technology' ? '3D FULL-STACK LAB' : '3D SPATIAL ASSET';
            const badgeBottom = 
              service.id === 'creative-media' ? '4K/8K • DRONE & EDIT' : 
              service.id === 'branding-design' ? 'VECTOR • PRISM • COLLATERAL' : 
              service.id === 'web-technology' ? 'REACT • CLOUD • SAAS • 3D' : 'MULTI-PLATFORM GROWTH';

            return (
              <div
                key={service.id}
                className="group relative rounded-3xl luxury-card p-7 sm:p-9 flex flex-col justify-between"
              >
                {/* Service Card Content */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-brand-green" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">
                          SERVICE 0{index + 1}
                        </span>
                        <h3 className="font-display text-2xl font-bold text-black tracking-wide">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* 3D Visual Experience */}
                  <div className="relative my-4">
                    {cardImage ? (
                      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 border border-black/10 group-hover:border-brand-green/40 transition-all duration-500 shadow-md">
                        {/* Ambient Neon Purple & Green Glow behind image */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/20 via-brand-green/15 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* 3D Render Image */}
                        <img
                          src={cardImage}
                          alt={service.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Glass Vignette & Lighting Rim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-2xl pointer-events-none" />

                        {/* Top HUD Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-extrabold tracking-wider text-white shadow-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                          </span>
                          <span>{badgeTop}</span>
                        </div>

                        {/* Bottom Telemetry Tag */}
                        <div className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-white/90 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 uppercase tracking-widest shadow-sm">
                          {badgeBottom}
                        </div>
                      </div>
                    ) : (
                      <ServiceCard3D type={service.visualType} />
                    )}
                  </div>

                  {/* Tagline & Description */}
                  <div className="space-y-2">
                    <div className="text-xs text-brand-green font-bold uppercase tracking-wider">
                      {service.tagline}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Capabilities List */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs uppercase text-neutral-500 tracking-wider font-extrabold">
                      WHAT WE DELIVER:
                    </div>
                    <ul className="space-y-2">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-8 border-t border-black/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black group-hover:text-brand-green transition-colors cursor-pointer"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <span className="text-xs text-neutral-400 font-bold uppercase">
                    SSD QUALITY VERIFIED
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
