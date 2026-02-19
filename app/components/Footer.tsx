"use client";

import Link from "next/link";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import GeometricShapes from "./GeometricShapes";

export default function Footer() {
    return (
        <footer className="relative bg-brand-darkest text-white overflow-hidden min-h-[60vh] flex flex-col justify-between">
            {/* Background Decorations */}
            <GeometricShapes hideBigHexagon={true} hideTopLeftHexagon={true} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-light/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                <div className="max-w-7xl mx-auto w-full">

                    {/* Massive Header */}
                    <div className="mb-20">
                        <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-white/10 select-none">
                            TARK AI
                        </h2>
                        <h2 className="text-4xl md:text-6xl font-bold mt-[-4vw] ml-2 md:ml-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                            Architect Your Future.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        {/* Column 1: CTA & Newsletter (Span 5) */}
                        <div className="md:col-span-5 space-y-8">
                            <p className="text-xl text-brand-light/80 max-w-md leading-relaxed">
                                Join the next generation of AI leaders. Get exclusive insights, roadmaps, and early access to our programs.
                            </p>


                        </div>

                        {/* Column 2: Navigation Links (Span 7) */}
                        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
                            {/* Programs */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Programs</h3>
                                <ul className="space-y-4">
                                    <li><Link 
                                    href={"#"}
                                    // href="/programs/ai-architect" 
                                    className="text-gray-400 hover:text-white transition-colors">AI Architect</Link></li>
                                    <li><Link
                                    href={"#"}
                                    // href="/programs/data-science" 
                                    className="text-gray-400 hover:text-white transition-colors">Data Science</Link></li>
                                    <li><Link
                                    href={"#"}
                                    // href="/programs/green-intel" 
                                    className="text-gray-400 hover:text-white transition-colors">Green Intelligence</Link></li>
                                    <li><Link 
                                    href={"#"}
                                    // href="/programs/future-founders" 
                                    className="text-gray-400 hover:text-white transition-colors">Future Founders</Link></li>
                                </ul>
                            </div>

                            {/* Company */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Company</h3>
                                <ul className="space-y-4">
                                    <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                                    <li><Link href="/programs" className="text-gray-400 hover:text-white transition-colors">Programs</Link></li>
                                    <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blogs</Link></li>
                                    <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                    <li><Link href="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
                                    <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>

                            {/* Socials */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Connect</h3>
                                <div className="flex gap-4">
                                    <a href="https://www.linkedin.com/company/111475196/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0077b5] hover:scale-110 transition-all duration-300">
                                        <FaLinkedin />
                                    </a>
                                    <a href="https://www.instagram.com/tarkaiedtech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E1306C] hover:scale-110 transition-all duration-300">
                                        <FaInstagram />
                                    </a>
                                    <a href="https://wa.me/919712358689" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:scale-110 transition-all duration-300">
                                        <FaWhatsapp />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-light/40">
                    <p>&copy; {new Date().getFullYear()} TARK AI EdTech Pvt. Ltd. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
