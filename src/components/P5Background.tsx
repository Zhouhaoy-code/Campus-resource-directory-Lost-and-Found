import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function P5Background() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate offset to -30 to 30 for spring parallax
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-p4-dark select-none pointer-events-none">
      {/* Base Dark/Checkered P4 grid layout */}
      <div className="absolute inset-0 bg-checkers opacity-30" />
      <div className="absolute inset-0 bg-dots opacity-45" />

      {/* Retro TV Scanline Filter overlay for simulated CRT television screen */}
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-10" />

      {/* Giant Diagonal Vibrant Pop Rainbow Stripe Bands (Very classic P4) */}
      <motion.div 
        className="absolute -left-20 -top-40 w-[180%] h-[12px] bg-rainbow-stripes origin-top-left transform rotate-[-12deg]"
        animate={{
          y: [0, 4, 0],
          x: mousePos.x * 0.2,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -left-10 -top-20 w-[180%] h-[8px] bg-rainbow-stripes origin-top-left transform rotate-[-12deg] opacity-60"
        animate={{
          y: [0, -6, 0],
          x: mousePos.x * -0.1,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Retro TV Broadcast Graphic Accent Panels (Yellow high-heat spotlight) */}
      <motion.div 
        className="absolute right-[-10%] top-[10%] w-[50vw] h-[50vw] rounded-full bg-p4-yellow/10 blur-[140px]"
        animate={{
          scale: [1, 1.15, 1],
          x: mousePos.x * 0.3,
          y: mousePos.y * 0.3,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute left-[-5%] bottom-[5%] w-[40vw] h-[40vw] rounded-full bg-p4-orange/10 blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          x: mousePos.x * -0.2,
          y: mousePos.y * -0.2,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Concentric Double Circles & Pop Retro elements */}
      <div className="absolute inset-0 opacity-40">
        
        {/* Double concentric circle 1 */}
        <motion.div
          className="absolute left-[10%] top-[45%] w-32 h-32 rounded-full border-4 border-p4-yellow border-double flex items-center justify-center"
          animate={{
            rotate: [0, 360],
            scale: [0.95, 1.05, 0.95],
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5,
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-p4-orange" />
        </motion.div>

        {/* Double concentric circle 2 - Magenta/Yellow pop */}
        <motion.div
          className="absolute right-[15%] bottom-[30%] w-48 h-48 rounded-full border-2 border-p4-cyan/70 flex items-center justify-center"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.1, 1],
            x: mousePos.x * -0.4,
            y: mousePos.y * -0.4,
          }}
          transition={{
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            scale: { duration: 9, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-36 h-36 rounded-full border-4 border-p4-yellow/80 border-double flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-dashed border-p4-magenta/75" />
          </div>
        </motion.div>

        {/* Dynamic Star Elements (P4 styles include stars inside bold hollow circles) */}
        <motion.div 
          className="absolute left-[20%] top-[15%] text-p4-yellow font-bold text-5xl drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.18, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ★
        </motion.div>

        <motion.div 
          className="absolute right-[8%] top-[25%] text-p4-orange font-bold text-7xl opacity-80"
          animate={{
            rotate: [180, -180],
            scale: [0.9, 1.1, 0.9],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ☆
        </motion.div>

        <motion.div 
          className="absolute left-[45%] bottom-[15%] text-p4-cyan font-bold text-4xl"
          animate={{
            scale: [0.8, 1.25, 0.8],
            rotate: [0, 360],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ★
        </motion.div>

        <motion.div 
          className="absolute right-[40%] top-[40%] text-p4-magenta font-bold text-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [-15, 15, -15],
            x: [0, 12, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ☆
        </motion.div>
      </div>
    </div>
  );
}
