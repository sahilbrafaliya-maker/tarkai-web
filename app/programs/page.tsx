"use client";

import Link from 'next/link';
import { programs } from '@/data/programsData';

export default function ProgramsPage() {
    return (
        <div className="bg-white min-h-screen pt-28">
            <div className="bg-brand-lightest py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-6 gsap-fade-up">AI Education Programs for Career Growth</h1>
                    <p className="text-xl text-brand-dark max-w-3xl mx-auto gsap-fade-up">
                        Choose from a wide range of industry-aligned courses designed to launch your career.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20 lg:space-y-32">
                {programs.map((program, index) => (
                    <div
                        key={index}
                        id={program.slug}
                        className={`flex flex-col lg:flex-row gap-8 lg:gap-20 relative scroll-mt-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        {/* Content Side */}
                        <div className="flex-1 space-y-8">
                            <div className="gsap-fade-up">
                                <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold tracking-wider mb-4 ${program.color}`}>
                                    {program.duration}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-darkest mb-2">{program.title}</h2>
                                <h3 className="text-xl text-brand-accent font-medium mb-6">{program.subtitle}</h3>
                                <div className="space-y-4">
                                    {program.description.slice(0, 2).map((desc, i) => (
                                        <p key={i} className="text-gray-600 text-lg leading-relaxed border-l-4 border-gray-100 pl-4">
                                            {desc}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={`/programs/${program.slug}`}
                                className="inline-flex items-center text-brand-accent font-bold text-lg hover:text-brand-dark transition-colors group"
                            >
                                View Detailed Roadmap
                                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </Link>
                        </div>

                        {/* Sticky Image Side */}
                        <div className="hidden lg:block lg:w-5/12 relative">
                            <div className="sticky top-32 h-[400px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                                <Link href={`/programs/${program.slug}`}>
                                    {/* Visual Representation */}
                                    <div className={`absolute inset-0 ${program.color} opacity-90 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100`}></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-darkest/50 to-transparent"></div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
                                        <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-7xl mb-8 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            {program.icon}
                                        </div>
                                        <h2 className="text-2xl font-black mb-4 leading-tight">{program.title}</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
