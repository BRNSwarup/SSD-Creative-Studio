-- =======================================================
-- SSD CREATIVE STUDIO - SUPABASE DATABASE SCHEMA
-- Run this once in your Supabase Dashboard -> SQL Editor
-- =======================================================

-- 1. Inquiries Table (Contact Form Leads)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  icon TEXT,
  visual_type TEXT,
  image TEXT
);

-- 3. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT,
  client TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  video_url TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  aspect_ratio TEXT DEFAULT 'landscape',
  external_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Clients & Testimonials Table
CREATE TABLE IF NOT EXISTS public.clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_text TEXT,
  logo_url TEXT,
  industry TEXT,
  testimonial TEXT,
  author TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Site Content & Headlines Table
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  hero_badge TEXT,
  hero_title_line1 TEXT,
  hero_title_highlight TEXT,
  hero_description TEXT,
  hero_tagline TEXT,
  hero_stat1_num TEXT,
  hero_stat1_label TEXT,
  hero_stat2_num TEXT,
  hero_stat2_label TEXT,
  hero_stat3_num TEXT,
  hero_stat3_label TEXT,
  hero_reel_url TEXT,
  about_badge TEXT,
  about_title_line1 TEXT,
  about_title_highlight TEXT,
  about_desc1 TEXT,
  about_desc2 TEXT,
  why_badge TEXT,
  why_title_line1 TEXT,
  why_title_highlight TEXT,
  why_description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_whatsapp TEXT,
  contact_location TEXT,
  contact_instagram TEXT,
  contact_youtube TEXT,
  contact_linkedin TEXT,
  contact_twitter TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns safely if tables already existed
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.portfolio ADD COLUMN IF NOT EXISTS external_url TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS logo_text TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies safely before recreating
DROP POLICY IF EXISTS "Public Read Services" ON public.services;
DROP POLICY IF EXISTS "Public Read Portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Public Read Clients" ON public.clients;
DROP POLICY IF EXISTS "Public Read Content" ON public.site_content;
DROP POLICY IF EXISTS "Public Insert Inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public Read Inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow All Services" ON public.services;
DROP POLICY IF EXISTS "Allow All Portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Allow All Clients" ON public.clients;
DROP POLICY IF EXISTS "Allow All Content" ON public.site_content;
DROP POLICY IF EXISTS "Allow All Inquiries" ON public.inquiries;

-- Allow public read access to all published content
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Portfolio" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Public Read Clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Public Read Content" ON public.site_content FOR SELECT USING (true);

-- Allow public to submit inquiries
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Inquiries" ON public.inquiries FOR SELECT USING (true);

-- Allow full access for site administration
CREATE POLICY "Allow All Services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Portfolio" ON public.portfolio FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Content" ON public.site_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime instant sync across all browsers & devices
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'site_content'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'services'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'portfolio'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'clients'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.clients;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'inquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
  END IF;
END $$;
