'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

interface HeroProps {
  onApplyNow: () => void;
}

const stats = [
  { value: 100, suffix: '+', label: 'Students Enrolled' },
  { value: 100, suffix: '%', label: 'Placement Support' },
  { value: 20, suffix: '+', label: 'Live Projects' },
  { value: 10, suffix: '+', label: 'Industry Mentors' },
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

export default function HeroSection({ onApplyNow }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-lightest pt-24 pb-16">
      {/* Background Image Design */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/BG_Design.png"
          alt="Hero Background Design"
          fill
          priority
          className="object-cover object-center opacity-100 mix-blend-overlay"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,165,163,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(45,165,163,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/15 mb-6 backdrop-blur-sm shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-brand-accent text-sm font-extrabold tracking-wider uppercase">
            Admissions Open 2026–27
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-brand-darkest tracking-tight leading-none mb-6"
        >
          Become{' '}
          <span className="text-brand-accent">
            Industry Ready
          </span>
          <br className="hidden sm:block" />
          {' '}with AI
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-brand-dark max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Master Artificial Intelligence &amp; Data Science under{' '}
          <span className="text-brand-accent font-bold">IIIT Lucknow</span> alumni.
          Join Surat&apos;s premier AI institute for hands-on live projects, 1-on-1 mentorship, and 100% placement support.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onApplyNow}
            id="hero-apply-now-cta"
            className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-white text-lg shadow-xl shadow-brand-darkest/15 transition-all duration-300 hover:scale-105 bg-brand-darkest hover:bg-brand-dark"
          >
            <span className="relative flex items-center gap-2">
              Apply Now, It&apos;s Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          <a
            href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20know%20more%20about%20your%20programs."
            target="_blank"
            rel="noopener noreferrer"
            id="hero-watch-journey-cta"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-brand-darkest text-lg border-2 border-brand-darkest/20 backdrop-blur-md bg-white/70 transition-all duration-300 hover:bg-white hover:border-brand-accent shadow-sm hover:shadow-md"
          >
            <span className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-green-600">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-brand-accent/20 bg-white/70 backdrop-blur-md shadow-lg shadow-brand-accent/5 hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-brand-accent mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-brand-darkest/80 font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 0C480 0 240 80 0 40L0 80Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
