"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollAnimations() {
    useGSAP(() => {
        // Fade Up Animation
        const fadeUpElements = document.querySelectorAll(".gsap-fade-up");
        fadeUpElements.forEach((element) => {
            gsap.fromTo(
                element,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Stagger Animation for children
        const staggerContainers = document.querySelectorAll(".gsap-stagger");
        staggerContainers.forEach((container) => {
            const children = container.children;
            gsap.fromTo(
                children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Scale Up Animation
        const scaleElements = document.querySelectorAll(".gsap-scale");
        scaleElements.forEach((element) => {
            gsap.fromTo(
                element,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

    }, []);

    return null;
}
