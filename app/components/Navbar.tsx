"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
    FaBars, 
    FaTimes, 
    FaChevronDown, 
    FaBriefcase, 
    FaArrowRight,
    FaCheck,
    FaStar
} from 'react-icons/fa';
import { 
    FaChevronRight, 
    FaBrain, 
    FaRobot,
    FaChartLine, 
    FaDatabase,
    FaCode, 
    FaLightbulb,
    FaLeaf,
    FaWandMagicSparkles
} from 'react-icons/fa6';
import { motion, AnimatePresence, Variants } from 'motion/react';

const PROGRAMS = [
    {
        id: 'ai-ml-architect-program',
        name: 'AI / ML Architect Program',
        title: 'AI / ML Architect Program',
        subtitle: 'Full-Stack Artificial Intelligence Engineering',
        tagline: 'From Agentic AI systems to production MLOps architectures',
        duration: '7 Months',
        level: 'Advanced',
        badge: 'Flagship Program',
        icon: <FaBrain className="text-sm" />,
        image: '/AI_ML_Architect_Program.jfif',
        desc: 'A flagship 7-month immersion that builds rock-solid data foundations, levels up your model intuition, and ends with production-ready LLM and agentic systems.',
        highlights: [
            '12 Deep Modules (DBMS, Python, Deep Learning, LLMs, Agentic AI, MLOps)',
            'Production LLM Fine-Tuning & Multi-Agent Swarms',
            'AWS Cloud Deployment, Docker & Real-World System Design',
            '1-Month Placement Ready Program Included'
        ],
        skills: ['Agentic AI', 'LLMs & RAG', 'MLOps', 'PyTorch', 'AWS', 'Docker'],
        href: '/programs/ai-ml-architect-program',
        featured: true,
    },
    {
        id: 'data-science-strategic-analytics',
        name: 'Data Science & Strategic Analytics',
        title: 'Data Science & Strategic Analytics',
        subtitle: 'From Raw Data to Business Intelligence',
        tagline: 'Transform enterprise datasets into predictive ML intelligence',
        duration: '7 Months',
        level: 'Career Track',
        badge: 'In-Demand',
        icon: <FaChartLine className="text-sm" />,
        image: '/Data_Science.jfif',
        desc: 'Transform into the data partner every leadership team craves—tell compelling stories with data, automate insight pipelines, and launch ML-powered decisions.',
        highlights: [
            '12 Practical Modules (Python, SQL, Math, Statistics, EDA, BI Dashboards)',
            'Spark ML, Distributed Big Data & Predictive Algorithms',
            'Executive Boardroom Storytelling with Power BI & Tableau',
            '1-Month Placement Ready Program Included'
        ],
        skills: ['Python', 'SQL', 'Spark ML', 'Power BI', 'Predictive ML', 'Statistics'],
        href: '/programs/data-science-strategic-analytics',
        featured: false,
    },
    {
        id: 'future-founders-ai-foundation',
        name: 'Future Founders – AI Foundation',
        title: 'Future Founders – AI Foundation',
        subtitle: 'Digital Literacy & Coding for the Next Generation',
        tagline: 'Zero-to-one coding sprints and AI MVP builder launchpad',
        duration: '3 Months',
        level: 'Foundations',
        badge: 'Beginner Friendly',
        icon: <FaCode className="text-sm" />,
        image: '/AI_Foundation.png',
        desc: 'A playful-yet-powerful launchpad for teens and first-time builders—learn digital fluency, code creatively, and demo AI ideas with confidence.',
        highlights: [
            '8 Interactive Modules (Digital Literacy, Algorithms, Scratch & Python)',
            'Zero-to-One Startup MVP Prototyping Sprints',
            'Responsible AI Usage, Digital Ethics & Career Pathways',
            'Hands-on Capstone AI Demo Day Launch'
        ],
        skills: ['Python Basics', 'Scratch', 'Generative AI', 'Algorithms', 'Data Viz'],
        href: '/programs/future-founders-ai-foundation',
        featured: false,
    },
    {
        id: 'green-intelligence-climate-analytics',
        name: 'Green Intelligence – Climate Analytics',
        title: 'Green Intelligence – Climate Analytics',
        subtitle: 'Specialization in Carbon Markets & ESG Data',
        tagline: 'Accelerating sustainability transitions through climate data analytics',
        duration: '3 Months',
        level: 'Specialized Track',
        badge: 'Emerging Track',
        icon: <FaLeaf className="text-sm" />,
        image: '/Climate_Analytics.jfif',
        desc: 'Blend climate science with data craftsmanship to decode carbon markets, verify emissions, and advise on ESG action plans.',
        highlights: [
            '8 Domain Modules (Climate Science, Emissions Data, Carbon Accounting)',
            'Compliance & Voluntary Carbon Markets (EU ETS, India ICM)',
            'Scope 1, 2 & 3 Corporate GHG Accounting & ESG Dashboards',
            'MRV Verification Standards (GHG Protocol, ISO 14064)'
        ],
        skills: ['Carbon Markets', 'ESG Data', 'Emissions Analytics', 'GHG Protocol', 'Python'],
        href: '/programs/green-intelligence-climate-analytics',
        featured: false,
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState(false);
    const [activeProgramId, setActiveProgramId] = useState(PROGRAMS[0].id);
    const [mobileMasterExpanded, setMobileMasterExpanded] = useState(false);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Feature: Check if we are on the home page for specific styles
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const selectedProgram = PROGRAMS.find((p) => p.id === activeProgramId) || PROGRAMS[0];

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY;

                // Determine if we've scrolled enough to change background
                if (currentScrollY > 20) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }

                if (currentScrollY > lastScrollY && currentScrollY > 50) {
                    setIsVisible(false);
                    setIsMobileMenuOpen(false);
                    setIsMasterDropdownOpen(false);
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(currentScrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    const handleMouseEnterDropdown = () => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setIsMasterDropdownOpen(true);
    };

    const handleMouseLeaveDropdown = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setIsMasterDropdownOpen(false);
        }, 150);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'} ${isScrolled ? 'top-4' : 'top-0'}`}>
            <motion.div
                initial={isHome ? "hidden" : "visible"}
                animate="visible"
                variants={containerVariants}
                className={`flex justify-between items-center relative transition-all duration-500 ease-in-out px-6 ${isScrolled
                    ? 'w-[95%] max-w-5xl h-16 rounded-full bg-brand-lightest/80 backdrop-blur-xl shadow-lg shadow-brand-dark/5'
                    : 'w-full max-w-7xl h-24 bg-transparent'
                    }`}
            >

                {/* Logo - Left Aligned */}
                <motion.div variants={itemVariants} className="shrink-0 flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/Logo.png"
                            alt="TarkAI Logo"
                            width={140}
                            height={50}
                            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-10' : 'h-16'}`}
                            priority
                            draggable={false}
                        />
                    </Link>
                </motion.div>

                {/* Navigation Links - Centered (Desktop) */}
                <div className={`hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 ${isScrolled ? 'gap-1' : 'gap-2'}`}>
                    
                    {/* 1. Programs (Disabled / Coming Soon) */}
                    <div className="relative px-3.5 py-1.5 rounded-full text-sm font-semibold text-gray-400 cursor-not-allowed flex items-center gap-1.5 select-none opacity-60">
                        <span>Programs</span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-gray-200/90 text-gray-600 tracking-wider">
                            Soon
                        </span>
                    </div>

                    {/* 2. Master Program with 90% Width Mega Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnterDropdown}
                        onMouseLeave={handleMouseLeaveDropdown}
                    >
                        <Link
                            href="/programs"
                            onClick={() => setIsMasterDropdownOpen(false)}
                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                                pathname.startsWith('/programs') || isMasterDropdownOpen 
                                    ? 'text-brand-accent font-bold' 
                                    : 'text-brand-dark hover:text-brand-darkest'
                            }`}
                        >
                            <span>Master Program</span>
                            <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isMasterDropdownOpen ? 'rotate-180 text-brand-accent' : 'text-gray-400'}`} />
                        </Link>

                        {/* Executive Mega Dropdown Menu */}
                        <AnimatePresence>
                            {isMasterDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.99 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                    className={`fixed left-1/2 -translate-x-1/2 ${isScrolled ? 'top-[66px]' : 'top-[64px]'} w-[92vw] max-w-6xl rounded-[24px] bg-white/98 backdrop-blur-2xl border border-brand-accent/20 shadow-[0_25px_80px_rgba(0,35,51,0.18)] p-6 z-50 text-left overflow-hidden`}
                                >
                                    {/* Invisible Hover Bridge */}
                                    <div className="absolute -top-6 left-0 right-0 h-6 pointer-events-auto" />

                                    {/* Subtle Ambient Brand Glow */}
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/8 rounded-full blur-[100px] pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/8 rounded-full blur-[100px] pointer-events-none" />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-stretch min-h-[320px]">

                                        {/* Left 4-Program Rail */}
                                        <div className="w-full md:w-72 lg:w-80 shrink-0 flex flex-row md:flex-col gap-2 border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-4 overflow-x-auto md:overflow-visible">
                                            <div className="hidden md:block px-3 py-1 mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                                                    Cohort Programs (4)
                                                </span>
                                            </div>

                                            {PROGRAMS.map((prog) => {
                                                const isActive = activeProgramId === prog.id;
                                                return (
                                                    <Link
                                                        key={prog.id}
                                                        href={prog.href}
                                                        onMouseEnter={() => setActiveProgramId(prog.id)}
                                                        onClick={() => setIsMasterDropdownOpen(false)}
                                                        className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap text-left group ${
                                                            isActive
                                                                ? 'bg-brand-accent/10 text-brand-darkest border border-brand-accent/30 shadow-xs'
                                                                : 'bg-transparent hover:bg-gray-50 text-gray-700 hover:text-brand-darkest border border-transparent'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                                                isActive 
                                                                    ? 'bg-brand-accent text-white shadow-xs' 
                                                                    : 'bg-gray-100 text-gray-600 group-hover:bg-brand-accent/10 group-hover:text-brand-accent'
                                                            }`}>
                                                                {prog.icon}
                                                            </div>
                                                            <div className="min-w-0 truncate">
                                                                <span className="truncate block font-black text-[13px]">{prog.title}</span>
                                                                <span className="text-[11px] font-semibold text-gray-400 group-hover:text-brand-accent block">
                                                                    {prog.duration} • {prog.badge}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <FaChevronRight className={`text-[10px] shrink-0 ml-2 transition-transform duration-200 ${
                                                            isActive ? 'text-brand-accent translate-x-0.5' : 'text-gray-300 opacity-0 md:opacity-100 group-hover:text-gray-500'
                                                        }`} />
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        {/* Right Showcase: Selected Program Spotlight */}
                                        <div className="flex-1 min-w-0">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={selectedProgram.id}
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -6 }}
                                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                                    className="flex flex-col justify-between h-full"
                                                >
                                                    <div>
                                                        {/* Program Header */}
                                                        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100/90 mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse shrink-0 shadow-xs shadow-brand-accent/50" />
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <h3 className="text-base sm:text-lg font-black text-brand-darkest tracking-tight">
                                                                            {selectedProgram.title}
                                                                        </h3>
                                                                        <span className="text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-accent/15 to-teal-500/10 text-brand-accent border border-brand-accent/25">
                                                                            {selectedProgram.badge}
                                                                        </span>
                                                                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-brand-darkest text-white">
                                                                            {selectedProgram.duration}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                                                                        {selectedProgram.subtitle}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <Link
                                                                href="/admission"
                                                                onClick={() => setIsMasterDropdownOpen(false)}
                                                                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-white text-xs font-black transition-all duration-200 shrink-0 border border-brand-accent/20 shadow-2xs group/btn"
                                                            >
                                                                <span>Admissions Open</span>
                                                                <FaArrowRight className="text-[9px] group-hover/btn:translate-x-0.5 transition-transform" />
                                                            </Link>
                                                        </div>

                                                        {/* Program Showcase Content: Image + Details */}
                                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                                                            {/* Image Banner */}
                                                            <div className="md:col-span-5 relative h-40 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                                                                <Image
                                                                    src={selectedProgram.image}
                                                                    alt={selectedProgram.title}
                                                                    fill
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                    sizes="(max-width: 768px) 100vw, 300px"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                                <div className="absolute bottom-3 left-3 right-3 text-white">
                                                                    <p className="text-[11px] font-black text-brand-light uppercase tracking-wider">
                                                                        {selectedProgram.level}
                                                                    </p>
                                                                    <p className="text-xs font-extrabold line-clamp-1">
                                                                        {selectedProgram.title}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Details & Key Highlights */}
                                                            <div className="md:col-span-7 flex flex-col justify-between">
                                                                <p className="text-xs text-gray-600 font-normal leading-relaxed mb-3">
                                                                    {selectedProgram.desc}
                                                                </p>

                                                                <div className="space-y-1.5 mb-3">
                                                                    {selectedProgram.highlights.slice(0, 3).map((h, i) => (
                                                                        <div key={i} className="flex items-center gap-2 text-[11.5px] text-gray-700 font-medium">
                                                                            <div className="w-4 h-4 rounded-full bg-brand-accent/15 text-brand-accent flex items-center justify-center shrink-0 text-[8px]">
                                                                                ✓
                                                                            </div>
                                                                            <span className="truncate">{h}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {/* Skills Tags */}
                                                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                                                                    {selectedProgram.skills.slice(0, 4).map((skill, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 border border-gray-200"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bottom Action Strip */}
                                                    <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                                                        <div className="text-xs text-gray-500 font-medium">
                                                            <span>Small Batches (Max 15) • IIIT Mentorship</span>
                                                        </div>

                                                        <Link
                                                            href={selectedProgram.href}
                                                            onClick={() => setIsMasterDropdownOpen(false)}
                                                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-accent hover:bg-brand-dark text-white text-xs font-black transition-all duration-300 shadow-md shadow-brand-accent/20 hover:scale-102"
                                                        >
                                                            <span>View Full Curriculum & Roadmap</span>
                                                            <FaArrowRight className="text-[10px]" />
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* 3. Blog */}
                    <Link
                        href="/blog"
                        onMouseEnter={() => setHoveredLink('Blog')}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 whitespace-nowrap ${pathname === '/blog' ? 'text-brand-darkest' : 'text-brand-dark hover:text-brand-darkest'
                            }`}
                    >
                        {hoveredLink === 'Blog' && (
                            <motion.span
                                layoutId="navbar-pill"
                                className="absolute inset-0 bg-white/50 rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        Blog
                    </Link>

                    {/* 4. More About Tark */}
                    <Link
                        href="/about"
                        onMouseEnter={() => setHoveredLink('More About Tark')}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 whitespace-nowrap ${pathname === '/about' ? 'text-brand-darkest' : 'text-brand-dark hover:text-brand-darkest'
                            }`}
                    >
                        {hoveredLink === 'More About Tark' && (
                            <motion.span
                                layoutId="navbar-pill"
                                className="absolute inset-0 bg-white/50 rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        More About Tark
                    </Link>
                </div>

                {/* Enroll Now Button - Right Aligned (Desktop) */}
                <motion.div variants={itemVariants} className="hidden md:flex items-center">
                    <Link href="/admission" className={`relative group overflow-hidden rounded-full font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-accent/30 active:scale-95 ${isScrolled ? 'px-6 py-2 text-sm' : 'px-8 py-3'}`}>
                        <span className="absolute inset-0 bg-linear-to-r from-brand-accent to-brand-dark transition-all duration-300 group-hover:scale-110"></span>
                        <span className="animate-wave z-10"></span>
                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                        <span className="relative flex items-center gap-2 z-20">
                            Enroll Now
                            <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                    </Link>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.div variants={itemVariants} className="flex items-center md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-brand-dark hover:text-brand-accent focus:outline-none p-2"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </motion.div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`md:hidden absolute left-0 right-0 mx-4 mt-2 overflow-hidden rounded-2xl bg-brand-lightest/95 backdrop-blur-md border border-brand-accent/20 shadow-xl z-40 ${isScrolled ? 'top-20' : 'top-24'}`}
                    >
                        <div className="flex flex-col p-4 space-y-2">
                            {/* Disabled Programs in Mobile */}
                            <div className="px-4 py-2.5 rounded-xl text-base font-medium text-gray-400 flex items-center justify-between opacity-60">
                                <span>Programs</span>
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-gray-200 text-gray-600">
                                    Coming Soon
                                </span>
                            </div>

                            {/* Mobile Master Program Accordion */}
                            <div>
                                <button
                                    onClick={() => setMobileMasterExpanded(!mobileMasterExpanded)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold text-brand-darkest hover:bg-brand-accent/5 transition-colors"
                                >
                                    <span>Master Program</span>
                                    <FaChevronDown className={`text-xs transition-transform duration-300 ${mobileMasterExpanded ? 'rotate-180 text-brand-accent' : 'text-gray-400'}`} />
                                </button>

                                {mobileMasterExpanded && (
                                    <div className="pl-4 pr-2 py-2 space-y-2 border-l-2 border-brand-accent/30 ml-4 my-1">
                                        {PROGRAMS.map((prog) => (
                                            <Link
                                                key={prog.id}
                                                href={prog.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block p-2 rounded-lg hover:bg-brand-accent/10 transition-colors"
                                            >
                                                <p className="text-sm font-bold text-brand-darkest">{prog.title}</p>
                                                <p className="text-[11px] text-gray-500">{prog.duration} • {prog.badge}</p>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block w-full text-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${pathname === '/blog'
                                    ? 'bg-brand-accent/10 text-brand-accent font-bold shadow-xs'
                                    : 'text-brand-dark hover:bg-brand-accent/5 hover:text-brand-accent'
                                    }`}
                            >
                                Blog
                            </Link>

                            <Link
                                href="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block w-full text-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${pathname === '/about'
                                    ? 'bg-brand-accent/10 text-brand-accent font-bold shadow-xs'
                                    : 'text-brand-dark hover:bg-brand-accent/5 hover:text-brand-accent'
                                    }`}
                            >
                                More About Tark
                            </Link>

                            <Link
                                href="/admission"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-4 w-full flex justify-center"
                            >
                                <div className="relative group overflow-hidden px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all duration-300 active:scale-95 w-full text-center">
                                    <span className="absolute inset-0 bg-linear-to-r from-brand-accent to-brand-dark"></span>
                                    <span className="relative flex items-center justify-center gap-2 z-20">
                                        Enroll Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
