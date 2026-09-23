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
    const [isHovered, setIsHovered] = useState(false);

    // Create a large array for a true "infinite" loop illusion
    const displayImages = Array(20).fill(images).flat(); // 80 images

    // On load, start from the middle so the user can immediately click left infinitely
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            // Scroll by one image width + gap
            const scrollAmount = current.clientWidth > 768 ? 320 : 260; 
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Continuous Auto-scroll logic (Right to Left)
    useEffect(() => {
        let animationFrameId: number;
        let lastTime = performance.now();
        
        const playScroll = (time: number) => {
            if (!isHovered && scrollRef.current) {
                // Throttle to roughly 60fps
                if (time - lastTime >= 16) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                    
                    // If we somehow reach the extreme ends, reset to the middle seamlessly
                    if (scrollLeft + clientWidth >= scrollWidth - 200 || scrollLeft <= 200) {
                        scrollRef.current.scrollLeft = scrollWidth / 2;
                    } else {
                        // Continuous slow scroll
                        scrollRef.current.scrollLeft += 1;
                    }
                    lastTime = time;
                }
            }
            animationFrameId = requestAnimationFrame(playScroll);
        };

        animationFrameId = requestAnimationFrame(playScroll);
        
        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isHovered]);

    return (
        <section className="pt-6 md:pt-12 pb-10 lg:pt-16 lg:pb-12 bg-[#F8FCFC] relative overflow-hidden">
            {/* Geometric animated shapes */}
            <GeometricShapes variant="default" />
            
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#20A6A8]/5 blur-[120px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Area */}
                <div className="text-center max-w-5xl mx-auto mb-8 md:mb-16 relative z-10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                        <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                            Certificate Ceremony
                        </div>
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-6">
                        Celebrating Our <span className="text-[#20A6A8]">Learners' Achievements</span>
                    </h2>
                    <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-2xl mx-auto">
                        Honoring the hard work and dedication of our students as they successfully complete their programs and receive their certifications.
                    </p>
                </div>

                {/* Marquee Area with Arrows and Blur Mask */}
                <div 
                    className="relative w-full overflow-visible mt-10 py-4 group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
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
                            className="flex items-center gap-6 md:gap-8 px-4 overflow-x-auto py-4 custom-scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {displayImages.map((src, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-60 h-80 sm:w-65 sm:h-90 md:w-70 md:h-95 shrink-0 rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-[#20A6A8]/50 hover:shadow-lg"
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
                <div className="mt-10 text-center">
                    <Link
                        href="/programs"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-accent hover:bg-[#1B9FA1] text-white text-[16px] font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
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
