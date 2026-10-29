"use client";

import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { programs } from '@/data/programsData';
import PageHeader from '../components/PageHeader';
import ProgramOverview from '../components/ProgramOverview';
import dynamic from 'next/dynamic';

const ProgramModal = dynamic(() => import('./components/ProgramModal'), { ssr: false });

export default function ProgramsPage() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        const t1 = setTimeout(() => lenis.resize(), 100);
        const t2 = setTimeout(() => lenis.resize(), 500);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [lenis]);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'brochure' | 'enroll'>('brochure');
    const [activeProgramTitle, setActiveProgramTitle] = useState('');
    const [activeBrochureUrl, setActiveBrochureUrl] = useState<string | undefined>(undefined);

    const handleOpenModal = (type: 'brochure' | 'enroll', programTitle: string, brochureUrl?: string) => {
        setModalType(type);
        setActiveProgramTitle(programTitle);
        setActiveBrochureUrl(brochureUrl);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 2 larger comprehensive career programs on the left, remaining 9 on the right
    const largerPrograms = programs.slice(0, 2);
    const smallerPrograms = programs.slice(2);

    return (
        <div className="bg-[#FAFAFA] min-h-screen relative">
            {/* Animated Data Grid Background for Hero Area */}
            <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_60%_at_50%_10%,#000_70%,transparent_100%)]"></div>
                <motion.div
                    animate={{ y: [0, -100, 0] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-light/10 blur-[100px] rounded-full"
                ></motion.div>
                <motion.div
                    animate={{ y: [0, 100, 0] }}
                    transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                    className="absolute top-[10%] -right-[10%] w-[40%] h-[60%] bg-brand-accent/5 blur-[120px] rounded-full"
                ></motion.div>
            </div>

            <div className="relative z-10">
                <PageHeader
                    badge="OUR PROGRAMS"
                    title={<>AI Education Programs for <span className="text-[#20A6A8] relative inline-block">Career Growth</span></>}
                    description="Choose from a wide range of industry-aligned courses designed to launch your career."
                />
            </div>

            {/* Program Quick Comparison Grid */}
            <div className="mb-4 sm:mb-12 relative z-20">
                <ProgramOverview />
            </div>

            {/* Main Programs 2-Column Section */}
            <section className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-6 sm:py-10 lg:py-14 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    
                    {/* Left Column: Larger Programs (Original size preserved) */}
                    <div className="lg:col-span-7 space-y-5 sm:space-y-6 lg:sticky lg:top-[min(5rem,calc(100vh-100%-2rem))] self-start">
                        <div className="pb-3 border-b border-gray-200/80 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-brand-darkest tracking-tight">
                                Comprehensive Career Programs
                            </h3>
                        </div>

                        {largerPrograms.map((program, index) => {
                            const shortId = program.slug
                                .replace(/-program$/, '')
                                .replace(/-strategic-analytics$/, '')
                                .replace(/-climate-analytics$/, '')
                                .replace(/-ai-foundation$/, '');

                            return (
                                <div
                                    key={program.slug}
                                    id={program.slug}
                                    data-anchor={shortId}
                                    className="group bg-white rounded-2xl border border-gray-200/90 hover:border-brand-accent/40 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col scroll-mt-24"
                                >
                                    {/* Large Image at the Top - Original size */}
                                    <div className="relative w-full aspect-video sm:aspect-16/10 bg-gray-100 overflow-hidden">
                                        {typeof (program as any).image === 'string' && (
                                            <Image
                                                src={(program as any).image}
                                                alt={program.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                draggable={false}
                                                sizes="(max-width: 1024px) 100vw, 58vw"
                                            />
                                        )}
                                        {/* Subtle overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                                        {/* Top Badges */}
                                        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] sm:text-xs font-bold text-brand-darkest uppercase tracking-wider shadow-xs border border-white/60 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                                                Program {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Top Right Duration Pill */}
                                        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                                            <div className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-brand-darkest shadow-md border border-white/60 flex items-center gap-1.5">
                                                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-500 font-bold">Duration:</span>
                                                <span className="text-xs sm:text-sm font-black text-brand-accent">{program.duration}</span>
                                            </div>
                                        </div>

                                        {/* Bottom Subtitle on Image */}
                                        <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 z-10">
                                            <p className="text-xs sm:text-sm font-semibold text-white/90 drop-shadow-md line-clamp-1">
                                                {program.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Text Content Below - Reduced left & right padding */}
                                    <div className="px-4 py-4 sm:px-5 sm:py-5 flex flex-col flex-1 justify-between">
                                        <div>
                                            <h4 className="text-xl sm:text-2xl lg:text-[23px] font-bold text-brand-darkest leading-snug tracking-tight mb-2 group-hover:text-brand-accent transition-colors">
                                                {program.title}
                                            </h4>

                                            {/* Key highlights / descriptions */}
                                            <div className="space-y-2 sm:space-y-2.5 my-3">
                                                {program.description.slice(0, 3).map((desc, dIdx) => (
                                                    <div key={dIdx} className="flex items-start gap-2.5 text-gray-600 text-[13px] sm:text-sm leading-relaxed">
                                                        <div className="mt-1 w-4 h-4 rounded-full bg-brand-lightest/80 flex items-center justify-center shrink-0 text-brand-accent">
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium text-gray-700">{desc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="pt-3.5 border-t border-gray-100 flex flex-wrap items-center gap-2.5 sm:gap-3 mt-3.5">
                                            <button
                                                onClick={() => handleOpenModal('enroll', program.title)}
                                                className="px-4.5 py-2 sm:px-5.5 sm:py-2.5 bg-brand-accent text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-brand-dark transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                            >
                                                Enroll Now
                                            </button>
                                            <button
                                                onClick={() => handleOpenModal('brochure', program.title, (program as any).brochure)}
                                                className="px-3.5 py-2 sm:px-4.5 sm:py-2.5 bg-white border border-gray-200 text-brand-darkest text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5 shadow-xs active:scale-95 cursor-pointer"
                                            >
                                                Brochure
                                                <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </button>
                                            <Link
                                                href={`/programs/${program.slug}`}
                                                className="inline-flex items-center text-xs sm:text-sm font-semibold text-brand-accent hover:text-brand-dark transition-colors ml-auto group/link cursor-pointer"
                                            >
                                                View Detailed
                                                <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Smaller Programs (List format with small image on left, text on right) */}
                    <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
                        <div className="pb-3 border-b border-gray-200/80 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-brand-darkest tracking-tight">
                                Specialized & Modular Programs
                            </h3>
                        </div>

                        {smallerPrograms.map((program, index) => {
                            const shortId = program.slug
                                .replace(/-program$/, '')
                                .replace(/-strategic-analytics$/, '')
                                .replace(/-climate-analytics$/, '')
                                .replace(/-ai-foundation$/, '');

                            return (
                                <div
                                    key={program.slug}
                                    id={program.slug}
                                    data-anchor={shortId}
                                    className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200/90 hover:border-brand-accent/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch scroll-mt-24"
                                >
                                    {/* Small Image on Left - Flush without extra spacing around image */}
                                    <div className="relative w-full sm:w-48 md:w-56 lg:w-44 xl:w-52 h-44 sm:h-auto min-h-36.25 sm:min-h-41.25 bg-gray-100 overflow-hidden shrink-0">
                                        {typeof (program as any).image === 'string' && (
                                            <Image
                                                src={(program as any).image}
                                                alt={program.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                draggable={false}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 220px, 208px"
                                            />
                                        )}
                                        <div className="absolute top-2 left-2 z-10">
                                            <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-bold text-brand-darkest uppercase shadow-xs border border-white/60">
                                                {String(index + largerPrograms.length + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Text Content on Right with reduced padding */}
                                    <div className="px-3 py-3 sm:px-3.5 sm:py-3.5 flex flex-col justify-between flex-1 min-w-0">
                                        <div>
                                            {/* Meta Tags: Duration & Fee */}
                                            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                                <span className="px-2 py-0.5 rounded-md bg-brand-lightest/60 border border-brand-accent/20 text-[11px] font-bold text-brand-dark">
                                                    {program.duration}
                                                </span>
                                                {(program as any).fee && (
                                                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                                                        {(program as any).fee}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-brand-darkest leading-snug group-hover:text-brand-accent transition-colors line-clamp-1">
                                                {program.title}
                                            </h4>

                                            {/* Enhanced Subtitle with High Readability */}
                                            <p className="text-[13px] sm:text-[13.5px] text-[#186474] font-semibold leading-snug mt-1 mb-1">
                                                {program.subtitle}
                                            </p>

                                            {/* Snippet Description */}
                                            {program.description && program.description[0] && (
                                                <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed font-normal">
                                                    {program.description[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Bottom Actions */}
                                        <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => handleOpenModal('enroll', program.title)}
                                                    className="px-2.5 py-1 bg-brand-accent text-white text-[11px] font-semibold rounded-md hover:bg-brand-dark transition-colors cursor-pointer"
                                                >
                                                    Enroll
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal('brochure', program.title, (program as any).brochure)}
                                                    className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:text-brand-accent hover:border-brand-accent text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                                                >
                                                    Brochure
                                                </button>
                                            </div>
                                            <Link
                                                href={`/programs/${program.slug}`}
                                                className="text-[11px] font-semibold text-brand-accent hover:text-brand-dark inline-flex items-center gap-0.5 group/arrow cursor-pointer"
                                            >
                                                View
                                                <svg className="w-3 h-3 transform group-hover/arrow:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            <ProgramModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                modalType={modalType}
                activeProgramTitle={activeProgramTitle}
                activeBrochureUrl={activeBrochureUrl}
            />
        </div>
    );
}
