'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FaGraduationCap, FaExternalLinkAlt, FaAward, FaHandshake } from 'react-icons/fa';

export default function VnsguMouSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-brand-lightest/30 to-white relative overflow-hidden" id="vnsgu-mou">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #2DA5A3 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header Badge & Title */}
        <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-black uppercase tracking-widest border border-brand-accent/20 mb-4 shadow-xs"
          >
            <FaHandshake className="text-sm text-brand-accent" />
            <span>Historic 1st Industry MoU · VNSGU Surat</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-darkest tracking-tight leading-tight"
          >
            VNSGU Dept. of Statistics Signs Historic MoU with{' '}
            <span className="bg-gradient-to-r from-brand-accent via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              TARKAI
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="text-gray-600 text-sm sm:text-base mt-3 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Empowering statistics &amp; analytics students with real-world AI, Machine Learning &amp; Industry Projects.
          </motion.p>
        </div>

        {/* Main Content Grid: Image + Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Official Signing Ceremony Image Card (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative rounded-[28px] overflow-hidden border border-brand-accent/20 bg-white shadow-[0_20px_50px_rgba(0,35,51,0.12)] p-2.5 sm:p-3 transition-transform duration-500 hover:-translate-y-1">

              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="/vnsgu_mou.jpeg"
                  alt="VNSGU Department of Statistics MoU Signing with TARKAI EDTECH"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                  priority
                />

                {/* Ambient dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-darkest text-[11px] font-black uppercase tracking-wide border border-white/50 shadow-md flex items-center gap-1.5">
                    <FaAward className="text-amber-500" />
                    Veer Narmad South Gujarat University
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 text-white max-w-md sm:max-w-lg pr-4 sm:pr-48">
                  <p className="text-[11px] sm:text-xs font-semibold text-teal-300 uppercase tracking-widest mb-1">
                    Official MoU Signing Ceremony
                  </p>
                  <h3 className="text-xs sm:text-sm font-bold leading-snug text-white">
                    VNSGU Vice-Chancellor &amp; Leadership with TARKAI EDTECH Founders
                  </h3>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent Card */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-gradient-to-br from-[#001c29] to-[#00384d] text-white p-3.5 rounded-2xl shadow-xl border border-brand-accent/30 items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-teal-300 shrink-0">
                <FaGraduationCap className="text-lg" />
              </div>
              <div>
                <p className="text-[10px] font-black text-teal-300 uppercase tracking-wider">Department of Statistics</p>
                <p className="text-[11px] font-bold text-white leading-tight">First Industry Partner: TARKAI</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Story Article & Highlights (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Story Card Container */}
            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-brand-accent/20 shadow-[0_10px_35px_rgba(0,35,51,0.06)] space-y-5 relative overflow-hidden">
              {/* Subtle top border gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent via-teal-400 to-emerald-400" />

              {/* Card Header Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span>Transformative Industry Partnership</span>
              </div>

              {/* Paragraph 1 */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                The future of education is defined by strong collaboration between academia and industry. In a landmark step toward this vision, <strong className="font-extrabold text-brand-darkest">TARKAI EdTech Pvt. Ltd.</strong> has signed a Memorandum of Understanding (MoU) with the <strong className="font-extrabold text-brand-darkest">Department of Statistics, Veer Narmad South Gujarat University (VNSGU), Surat</strong>.
              </p>

              {/* Paragraph 2 */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                This strategic partnership aims to bridge the gap between classroom learning and industry expectations by equipping students with practical knowledge, real-world exposure, and career-oriented training in <strong className="font-semibold text-brand-darkest">Artificial Intelligence (AI), Data Science, and Machine Learning (ML)</strong>.
              </p>
            </div>

            {/* Action CTA Button */}
            <div>
              <a
                href="https://enews.vnsgu.ac.in/news-details.php?nid=2628"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-darkest hover:bg-brand-dark text-white font-extrabold text-xs transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-brand-darkest w-full sm:w-auto"
              >
                <span>Read VNSGU Announcement</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
