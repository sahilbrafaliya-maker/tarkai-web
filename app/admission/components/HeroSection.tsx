'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import AdmissionForm from '@/app/admission/components/AdmissionForm';

interface HeroProps {
  onApplyNow: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

const stats = [
  { value: 100, suffix: '+', label: 'Students Enrolled' },
  { value: 100, suffix: '%', label: 'Placement Support' },
  { value: 20, suffix: '+', label: 'Live Projects' },
  { value: 10, suffix: '+', label: 'IIIT Mentors' },
];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection({ onApplyNow, formRef }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-16 sm:pt-28 md:pt-32 pb-10 sm:pb-16 bg-[#f8fafc]" aria-label="Hero section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── Left Column: Headline, Text, Features & Stats ── */}
          <div className="lg:col-span-7 text-left space-y-5 sm:space-y-6 w-full">
            
            {/* Clean Responsive Hero Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15] sm:leading-tight mb-2">
                Become <span className="text-[#00737a]">Industry Ready</span> with AI
              </h1>
            </motion.div>

            {/* Paragraph Body Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-xl text-[#334155] leading-relaxed font-normal"
            >
              Master Artificial Intelligence &amp; Data Science under <strong className="font-bold text-[#0f172a]">IIIT Lucknow alumni mentors</strong>. Join Surat&apos;s premier AI institute to learn generative AI, fine-tuning LLMs, Agentic workflows, and statistical modeling with 100% placement support.
            </motion.p>

            {/* ── Admission Form on Mobile (Shown right below intro on mobile screens) ── */}
            <div className="block lg:hidden my-6 w-full" ref={formRef} id="admission-form-section">
              <AdmissionForm />
            </div>

            {/* CTA Buttons in Hero (Desktop/Tablet only - hidden on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden sm:flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
            >
              <button
                onClick={onApplyNow}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00737a] hover:bg-[#005a60] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 min-h-[48px]"
              >
                <span>Apply Now, It&apos;s Free</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <a
                href="https://wa.me/919712358689?text=Hi%20TarkAI!%20I%27d%20like%20to%20know%20more%20about%20admission."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border border-[#00737a]/30 hover:border-[#00737a] text-[#0f172a] hover:text-[#00737a] font-bold text-sm sm:text-base shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            {/* 4 Feature Cards (Mobile-friendly Grid) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            >
              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-[#00737a]/20 shadow-xs">
                <div className="p-2 sm:p-2.5 rounded-lg bg-[#f8fafc] shrink-0 mt-0.5 border border-[#00737a]/15 text-[#00737a]">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-base font-semibold text-[#0f172a]">Idea Generation Framework</p>
                  <p className="text-[11px] sm:text-sm font-normal text-[#64748b] mt-0.5">Learn to generate original ideas without asking AI</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-[#00737a]/20 shadow-xs">
                <div className="p-2 sm:p-2.5 rounded-lg bg-[#f8fafc] shrink-0 mt-0.5 border border-[#00737a]/15 text-[#00737a]">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-base font-semibold text-[#0f172a]">Corporate Case Studies</p>
                  <p className="text-[11px] sm:text-sm font-normal text-[#64748b] mt-0.5">Netflix, Swiggy, ChatGPT &amp; Instagram thinking</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-[#00737a]/20 shadow-xs">
                <div className="p-2 sm:p-2.5 rounded-lg bg-[#f8fafc] shrink-0 mt-0.5 border border-[#00737a]/15 text-[#00737a]">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-base font-semibold text-[#0f172a]">Live Brainstorming</p>
                  <p className="text-[11px] sm:text-sm font-normal text-[#64748b] mt-0.5">Create &amp; validate a project idea live from scratch</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-[#00737a]/20 shadow-xs">
                <div className="p-2 sm:p-2.5 rounded-lg bg-[#f8fafc] shrink-0 mt-0.5 border border-[#00737a]/15 text-[#00737a]">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-base font-semibold text-[#0f172a]">Hosted by Sahil Rafaliya</p>
                  <p className="text-[11px] sm:text-sm font-normal text-[#64748b] mt-0.5">Founder &amp; CEO of TarkAI EdTech PVT LTD</p>
                </div>
              </div>
            </motion.div>

            {/* Key Metrics Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-2"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-4 rounded-xl bg-white border border-[#00737a]/20 text-center shadow-xs"
                >
                  <div className="text-xl sm:text-3xl font-bold text-[#00737a]">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] sm:text-sm text-[#334155] font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Admission Form Column: Desktop Right Column ── */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 w-full" ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AdmissionForm />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Full-width location & contact banner strip below Hero */}
      <section className="bg-[#0f172a] text-white py-3.5 border-t border-[#00737a]/30 relative z-20 mt-12 sm:mt-16 w-full" aria-label="Contact and location information">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 sm:gap-3 lg:gap-4 text-xs sm:text-sm font-medium text-center lg:text-left">
            <a href="https://maps.google.com/?q=Kyros+Business+Center+Sarthana+Jakat+Naka+Surat+Gujarat" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center lg:justify-start gap-2 text-[#cbd5e1] hover:text-white transition-colors leading-tight">
              <svg className="w-4 h-4 text-[#00a8b0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Kyros Business Center, 404 &amp; 405, Sarthana Jakat Naka, Surat 395013</span>
            </a>
            <span className="hidden lg:block text-[#00a8b0]/30">•</span>
            <div className="flex items-center justify-center gap-2 text-[#cbd5e1] flex-wrap">
              <svg className="w-4 h-4 text-[#00a8b0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <span>Call:</span>
              <a href="tel:+919712358689" className="hover:text-white font-bold text-white transition-colors">+91 97123 58689</a>
            </div>
            <span className="hidden lg:block text-[#00a8b0]/30">•</span>
            <a href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20register%20for%20the%20admission." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-[#00a8b0] hover:text-white font-bold transition-colors">
              <span>WhatsApp Us — Register Instantly</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
