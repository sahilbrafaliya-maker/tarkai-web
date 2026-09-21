"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";

export default function FloatingCTA() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(true); // Start true to prevent flash, then update

    useEffect(() => {
        // Check session storage on mount
        const dismissed = sessionStorage.getItem("tarkai_cta_dismissed");
        setIsDismissed(dismissed === "true");
        
        if (dismissed === "true") return;

        const handleScroll = () => {
            setIsVisible(prev => {
                // If it's already visible, keep it visible! (Don't hide on scroll up)
                if (prev) return prev;
                
                // Only trigger if we are on the home page
                if (pathname !== "/") return prev;

                // Check if 'journey' section is in the document
                const journeySection = document.getElementById("journey");
                
                if (journeySection) {
                    const rect = journeySection.getBoundingClientRect();
                    // Show if the top of the journey section has entered the viewport
                    if (rect.top < window.innerHeight) {
                        return true;
                    }
                } else {
                    // If journey section is missing but we're on home, fallback to 25% scroll
                    const scrollY = window.scrollY;
                    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = (scrollY / documentHeight) * 100;
                    
                    if (scrollPercent > 25) {
                        return true;
                    }
                }
                
                return prev;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem("tarkai_cta_dismissed", "true");
    };

    if (pathname !== "/" || isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 40, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100%-3rem)] sm:w-95"
                >
                    <div className="relative p-px rounded-3xl bg-linear-to-br from-brand-accent/60 via-white/10 to-brand-accent/30 shadow-[0_20px_40px_-15px_rgba(0,115,122,0.4)] hover:shadow-[0_20px_50px_-15px_rgba(0,115,122,0.6)] transition-shadow duration-500 group/card">
                        <div className="relative bg-[#021214]/95 backdrop-blur-xl rounded-[23px] p-6 sm:p-7 overflow-hidden h-full w-full">
                            
                            {/* Decorative Background Accent */}
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover/card:scale-110"></div>
                            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-light/10 rounded-full blur-2xl pointer-events-none"></div>
                            
                            {/* Close Button */}
                            <button 
                                onClick={handleDismiss}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors z-20"
                                aria-label="Close CTA"
                            >
                                <FaTimes size={13} />
                            </button>

                            <div className="flex flex-col gap-2 pr-2 relative z-10">
                                <div className="flex items-center gap-2.5">
                                    <span className="text-[11px] font-black uppercase tracking-[0.15em] text-brand-accent">
                                        AI Career Guidance
                                    </span>
                                </div>
                                
                                <h3 className="text-[22px] sm:text-[24px] font-black text-white leading-[1.2] mt-1.5 tracking-tight">
                                    Ready to Start Your <br/>
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-brand-light to-brand-accent">AI Journey?</span>
                                </h3>
                                
                                <p className="text-[14px] text-white/60 leading-[1.6] mt-1.5 mb-5 font-medium">
                                    Get personalized guidance and find the exact learning path for your career goals.
                                </p>

                                <Link 
                                    href="/contact" 
                                    className="group relative flex items-center justify-between w-full bg-brand-accent text-white rounded-xl py-3.5 px-5 font-bold text-[14px] sm:text-[15px] overflow-hidden transition-all shadow-[0_0_20px_rgba(32,166,168,0.2)] hover:shadow-[0_0_25px_rgba(32,166,168,0.4)] hover:bg-[#1a8a8c] cursor-pointer"
                                >
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                    
                                    <span className="relative z-10 tracking-wide">Book a Free Consultation</span>
                                    <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
                                        &rarr;
                                    </span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}