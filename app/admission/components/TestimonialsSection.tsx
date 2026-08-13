'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

// Written testimonials
const testimonials = [
  {
    name: 'Garvi Savaliya',
    role: 'AI / ML Architect Student',
    initials: 'GS',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'TarkAI completely transformed how I understand Machine Learning and AI. Learning directly from IIIT Lucknow mentors gave me hands-on experience in fine-tuning LLMs, building Agentic AI systems, and working on live production projects.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Denisha Rafaliya',
    role: 'AI / ML Architect Student',
    initials: 'DR',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'The practical exposure at TarkAI is incredible. We don\'t just learn theoretical concepts — we build real-world ML pipelines and deployment workflows from day one. The mentorship in Surat has helped me build a solid portfolio.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Riya Vaishnav',
    role: 'AI / ML Architect Student',
    initials: 'RV',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'Starting with AI was intimidating, but TarkAI\'s structured curriculum made complex topics like Neural Networks, MLOps, and RAG architectures crystal clear. Small batch sizes mean every question gets answered personally.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Bansari Rafaliya',
    role: 'AI / ML Architect Student',
    initials: 'BR',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'TarkAI is by far Surat\'s most advanced AI institute. The focus on live project building and career readiness gave me immense confidence. The faculty goes above and beyond to ensure we master generative AI tools.',
    tag: 'AI / ML Architect',
  },
];

// Local Reel Videos from /public/Reels
const baseVideoReels = [
  {
    id: 'garvi',
    name: 'Garvi Savaliya',
    poster: '/Reels/Garvi.jpeg',
    video: '/Reels/Garvi final.mp4',
  },
  {
    id: 'denisha',
    name: 'Denisha Rafaliya',
    poster: '/Reels/Denisha.jpeg',
    video: '/Reels/Denisha final.mp4',
  },
  {
    id: 'riya',
    name: 'Riya Vaishnav',
    poster: '/Reels/Riya Vaishanav.png',
    video: '/Reels/Riya.mp4',
  },
];

// Duplicated array for seamless continuous marquee
const videoReels = [
  ...baseVideoReels,
  ...baseVideoReels,
  ...baseVideoReels,
  ...baseVideoReels,
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const ref = useRef(null);
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
    <section ref={ref} className="py-16 sm:py-24 bg-[#f8fafc] relative overflow-hidden" aria-label="Student Success Stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[#00737a] font-bold uppercase tracking-widest text-xs mb-2 block">
            STUDENT SUCCESS STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Proven Outcomes from <span className="text-[#00737a]">TarkAI Alumni</span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-xl mx-auto mt-3 font-normal leading-relaxed">
            Discover how our students transformed their skills and launched high-growth tech careers.
          </p>
        </div>

        {/* Written Testimonial Card */}
        <div className="relative max-w-3xl mx-auto mb-16 sm:mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#00737a]/20 rounded-3xl p-6 sm:p-10 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
                <StarRating count={testimonials[current].rating} />
                <span className="px-3 py-1 rounded-full bg-[#f8fafc] border border-[#00737a]/20 text-[#00737a] text-xs font-bold">
                  {testimonials[current].tag}
                </span>
              </div>

              <p className="text-[#0f172a] text-base sm:text-xl leading-relaxed sm:leading-relaxed mb-6 font-medium">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#00737a] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                  {testimonials[current].initials}
                </div>
                <div>
                  <div className="font-bold text-[#0f172a] text-sm sm:text-base">{testimonials[current].name}</div>
                  <div className="text-[#00737a] text-xs font-semibold mt-0.5">{testimonials[current].role} • {testimonials[current].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls with Crisp SVG Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => go((current - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center hover:bg-[#00737a] hover:border-[#00737a] transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6 bg-[#00737a]' : 'w-2 bg-slate-300'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go((current + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center hover:bg-[#00737a] hover:border-[#00737a] transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Video Reels Section (Borderless Cards & Continuous Scroll) ── */}
        <div className="pt-10 sm:pt-14 border-t border-slate-200/80">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00737a]/10 text-[#00737a] text-xs font-bold border border-[#00737a]/20 mb-3">
              <svg className="w-4 h-4 text-[#00737a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Video Student Reviews
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
              Hear Directly from Our Students
            </h3>
            <p className="text-sm text-[#475569] mt-1 font-normal max-w-lg mx-auto">
              Tap any video card to play student review.
            </p>
          </div>

          {/* Marquee Track with ample vertical space & refined mobile gaps */}
          <div className="relative w-full overflow-hidden py-8 sm:py-12">
            {/* Fade Gradients on Left and Right edges */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-20 pointer-events-none" />

            <div className={`animate-continuous-marquee flex gap-4 sm:gap-8 ${playingId ? 'is-paused' : ''}`}>
              {videoReels.map((reel, index) => {
                const uniqueKey = `${reel.id}-${index}`;
                const isPlaying = playingId === uniqueKey;

                return (
                  <div
                    key={uniqueKey}
                    onClick={() => {
                      setPlayingId(isPlaying ? null : uniqueKey);
                    }}
                    className="group relative flex-shrink-0 w-60 sm:w-72 aspect-[9/16] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xl bg-transparent cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 select-none"
                  >
                    {isPlaying ? (
                      <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-black">
                        <video
                          ref={(el) => {
                            if (el) {
                              el.muted = false;
                              el.play().catch(() => {
                                el.muted = true;
                                el.play();
                              });
                            }
                          }}
                          src={reel.video}
                          autoPlay
                          playsInline
                          onEnded={() => setPlayingId(null)}
                          className="w-full h-full object-cover rounded-[28px] sm:rounded-[32px] border-0 outline-none"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-transparent">
                        <Image
                          src={reel.poster}
                          alt={`${reel.name} Review`}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-[28px] sm:rounded-[32px] border-0 outline-none"
                          priority={index < 3}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
