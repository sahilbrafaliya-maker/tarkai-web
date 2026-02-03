"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaRocket, FaChalkboardTeacher, FaLightbulb, FaLeaf, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

// --- Data ---
const programs = [
    {
        id: "ai-architect",
        title: "AI / ML Architect Program",
        subtitle: "Architect the Future",
        duration: "12 Modules",
        description: "From intelligent databases to agentic systems—craft full-stack AI experiences that are production ready. Master the art of building scalable, efficient, and ethical AI solutions driving the next generation of software.",
        highlights: ["Full-stack ML systems", "LLM fine-tuning", "Agent orchestration", "Production Deployment"],
        icon: <FaRocket />,
        color: "bg-blue-500",
        // Using a high-quality tech/AI abstract image
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
        featured: true
    },
    {
        id: "data-science",
        title: "Data Science & Strategic Analytics",
        subtitle: "Decipher the Data",
        duration: "12 Modules",
        description: "Transform noisy data into boardroom narratives and predictive models leaders can act on instantly. Learn advanced statistical analysis, machine learning pipelines, and the art of data storytelling.",
        highlights: ["Analytics storytelling", "Spark-powered ML pipelines", "Big Data Visualization", "Business Intelligence"],
        icon: <FaChalkboardTeacher />,
        color: "bg-emerald-500",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: "future-founders",
        title: "Future Founders – AI Foundation",
        subtitle: "Build Your Vision",
        duration: "8 Modules",
        description: "A playful launchpad for teens and first-time builders to code, analyze, and present their first AI ideas. We nurture the entrepreneurial spirit combined with technical prowess to create the founders of tomorrow.",
        highlights: ["Creative coding sprints", "Responsible AI mindset", "Prototype Development", "Pitching & Strategy"],
        icon: <FaLightbulb />,
        color: "bg-orange-500",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: "green-intel",
        title: "Green Intelligence – Climate Analytics",
        subtitle: "Sustain the Planet",
        duration: "8 Modules",
        description: "Decode carbon markets, architect ESG dashboards, and advise on climate-positive strategies with data. Use technology to solve the most pressing challenges of our time.",
        highlights: ["Emission analytics", "Carbon market storytelling", "ESG Reporting", "Climate Modeling"],
        icon: <FaLeaf />,
        color: "bg-lime-500",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop"
    }
];

export default function SignaturePrograms() {
    const [selectedId, setSelectedId] = useState(programs[0].id);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Map 0-1 to index range
        const index = Math.min(
            Math.floor(latest * programs.length),
            programs.length - 1
        );
        if (index >= 0 && programs[index].id !== selectedId) {
            setSelectedId(programs[index].id);
        }
    });

    const selectedProgram = programs.find(p => p.id === selectedId) || programs[0];

    return (
        // Increased height to simulate scroll travel distance (300vh = 3 screens worth of scroll)
        <section className="bg-brand-lightest py-12 lg:py-24 z-30 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-8 lg:mb-12">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-darkest mb-4">
                        Signature Programs
                    </h2>
                    <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-8"></div>

                    <p className="text-lg text-brand-dark max-w-2xl mx-auto">
                        Curriculum designed for the future of intelligence.
                    </p>
                </div>
            </div>

            <div ref={containerRef} className="relative h-[300vh] bg-brand-lightest">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-brand-lightest">
                    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <div className="flex flex-col lg:flex-row gap-8 lg:h-[480px] h-auto">

                            {/* Column 1: Navigation List - 30% */}
                            <div className="w-full lg:w-[30%] flex flex-col gap-1 overflow-y-auto pr-2 border-r border-brand-light/30">
                                {programs.map((program) => (
                                    <button
                                        key={program.id}
                                        onClick={() => setSelectedId(program.id)}
                                        className={`cursor-pointer group relative pl-4 pr-2 py-3 text-left rounded-lg transition-all duration-300 w-full flex items-center gap-3 ${selectedId === program.id
                                            ? "text-brand-accent"
                                            : "text-brand-dark/60 hover:text-brand-dark"
                                            }`}
                                    >
                                        {/* Active Indicator Line */}
                                        {selectedId === program.id && (
                                            <motion.div
                                                layoutId="active-nav-indicator"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-0.5 bg-brand-accent"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}

                                        <div className={`text-lg ${selectedId === program.id ? 'text-brand-accent' : 'text-brand-dark/40 group-hover:text-brand-dark/70'}`}>
                                            {program.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm lg:text-base leading-tight">
                                                {program.title}
                                            </h3>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Column 2: Details Content - 35% */}
                            <div className="w-full lg:w-[35%] relative py-2 lg:px-4 flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedProgram.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="flex flex-col gap-6"
                                    >
                                        <div>
                                            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-brand-accent uppercase bg-brand-accent/5 border border-brand-accent/20 rounded-full">
                                                {selectedProgram.subtitle}
                                            </span>
                                            <h3 className="text-3xl font-bold text-brand-darkest mb-3 leading-tight">
                                                {selectedProgram.title}
                                            </h3>
                                            <p className="text-brand-dark/70 text-base leading-relaxed">
                                                {selectedProgram.description}
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            {selectedProgram.highlights.map((highlight, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <FaCheckCircle className="mt-1 text-brand-accent shrink-0" size={16} />
                                                    <span className="text-sm font-medium text-brand-dark/90">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-2">
                                            <Link
                                                href={`/programs#${selectedProgram.id}`}
                                                className="group inline-flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-brand-darkest transition-colors duration-300"
                                            >
                                                <span className="border-b-2 border-brand-accent/20 group-hover:border-brand-accent pb-0.5 transition-all">
                                                    Explore Program
                                                </span>
                                                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Column 3: Image Display - 35% */}
                            <div className="w-full lg:w-[35%] relative h-64 lg:h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100 group">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedProgram.id}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute inset-0"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-t from-brand-darkest/60 to-transparent z-10" />
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={selectedProgram.image}
                                            alt={selectedProgram.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute bottom-8 left-8 z-20">
                                            <div className="flex items-center gap-2 text-white/90 text-sm font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-lg border border-white/20 w-fit">
                                                <FaRocket /> Signature Certification
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
