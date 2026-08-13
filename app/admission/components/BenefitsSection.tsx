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
    title: 'IIIT Lucknow Mentors',
    description: 'Direct instruction from IIIT Lucknow graduates and active AI research engineers. Learn real system design from industry practitioners.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: '20+ Production AI Projects',
    description: 'Go beyond basic notebooks. Fine-tune LLMs, architect Agentic AI workflows, and build RAG pipelines ready for production.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '100% Placement Support',
    description: 'Comprehensive 1-Month Placement Program: ATS resume engineering, GitHub & LinkedIn profiling, mock technical interviews, and direct referrals.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Corporate Internship Track',
    description: 'Gain hands-on corporate experience through curated internship placements with our network of tech hiring partners.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Industry Certification',
    description: 'Receive an accredited TarkAI EdTech Certificate of Excellence, recognized by top IT firms and tech startups.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Lifelong Tech Community',
    description: 'Gain lifetime access to an elite network of 1,000+ AI engineers, founders, and alumni across Surat and India.',
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden" aria-label="Why choose TarkAI">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight mb-4">
            Why You Should Choose <span className="text-[#00737a] block sm:inline">TarkAI EdTech</span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto font-normal">
            Specific credentials and hands-on learning — here&apos;s what separates TarkAI from standard training programs.
          </p>
        </motion.div>

        {/* 3-Column White Card Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative p-8 rounded-2xl transition-all duration-300 bg-[#f8fafc] hover:bg-white border border-[#00737a]/20 hover:border-[#00737a] text-center shadow-xs hover:shadow-xl"
            >
              <div className="w-14 h-14 mx-auto bg-white rounded-2xl flex items-center justify-center text-[#00737a] mb-6 group-hover:scale-110 group-hover:bg-[#00737a] group-hover:text-white transition-all duration-300 shadow-xs border border-[#00737a]/20">
                {benefit.icon}
              </div>

              <h3 className="text-lg font-bold text-[#0f172a] mb-3 group-hover:text-[#00737a] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-[#475569] leading-relaxed text-sm font-normal">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
