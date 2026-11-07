import React, { useState } from 'react';
import { SiteContent } from '../types';
import { submitInquiry } from '../lib/supabase';
import confetti from 'canvas-confetti';
import { Send, MessageSquare, Mail, MapPin, CheckCircle, ArrowRight, Sparkles, Instagram, Youtube, Linkedin, Twitter, Phone } from 'lucide-react';

interface ContactProps {
  content: SiteContent;
  selectedServicePreset?: string;
}

export const Contact: React.FC<ContactProps> = React.memo(({ content, selectedServicePreset }) => {
  const [formData, setFormData] = useState({
    business_name: '',
    contact_person: '',
    phone: '',
    email: '',
    service: selectedServicePreset || 'CREATIVE MEDIA',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (selectedServicePreset) {
      setFormData(prev => ({ ...prev, service: selectedServicePreset }));
    }
  }, [selectedServicePreset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!formData.business_name || !formData.contact_person || !formData.email || !formData.description) {
      setErrorMessage('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await submitInquiry({
        business_name: formData.business_name,
        contact_person: formData.contact_person,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        description: formData.description,
      });

      if (res.success) {
        setSubmitted(true);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00C853', '#111111', '#69F0AE', '#009624']
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error transmitting brief. Please reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SSD Creative Studio, I am interested in collaborating on ${formData.service || 'Creative Services'} for ${formData.business_name || 'my business'}.`
  );

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-green/[0.06] blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs uppercase tracking-wider text-black font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-green" />
            <span>START YOUR PRODUCTION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight">
            LET'S CREATE <br />
            <span className="text-brand-green text-glow-green">SOMETHING IMPACTFUL.</span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg">
            Have a project, brand campaign, or digital platform in mind? Share your vision and let's craft an unforgettable digital experience.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8 luxury-card p-8 sm:p-10 rounded-3xl">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-brand-green font-extrabold">
                DIRECT INQUIRY
              </span>
              <h3 className="font-display text-2xl font-bold text-black">
                Fast Turnaround & Direct Director Involvement
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We review every brief directly. Expect a thoughtful creative proposal and timeline within 24 hours.
              </p>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3.5 pt-2">
              {/* WhatsApp Quick Chat */}
              <a
                href={`https://wa.me/${content.contact_whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/[0.06] hover:border-brand-green/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">WhatsApp Direct Chat</div>
                    <div className="text-xs text-brand-green font-bold">Immediate Response Available</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-green group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Email Direct */}
              <a
                href={`mailto:${content.contact_email}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/[0.06] hover:border-brand-green/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">Direct Email</div>
                    <div className="text-xs text-neutral-500 font-medium">{content.contact_email}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-green group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Phone Direct */}
              <a
                href={`tel:${content.contact_phone}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/[0.06] hover:border-brand-green/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">Studio Direct Line</div>
                    <div className="text-xs text-neutral-500 font-medium">{content.contact_phone}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-green group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Studio HQ Info */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 border border-black/[0.06]">
                <div className="w-11 h-11 rounded-xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-neutral-700" />
                </div>
                <div>
                  <div className="text-sm font-bold text-black">SSD Creative Studio</div>
                  <div className="text-xs text-neutral-500 font-medium">{content.contact_location}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-black/[0.06] space-y-3">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
                FOLLOW THE STUDIO
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={content.contact_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-neutral-100 border border-black/[0.06] flex items-center justify-center text-neutral-700 hover:text-black hover:border-black transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={content.contact_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-neutral-100 border border-black/[0.06] flex items-center justify-center text-neutral-700 hover:text-black hover:border-black transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href={content.contact_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-neutral-100 border border-black/[0.06] flex items-center justify-center text-neutral-700 hover:text-black hover:border-black transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={content.contact_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-neutral-100 border border-black/[0.06] flex items-center justify-center text-neutral-700 hover:text-black hover:border-black transition-all"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Submission Form */}
          <div className="lg:col-span-7 luxury-card p-8 sm:p-11 rounded-3xl">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-green/20 border border-brand-green flex items-center justify-center shadow-glow-green animate-bounce">
                  <CheckCircle className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-black">
                  Inquiry Transmitted Successfully!
                </h3>
                <p className="text-neutral-600 max-w-md text-sm leading-relaxed">
                  Thank you for reaching out to SSD Creative Studio. Your inquiry has been securely delivered to our creative team. We will review your vision and reach out shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      business_name: '',
                      contact_person: '',
                      phone: '',
                      email: '',
                      service: 'CREATIVE MEDIA',
                      description: '',
                    });
                  }}
                  className="mt-4 px-7 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-green hover:text-black transition-all cursor-pointer shadow-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-bold text-black">
                    Tell Us About Your Project
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Fill in the details below and we will prepare tailored creative directions.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Business Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Business / Brand Name *
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      required
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="e.g. Apex Global"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-black text-sm focus:outline-none focus:border-brand-green focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contact_person"
                      required
                      value={formData.contact_person}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-black text-sm focus:outline-none focus:border-brand-green focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-black text-sm focus:outline-none focus:border-brand-green focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-black text-sm focus:outline-none focus:border-brand-green focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Service Interested In */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-neutral-700">
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-black text-sm focus:outline-none focus:border-brand-green focus:bg-white transition-all cursor-pointer shadow-sm"
                  >
                    <option value="CREATIVE MEDIA">CREATIVE MEDIA (Drone, Cinema Shoots, Video Editing, Reels)</option>
                    <option value="SOCIAL MEDIA MANAGEMENT">SOCIAL MEDIA MANAGEMENT (Content Planning, Campaigns, Community)</option>
                    <option value="BRANDING & GRAPHIC DESIGN">BRANDING & GRAPHIC DESIGN (Brand Identity, Posters, Visual Systems)</option>
                    <option value="WEB & TECHNOLOGY">WEB & TECHNOLOGY (Bespoke Websites, 3D Portals, SaaS, Automations)</option>
                    <option value="FULL-SPECTRUM PARTNERSHIP">FULL-SPECTRUM CREATIVE & TECH RETAINER</option>
                  </select>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-neutral-700">
                    Project Description & Goals *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your brand vision, key milestones, target launch date, or specific deliverables..."
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-black text-sm focus:outline-none focus:border-brand-green focus:bg-white transition-all resize-none shadow-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-black text-white hover:bg-brand-green hover:text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md hover:shadow-glow-green flex items-center justify-center gap-1.5 group cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
