"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import BackgroundText from '../components/BackgroundText';
import PageHeader from '../components/PageHeader';
import dynamic from 'next/dynamic';
import { FaChartLine } from "@react-icons/all-files/fa/FaChartLine";
import { FaBrain } from "@react-icons/all-files/fa/FaBrain";
import { FaNetworkWired } from "@react-icons/all-files/fa/FaNetworkWired";
import { FaMicrochip } from "@react-icons/all-files/fa/FaMicrochip";

const GeometricShapes = dynamic(() => import('../components/GeometricShapes'));

export default function TeamPage() {
    const [hoveredMember, setHoveredMember] = useState<number | null>(null);

    const members = [
        {
            name: "Smit Bokha",
            role: "Co-founder",
            focus: "Strategic Finance",
            subFocus: "Compliance & Data-driven Insights",
            bio: "An IT specialist with strong expertise in modern web development and scalable digital solutions.",
            imageSrc: "/smit_bokha.png"
        },
        {
            name: "Gautam Hadiya",
            role: "Co-founder",
            focus: "Technology Leadership",
            subFocus: "Product Architecture & AI Systems",
            bio: "A versatile IT professional experienced in building robust and adaptable web-based systems.",
            imageSrc: "/gautam_hadiya.png"
        },
        {
            name: "Harshil Mangroliya",
            role: "Co-founder",
            focus: "Operations Leadership",
            subFocus: "Process Optimization",
            bio: "A dynamic IT specialist with hands-on experience in full-cycle web development.",
            imageSrc: "/harshil_mangroliya.png"
        },
        {
            name: "Sneh Anghan",
            role: "Operations Leadership",
            focus: "Process Optimization",
            subFocus: "Execution Efficiency",
            bio: "A dedicated IT professional skilled in developing reliable and user-centric web solutions.",
            imageSrc: "/sneh_anghan.png"
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-20 relative overflow-hidden">
            <GeometricShapes hideTopLeftHexagon={true} hideTriangle={true} variant="team-page" />
            <PageHeader 
                badge="OUR TEAM"
                title={<>Visionaries Behind the Future<br/><span className="text-[#20A6A8]">of AI & Education</span></>}
                description="The passionate minds shaping the future of education through AI-driven innovation."
            />

            <div className="bg-brand-lightest py-16 relative overflow-hidden hidden">
                <BackgroundText text="LEADERSHIP" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32 space-y-16 md:space-y-20">
                {/* Leaders Section - Premium Editorial Layout */}
                <div className="flex flex-col gap-y-16 md:gap-y-20 relative">

                    {/* Sahil Rafaliya - Profile 01 */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
                        {/* Image Left */}
                        <div className="w-full md:w-5/12 flex justify-center relative order-1">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="relative w-75 h-75 md:w-87.5 md:h-87.5"
                            >
                                {/* Animated Background Glow */}
                                <motion.div 
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-brand-lightest rounded-full blur-2xl z-0"
                                />

                                {/* Spinning Dashed Border */}
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-6 border-[1.5px] border-dashed border-brand-accent/50 rounded-full z-0"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 25%)' }}
                                />

                                {/* Premium Floating Element */}
                                <motion.div 
                                    animate={{ y: [-8, 8, -8] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-2 -right-6 w-20 h-20 bg-white/80 backdrop-blur-xl border border-white rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(32,166,168,0.2)] z-20"
                                >
                                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#20A6A8] to-[#1E3A8A] shadow-[0_0_25px_rgba(32,166,168,0.4)] flex items-center justify-center overflow-hidden">
                                        <Image src="/team_icon_1.png" alt="CEO Icon" width={36} height={36} className="drop-shadow-md object-contain" />
                                    </div>
                                    <motion.div 
                                        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-full border-2 border-[#20A6A8]/50"
                                    />
                                </motion.div>

                                {/* Photo */}
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-white z-10 border-4 border-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                                    <Image
                                        src="/sahil_rafaliya.png"
                                        alt="Sahil Rafaliya"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Text Right */}
                        <div className="w-full md:w-7/12 flex flex-col text-left order-2">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <span className="text-[#1E3A8A] font-bold text-sm tracking-wide mb-2 block">Founder & CEO</span>
                                <h3 className="text-[#1F2937] text-4xl lg:text-[44px] font-extrabold mb-6 tracking-tight">Sahil Rafaliya</h3>
                                
                                <p className="text-gray-700 text-[16px] leading-[1.8] mb-4 text-justify">
                                    Sahil Rafaliya is a <b className="text-gray-900 font-bold">Data science professional</b> with a strong specialization in <b className="text-gray-900 font-bold">Climate Technology</b> and <b className="text-gray-900 font-bold">AI-driven analytics</b>. He holds an <b className="text-gray-900 font-bold">M.Sc. in Data Science (Climate Data Analytics specialization)</b> from <b className="text-gray-900 font-bold">Indian Institute of Information Technology, Lucknow</b>.
                                </p>
                                <p className="text-gray-700 text-[16px] leading-[1.8] mb-6 text-justify">
                                    <i className="font-semibold text-[#1F2937]">"With core expertise in <b className="text-gray-900 font-bold">Data Science, AI/ML, and Climate Tech</b>, he brings a rare
                                    blend of technology and sustainability-focused insight to education. Sahil is
                                    also the <b className="text-gray-900 font-bold">founder of TrustCarbon and ForITus Solutions</b>, reflecting his
                                    entrepreneurial mindset and commitment to building impactful,
                                    future-oriented solutions."</i>
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Faint connecting line between profiles */}
                    <div className="hidden lg:block absolute left-[30%] top-[40%] w-[40%] h-[30%] border-r border-dashed border-gray-200 rounded-br-[200px] z-0"></div>

                    {/* Kashish Nagar - Profile 02 */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 mt-16 md:mt-24 relative z-10">
                        {/* Text Left */}
                        <div className="w-full md:w-7/12 flex flex-col text-left order-2 md:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <span className="text-[#1E3A8A] font-bold text-sm tracking-wide mb-2 block">Co-Founder & EVP</span>
                                <h3 className="text-[#1F2937] text-4xl lg:text-[44px] font-extrabold mb-6 tracking-tight">Kashish Nagar</h3>
                                
                                <p className="text-gray-700 text-[16px] leading-[1.8] mb-4 text-justify">
                                    Kashish Nagar is an <b className="text-gray-900 font-bold">AI and Machine Learning specialist</b> with a strong
                                    academic and mentoring background. She holds an <b className="text-gray-900 font-bold">M.Sc. in Artificial
                                    Intelligence & Machine Learning</b> from <b className="text-gray-900 font-bold">Indian Institute of Information
                                    Technology, Lucknow</b>.
                                </p>
                                <p className="text-gray-700 text-[16px] leading-[1.8] mb-6 text-justify">
                                    <i className="font-semibold text-[#1F2937]">"Her core expertise spans <b className="text-gray-900 font-bold">Data Science, AI/ML, MLOps, and Teaching & Mentorship</b>, with a strong focus on building industry-aligned, production-ready skillsets. She is also a <b className="text-gray-900 font-bold">Co-Founder of ForITus Solutions</b>, contributing to product development, technical architecture, and academic direction."</i>
                                </p>

                            </motion.div>
                        </div>

                        {/* Image Right */}
                        <div className="w-full md:w-5/12 flex justify-center relative order-1 md:order-2">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="relative w-75 h-75 md:w-87.5 md:h-87.5"
                            >
                                {/* Animated Background Glow */}
                                <motion.div 
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-brand-lightest rounded-full blur-2xl z-0"
                                />

                                {/* Spinning Dashed Border */}
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-6 border-[1.5px] border-dashed border-brand-accent/50 rounded-full z-0"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 25%)' }}
                                />

                                {/* Premium Floating Element */}
                                <motion.div 
                                    animate={{ y: [8, -8, 8] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-10 -left-6 w-20 h-20 bg-white/80 backdrop-blur-xl border border-white rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(32,166,168,0.2)] z-20"
                                >
                                    <div className="w-12 h-12 rounded-full bg-linear-to-bl from-[#20A6A8] to-[#1E3A8A] shadow-[0_0_25px_rgba(32,166,168,0.4)] flex items-center justify-center overflow-hidden">
                                        <Image src="/team_icon_2.png" alt="AI Icon" width={32} height={32} className="drop-shadow-md object-contain" />
                                    </div>
                                    <motion.div 
                                        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-full border-2 border-[#20A6A8]/50"
                                    />
                                </motion.div>

                                {/* Photo */}
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-white z-10 border-4 border-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                                    <Image
                                        src="/kashish_nagar.png"
                                        alt="Kashish Nagar"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>

                {/* Team Members Section - Interactive Grid */}
                <div>
                    <div className="flex flex-col items-center justify-center text-center mb-16 mt-32">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-10 sm:w-16 h-px bg-brand-accent/40"></div>
                            <span className="text-brand-accent text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase">
                                The Driving Force
                            </span>
                            <div className="w-10 sm:w-16 h-px bg-brand-accent/40"></div>
                        </div>
                        <h2 className="text-3xl sm:text-[36px] md:text-[42px] lg:text-[48px] font-extrabold leading-[1.15] tracking-[-0.03em] text-brand-darkest mb-6">
                            Meet Our <span className="text-brand-accent">Core Experts</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl text-[15px] sm:text-[16px] leading-[1.7]">
                            A diverse group of dedicated professionals bringing their unique expertise to build scalable, innovative, and industry-leading AI solutions.
                        </p>
                    </div>
                    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-6">
                        {members.map((member, index) => {
                            const isHovered = hoveredMember === index;
                            const isAnyHovered = hoveredMember !== null;
                            let widthClass = "lg:w-1/4";

                            if (isAnyHovered) {
                                widthClass = isHovered ? "lg:w-2/5" : "lg:w-1/5";
                            }

                            return (
                                <div
                                    key={index}
                                    className={`
                                        relative overflow-hidden rounded-2xl cursor-pointer group
                                        transition-all duration-500 ease-in-out
                                        ${widthClass} w-full h-112.5
                                    `}
                                    onMouseEnter={() => setHoveredMember(index)}
                                    onMouseLeave={() => setHoveredMember(null)}
                                >
                                    {/* Background Image */}
                                    <Image
                                        src={member.imageSrc}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full text-white">
                                        <div className={`transform transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}>
                                            <h4 className="text-[22px] sm:text-[24px] lg:text-[26px] font-semibold leading-tight tracking-[-0.02em] mb-1">{member.name}</h4>
                                            <p className="text-[13px] sm:text-[14px] font-semibold text-brand-accent uppercase tracking-[0.12em] mb-4">{member.role}</p>

                                            <div className={`transition-all duration-500 delay-100 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                                <div className="mb-4 border-l-2 border-brand-accent pl-3">
                                                    <p className="text-[14px] sm:text-[15px] font-semibold text-white/90 mb-1">{member.focus}</p>
                                                    <p className="text-[13px] sm:text-[14px] font-medium text-gray-300">{member.subFocus}</p>
                                                </div>

                                                <p className="text-[14px] sm:text-[15px] font-normal leading-[1.65] text-gray-200">
                                                    {member.bio}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-20 text-center animate-on-scroll">
                    <h2 className="text-[22px] sm:text-[24px] lg:text-[26px] font-semibold leading-tight tracking-[-0.02em] text-brand-darkest mb-6">Want to join us?</h2>
                    <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-gray-600 mb-8 max-w-2xl mx-auto">
                        We are always looking for talented individuals to join our mission. Check out our open positions or send us your resume.
                    </p>
                    <a href="/contact" className="text-[15px] sm:text-[16px] inline-block px-8 py-3 bg-brand-dark text-white font-bold rounded-lg hover:bg-brand-darkest transition-all duration-300 hover:scale-105 shadow-md">
                        Join the Team
                    </a>
                </div>
            </div>
        </div>
    );
}
