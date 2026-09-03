'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaGraduationCap, FaStar, FaRocket, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import HeroBackground from './HeroBackground';

export default function HeroSection() {
  const [stats, setStats] = useState<{ averageRating: string; totalReviews: string }>({
    averageRating: '4.9',
    totalReviews: '226',
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setStats({
            averageRating: data.averageRating || '4.9',
            totalReviews: data.totalReviews || '226',
          });
        }
      } catch {
        // fallback
      }
    }
    loadSettings();
  }, []);
  return (
    <section className="relative bg-gradient-to-b from-brand-lightest/80 via-white to-brand-lightest/40 min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-20">
      <HeroBackground />

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">

            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-brand-accent/30 text-brand-darkest text-xs font-extrabold shadow-md backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
              </span>
              <span className="uppercase tracking-wider text-brand-accent">SURAT&apos;S #1 AI &amp; ML INSTITUTE</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-700 flex items-center gap-1 font-bold">
                <FaGraduationCap className="text-brand-accent text-sm" /> IIIT Lucknow Faculty
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-darkest tracking-tight leading-[1.08]">
              TARKAI EdTech
              <span className="block mt-2 bg-gradient-to-r from-brand-accent via-teal-600 to-brand-dark bg-clip-text text-transparent">
                Where Intelligence Meets Education
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              AI &amp; Machine Learning courses in Surat taught directly by IIIT Lucknow M.Sc. graduates. Master Agentic AI, RAG systems, and Data Science with 1-on-1 mentorship and a 1-Month Placement Ready Program.
            </p>

            {/* Key Bullet Highlights */}
            {/* <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 text-xs sm:text-sm font-bold text-brand-darkest pt-1">
              <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-xl border border-gray-200/80 shadow-xs">
                <FaCheckCircle className="text-brand-accent text-sm" />
                <span>Small Batches (Max 15)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-xl border border-gray-200/80 shadow-xs">
                <FaCheckCircle className="text-brand-accent text-sm" />
                <span>100% Live Projects</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-xl border border-gray-200/80 shadow-xs">
                <FaCheckCircle className="text-brand-accent text-sm" />
                <span>Placement Ready Program</span>
              </div>
            </div> */}

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://wa.me/919712358689?text=Hi%20TARKAI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-brand-darkest text-white font-extrabold text-sm hover:bg-brand-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 border-2 border-brand-darkest"
                id="hero-whatsapp-cta"
              >
                <FaWhatsapp className="text-xl text-green-400" />
                <span>Book a Free Demo Class</span>
              </a>
              <Link
                href="/programs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-accent text-white font-extrabold text-sm hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 border-brand-accent"
                id="hero-explore-programs"
              >
                <span>Explore Programs</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Trust Signals Footnote */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-bold text-gray-500">
              <div className="flex items-center gap-1.5 text-amber-500">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-xs" />
                  ))}
                </div>
                <span className="font-extrabold text-brand-darkest">{stats.averageRating}/5.0</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-gray-600">
                <FaShieldAlt className="text-brand-accent" /> {stats.totalReviews}+ Verified Google Reviews
              </span>
            </div>

          </div>

          {/* Right Column: Interactive AI Card Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Glassmorphic Main Showcase Card */}
              <div className="relative rounded-[32px] bg-white/90 backdrop-blur-xl border border-brand-accent/20 p-7 shadow-[0_20px_60px_rgba(0,35,51,0.12)] space-y-6">

                {/* Header Badge Inside Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-accent to-teal-400 text-white flex items-center justify-center text-xl shadow-lg">
                      <FaRocket />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-brand-darkest leading-tight">AI &amp; ML Architect Track</h3>
                      <p className="text-xs font-bold text-brand-accent">IIIT Lucknow Faculty Guided</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-400/15 text-amber-600 border border-amber-400/30 text-[11px] font-extrabold uppercase">
                    Featured
                  </span>
                </div>

                {/* Hero Feature Image */}
                <div className="relative w-full h-52 sm:h-60 rounded-[24px] overflow-hidden shadow-md bg-brand-lightest">
                  <Image
                    src="/AI_ML_Architect_Program.jfif"
                    alt="TarkAI AI & ML Course Surat"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold text-teal-300 block mb-0.5">Live Agentic &amp; RAG Systems</span>
                    <h4 className="text-lg font-extrabold leading-tight">Master Production AI Architectures</h4>
                  </div>
                </div>

                {/* Card Stats Pills */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-brand-lightest/60 rounded-2xl p-3 border border-brand-accent/15 text-center">
                    <span className="text-lg font-black text-brand-darkest block leading-tight">7 Months</span>
                    <span className="text-[11px] font-bold text-brand-accent">Full Curriculum</span>
                  </div>
                  <div className="bg-brand-lightest/60 rounded-2xl p-3 border border-brand-accent/15 text-center">
                    <span className="text-lg font-black text-brand-darkest block leading-tight">1-Month</span>
                    <span className="text-[11px] font-bold text-brand-accent">Placement Ready</span>
                  </div>
                </div>

              </div>

              {/* Floating Google Rating Badge (Bottom Right) */}
              <div className="absolute -bottom-6 -right-5 bg-white rounded-2xl p-3.5 shadow-xl border border-gray-100 hidden sm:flex items-center gap-3 shadow-brand-accent/10 z-20">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center text-lg shrink-0">
                  <FaStar />
                </div>
                <div>
                  <span className="text-xs font-black text-brand-darkest block leading-tight">{stats.averageRating} / 5.0 Rating</span>
                  <span className="text-[10px] font-bold text-gray-500">{stats.totalReviews}+ Google Reviews</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
