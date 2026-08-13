'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ProgramsProps {
  onEnroll: () => void;
}

const programs = [
  {
    tag: 'FLAGSHIP TRACK',
    title: 'AI / ML Architect Program',
    description: 'Master full-stack AI engineering — build autonomous AI agents, fine-tune open-source LLMs, engineer multi-agent RAG systems, and manage MLOps pipelines.',
    duration: '7 Months',
    mode: 'Blended (Surat Campus + Live Online)',
    highlights: [
      'LLM Fine-Tuning & Advanced Prompt Engineering',
      'Agentic AI Systems & Multi-Agent RAG Architectures',
      'MLOps, Docker Containerization & Cloud Deployment',
      '20+ Live Production-Grade Capstone Projects',
    ],
  },
  {
    tag: 'HIGH DEMAND',
    title: 'Data Science & Strategic Analytics',
    description: 'Transform complex data into strategic business value. Master Python data engineering, statistical modeling, machine learning, and BI dashboarding.',
    duration: '5 Months',
    mode: 'Blended (Surat Campus + Live Online)',
    highlights: [
      'Python, Pandas, NumPy & SQL Data Pipelines',
      'Statistical Machine Learning & Predictive Modeling',
      'Tableau & PowerBI Executive Analytics Dashboards',
      '15+ Real Corporate Case Studies & Industry Datasets',
    ],
  },
];

export default function ProgramsSection({ onEnroll }: ProgramsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-[#00737a] font-bold uppercase tracking-widest text-xs mb-2 block">
            CURATED SPECIALIZATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Master High-Impact <span className="text-[#00737a]">AI &amp; Data Tracks</span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Flagship career programs tailored for students, graduates, and working professionals seeking high-growth roles.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="bg-white border border-[#00737a]/20 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#00737a] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#f8fafc] border border-[#00737a]/20 text-[#00737a] uppercase tracking-wider">
                    {program.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748b] bg-[#f8fafc] px-3 py-1 rounded-full border border-slate-200">
                    <svg className="w-3.5 h-3.5 text-[#00737a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{program.duration}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-2 leading-tight">
                  {program.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-6 font-normal">
                  {program.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">Curriculum Highlights</p>
                  {program.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1e293b]">
                      <div className="w-4 h-4 rounded-full bg-[#f8fafc] text-[#00737a] border border-[#00737a]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <button
                onClick={onEnroll}
                id={`enroll-${program.title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`}
                className="w-full py-3.5 rounded-xl bg-[#00737a] hover:bg-[#005a60] text-white font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>Apply for Free 3-Day Demo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
