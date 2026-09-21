"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
    useEffect(() => {
        let observer: IntersectionObserver;
        let gsapRef: any = null;
        let ScrollTriggerRef: any = null;
        const initializedElements = new Set();

        const loadGsap = async () => {
            if (!gsapRef) {
                const gsapModule = await import("gsap");
                const ScrollTriggerModule = await import("gsap/ScrollTrigger");
                gsapRef = gsapModule.default || gsapModule;
                ScrollTriggerRef = ScrollTriggerModule.ScrollTrigger;
                gsapRef.registerPlugin(ScrollTriggerRef);
            }
        };

        const initAnimation = async (element: Element, className: string) => {
            if (initializedElements.has(element)) return;
            initializedElements.add(element);
            
            await loadGsap();

            if (className.includes("gsap-fade-up")) {
                gsapRef.fromTo(
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
            } else if (className.includes("gsap-stagger")) {
                gsapRef.fromTo(
                    element.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            } else if (className.includes("gsap-scale")) {
                gsapRef.fromTo(
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
            } else if (className.includes("gsap-fade-right")) {
                gsapRef.fromTo(
                    element,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            } else if (className.includes("gsap-fade-left")) {
                gsapRef.fromTo(
                    element,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            } else if (className.includes("gsap-slide-up-stagger")) {
                gsapRef.fromTo(
                    element.children,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Find which animation class it has
                    const classes = ["gsap-fade-up", "gsap-stagger", "gsap-scale", "gsap-fade-right", "gsap-fade-left", "gsap-slide-up-stagger"];
                    for (const cls of classes) {
                        if (el.classList.contains(cls)) {
                            initAnimation(el, cls);
                            observer.unobserve(el);
                            break;
                        }
                    }
                }
            });
        };

        // Delay starting the observer to avoid main thread blocking during critical path
        const timer = setTimeout(() => {
            observer = new IntersectionObserver(handleIntersect, {
                root: null,
                rootMargin: '500px', // Load GSAP a bit before it enters the viewport
                threshold: 0
            });

            const selectors = [
                ".gsap-fade-up",
                ".gsap-stagger",
                ".gsap-scale",
                ".gsap-fade-right",
                ".gsap-fade-left",
                ".gsap-slide-up-stagger"
            ];

            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => observer.observe(el));
            });
        }, 800);

        return () => {
            clearTimeout(timer);
            if (observer) observer.disconnect();
        };
    }, []);

    return null;
}

