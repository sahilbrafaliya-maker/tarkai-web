"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Feature: Check if we are on the home page for specific styles
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);

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

    // Determine navbar background class
    const navBackgroundClass = (isHome && !isScrolled)
        ? 'bg-transparent border-transparent'
        : 'bg-brand-lightest/90 backdrop-blur-md border-b border-brand-accent/20 shadow-sm';

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${navBackgroundClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={isHome ? "hidden" : "visible"}
                    animate="visible"
                    variants={containerVariants}
                    className="flex justify-between h-20 items-center relative"
                >

                    {/* Logo - Left Aligned */}
                    <motion.div variants={itemVariants} className="shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/Logo.png"
                                alt="TarkAI Logo"
                                width={180}
                                height={60}
                                className="h-16 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </motion.div>

                    {/* Navigation Links - Centered (Desktop) */}
                    <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Programs', href: '/programs' },
                            { name: 'Team', href: '/team' },
                            { name: 'About', href: '/about' },
                        ].map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.div key={link.name} variants={itemVariants}>
                                    <Link
                                        href={link.href}
                                        className={`group relative transition-colors py-1 ${isActive
                                            ? 'text-brand-accent font-bold'
                                            : 'text-brand-dark hover:text-brand-accent font-medium'
                                            } `}
                                    >
                                        {link.name}
                                        <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-brand-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            } `}></span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Contact Button - Right Aligned (Desktop) */}
                    <motion.div variants={itemVariants} className="hidden md:flex items-center">
                        <Link href="/contact" className="relative group overflow-hidden px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/30 active:scale-95">
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
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden absolute top-20 left-0 w-full bg-brand-lightest/95 backdrop-blur-md border-b border-brand-accent/20 transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100 py-4 shadow-xl' : 'max-h-0 opacity-0 py-0'}`}>
                <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
                    {[
                        { name: 'Home', href: '/' },
                        { name: 'Programs', href: '/programs' },
                        { name: 'Team', href: '/team' },
                        { name: 'About', href: '/about' },
                    ].map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block w-full text-center px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive
                                    ? 'text-brand-accent bg-brand-accent/10 font-bold'
                                    : 'text-brand-dark hover:text-brand-accent hover:bg-brand-accent/5'
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
                        <div className="relative group overflow-hidden px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all duration-300 active:scale-95 w-3/4 text-center">
                            <span className="absolute inset-0 bg-linear-to-r from-brand-accent to-brand-dark"></span>
                            <span className="relative flex items-center justify-center gap-2 z-20">
                                Connect
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
