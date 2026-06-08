import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, UserCheck, Shield, GraduationCap, Compass, HelpCircle, HeartHandshake, Eye, BookOpen, Layers } from 'lucide-react';
import P5Background from './components/P5Background';
import ResourceCard from './components/ResourceCard';
import CallingCardEmergency from './components/CallingCardEmergency';
import LostFoundSection from './components/LostFoundSection';
import { presetResources } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'lost_found'>('directory');
  const [studentQuoteIdx, setStudentQuoteIdx] = useState(0);

  // Cool custom quotes reflecting student happiness and connectivity
  const studentQuotes = [
    '“A diverse campus thrives on collaboration. Keep your belongings secured and your heart open!” — Grade 12 Advisor',
    '“Found my lost Math calculator in Room H304 in just 10 minutes. This portal is absolute magic!” — Emily W. (Grade 10)',
    '“If you are feeling overwhelmed by classes or IB deadlines, Counselor Sarah has the ultimate dialogue tree.” — Anon Tiger',
    '“Service CAS groups meet every Tuesday in the Global citizens lounge. Join the alliance today!” — CAS Liaison'
  ];

  const rotateQuote = () => {
    setStudentQuoteIdx((prev) => (prev + 1) % studentQuotes.length);
  };

  return (
    <div className="relative min-h-screen pb-20 overflow-x-hidden">
      {/* 1. ANIMATED CANVAS BACKGROUND */}
      <P5Background />

      {/* 2. TOP EDGE STYLIZED BANNER / TAPE DECORATION */}
      <div className="bg-danger-stripes h-4 w-full border-b-2 border-black select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* 3. HERO CORNER STYLIZED LOGO & CHRONO MODULE */}
        <header className="relative flex flex-col lg:flex-row items-stretch justify-between gap-6 mb-8 mt-4">
          
          {/* Main Visual Title Header */}
          <div className="relative bg-p4-yellow border-4 border-black p-6 md:p-8 flex-grow clip-slant-right shadow-p4-black text-black">
            {/* Corner Decorative Badge */}
            <div className="absolute top-0 right-0 bg-black text-p4-yellow text-[10px] font-mono font-bold px-4 py-1 uppercase tracking-widest border-l-2 border-b-2 border-black select-none">
              ★ WAB PORTAL INDEX ★
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 border-2 border-p4-yellow rotate-[-4deg] animate-pulse-star select-none shrink-0">
                <GraduationCap className="w-8 h-8 text-p4-yellow stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-black px-2 py-0.5 text-p4-yellow font-bold uppercase tracking-wider">
                    Beijing WAB Academy
                  </span>
                  <span className="text-[10px] font-mono text-black font-extrabold uppercase">
                    ★ DIRECTORY & RECOVERY
                  </span>
                </div>
                <h1 className="font-bebas text-5xl md:text-6xl text-black tracking-widest uppercase leading-none mt-1 select-none font-stroke-black">
                  WAB CAMPUS <span className="text-p4-magenta">RECOVERY</span> & RESOURCE HUB
                </h1>
              </div>
            </div>

            <p className="text-xs text-black/85 mt-4 leading-relaxed font-sans max-w-3xl font-medium">
              Welcome to the centralized community directory for the Western Academy of Beijing. 
              Designed with a vibrant high-contrast retro yellow aesthetic, this mobile-friendly platform connects students to counselors, tech support, library resources, CAS initiatives, and a lost-and-found registry.
            </p>

            {/* Retro P4 Pop Stripe Accents */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-rainbow-stripes" />
          </div>

          {/* Right Floating Character Dialogue Status Box - Styled as a retro TV set */}
          <div className="lg:w-80 bg-p4-gray border-4 border-black p-5 relative overflow-hidden flex flex-col justify-between clip-slant-left shadow-p4-black text-white">
            <div className="absolute inset-0 bg-scanlines opacity-25 pointer-events-none" />
            <div className="absolute -right-6 -bottom-6 text-p4-yellow opacity-10 text-9xl font-extrabold select-none">
              ★
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between text-xs font-mono text-p4-yellow font-extrabold mb-2 border-b border-zinc-700 pb-1.5">
                <span>WAB CAMPUS STATUS</span>
                <span className="text-p4-magenta animate-pulse">● ONLINE</span>
              </div>

              <div className="space-y-1.5 text-zinc-200 font-bold text-xs font-sans">
                <div className="flex justify-between items-center">
                  <span>Student Safety Index:</span>
                  <span className="font-mono text-black text-[11px] bg-p4-yellow px-1.5 font-black">100% SECURE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Support Desks:</span>
                  <span className="font-mono text-black text-[11px] bg-p4-cyan px-1.5 font-black">5 DEPARTMENTS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Match Algorithm:</span>
                  <span className="font-mono text-white text-[11px] bg-p4-magenta px-1.5 font-black">★ ACTIVE READY</span>
                </div>
              </div>
            </div>

            {/* Micro quote carousel - styled as yellow speaker card */}
            <div 
              onClick={rotateQuote}
              className="mt-4 bg-p4-yellow text-black p-2.5 border-2 border-black cursor-pointer hover:bg-p4-yellow-pale transition-colors select-none text-[10px] leading-relaxed font-sans font-bold shadow-p4-black"
            >
              <p className="line-clamp-3">{studentQuotes[studentQuoteIdx]}</p>
              <div className="text-right text-[8px] font-mono text-p4-magenta mt-1 uppercase font-black">
                CLICK TO ROTATE CAMPUS QUOTES
              </div>
            </div>
          </div>

        </header>

        {/* 4. EMERGENCY CALLING TICKER (Always on top for seamless onboarding access) */}
        <CallingCardEmergency />

        {/* 5. HIGH CONTRAST TAB SELECTION SYSTEM (Persona 4 TV Block Cut out style) */}
        <section className="relative mt-8 select-none">
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-stretch">
            
            {/* Tab 1: Directory */}
            <button
              id="tab-btn-directory"
              onClick={() => setActiveTab('directory')}
              className={`relative py-4 px-8 font-bebas text-2xl tracking-widest uppercase transition-all duration-200 cursor-pointer text-center flex-1 sm:flex-none flex items-center justify-center gap-2 ${
                activeTab === 'directory'
                  ? 'bg-p4-yellow text-black font-extrabold border-4 border-black shadow-p4-black transform -rotate-1 -translate-y-1'
                  : 'bg-p4-card text-zinc-400 hover:text-white border-2 border-zinc-800 hover:border-p4-yellow hover:shadow-p4-glow'
              }`}
            >
              <Compass className={`w-5 h-5 ${activeTab === 'directory' ? 'text-black shrink-0' : 'text-zinc-500 shrink-0'}`} />
              ★ CAMPUS RESOURCE DIRECTORY ★
            </button>

            {/* Tab 2: Lost & Found */}
            <button
              id="tab-btn-lostfound"
              onClick={() => setActiveTab('lost_found')}
              className={`relative py-4 px-8 font-bebas text-2xl tracking-widest uppercase transition-all duration-200 cursor-pointer text-center flex-1 sm:flex-none flex items-center justify-center gap-2 ${
                activeTab === 'lost_found'
                  ? 'bg-p4-yellow text-black font-extrabold border-4 border-black shadow-p4-black transform rotate-1 -translate-y-1'
                  : 'bg-p4-card text-zinc-400 hover:text-white border-2 border-zinc-800 hover:border-p4-yellow hover:shadow-p4-glow'
              }`}
            >
              <Layers className={`w-5 h-5 ${activeTab === 'lost_found' ? 'text-p4-magenta shrink-0 animate-bounce' : 'text-zinc-500 shrink-0'}`} />
              ☆ STUDENT LOST & FOUND bulletins ☆
            </button>

          </div>
        </section>

        {/* 6. TAB CONTENT GRID */}
        <main className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === 'directory' ? (
              <motion.div
                key="directory-tab"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Visual Header */}
                <div className="flex items-center gap-3 border-b-2 border-zinc-800 pb-3 mb-6 select-none">
                  <div className="p-1 px-3.5 bg-p4-yellow text-black text-xs font-mono font-extrabold clip-badge rotate-[-2deg] border border-black">
                    ★ DEPARTMENTS ACTIVE ★
                  </div>
                  <h2 className="font-bebas text-3xl uppercase tracking-wider text-white">
                    Centralized Alliance Resources
                  </h2>
                </div>

                <p className="text-sm text-zinc-400 max-w-4xl font-sans mb-8 leading-relaxed">
                  Click on any service card below to summon detailed dossiers. 
                  Each hub block provides immediate hotlines, location tracking, and an interactive booking system to secure physical assistance.
                </p>

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {presetResources.map((resource) => (
                    <div key={resource.id}>
                      <ResourceCard resource={resource} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lost-found-tab"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <LostFoundSection />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* 7. VISUALLY IMPRESSIVE FOOTER */}
        <footer className="mt-20 border-t-4 border-black pt-8 select-none text-center relative overflow-hidden bg-p4-pure py-8 px-4">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-dots opacity-10" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-rainbow-stripes" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-3 pt-3">
            <h4 className="font-bebas text-3xl text-p4-yellow tracking-widest uppercase font-stroke-black">
              ★ BEIJING WAB COMMUNITY SHIELD ★
            </h4>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
              Western Academy of Beijing. This platform operates independently in service of high school onboarding convenience, seamless property recovery and digital happiness.
            </p>
            <div className="flex justify-center gap-4 text-xs font-mono text-p4-orange font-extrabold">
              <span>★ SYSTEM SECURITY VERIFIED ★</span>
              <span>☆ DIRECTORY RESOLUTION ☆</span>
            </div>
            <p className="text-[10px] text-zinc-600 font-mono pt-4 border-t border-zinc-900">
              © {new Date().getFullYear()} WAB Directory Portal. Styled with retro yellow pop aesthetic.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
