"use client";

import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

interface RoadmapViewerProps {
    roadmap: any[];
    benefits?: any;
}

export default function RoadmapViewer({ roadmap, benefits }: RoadmapViewerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 gsap-stagger transition-all duration-300">
            <h4 className="text-2xl font-bold text-brand-darkest mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-brand-darkest text-white flex items-center justify-center text-sm mr-3">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" /></svg>
                </span>
                Program Roadmap
            </h4>

            {isOpen ? (
                <div className="animate-fade-in">
                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 mt-8">
                        {roadmap.map((step, i) => (
                            <div key={i} className="relative pl-12 group">
                                <div className="absolute left-0 top-1.5 w-10 h-10 bg-white border-2 border-brand-accent rounded-full flex items-center justify-center text-brand-accent text-xs font-bold z-10 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                                    {i + 1}
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-brand-accent uppercase tracking-wider mb-1 block">
                                        {step.time}
                                    </span>
                                    <h5 className="text-xl font-bold text-brand-darkest mb-2">{step.phase}</h5>
                                    <p className="text-gray-600 mb-4">{step.desc}</p>

                                    {(step as any).topics && (
                                        <ul className="list-disc list-inside mb-4 text-gray-600 space-y-1">
                                            {(step as any).topics.map((topic: string, k: number) => (
                                                <li key={k} className="text-sm">{topic}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {step.tags.map((tag: string, t: number) => (
                                            <span key={t} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits Section Inside Roadmap */}
                    {benefits && (
                        <div className="bg-brand-lightest/30 rounded-2xl p-6 lg:p-8 border border-brand-accent/20 mt-12 mb-4">
                            <h4 className="text-2xl font-bold text-brand-darkest mb-6 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center text-sm mr-3">
                                    ★
                                </span>
                                {benefits.title}
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                                {benefits.list.map((benefit: string, b: number) => (
                                    <div key={b} className="flex items-start">
                                        <span className="text-brand-accent mr-3 mt-1">✓</span>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            <span className="font-semibold text-brand-darkest">
                                                {benefit.split(':')[0]}:
                                            </span>
                                            {benefit.split(':')[1]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            flushSync(() => {
                                setIsOpen(false);
                            });
                            containerRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' });
                        }}
                        className="w-full py-3 mt-8 border-2 border-brand-accent/20 rounded-xl text-brand-accent font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        Hide Detailed Roadmap
                        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full py-3 mt-2 border-2 border-brand-accent/20 rounded-xl text-brand-accent font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                    View Detailed Roadmap
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            )}
        </div>
    );
}
