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
  {
    name: 'Rudram Nakarani',
    role: 'AI / ML Foundation Student',
    initials: 'RN',
    rating: 5,
    location: 'Surat',
    text: 'What I liked most about TarkAI is that we don’t just sit and study theory. We actually work on projects and understand how AI is used in real applications. The mentors are always there when we get stuck.',
    tag: 'AI / ML Foundation',
  },
  {
    name: 'Yash Ribadiya',
    role: 'AI / ML Foundation Student',
    initials: 'YR',
    rating: 5,
    location: 'Surat',
    text: 'The learning experience has been really practical. Topics that initially looked difficult became much easier once we started implementing them ourselves. The project work has also helped me become more confident with AI tools.',
    tag: 'AI / ML Foundation',
  },
  {
    name: 'Nency Rana',
    role: 'AI / ML Foundation Student',
    initials: 'NR',
    rating: 5,
    location: 'Surat',
    text: 'I was a little confused about where to start with AI and Machine Learning. The structured learning path at TarkAI made things much clearer for me. I especially enjoy the hands-on sessions and working on real projects.',
    tag: 'AI / ML Foundation',
  },
  {
    name: 'Khenil Rafaliya',
    role: 'AI / ML Foundation Student',
    initials: 'KR',
    rating: 5,
    location: 'Surat',
    text: 'The best part for me is the practical approach. We learn a concept and then actually build something with it. The mentors explain things patiently and help whenever we have doubts.',
    tag: 'AI / ML Foundation',
  },
  {
    name: 'Meet Korat',
    role: 'AI / ML Architect Student',
    initials: 'MK',
    rating: 5,
    location: 'Surat',
    text: 'Before joining TarkAI, I mostly knew AI from a theoretical perspective. Here, I’ve learned how to turn those concepts into working projects. The regular guidance and project-based learning have made a big difference.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Aadi Sonani',
    role: 'AI / ML Architect Student',
    initials: 'AS',
    rating: 5,
    location: 'Surat',
    text: 'TarkAI has given me a much better understanding of AI and Machine Learning. I really like that the sessions are focused on practical skills instead of only presentations. Building projects has made learning much more interesting.',
    tag: 'AI / ML Architect',
  }
];

interface TestimonialsSectionProps {
  badge?: string;
  title?: React.ReactNode;
  subtitle?: string;
  limit?: number;
}

export default function TestimonialsSection({ badge, title, subtitle, limit }: TestimonialsSectionProps) {
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    timer.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % displayTestimonials.length);
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
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#20A6A8]/40"></div>
            <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal tracking-widest">
              {badge || 'Student Success Stories'}
            </div>
            <div className="w-12 h-px bg-[#20A6A8]/40"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-4">
            {title || <>Proven Outcomes from <span className="text-[#20A6A8]">TarkAI Alumni</span></>}
          </h2>
          <p className="text-[16px] sm:text-[18px] font-normal leading-[1.65] text-slate-500 max-w-2xl mx-auto">
            {subtitle || 'Discover how our students transformed their skills and launched high-growth tech careers.'}
          </p>
        </div>

        {/* Coverflow Carousel */}
        <div className="relative h-105 sm:h-95 w-full max-w-5xl mx-auto flex items-center justify-center">
          <AnimatePresence initial={false}>
            {displayTestimonials.map((testimonial, index) => {
              // Calculate offset relative to current
              let offset = index - current;
              if (offset < -1) offset += displayTestimonials.length;
              if (offset > 1) offset -= displayTestimonials.length;

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
                      <span className="px-2.5 py-1 rounded-full bg-[#20A6A8]/10 border border-[#20A6A8]/20 text-[#20A6A8] text-[10px] font-bold uppercase tracking-widest">
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
                    <div className="w-10 h-10 rounded-full bg-[#20A6A8] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F1C1E] text-sm">{testimonial.name}</h4>
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
            {displayTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'w-6 bg-[#20A6A8]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                aria-label={`Go to slide ${i + 1}`}
                suppressHydrationWarning
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
