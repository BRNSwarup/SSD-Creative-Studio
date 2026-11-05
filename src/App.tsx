import React, { useState, useEffect } from 'react';
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
import { AdminModal } from './components/AdminModal';
import { VideoModal } from './components/VideoModal';
import { ImageModal } from './components/ImageModal';
import { motion } from 'framer-motion';

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

  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectService = (serviceName: string) => {
    setSelectedServicePreset(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenVideo = (url: string, title: string) => {
    setVideoModal({
      isOpen: true,
      url,
      title,
    });
  };

  const handleOpenImage = (image: string, title: string, description: string) => {
    setImageModal({
      isOpen: true,
      image,
      title,
      description,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#111111] selection:bg-[#00D664] selection:text-white">
      {/* Floating Light Luxury Navbar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

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
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Structured Executive Admin Console Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        content={content}
        services={services}
        portfolio={portfolio}
        clients={clients}
        onDataUpdated={loadData}
      />

      {/* Video Player Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        videoUrl={videoModal.url}
        title={videoModal.title}
        onClose={() => setVideoModal({ isOpen: false, url: '', title: '' })}
      />

      {/* Image Lightbox Modal */}
      <ImageModal
        isOpen={imageModal.isOpen}
        image={imageModal.image}
        title={imageModal.title}
        description={imageModal.description}
        onClose={() => setImageModal({ isOpen: false, image: '', title: '', description: '' })}
      />
    </div>
  );
}

export default App;
