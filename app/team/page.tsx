"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function TeamPage() {
    const [hoveredMember, setHoveredMember] = useState<number | null>(null);

    const members = [
        {
            name: "Smit Bokha",
            role: "Co-founder",
            focus: "Strategic Finance",
            subFocus: "Compliance & Data-driven Insights",
            bio: "An IT specialist with strong expertise in modern web development and scalable digital solutions.",
            imageSrc: "/smit_bokha.jpeg"
        },
        {
            name: "Gautam Hadiya",
            role: "Co-founder",
            focus: "Technology Leadership",
            subFocus: "Product Architecture & AI Systems",
            bio: "A versatile IT professional experienced in building robust and adaptable web-based systems.",
            imageSrc: "/gautam_hadiya.jpeg"
        },
        {
            name: "Harshil Mangroliya",
            role: "Co-founder",
            focus: "Operations Leadership",
            subFocus: "Process Optimization",
            bio: "A dynamic IT specialist with hands-on experience in full-cycle web development.",
            imageSrc: "/harshil_mangaroliya.jpeg"
        },
        {
            name: "Sneh Anghan",
            role: "Operations Leadership",
            focus: "Process Optimization",
            subFocus: "Execution Efficiency",
            bio: "A dedicated IT professional skilled in developing reliable and user-centric web solutions.",
            imageSrc: "/sneh_anghan.jpeg"
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-20 pt-28">
            <div className="bg-brand-lightest py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-darkest mb-6 animate-slide-up">Meet the TARK AI Leadership Team</h1>
                    <p className="text-xl text-brand-dark max-w-3xl mx-auto animate-slide-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        The passionate individuals behind TarkAI EdTech working to shape the future of education.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16 md:space-y-24">
                {/* Leaders Section - Custom Layout */}
                <div className="space-y-16 md:space-y-24">

                    {/* Sahil Rafaliya - Text Left, Image Right */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
                        <div className="md:w-1/2 order-2 md:order-1 space-y-6 text-left">
                            <p className="text-lg text-gray-700 leading-relaxed text-justify">
                                Sahil Rafaliya is a <b> Data science professional</b> with a strong specialization in
                                Climate Technology and AI-driven analytics. He holds an M.Sc. in Data Science
                                <b> (Climate Data Analytics specialization) </b> from <b>Indian Institute of Information
                                    Technology, Lucknow.</b>
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed text-justify">
                                With core expertise in <b>Data Science, AI/ML, and Climate Tech </b>, he brings a rare
                                blend of technology and sustainability-focused insight to education. Sahil is
                                also the <b> founder of TrustCarbon and ForITus Solutions,</b> reflecting his
                                entrepreneurial mindset and commitment to building impactful,
                                future-oriented solutions.
                            </p>
                        </div>
                        <div className="md:w-1/2 order-1 md:order-2 flex flex-col items-center">
                            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-6">
                                <Image
                                    src="/sahil_rafaliya.jpeg"
                                    alt="Sahil Rafaliya"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-brand-darkest">Sahil Rafaliya</h3>
                                <p className="text-brand-accent font-bold uppercase tracking-wider text-sm mt-1">Founder & CEO</p>
                            </div>
                        </div>
                    </div>

                    {/* Kashish Nagar - Image Left, Text Right */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
                        <div className="md:w-1/2 order-1 flex flex-col items-center">
                            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-6">
                                <Image
                                    src="/kashish_nagar.JPG"
                                    alt="Kashish Nagar"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-brand-darkest">Kashish Nagar</h3>
                                <p className="text-brand-accent font-bold uppercase tracking-wider text-sm mt-1">Co-Founder & EVP</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 order-2 space-y-6 text-left">
                            <p className="text-lg text-gray-700 leading-relaxed text-justify">
                                Kashish Nagar is an <b> AI and Machine Learning specialist </b> with a strong
                                academic and mentoring background. She holds an <b> M.Sc. in Artificial
                                    Intelligence & Machine Learning </b> from <b> Indian Institute of Information
                                        Technology, Lucknow.</b>
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed text-justify">
                                Her core expertise spans <b> Data Science, AI/ML, MLOps, and Teaching &
                                    Mentorship, </b> with a strong focus on building industry-aligned, production-
                                ready skillsets. She is also a <b> Co-Founder of ForITus Solutions, </b>contributing to
                                product development, technical architecture, and academic direction.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Team Members Section - Interactive Grid */}
                <div>
                    <h2 className="text-3xl font-bold text-brand-darkest mb-12 text-center">Core Team</h2>
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
                                        ${widthClass} w-full h-[450px]
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full text-white">
                                        <div className={`transform transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}>
                                            <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
                                            <p className="text-brand-accent font-bold uppercase tracking-wider text-sm mb-4">{member.role}</p>

                                            <div className={`transition-all duration-500 delay-100 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                                <div className="mb-4 border-l-2 border-brand-accent pl-3">
                                                    <p className="font-semibold text-white/90 text-sm mb-1">{member.focus}</p>
                                                    <p className="text-gray-300 text-xs">{member.subFocus}</p>
                                                </div>

                                                <p className="text-gray-200 text-sm leading-relaxed">
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
                    <h2 className="text-2xl font-bold text-brand-darkest mb-6">Want to join us?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        We are always looking for talented individuals to join our mission. Check out our open positions or send us your resume.
                    </p>
                    <a href="/contact" className="inline-block px-8 py-3 bg-brand-dark text-white font-bold rounded-lg hover:bg-brand-darkest transition-all duration-300 hover:scale-105 shadow-md">
                        Join the Team
                    </a>
                </div>
            </div>
        </div>
    );
}
