"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBackground() {
    const container = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(
        () => {
            if (!imageRef.current) return;

            gsap.to(imageRef.current, {
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: 500, // Maximum parallax
                scale: 1.5, // Maximum zoom
                ease: "none",
            });
        },
        { scope: container }
    );

    return (
        <div ref={container} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
                ref={imageRef}
                src="/BG_Design.png"
                alt="Hero Background"
                fill
                className="object-cover opacity-100 mix-blend-overlay" // kept from previous step
                priority
            />
        </div>
    );
}
