import { ServiceItem, PortfolioItem, ClientItem, SiteContent } from '../types';

export const INITIAL_SITE_CONTENT: SiteContent = {
  // Hero Section
  hero_badge: 'CREATIVE MEDIA • DIGITAL MARKETING • TECHNOLOGY',
  hero_title_line1: 'WE TURN IDEAS',
  hero_title_highlight: 'DIGITAL EXPERIENCES.',
  hero_description: 'From cinematic visuals and creative storytelling to powerful digital solutions, we help brands capture attention and grow.',
  hero_tagline: 'CREATE • CAPTURE • GROW • DIGITIZE',
  hero_stat1_num: '4K+',
  hero_stat1_label: 'Cinematic Shoots',
  hero_stat2_num: '150+',
  hero_stat2_label: 'Brands Scaled',
  hero_stat3_num: '99.8%',
  hero_stat3_label: 'Client Delight',
  hero_reel_url: '/showreel.mp4',

  // About Section
  about_badge: 'ABOUT SSD STUDIO',
  about_title_line1: 'CREATIVITY',
  about_title_highlight: 'MEETS TECHNOLOGY.',
  about_desc1: 'SSD Creative Studio was founded to bridge the chasm between evocative Hollywood-grade artistry and rigorous modern software engineering. We are a complete creative, marketing, and digital solutions partner for businesses aiming to conquer modern attention.',
  about_desc2: 'We don’t believe in fragmented agency silos where video creators talk past web engineers. We unite high-altitude drone cinematography, visual brand strategy, viral social architecture, and modern full-stack web platforms under one fluid creative roof.',

  // Why Us Section
  why_badge: 'THE SSD ADVANTAGE',
  why_title_line1: 'MORE THAN AN AGENCY.',
  why_title_highlight: 'YOUR CREATIVE GROWTH PARTNER.',
  why_description: 'We partner with visionary founders and global enterprises who refuse to settle for ordinary. Here is what sets our studio apart.',

  // Contact Info
  contact_email: 'contact@ssdcreativestudio.com',
  contact_phone: '+1 (555) 019-2834',
  contact_whatsapp: '919999999999',
  contact_location: 'Global Remote Studio & On-Location Shoots',
  contact_instagram: 'https://instagram.com',
  contact_youtube: 'https://youtube.com',
  contact_linkedin: 'https://linkedin.com',
  contact_twitter: 'https://x.com',
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'creative-media',
    category: 'creative-media',
    title: 'CREATIVE MEDIA',
    tagline: 'Cinematic visual production that commands attention.',
    description: 'We craft high-octane visual experiences from the skies to the editing suite. Our cinema-grade gear and director-level eye produce imagery that leaves indelible marks.',
    visualType: 'camera',
    icon: 'Camera',
    image: '/services/creative-media-3d.jpg',
    items: [
      'Drone photography and videography',
      'Cinema camera shoots (4K/8K HDR)',
      'High-impact promotional brand videos',
      'Hollywood-grade video editing & color grading',
      'Viral Instagram Reels, TikToks & YouTube content'
    ]
  },
  {
    id: 'social-media',
    category: 'social-media',
    title: 'SOCIAL MEDIA MANAGEMENT',
    tagline: 'Strategic community growth & hyper-targeted campaigns.',
    description: 'Turn scrollers into brand evangelists. We architect high-converting content roadmaps, manage brand voices across platforms, and drive exponential reach.',
    visualType: 'network',
    icon: 'Share2',
    image: '/services/social-media-3d.png',
    items: [
      'Instagram, Facebook & LinkedIn management',
      'Data-driven content planning & calendars',
      'High-ROI social media ad campaigns',
      'Full-lifecycle account & reputation management',
      'Active audience engagement & community growth'
    ]
  },
  {
    id: 'branding-design',
    category: 'branding',
    title: 'BRANDING & GRAPHIC DESIGN',
    tagline: 'Iconic visual identities that outshine the market.',
    description: 'We sculpt memorable brand identities, visionary design systems, and bespoke marketing collateral that evoke emotion and build prestige.',
    visualType: 'prism',
    icon: 'Palette',
    image: '/services/branding-design-3d.jpg',
    items: [
      'Comprehensive brand identity & design systems',
      'High-impact promotional posters & OOH banners',
      'Art direction & modern graphic design',
      'Digital & print marketing creatives',
      'Immersive visual storytelling & typography'
    ]
  },
  {
    id: 'web-technology',
    category: 'web-tech',
    title: 'WEB & TECHNOLOGY',
    tagline: 'Modern, high-performance digital architectures.',
    description: 'Engineering ultra-fast, aesthetically flawless digital solutions. From interactive 3D web experiences to enterprise SaaS applications and custom automation systems.',
    visualType: 'code',
    icon: 'Code2',
    image: '/services/web-technology-3d.jpg',
    items: [
      'Custom bespoke business & agency websites',
      'High-conversion e-commerce platforms',
      'Custom full-stack web applications & portals',
      'Scalable SaaS platforms & architecture',
      'Intelligent admin dashboards & workflow automation'
    ]
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'project-1',
    title: 'Hyperion Cinema Showreel',
    category: 'video',
    categoryLabel: 'Cinematography / FPV Drone',
    client: 'Hyperion Vision',
    description: 'A 4K cinematic showreel featuring high-velocity FPV drone tracking, golden-hour anamorphic lenses, and rhythmic sound design.',
    image: 'https://images.unsplash.com/photo-1579965342565-1644233772c5?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    tags: ['4K Cinema', 'FPV Drone', 'Sound Design'],
    featured: true,
    aspectRatio: 'landscape'
  },
  {
    id: 'project-2',
    title: 'Apex Kinetic Brand Identity',
    category: 'branding',
    categoryLabel: 'Visual Identity & 3D Typography',
    client: 'Apex Motors Global',
    description: 'Complete brand overhaul including custom typography, generative 3D emblems, print guidelines, and physical dealership livery.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['Brand Identity', '3D Emblems', 'Typography'],
    featured: true,
    aspectRatio: 'square'
  },
  {
    id: 'project-3',
    title: 'Aetheria Sound Platform',
    category: 'web',
    categoryLabel: 'Interactive Web & 3D Audio',
    client: 'Aetheria Audio Labs',
    description: 'An immersive WebGL 3D audio synthesizer and web experience built with Three.js, React, and custom Web Audio API shaders.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    tags: ['Three.js', 'React', 'Audio Engine'],
    featured: true,
    aspectRatio: 'landscape'
  },
  {
    id: 'project-4',
    title: 'Lumina Luxury Editorial Campaign',
    category: 'photography',
    categoryLabel: 'High Fashion Photography',
    client: 'Lumina Timepieces',
    description: 'Studio macro product photography and dramatic chiaroscuro lighting capturing the precision craftsmanship of luxury mechanical watches.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    tags: ['Macro Optics', 'Editorial', 'Studio Lighting'],
    featured: false,
    aspectRatio: 'portrait'
  },
  {
    id: 'project-5',
    title: 'Urban Pulse Viral Growth Strategy',
    category: 'social',
    categoryLabel: 'Social Campaign & Content Architecture',
    client: 'Urban Pulse Apparel',
    description: 'A 90-day Instagram & TikTok campaign generating over 4.2M views, 340k engagements, and a 240% surge in direct-to-consumer store conversions.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Viral Reels', 'Campaign Strategy', 'Growth'],
    featured: true,
    aspectRatio: 'square'
  },
  {
    id: 'project-6',
    title: 'Vortex Enterprise SaaS Dashboard',
    category: 'web',
    categoryLabel: 'Web Application & Automation',
    client: 'Vortex Cloud Logistics',
    description: 'Next-generation telemetry dashboard featuring real-time fleet analytics, WebSocket tracking, and automated client dispatch queues.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['SaaS', 'Real-time Analytics', 'Automation'],
    featured: false,
    aspectRatio: 'landscape'
  }
];

export const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: 'client-1',
    name: 'Apex Motors',
    industry: 'Electric Vehicles',
    testimonial: 'The cinematic video production and rebrand spearheaded by SSD elevated our brand presence into top-tier automotive luxury.',
    author: 'Elena Rostova',
    role: 'Global Marketing Director'
  },
  {
    id: 'client-2',
    name: 'Lumina Luxury',
    industry: 'Haute Horlogerie',
    testimonial: 'Meticulous attention to detail, lighting, and storytelling. They understand the nuances of high-end luxury like few creative teams can.',
    author: 'Julian Thorne',
    role: 'Brand Custodian'
  },
  {
    id: 'client-3',
    name: 'Urban Pulse',
    industry: 'Streetwear & Lifestyle',
    testimonial: 'Our social engagement skyrocketed 3x within 60 days of partnering with SSD Creative Studio. They live and breathe contemporary culture.',
    author: 'Maya Lin',
    role: 'Creative Director'
  },
  {
    id: 'client-4',
    name: 'Vortex Logistics',
    industry: 'Enterprise SaaS',
    testimonial: 'Their web engineering team delivered an award-worthy application ahead of deadline. Stunning aesthetics paired with rock-solid performance.',
    author: 'Marcus Brody',
    role: 'Chief Technology Officer'
  },
  {
    id: 'client-5',
    name: 'Aetheria Sound',
    industry: 'Audio Hardware & Digital',
    testimonial: 'SSD Creative Studio transformed how we present our audio innovations to the world. Their 3D visuals and creative execution are unmatched.',
    author: 'Devon Vance',
    role: 'Head of Creative Design'
  }
];
