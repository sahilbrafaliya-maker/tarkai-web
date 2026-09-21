"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GeometricShapes from './GeometricShapes';

export default function PlacementStoriesSection() {
    const images = [
        "/placement/Denisha Rafaliya.png",
        "/placement/Khenil.png",
        "/placement/Nancy.png",
        "/placement/Yash.png",
    ];

    const [isHovered, setIsHovered] = useState(false);

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

                {/* Marquee Area */}
                <div className="relative w-full overflow-hidden mt-10 py-4">
                    {/* Marquee Track Container */}
                    <div
                        className="flex items-center w-max"
                        style={{
                            animation: 'scroll-marquee 35s linear infinite',
                            animationPlayState: isHovered ? 'paused' : 'running'
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onTouchStart={() => setIsHovered(true)}
                        onTouchEnd={() => setIsHovered(false)}
                    >
                        {/* Two identical sets of cards for seamless loop */}
                        {[0, 1].map((setIndex) => (
                            <div key={setIndex} className="flex items-center gap-6 md:gap-8 px-3 md:px-4">
                                {images.map((src, idx) => (
                                    <div
                                        key={`${setIndex}-${idx}`}
                                        className="relative w-60 h-80 sm:w-65 sm:h-90 md:w-70 md:h-95 shrink-0 rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 group hover:scale-[1.03] hover:border-[#20A6A8]/50 hover:shadow-lg"
                                    >
                                        <Image
                                            src={src}
                                            alt="TARK AI placement story"
                                            fill
                                            quality={85}
                                            className="object-cover"
                                            sizes="(max-width: 639px) 240px, (max-width: 768px) 260px, (max-width: 1024px) 280px, 320px"
                                            loading={setIndex === 0 ? "eager" : "lazy"}
                                        />
                                        <div className="absolute inset-0 bg-[#20A6A8]/0 group-hover:bg-[#20A6A8]/5 transition-colors duration-300 pointer-events-none rounded-2xl"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
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
                @keyframes scroll-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .flex.items-center.w-max {
                        animation: none !important;
                        flex-wrap: wrap;
                        justify-content: center;
                        width: 100% !important;
                    }
                    .flex.items-center.gap-6.md\\:gap-8 {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }
                `
            }} />
        </section>
    );
}
