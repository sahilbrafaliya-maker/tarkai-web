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

function getBenefitIcon(title: string, index: number) {
    const lower = title.toLowerCase();

    // 1. Resume / ATS
    if (lower.includes('resume') || lower.includes('cv') || index === 0) {
        return (
            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        );
    }

    // 2. Mock Interviews
    if (lower.includes('interview') || index === 1) {
        return (
            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        );
    }

    // 3. Mentorship
    if (lower.includes('mentor') || lower.includes('guidance') || index === 2) {
        return (
            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        );
    }

    // 4. Portfolio Building
    if (lower.includes('portfolio') || lower.includes('project') || index === 3) {
        return (
            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        );
    }

    // 5. LinkedIn Profile Optimization
    if (lower.includes('linkedin') || lower.includes('profile') || index === 4) {
        return (
            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        );
    }

    // 6. Placement Readiness Support / Career Launch
    return (
        <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    );
}

export function CompleteJourney({ benefits }: { benefits?: RoadmapViewerProps['benefits'] }) {
    if (!benefits) return null;

    return (
        <section className="py-8 sm:py-12 lg:py-14 bg-white relative overflow-hidden mt-6 sm:mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                        <div className="w-5 sm:w-8 h-px bg-[#20A6A8]/40"></div>
                        <div className="px-3.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[10.5px] sm:text-[11.5px] font-bold tracking-widest uppercase">
                            The Complete Journey
                        </div>
                        <div className="w-5 sm:w-8 h-px bg-[#20A6A8]/40"></div>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-[#0F1C1E] mb-2 sm:mb-3">
                        From Learning to Production
                    </h3>
                    <p className="text-[13px] sm:text-[15px] text-[#4D666D] leading-relaxed max-w-2xl mx-auto">
                        {benefits.title || "Gain hands-on experience across the full AI lifecycle and build systems that solve real-world industry problems."}
                    </p>
                </div>

                {/* Cards Grid - 4 Cards in a single row on desktop */}
                {benefits.list && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 max-w-7xl mx-auto items-stretch">
                        {benefits.list.map((benefit: string, b: number) => {
                            const colonIndex = benefit.indexOf(':');
                            const hasColon = colonIndex !== -1;
                            const title = hasColon ? benefit.substring(0, colonIndex).trim() : benefit;
                            const desc = hasColon ? benefit.substring(colonIndex + 1).trim() : '';
                            return (
                                <div
                                    key={b}
                                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#20A6A8]/15 shadow-xs hover:shadow-md hover:border-[#20A6A8]/35 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group h-full"
                                >
                                    <div>
                                        {/* Distinct Icon badge */}
                                        <div className="mb-3">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-br from-[#20A6A8]/15 to-[#20A6A8]/5 text-[#20A6A8] border border-[#20A6A8]/20 flex items-center justify-center shrink-0 group-hover:bg-[#20A6A8] group-hover:text-white transition-all duration-300 shadow-xs">
                                                {getBenefitIcon(title, b)}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0F1C1E] leading-snug group-hover:text-[#186474] transition-colors">
                                            {title}
                                        </h4>

                                        {/* Description */}
                                        {desc && (
                                            <p className="text-[12px] sm:text-[13px] text-slate-600 mt-1.5 leading-relaxed font-normal">
                                                {desc}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default function RoadmapViewer({ roadmap, benefits }: RoadmapViewerProps) {
    return (
        <div className="w-full pb-4 sm:pb-8">
            {/* Header Section */}
            <div className="flex justify-center items-center mb-5 sm:mb-16 px-4 sm:px-0">
                <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-brand-darkest leading-tight tracking-[-0.02em] text-center">
                    Program Roadmap
                </h2>
            </div>

            {/* Zigzag Timeline Container */}
            <div className="relative w-full max-w-5xl mx-auto px-0 sm:px-6">
                {/* Center Vertical Track (Hidden on mobile) */}
                <div className="hidden md:block absolute left-1/2 top-4 bottom-0 w-0.5 bg-brand-accent/30 -translate-x-1/2 rounded-full"></div>

                {/* Vertical Track for Mobile */}
                <div className="md:hidden absolute left-3.5 sm:left-6 top-3.5 bottom-8 w-0.5 bg-brand-accent/30 rounded-full"></div>

                {/* Modules */}
                {roadmap.map((step, i) => (
                    <div key={i} className={`relative flex flex-col md:flex-row items-start mb-4 sm:mb-8 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${i > 0 ? 'md:-mt-26 lg:-mt-38' : ''}`}>
                        
                        {/* Timeline Node - Top Aligned */}
                        <div className="absolute left-3.5 sm:left-6 md:left-1/2 top-3 sm:top-5 md:top-8 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white border-2 border-brand-accent rounded-full -translate-x-1/2 z-20 flex items-center justify-center shadow-[0_0_0_4px_rgba(32,166,168,0.15)]">
                            <span className="text-[11px] sm:text-[12px] md:text-[14px] font-bold text-brand-darkest">{i + 1}</span>
                        </div>

                        {/* Card Content Area */}
                        <div className={`w-full md:w-1/2 pl-8 sm:pl-16 md:pl-0 relative ${i % 2 === 0 ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}>
                            
                            {/* Horizontal Connector Line (Hidden on mobile) - Aligned with Node */}
                            <div className={`hidden md:block absolute top-13 w-6 lg:w-10 h-0.5 bg-brand-accent/30 ${i % 2 === 0 ? 'right-6 lg:right-6' : 'left-6 lg:left-6'}`}></div>

                            {/* Boxed Content Wrapper */}
                            <div className="bg-white rounded-2xl sm:rounded-4xl p-3.5 sm:p-6 lg:p-8 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.08)] border border-gray-100 hover:border-brand-accent/30 hover:shadow-[0_8px_30px_-10px_rgba(32,166,168,0.15)] transition-all duration-300 group flex flex-col">
                                <div className="text-[11px] sm:text-[13px] font-bold text-brand-accent uppercase tracking-widest">
                                    Module {i + 1}
                                </div>
                                <h4 className="text-[16px] sm:text-[22px] font-bold text-gray-900 mt-1 leading-snug group-hover:text-brand-accent transition-colors">
                                    {step.phase}
                                </h4>
                                <p className="text-gray-600 text-[13px] sm:text-[15px] leading-relaxed mt-1.5 sm:mt-3">
                                    {step.desc}
                                </p>
                                
                                {step.topics && (
                                    <ul className="mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2 text-[12px] sm:text-[14px] text-gray-600">
                                        {step.topics.map((topic: string, k: number) => (
                                            <li key={k} className="flex items-start gap-2 sm:gap-3">
                                                <span className="text-gray-400 mt-1.5 text-[6px] shrink-0">●</span>
                                                <span className="leading-snug sm:leading-relaxed wrap-break-word">{topic}</span>
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
            
            {/* Unified Footer/Benefits (Fallback if passed directly to RoadmapViewer) */}
            {benefits && (
                <CompleteJourney benefits={benefits} />
            )}
        </div>
    );
}
