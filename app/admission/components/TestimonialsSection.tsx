'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    name: 'Garvi Savaliya',
    role: 'AI / ML Architect Student',
    initials: 'GS',
    color: 'from-brand-accent to-brand-dark',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'TARK AI completely transformed how I understand Machine Learning and AI. Learning directly from IIIT Lucknow mentors gave me hands-on experience in fine-tuning LLMs, building Agentic AI systems, and working on live production projects. The 1-on-1 guidance is unbeatable.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Denisha Rafaliya',
    role: 'AI / ML Architect Student',
    initials: 'DR',
    color: 'from-purple-500 to-indigo-600',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'The practical exposure at TARK AI is incredible. We don\'t just learn theoretical concepts — we build real-world ML pipelines and deployment workflows from day one. The mentorship and peer community in Surat have helped me build a strong portfolio.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Riya Vaishnav',
    role: 'AI / ML Architect Student',
    initials: 'RV',
    color: 'from-teal-500 to-emerald-600',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'Starting with AI was intimidating, but TARK AI\'s structured curriculum made complex topics like Neural Networks, MLOps, and RAG architectures crystal clear. Small batch sizes mean every question gets answered personally by industry experts.',
    tag: 'AI / ML Architect',
  },
  {
    name: 'Bansari Rafaliya',
    role: 'AI / ML Architect Student',
    initials: 'BR',
    color: 'from-amber-500 to-orange-600',
    rating: 5,
    location: 'Surat, Gujarat',
    text: 'TARK AI is by far Surat\'s most advanced AI institute. The focus on live project building and career readiness gave me immense confidence. The faculty goes above and beyond to ensure we master both fundamentals and modern generative AI tools.',
    tag: 'AI / ML Architect',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const ref = useRef(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    timer.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [autoplay, current]);

  const go = (idx: number) => {
    setCurrent(idx);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  return (
    <section className="py-24 bg-brand-darkest relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-dark/20 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3">Student Stories</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Real Results,{' '}
            <span className="text-brand-accent">Real Careers</span>
          </h2>
          <p className="text-brand-light/60 max-w-xl mx-auto">
            Don&apos;t take our word for it — here&apos;s what our alumni say.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative p-8 md:p-10 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              {/* Quote mark background - positioned away from header badge */}
              <div className="absolute bottom-6 right-8 text-7xl text-brand-accent/10 font-serif leading-none select-none pointer-events-none">&rdquo;</div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Header: Rating & Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <StarRating count={testimonials[current].rating} />
                  <span className="px-3.5 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/35 text-brand-accent text-xs font-bold tracking-wide">
                    {testimonials[current].tag}
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-white/95 text-lg md:text-xl leading-relaxed mb-8 italic font-normal">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                {/* Student Info Footer */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-extrabold text-sm tracking-wider shadow-lg flex-shrink-0 border border-white/20`}>
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-base leading-tight">{testimonials[current].name}</div>
                    <div className="text-brand-accent text-sm font-semibold mt-0.5">{testimonials[current].role}</div>
                    <div className="text-brand-light/50 text-xs mt-0.5">{testimonials[current].location}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => go((current - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-brand-accent/20 hover:border-brand-accent/40 transition-all"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-brand-accent' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go((current + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-brand-accent/20 hover:border-brand-accent/40 transition-all"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ─── Instagram Video Reels Testimonials ──────────────────────────── */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-white/10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold mb-3 shadow-md backdrop-blur-md">
              <svg className="w-4 h-4 fill-current text-pink-400" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Watch Video Testimonials on Instagram</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hear Directly From Our <span className="text-pink-400">Students</span>
            </h3>
            <p className="text-brand-light/70 text-sm mt-2 max-w-lg mx-auto">
              Real student experiences, feedback, and success stories shared on our Instagram page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                id: 'DZUJ5_kAS5d',
                name: 'Riya Vaishnav',
                role: 'AI / ML Foundation',
                title: 'Riya Vaishnav — TARK AI Student Story',
                url: 'https://www.instagram.com/reel/DZUJ5_kAS5d/',
                embedUrl: 'https://www.instagram.com/reel/DZUJ5_kAS5d/embed',
              },
              {
                id: 'DZ6ptG2lYSh',
                name: 'Denisha Rafaliya',
                role: 'AI / ML Foundation',
                title: 'Denisha Rafaliya — TARK AI Student Story',
                url: 'https://www.instagram.com/reel/DZ6ptG2lYSh/',
                embedUrl: 'https://www.instagram.com/reel/DZ6ptG2lYSh/embed',
              },
              {
                id: 'DaKqlobjfUQ',
                name: 'Garvi Savaliya',
                role: 'AI / ML Foundation',
                title: 'Garvi Savaliya — TARK AI Student Story',
                url: 'https://www.instagram.com/reel/DaKqlobjfUQ/',
                embedUrl: 'https://www.instagram.com/reel/DaKqlobjfUQ/embed',
              },
            ].map((reel) => (
              <div
                key={reel.id}
                className="rounded-3xl border border-white/15 bg-white/5 p-3.5 flex flex-col items-center overflow-hidden hover:border-pink-500/50 hover:bg-white/[0.08] transition-all shadow-2xl group"
              >
                <div className="w-full overflow-hidden rounded-2xl bg-black/50 relative border border-white/10">
                  <iframe
                    src={reel.embedUrl}
                    title={reel.title}
                    className="w-full h-[540px] border-0 overflow-hidden rounded-2xl"
                    scrolling="no"
                    allow="encrypted-media"
                  />
                </div>
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Watch {reel.name}&apos;s Reel</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
