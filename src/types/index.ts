export type ServiceCategory = 'creative-media' | 'social-media' | 'branding' | 'web-tech';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  icon: string;
  visualType: 'camera' | 'network' | 'prism' | 'code';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'video' | 'photography' | 'social' | 'web' | 'branding';
  categoryLabel: string;
  client: string;
  description: string;
  image: string;
  videoUrl?: string;
  tags: string[];
  featured?: boolean;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  externalUrl?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  logoText?: string;
  logoUrl?: string;
  industry: string;
  testimonial?: string;
  author?: string;
  role?: string;
}

export interface InquiryItem {
  id: string;
  created_at: string;
  business_name: string;
  contact_person: string;
  phone: string;
  email: string;
  service: string;
  description: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface SiteContent {
  // Hero Section
  hero_badge: string;
  hero_title_line1: string;
  hero_title_highlight: string;
  hero_description: string;
  hero_tagline: string;
  hero_stat1_num: string;
  hero_stat1_label: string;
  hero_stat2_num: string;
  hero_stat2_label: string;
  hero_stat3_num: string;
  hero_stat3_label: string;
  hero_reel_url: string;

  // About Section
  about_badge: string;
  about_title_line1: string;
  about_title_highlight: string;
  about_desc1: string;
  about_desc2: string;

  // Why Us Section
  why_badge: string;
  why_title_line1: string;
  why_title_highlight: string;
  why_description: string;

  // Contact Info
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_location: string;
  contact_instagram: string;
  contact_youtube: string;
  contact_linkedin: string;
  contact_twitter: string;
}
