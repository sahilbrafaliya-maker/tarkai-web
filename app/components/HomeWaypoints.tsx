"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { FaGraduationCap, FaNetworkWired, FaRocket, FaUsers } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function HomeWaypoints() {
    const container = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(800);

    // Measure height on mount and resize to ensure 1:1 aspect ratio (no distortion)
    useEffect(() => {
        const updateHeight = () => {
            if (container.current) {
                setSvgHeight(container.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".waypoint-box");

        // Animate boxes: "Down Opacity" - Fade in and slide down slightly
        items.forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, y: -50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 1,
                    }
                }
            );
        });

        // Motion Path Animation
        // We'll animate a dot along the central SVG line
        if (svgHeight > 0) {
            gsap.killTweensOf("#home-follower-dot"); // Safety cleanup

            gsap.to("#home-follower-dot", {
                scrollTrigger: {
                    trigger: "#home-waypoints-svg",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
                motionPath: {
                    path: "#home-motion-path",
                    align: "#home-motion-path",
                    alignOrigin: [0.5, 0.5],
                },
                ease: "none"
            });

            // Draw the path itself
            gsap.fromTo("#home-motion-path",
                { strokeDasharray: svgHeight, strokeDashoffset: svgHeight },
                {
                    strokeDashoffset: "0",
                    scrollTrigger: {
                        trigger: "#home-waypoints-svg",
                        start: "top center",
                        end: "bottom center",
                        scrub: 1
                    }
                }
            );
        }

    }, { scope: container, dependencies: [svgHeight] });

    // Dynamic path generation based on height to maintain curve shape but fit container
    const curvePoints = `M 50 20
                         C 50 ${svgHeight * 0.1} 80 ${svgHeight * 0.2} 50 ${svgHeight * 0.3}
                         C 20 ${svgHeight * 0.4} 50 ${svgHeight * 0.5} 50 ${svgHeight * 0.6}
                         C 80 ${svgHeight * 0.7} 50 ${svgHeight * 0.8} 50 ${svgHeight - 20}`;

    const steps = [
        {
            icon: <FaNetworkWired />,
            title: "Discover",
            desc: "Explore AI-driven career paths tailored to your potential.",
        },
        {
            icon: <FaGraduationCap />,
            title: "Learn",
            desc: "Master skills with our intelligent, adaptive curriculum.",
        },
        {
            icon: <FaUsers />,
            title: "Connect",
            desc: "Join a community of builders and future leaders.",
        },
        {
            icon: <FaRocket />,
            title: "Launch",
            desc: "Deploy your skills and accelerate your career.",
        },
    ];

    return (
        <section ref={container} className="relative py-12 bg-brand-lightest overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-darkest mb-4">
                        Your Journey with TarkAI
                    </h2>
                    <p className="text-lg text-brand-dark max-w-2xl mx-auto">
                        A clear path from curiosity to mastery.
                    </p>
                </div>

                <div className="relative">
                    {/* Central SVG Path Container */}
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-20 md:w-32 h-full z-0 hidden md:block">
                        <svg id="home-waypoints-svg" className="w-full h-full" viewBox={`0 0 100 ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                            <path
                                id="home-motion-path"
                                d={curvePoints}
                                fill="none"
                                stroke="#2DA5A3"
                                strokeWidth="4"
                                strokeOpacity="0.3"
                            />
                            <circle
                                id="home-follower-dot"
                                r="10"
                                fill="#2DA5A3"
                                className="shadow-lg shadow-brand-accent ml-[-10px]"
                            />
                        </svg>
                    </div>

                    {/* Content Boxes */}
                    <div className="space-y-12 relative z-10">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 md:gap-0`}
                            >
                                {/* Text Box side */}
                                <div className="w-full md:w-1/2 px-4 md:px-12">
                                    <div className="waypoint-box bg-white/60 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-xl hover:bg-white/80 transition-all duration-300">
                                        <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-3xl text-brand-accent mb-6">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-darkest mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-brand-dark leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Spacer for the central line */}
                                <div className="w-full md:w-1/2 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
