"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { programs } from '@/data/programsData';
import PageHeader from '../components/PageHeader';
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FiDownload } from 'react-icons/fi';
import BackgroundText from '../components/BackgroundText';
import ProgramOverview from '../components/ProgramOverview';
import dynamic from 'next/dynamic';

const GeometricShapes = dynamic(() => import('../components/GeometricShapes'));
const ProgramModal = dynamic(() => import('./components/ProgramModal'), { ssr: false });

export default function ProgramsPage() {
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'brochure' | 'enroll'>('brochure');
    const [activeProgramTitle, setActiveProgramTitle] = useState('');

    const handleOpenModal = (type: 'brochure' | 'enroll', programTitle: string) => {
        setModalType(type);
        setActiveProgramTitle(programTitle);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen relative overflow-hidden">
            <GeometricShapes hideTopLeftHexagon={true} hideTriangle={true} variant="page-background" />
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
            <div className="mb-16 relative z-20">
                <ProgramOverview />
            </div>

            {/* Main Program Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 space-y-32 lg:space-y-48">
                {programs.map((program, index) => (
                    <div key={index} id={program.slug} className="relative group/section">
                        {/* Huge faint background number */}
                        <motion.div
                            initial={{ opacity: 0, x: -50, scale: 0.8 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute -top-16 lg:-top-24 -left-4 lg:-left-12 text-[150px] lg:text-[250px] font-black text-transparent bg-clip-text bg-linear-to-b from-gray-900/5 to-transparent select-none pointer-events-none leading-none z-0"
                        >
                            {String(index + 1).padStart(2, '0')}
                        </motion.div>

                        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Visual Image Section */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}  
                                className="w-full lg:w-5/12 relative"
                            >
                                <div className="aspect-4/3 rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
                                    <div className="absolute inset-0 bg-brand-darkest/10 mix-blend-overlay z-10 transition-opacity duration-700 group-hover/section:opacity-0"></div>
                                    {typeof (program as any).image === 'string' && (
                                        <Image
                                            src={(program as any).image}
                                            alt={program.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover/section:scale-105"
                                            draggable={false}
                                        />
                                    )}
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="absolute -bottom-6 -right-6 sm:bottom-auto sm:top-10 sm:-right-10 px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white z-20 flex flex-col items-center sm:items-start group-hover/section:-translate-y-2 transition-transform duration-500"
                                >
                                    <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Duration</span>
                                    <span className="text-[18px] font-black bg-clip-text text-transparent bg-linear-to-r from-brand-darkest to-brand-accent">{program.duration}</span>
                                </motion.div>
                            </motion.div>

                            {/* Content Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full lg:w-7/12 flex flex-col justify-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-brand-lightest/40 border border-brand-accent/20 backdrop-blur-sm self-start"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                                    </span>
                                    <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-brand-darkest">Program {String(index + 1).padStart(2, '0')}</span>
                                </motion.div>

                                <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[1.15] tracking-tight text-brand-darkest mb-4">
                                    {program.title.split(' ').map((word, wIdx, arr) =>
                                        wIdx === arr.length - 1 ? (
                                            <span key={wIdx} className="text-transparent bg-clip-text bg-linear-to-r from-brand-accent to-[#157a7b]">{word}</span>
                                        ) : (
                                            <span key={wIdx}>{word} </span>
                                        )
                                    )}
                                </h2>

                                <h3 className="text-[16px] lg:text-[18px] font-bold leading-relaxed text-gray-700 mb-6 max-w-2xl border-l-4 border-brand-accent pl-4 bg-linear-to-r from-brand-lightest/30 to-transparent py-1.5">
                                    {program.subtitle}
                                </h3>

                                <div className="space-y-4 mb-8 max-w-2xl">
                                    {program.description.slice(0, 2).map((desc, i) => (
                                        <div key={i} className="flex gap-3.5 items-start group/desc">
                                            <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-lightest flex items-center justify-center shrink-0 group-hover/desc:bg-brand-accent transition-colors duration-300 shadow-sm border border-brand-accent/10">
                                                <svg className="w-3 h-3 text-brand-accent group-hover/desc:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <p className="text-[14px] sm:text-[15px] font-semibold leading-[1.7] text-gray-600 group-hover/desc:text-gray-900 transition-colors duration-300">
                                                {desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 items-center">
                                    <button
                                        onClick={() => handleOpenModal('enroll', program.title)}
                                        className="px-8 py-3.5 bg-brand-accent text-white text-[15px] font-semibold rounded-xl hover:bg-brand-dark transition-all duration-300 shadow-[0_8px_20px_rgba(45,165,163,0.25)] hover:shadow-[0_8px_25px_rgba(45,165,163,0.35)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                    >
                                        Enroll Now
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal('brochure', program.title)}
                                        className="px-8 py-3.5 bg-white border border-gray-200 text-brand-darkest text-[15px] font-semibold rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 shadow-sm hover:shadow-md active:scale-95 group/btn cursor-pointer"
                                    >
                                        Download Brochure
                                        <svg className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    </button>
                                    <Link
                                        href={`/programs/${program.slug}`}
                                        className="inline-flex items-center text-[15px] font-semibold text-brand-accent hover:text-brand-dark transition-colors group/link ml-2 sm:ml-4 cursor-pointer"
                                    >
                                        View Detailed
                                        <svg className="w-5 h-5 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Subtle Divider between sections (don't show on last item) */}
                        {index < programs.length - 1 && (
                            <div className="absolute -bottom-16 lg:-bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg flex justify-center opacity-40">
                                <div className="h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <ProgramModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                modalType={modalType}
                activeProgramTitle={activeProgramTitle}
            />
        </div>
    );
}
