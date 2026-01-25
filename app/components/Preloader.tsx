"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
    const [isLoaded, setIsLoaded] = useState(false);
    const preloaderRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleLoad = () => {
            // Add a small delay for smoother experience even on fast connections
            setTimeout(() => setIsLoaded(true), 800);
        };

        // Check if already loaded
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    useGSAP(() => {
        if (isLoaded && preloaderRef.current) {
            const tl = gsap.timeline();

            // Fade out logo
            tl.to(logoRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.inOut"
            });

            // Slide up and fade out overlay
            tl.to(preloaderRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: () => {
                    if (preloaderRef.current) {
                        preloaderRef.current.style.display = "none";
                    }
                }
            }, "-=0.2");
        } else if (logoRef.current) {
            // Initial Logo Pulse Animation
            gsap.to(logoRef.current, {
                opacity: 0.8,
                scale: 1.05,
                repeat: -1,
                yoyo: true,
                duration: 1,
                ease: "sine.inOut"
            });
        }
    }, [isLoaded]);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-darkest text-white"
        >
            <div ref={logoRef} className="text-center">
                {/* You can replace this text with your Logo Image for better branding */}
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                    TARK <span className="text-brand-accent">AI</span>
                </h1>
                <p className="mt-4 text-brand-light/70 text-sm tracking-widest uppercase">
                    Loading Experience...
                </p>

                {/* Simple line loader */}
                <div className="w-48 h-1 bg-white/10 mt-6 mx-auto rounded-full overflow-hidden">
                    <div className="h-full bg-brand-accent w-full animate-shimmer origin-left"></div>
                </div>
            </div>
        </div>
    );
}
