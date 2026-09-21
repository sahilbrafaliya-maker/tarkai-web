"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiBookOpen } from "react-icons/fi";
import { programs } from "@/data/programsData";

export default function ProgramOverview() {
    return (
        <section className="bg-white py-10 lg:py-12 relative z-20 border-t border-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-[28px] sm:text-[36px] font-black leading-tight text-brand-darkest tracking-tight">
                        Your AI Career <span className="text-brand-accent">Starts Here</span>
                    </h2>
                    <p className="text-gray-500 text-[15px] mt-3 font-medium max-w-2xl mx-auto">
                        Explore specialized programs, discover your area of interest, and choose the learning path that fits your career aspirations.
                    </p>
                </div>
            </div>
            
            {/* Infinite Marquee Slider */}
            <div className="w-full relative flex whitespace-nowrap overflow-hidden py-4">
                {/* Fade masks for the left and right edges */}
                <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max">
                    {[1, 2].map((group) => (
                        <motion.div 
                            key={group}
                            className="flex shrink-0 gap-4 md:gap-5 pr-4 md:pr-5"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ 
                                repeat: Infinity, 
                                ease: "linear", 
                                duration: 35 // adjust speed here
                            }}
                        >
                            {programs.map((prog, idx) => {
                                const duration = prog.slug.includes('ai-ml') || prog.slug.includes('data-science') ? '6 Months' : '3 Months';
                                const modulesCount = prog.roadmap?.length || (prog.slug.includes('ai-ml') ? 12 : prog.slug.includes('data-science') ? 11 : 8);

                                return (
                                    <div 
                                        key={idx} 
                                        className="group relative overflow-hidden p-5 lg:p-6 rounded-3xl cursor-default flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-accent/20 transition-all duration-300 w-70 md:w-80 h-auto whitespace-normal shrink-0"
                                    >
                                        {/* Active Gradient Glow */}
                                        <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-brand-lightest/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* Inner container */}
                                        <div className="flex flex-col h-full relative z-10">
                                            
                                            {/* Top Section */}
                                            <div className="shrink-0 flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-[18px] lg:text-[20px] font-extrabold leading-snug text-brand-darkest mt-1">
                                                        {prog.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Expanded Content */}
                                            <div className="flex flex-col gap-3 mt-4 flex-1 justify-end">
                                                <div className="pt-3 border-t border-gray-100 relative">
                                                    <div className="flex items-start gap-2">
                                                        <div className="text-brand-accent mt-0.5 shrink-0 flex items-center justify-center text-[15px]">
                                                            {prog.icon}
                                                        </div>
                                                        <p className="text-[13px] lg:text-[14px] font-medium text-gray-700 leading-snug">
                                                            {prog.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {/* Modern Badges for Meta Info */}
                                                <div className="flex flex-wrap gap-2 mt-auto pt-1 pb-1">
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-lightest/40 rounded-full border border-brand-accent/10">
                                                        <FiClock className="text-brand-accent w-3 h-3 md:w-3.5 md:h-3.5" />
                                                        <span className="text-[11px] md:text-[12px] font-bold text-brand-darkest">{duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-lightest/40 rounded-full border border-brand-accent/10">
                                                        <FiBookOpen className="text-brand-accent w-3 h-3 md:w-3.5 md:h-3.5" />
                                                        <span className="text-[11px] md:text-[12px] font-bold text-brand-darkest">{modulesCount} Modules</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-lightest/40 rounded-full border border-brand-accent/10">
                                                        <FiCheckCircle className="text-brand-accent w-3 h-3 md:w-3.5 md:h-3.5" />
                                                        <span className="text-[11px] md:text-[12px] font-bold text-brand-darkest">Founder-led Mentorship</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Premium Accent Border (Left side) */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom" />
                                    </div>
                                );
                            })}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
