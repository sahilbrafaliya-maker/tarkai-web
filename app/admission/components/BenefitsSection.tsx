'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import GeometricShapes from '@/app/components/GeometricShapes';

const benefits = [
  {
    id: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    title: 'IIIT Lucknow Mentors',
    description: 'Direct instruction from IIIT Lucknow graduates and active AI research engineers. Learn real system design from industry practitioners.',
  },
  {
    id: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: '20+ Production AI Projects',
    description: 'Go beyond basic notebooks. Fine-tune LLMs, architect Agentic AI workflows, and build RAG pipelines ready for production.',
  },
  {
    id: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '100% Placement Support',
    description: 'Comprehensive 1-Month Placement Program: ATS resume engineering, GitHub & LinkedIn profiling, mock technical interviews, and direct referrals.',
  },
  {
    id: '04',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Corporate Internship Track',
    description: 'Gain hands-on corporate experience through curated internship placements with our network of tech hiring partners.',
  },
  {
    id: '05',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Industry Certification',
    description: 'Receive an accredited TarkAI EdTech Certificate of Excellence, recognized by top IT firms and tech startups.',
  },
  {
    id: '06',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section ref={ref} className="py-20 sm:py-28 bg-white relative overflow-hidden" aria-label="Why choose TarkAI">
      
      {/* Premium Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GeometricShapes variant="why-choose-us" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-teal-50/50 blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[30%] h-[50%] rounded-full bg-[#00737a]/3 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
              Why You Should Choose <span className="text-[#00737a]">TarkAI</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Specific credentials and hands-on learning — here&apos;s what separates TarkAI from standard training programs.
          </p>
        </motion.div>

        {/* 3-Column Premium Card Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ y: -6 }}
              className="group flex flex-col p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,115,122,0.12)] hover:border-[#00737a]/30 transition-all duration-300 relative overflow-hidden text-left"
            >
              {/* Large Watermark Number */}
              <div className="absolute -bottom-6 -right-6 text-[120px] font-black text-slate-50 group-hover:text-[#00737a]/3 transition-colors duration-500 select-none pointer-events-none leading-none z-0">
                {benefit.id}
              </div>

              {/* Subtle Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-slate-200 to-transparent group-hover:via-[#00737a]/50 transition-colors duration-300 z-10" />

              <div className="relative z-10 flex-1">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#00737a] mb-6 group-hover:bg-[#00737a] group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-100">
                  {benefit.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-3 group-hover:text-[#00737a] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base font-normal text-[#475569] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
