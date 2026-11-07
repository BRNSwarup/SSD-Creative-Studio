import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { getSiteContent, getServices, getPortfolio, getClients } from './lib/supabase';
import { ServiceItem, PortfolioItem, ClientItem, SiteContent } from './types';
import { INITIAL_SITE_CONTENT } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyUs } from './components/WhyUs';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { motion } from 'framer-motion';

// Code-split modals for faster initial load & zero unnecessary DOM overhead
const AdminModal = lazy(() => import('./components/AdminModal').then(m => ({ default: m.AdminModal })));
const VideoModal = lazy(() => import('./components/VideoModal').then(m => ({ default: m.VideoModal })));
const ImageModal = lazy(() => import('./components/ImageModal').then(m => ({ default: m.ImageModal })));

export function App() {
  const [content, setContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin Modal
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Video Modal
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  // Image Modal
  const [imageModal, setImageModal] = useState<{ isOpen: boolean; image: string; title: string; description: string }>({
    isOpen: false,
    image: '',
    title: '',
    description: '',
  });

  // Contact preset service
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');

  const loadData = useCallback(async () => {
    try {
      const [siteContentData, svcData, portData, clientData] = await Promise.all([
        getSiteContent(),
        getServices(),
        getPortfolio(),
        getClients(),
      ]);
      setContent(siteContentData);
      setServices(svcData);
      setPortfolio(portData);
      setClients(clientData);
    } catch (err) {
      console.error('Data load error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectService = useCallback((serviceName: string) => {
    setSelectedServicePreset(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenVideo = useCallback((url: string, title: string) => {
    setVideoModal({
      isOpen: true,
      url,
      title,
    });
  }, []);

  const handleCloseVideo = useCallback(() => {
    setVideoModal({ isOpen: false, url: '', title: '' });
  }, []);

  const handleOpenImage = useCallback((image: string, title: string, description: string) => {
    setImageModal({
      isOpen: true,
      image,
      title,
      description,
    });
  }, []);

  const handleCloseImage = useCallback(() => {
    setImageModal({ isOpen: false, image: '', title: '', description: '' });
  }, []);

  const handleOpenAdmin = useCallback(() => {
    setIsAdminOpen(true);
  }, []);

  const handleCloseAdmin = useCallback(() => {
    setIsAdminOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#111111] selection:bg-[#00D664] selection:text-white">
      {/* Floating Light Luxury Navbar */}
      <Navbar onOpenAdmin={handleOpenAdmin} />

      {/* Main Sections with Silky Scroll Reveal Animations */}
      <main>
        {/* Full-screen Hero with Interactive 3D Cinema Lens */}
        <Hero content={content} onOpenVideo={handleOpenVideo} />

        {/* Dedicated Highlight Metrics Section (4K+ Shoots, 150+ Brands, 99.8% Delight) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Highlights content={content} />
        </motion.div>

        {/* Creativity Meets Technology - About Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <About content={content} />
        </motion.div>

        {/* 4 Unique Interactive 3D Service Experiences */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Services
            services={services}
            onSelectService={handleSelectService}
          />
        </motion.div>

        {/* Immersive Portfolio Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Portfolio
            portfolio={portfolio}
            onOpenVideo={handleOpenVideo}
            onOpenImage={handleOpenImage}
          />
        </motion.div>

        {/* Why Us - 5 Core Growth Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <WhyUs content={content} />
        </motion.div>

        {/* Slowly Scrolling Companies & Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Clients clients={clients} />
        </motion.div>

        {/* Contact & Real Inquiry Transmission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Contact content={content} selectedServicePreset={selectedServicePreset} />
        </motion.div>
      </main>

      {/* Footer with Secret Camera Emoji (No text, No password tooltip) */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Modals are lazily loaded and mounted strictly on demand */}
      <Suspense fallback={null}>
        {isAdminOpen && (
          <AdminModal
            isOpen={isAdminOpen}
            onClose={handleCloseAdmin}
            content={content}
            services={services}
            portfolio={portfolio}
            clients={clients}
            onDataUpdated={loadData}
          />
        )}

        {videoModal.isOpen && (
          <VideoModal
            isOpen={videoModal.isOpen}
            videoUrl={videoModal.url}
            title={videoModal.title}
            onClose={handleCloseVideo}
          />
        )}

        {imageModal.isOpen && (
          <ImageModal
            isOpen={imageModal.isOpen}
            image={imageModal.image}
            title={imageModal.title}
            description={imageModal.description}
            onClose={handleCloseImage}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
