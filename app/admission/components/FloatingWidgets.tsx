'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingWidgetsProps {
  onApplyNow: () => void;
}

function ExitIntentPopup({ onClose, onApply }: { onClose: () => void; onApply: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20"
      >
        {/* Header with real admission image & logo */}
        <div className="relative h-52 w-full bg-brand-darkest overflow-hidden">
          <Image
            src="/AI_ML_Architect_Program.jfif"
            alt="TARK AI Admission Program"
            fill
            className="object-cover object-[center_10%] opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest via-brand-darkest/55 to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-black/90 hover:text-white transition-all shadow-md"
            aria-label="Close popup"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header text + logo badge */}
          <div className="absolute bottom-5 left-6 right-6 z-10 flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-2xl border border-white/50 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/Logo.png"
                alt="TARK AI Logo"
                width={42}
                height={42}
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                Wait! Don&apos;t Miss Out
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-xs font-bold mt-1 shadow-sm">
                <span>Free 3-Day Demo Seat</span>
                <span>🔥</span>
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 text-center bg-white">
          <p className="text-brand-darkest font-black text-2xl mb-2 tracking-tight">
            Apply for a <span className="text-brand-accent">Free 3-Day Demo</span>
          </p>
          <p className="text-slate-600 text-sm mb-7 leading-relaxed font-medium max-w-xs mx-auto">
            Experience world-class AI education before you decide. No payment, no commitment.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => { onClose(); onApply(); }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-[#186474] to-brand-dark text-white font-black text-base shadow-xl shadow-brand-accent/30 hover:shadow-brand-accent/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
            >
              <span>Yes! Apply for Free Demo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-slate-400 hover:text-slate-700 text-xs font-semibold transition-colors"
            >
              No thanks, I&apos;ll miss this opportunity
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingWidgets({ onApplyNow }: FloatingWidgetsProps) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Show sticky apply button after scrolling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !hasShownExit) {
        setShowExitIntent(true);
        setHasShownExit(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExit]);

  return (
    <>
      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <ExitIntentPopup
            onClose={() => setShowExitIntent(false)}
            onApply={() => { setShowExitIntent(false); onApplyNow(); }}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20know%20more%20about%20admission."
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-float-btn"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        className={`
          fixed right-6 z-50 w-14 h-14 rounded-full bg-green-500 shadow-2xl shadow-green-500/40
          flex items-center justify-center text-white hover:bg-green-400 hover:scale-110
          transition-all duration-300
          ${isScrolled ? 'bottom-20 md:bottom-6' : 'bottom-6'}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        {/* Ping animation */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-white text-[8px] font-bold flex items-center justify-center animate-bounce">1</span>
      </motion.a>

      {/* Call Button (above WhatsApp) */}
      <motion.a
        href="tel:+919712358689"
        id="call-float-btn"
        aria-label="Call TARK AI"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: 'spring' }}
        className={`
          fixed right-6 z-50 w-12 h-12 rounded-full bg-brand-accent shadow-xl shadow-brand-accent/30
          flex items-center justify-center text-white hover:bg-brand-dark hover:scale-110
          transition-all duration-300
          ${isScrolled ? 'bottom-36 md:bottom-24' : 'bottom-24'}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </motion.a>

      {/* Sticky Apply Now bar — mobile floating pill */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-4 left-4 right-4 z-40 md:hidden pointer-events-none"
          >
            <button
              onClick={onApplyNow}
              id="sticky-mobile-apply-btn"
              className="pointer-events-auto w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-accent via-[#186474] to-brand-dark text-white font-black text-sm sm:text-base shadow-2xl shadow-brand-accent/40 border border-white/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Apply for Free 3-Day Demo</span>
              <span className="text-base">🔥</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
