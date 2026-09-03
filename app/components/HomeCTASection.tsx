'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaArrowRight, FaBolt } from 'react-icons/fa';

export default function HomeCTASection() {
  const [rating, setRating] = useState('4.9★');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.averageRating) setRating(`${data.averageRating}★`);
        }
      } catch {}
    }
    loadSettings();
  }, []);

  const stats = [
    { value: rating, label: 'Google Rating' },
    { value: '15', label: 'Max per Batch' },
    { value: '7mo', label: 'AI/ML Program' },
  ];
  return (
    <section
      className="py-10 sm:py-14 bg-white relative overflow-hidden"
      id="cta-headstart"
    >
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#2DA5A3 1px, transparent 1px), linear-gradient(90deg, #2DA5A3 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Horizontal pill banner */}
        <div className="relative rounded-[28px] border border-brand-accent/20 bg-gradient-to-r from-[#001c29] via-[#002d3f] to-[#001c29] overflow-hidden shadow-[0_8px_40px_rgba(0,35,51,0.18)]">

          {/* Ambient glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-teal-400/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-6 sm:px-10 py-8 sm:py-10">

            {/* LEFT — Badge + Headline */}
            <div className="flex-1 text-center lg:text-left space-y-3 min-w-0">

              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[11px] font-black uppercase tracking-widest">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Admissions Open · Next Batch
              </div>

              {/* Headline — short & punchy */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.1]">
                Your AI Career{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-brand-accent via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                    Starts Here.
                  </span>
                  {/* Underline accent */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent to-emerald-400 rounded-full opacity-60" />
                </span>
              </h2>

              {/* One-liner */}
              <p className="text-brand-light/70 text-sm font-normal max-w-md mx-auto lg:mx-0">
                IIIT Lucknow faculty · 100% live projects · 1-Month Placement Ready Program
              </p>
            </div>

            {/* CENTER — Floating stats strip (hidden on mobile) */}
            <div className="hidden lg:flex flex-col gap-3 shrink-0">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 backdrop-blur-sm"
                >
                  <span className="text-xl font-black text-brand-accent leading-none">{s.value}</span>
                  <span className="text-[11px] font-bold text-brand-light/60 leading-tight">{s.label}</span>
                </div>
              ))}
            </div>

            {/* RIGHT — CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
              <a
                href="https://wa.me/919712358689?text=Hi%20TARKAI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class."
                target="_blank"
                rel="noopener noreferrer"
                id="cta-whatsapp-headstart"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-black text-sm transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 whitespace-nowrap group"
              >
                <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform" />
                Book Free Demo
              </a>

              <Link
                href="/admission"
                id="cta-apply-now"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-brand-accent text-white font-black text-sm transition-all duration-300 border border-white/20 hover:border-brand-accent hover:-translate-y-0.5 whitespace-nowrap group"
              >
                <FaBolt className="text-brand-accent group-hover:text-white text-xs transition-colors" />
                Apply for Next Batch
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
