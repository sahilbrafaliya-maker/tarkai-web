'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import AdmissionForm from '@/app/admission/components/AdmissionForm';

interface HeroProps {
  onApplyNow: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

const stats = [
  { value: 1000, suffix: '+', label: 'Students Mentored' },
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
    <section className="relative min-h-max flex flex-col items-center justify-center overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 bg-[#f8fafc]" aria-label="Admission info and form section">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-200/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#00737a]/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Key Metrics Chips (Top Row) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12 sm:mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative p-5 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,115,122,0.08)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-[#00737a]/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00737a] transition-all duration-300 mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-extrabold text-[#0f172a] uppercase tracking-wide mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Left Column: Demo Journey ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-6 sm:space-y-8 w-full"
          >
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              {/* <div className="w-8 h-1 bg-[#00737a] rounded-full" /> */}
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] tracking-tight">
                Your 3-Day Demo Journey
              </h2>
            </div>

            {/* Premium Animated Feature Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.4 }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-8 sm:pt-12"
            >
              {[
                {
                  id: '01',
                  title: 'Idea Generation',
                  desc: 'Learn to generate original ideas without asking AI',
                },
                {
                  id: '02',
                  title: 'Corporate Cases',
                  desc: 'Netflix, Swiggy, ChatGPT & Instagram thinking',
                },
                {
                  id: '03',
                  title: 'Live Brainstorming',
                  desc: 'Create & validate a project idea live from scratch',
                },
                {
                  id: '04',
                  title: 'Hosted by Sahil',
                  desc: 'Founder & CEO of TarkAI EdTech PVT LTD',
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="flex flex-col p-6 sm:p-8 rounded-3xl bg-white border border-[#00737a]/30 shadow-[0_20px_40px_rgba(0,115,122,0.12)] relative overflow-hidden"
                >
                  {/* Watermark Number */}
                  <div className="absolute -bottom-4 -right-4 text-[100px] font-black text-[#00737a]/3 select-none pointer-events-none leading-none">
                    {card.id}
                  </div>

                  {/* Subtle Top Gradient Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#00737a]/50 to-transparent" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00737a] text-white font-bold text-xs">
                        {card.id}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">{card.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base font-normal text-[#475569] leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Admission Form Column: Desktop Right Column ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-24 w-full"
            ref={formRef}
          >
            {/* Mobile shows form inside the flow, Desktop shows sticky right */}
            <div id="admission-form-section">
              <AdmissionForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
