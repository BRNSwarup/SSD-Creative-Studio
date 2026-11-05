import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBadgeOnly?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showBadgeOnly = false,
  theme = 'light',
}) => {
  const badgeSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: {
      ssd: 'text-lg',
      divider: 'h-6',
      sub: 'text-[9px] leading-[10px]',
    },
    md: {
      ssd: 'text-2xl',
      divider: 'h-8',
      sub: 'text-[11px] leading-[13px]',
    },
    lg: {
      ssd: 'text-3xl',
      divider: 'h-10',
      sub: 'text-[13px] leading-[15px]',
    },
  };

  const isLight = theme === 'light';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Circular Logo Icon */}
      <div
        className={`relative ${badgeSizes[size]} rounded-full overflow-hidden border ${
          isLight ? 'border-black/15 shadow-md' : 'border-white/30 shadow-lg'
        } bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-green shrink-0`}
      >
        <img
          src="/logo.jpg"
          alt="SSD Creative Studio"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Typography Lockup matching the official logo */}
      {!showBadgeOnly && (
        <div className="flex items-center gap-3">
          {/* Bold SSD with Neon Green Play Button inside D */}
          <div
            className={`flex items-center tracking-tight font-display font-extrabold ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            <span className={`${textSizes[size].ssd} tracking-wider font-black`}>SS</span>
            <div className="relative inline-flex items-center justify-center">
              <span className={`${textSizes[size].ssd} tracking-wider font-black`}>D</span>
              {/* Green Play Triangle positioned inside D */}
              <span className="absolute top-[52%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[6px] border-l-brand-green filter drop-shadow-[0_0_4px_#00E871]"></span>
            </div>
          </div>

          {/* Clean Vertical Divider Line */}
          <div
            className={`w-[1.5px] ${textSizes[size].divider} ${
              isLight ? 'bg-black/25' : 'bg-white/40'
            }`}
          ></div>

          {/* Stacked CREATIVE STUDIO */}
          <div
            className={`flex flex-col tracking-widest font-sans font-bold uppercase text-left ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            <span className={`${textSizes[size].sub}`}>CREATIVE</span>
            <span className={`${textSizes[size].sub}`}>STUDIO</span>
          </div>
        </div>
      )}
    </div>
  );
};
