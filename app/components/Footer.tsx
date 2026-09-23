"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaGlobe } from "@react-icons/all-files/fa/FaGlobe";
import { FaLightbulb } from "@react-icons/all-files/fa/FaLightbulb";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { motion, type Variants } from "motion/react";
import GeometricShapes from "./GeometricShapes";

export default function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <footer className="relative bg-[#021214] text-white overflow-hidden flex flex-col justify-between border-t border-white/5">
            {/* Background Decorations */}
            <GeometricShapes hideBigHexagon={true} hideTopLeftHexagon={true} />
            <div className="absolute top-0 right-0 w-200 h-200 bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-150 h-150 bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

            {/* Main Content Area */}
            <div className="grow flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10 py-16 sm:py-24">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="max-w-6xl mx-auto w-full"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
                        {/* Column 1: Brand & Features (Span 5) */}
                        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-start space-y-8 -mt-4">
                            
                            <div className="flex flex-col gap-1">
                                {/* Logo */}
                                <Link href="/" className="inline-block -ml-2">
                                    <Image src="/footer-logo.png" alt="TarkAI EdTech Logo" width={300} height={140} className="w-auto h-24 md:h-28 object-contain object-left brightness-0 invert opacity-90" priority />
                                </Link>

                                <p className="text-[14px] sm:text-[15px] font-normal leading-relaxed text-white/60 max-w-sm">
                                    Join the next generation of AI leaders. Get exclusive insights, roadmaps, and early access to our programs.
                                </p>
                            </div>

                            {/* <div className="w-10 h-0.5 bg-brand-accent rounded-full shadow-[0_0_10px_rgba(0,115,122,0.5)]" /> */}

                            {/* Icons Grid */}
                            <div className="flex items-center gap-6 pt-4">
                                {[
                                    { icon: <FaGlobe />, label: 'LEARN' },
                                    { icon: <FaLightbulb />, label: 'BUILD' },
                                    { icon: <FaUsers />, label: 'GROW' },
                                    { icon: <FaStar />, label: 'SUCCESS' },
                                ].map((item, i) => (
                                    <div 
                                        key={i} 
                                        className="flex flex-col items-center gap-3 group"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-brand-accent/30 bg-brand-accent/5 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,115,122,0.5)] transition-all duration-300">
                                            <span className="text-[20px]">{item.icon}</span>
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Column 2: Navigation Links (Span 7) */}
                        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8 lg:pl-8 pt-2">
                            {/* Programs */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                <div>
                                    <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-3">PROGRAMS</h3>
                                    <div className="w-6 h-0.5 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(0,115,122,0.4)]" />
                                </div>
                                <ul className="space-y-4 text-[14px] font-medium">
                                    <li><Link href="#" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">AI Architect</Link></li>
                                    <li><Link href="#" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Data Science</Link></li>
                                    <li><Link href="#" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Green Intelligence</Link></li>
                                    <li><Link href="#" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Future Founders</Link></li>
                                </ul>
                            </motion.div>

                            {/* Company */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                <div>
                                    <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-3">COMPANY</h3>
                                    <div className="w-6 h-0.5 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(0,115,122,0.4)]" />
                                </div>
                                <ul className="space-y-4 text-[14px] font-medium">
                                    <li><Link href="/" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Home</Link></li>
                                    <li><Link href="/programs" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Programs</Link></li>
                                    <li><Link href="/blog" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Blogs</Link></li>
                                    <li><Link href="/about" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">About Us</Link></li>
                                    <li><Link href="/team" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Our Team</Link></li>
                                    <li><Link href="/contact" className="text-white/60 hover:text-white hover:pl-1 transition-all duration-300">Contact</Link></li>
                                </ul>
                            </motion.div>

                            {/* Connect */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                <div>
                                    <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-3">CONNECT</h3>
                                    <div className="w-6 h-0.5 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(0,115,122,0.4)]" />
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <a href="https://www.linkedin.com/company/111475196/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-accent/30 bg-brand-accent/5 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-[0_0_15px_rgba(0,115,122,0.5)] transition-all duration-300" aria-label="LinkedIn">
                                        <FaLinkedin className="text-[16px]" />
                                    </a>
                                    <a href="https://www.instagram.com/tarkaiedtech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-accent/30 bg-brand-accent/5 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-[0_0_15px_rgba(0,115,122,0.5)] transition-all duration-300" aria-label="Instagram">
                                        <FaInstagram className="text-[17px]" />
                                    </a>
                                    <a href="https://www.youtube.com/@TarkAIEdtech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-accent/30 bg-brand-accent/5 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-[0_0_15px_rgba(0,115,122,0.5)] transition-all duration-300" aria-label="YouTube">
                                        <FaYoutube className="text-[17px]" />
                                    </a>
                                    <a href="https://www.facebook.com/tarkaiedtech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-accent/30 bg-brand-accent/5 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-[0_0_15px_rgba(0,115,122,0.5)] transition-all duration-300" aria-label="Facebook">
                                        <FaFacebook className="text-[17px]" />
                                    </a>
                                    <a href="https://wa.me/919712358689" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-accent/30 bg-brand-accent/5 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-[0_0_15px_rgba(0,115,122,0.5)] transition-all duration-300" aria-label="WhatsApp">
                                        <FaWhatsapp className="text-[18px]" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 border-t border-white/5 py-6 bg-[#010a0c]">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-white/40">
                    <p>&copy; {new Date().getFullYear()} TarkAI EdTech Pvt. Ltd. All rights reserved.</p>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span className="w-px h-3 bg-white/10"></span>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <span className="w-px h-3 bg-white/10"></span>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
