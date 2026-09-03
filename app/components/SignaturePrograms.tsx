'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRocket, FaChalkboardUser, FaLightbulb, FaLeaf, FaArrowRight, FaCircleCheck, FaClock, FaWandSparkles } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'motion/react';
import GeometricShapes from './GeometricShapes';

const programs = [
  {
    id: 'ai-architect',
    title: 'AI / ML Architect Program',
    subtitle: 'Architect the Future',
    duration: '7 Months',
    level: 'Advanced',
    description: 'From intelligent databases to agentic systems—craft full-stack AI experiences that are production ready. Master the art of building scalable, efficient, and ethical AI solutions driving the next generation of software.',
    highlights: ['Full-Stack Agentic AI Systems', 'LLM Fine-Tuning & Quantization', 'RAG & Vector Search Architectures', 'Production MLOps & Deployment'],
    icon: <FaRocket />,
    gradient: 'from-cyan-500 to-teal-600',
    badgeBg: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
    image: '/AI_ML_Architect_Program.jfif',
    featured: true,
  },
  {
    id: 'data-science',
    title: 'Data Science & Strategic Analytics',
    subtitle: 'Decipher Big Data',
    duration: '7 Months',
    level: 'Intermediate to Advanced',
    description: 'Transform noisy data into boardroom narratives and predictive models leaders can act on instantly. Learn advanced statistical analysis, machine learning pipelines, and the art of data storytelling.',
    highlights: ['Analytics & Data Storytelling', 'Spark-Powered ML Pipelines', 'Big Data Visualization', 'Predictive Business Intelligence'],
    icon: <FaChalkboardUser />,
    gradient: 'from-emerald-500 to-teal-700',
    badgeBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    image: '/Data_Science.jfif',
    featured: false,
  },
  {
    id: 'future-founders',
    title: 'Future Founders – AI Foundation',
    subtitle: 'Build Your Vision',
    duration: '3 Months',
    level: 'Beginner Friendly',
    description: 'A launchpad for teens and first-time builders to code, analyze, and present their first AI ideas. We nurture the entrepreneurial spirit combined with technical prowess to create the founders of tomorrow.',
    highlights: ['Creative AI Coding Sprints', 'Responsible AI & Ethics Mindset', 'MVP Prototype Development', 'Pitching & Venture Strategy'],
    icon: <FaLightbulb />,
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    image: '/AI_Foundation.png',
    featured: false,
  },
  {
    id: 'green-intel',
    title: 'Green Intelligence – Climate Analytics',
    subtitle: 'Sustain the Planet',
    duration: '3 Months',
    level: 'Domain Specialized',
    description: 'Decode carbon markets, architect ESG dashboards, and advise on climate-positive strategies with data. Use technology to solve the most pressing environmental challenges of our time.',
    highlights: ['Carbon Emission Analytics', 'ESG Compliance Dashboards', 'Climate Risk Modeling', 'Data-Driven Carbon Offsetting'],
    icon: <FaLeaf />,
    gradient: 'from-lime-500 to-emerald-600',
    badgeBg: 'bg-lime-500/10 text-lime-600 border-lime-500/20',
    image: '/Climate_Analytics.jfif',
    featured: false,
  },
];

export default function SignaturePrograms() {
  const [selectedId, setSelectedId] = useState(programs[0].id);
  const selectedProgram = programs.find((p) => p.id === selectedId) || programs[0];

  return (
    <section className="py-18 bg-gradient-to-b from-brand-lightest/40 via-white to-brand-lightest/30 relative overflow-hidden" id="programs">
      <GeometricShapes hideBigHexagon={true} />

      {/* Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-accent/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-extrabold uppercase tracking-wider mb-4 border border-brand-accent/20 backdrop-blur-md">
            <FaWandSparkles className="text-sm" />
            <span>SIGNATURE CURRICULUM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-darkest tracking-tight mb-4">
            Signature <span className="bg-gradient-to-r from-brand-accent via-teal-600 to-brand-dark bg-clip-text text-transparent">Programs</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            Curriculum engineered by IIIT Lucknow graduates for hands-on mastery in AI, Machine Learning, and Data Systems.
          </p>
        </div>

        {/* Desktop & Mobile Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Left Navigation Selector Tabs */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
            {programs.map((program) => {
              const isSelected = selectedId === program.id;

              return (
                <button
                  key={program.id}
                  onClick={() => setSelectedId(program.id)}
                  className={`relative w-full text-left p-5 rounded-[24px] transition-all duration-300 group cursor-pointer border ${isSelected
                      ? 'bg-white shadow-[0_8px_30px_rgba(0,35,51,0.08)] border-brand-accent/30 scale-[1.02] z-10'
                      : 'bg-white/60 hover:bg-white border-gray-200/80 hover:border-brand-accent/20'
                    }`}
                >
                  {/* Selected Active Accent Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-brand-accent to-teal-600 rounded-r-full hidden lg:block" />
                  )}

                  <div className="flex items-center gap-4">
                    {/* Icon Box */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 shrink-0 ${isSelected
                          ? 'bg-gradient-to-tr from-brand-accent to-teal-500 text-white shadow-md'
                          : 'bg-brand-lightest text-brand-accent group-hover:bg-brand-accent group-hover:text-white'
                        }`}
                    >
                      {program.icon}
                    </div>

                    {/* Program Title & Duration */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                          <FaClock className="text-[10px] text-brand-accent" />
                          {program.duration}
                        </span>
                      </div>
                      <h3
                        className={`text-base font-extrabold truncate leading-tight transition-colors ${isSelected ? 'text-brand-darkest' : 'text-gray-700 group-hover:text-brand-darkest'
                          }`}
                      >
                        {program.title}
                      </h3>
                    </div>

                    {/* Right Arrow Indicator */}
                    <FaArrowRight
                      className={`text-xs transition-all duration-300 shrink-0 ${isSelected ? 'text-brand-accent translate-x-0 opacity-100' : 'text-gray-400 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Showcase Hero Display Card */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProgram.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-white/90 backdrop-blur-xl rounded-[32px] border border-brand-accent/20 p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,35,51,0.07)] relative overflow-hidden flex flex-col justify-between h-full"
              >
                {/* Background Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">

                  {/* Left Column: Details & Bullet Points */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${selectedProgram.badgeBg}`}>
                        {selectedProgram.subtitle}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-brand-lightest text-brand-darkest text-xs font-bold border border-gray-200">
                        {selectedProgram.level}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-brand-darkest leading-tight mb-4">
                      {selectedProgram.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed font-normal mb-6">
                      {selectedProgram.description}
                    </p>

                    {/* Key Highlights List */}
                    <div className="space-y-3 mb-8">
                      {selectedProgram.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-darkest">
                          <FaCircleCheck className="text-brand-accent text-base shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-row items-center gap-3 sm:gap-4 flex-nowrap pt-2">
                      <Link
                        href={`/programs#${selectedProgram.id}`}
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-brand-darkest text-white font-bold text-xs hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-brand-darkest whitespace-nowrap shrink-0"
                      >
                        <span>Explore Curriculum</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                      <Link
                        href="/admission"
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-brand-accent/10 text-brand-accent font-bold text-xs hover:bg-brand-accent hover:text-white transition-all duration-300 border border-brand-accent/20 whitespace-nowrap shrink-0"
                      >
                        <span>Apply For Next Batch</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Framed Image Showcase */}
                  <div className="relative group">
                    <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl border border-gray-100 bg-brand-lightest">
                      <Image
                        src={selectedProgram.image}
                        alt={selectedProgram.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/70 via-transparent to-transparent opacity-80" />

                      {/* Floating Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-between shadow-lg">
                        <div>
                          <span className="text-[11px] font-extrabold text-brand-darkest block">
                            Duration: {selectedProgram.duration}
                          </span>
                          <span className="text-[10px] font-semibold text-brand-accent">
                            100% Live Projects &amp; Placement Support
                          </span>
                        </div>
                        <span className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center text-xs shadow-md">
                          <FaRocket />
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
