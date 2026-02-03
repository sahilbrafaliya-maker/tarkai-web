"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaRocket, FaChalkboardTeacher, FaLightbulb, FaLeaf, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import GeometricShapes from "./GeometricShapes";

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
    <section className="bg-white py-8 lg:py-16 z-30 relative">
      <GeometricShapes hideBigHexagon={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-6 lg:mb-8">
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

      <div ref={containerRef} className="relative h-[300vh] bg-white">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-white">
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col lg:flex-row gap8 lg:h-[480px] h-auto">

              {/* Column 1: Navigation List - 30% */}
              <div className="w-full lg:w-[30%] flex flex-col gap-3 pr-2">
                {programs.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => setSelectedId(program.id)}
                    className={`relative w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group overflow-hidden ${selectedId === program.id
                      ? "bg-white shadow-lg border border-brand-accent/20 scale-[1.02] z-10"
                      : "hover:bg-white/40 border border-transparent hover:border-white/50"
                      }`}
                  >
                    {/* Active State Background Gradient */}
                    {selectedId === program.id && (
                      <div className="absolute inset-0 bg-linear-to-r from-brand-accent/5 to-transparent opacity-100" />
                    )}

                    <div className="relative flex items-center gap-4 z-10">
                      {/* Icon Container */}
                      <div className={`p-3 rounded-lg transition-colors duration-300 ${selectedId === program.id
                        ? "bg-brand-accent text-white shadow-md"
                        : "bg-white/60 text-brand-dark/50 group-hover:text-brand-accent group-hover:bg-white"
                        }`}>
                        <span className="text-xl">{program.icon}</span>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className={`text-base font-bold leading-tight mb-0.5 transition-colors ${selectedId === program.id ? "text-brand-darkest" : "text-brand-dark/70 group-hover:text-brand-darkest"
                          }`}>
                          {program.title}
                        </h3>
                        {/* Optional Subtitle for extra context, if needed, or just keep title */}
                      </div>

                      {/* Active Arrow Indicator */}
                      <FaArrowRight className={`text-sm text-brand-accent transition-all duration-300 ${selectedId === program.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                        }`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Column 2 & 3 Combined: Unified Card - 70% (lg:col-span-9 equivalent width relative to container) */}
              <div className="w-full lg:w-[70%]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProgram.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/50 shadow-2xl"
                  >
                    <div className="space-y-4">
                      <div className="inline-block px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                        <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase">
                          {selectedProgram.subtitle}
                        </span>
                      </div>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-darkest leading-tight">
                        {selectedProgram.title}
                      </h1>
                      <p className="text-brand-dark/70 leading-relaxed text-base">
                        {selectedProgram.description}
                      </p>
                      <div className="space-y-2">
                        {selectedProgram.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-brand-dark/80">
                            <FaCheckCircle className="text-brand-accent text-lg shrink-0" />
                            <span className="font-medium text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Link
                          href={`/programs#${selectedProgram.id}`}
                          className="inline-flex items-center gap-2 text-brand-accent font-bold hover:gap-4 transition-all group border-b-2 border-brand-accent/20 pb-1 hover:border-brand-accent"
                        >
                          Explore Program
                          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 transform transition-transform duration-700 group-hover:scale-105">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedProgram.image}
                          alt={selectedProgram.title}
                          className="w-full h-auto object-cover aspect-4/3"
                        />
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
