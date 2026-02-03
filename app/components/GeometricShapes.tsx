"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function GeometricShapes() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const shapes = gsap.utils.toArray<HTMLElement>(".geo-shape");

        shapes.forEach((shape, i) => {
            // Random floating movement
            gsap.to(shape, {
                x: "random(-50, 50)",
                y: "random(-30, 30)",
                rotation: "random(-180, 180)",
                duration: "random(10, 20)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.5,
            });

            // Gentle opacity pulse
            gsap.to(shape, {
                opacity: 0.6,
                duration: "random(2, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Hexagon - Top Left */}
            <div className="geo-shape absolute top-[10%] left-[5%] opacity-30 text-brand-accent">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            {/* Circle - Top Right */}
            <div className="geo-shape absolute top-[15%] right-[10%] opacity-30 text-brand-dark">
                <div className="w-24 h-24 border-2 border-current rounded-full"></div>
            </div>

            {/* Triangle - Bottom Left */}
            <div className="geo-shape absolute bottom-[20%] left-[8%] opacity-30 text-brand-accent">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15L90 85H10L50 15Z" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            {/* Abstract Grid - Center Right */}
            <div className="geo-shape absolute top-[40%] right-[5%] opacity-20 text-brand-dark hidden md:block">
                <div className="grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-current rounded-full"></div>
                    ))}
                </div>
            </div>

            {/* Large Hexagon - Bottom Right (Offscreen mostly) */}
            <div className="geo-shape absolute -bottom-10 -right-10 opacity-10 text-brand-accent">
                <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" className="fill-current" />
                </svg>
            </div>
        </div>
    );
}
