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
        initial={{ scale: 0.9, y: 25 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 25 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 relative"
      >
        {/* Top Header with Dark Image & Gradient Overlay */}
        <div className="relative h-52 w-full bg-[#0b171c] overflow-hidden p-6 flex items-end">
          <Image
            src="/AI_ML_Architect_Program.jfif"
            alt="TarkAI Admission Program"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b171c] via-[#0b171c]/60 to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white/90 hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            aria-label="Close popup"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo & Headline */}
          <div className="relative z-10 flex items-center gap-3.5 mb-1">
            <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-xl border border-white/40 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/Logo.png"
                alt="TarkAI Logo"
                width={42}
                height={42}
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                Wait! Don&apos;t Miss Out
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-emerald-500/50 bg-emerald-500/25 text-emerald-300 text-xs font-extrabold mt-1 shadow-2xs">
                <span>Free 3-Day Demo Seat</span>
                <span>🔥</span>
              </span>
            </div>
          </div>
        </div>

        {/* White Card Body */}
        <div className="p-6 sm:p-8 text-center bg-white">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f1c24] mb-2 tracking-tight">
            Apply for a <span className="text-[#2da5a3]">Free 3-Day Demo</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mb-7 leading-relaxed font-normal max-w-xs mx-auto">
            Experience world-class AI education before you decide. No payment, no commitment.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => { onClose(); onApply(); }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00737a] via-[#187578] to-[#2da5a3] hover:from-[#005c62] hover:to-[#00737a] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#00737a]/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Yes! Apply for Free Demo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors cursor-pointer"
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

  // Show sticky apply button after scrolling (and hide when form is visible on screen)
  useEffect(() => {
    const handleScroll = () => {
      const formEl = document.getElementById('admission-form-card');
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        const isFormVisible = rect.top < window.innerHeight - 50 && rect.bottom > 50;
        if (isFormVisible) {
          setIsScrolled(false);
          return;
        }
      }
      setIsScrolled(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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

      {/* Right-Side Vertical Floating Toolbar (Desktop Only - Hidden on Mobile) */}
      <div className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 bg-[#0f1c24] p-2 rounded-2xl shadow-2xl border border-slate-800/80 text-white">
        <a
          href="mailto:info@tarkaiedtech.com"
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#00737a] text-slate-300 hover:text-white flex items-center justify-center transition-all"
          title="Send Email"
          aria-label="Send Email"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>

        <a
          href="tel:+919712358689"
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#00737a] text-slate-300 hover:text-white flex items-center justify-center transition-all"
          title="Call Us"
          aria-label="Call Us"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 001.21-.502l4.493 1.498a1 1 0 0 1.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>

        <a
          href="https://wa.me/919712358689?text=Hi%20TarkAI!%20I%27d%20like%20to%20know%20more%20about%20admission."
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>

      {/* Sticky Mobile Apply Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm md:hidden"
          >
            <button
              onClick={onApplyNow}
              id="sticky-mobile-apply-btn"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#00737a] via-[#187578] to-[#2da5a3] hover:from-[#005c62] hover:to-[#00737a] text-white font-extrabold text-sm sm:text-base shadow-2xl shadow-[#00737a]/40 border border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center"
            >
              <span>Book Free 3-Day Demo Seat</span>
              <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
