import React, { useState, useEffect } from 'react';
import { ServiceItem, PortfolioItem, ClientItem, InquiryItem, SiteContent } from '../types';
import { saveServices, savePortfolio, saveClients, saveSiteContent, getInquiries } from '../lib/supabase';
import { X, Lock, Plus, Trash2, RefreshCw, Layers, Image, Users, MessageSquare, LogOut, Check, Sliders, Sparkles, Phone, Award, FileText, CheckCircle2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: SiteContent;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  clients: ClientItem[];
  onDataUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  content,
  services,
  portfolio,
  clients,
  onDataUpdated
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Main Category Tab
  const [activeCategory, setActiveCategory] = useState<'content' | 'portfolio' | 'services' | 'clients' | 'inquiries'>('content');

  // Sub-navigation for Site Content (keeps fields from mixing!)
  const [contentSubTab, setContentSubTab] = useState<'hero' | 'metrics' | 'about' | 'why' | 'contact'>('hero');

  // Editable Site Content State
  const [editableContent, setEditableContent] = useState<SiteContent>(content);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Inquiries state
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Form states for new project additions
  const [newProject, setNewProject] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'video',
    categoryLabel: 'Video Showcase',
    client: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1579965342565-1644233772c5?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '',
    tags: ['Cinema', '4K'],
    featured: true
  });
  const [tagsInput, setTagsInput] = useState('Cinema, 4K, Production');

  // Form state for new client
  const [newClient, setNewClient] = useState<Partial<ClientItem>>({
    name: '',
    industry: '',
    testimonial: '',
    author: '',
    role: ''
  });

  const [newServiceDeliverable, setNewServiceDeliverable] = useState<{ [serviceId: string]: string }>({});

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  useEffect(() => {
    if (isAuthenticated) {
      loadInquiriesList();
    }
  }, [isAuthenticated]);

  const loadInquiriesList = async () => {
    setLoadingInquiries(true);
    const list = await getInquiries();
    setInquiries(list);
    setLoadingInquiries(false);
  };

  if (!isOpen) return null;

  // Handle PIN check (Required PIN: 188199)
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '188199') {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  // Save General Site Content
  const handleSaveSection = async (sectionName: string) => {
    await saveSiteContent(editableContent);
    onDataUpdated();
    setSavedSection(sectionName);
    setTimeout(() => setSavedSection(null), 3000);
  };

  // Add Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.client || !newProject.image) return;

    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const projectItem: PortfolioItem = {
      id: `proj-${Date.now()}`,
      title: newProject.title!,
      category: newProject.category as any,
      categoryLabel: newProject.category === 'video' ? 'Video Showcase' : newProject.category === 'web' ? 'Web & Tech' : newProject.category === 'social' ? 'Social Campaign' : newProject.category === 'branding' ? 'Branding & 3D' : 'Photography',
      client: newProject.client!,
      description: newProject.description || '',
      image: newProject.image!,
      videoUrl: newProject.videoUrl || undefined,
      tags: tagsArray.length > 0 ? tagsArray : ['Creative'],
      featured: true
    };

    const updated = [projectItem, ...portfolio];
    await savePortfolio(updated);
    onDataUpdated();
    setNewProject({
      title: '',
      category: 'video',
      client: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1579965342565-1644233772c5?auto=format&fit=crop&w=1200&q=80',
      videoUrl: '',
      tags: [],
      featured: true
    });
    alert('Project published successfully!');
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const updated = portfolio.filter(p => p.id !== id);
    await savePortfolio(updated);
    onDataUpdated();
  };

  // Add Client
  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name) return;

    const clientItem: ClientItem = {
      id: `client-${Date.now()}`,
      name: newClient.name!,
      industry: newClient.industry || 'Technology & Creative',
      testimonial: newClient.testimonial,
      author: newClient.author,
      role: newClient.role
    };

    const updated = [clientItem, ...clients];
    await saveClients(updated);
    onDataUpdated();
    setNewClient({ name: '', industry: '', testimonial: '', author: '', role: '' });
    alert('New client partner added successfully!');
  };

  // Delete Client
  const handleDeleteClient = async (id: string) => {
    if (!confirm('Remove this client?')) return;
    const updated = clients.filter(c => c.id !== id);
    await saveClients(updated);
    onDataUpdated();
  };

  // Add deliverable to service
  const handleAddDeliverable = async (serviceId: string) => {
    const text = newServiceDeliverable[serviceId];
    if (!text || !text.trim()) return;

    const updatedServices = services.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          items: [...s.items, text.trim()]
        };
      }
      return s;
    });

    await saveServices(updatedServices);
    onDataUpdated();
    setNewServiceDeliverable(prev => ({ ...prev, [serviceId]: '' }));
  };

  // Remove deliverable from service
  const handleRemoveDeliverable = async (serviceId: string, index: number) => {
    const updatedServices = services.map(s => {
      if (s.id === serviceId) {
        const newItems = [...s.items];
        newItems.splice(index, 1);
        return { ...s, items: newItems };
      }
      return s;
    });
    await saveServices(updatedServices);
    onDataUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[88vh] overflow-hidden rounded-3xl bg-white border border-neutral-300 shadow-2xl flex flex-col text-neutral-900">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-xl">
              📷
            </div>
            <div>
              <div className="text-base font-black text-black font-display flex items-center gap-2">
                <span>SSD STUDIO DIRECTOR CONSOLE</span>
                {isAuthenticated && (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green-dark border border-brand-green/30">
                    ONLINE
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-500 font-medium">
                Manage Live Site Copy, Highlights, Services, Portfolio & Inquiries
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-2 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                title="Lock"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* PIN Authentication Screen */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center shadow-sm">
              <Lock className="w-8 h-8 text-brand-green animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display text-2xl font-black text-black">
                Studio Director Access
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                Enter your 6-digit studio master key to modify live content.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
              <input
                type="password"
                maxLength={6}
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••••"
                className="w-full px-4 py-3.5 rounded-xl bg-neutral-100 border border-neutral-300 text-center text-2xl tracking-[0.4em] font-mono text-black focus:outline-none focus:border-brand-green focus:bg-white transition-all"
              />

              {pinError && (
                <div className="text-xs text-red-600 font-bold">
                  Incorrect PIN. Please re-enter your master key.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold uppercase tracking-wider text-xs transition-all shadow-md cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Structured Multi-Panel Dashboard */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Navigation Sidebar */}
            <div className="w-full md:w-60 bg-neutral-50 border-r border-neutral-200 p-4 space-y-2 shrink-0 overflow-y-auto">
              <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-3 py-1">
                STUDIO SECTIONS
              </div>

              <button
                onClick={() => setActiveCategory('content')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeCategory === 'content'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Site Copy & Highlights</span>
              </button>

              <button
                onClick={() => setActiveCategory('portfolio')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeCategory === 'portfolio'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Portfolio ({portfolio.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('services')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeCategory === 'services'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Services ({services.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('clients')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeCategory === 'clients'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Clients ({clients.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('inquiries');
                  loadInquiriesList();
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeCategory === 'inquiries'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Incoming Leads ({inquiries.length})</span>
              </button>
            </div>

            {/* Right Main Panel */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              
              {/* CATEGORY 1: SITE CONTENT & HIGHLIGHTS */}
              {activeCategory === 'content' && (
                <div className="space-y-6">
                  {/* Clean Sub-tab Navigation */}
                  <div className="flex items-center gap-2 pb-4 border-b border-neutral-200 overflow-x-auto">
                    <button
                      onClick={() => setContentSubTab('hero')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        contentSubTab === 'hero' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      Hero Section
                    </button>
                    <button
                      onClick={() => setContentSubTab('metrics')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        contentSubTab === 'metrics' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      Highlights & Stats
                    </button>
                    <button
                      onClick={() => setContentSubTab('about')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        contentSubTab === 'about' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      About Studio
                    </button>
                    <button
                      onClick={() => setContentSubTab('why')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        contentSubTab === 'why' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      Why Us
                    </button>
                    <button
                      onClick={() => setContentSubTab('contact')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        contentSubTab === 'contact' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      Contact & Socials
                    </button>
                  </div>

                  {/* 1.1 HERO SUBTAB */}
                  {contentSubTab === 'hero' && (
                    <div className="space-y-5 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display text-lg font-black text-black">Hero Section Headlines</h4>
                          <p className="text-xs text-neutral-500">Edit the top badge, oversized headline, and narrative text.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveSection('hero')}
                          className="px-5 py-2 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {savedSection === 'hero' ? <Check className="w-4 h-4 text-white" /> : null}
                          <span>{savedSection === 'hero' ? 'Saved!' : 'Save Hero'}</span>
                        </button>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Badge Pill Text</label>
                          <input
                            type="text"
                            value={editableContent.hero_badge}
                            onChange={(e) => setEditableContent({ ...editableContent, hero_badge: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Headline (Line 1)</label>
                            <input
                              type="text"
                              value={editableContent.hero_title_line1}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_title_line1: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Headline Highlight Text</label>
                            <input
                              type="text"
                              value={editableContent.hero_title_highlight}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_title_highlight: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Supporting Narrative Description</label>
                          <textarea
                            rows={3}
                            value={editableContent.hero_description}
                            onChange={(e) => setEditableContent({ ...editableContent, hero_description: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Showreel Video URL (MP4)</label>
                          <input
                            type="url"
                            value={editableContent.hero_reel_url}
                            onChange={(e) => setEditableContent({ ...editableContent, hero_reel_url: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1.2 METRICS & HIGHLIGHTS SUBTAB */}
                  {contentSubTab === 'metrics' && (
                    <div className="space-y-5 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display text-lg font-black text-black">Studio Highlights & Proven Track Record</h4>
                          <p className="text-xs text-neutral-500">Edit the 3 big numbers shown on the dedicated highlights section.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveSection('metrics')}
                          className="px-5 py-2 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {savedSection === 'metrics' ? <Check className="w-4 h-4 text-white" /> : null}
                          <span>{savedSection === 'metrics' ? 'Saved!' : 'Save Highlights'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                        {/* Highlight 1 */}
                        <div className="p-4 rounded-xl bg-white border border-neutral-300 space-y-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">HIGHLIGHT 1</span>
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Number / Value</label>
                            <input
                              type="text"
                              value={editableContent.hero_stat1_num}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_stat1_num: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm mt-1 font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Title Label</label>
                            <input
                              type="text"
                              value={editableContent.hero_stat1_label}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_stat1_label: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm mt-1"
                            />
                          </div>
                        </div>

                        {/* Highlight 2 */}
                        <div className="p-4 rounded-xl bg-white border border-neutral-300 space-y-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">HIGHLIGHT 2</span>
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Number / Value</label>
                            <input
                              type="text"
                              value={editableContent.hero_stat2_num}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_stat2_num: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm mt-1 font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Title Label</label>
                            <input
                              type="text"
                              value={editableContent.hero_stat2_label}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_stat2_label: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm mt-1"
                            />
                          </div>
                        </div>

                        {/* Highlight 3 */}
                        <div className="p-4 rounded-xl bg-white border border-neutral-300 space-y-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">HIGHLIGHT 3</span>
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Number / Value</label>
                            <input
                              type="text"
                              value={editableContent.hero_stat3_num}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_stat3_num: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm mt-1 font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Title Label</label>
                            <input
                              type="text"
                              value={editableContent.hero_stat3_label}
                              onChange={(e) => setEditableContent({ ...editableContent, hero_stat3_label: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1.3 ABOUT SUBTAB */}
                  {contentSubTab === 'about' && (
                    <div className="space-y-5 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display text-lg font-black text-black">About Section Narrative</h4>
                          <p className="text-xs text-neutral-500">Edit the studio story and vision.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveSection('about')}
                          className="px-5 py-2 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {savedSection === 'about' ? <Check className="w-4 h-4 text-white" /> : null}
                          <span>{savedSection === 'about' ? 'Saved!' : 'Save About'}</span>
                        </button>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">About Title Line 1</label>
                            <input
                              type="text"
                              value={editableContent.about_title_line1}
                              onChange={(e) => setEditableContent({ ...editableContent, about_title_line1: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">About Title Highlight</label>
                            <input
                              type="text"
                              value={editableContent.about_title_highlight}
                              onChange={(e) => setEditableContent({ ...editableContent, about_title_highlight: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Paragraph 1</label>
                          <textarea
                            rows={3}
                            value={editableContent.about_desc1}
                            onChange={(e) => setEditableContent({ ...editableContent, about_desc1: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Paragraph 2</label>
                          <textarea
                            rows={3}
                            value={editableContent.about_desc2}
                            onChange={(e) => setEditableContent({ ...editableContent, about_desc2: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1.4 WHY US SUBTAB */}
                  {contentSubTab === 'why' && (
                    <div className="space-y-5 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display text-lg font-black text-black">Why Us & Growth Partner Narrative</h4>
                          <p className="text-xs text-neutral-500">Edit the value proposition headline and overview.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveSection('why')}
                          className="px-5 py-2 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {savedSection === 'why' ? <Check className="w-4 h-4 text-white" /> : null}
                          <span>{savedSection === 'why' ? 'Saved!' : 'Save Why Us'}</span>
                        </button>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Badge Label</label>
                            <input
                              type="text"
                              value={editableContent.why_badge}
                              onChange={(e) => setEditableContent({ ...editableContent, why_badge: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase text-neutral-700">Headline Line 1</label>
                            <input
                              type="text"
                              value={editableContent.why_title_line1}
                              onChange={(e) => setEditableContent({ ...editableContent, why_title_line1: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Headline Highlight Text</label>
                          <input
                            type="text"
                            value={editableContent.why_title_highlight}
                            onChange={(e) => setEditableContent({ ...editableContent, why_title_highlight: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Section Overview</label>
                          <textarea
                            rows={3}
                            value={editableContent.why_description}
                            onChange={(e) => setEditableContent({ ...editableContent, why_description: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1.5 CONTACT SUBTAB */}
                  {contentSubTab === 'contact' && (
                    <div className="space-y-5 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display text-lg font-black text-black">Contact & Social Channels</h4>
                          <p className="text-xs text-neutral-500">Edit your public contact channels, WhatsApp number, and address.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveSection('contact')}
                          className="px-5 py-2 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {savedSection === 'contact' ? <Check className="w-4 h-4 text-white" /> : null}
                          <span>{savedSection === 'contact' ? 'Saved!' : 'Save Contact'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Direct Email</label>
                          <input
                            type="email"
                            value={editableContent.contact_email}
                            onChange={(e) => setEditableContent({ ...editableContent, contact_email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Studio Phone</label>
                          <input
                            type="text"
                            value={editableContent.contact_phone}
                            onChange={(e) => setEditableContent({ ...editableContent, contact_phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">WhatsApp Number (e.g. 919999999999)</label>
                          <input
                            type="text"
                            value={editableContent.contact_whatsapp}
                            onChange={(e) => setEditableContent({ ...editableContent, contact_whatsapp: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-neutral-700">Studio Location</label>
                          <input
                            type="text"
                            value={editableContent.contact_location}
                            onChange={(e) => setEditableContent({ ...editableContent, contact_location: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* CATEGORY 2: PORTFOLIO */}
              {activeCategory === 'portfolio' && (
                <div className="space-y-6">
                  {/* Add Project Form Card */}
                  <form onSubmit={handleAddProject} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-black text-black font-display flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-brand-green" />
                        <span>Add New Project to Portfolio</span>
                      </div>
                      <span className="text-[10px] font-black text-brand-green uppercase">LIVE PUBLIC ARCHIVE</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          placeholder="e.g. Lumina Fashion Film"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Client Name *</label>
                        <input
                          type="text"
                          required
                          value={newProject.client}
                          onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                          placeholder="e.g. Lumina Global"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Category</label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1 cursor-pointer"
                        >
                          <option value="video">Video Showcase</option>
                          <option value="photography">Photography</option>
                          <option value="social">Social Media</option>
                          <option value="web">Web & Tech</option>
                          <option value="branding">Branding & 3D</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Cover Image URL *</label>
                        <input
                          type="url"
                          required
                          value={newProject.image}
                          onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Video MP4 URL (Optional for Video Modal Playback)</label>
                        <input
                          type="url"
                          value={newProject.videoUrl}
                          onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                          placeholder="https://.../video.mp4"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Description</label>
                        <textarea
                          rows={2}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          placeholder="Brief summary of creative execution and impact..."
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                          placeholder="4K Cinema, FPV Drone, Sound Design"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Publish Project to Website
                    </button>
                  </form>

                  {/* Current Projects List */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase text-neutral-500">Current Published Projects ({portfolio.length})</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {portfolio.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3 shadow-sm"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                            />
                            <div className="overflow-hidden">
                              <div className="text-xs font-bold text-black truncate">{item.title}</div>
                              <div className="text-[10px] text-neutral-500 truncate">{item.client} &bull; {item.category}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CATEGORY 3: SERVICES */}
              {activeCategory === 'services' && (
                <div className="space-y-6">
                  <div className="text-xs text-neutral-500">
                    Manage service deliverables and offerings shown on the 3D interactive service suite.
                  </div>

                  <div className="space-y-6">
                    {services.map((svc) => (
                      <div key={svc.id} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-base font-bold text-black font-display">{svc.title}</div>
                            <div className="text-xs text-brand-green font-bold">{svc.tagline}</div>
                          </div>
                          <span className="text-xs font-bold text-neutral-500 px-3 py-1 rounded-full bg-white border border-neutral-200">
                            {svc.visualType.toUpperCase()} 3D
                          </span>
                        </div>

                        {/* Deliverables List */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-bold uppercase text-neutral-500">Deliverables List:</div>
                          <div className="space-y-1.5">
                            {svc.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700">
                                <span>&bull; {item}</span>
                                <button
                                  onClick={() => handleRemoveDeliverable(svc.id, idx)}
                                  className="text-neutral-400 hover:text-red-600 cursor-pointer p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Add deliverable input */}
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="text"
                            placeholder="Add new deliverable or capability..."
                            value={newServiceDeliverable[svc.id] || ''}
                            onChange={(e) => setNewServiceDeliverable({ ...newServiceDeliverable, [svc.id]: e.target.value })}
                            className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-xs text-black"
                          />
                          <button
                            onClick={() => handleAddDeliverable(svc.id)}
                            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CATEGORY 4: CLIENTS */}
              {activeCategory === 'clients' && (
                <div className="space-y-6">
                  {/* Add Client Form */}
                  <form onSubmit={handleAddClient} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-sm">
                    <div className="text-sm font-black text-black font-display flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-brand-green" />
                      <span>Add Client or Testimonial</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Client / Brand Name *</label>
                        <input
                          type="text"
                          required
                          value={newClient.name}
                          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                          placeholder="e.g. Apex Global"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Industry / Domain</label>
                        <input
                          type="text"
                          value={newClient.industry}
                          onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                          placeholder="e.g. Autonomous Tech"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Author Name</label>
                        <input
                          type="text"
                          value={newClient.author}
                          onChange={(e) => setNewClient({ ...newClient, author: e.target.value })}
                          placeholder="e.g. Sarah Connor"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Role / Position</label>
                        <input
                          type="text"
                          value={newClient.role}
                          onChange={(e) => setNewClient({ ...newClient, role: e.target.value })}
                          placeholder="e.g. Chief Marketing Officer"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold uppercase text-neutral-600">Testimonial Quote</label>
                        <textarea
                          rows={2}
                          value={newClient.testimonial}
                          onChange={(e) => setNewClient({ ...newClient, testimonial: e.target.value })}
                          placeholder="What was their experience partnering with SSD Creative Studio..."
                          className="w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold text-xs uppercase cursor-pointer"
                    >
                      Save Client Partner
                    </button>
                  </form>

                  {/* Current Clients List */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase text-neutral-500">Active Client Partners ({clients.length})</div>
                    <div className="space-y-2">
                      {clients.map((c) => (
                        <div key={c.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between shadow-sm">
                          <div>
                            <div className="text-sm font-bold text-black">{c.name} <span className="text-neutral-500 font-medium text-xs">({c.industry})</span></div>
                            {c.testimonial && <div className="text-xs text-neutral-600 italic mt-1">"{c.testimonial}" &mdash; {c.author}</div>}
                          </div>
                          <button
                            onClick={() => handleDeleteClient(c.id)}
                            className="p-2 text-neutral-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CATEGORY 5: INCOMING LEADS */}
              {activeCategory === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-black">Live Incoming Leads</h4>
                      <p className="text-xs text-neutral-500">Messages submitted through the public Contact form.</p>
                    </div>
                    <button
                      onClick={loadInquiriesList}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs text-black font-bold cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {loadingInquiries ? (
                    <div className="py-12 text-center text-xs text-neutral-500 font-medium">Loading inquiries...</div>
                  ) : inquiries.length === 0 ? (
                    <div className="py-12 text-center text-xs text-neutral-500 font-medium">
                      No inquiries yet. Submissions through the Contact form will appear here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-base font-black text-black">{inq.business_name}</div>
                            <span className="text-xs font-bold text-brand-green px-3 py-1 rounded-full bg-brand-green/15">
                              {inq.service}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
                            <div>Contact: <span className="text-black font-bold">{inq.contact_person}</span></div>
                            <div>Email: <a href={`mailto:${inq.email}`} className="text-brand-green font-bold underline">{inq.email}</a></div>
                            <div>Phone: <span className="text-black font-bold">{inq.phone || 'N/A'}</span></div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
                            {inq.description}
                          </div>

                          <div className="text-[10px] text-neutral-400 font-medium">
                            Received: {new Date(inq.created_at).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
