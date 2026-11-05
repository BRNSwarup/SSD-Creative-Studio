import React from 'react';
import { Logo } from './Logo';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t border-black/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-neutral-600">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <a href="#home" className="inline-block cursor-pointer">
              <Logo size="lg" theme="light" />
            </a>

            <p className="text-xs sm:text-sm text-neutral-600 max-w-sm leading-relaxed">
              Award-winning creative media, digital marketing, and advanced technology studio. Turning bold ideas into high-converting digital realities.
            </p>

            <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-900">
              <span className="text-brand-green font-extrabold">CREATE</span>
              <span>&bull;</span>
              <span className="text-brand-green font-extrabold">CAPTURE</span>
              <span>&bull;</span>
              <span className="text-brand-green font-extrabold">GROW</span>
              <span>&bull;</span>
              <span className="text-brand-green font-extrabold">DIGITIZE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-black">
              NAVIGATION
            </div>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#home" className="hover:text-black transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-black transition-colors">About Studio</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black transition-colors">Interactive 3D Services</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-black transition-colors">Our Work & Archive</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-black transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black transition-colors">Contact & Enquiries</a>
              </li>
            </ul>
          </div>

          {/* Services Quick Reference */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-black">
              DISCIPLINES
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
              <li>Drone Cinematography & 4K Shoots</li>
              <li>Social Media Growth & Management</li>
              <li>Brand Identity & Visual Storytelling</li>
              <li>Custom 3D Web & Full-Stack Applications</li>
              <li>Intelligent SaaS & Workflow Automation</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Secret Camera Emoji */}
        <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} SSD Creative Studio. All Rights Reserved.</span>
          </div>

          {/* Center/Right Control: Camera Emoji ONLY (Admin text removed, Password kept secret) */}
          <div className="flex items-center gap-3">
            
            {/* Camera Emoji Button ONLY - No text, No password tooltip */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full hover:bg-neutral-100 border border-transparent hover:border-black/10 text-base hover:scale-125 transition-all cursor-pointer opacity-70 hover:opacity-100"
              aria-label="Studio Access"
            >
              📷
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/5 text-neutral-700 hover:text-black transition-colors cursor-pointer shadow-sm"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
