"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

import { motion, AnimatePresence, Variants } from 'motion/react';

export default function Navbar() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Feature: Check if we are on the home page for specific styles
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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

                if (currentScrollY > lastScrollY && currentScrollY > 50) { // if scroll down hide the navbar (threshold 50 prevents jitter)
                    setIsVisible(false);
                    setIsMobileMenuOpen(false);
                } else { // if scroll up show the navbar
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

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Programs', href: '/programs' },
        { name: 'Blogs', href: '/blog' },
        { name: 'Team', href: '/team' },
        { name: 'About', href: '/about' },
    ];

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
                        />
                    </Link>
                </motion.div>

                {/* Navigation Links - Centered (Desktop) */}
                <div className={`hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 ${isScrolled ? 'gap-1' : 'gap-2'}`}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-brand-darkest' : 'text-brand-dark hover:text-brand-darkest'
                                    }`}
                            >
                                {hoveredLink === link.name && (
                                    <motion.span
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 bg-white/50 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {isActive && !hoveredLink && (
                                    <motion.span
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 bg-white/30 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Contact Button - Right Aligned (Desktop) */}
                <motion.div variants={itemVariants} className="hidden md:flex items-center">
                    <Link href="/contact" className={`relative group overflow-hidden rounded-full font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-accent/30 active:scale-95 ${isScrolled ? 'px-6 py-2 text-sm' : 'px-8 py-3'}`}>
                        <span className="absolute inset-0 bg-linear-to-r from-brand-accent to-brand-dark transition-all duration-300 group-hover:scale-110"></span>

                        {/* Infinite Shimmer Wave */}
                        <span className="animate-wave z-10"></span>

                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                        <span className="relative flex items-center gap-2 z-20">
                            Connect
                            <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                    </Link>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.div variants={itemVariants} className="flex items-center md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-brand-dark hover:text-brand-accent focus:outline-none p-2"
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
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block w-full text-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                                            ? 'bg-brand-accent/10 text-brand-accent font-bold shadow-xs'
                                            : 'text-brand-dark hover:bg-brand-accent/5 hover:text-brand-accent'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-4 w-full flex justify-center"
                            >
                                <div className="relative group overflow-hidden px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all duration-300 active:scale-95 w-full text-center">
                                    <span className="absolute inset-0 bg-linear-to-r from-brand-accent to-brand-dark"></span>
                                    <span className="relative flex items-center justify-center gap-2 z-20">
                                        Connect
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
