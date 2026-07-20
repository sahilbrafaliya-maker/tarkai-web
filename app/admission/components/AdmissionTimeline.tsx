'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const steps = [
  {
    number: '01',
    stepLabel: 'STEP 01',
    title: 'Fill Application',
    description: 'Complete our multi-step application form. Takes less than 3 minutes. No documents required.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    badgeBg: 'bg-brand-accent/10 text-brand-accent border-brand-accent/30',
    iconBg: 'bg-gradient-to-br from-brand-accent to-brand-dark text-white shadow-brand-accent/30',
    border: 'border-brand-accent/30 hover:border-brand-accent/60',
    accentLine: 'bg-brand-accent',
    textColor: 'text-brand-accent',
    glow: 'hover:shadow-brand-accent/15',
  },
  {
    number: '02',
    stepLabel: 'STEP 02',
    title: 'Profile Review',
    description: 'Our admission team reviews your profile within 24 hours and matches you with the ideal track.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    badgeBg: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-purple-500/30',
    border: 'border-purple-500/30 hover:border-purple-500/60',
    accentLine: 'bg-purple-600',
    textColor: 'text-purple-600',
    glow: 'hover:shadow-purple-500/15',
  },
  {
    number: '03',
    stepLabel: 'STEP 03',
    title: 'Counselling Call',
    description: 'A 1:1 call with an academic advisor to clarify your goals, answer questions, and build your roadmap.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-amber-500/30',
    border: 'border-amber-500/30 hover:border-amber-500/60',
    accentLine: 'bg-amber-600',
    textColor: 'text-amber-600',
    glow: 'hover:shadow-amber-500/15',
  },
  {
    number: '04',
    stepLabel: 'STEP 04',
    title: 'Enrollment',
    description: 'Confirm your seat, complete enrollment, and start your AI journey with TARK AI.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    badgeBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-emerald-500/30',
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    accentLine: 'bg-emerald-600',
    textColor: 'text-emerald-600',
    glow: 'hover:shadow-emerald-500/15',
  },
];

export default function AdmissionTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-brand-lightest/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3">Simple Process</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-4 tracking-tight">
            Your Admission Journey
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-xl mx-auto">
            From application to first class in under 48 hours.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-7 left-[10%] right-[10%] h-1 bg-gradient-to-r from-brand-accent via-purple-500 via-amber-500 to-emerald-500 rounded-full z-0 opacity-80" />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                {/* Step Circle Badge */}
                <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-lg relative transition-transform duration-300 hover:scale-110`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-black text-brand-darkest">{i + 1}</span>
                  </div>
                </div>

                {/* Connecting Vertical Stem */}
                <div className="w-0.5 h-6 bg-slate-200 my-1" />

                {/* Content Card */}
                <div className={`p-6 rounded-2xl border ${step.border} bg-white shadow-md hover:shadow-xl ${step.glow} hover:-translate-y-1 transition-all duration-300 w-full flex flex-col justify-between h-full`}>
                  <div>
                    <span className={`inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full border mb-3 ${step.badgeBg}`}>
                      {step.stepLabel}
                    </span>
                    <h3 className="text-lg font-extrabold text-brand-darkest mb-2 leading-snug">{step.title}</h3>
                    <p className="text-sm text-brand-dark/80 leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative">
          <div className="space-y-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5 relative"
              >
                {/* Connecting line to NEXT step (stopped cleanly before last step) */}
                {i < steps.length - 1 && (
                  <div
                    className={`
                      absolute left-[27px] top-7 bottom-0 w-1 -mb-6 z-0 rounded-full
                      ${i === 0 ? 'bg-gradient-to-b from-brand-accent to-purple-500' : ''}
                      ${i === 1 ? 'bg-gradient-to-b from-purple-500 to-amber-500' : ''}
                      ${i === 2 ? 'bg-gradient-to-b from-amber-500 to-emerald-500' : ''}
                    `}
                  />
                )}

                {/* Circle */}
                <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-lg flex-shrink-0 z-10 relative`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className={`flex-1 p-5 rounded-2xl border ${step.border} bg-white shadow-md z-10 relative`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${step.badgeBg}`}>
                      {step.stepLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-darkest mb-2">{step.title}</h3>
                  <p className="text-sm text-brand-dark/80 leading-relaxed font-medium">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
