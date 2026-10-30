"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft } from '@react-icons/all-files/fa/FaChevronLeft';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import GeometricShapes from './GeometricShapes';

export default function PlacementStoriesSection() {
    const images = [
        "/placement/Denisha Rafaliya.png",
        "/placement/Khenil.png",
        "/placement/Nancy.png",
        "/placement/Yash.png",
    ];

    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isHoveredRef = useRef(false);
    const isVisibleRef = useRef(true);
    const isTouchInteracting = useRef(false);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Create a large array for a true "infinite" loop illusion
    const displayImages = Array(6).fill(images).flat(); // 24 images

    // On load, start from the middle so the user can immediately click left infinitely
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
        }
    }, []);

    // Only run continuous auto-scroll when section is in viewport
    useEffect(() => {
        if (!sectionRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.05 }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            // Scroll by one image width + gap
            const scrollAmount = current.clientWidth > 768 ? 320 : 260; 
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const handleTouchStart = () => {
        isTouchInteracting.current = true;
        isHoveredRef.current = true;
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = null;
        }
    };

    const handleTouchEnd = () => {
        isTouchInteracting.current = false;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
            if (!isTouchInteracting.current) {
                isHoveredRef.current = false;
            }
        }, 2500);
    };

    // Continuous Auto-scroll logic (Right to Left) with cached layout metrics
    useEffect(() => {
        let animationFrameId: number;
        let lastTime = performance.now();
        let cachedScrollWidth = 0;
        let cachedClientWidth = 0;

        const updateMetrics = () => {
            if (scrollRef.current) {
                cachedScrollWidth = scrollRef.current.scrollWidth;
                cachedClientWidth = scrollRef.current.clientWidth;
            }
        };

        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        
        const playScroll = (time: number) => {
            if (isVisibleRef.current && !isHoveredRef.current && !isTouchInteracting.current && scrollRef.current) {
                if (time - lastTime >= 16) {
                    if (!cachedScrollWidth) updateMetrics();
                    const currentScroll = scrollRef.current.scrollLeft;
                    
                    // If we reach the extreme ends, reset to the middle seamlessly
                    if (currentScroll + cachedClientWidth >= cachedScrollWidth - 200 || currentScroll <= 200) {
                        scrollRef.current.scrollLeft = cachedScrollWidth / 2;
                    } else {
                        // Continuous smooth scroll without forcing reflow every frame
                        scrollRef.current.scrollLeft = currentScroll + 1;
                    }
                    lastTime = time;
                }
            }
            animationFrameId = requestAnimationFrame(playScroll);
        };

        animationFrameId = requestAnimationFrame(playScroll);
        
        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', updateMetrics);
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        };
    }, []);

    return (
        <section ref={sectionRef} className="pt-4 sm:pt-6 md:pt-12 pb-6 sm:pb-10 lg:pt-16 lg:pb-12 bg-[#F8FCFC] relative overflow-hidden">
            {/* Geometric animated shapes */}
            <GeometricShapes variant="default" />
            
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#20A6A8]/5 blur-[120px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Area */}
                <div className="text-center max-w-5xl mx-auto mb-5 sm:mb-8 md:mb-16 relative z-10">
                    <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                        <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                            Certificate Ceremony
                        </div>
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-3 sm:mb-6">
                        Celebrating Our <span className="text-[#20A6A8]">Learners&apos; Achievements</span>
                    </h2>
                    <p className="text-[14.5px] sm:text-[16px] font-normal leading-[1.6] sm:leading-[1.65] text-slate-500 max-w-2xl mx-auto">
                        Honoring the hard work and dedication of our students as they successfully complete their programs and receive their certifications.
                    </p>
                </div>

                {/* Marquee Area with Arrows and Blur Mask */}
                <div 
                    className="relative w-full overflow-visible mt-5 sm:mt-10 py-2 sm:py-4 group"
                    onMouseEnter={() => { isHoveredRef.current = true; }}
                    onMouseLeave={() => { isHoveredRef.current = false; }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Left Arrow */}
                    <button 
                        onClick={() => scroll('left')} 
                        className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 shadow-xl flex items-center justify-center text-[#20A6A8] hover:bg-[#20A6A8] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none"
                        aria-label="Scroll left"
                    >
                        <FaChevronLeft className="text-lg -ml-1" />
                    </button>

                    {/* Scroll Container with Mask */}
                    <div 
                        className="w-full overflow-hidden"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                        }}
                    >
                        <div 
                            ref={scrollRef} 
                            className="flex items-center gap-4 sm:gap-6 md:gap-8 px-4 overflow-x-auto overflow-y-hidden py-3 sm:py-4 custom-scrollbar-hide touch-pan-y overscroll-x-auto [&::-webkit-scrollbar]:hidden"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {displayImages.map((src, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-52 h-72 sm:w-65 sm:h-90 md:w-70 md:h-95 shrink-0 rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-[#20A6A8]/50 hover:shadow-lg"
                                >
                                    <Image
                                        src={src}
                                        alt="TARK AI placement story"
                                        fill
                                        quality={85}
                                        className="object-cover"
                                        sizes="(max-width: 639px) 240px, (max-width: 768px) 260px, (max-width: 1024px) 280px, 320px"
                                        loading={idx < 4 ? "eager" : "lazy"}
                                    />
                                    <div className="absolute inset-0 bg-[#20A6A8]/0 hover:bg-[#20A6A8]/5 transition-colors duration-300 pointer-events-none rounded-2xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button 
                        onClick={() => scroll('right')} 
                        className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 shadow-xl flex items-center justify-center text-[#20A6A8] hover:bg-[#20A6A8] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Scroll right"
                    >
                        <FaChevronRight className="text-lg -mr-1" />
                    </button>
                </div>

                {/* CTA */}
                <div className="mt-6 sm:mt-10 text-center">
                    <Link
                        href="/programs"
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-brand-accent hover:bg-[#1B9FA1] text-white text-[15px] sm:text-[16px] font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                        Explore Our Programs
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                `
            }} />
        </section>
    );
}
