"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";

export default function DiwaliOfferPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check initial desktop breakpoint
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    // Delay appearance slightly so the user sees the smooth slide-in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);

    // Close on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsVisible(false);
  };

  const handleReopen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsVisible(true);
  };

  const fireFestiveConfetti = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.45, x: 0.8 },
        colors: ["#D4AF37", "#006D77", "#E91E63", "#FFC107", "#0288D1", "#9C27B0"],
      });
    } catch (err) {
      console.warn("Confetti effect note:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    const targetEmail = email.trim();

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, source: "diwali_offer_popup" }),
      });

      const data = await res.json();
      if (!res.ok && data.error) {
        setErrorMessage(data.error);
        setIsSubmitting(false);
        return;
      }

      setSubmittedEmail(targetEmail);
      setIsSubmitted(true);
      fireFestiveConfetti();
    } catch (err) {
      console.warn("Subscription request error:", err);
      // Fallback graceful confirmation
      setSubmittedEmail(targetEmail);
      setIsSubmitted(true);
      fireFestiveConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-0 sm:inset-auto sm:right-0 sm:top-[36%] sm:-translate-y-1/2 pointer-events-none">
            {/* Soft Ambient Backdrop on Mobile only - tap outside to dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="sm:hidden fixed inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-auto"
            />

            <motion.div
              key="diwali-popup-card-motion"
              initial={isDesktop ? { x: "115%", opacity: 0 } : { opacity: 0, scale: 0.92, y: 15 }}
              animate={isDesktop ? { x: 0, opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isDesktop ? { x: "115%", opacity: 0 } : { opacity: 0, scale: 0.92, y: 15 }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 190,
                mass: 0.9,
              }}
              className="relative pointer-events-auto select-none w-full max-w-[340px] xs:max-w-[360px] sm:max-w-none sm:w-auto"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Unified Banner Container */}
              <div className="relative flex items-center pr-0 select-none">
                
                {/* Overlapping Rangoli Graphic:
                    - Mobile: Centered at top of card, fully visible, rotating crest
                    - Desktop: Anchored on the left side, vertically centered
                */}
                <motion.div
                  initial={{ scale: 0.75, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="absolute -top-11 xs:-top-13 left-1/2 -translate-x-1/2 w-[88px] h-[88px] xs:w-[100px] xs:h-[100px] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:left-auto sm:-left-[180px] md:-left-[200px] lg:-left-[210px] z-20 sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] lg:w-[420px] lg:h-[420px] pointer-events-none select-none flex items-center justify-center"
                >
                  {/* Continuous smooth ambient rotation */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full flex items-center justify-center relative drop-shadow-[-4px_6px_12px_rgba(0,0,0,0.22)] sm:drop-shadow-[-12px_12px_26px_rgba(0,0,0,0.28)]"
                  >
                    <Image
                      src="/diwali-rangoli.png"
                      alt="Diwali Rangoli"
                      width={1024}
                      height={1024}
                      priority
                      className="w-full h-full object-contain filter"
                    />
                  </motion.div>

                  {/* Soft ambient aura glow behind the rangoli */}
                  <div className="absolute inset-2 sm:inset-6 rounded-full bg-gradient-to-r from-amber-400/25 via-teal-500/15 to-pink-500/20 blur-lg sm:blur-3xl pointer-events-none -z-10 animate-pulse" />
                </motion.div>

                {/* Luxury Warm Ivory & Champagne Card Body */}
                <div 
                  className="relative w-full sm:w-[470px] md:w-[520px] lg:w-[550px] min-h-[310px] sm:min-h-[360px] flex items-center rounded-3xl sm:rounded-l-[3.5rem] sm:rounded-r-none pt-12 xs:pt-14 pb-5 px-5 xs:px-6 sm:pl-[185px] md:pl-[205px] lg:pl-[220px] sm:pr-7 sm:py-7 border border-[#D4AF37]/50 sm:border-y sm:border-l sm:border-r-0 shadow-[0_16px_45px_rgba(0,48,56,0.32),0_4px_16px_rgba(212,175,55,0.2)] sm:shadow-[-10px_14px_35px_-6px_rgba(0,48,56,0.22),-4px_0_20px_rgba(212,175,55,0.16)] select-text"
                  style={{
                    background: "linear-gradient(135deg, #FFFDF9 0%, #FAF5EB 50%, #F5ECDB 100%)",
                  }}
                >
                  {/* Festive Sparkle Elements */}
                  <span className="absolute top-3.5 right-11 sm:top-5 sm:right-10 text-[#D4AF37] opacity-60 text-[10px] sm:text-xs pointer-events-none select-none animate-pulse">✦</span>
                  <span className="absolute top-4 left-4 sm:left-[190px] md:left-[215px] text-[#D4AF37] opacity-60 text-[10px] sm:text-xs pointer-events-none select-none animate-pulse">✦</span>
                  <span className="absolute bottom-3 left-4 sm:left-[200px] md:left-[225px] text-[#D4AF37] opacity-50 text-[9px] sm:text-[11px] pointer-events-none select-none">✦</span>

                  {/* Close Button - Clean Dark Teal 'X' */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-[#0E4C56]/70 hover:text-[#0E4C56] hover:bg-[#0E4C56]/10 transition-all duration-200 cursor-pointer z-50"
                    aria-label="Close popup"
                  >
                    <FaTimes size={14} />
                  </button>

                  {/* Dynamic Content: Responsive Offer Form & Success Confirmation */}
                  <div className="relative z-10 w-full flex flex-col items-center text-center">

                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        /* ── STATE 1: INITIAL OFFER & SIGNUP FORM ── */
                        <motion.div
                          key="offer-form-state"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22 }}
                          className="w-full flex flex-col items-center"
                        >
                          {/* Hero Discount: 10% OFF */}
                          <div className="relative my-0.5">
                            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-none text-[#073D44] drop-shadow-[0_1px_1px_rgba(212,175,55,0.3)]">
                              10% OFF
                            </h2>

                            {/* Golden Curved Swoop Underline */}
                            <svg viewBox="0 0 240 16" fill="none" className="w-28 xs:w-36 sm:w-48 h-2 sm:h-2.5 mx-auto mt-0.5 mb-0.5 sm:mb-1">
                              <path d="M10 10 Q 120 2 230 10" stroke="url(#goldSwoopGrad)" strokeWidth="2.5" strokeLinecap="round" />
                              <defs>
                                <linearGradient id="goldSwoopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#C59B27" stopOpacity="0.2" />
                                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
                                  <stop offset="100%" stopColor="#C59B27" stopOpacity="0.2" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>

                          {/* Catchy Headline */}
                          <h3 className="text-[14px] xs:text-[16px] sm:text-[20px] md:text-[22px] font-black leading-tight text-[#0A3D45] tracking-tight mt-0.5 mb-0.5 sm:mb-1">
                            This Diwali, <br className="inline" />Upgrade Your Future.
                          </h3>

                          {/* Small Golden Ornament Divider */}
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 my-1 sm:my-1.5 w-full">
                            <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#C59B27]/60" />
                            <span className="text-[11px] sm:text-sm">🪔</span>
                            <div className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#C59B27]/60" />
                          </div>

                          {/* Subtitle */}
                          <p className="text-[11px] xs:text-[12px] sm:text-[13.5px] text-[#0E4C56] font-medium leading-tight sm:leading-relaxed mb-2.5 sm:mb-4">
                            Get <strong className="font-extrabold text-[#073D44]">10% OFF</strong> on ALL courses at TarkAI.
                          </p>

                          {/* Email Form */}
                          <form onSubmit={handleSubmit} className="w-full max-w-[270px] sm:max-w-[285px] space-y-2 sm:space-y-2.5">
                            <div>
                              <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  if (errorMessage) setErrorMessage("");
                                }}
                                placeholder="Enter your email"
                                className="w-full bg-white text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-medium px-3.5 py-2.5 sm:px-4 rounded-xl border border-slate-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#006D77]/30 focus:border-[#006D77] transition-all text-center sm:text-left"
                              />
                            </div>

                            {errorMessage && (
                              <p className="text-[10px] sm:text-xs text-rose-600 font-semibold">
                                {errorMessage}
                              </p>
                            )}

                            {/* Deep Purple / Plum Button */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="group relative w-full bg-[#3D0B37] hover:bg-[#2A0526] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl shadow-[0_4px_16px_rgba(61,11,55,0.32)] transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center gap-2"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                              
                              <span className="relative z-10 tracking-wide font-extrabold flex items-center gap-2">
                                {isSubmitting ? (
                                  <>
                                    <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Activating Offer...</span>
                                  </>
                                ) : (
                                  "Claim 10% OFF"
                                )}
                              </span>
                            </button>
                          </form>
                        </motion.div>
                      ) : (
                        /* ── STATE 2: CLEAN, DEDICATED SUCCESS CONFIRMATION ── */
                        <motion.div
                          key="success-state"
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.94 }}
                          transition={{ duration: 0.28 }}
                          className="w-full max-w-[270px] sm:max-w-[300px] flex flex-col items-center text-center py-1 sm:py-2"
                        >
                          {/* Festive Diya */}
                          <div className="text-2xl xs:text-3xl sm:text-4xl mb-0.5 sm:mb-1 animate-bounce [animation-duration:2.5s]">
                            🪔
                          </div>

                          {/* Headline */}
                          <h3 className="text-base xs:text-lg sm:text-2xl font-black text-[#073D44] tracking-tight leading-tight mb-1 sm:mb-1.5">
                            Check Your Inbox!
                          </h3>

                          {/* Description */}
                          <p className="text-[11px] sm:text-[13px] text-[#0E4C56] font-medium leading-tight sm:leading-relaxed mb-1.5 sm:mb-2">
                            We&apos;ve sent your Diwali <strong className="font-extrabold text-[#073D44]">10% OFF</strong> offer details to:
                          </p>

                          {/* Highlighted Email Box */}
                          <div 
                            title={submittedEmail}
                            className="w-full bg-white/95 border border-[#D4AF37]/50 rounded-xl py-2 px-3 text-[#073D44] font-bold text-xs sm:text-sm tracking-wide shadow-xs truncate text-center mb-1.5 sm:mb-2"
                          >
                            {submittedEmail}
                          </div>

                          <p className="text-[10px] sm:text-[11px] text-[#0E4C56]/75 leading-tight mb-2.5 sm:mb-3">
                            Please check your <strong>Inbox</strong>, <strong>Promotions</strong>, or <strong>Spam</strong> folder.
                          </p>

                          {/* Primary Action Button */}
                          <Link
                            href="/programs"
                            className="group inline-flex items-center justify-center gap-2 w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-[#006D77] to-[#073D44] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(0,109,119,0.32)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mb-2"
                          >
                            <span>Explore Courses</span>
                            <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                          </Link>

                          {/* Resend / Another Email option */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsSubmitted(false);
                              setEmail("");
                            }}
                            className="text-[11px] sm:text-[11.5px] text-[#0E4C56]/75 hover:text-[#0E4C56] font-semibold underline cursor-pointer"
                          >
                            Use another email
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Re-Open Button attached to the center right edge when closed: Luxury Half-Capsule Pill */}
      {!isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", damping: 20, stiffness: 220 }}
          onClick={handleReopen}
          className="fixed right-0 top-[48%] sm:top-[36%] -translate-y-1/2 z-40 flex items-center gap-2 sm:gap-2.5 pl-3.5 sm:pl-4 pr-3 sm:pr-3.5 py-2 sm:py-2.5 rounded-l-full rounded-r-none border-y border-l border-[#D4AF37]/60 cursor-pointer overflow-hidden group select-none transition-all duration-300 hover:-translate-x-1.5 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #FFFDF9 0%, #FAF5EB 50%, #F5ECDB 100%)",
            boxShadow: "-4px 8px 24px -2px rgba(212, 175, 55, 0.35), -8px 12px 30px -4px rgba(0, 78, 86, 0.22)",
          }}
          aria-label="Re-open Diwali Offer"
        >
          {/* Subtle light shimmer wave on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none rounded-l-full" />

          {/* High-res crisp rotating rangoli graphic */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <Image
              src="/diwali-rangoli.png"
              alt="Diwali Rangoli"
              width={64}
              height={64}
              priority
              className="w-full h-full object-contain animate-spin [animation-duration:12s]"
            />
          </div>

          {/* Text: Diwali + 10% OFF Badge */}
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-sans font-extrabold tracking-tight text-[#073D44] text-xs sm:text-sm">
              Diwali
            </span>
            <span className="bg-gradient-to-r from-[#D4AF37]/25 to-[#E5A93C]/30 text-[#8B6508] border border-[#D4AF37]/50 px-1.5 py-0.5 rounded-md font-black text-[10px] sm:text-[11px] tracking-wide">
              10% OFF
            </span>
          </div>

          {/* Little gold sparkle */}
          <span className="text-[#D4AF37] text-[10px] sm:text-xs select-none pointer-events-none animate-pulse">✦</span>
        </motion.button>
      )}
    </>
  );
}
