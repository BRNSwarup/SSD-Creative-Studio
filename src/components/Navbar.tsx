import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Our Work', href: '#portfolio' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = memo(({ onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Ref to track scrolled state and prevent redundant React renders
  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    // Passive throttled scroll handler using requestAnimationFrame
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          if (isScrolled !== scrolledRef.current) {
            scrolledRef.current = isScrolled;
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Use IntersectionObserver for section tracking - ZERO layout thrashing!
    const sectionIds = ['home', 'about', 'services', 'portfolio', 'why-us', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio or top alignment
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Active when section enters upper-middle screen
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-transform duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-5 sm:px-7 py-2.5 flex items-center justify-between ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
            : 'bg-white/80 backdrop-blur-sm border border-black/[0.05]'
        }`}
      >
        {/* Official Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="group cursor-pointer shrink-0"
        >
          <Logo size="md" theme="light" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-black/[0.03] border border-black/[0.04] rounded-full px-3 py-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-colors duration-150 ${
                  isActive
                    ? 'text-black bg-white shadow-sm border border-black/[0.05]'
                    : 'text-neutral-600 hover:text-black hover:bg-black/[0.03]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-brand-green hover:text-black transition-colors duration-200 shadow-sm hover:shadow-glow-green"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-neutral-800 hover:text-black rounded-full bg-black/[0.04] border border-black/10 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-white/95 backdrop-blur-md border border-black/10 p-6 shadow-2xl transition-all">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-semibold tracking-wide uppercase px-4 py-3 rounded-xl text-neutral-700 hover:text-black hover:bg-black/[0.04] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-brand-green text-xs font-bold">→</span>
              </a>
            ))}
            <div className="pt-3 border-t border-black/5">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-green text-black shadow-glow-green"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
