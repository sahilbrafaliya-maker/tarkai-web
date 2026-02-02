"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                    setIsVisible(false);
                    setIsMobileMenuOpen(false); // Close mobile menu on scroll
                } else { // if scroll up show the navbar
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 bg-brand-lightest/90 backdrop-blur-sm border-b border-brand-accent/20 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center relative">

                    {/* Logo - Left Aligned */}
                    <div className="shrink-0 flex items-center">
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
                    </div>

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
                                <Link
                                    key={link.name}
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
                            );
                        })}
                    </div>

                    {/* Contact Button - Right Aligned (Desktop) */}
                    <div className="hidden md:flex items-center">
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
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
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
                    </div>
                </div>
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
