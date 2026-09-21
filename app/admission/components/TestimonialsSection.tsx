'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GeometricShapes from '@/app/components/GeometricShapes';

// Written testimonials
const testimonials = [
  {
    name: 'Garvi Savaliya',
    role: 'AI / ML Architect Student',
    initials: 'GS',
    rating: 5,
    location: 'Surat',
    text: 'TarkAI completely transformed how I understand Machine Learning and AI. Learning directly from IIIT Lucknow mentors gave me hands-on experience in fine-tuning LLMs, building Agentic AI systems, and working on live production projects.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Denisha Rafaliya',
    role: 'AI / ML Architect Student',
    initials: 'DR',
    rating: 5,
    location: 'Surat',
    text: 'The practical exposure at TarkAI is incredible. We don\'t just learn theoretical concepts — we build real-world ML pipelines and deployment workflows from day one. The mentorship in Surat has helped me build a solid portfolio.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Riya Vaishnav',
    role: 'AI / ML Architect Student',
    initials: 'RV',
    rating: 5,
    location: 'Surat',
    text: 'Starting with AI was intimidating, but TarkAI\'s structured curriculum made complex topics like Neural Networks, MLOps, and RAG architectures crystal clear. Small batch sizes mean every question gets answered personally.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Bansari Rafaliya',
    role: 'AI / ML Architect Student',
    initials: 'BR',
    rating: 5,
    location: 'Surat',
    text: 'TarkAI is by far Surat\'s most advanced AI institute. The focus on live project building and career readiness gave me immense confidence. The faculty goes above and beyond to ensure we master generative AI tools.',
    tag: 'AI / ML Architect',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    timer.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [autoplay, current]);

  const go = (idx: number) => {
    setCurrent(idx);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden" aria-label="Student Success Stories">
      <GeometricShapes variant="student-journeys" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#00737a] font-bold uppercase tracking-widest text-xs mb-2 block">
            STUDENT SUCCESS STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Proven Outcomes from <span className="text-[#00737a]">TarkAI Alumni</span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Discover how our students transformed their skills and launched high-growth tech careers.
          </p>
        </div>

        {/* Coverflow Carousel */}
        <div className="relative h-105 sm:h-95 w-full max-w-5xl mx-auto flex items-center justify-center">
          <AnimatePresence initial={false}>
            {testimonials.map((testimonial, index) => {
              // Calculate offset relative to current
              let offset = index - current;
              if (offset < -1) offset += testimonials.length;
              if (offset > 1) offset -= testimonials.length;

              // Hide cards that are not immediately adjacent
              const isVisible = offset === 0 || offset === 1 || offset === -1;
              if (!isVisible) return null;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x: offset * 105 + "%",
                    scale: offset === 0 ? 1 : 0.85,
                    opacity: offset === 0 ? 1 : 0.5,
                    zIndex: offset === 0 ? 30 : 10,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute w-70 sm:w-85 rounded-3xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col pointer-events-${offset === 0 ? 'auto' : 'none'}`}
                >
                  <div className="p-8 sm:p-10 flex-1 flex flex-col min-h-75">
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-2.5 py-1 rounded-full bg-[#f8fafc] border border-[#00737a]/20 text-[#00737a] text-[10px] font-bold uppercase tracking-widest">
                        {testimonial.tag}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <p className="text-[14px] sm:text-[15px] font-medium text-[#475569] leading-relaxed flex-1">
                      {testimonial.text}
                    </p>
                  </div>

                  <div className="bg-[#f8fafc] px-8 sm:px-10 py-5 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00737a] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e293b] text-sm">{testimonial.name}</h4>
                      <div className="text-slate-500 text-[11px] font-medium mt-0.5">{testimonial.role} • {testimonial.location}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-12 sm:mt-16">
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'w-6 bg-[#00a3ad]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
