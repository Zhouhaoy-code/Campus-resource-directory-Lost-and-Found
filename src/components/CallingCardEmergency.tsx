import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Phone, Zap, HeartPulse, Bus, Sparkles } from 'lucide-react';

export default function CallingCardEmergency() {
  const emerContacts = [
    { label: 'CAMPUS CLINIC', number: '+86 (10) 8456-4155 ext. 100', icon: <HeartPulse className="w-4 h-4 text-p4-yellow" /> },
    { label: 'BUS TRANSIT UNIT', number: '+86 (10) 8456-4155 ext. 200', icon: <Bus className="w-4 h-4 text-p4-cyan" /> },
    { label: 'HS CORE OFFICE', number: '+86 (10) 8456-4155 ext. 331', icon: <ShieldCheck className="w-4 h-4 text-p4-magenta" /> },
  ];

  return (
    <div className="relative overflow-hidden border-4 border-black bg-p4-dark shadow-p4-black transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300 md:my-4 select-none">
      {/* Yellow warning bar */}
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-danger-stripes" />
      <div className="absolute top-0 bottom-0 right-0 w-4 bg-danger-stripes" />

      <div className="p-4 px-6 md:px-10 flex flex-col xl:flex-row items-center justify-between gap-4">
        {/* Calling Card Left branding */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-p4-yellow text-black font-extrabold font-bebas text-lg px-4.5 py-1.5 border border-black uppercase tracking-widest clip-slant-left transform rotate-[-2deg]">
            ★ BROADCAST HOTLINES ★
          </div>
          <div className="text-left">
            <h4 className="font-bebas text-xl md:text-2xl text-white tracking-widest leading-none uppercase">
              HIGH-STRESS EMERGENCY CALLING CARD
            </h4>
            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mt-1">
              Centralized quick dial ports for diverse community onboarding
            </p>
          </div>
        </div>

        {/* Animated slide for emergency contacts lists */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4 flex-grow max-w-5xl">
          {emerContacts.map((contact, idx) => (
            <motion.a
              key={idx}
              href={`tel:${contact.number}`}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-zinc-950 hover:bg-p4-yellow text-zinc-300 hover:text-black p-2.5 border-2 border-zinc-800 hover:border-black flex items-center gap-2.5 transition-all text-xs font-mono group"
            >
              <div className="p-1 bg-black border border-zinc-700 select-none shrink-0 group-hover:bg-black">
                {contact.icon}
              </div>
              <div className="text-left min-w-[120px] md:min-w-[150px]">
                <p className="text-[8px] font-mono text-zinc-500 uppercase group-hover:text-black/80">{contact.label}</p>
                <p className="font-bold text-[11px] text-white group-hover:text-black tracking-tight">{contact.number}</p>
              </div>
              <div className="p-1 bg-neutral-900 border border-zinc-800 text-p4-yellow text-[9px] font-bold group-hover:bg-black group-hover:text-p4-yellow uppercase">
                DIAL
              </div>
            </motion.a>
          ))}
        </div>

        {/* Dynamic mini graphic notifier */}
        <div className="hidden xl:flex items-center gap-1.5 text-right font-mono text-[10px] text-p4-yellow">
          <Sparkles className="w-4 h-4 text-p4-yellow animate-spin" />
          <div>
            <p className="font-extrabold text-p4-yellow">WAB SECURITY INDEX</p>
            <p className="text-white">STATUS: EXTREME SHIELD</p>
          </div>
        </div>

      </div>
    </div>
  );
}
