"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";

export default function HomeAnnouncementPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the popup in this session
        const hasSeenPopup = sessionStorage.getItem('hasSeenHomePopup');
        if (!hasSeenPopup) {
            // Add a slight delay before showing the popup
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('hasSeenHomePopup', 'true');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative max-w-3xl w-full mx-auto rounded-4xl sm:rounded-[2.5rem] p-px bg-linear-to-br from-[#20A6A8]/60 via-white/40 to-[#20A6A8]/30 shadow-[0_0_80px_-15px_rgba(32,166,168,0.4)] max-h-[95vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white/95 backdrop-blur-3xl rounded-[calc(2rem-1px)] sm:rounded-[calc(2.5rem-1px)] relative overflow-y-auto overflow-x-hidden flex flex-col md:flex-row flex-1 custom-scrollbar">
                            
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50/80 text-slate-400 hover:text-[#20A6A8] hover:bg-[#20A6A8]/10 border border-slate-200/60 hover:border-[#20A6A8]/20 transition-all duration-300 cursor-pointer z-30 shadow-sm"
                                aria-label="Close popup"
                            >
                                <FaTimes size={14} />
                            </button>

                            {/* Left Content Panel (Image) */}
                            <div className="w-full md:w-1/2 relative bg-white flex items-center justify-center shrink-0">
                                <Image
                                    src="/vnsgu-tarkai-course.png"
                                    alt="AI-Driven Statistical Analytics Certificate Course by VNSGU & TarkAI"
                                    width={1200}
                                    height={1200}
                                    className="w-full h-auto object-contain md:absolute md:inset-0 md:h-full"
                                    priority
                                />
                            </div>

                            {/* Right Content Panel (Contact Details) */}
                            <div className="hidden md:flex w-full md:w-1/2 px-5 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 relative z-20 flex-col justify-center bg-white">
                                
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-linear-to-r from-[#20A6A8]/10 to-[#20A6A8]/5 border border-[#20A6A8]/20 mb-3 sm:mb-4 self-start shadow-[0_0_15px_rgba(32,166,168,0.05)]">
                                    <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#188284]">
                                        Special Announcement
                                    </span>
                                </div>
                                
                                <h2 className="text-[17px] sm:text-[20px] md:text-[24px] font-bold leading-tight tracking-[-0.02em] text-[#0F1C1E] mb-2 sm:mb-3">
                                    Certificate Course on <span className="bg-linear-to-r from-[#20A6A8] to-[#126b6c] bg-clip-text text-transparent">AI-Driven Statistical Analytics</span>
                                </h2>
                                
                                <p className="text-[12px] sm:text-[14px] text-slate-600 leading-relaxed mb-4 sm:mb-6">
                                    Department of Statistics, Veer Narmad South Gujarat University (VNSGU) in collaboration with TarkAI EdTech announces a new 90-Hour certification course.
                                </p>

                                {/* Contact Details */}
                                <div className="space-y-2.5 sm:space-y-4 bg-white/60 backdrop-blur-sm p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#20A6A8]/10 shadow-[0_4px_20px_-5px_rgba(32,166,168,0.05)]">
                                    <h3 className="text-[13px] sm:text-[15px] font-bold text-[#0F1C1E] mb-2 sm:mb-3 border-b border-[#20A6A8]/10 pb-1.5 sm:pb-2">For Registration & Inquiries:</h3>
                                    
                                    <div className="flex items-start gap-3 sm:gap-4 group">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-[#20A6A8]/15 flex items-center justify-center shrink-0 group-hover:bg-[#20A6A8] transition-colors duration-300 shadow-[0_2px_10px_-2px_rgba(32,166,168,0.1)]">
                                            <FaEnvelope className="text-[#20A6A8] text-[10px] sm:text-sm group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-0 sm:mb-0.5">Email Us</p>
                                            <a href="mailto:info@tarkaiedtech.com" className="text-[13px] sm:text-[15px] font-bold text-[#0F1C1E] hover:text-[#20A6A8] transition-colors break-all">
                                                info@tarkaiedtech.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 sm:gap-4 group">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-[#20A6A8]/15 flex items-center justify-center shrink-0 group-hover:bg-[#20A6A8] transition-colors duration-300 shadow-[0_2px_10px_-2px_rgba(32,166,168,0.1)]">
                                            <FaPhoneAlt className="text-[#20A6A8] text-[10px] sm:text-sm group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-0 sm:mb-0.5">Call Us</p>
                                            <a href="tel:+919712358689" className="text-[13px] sm:text-[15px] font-bold text-[#0F1C1E] hover:text-[#20A6A8] transition-colors">
                                                +91 97123 58689
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
