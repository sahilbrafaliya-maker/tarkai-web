'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const steps = [
  {
    step: '01',
    title: 'Submit Online Application',
    description: 'Complete our streamlined 2-minute application form with basic contact details. No documentation required.',
  },
  {
    step: '02',
    title: 'Academic Counseling & Evaluation',
    description: 'Our admissions team evaluates your background to match you with the ideal specialization and demo batch.',
  },
  {
    step: '03',
    title: 'Attend Free 3-Day Demo',
    description: 'Experience 3 days of live interactive learning (at Surat campus or online) with IIIT Lucknow mentors.',
  },
  {
    step: '04',
    title: 'Seat Confirmation & Onboarding',
    description: 'Finalize your track, select flexible 0% EMI options, and commence your hands-on AI journey.',
  },
];

export default function AdmissionTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-[#00737a] font-bold uppercase tracking-widest text-xs mb-2 block">
            SEAMLESS ADMISSION PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Four Steps to <span className="text-[#00737a]">Your AI Future</span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-xl mx-auto mt-3 font-normal leading-relaxed">
            From application submission to attending your first live demo class in under 48 hours.
          </p>
        </motion.div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#f8fafc] border border-[#00737a]/20 hover:border-[#00737a] hover:bg-white rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#00737a]">
                    {item.step}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00737a]/30 group-hover:bg-[#00737a] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2 leading-snug group-hover:text-[#00737a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
