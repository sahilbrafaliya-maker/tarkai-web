"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GeometricShapesProps {
    hideBigHexagon?: boolean; // kept for backwards compatibility but handled in variants
    hideTriangle?: boolean;
    hideTopLeftHexagon?: boolean;
    variant?: 'default' | 'light' | 'minimal' | 'why-choose-us' | 'your-journey' | 'curriculum' | 'why-now' | 'student-journeys' | 'contact' | 'page-background' | 'team-page' | 'about-page' | 'faq';
}

export default function GeometricShapes({
    variant = 'default'
}: GeometricShapesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useGSAP(() => {
        if (!mounted) return;
        const shapes = gsap.utils.toArray<HTMLElement>(".geo-shape");

        shapes.forEach((shape, i) => {
            gsap.to(shape, {
                x: "random(-40, 40)",
                y: "random(-20, 20)",
                rotation: "random(-90, 90)",
                duration: "random(10, 20)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.5,
            });

            gsap.to(shape, {
                opacity: (variant === 'light' || variant === 'minimal') ? 0.2 : 0.4,
                duration: "random(2, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

    }, { scope: containerRef, dependencies: [mounted, variant] });

    if (!mounted) return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">

            {/* Why Choose Us */}
            {variant === 'why-choose-us' && (
                <>
                    <div className="geo-shape absolute top-[20%] left-[8%] opacity-20 text-brand-accent">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[20%] right-[8%] opacity-20 text-brand-dark">
                        <div className="w-28 h-28 border-2 border-current rounded-full"></div>
                    </div>
                    {/* Added icons */}
                    <div className="geo-shape absolute top-[10%] right-[10%] opacity-15 text-brand-accent hidden md:block">
                        <div className="w-16 h-16 border-2 border-current transform rotate-45"></div>
                    </div>
                    <div className="geo-shape absolute bottom-[10%] left-[10%] opacity-15 text-brand-dark">
                        <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>
                </>
            )}

            {/* Your Journey */}
            {variant === 'your-journey' && (
                <>
                    <div className="geo-shape absolute top-[10%] left-[10%] opacity-20 text-brand-accent">
                        <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute top-[40%] right-[8%] opacity-20 text-brand-accent">
                        <div className="w-24 h-24 border-2 border-current rounded-lg transform rotate-12"></div>
                    </div>
                </>
            )}

            {/* Curriculum */}
            {variant === 'curriculum' && (
                <>
                    <div className="geo-shape absolute top-[5%] right-[10%] opacity-20 text-brand-dark">
                        <svg width="80" height="80" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute top-[25%] left-[10%] opacity-20 text-brand-accent">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[30%] right-[8%] opacity-15 text-brand-dark">
                        <div className="w-24 h-24 border-2 border-current rounded-full"></div>
                    </div>
                </>
            )}

            {/* Why Now */}
            {variant === 'why-now' && (
                <>
                    <div className="geo-shape absolute top-[25%] left-[12%] opacity-20 text-brand-accent">
                        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[15%] left-[12%] opacity-20 text-brand-dark hidden sm:block">
                        <div className="w-24 h-24 border-2 border-current rounded-full"></div>
                    </div>
                    {/* Added icons */}
                    <div className="geo-shape absolute top-[15%] right-[12%] opacity-15 text-brand-dark">
                        <div className="w-16 h-16 border-2 border-current transform rotate-12"></div>
                    </div>
                    <div className="geo-shape absolute bottom-[25%] right-[14%] opacity-20 text-brand-accent hidden lg:block">
                        <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-2.5 h-2.5 bg-current rounded-full"></div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Student Journeys */}
            {variant === 'student-journeys' && (
                <>
                    <div className="geo-shape absolute top-[20%] left-[12%] opacity-20 text-brand-accent">
                        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    {/* Right side circle */}
                    <div className="geo-shape absolute bottom-[15%] right-[14%] opacity-20 text-brand-accent">
                        <div className="w-16 h-16 border-2 border-current rounded-full"></div>
                    </div>
                </>
            )}

            {/* Contact TarkAI */}
            {variant === 'contact' && (
                <>
                    {/* Left Side (3 Icons) */}
                    <div className="geo-shape absolute -top-[2%] left-[3%] opacity-20 text-brand-dark">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute top-[35%] left-[3%] opacity-10 text-brand-accent hidden md:block">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[15%] left-[3%] opacity-25 text-brand-accent">
                        <svg width="100" height="100" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>

                    {/* Right Side (3 Icons) */}
                    <div className="geo-shape absolute top-[20%] right-[6%] opacity-15 text-brand-accent hidden lg:block">
                        <div className="w-20 h-20 border border-current transform rotate-45"></div>
                    </div>

                    <div className="geo-shape absolute bottom-[20%] right-[5%] opacity-15 text-brand-dark">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </>
            )}

            {/* Subpages Background */}
            {variant === 'page-background' && (
                <>
                    <div className="geo-shape absolute top-[10%] left-[3%] opacity-20 text-brand-accent">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute top-[25%] right-[5%] opacity-20 text-brand-dark">
                        <div className="w-24 h-24 border-2 border-current rounded-full"></div>
                    </div>

                    <div className="geo-shape absolute top-[70%] right-[3%] opacity-15 text-brand-dark hidden lg:block">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[10%] left-[6%] opacity-20 text-brand-accent">
                        <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[5%] right-[4%] opacity-20 text-brand-dark">
                        <div className="w-16 h-16 border-2 border-current transform rotate-45"></div>
                    </div>
                </>
            )}

            {/* Team Page */}
            {variant === 'team-page' && (
                <>
                    <div className="geo-shape absolute top-[10%] left-[3%] opacity-20 text-brand-accent">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    {/* Added 4-dot icon on left side */}
                    <div className="geo-shape absolute top-[20%] left-[4%] opacity-15 text-brand-accent">
                        <div className="grid grid-cols-2 gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-current rounded-full"></div>
                            ))}
                        </div>
                    </div>
                    {/* Shifted right circle higher */}
                    <div className="geo-shape absolute top-[35%] right-[5%] opacity-20 text-brand-dark">
                        <div className="w-24 h-24 border-2 border-current rounded-full"></div>
                    </div>
                    <div className="geo-shape absolute top-[40%] left-[2%] opacity-15 text-brand-dark">
                        <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute top-[55%] right-[4%] opacity-15 text-brand-accent">
                        <div className="grid grid-cols-2 gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-current rounded-full"></div>
                            ))}
                        </div>
                    </div>
                    <div className="geo-shape absolute top-[70%] left-[5%] opacity-15 text-brand-accent hidden md:block">
                        <div className="grid grid-cols-3 gap-3">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-current rounded-full"></div>
                            ))}
                        </div>
                    </div>
                    <div className="geo-shape absolute top-[85%] right-[3%] opacity-15 text-brand-dark hidden lg:block">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[10%] left-[6%] opacity-20 text-brand-accent">
                        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[5%] right-[4%] opacity-20 text-brand-dark">
                        <div className="w-16 h-16 border-2 border-current transform rotate-45"></div>
                    </div>
                </>
            )}

            {/* About Page */}
            {variant === 'about-page' && (
                <>
                    <div className="geo-shape absolute top-[25%] left-[5%] opacity-20 text-brand-accent">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[25%] left-[3%] opacity-20 text-brand-dark">
                        <svg width="80" height="80" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute top-[50%] right-[4%] opacity-15 text-brand-accent">
                        <div className="w-24 h-24 border-2 border-current rounded-full"></div>
                    </div>
                </>
            )}

            
            {/* FAQ Section */}
            {variant === 'faq' && (
                <>
                    {/* Left side Circle */}
                    <div className="geo-shape absolute top-[-3%] left-[2%] opacity-20 text-brand-accent">
                        <div className="w-24 h-24 border-2 border-current rounded-full"></div>
                    </div>
                    {/* Right-bottom Hexagon (6 angle) - pushed further right */}
                    <div className="geo-shape absolute bottom-[15%] right-[2%] opacity-20 text-brand-dark">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </>
            )}

            {/* Legacy Variants / Default */}
            {(variant === 'default' || variant === 'light' || variant === 'minimal') && (
                <>
                    <div className="geo-shape absolute top-[2%] left-[2%] opacity-20 text-brand-accent">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="geo-shape absolute bottom-[15%] right-[2%] opacity-20 text-brand-dark">
                        <div className="w-28 h-28 border-2 border-current rounded-full"></div>
                    </div>
                </>
            )}

        </div>
    );
}
