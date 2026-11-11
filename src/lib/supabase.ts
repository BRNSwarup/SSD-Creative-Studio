import { createClient } from '@supabase/supabase-js';
import { ServiceItem, PortfolioItem, ClientItem, InquiryItem, SiteContent } from '../types';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_CLIENTS, INITIAL_SITE_CONTENT } from '../data/initialData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://fjhypjaumezgzgqgpodm.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_3zzWadne7hdbOqJpOKczKg_j5CaZKUq';
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaHlwamF1bWV6Z3pncWdwb2RtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzY5OTEwMSwiZXhwIjoyMTA5Mjc1MTAxfQ.libDcSp8NmMMqWfH70eOvbVW6_5MI15JE4iriKvBsSk';

// Public client for anonymous reads & contact form submissions
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin client for privileged updates
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY, {
  auth: { persistSession: false }
});

// Storage keys for resilient local fallback
const STORAGE_SERVICES_KEY = 'ssd_studio_services_v1';
const STORAGE_PORTFOLIO_KEY = 'ssd_studio_portfolio_v1';
const STORAGE_CLIENTS_KEY = 'ssd_studio_clients_v1';
const STORAGE_INQUIRIES_KEY = 'ssd_studio_inquiries_v1';
const STORAGE_CONTENT_KEY = 'ssd_studio_content_v1';

// ----------------- SITE CONTENT -----------------
export async function getSiteContent(): Promise<SiteContent> {
  const enrichContent = (data: any): SiteContent => {
    const res = { ...INITIAL_SITE_CONTENT, ...data };
    if (!res.hero_reel_url || res.hero_reel_url.includes('BigBuckBunny')) {
      res.hero_reel_url = '/showreel.mp4';
    }
    return res;
  };

  try {
    const { data, error } = await supabase.from('site_content').select('*').single();
    if (!error && data) {
      const enriched = enrichContent(data);
      localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(enriched));
      return enriched;
    }
  } catch (err) {
    console.warn('Supabase site_content fallback:', err);
  }

  const cached = localStorage.getItem(STORAGE_CONTENT_KEY);
  if (cached) {
    try {
      const enriched = enrichContent(JSON.parse(cached));
      localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(enriched));
      return enriched;
    } catch (e) {}
  }

  localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(INITIAL_SITE_CONTENT));
  return INITIAL_SITE_CONTENT;
}

export async function saveSiteContent(content: SiteContent): Promise<boolean> {
  localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(content));
  try {
    const { error } = await supabaseAdmin.from('site_content').upsert({ id: 'main', ...content });
    if (error) console.warn('Supabase content upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase content sync failed:', err);
  }
  return true;
}

// ----------------- SERVICES -----------------
export async function getServices(): Promise<ServiceItem[]> {
  const enrichService = (s: any): ServiceItem => {
    if (s.id === 'creative-media' && !s.image) return { ...s, image: '/services/creative-media-3d.jpg' };
    if (s.id === 'social-media' && !s.image) return { ...s, image: '/services/social-media-3d.png' };
    if (s.id === 'branding-design' && !s.image) return { ...s, image: '/services/branding-design-3d.jpg' };
    if (s.id === 'web-technology' && !s.image) return { ...s, image: '/services/web-technology-3d.jpg' };
    return s as ServiceItem;
  };

  try {
    const { data, error } = await supabase.from('services').select('*');
    if (!error && data && data.length > 0) {
      const merged = data.map(enrichService);
      localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.warn('Supabase services fetch failed:', err);
  }

  const cached = localStorage.getItem(STORAGE_SERVICES_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return parsed.map(enrichService);
    } catch (e) {}
  }

  localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(INITIAL_SERVICES));
  return INITIAL_SERVICES;
}

export async function saveServices(services: ServiceItem[]): Promise<boolean> {
  localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(services));
  try {
    const { error } = await supabaseAdmin.from('services').upsert(services);
    if (error) console.warn('Supabase services upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase services sync failed:', err);
  }
  return true;
}

// ----------------- PORTFOLIO -----------------
export async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const { data, error } = await supabase.from('portfolio').select('*');
    if (!error && data && data.length > 0) {
      localStorage.setItem(STORAGE_PORTFOLIO_KEY, JSON.stringify(data));
      return data as PortfolioItem[];
    }
  } catch (err) {
    console.warn('Supabase portfolio fetch fallback:', err);
  }

  const cached = localStorage.getItem(STORAGE_PORTFOLIO_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  localStorage.setItem(STORAGE_PORTFOLIO_KEY, JSON.stringify(INITIAL_PORTFOLIO));
  return INITIAL_PORTFOLIO;
}

export async function savePortfolio(portfolio: PortfolioItem[]): Promise<boolean> {
  localStorage.setItem(STORAGE_PORTFOLIO_KEY, JSON.stringify(portfolio));
  try {
    const { error } = await supabaseAdmin.from('portfolio').upsert(portfolio);
    if (error) console.warn('Supabase portfolio upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase portfolio sync failed:', err);
  }
  return true;
}

// ----------------- CLIENTS -----------------
export async function getClients(): Promise<ClientItem[]> {
  try {
    const { data, error } = await supabase.from('clients').select('*');
    if (!error && data && data.length > 0) {
      localStorage.setItem(STORAGE_CLIENTS_KEY, JSON.stringify(data));
      return data as ClientItem[];
    }
  } catch (err) {
    console.warn('Supabase clients fetch fallback:', err);
  }

  const cached = localStorage.getItem(STORAGE_CLIENTS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  localStorage.setItem(STORAGE_CLIENTS_KEY, JSON.stringify(INITIAL_CLIENTS));
  return INITIAL_CLIENTS;
}

export async function saveClients(clients: ClientItem[]): Promise<boolean> {
  localStorage.setItem(STORAGE_CLIENTS_KEY, JSON.stringify(clients));
  try {
    const { error } = await supabaseAdmin.from('clients').upsert(clients);
    if (error) console.warn('Supabase clients upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase clients sync failed:', err);
  }
  return true;
}

// ----------------- INQUIRIES -----------------
export async function getInquiries(): Promise<InquiryItem[]> {
  try {
    const { data, error } = await supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(data));
      return data as InquiryItem[];
    }
  } catch (err) {
    console.warn('Supabase inquiries fetch fallback:', err);
  }

  const cached = localStorage.getItem(STORAGE_INQUIRIES_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return [];
}

export async function submitInquiry(inquiry: Omit<InquiryItem, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; id: string }> {
  const newInquiry: InquiryItem = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    created_at: new Date().toISOString(),
    status: 'new'
  };

  const current = await getInquiries();
  const updated = [newInquiry, ...current];
  localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(updated));

  try {
    const { error } = await supabase.from('inquiries').insert([{
      business_name: newInquiry.business_name,
      contact_person: newInquiry.contact_person,
      phone: newInquiry.phone,
      email: newInquiry.email,
      service: newInquiry.service,
      description: newInquiry.description,
      status: 'new'
    }]);
    if (error) {
      console.warn('Supabase inquiry insert response:', error.message);
    }
  } catch (err) {
    console.warn('Supabase inquiry network error:', err);
  }

  return { success: true, id: newInquiry.id };
}
