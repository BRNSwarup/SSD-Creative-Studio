import { createClient } from '@supabase/supabase-js';
import { ServiceItem, PortfolioItem, ClientItem, InquiryItem, SiteContent } from '../types';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_CLIENTS, INITIAL_SITE_CONTENT } from '../data/initialData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://fjhypjaumezgzgqgpodm.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_3zzWadne7hdbOqJpOKczKg_j5CaZKUq';
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaHlwamF1bWV6Z3pncWdwb2RtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzY5OTEwMSwiZXhwIjoyMTA5Mjc1MTAxfQ.libDcSp8NmMMqWfH70eOvbVW6_5MI15JE4iriKvBsSk';

// Public client for anonymous reads, realtime subscriptions & contact form submissions
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Admin client for privileged updates
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

const SYNC_CHANNEL_NAME = 'ssd_studio_sync';

// Clean up any legacy localStorage keys so Supabase is the sole backend store
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    [
      'ssd_studio_services_v1',
      'ssd_studio_portfolio_v1',
      'ssd_studio_clients_v1',
      'ssd_studio_inquiries_v1',
      'ssd_studio_content_v1',
    ].forEach((key) => window.localStorage.removeItem(key));
  }
} catch {
  // Ignore storage access errors
}

export interface SaveResult {
  synced: boolean;
  error?: string;
}

export interface SupabaseHealth {
  connected: boolean;
  missingTables: string[];
  error?: string;
}

function broadcastSync() {
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const ch = new BroadcastChannel(SYNC_CHANNEL_NAME);
      ch.postMessage({ type: 'STUDIO_UPDATED', ts: Date.now() });
      ch.close();
    }
  } catch {
    // Ignore BroadcastChannel errors in unsupported environments
  }
}

// ----------------- HEALTH CHECK -----------------
export async function checkSupabaseConnection(): Promise<SupabaseHealth> {
  const tables = ['site_content', 'services', 'portfolio', 'clients', 'inquiries'];
  const missingTables: string[] = [];
  let lastError: string | undefined;

  await Promise.all(
    tables.map(async (table) => {
      try {
        const { error } = await supabaseAdmin.from(table).select('id').limit(1);
        if (error) {
          if (
            error.message.includes('Could not find the table') ||
            error.message.includes('does not exist') ||
            error.code === '42P01'
          ) {
            missingTables.push(table);
          } else {
            lastError = error.message;
          }
        }
      } catch (err: any) {
        lastError = err?.message || 'Network error';
      }
    })
  );

  return {
    connected: missingTables.length === 0 && !lastError,
    missingTables,
    error: lastError,
  };
}

// ----------------- REALTIME & CROSS-BROWSER SYNC -----------------
export function subscribeToStudioUpdates(onUpdate: () => void): () => void {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const triggerUpdate = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onUpdate();
    }, 150);
  };

  // 1. Supabase Realtime WebSocket channel (cross-browser & cross-device)
  const channel = supabase
    .channel('ssd-studio-public-sync')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, triggerUpdate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, triggerUpdate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio' }, triggerUpdate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, triggerUpdate)
    .subscribe();

  // 2. BroadcastChannel for instant same-browser multi-tab sync
  let bc: BroadcastChannel | null = null;
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      bc.onmessage = triggerUpdate;
    }
  } catch {
    bc = null;
  }

  return () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    supabase.removeChannel(channel);
    if (bc) bc.close();
  };
}

// ----------------- MAPPERS (DB snake_case <-> App camelCase) -----------------
function mapServiceFromDb(row: any): ServiceItem {
  const id = row.id;
  const defaultImage =
    id === 'creative-media'
      ? '/services/creative-media-3d.jpg'
      : id === 'social-media'
      ? '/services/social-media-3d.png'
      : id === 'branding-design'
      ? '/services/branding-design-3d.jpg'
      : id === 'web-technology'
      ? '/services/web-technology-3d.jpg'
      : undefined;

  return {
    id,
    category: row.category,
    title: row.title,
    tagline: row.tagline || '',
    description: row.description || '',
    items: Array.isArray(row.items) ? row.items : [],
    icon: row.icon || 'Sparkles',
    visualType: row.visual_type || row.visualType || 'camera',
    image: row.image || defaultImage,
  };
}

function mapServiceToDb(svc: ServiceItem) {
  return {
    id: svc.id,
    category: svc.category,
    title: svc.title,
    tagline: svc.tagline,
    description: svc.description,
    items: svc.items,
    icon: svc.icon,
    visual_type: svc.visualType,
    image: svc.image || null,
  };
}

function mapPortfolioFromDb(row: any): PortfolioItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    categoryLabel: row.category_label || row.categoryLabel || row.category,
    client: row.client,
    description: row.description || '',
    image: row.image,
    videoUrl: row.video_url || row.videoUrl || undefined,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: Boolean(row.featured),
    aspectRatio: row.aspect_ratio || row.aspectRatio || 'landscape',
    externalUrl: row.external_url || row.externalUrl || undefined,
  };
}

function mapPortfolioToDb(item: PortfolioItem) {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    category_label: item.categoryLabel,
    client: item.client,
    description: item.description,
    image: item.image,
    video_url: item.videoUrl || null,
    tags: item.tags,
    featured: Boolean(item.featured),
    aspect_ratio: item.aspectRatio || 'landscape',
    external_url: item.externalUrl || null,
  };
}

function mapClientFromDb(row: any): ClientItem {
  return {
    id: row.id,
    name: row.name,
    logoText: row.logo_text || row.logoText || undefined,
    logoUrl: row.logo_url || row.logoUrl || undefined,
    industry: row.industry || '',
    testimonial: row.testimonial || undefined,
    author: row.author || undefined,
    role: row.role || undefined,
  };
}

function mapClientToDb(client: ClientItem) {
  return {
    id: client.id,
    name: client.name,
    logo_text: client.logoText || null,
    logo_url: client.logoUrl || null,
    industry: client.industry || '',
    testimonial: client.testimonial || null,
    author: client.author || null,
    role: client.role || null,
  };
}

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
    const { data, error } = await supabase.from('site_content').select('*').eq('id', 'main').single();
    if (!error && data) {
      return enrichContent(data);
    }
    // Seed Supabase if empty
    await supabaseAdmin
      .from('site_content')
      .upsert({ id: 'main', ...INITIAL_SITE_CONTENT, updated_at: new Date().toISOString() });
  } catch (err) {
    console.warn('Supabase site_content fetch error:', err);
  }

  return INITIAL_SITE_CONTENT;
}

export async function saveSiteContent(content: SiteContent): Promise<SaveResult> {
  try {
    const { error } = await supabaseAdmin
      .from('site_content')
      .upsert({ id: 'main', ...content, updated_at: new Date().toISOString() });
    if (error) {
      console.warn('Supabase content upsert error:', error.message);
      return { synced: false, error: error.message };
    }
    broadcastSync();
    return { synced: true };
  } catch (err: any) {
    console.warn('Supabase content sync failed:', err);
    return { synced: false, error: err?.message || 'Network error' };
  }
}

// ----------------- SERVICES -----------------
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase.from('services').select('*');
    if (!error && data && data.length > 0) {
      return data.map(mapServiceFromDb);
    }
    if (!error && data && data.length === 0) {
      await supabaseAdmin.from('services').upsert(INITIAL_SERVICES.map(mapServiceToDb));
    }
  } catch (err) {
    console.warn('Supabase services fetch failed:', err);
  }

  return INITIAL_SERVICES;
}

export async function saveServices(services: ServiceItem[]): Promise<SaveResult> {
  try {
    const rows = services.map(mapServiceToDb);
    const { error } = await supabaseAdmin.from('services').upsert(rows);
    if (error) {
      console.warn('Supabase services upsert error:', error.message);
      return { synced: false, error: error.message };
    }
    broadcastSync();
    return { synced: true };
  } catch (err: any) {
    console.warn('Supabase services sync failed:', err);
    return { synced: false, error: err?.message || 'Network error' };
  }
}

// ----------------- PORTFOLIO -----------------
export async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map(mapPortfolioFromDb);
    }
    if (!error && data && data.length === 0) {
      await supabaseAdmin.from('portfolio').upsert(INITIAL_PORTFOLIO.map(mapPortfolioToDb));
    }
  } catch (err) {
    console.warn('Supabase portfolio fetch failed:', err);
  }

  return INITIAL_PORTFOLIO;
}

export async function savePortfolio(portfolio: PortfolioItem[], deletedId?: string): Promise<SaveResult> {
  try {
    if (deletedId) {
      const { error: delErr } = await supabaseAdmin.from('portfolio').delete().eq('id', deletedId);
      if (delErr) {
        console.warn('Supabase portfolio delete error:', delErr.message);
        return { synced: false, error: delErr.message };
      }
    }
    if (portfolio.length > 0) {
      const rows = portfolio.map(mapPortfolioToDb);
      const { error } = await supabaseAdmin.from('portfolio').upsert(rows);
      if (error) {
        console.warn('Supabase portfolio upsert error:', error.message);
        return { synced: false, error: error.message };
      }
    }
    broadcastSync();
    return { synced: true };
  } catch (err: any) {
    console.warn('Supabase portfolio sync failed:', err);
    return { synced: false, error: err?.message || 'Network error' };
  }
}

// ----------------- CLIENTS -----------------
export async function getClients(): Promise<ClientItem[]> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map(mapClientFromDb);
    }
    if (!error && data && data.length === 0) {
      await supabaseAdmin.from('clients').upsert(INITIAL_CLIENTS.map(mapClientToDb));
    }
  } catch (err) {
    console.warn('Supabase clients fetch failed:', err);
  }

  return INITIAL_CLIENTS;
}

export async function saveClients(clients: ClientItem[], deletedId?: string): Promise<SaveResult> {
  try {
    if (deletedId) {
      const { error: delErr } = await supabaseAdmin.from('clients').delete().eq('id', deletedId);
      if (delErr) {
        console.warn('Supabase clients delete error:', delErr.message);
        return { synced: false, error: delErr.message };
      }
    }
    if (clients.length > 0) {
      const rows = clients.map(mapClientToDb);
      const { error } = await supabaseAdmin.from('clients').upsert(rows);
      if (error) {
        console.warn('Supabase clients upsert error:', error.message);
        return { synced: false, error: error.message };
      }
    }
    broadcastSync();
    return { synced: true };
  } catch (err: any) {
    console.warn('Supabase clients sync failed:', err);
    return { synced: false, error: err?.message || 'Network error' };
  }
}

// ----------------- INQUIRIES -----------------
export async function getInquiries(): Promise<InquiryItem[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      return data as InquiryItem[];
    }
  } catch (err) {
    console.warn('Supabase inquiries fetch error:', err);
  }
  return [];
}

export async function submitInquiry(
  inquiry: Omit<InquiryItem, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; id: string }> {
  const tempId = `inq-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          business_name: inquiry.business_name,
          contact_person: inquiry.contact_person,
          phone: inquiry.phone,
          email: inquiry.email,
          service: inquiry.service,
          description: inquiry.description,
          status: 'new',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.warn('Supabase inquiry insert error:', error.message);
      return { success: false, id: tempId };
    }
    return { success: true, id: data?.id || tempId };
  } catch (err) {
    console.warn('Supabase inquiry network error:', err);
    return { success: false, id: tempId };
  }
}
