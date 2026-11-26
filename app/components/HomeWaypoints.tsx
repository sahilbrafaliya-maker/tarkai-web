"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import GeometricShapes from "./GeometricShapes";

export default function HomeWaypoints() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

    const steps = [
        {
            title: "Discover",
            desc: "We audit your current skills, goals, and industry demands to identify exactly which AI career path will create the most measurable impact for your future."
        },
        {
            title: "Learn",
            desc: "Our expert instructors design the right approach—hands-on coding, cloud tools, or AI integration—based on real-world projects and your actual learning constraints."
        },
        {
            title: "Connect",
            desc: "We build your network by pairing you with industry experts and simulating real workflows, ensuring you collaborate and build alongside the leaders of tomorrow."
        },
        {
            title: "Launch",
            desc: "We deploy your talent directly into the industry with resume optimization, mock interviews, and strategic placement assistance to accelerate your career."
        },
    ];

    return (
        <section ref={sectionRef} className="py-12 sm:py-20 lg:py-28 bg-[#EAF7F7] relative overflow-hidden" id="journey">
            <GeometricShapes variant="your-journey" />
       
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-5xl mx-auto mb-6 sm:mb-16">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                        <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                            Your Journey
                        </div>
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-6">
                        Your Journey with <span className="text-[#20A6A8]">TarkAI EdTech</span>
                    </h2>
                    <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-3xl mx-auto">
                        A clear path from curiosity to mastery. Discover how our structured curriculum takes you from fundamentals to advanced AI applications.
                    </p>
                </div>
            </div>

            {/* Zigzag Timeline Layout */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-4 sm:mt-12">
                <div className="flex flex-col gap-6 lg:gap-8 relative">

                    {steps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        const cardDuration = 0.38;
                        const lineDuration = 0.42;
                        const cardDelay = 0.05 + index * 0.80;
                        const lineDelay = 0.43 + index * 0.80;

                        return (
                            <React.Fragment key={index}>
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                                    transition={{
                                        duration: cardDuration,
                                        delay: cardDelay,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className={`relative z-10 w-full lg:w-[60%] flex ${isEven ? 'self-start' : 'self-end'}`}
                                >
                                    {/* Desktop SVG Connector for Left-to-Right cards (01 -> 02, 03 -> 04) */}
                                    {isEven && index < steps.length - 1 && (
                                        <svg
                                            className="absolute hidden lg:block pointer-events-none -z-10"
                                            style={{ left: '100%', top: '50%', width: '160px', height: '140px' }}
                                            viewBox="0 0 160 140"
                                            fill="none"
                                        >
                                            <defs>
                                                <mask id={`mask-even-${index}`}>
                                                    <motion.path
                                                        d="M -10,0 L 130,0 Q 150,0 150,20 L 150,130"
                                                        stroke="white"
                                                        strokeWidth="12"
                                                        fill="none"
                                                        initial={{ pathLength: 0 }}
                                                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                                        transition={{
                                                            duration: lineDuration,
                                                            delay: lineDelay,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </mask>
                                            </defs>

                                            {/* Background faint dotted track */}
                                            <path
                                                d="M -10,0 L 130,0 Q 150,0 150,20 L 150,130"
                                                stroke="#20A6A8"
                                                strokeWidth="2"
                                                strokeDasharray="4 4"
                                                opacity="0.25"
                                            />

                                            {/* Gradually Filling Dotted Line */}
                                            <path
                                                d="M -10,0 L 130,0 Q 150,0 150,20 L 150,130"
                                                stroke="#20A6A8"
                                                strokeWidth="2.5"
                                                strokeDasharray="4 4"
                                                mask={`url(#mask-even-${index})`}
                                            />

                                            {/* Animated Arrowhead */}
                                            <motion.path
                                                d="M 145,125 L 150,130 L 155,125"
                                                stroke="#20A6A8"
                                                strokeWidth="2.5"
                                                fill="none"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                                transition={{
                                                    delay: lineDelay + 0.36,
                                                    duration: 0.1
                                                }}
                                            />
                                        </svg>
                                    )}

                                    {/* Desktop SVG Connector for Right-to-Left cards (02 -> 03) */}
                                    {!isEven && index < steps.length - 1 && (
                                        <svg
                                            className="absolute hidden lg:block pointer-events-none -z-10"
                                            style={{ right: '100%', top: '50%', width: '160px', height: '140px' }}
                                            viewBox="0 0 160 140"
                                            fill="none"
                                        >
                                            <defs>
                                                <mask id={`mask-odd-${index}`}>
                                                    <motion.path
                                                        d="M 170,0 L 30,0 Q 10,0 10,20 L 10,130"
                                                        stroke="white"
                                                        strokeWidth="12"
                                                        fill="none"
                                                        initial={{ pathLength: 0 }}
                                                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                                        transition={{
                                                            duration: lineDuration,
                                                            delay: lineDelay,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </mask>
                                            </defs>

                                            {/* Background faint dotted track */}
                                            <path
                                                d="M 170,0 L 30,0 Q 10,0 10,20 L 10,130"
                                                stroke="#20A6A8"
                                                strokeWidth="2"
                                                strokeDasharray="4 4"
                                                opacity="0.25"
                                            />

                                            {/* Gradually Filling Dotted Line */}
                                            <path
                                                d="M 170,0 L 30,0 Q 10,0 10,20 L 10,130"
                                                stroke="#20A6A8"
                                                strokeWidth="2.5"
                                                strokeDasharray="4 4"
                                                mask={`url(#mask-odd-${index})`}
                                            />

                                            {/* Animated Arrowhead */}
                                            <motion.path
                                                d="M 5,125 L 10,130 L 15,125"
                                                stroke="#20A6A8"
                                                strokeWidth="2.5"
                                                fill="none"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                                transition={{
                                                    delay: lineDelay + 0.36,
                                                    duration: 0.1
                                                }}
                                            />
                                        </svg>
                                    )}

                                    {/* Card Content */}
                                    <div className="bg-[#20A6A8]/10 w-full rounded-3xl p-5 lg:p-6 flex flex-row items-center gap-4 sm:gap-5 shadow-sm border border-[#20A6A8]/10 transition-colors duration-500">
                                        {/* Left Vertical Pill */}
                                        <div className="w-10 lg:w-11 min-h-24 lg:min-h-28 rounded-full bg-[#20A6A8] flex items-center justify-center shrink-0 shadow-inner">
                                            <span className="-rotate-90 text-white font-mono font-bold text-[11px] lg:text-[12px] tracking-[0.2em] whitespace-nowrap">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        {/* Right Content */}
                                        <div className="flex flex-col flex-1 py-1">
                                            <h3 className="text-lg lg:text-[18px] font-bold text-[#0F1C1E] mb-2">
                                                {step.title}
                                            </h3>

                                            <p className="text-[#4A5568] text-[13px] sm:text-[14px] leading-[1.6]">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Mobile Dotted Connector (between cards vertically) */}
                                {index < steps.length - 1 && (
                                    <div className="flex lg:hidden justify-center my-1 pointer-events-none">
                                        <svg width="24" height="34" viewBox="0 0 24 34" fill="none">
                                            <defs>
                                                <mask id={`mask-mobile-${index}`}>
                                                    <motion.path
                                                        d="M 12,0 L 12,28"
                                                        stroke="white"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        initial={{ pathLength: 0 }}
                                                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                                        transition={{
                                                            duration: lineDuration,
                                                            delay: lineDelay,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                </mask>
                                            </defs>
                                            {/* Background faint track */}
                                            <path d="M 12,0 L 12,28" stroke="#20A6A8" strokeWidth="2" strokeDasharray="4 4" opacity="0.25" />
                                            {/* Filling dotted line */}
                                            <path d="M 12,0 L 12,28" stroke="#20A6A8" strokeWidth="2.5" strokeDasharray="4 4" mask={`url(#mask-mobile-${index})`} />
                                            {/* Mobile Arrowhead */}
                                            <motion.path
                                                d="M 8,24 L 12,28 L 16,24"
                                                stroke="#20A6A8"
                                                strokeWidth="2.5"
                                                fill="none"
                                                initial={{ opacity: 0 }}
                                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                                transition={{
                                                    delay: lineDelay + 0.36,
                                                    duration: 0.1
                                                }}
                                            />
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
