'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    title: 'Industry Mentors',
    description: 'Learn directly from IIIT Lucknow M.Sc. AI graduates and working industry professionals. Not just trainers — real builders.',
    iconBg: 'bg-blue-50 border-blue-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    border: 'hover:border-blue-500/40',
    glow: 'hover:shadow-blue-500/15',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Real Projects',
    description: 'Build 20+ live AI projects from scratch. Go from theory to deployable ML products — GitHub portfolio ready on day one.',
    iconBg: 'bg-purple-50 border-purple-200/80 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    border: 'hover:border-purple-500/40',
    glow: 'hover:shadow-purple-500/15',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Career Support',
    description: '1-Month Placement Ready Program: ATS resume, LinkedIn, GitHub review, mock interviews, and career coaching — included.',
    iconBg: 'bg-teal-50 border-teal-200/80 text-teal-600 group-hover:bg-teal-600 group-hover:text-white',
    border: 'hover:border-teal-500/40',
    glow: 'hover:shadow-teal-500/15',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Internship Assistance',
    description: 'Get connected to real internship opportunities with partner companies through our growing industry network.',
    iconBg: 'bg-amber-50 border-amber-200/80 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
    border: 'hover:border-amber-500/40',
    glow: 'hover:shadow-amber-500/15',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Industry Certificate',
    description: 'Earn a recognized AI certification upon completion. Add credibility to your resume and LinkedIn profile instantly.',
    iconBg: 'bg-emerald-50 border-emerald-200/80 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    border: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-emerald-500/15',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Lifetime Community',
    description: 'Join an elite network of 1000+ AI professionals, alumni, and mentors. Peer learning, job referrals, and lifelong support.',
    iconBg: 'bg-rose-50 border-rose-200/80 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
    border: 'hover:border-rose-500/40',
    glow: 'hover:shadow-rose-500/15',
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-brand-lightest relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-brand-accent/10 rounded-full" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-brand-dark/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3">Why Choose TARK AI</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-4 tracking-tight">
            Everything You Need to{' '}
            <span className="text-brand-accent">Launch Your AI Career</span>
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
            We don&apos;t just teach — we build, mentor, and launch careers. Here&apos;s what comes with your enrollment.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`
                group relative p-8 rounded-2xl border border-brand-darkest/10
                bg-white shadow-sm hover:shadow-2xl ${benefit.glow} ${benefit.border}
                hover:-translate-y-2 transition-all duration-300 cursor-default
                flex flex-col justify-between
              `}
            >
              <div>
                {/* Icon Badge */}
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 shadow-xs ${benefit.iconBg}`}>
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-extrabold text-brand-darkest mb-3 group-hover:text-brand-accent transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-brand-dark/80 leading-relaxed text-sm font-medium">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom accent indicator line on hover */}
              <div className="w-8 h-1 rounded-full bg-brand-darkest/10 group-hover:w-full group-hover:bg-brand-accent transition-all duration-300 mt-6" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
