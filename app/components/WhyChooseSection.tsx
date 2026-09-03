'use client';

import { FaGraduationCap, FaBrain, FaRocket, FaUsers, FaUserTie, FaBriefcase, FaStar, FaCheckCircle } from 'react-icons/fa';
import GeometricShapes from './GeometricShapes';

export default function WhyChooseSection() {
  return (
    <section className="py-18 bg-gradient-to-b from-white via-brand-lightest/20 to-white relative overflow-hidden" id="why-choose-tarkai">
      <GeometricShapes hideBigHexagon={true} hideTriangle={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-accent font-extrabold uppercase tracking-widest text-xs mb-3 block">
            THE TARKAI ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-darkest tracking-tight mb-5">
            Why Choose <span className="bg-gradient-to-r from-brand-accent via-teal-600 to-brand-dark bg-clip-text text-transparent">TarkAI?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal">
            Specific credentials, proven methodologies, and unmatched mentor dedication — see what makes TarkAI Surat&apos;s premier AI institute.
          </p>
        </div>

        {/* Custom 4-Column x 3-Row Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 gap-6">

          {/* Card 1: IIIT Lucknow Faculty (Row 1-2, Col 1 - Tall Card) */}
          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 rounded-[32px] bg-gradient-to-br from-brand-darkest via-[#002b3d] to-brand-darkest text-white p-8 border border-white/15 shadow-2xl relative overflow-hidden group hover:border-brand-accent transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[90px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent text-white flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <FaGraduationCap />
                </div>
                <span className="text-[11px] font-bold text-amber-300 bg-white/10 border border-amber-300/30 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  Faculty
                </span>
              </div>

              <span className="text-[11px] font-extrabold text-brand-light uppercase tracking-widest mb-1.5 block">
                Academic Excellence
              </span>
              <h3 className="text-2xl font-black mb-3 tracking-tight text-white leading-tight">
                IIIT Lucknow Faculty
              </h3>

              <p className="text-brand-light/90 text-sm leading-relaxed font-normal mb-6">
                Your instructors hold M.Sc. degrees in AI, Machine Learning, and Data Science directly from IIIT Lucknow — not unverified corporate trainers.
              </p>

              <div className="space-y-2.5 border-t border-white/10 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <FaCheckCircle className="text-brand-accent text-sm shrink-0" />
                  <span>M.Sc. AI/ML Degree Holders</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <FaCheckCircle className="text-brand-accent text-sm shrink-0" />
                  <span>1-on-1 Code Mentorship</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 100% Dedicated to AI & ML Focus (Row 1, Col 2) */}
          <div className="lg:col-start-2 lg:row-start-1 rounded-[32px] bg-white p-7 border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group hover:border-brand-accent/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-lightest text-brand-accent group-hover:bg-brand-accent group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 shadow-xs">
                  <FaBrain />
                </div>
                <span className="text-[10px] font-bold text-brand-accent bg-brand-lightest border border-brand-accent/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Pure AI Focus
                </span>
              </div>

              <span className="text-[10px] font-extrabold text-brand-accent uppercase tracking-widest mb-1 block">
                Surat&apos;s AI Specialists
              </span>
              <h3 className="text-lg font-bold text-brand-darkest mb-1 group-hover:text-brand-accent transition-colors leading-snug">
                100% Pure AI &amp; ML Focus
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed font-normal mt-1.5">
                While other institutes divide attention across web, app, and UI/UX, we focus 100% exclusively on production AI &amp; Machine Learning.
              </p>
            </div>
          </div>

          {/* Card 3: 1-Month Placement Ready Program (Row 1, Col 3-4, Spans 2 Cols) */}
          <div className="lg:col-span-2 lg:col-start-3 lg:row-start-1 rounded-[32px] bg-gradient-to-br from-brand-accent via-teal-600 to-brand-dark text-white p-8 shadow-2xl relative overflow-hidden group hover:shadow-brand-accent/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-teal-400/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white text-brand-accent flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <FaRocket />
                </div>
                <span className="text-[11px] font-bold text-brand-darkest bg-amber-300 px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  100% Included
                </span>
              </div>

              <span className="text-[11px] font-extrabold text-brand-light uppercase tracking-widest mb-1 block">
                Career Engineering
              </span>
              <h3 className="text-2xl font-black mb-2 tracking-tight text-white leading-tight">
                1-Month Placement Ready Program
              </h3>

              <p className="text-brand-light/95 text-xs sm:text-sm leading-relaxed font-normal max-w-xl">
                Includes ATS resume optimization, LinkedIn profile overhaul, technical &amp; HR mock interviews, and GitHub portfolio polish.
              </p>
            </div>
          </div>

          {/* Card 4: Small Batch Mentorship (Row 2, Col 2-3, Spans 2 Cols) */}
          <div className="lg:col-span-2 lg:col-start-2 lg:row-start-2 rounded-[32px] bg-white p-8 border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group hover:border-brand-accent/40">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-lightest text-brand-accent group-hover:bg-brand-accent group-hover:text-white flex items-center justify-center text-2xl transition-all duration-300 shadow-sm">
                  <FaUsers />
                </div>
                <span className="text-[11px] font-bold text-brand-accent bg-brand-lightest border border-brand-accent/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  Max 15 Students
                </span>
              </div>

              <h3 className="text-2xl font-bold text-brand-darkest mb-1 group-hover:text-brand-accent transition-colors">
                Small Batch Mentorship
              </h3>
              <p className="text-xs font-bold text-brand-accent uppercase tracking-wider mb-3">
                Personalized 1-on-1 Attention
              </p>

              <p className="text-gray-600 text-sm leading-relaxed font-normal max-w-xl">
                Strict limits on batch size guarantee every student gets individual code reviews, customized pacing, and direct access to IIIT Lucknow mentors.
              </p>
            </div>
          </div>

          {/* Card 5: Industry Expert Sessions (Row 2-3, Col 4 - Tall Card) */}
          <div className="lg:col-start-4 lg:row-start-2 lg:row-span-2 rounded-[32px] bg-gradient-to-b from-[#003847] via-brand-darkest to-[#002333] text-white p-8 border border-white/15 shadow-2xl relative overflow-hidden group hover:border-brand-accent transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/15 rounded-full blur-[90px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent text-white flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <FaUserTie />
                </div>
                <span className="text-[11px] font-bold text-teal-300 bg-white/10 border border-teal-300/30 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  Industry Leaders
                </span>
              </div>

              <span className="text-[11px] font-extrabold text-brand-light uppercase tracking-widest mb-1.5 block">
                Top Tier Exposure
              </span>
              <h3 className="text-2xl font-black mb-3 tracking-tight text-white leading-tight">
                Masterclasses with Industry Experts
              </h3>

              <p className="text-brand-light/90 text-sm leading-relaxed font-normal mb-6">
                Direct masterclasses, live architecture reviews, and tech insights with seasoned engineers and AI practitioners from leading tech companies and high-growth startups.
              </p>

              <div className="space-y-2.5 border-t border-white/10 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <FaCheckCircle className="text-brand-accent text-sm shrink-0" />
                  <span>Top Tech &amp; AI Startup Insights</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <FaCheckCircle className="text-brand-accent text-sm shrink-0" />
                  <span>Real-World System Architectures</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: 100% Live Projects & Job Support (Row 3, Col 1-2, Spans 2 Cols) */}
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-3 rounded-[32px] bg-white p-8 border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group hover:border-brand-accent/40">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-lightest text-brand-accent group-hover:bg-brand-accent group-hover:text-white flex items-center justify-center text-2xl transition-all duration-300 shadow-sm">
                  <FaBriefcase />
                </div>
                <span className="text-[11px] font-bold text-brand-accent bg-brand-lightest border border-brand-accent/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  Hands-on &amp; Careers
                </span>
              </div>

              <h3 className="text-2xl font-bold text-brand-darkest mb-1 group-hover:text-brand-accent transition-colors">
                100% Live Projects &amp; Job Support
              </h3>
              <p className="text-xs font-bold text-brand-accent uppercase tracking-wider mb-3">
                Portfolio-Ready Engineering
              </p>

              <p className="text-gray-600 text-sm leading-relaxed font-normal max-w-xl">
                Build real-world production models, deploy RAG &amp; LLM pipelines, and receive full interview coaching with dedicated hiring partner referrals.
              </p>
            </div>
          </div>

          {/* Card 7: 100% Positive Reviews from Students & Parents (Row 3, Col 3) */}
          <div className="lg:col-start-3 lg:row-start-3 rounded-[32px] bg-white p-7 border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group hover:border-brand-accent/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 shadow-xs">
                  <FaStar />
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  5.0 ★ Rating
                </span>
              </div>

              <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest mb-1 block">
                Verified Community Trust
              </span>
              <h3 className="text-lg font-bold text-brand-darkest mb-1 group-hover:text-brand-accent transition-colors leading-snug">
                100% Positive Reviews
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed font-normal mt-1.5">
                Loved and trusted by students and parents across Gujarat for transparent mentorship and proven career outcomes.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
