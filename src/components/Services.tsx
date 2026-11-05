import React from 'react';
import { ServiceItem } from '../types';
import { ServiceCard3D } from './3d/ServiceCard3D';
import { Camera, Share2, Palette, Code2, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onSelectService }) => {
  const getIcon = (visualType: string) => {
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
                    <ServiceCard3D type={service.visualType} />
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
};
