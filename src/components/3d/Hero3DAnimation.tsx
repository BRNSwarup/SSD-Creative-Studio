import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, Play, Pause, Maximize2 } from 'lucide-react';

export const Hero3DAnimation: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [transformStyle, setTransformStyle] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  // 3D Parallax Tilt calculation
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt ranges (-8 to +8 degrees for pleasant 3D depth)
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTransformStyle(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    // Specular highlight position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransformStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  }, []);

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Toggle Play / Pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Viewport Observer: Pause video when scrolled out of view to preserve 60FPS scrolling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[540px] flex items-center justify-center p-2 select-none cursor-pointer group"
    >
      {/* Dynamic Ambient Glow Behind Card */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-brand-green/25 via-emerald-400/15 to-transparent rounded-[36px] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main 3D Tilted Card Body */}
      <div
        ref={cardRef}
        style={{
          transform: transformStyle,
          transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          clipPath: 'inset(0 round 1.5rem)',
          WebkitClipPath: 'inset(0 round 1.5rem)',
        }}
        className="relative w-full h-full rounded-3xl overflow-hidden bg-black border border-black/10 shadow-2xl luxury-card isolate"
      >
        {/* The 3D Motion Graphic Video */}
        <video
          ref={videoRef}
          src="/hero-3d-motion.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dynamic Specular Light Glare following cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 60%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Subtle Vignette / Glass Reflection Rim */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Floating Top Bar HUD */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-extrabold tracking-wider text-white shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span>SSD CREATIVE STUDIO</span>
          </div>

          {/* Quick Interactive Video Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause 3D animation' : 'Play 3D animation'}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-brand-green hover:border-brand-green/50 transition-all shadow-md active:scale-95"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-brand-green hover:border-brand-green/50 transition-all shadow-md active:scale-95"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Floating Bottom HUD / Studio Telemetry */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20 pointer-events-none">
          
          

          <div className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold tracking-widest text-neutral-300">
            60 FPS &bull; 4K
          </div>
        </div>
      </div>
    </div>
  );
});

Hero3DAnimation.displayName = 'Hero3DAnimation';

