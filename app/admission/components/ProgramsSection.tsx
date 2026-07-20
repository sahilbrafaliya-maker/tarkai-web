'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ProgramsProps {
  onEnroll: () => void;
}

const programs = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    iconBg: 'bg-brand-accent/15 border-brand-accent/30 text-brand-accent group-hover:bg-brand-accent group-hover:text-white',
    tag: 'Most Popular',
    tagColor: 'bg-brand-accent text-white',
    title: 'AI / ML Architect Program',
    description: 'Master full-stack AI engineering — from intelligent databases to agentic systems. Production-ready skills for the AI economy.',
    duration: '7 Months',
    mode: 'Offline',
    highlights: ['LLM Fine-tuning', 'Agentic AI Systems', 'MLOps & Deployment', 'RAG Applications'],
    color: 'from-brand-accent/20 via-brand-dark/10 to-transparent',
    border: 'border-brand-accent/40 hover:border-brand-accent/70',
    ring: 'ring-2 ring-brand-accent/40 hover:ring-brand-accent/70',
    glow: 'hover:shadow-2xl hover:shadow-brand-accent/25',
    btnStyle: 'bg-gradient-to-r from-brand-accent to-brand-dark text-white hover:shadow-lg hover:shadow-brand-accent/30 hover:scale-[1.02]',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    iconBg: 'bg-purple-500/15 border-purple-500/30 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    tag: 'High Demand',
    tagColor: 'bg-purple-500 text-white',
    title: 'Data Science & Strategic Analytics',
    description: 'Become a data-driven decision maker. Master Python, SQL, Tableau, and statistical modeling for business intelligence.',
    duration: '5 Months',
    mode: 'Offline',
    highlights: ['Python & SQL Mastery', 'Statistical Modeling', 'Business Intelligence', 'Data Visualization'],
    color: 'from-purple-500/15 via-purple-700/5 to-transparent',
    border: 'border-purple-500/40 hover:border-purple-500/70',
    ring: 'ring-2 ring-purple-500/40 hover:ring-purple-500/70',
    glow: 'hover:shadow-2xl hover:shadow-purple-500/25',
    btnStyle: 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]',
  },
];

export default function ProgramsSection({ onEnroll }: ProgramsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-brand-lightest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-brand-accent/10 rounded-full" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3">Our Programs</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-4 tracking-tight">
            Choose Your{' '}
            <span className="text-brand-accent">AI Track</span>
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Flagship career programs designed for maximum industry impact and placement success.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`
                group relative flex flex-col rounded-2xl border ${program.border} ${program.ring} ${program.glow}
                bg-white backdrop-blur-sm overflow-hidden
                hover:-translate-y-2
                transition-all duration-300
              `}
            >
              {/* Card gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-b ${program.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
                {/* Tag & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-sm ${program.iconBg}`}>
                    {program.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${program.tagColor}`}>
                    {program.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-brand-darkest mb-2 leading-tight">{program.title}</h3>
                <p className="text-sm text-brand-dark/70 leading-relaxed mb-6">{program.description}</p>

                {/* Meta */}
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-brand-dark/70 bg-white/70 px-3 py-1.5 rounded-lg border border-brand-darkest/5">
                    <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {program.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-brand-dark/70 bg-white/70 px-3 py-1.5 rounded-lg border border-brand-darkest/5">
                    <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                    </svg>
                    {program.mode}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-6 flex-1">
                  {program.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm font-medium text-brand-dark/80">
                      <svg className="w-4 h-4 text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Certificate badge */}
                <div className="flex items-center gap-2 text-xs text-brand-accent font-semibold mb-6 px-3.5 py-2 rounded-xl bg-brand-accent/10 border border-brand-accent/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 640 512">
                    <path d="M623.2 192c-51.8 3.5-125.7 54.7-163.1 71.5-29.1 13.1-54.2 24.4-76.1 24.4-22.6 0-26-16.2-21.3-51.9 1.1-8 1.9-16.4 1.9-24.5 0-52.3-28.5-75.4-58.3-73-25.9 2.1-39.8 22.5-43.9 46.1-1.4 8-2.1 15.7-2.1 23.3 0 14.2 3.5 28.9 7.6 43.9-8.8 5-17.9 10.2-26.5 15.5C170.5 279.3 56 235.1 38.5 235.1c-16.3 0-30.5 15.1-30.5 33.3 0 17.7 21.7 24.2 33.7 30.1 38.4 19.1 88.9 43.1 141.6 43.1 15.8 0 30.6-2.9 44.8-8.7 9.3-3.8 18.8-8.4 28.7-13.2 1.7 4 3.4 7.6 5.3 11.5 4.8 9.8 11.7 18.2 21.4 22.7 5.1 2.3 10.4 3.4 15.8 3.4 17.7 0 28.2-11.4 36.5-22.4 8.4-10.5 14.4-22.3 20.7-35.1 26.7-54.5 52.3-84.9 130.5-94.6 39.2-4.8 62.7 23.4 62.7 59.1 0 24.2-9.2 40.9-9.2 55.6 0 21.1 13.3 34.3 34.4 34.3 16.2 0 44.9-18.5 56.4-24.4 30.9-15.8 76.7-49.2 80.2-71.2 3.5-22.1-16.1-32.9-27.2-32.9-3.2 0-6 .7-8.7 1.9z" />
                  </svg>
                  Industry Certificate Included
                </div>

                {/* Enroll CTA */}
                <button
                  onClick={onEnroll}
                  id={`enroll-${program.title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`}
                  className={`
                    w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${program.btnStyle}
                  `}
                >
                  Apply for Free Demo →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
