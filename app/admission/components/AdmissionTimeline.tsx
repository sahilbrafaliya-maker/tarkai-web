'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import GeometricShapes from '@/app/components/GeometricShapes';

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
    <section ref={ref} className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <GeometricShapes variant="your-journey" />
        <div className="absolute top-[20%] right-[0%] w-[30%] h-[40%] rounded-full bg-teal-100/30 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
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
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
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
          {steps.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,115,122,0.12)] hover:border-[#00737a]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              {/* Large Watermark Number */}
              <div className="absolute -bottom-6 -right-6 text-[120px] font-black text-slate-50 group-hover:text-[#00737a]/5 transition-colors duration-500 select-none pointer-events-none leading-none z-0">
                {item.step}
              </div>

              {/* Subtle Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-slate-200 to-transparent group-hover:via-[#00737a]/50 transition-colors duration-300 z-10" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f8fafc] text-[#00737a] font-bold text-sm shadow-sm border border-slate-100 group-hover:bg-[#00737a] group-hover:text-white group-hover:border-[#00737a] transition-all">
                    {item.step}
                  </span>
                  
                  {/* Dotted line indicator (only visible on large screens except the last item) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-12 w-full h-0.5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiNjYmQ1ZTEiLz48L3N2Zz4=')] translate-x-1/2 opacity-50 z-0" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-[#0f172a] mb-3 leading-snug group-hover:text-[#00737a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
