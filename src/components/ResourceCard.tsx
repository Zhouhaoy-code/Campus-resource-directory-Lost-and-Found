import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartHandshake, BookOpen, Wrench, Globe, PhoneCall, X, Send, Calendar, Clock, MapPin, BadgeCheck, Star } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingDetail, setBookingDetail] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  // Icon mapping
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'counseling': return <HeartHandshake className="w-5 h-5 text-black" />;
      case 'library': return <BookOpen className="w-5 h-5 text-white" />;
      case 'tech': return <Wrench className="w-5 h-5 text-black" />;
      case 'service': return <Globe className="w-5 h-5 text-white" />;
      case 'community': return <PhoneCall className="w-5 h-5 text-white" />;
      default: return <Star className="w-5 h-5 text-white" />;
    }
  };

  // Persona 4 themed Color Class Mapping
  const getThemeColors = (cat: string) => {
    switch (cat) {
      case 'counseling': return { primary: 'bg-p4-yellow text-black font-extrabold', text: 'text-p4-yellow', border: 'border-p4-yellow' };
      case 'library': return { primary: 'bg-p4-orange text-white font-bold', text: 'text-p4-orange', border: 'border-p4-orange' };
      case 'tech': return { primary: 'bg-p4-cyan text-black font-extrabold', text: 'text-p4-cyan', border: 'border-p4-cyan' };
      case 'service': return { primary: 'bg-p4-magenta text-white font-bold', text: 'text-p4-magenta', border: 'border-p4-magenta' };
      case 'community': return { primary: 'bg-p4-gray text-white font-bold', text: 'text-zinc-400', border: 'border-zinc-700' };
      default: return { primary: 'bg-p4-yellow text-black font-extrabold', text: 'text-p4-yellow', border: 'border-black' };
    }
  };

  const colors = getThemeColors(resource.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName) return;
    setFormSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormSubmitted(false);
    setBookingName('');
    setBookingDetail('');
    setBookingTime('');
  };

  return (
    <>
      {/* CARD ELEMENT */}
      <motion.div
        id={`card-${resource.id}`}
        layoutId={`card-container-${resource.id}`}
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer bg-p4-card border-none text-p4-light transition-all h-full flex flex-col justify-between overflow-hidden"
        whileHover={{ 
          scale: 1.02, 
          rotate: -1.5,
          zIndex: 10
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Layered Shadow for Persona 4 pop offset alignment */}
        <div className="absolute inset-0 bg-p4-pure border-2 border-black -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
        <div className={`absolute inset-0 border-2 border-dashed ${resource.category === 'tech' ? 'border-p4-cyan' : 'border-p4-yellow'} opacity-20 group-hover:opacity-100 transition-opacity duration-300 -z-5`} />

        {/* Diagonal Ribbon Label */}
        <div className="relative">
          <div className="flex justify-between items-center bg-p4-pure p-3 border-b-2 border-black">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono uppercase text-[10px] font-bold tracking-wider clip-badge ${colors.primary} border border-black shadow-sm`}>
              {getIcon(resource.category)}
              <span className="font-sans font-bold">{resource.category}</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 group-hover:text-p4-yellow transition-colors">
              ★ DEPT ID // {resource.id.split('-')[2] || 'CODE'}
            </span>
          </div>
        </div>

        {/* Core content */}
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-bebas text-3xl md:text-4xl tracking-wide uppercase leading-tight text-white mb-2 group-hover:text-p4-yellow group-hover:translate-x-1 transition-all duration-300">
              {resource.title}
            </h3>
            {resource.subtitle && (
              <p className="text-xs uppercase font-mono text-zinc-400 mb-4 tracking-wider">
                {resource.subtitle}
              </p>
            )}
            <p className="text-sm text-zinc-300 line-clamp-3 mb-4 leading-relaxed font-sans">
              {resource.description}
            </p>
          </div>

          {/* Grid Metadata Footer */}
          <div className="border-t border-zinc-800 pt-3 mt-2 flex flex-col gap-1 text-[11px] font-mono text-zinc-450">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-p4-orange shrink-0" />
              <span className="truncate">LOC: {resource.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">HRS: {resource.hours}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Stylized Bottom Bar */}
        <div className="bg-p4-pure p-2 text-center border-t-2 border-black group-hover:bg-p4-yellow transition-all">
          <span className="font-bebas text-lg tracking-wider text-p4-light group-hover:text-black uppercase flex items-center justify-center gap-2">
            ★ {resource.actionLabel} ★
          </span>
        </div>
      </motion.div>

      {/* EXPANDED INTERACTIVE DETAILED DIALOG MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop with extreme stylized radial blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body with Diagonal Cuts / Slanted Overlaps */}
            <motion.div
              initial={{ scale: 0.9, rotate: -3, y: 50, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, rotate: 3, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative w-full max-w-4xl bg-p4-dark border-4 border-black text-p4-light rounded-none shadow-p4-black overflow-hidden z-20 flex flex-col lg:flex-row my-8"
              id={`modal-${resource.id}`}
            >
              {/* Halftone / Dynamic left panel */}
              <div className="lg:w-2/5 bg-p4-dark p-6 relative overflow-hidden border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-between bg-dots">
                {/* Visual highlights */}
                <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-8 rotate-45 w-40 h-12 bg-rainbow-stripes" />
                
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`p-2 inline-block ${colors.primary} border-2 border-black`}>
                      {getIcon(resource.category)}
                    </span>
                    <span className="font-bebas text-2xl tracking-widest text-white uppercase">{resource.category}</span>
                  </div>

                  <h2 className="font-bebas text-5xl md:text-6xl text-white uppercase leading-none tracking-tight mb-2 select-none">
                    {resource.title}
                  </h2>
                  <p className="text-p4-yellow font-mono uppercase text-xs tracking-widest mb-6 font-bold">
                    ★ OFFICIAL DIRECTORY INFO ★
                  </p>

                  <div className="space-y-4 font-sans text-sm text-zinc-300">
                    <div className="border-l-4 border-p4-yellow pl-3 py-1 bg-zinc-900/85">
                      <p className="text-[10px] font-mono uppercase text-zinc-500">LEAD DIRECTOR</p>
                      <p className="font-bold text-white pr-2">{resource.lead}</p>
                    </div>

                    <div className="border-l-4 border-white pl-3 py-1 bg-zinc-900/85">
                      <p className="text-[10px] font-mono uppercase text-zinc-500">HEADQUARTERS</p>
                      <p className="font-bold text-white pr-2">{resource.location}</p>
                    </div>

                    <div className="border-l-4 border-p4-orange pl-3 py-1 bg-zinc-900/85">
                      <p className="text-[10px] font-mono uppercase text-zinc-500">ACTIVE TIMINGS</p>
                      <p className="font-bold text-white">{resource.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Advisors Advisory Tip Box */}
                {resource.p5Quote && (
                  <div className="mt-8 relative bg-p4-yellow p-4 border-2 border-black clip-sharp transform rotate-[-2deg] shadow-p4-black">
                    <div className="absolute -top-3 left-4 bg-black text-p4-yellow border border-black text-[9px] px-2 font-mono uppercase">
                      CAMPUS ADVISOR NOTE
                    </div>
                    <p className="text-xs text-black font-extrabold italic leading-relaxed">
                      {resource.p5Quote}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Form / Key Services Panel */}
              <div className="lg:w-3/5 p-6 md:p-8 flex flex-col justify-between bg-zinc-950">
                {/* Close Button with slants */}
                <button
                  id={`close-btn-${resource.id}`}
                  onClick={handleClose}
                  className="absolute top-4 right-4 bg-p4-yellow hover:bg-p4-orange text-black p-1.5 transition-colors border-2 border-black font-bold"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 stroke-[3px]" />
                </button>

                <div className="mb-6">
                  <h3 className="font-bebas text-3xl text-p4-yellow uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
                    ★ Key Support Actions ★
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                    {resource.description}
                  </p>

                  <div className="space-y-2 mb-8">
                    <p className="text-xs font-mono uppercase text-p4-yellow font-bold">Services Offered:</p>
                    {resource.keyServices.map((service, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm bg-neutral-900 px-3 py-2 border-l-2 border-p4-yellow hover:border-p4-orange hover:bg-neutral-800 transition-colors duration-150">
                        <span className="text-p4-yellow font-bold select-none">★</span>
                        <span className="text-zinc-200">{service}</span>
                      </div>
                    ))}
                  </div>

                  {/* Immediate Contact Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {resource.contactInfo.email && (
                      <div className="bg-black p-3 border-2 border-zinc-800 flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">OFFICIAL EMAIL</span>
                        <a href={`mailto:${resource.contactInfo.email}`} className="text-xs font-mono text-p4-orange hover:underline break-all mt-1">
                          {resource.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {resource.contactInfo.phone && (
                      <div className="bg-black p-3 border-2 border-zinc-800 flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">DIRECT DIAL</span>
                        <a href={`tel:${resource.contactInfo.phone}`} className="text-xs font-mono text-white hover:underline mt-1">
                          {resource.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {resource.contactInfo.wechat && (
                      <div className="bg-black p-3 border-2 border-zinc-800 flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">WECHAT CHANNEL</span>
                        <span className="text-xs font-mono text-p4-yellow font-bold mt-1">
                          {resource.contactInfo.wechat}
                        </span>
                      </div>
                    )}
                    {resource.contactInfo.website && (
                      <div className="bg-black p-3 border-2 border-zinc-800 flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">OFFICIAL WEBSITE</span>
                        <a href={resource.contactInfo.website} target="_blank" rel="noreferrer" className="text-xs font-mono text-p4-cyan hover:underline mt-1 truncate">
                          {resource.contactInfo.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* INTERACTIVE COMPONENT BOOKING FORM */}
                <div className="bg-black p-4 border-2 border-black relative">
                  <div className="absolute -top-3 transform skew-x-[-10deg] left-4 bg-p4-yellow text-black text-[10px] px-3 font-mono font-black uppercase tracking-widest border border-black py-0.5 shadow-sm">
                    BOOK APPOINTMENT / SUBMIT INQUIRY
                  </div>

                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-3 mt-2"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-zinc-450 mb-1">Your Full Name</label>
                            <input
                              type="text"
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              required
                              placeholder="e.g. Liam Wong"
                              className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-p4-yellow p-2 text-xs text-white uppercase outline-none font-sans"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-zinc-450 mb-1">Preferred Time / Period</label>
                            <input
                              type="text"
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              placeholder="e.g. After School Session"
                              className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-p4-yellow p-2 text-xs text-white uppercase outline-none font-sans"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-450 mb-1">Brief Description of Need / Inquiry</label>
                          <textarea
                            rows={2}
                            value={bookingDetail}
                            onChange={(e) => setBookingDetail(e.target.value)}
                            placeholder="e.g. Inquiring regarding exam stress relief materials..."
                            className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-p4-yellow p-2 text-xs text-white outline-none resize-none font-sans"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-p4-yellow text-black hover:bg-p4-orange hover:text-black py-2.5 px-4 font-bebas text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-2 border-2 border-black clip-sharp"
                        >
                          <Send className="w-4 h-4 shrink-0" />
                          CONFIRM INQUIRY REQUEST
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-6 flex flex-col items-center gap-3 bg-neutral-900 border border-dashed border-p4-yellow/50 clip-slant-right"
                      >
                        <div className="bg-p4-yellow text-black rounded-none p-2 border-2 border-black animate-bounce shadow-sm">
                          <BadgeCheck className="w-8 h-8" />
                        </div>
                        <h4 className="font-bebas text-3xl text-p4-yellow tracking-widest uppercase font-stroke-black">
                          ★ INQUIRY RECEIVED SUCCESSFULLY ★
                        </h4>
                        <div className="max-w-md px-4">
                          <p className="text-xs uppercase text-zinc-400 font-mono mb-2">
                            Reservation Secured for: <span className="text-white font-bold">{bookingName}</span>
                          </p>
                          <p className="text-xs text-white leading-relaxed font-sans font-medium">
                            Your reservation information has reached our system. WAB HS staff will reach out to you within standard school sessions.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="mt-2 text-[10px] uppercase font-mono tracking-widest text-p4-yellow border border-p4-yellow/30 px-3 py-1 hover:bg-p4-yellow hover:text-black transition-colors pointer-events-auto"
                        >
                          Request Another Booking
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
