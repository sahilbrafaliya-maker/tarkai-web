"use client";

import { motion } from 'framer-motion';

export interface RoadmapViewerProps {
    roadmap: {
        time: string;
        phase: string;
        desc: string;
        topics: string[];
    }[];
    benefits?: {
        title: string;
        list: string[];
    };
}

export default function RoadmapViewer({ roadmap, benefits }: RoadmapViewerProps) {
    return (
        <div className="w-full pb-10">
            {/* Header Section */}
            <div className="flex justify-center items-center mb-16 px-4 sm:px-0">
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-brand-darkest leading-tight tracking-[-0.02em] text-center">
                    Program Roadmap
                </h2>
            </div>

            {/* Zigzag Timeline Container */}
            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6">
                {/* Center Vertical Track (Hidden on mobile) */}
                <div className="hidden md:block absolute left-1/2 top-4 bottom-0 w-0.5 bg-brand-accent/30 -translate-x-1/2 rounded-full"></div>

                {/* Vertical Track for Mobile */}
                <div className="md:hidden absolute left-8 top-4 bottom-0 w-0.5 bg-brand-accent/30 rounded-full"></div>

                {/* Modules */}
                {roadmap.map((step, i) => (
                    <div key={i} className={`relative flex flex-col md:flex-row items-start mb-6 sm:mb-8 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${i > 0 ? 'md:-mt-26 lg:-mt-38' : ''}`}>
                        
                        {/* Timeline Node - Top Aligned */}
                        <div className="absolute left-8 md:left-1/2 top-6 md:top-8 w-10 h-10 bg-white border-2 border-brand-accent rounded-full -translate-x-1/2 z-20 flex items-center justify-center shadow-[0_0_0_4px_rgba(32,166,168,0.15)]">
                            <span className="text-[14px] font-bold text-brand-darkest">{i + 1}</span>
                        </div>

                        {/* Card Content Area */}
                        <div className={`w-full md:w-1/2 pl-16 sm:pl-20 md:pl-0 relative ${i % 2 === 0 ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}>
                            
                            {/* Horizontal Connector Line (Hidden on mobile) - Aligned with Node */}
                            <div className={`hidden md:block absolute top-13 w-6 lg:w-10 h-0.5 bg-brand-accent/30 ${i % 2 === 0 ? 'right-6 lg:right-6' : 'left-6 lg:left-6'}`}></div>

                            {/* Boxed Content Wrapper */}
                            <div className="bg-white rounded-4xl p-6 sm:p-8 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.08)] border border-gray-100 hover:border-brand-accent/30 hover:shadow-[0_8px_30px_-10px_rgba(32,166,168,0.15)] transition-all duration-300 group flex flex-col">
                                <div className="text-[12px] sm:text-[13px] font-bold text-brand-accent uppercase tracking-widest">
                                    Module {i + 1}
                                </div>
                                <h4 className="text-[20px] sm:text-[22px] font-bold text-gray-900 mt-1 leading-tight group-hover:text-brand-accent transition-colors">
                                    {step.phase}
                                </h4>
                                <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mt-3">
                                    {step.desc}
                                </p>
                                
                                {step.topics && (
                                    <ul className="mt-4 space-y-2 text-[14px] text-gray-600">
                                        {step.topics.map((topic: string, k: number) => (
                                            <li key={k} className="flex items-start gap-3">
                                                <span className="text-gray-400 mt-2 text-[6px]">●</span>
                                                <span className="leading-relaxed">{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        
                        {/* Empty Space for the other side */}
                        <div className="hidden md:block md:w-1/2"></div>
                    </div>
                ))}
            </div>
            
            {/* Unified Footer/Benefits */}
            {benefits && (
                <div className="max-w-5xl mx-auto mt-16">
                    <div className="bg-brand-darkest rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
                        
                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[11px] font-bold tracking-widest uppercase mb-6 border border-white/20">The Complete Journey</span>
                            <h3 className="text-3xl sm:text-4xl font-bold mb-6">From Learning to Production</h3>
                            <p className="text-gray-400 text-sm sm:text-base mb-10 leading-relaxed">
                                {benefits.title || "Gain hands-on experience across the full AI lifecycle and build systems that solve real-world problems."}
                            </p>
                            
                            {benefits.list && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                    {benefits.list.map((benefit: string, b: number) => (
                                        <div key={b} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                            <div className="mt-0.5 text-brand-accent">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </div>
                                            <div>
                                                <h5 className="text-[14px] font-bold text-white">{benefit.split(':')[0]}</h5>
                                                <p className="text-[12px] text-gray-400 mt-1">{benefit.split(':')[1] || benefit}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
