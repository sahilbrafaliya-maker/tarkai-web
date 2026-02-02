"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaRocket, FaChalkboardTeacher, FaLightbulb, FaLeaf } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- MagicBento Types & Constants ---
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255'; // Using a purple default, will override per card
const MOBILE_BREAKPOINT = 768;

const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

// --- Particle Helper ---
const createParticleElement = (x: number, y: number, color: string): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

// --- Components ---

const ParticleCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}> = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = false,
    enableMagnetism = false,
    onClick
}) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const particlesRef = useRef<HTMLDivElement[]>([]);
        const timeoutsRef = useRef<number[]>([]);
        const isHoveredRef = useRef(false);
        const memoizedParticles = useRef<HTMLDivElement[]>([]);
        const particlesInitialized = useRef(false);
        const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

        const initializeParticles = useCallback(() => {
            if (particlesInitialized.current || !cardRef.current) return;

            const { width, height } = cardRef.current.getBoundingClientRect();
            memoizedParticles.current = Array.from({ length: particleCount }, () =>
                createParticleElement(Math.random() * width, Math.random() * height, glowColor)
            );
            particlesInitialized.current = true;
        }, [particleCount, glowColor]);

        const clearAllParticles = useCallback(() => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            // magnetismAnimationRef.current?.kill(); // Don't kill magnetism here, it might jerk

            particlesRef.current.forEach(particle => {
                gsap.to(particle, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.in(1.7)',
                    onComplete: () => {
                        particle.parentNode?.removeChild(particle);
                    }
                });
            });
            particlesRef.current = [];
        }, []);

        const animateParticles = useCallback(() => {
            if (!cardRef.current || !isHoveredRef.current) return;

            if (!particlesInitialized.current) {
                initializeParticles();
            }

            memoizedParticles.current.forEach((particle, index) => {
                const timeoutId = window.setTimeout(() => {
                    if (!isHoveredRef.current || !cardRef.current) return;

                    const clone = particle.cloneNode(true) as HTMLDivElement;
                    cardRef.current.appendChild(clone);
                    particlesRef.current.push(clone);

                    gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                    gsap.to(clone, {
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        rotation: Math.random() * 360,
                        duration: 2 + Math.random() * 2,
                        ease: 'none',
                        repeat: -1,
                        yoyo: true
                    });

                    gsap.to(clone, {
                        opacity: 0.3,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }, index * 100);

                timeoutsRef.current.push(window.setTimeout(() => { }, 0)); // Dummy push to match type ?? No, logic fix
                timeoutsRef.current[timeoutsRef.current.length - 1] = timeoutId;
            });
        }, [initializeParticles]);

        useEffect(() => {
            if (disableAnimations || !cardRef.current) return;

            const element = cardRef.current;

            const handleMouseEnter = () => {
                isHoveredRef.current = true;
                animateParticles();

                if (enableTilt) {
                    gsap.to(element, {
                        rotateX: 5,
                        rotateY: 5,
                        duration: 0.3,
                        ease: 'power2.out',
                        transformPerspective: 1000
                    });
                }
            };

            const handleMouseLeave = () => {
                isHoveredRef.current = false;
                clearAllParticles();

                if (enableTilt) {
                    gsap.to(element, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }

                if (enableMagnetism) {
                    gsap.to(element, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!enableTilt && !enableMagnetism) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;

                    gsap.to(element, {
                        rotateX,
                        rotateY,
                        duration: 0.1,
                        ease: 'power2.out',
                        transformPerspective: 1000
                    });
                }

                if (enableMagnetism) {
                    const magnetX = (x - centerX) * 0.05;
                    const magnetY = (y - centerY) * 0.05;

                    // @ts-ignore
                    magnetismAnimationRef.current = gsap.to(element, {
                        x: magnetX,
                        y: magnetY,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            const handleClick = (e: MouseEvent) => {
                if (!clickEffect) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const maxDistance = Math.max(
                    Math.hypot(x, y),
                    Math.hypot(x - rect.width, y),
                    Math.hypot(x, y - rect.height),
                    Math.hypot(x - rect.width, y - rect.height)
                );

                const ripple = document.createElement('div');
                ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

                element.appendChild(ripple);

                gsap.fromTo(
                    ripple,
                    {
                        scale: 0,
                        opacity: 1
                    },
                    {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => ripple.remove()
                    }
                );
            };

            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('click', handleClick);

            return () => {
                isHoveredRef.current = false;
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('click', handleClick);
                clearAllParticles();
            };
        }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

        return (
            <div
                ref={cardRef}
                className={`${className} particle-container`}
                style={{ ...style, position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d' }}
                onClick={onClick}
            >
                {children}
            </div>
        );
    };

const GlobalSpotlight: React.FC<{
    gridRef: React.RefObject<HTMLDivElement | null>;
    disableAnimations?: boolean;
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}> = ({
    gridRef,
    disableAnimations = false,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}) => {
        const spotlightRef = useRef<HTMLDivElement | null>(null);
        const isInsideSection = useRef(false);

        useEffect(() => {
            if (disableAnimations || !gridRef?.current || !enabled) return;

            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
            document.body.appendChild(spotlight);
            spotlightRef.current = spotlight;

            const handleMouseMove = (e: MouseEvent) => {
                if (!spotlightRef.current || !gridRef.current) return;

                const rect = gridRef.current.getBoundingClientRect(); // Use container rect
                const mouseInside =
                    rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

                isInsideSection.current = mouseInside || false;
                const cards = gridRef.current.querySelectorAll('.magic-bento-card');

                if (!mouseInside) {
                    gsap.to(spotlightRef.current, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    cards.forEach(card => {
                        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                    });
                    return;
                }

                const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
                let minDistance = Infinity;

                cards.forEach(card => {
                    const cardElement = card as HTMLElement;
                    const cardRect = cardElement.getBoundingClientRect();
                    const centerX = cardRect.left + cardRect.width / 2;
                    const centerY = cardRect.top + cardRect.height / 2;
                    const distance =
                        Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                    const effectiveDistance = Math.max(0, distance);

                    minDistance = Math.min(minDistance, effectiveDistance);

                    let glowIntensity = 0;
                    if (effectiveDistance <= proximity) {
                        glowIntensity = 1;
                    } else if (effectiveDistance <= fadeDistance) {
                        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                    }

                    updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
                });

                gsap.to(spotlightRef.current, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 0.1,
                    ease: 'power2.out'
                });

                const targetOpacity =
                    minDistance <= proximity
                        ? 0.8
                        : minDistance <= fadeDistance
                            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                            : 0;

                gsap.to(spotlightRef.current, {
                    opacity: targetOpacity,
                    duration: targetOpacity > 0 ? 0.2 : 0.5,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                isInsideSection.current = false;
                gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => {
                    (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                });
                if (spotlightRef.current) {
                    gsap.to(spotlightRef.current, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseleave', handleMouseLeave);
                spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
            };
        }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

        return null; // This component handles side-effects only
    };

// --- Main Component ---
export default function SignaturePrograms() {
    const containerRef = useRef<HTMLDivElement>(null);

    // CSS for standard MagicBento Effects
    const cssStyles = `
        .magic-bento-card {
            position: relative;
            background: #ffffff;
            border-radius: 1rem;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Border Glow Effect using pseudo-element */
        .magic-bento-card--border-glow::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(var(--glow-color), var(--glow-intensity)), transparent);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            opacity: 0.8;
            z-index: 2;
        }
        
        .particle {
            pointer-events: none;
        }
    `;

    const programs = [
        {
            title: "AI / ML Architect Program",
            duration: "12 Modules",
            description: "From intelligent databases to agentic systems—craft full-stack AI experiences that are production ready.",
            highlights: ["Full-stack ML systems", "LLM fine-tuning & agent orchestration"],
            icon: <FaRocket />,
            color: "from-blue-500 to-cyan-400",
            glowColor: "0, 191, 255", // Deep Sky Blue for particles
            featured: true
        },
        {
            title: "Data Science & Strategic Analytics",
            duration: "12 Modules",
            description: "Transform noisy data into boardroom narratives and predictive models leaders can act on instantly.",
            highlights: ["Analytics storytelling", "Spark-powered ML pipelines"],
            icon: <FaChalkboardTeacher />,
            color: "from-emerald-500 to-teal-400",
            glowColor: "0, 255, 127" // Spring Green
        },
        {
            title: "Future Founders – AI Foundation",
            duration: "8 Modules",
            description: "A playful launchpad for teens and first-time builders to code, analyze, and present their first AI ideas.",
            highlights: ["Creative coding sprints", "Responsible AI mindset"],
            icon: <FaLightbulb />,
            color: "from-orange-500 to-amber-400",
            glowColor: "255, 165, 0" // Orange
        },
        {
            title: "Green Intelligence – Climate Analytics",
            duration: "8 Modules",
            description: "Decode carbon markets, architect ESG dashboards, and advise on climate-positive strategies with data.",
            highlights: ["Emission analytics", "Carbon market storytelling"],
            icon: <FaLeaf />,
            color: "from-green-600 to-lime-500",
            glowColor: "50, 205, 50" // Lime Green
        }
    ];

    return (
        <section className="py-24 bg-brand-lightest relative overflow-hidden bento-section">
            <style>{cssStyles}</style>

            <GlobalSpotlight
                gridRef={containerRef}
                spotlightRadius={400} // Increased radius for better visibility
                glowColor="45, 165, 163" // Brand accent color for spotlight
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-darkest mb-4">Signature Programs</h2>
                    <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
                    <p className="mt-4 text-brand-dark max-w-2xl mx-auto">
                        Curriculum designed for the future of intelligence.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="grid md:grid-cols-2 gap-6 md:gap-8 group/container"
                >
                    {programs.map((program, index) => {
                        const toSlug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        // @ts-ignore
                        const isFeatured = program.featured;

                        return (
                            <Link
                                key={index}
                                href={`/programs#${toSlug(program.title)}`}
                                className="block h-full"
                            >
                                <ParticleCard
                                    className={`magic-bento-card magic-bento-card--border-glow h-full`}
                                    style={{
                                        // @ts-ignore
                                        "--glow-color": program.glowColor,
                                    }}
                                    glowColor={program.glowColor}
                                    enableTilt={false} // Disable tilt for link clickable usability, or keep subtle? User asked for enableTilt={false} in example
                                    enableMagnetism={false}
                                    clickEffect={true}
                                >
                                    <div className={`relative h-full bg-white p-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${isFeatured ? 'border-brand-accent ring-1 ring-brand-accent shadow-brand-accent/10' : 'border-brand-light/20'} hover:border-brand-accent/40`}>
                                        {isFeatured && (
                                            <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20 shadow-sm">
                                                FLAGSHIP
                                            </div>
                                        )}
                                        <div className="h-full bg-white rounded-xl p-6 md:p-8 flex flex-col relative z-10">

                                            {/* Header */}
                                            <div className="flex items-center justify-between w-full mb-6">
                                                <div className={`p-4 rounded-xl bg-linear-to-br ${program.color} text-white text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                                    {program.icon}
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-dark/60 bg-brand-lightest px-3 py-1 rounded-full border border-brand-light/20">
                                                    {program.duration}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-2xl font-bold text-brand-darkest mb-3 group-hover:text-brand-accent transition-colors">
                                                {program.title}
                                            </h3>
                                            <p className="text-gray-600 mb-6 leading-relaxed grow">
                                                {program.description}
                                            </p>

                                            {/* Highlights */}
                                            <div className="mb-8 pt-6 border-t border-gray-100">
                                                <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest mb-3">Key Highlights</p>
                                                <ul className="space-y-2">
                                                    {program.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="flex items-center text-sm text-brand-dark font-medium">
                                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-linear-to-r ${program.color}`}></span>
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* CTA */}
                                            <div className="mt-auto pt-6 border-t border-gray-100">
                                                <span className={`w-full py-3 px-6 rounded-xl flex items-center justify-center font-bold text-white bg-linear-to-r ${program.color} shadow-lg shadow-brand-accent/20 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group-hover:shadow-brand-accent/40`}>
                                                    Know More
                                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </ParticleCard>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
