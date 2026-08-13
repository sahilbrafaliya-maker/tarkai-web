'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const faqs = [
  {
    q: 'Who is eligible to apply for the free 3-day demo class?',
    a: 'Anyone looking to build a career in AI and Data Science — including Class 9-12 school students, college undergraduates (B.Tech, BCA, B.Sc), fresh graduates, and working professionals seeking to transition into AI.',
  },
  {
    q: 'What happens during the free 3-day live demo session?',
    a: 'The demo session is a hands-on technical workshop where you will build live AI code, explore real LLM & RAG architectures, interact directly with IIIT Lucknow mentors, and receive a personalized career roadmap.',
  },
  {
    q: 'Do I need prior coding or mathematical experience?',
    a: 'No prior programming background is required for foundational tracks. We start from Python basics and computational thinking. Advanced tracks include a pre-course prep module to ensure full readiness.',
  },
  {
    q: 'Where is TarkAI located, and are online classes available?',
    a: 'We offer both offline classroom learning at our state-of-the-art Surat campus (Kyros Business Center, Sarthana Jakat Naka) and live interactive online batches for remote students.',
  },
  {
    q: 'What is the student-to-mentor ratio at TarkAI?',
    a: 'We restrict batch sizes to 10–15 students maximum. This guarantees personalized 1-on-1 mentorship, code reviews, and direct academic support from our IIIT Lucknow faculty.',
  },
  {
    q: 'What does the 100% placement support program include?',
    a: 'Our 1-Month Placement Ready module includes ATS resume engineering, GitHub & LinkedIn portfolio reviews, 5+ technical mock interviews, and direct job referrals to our tech corporate hiring partners.',
  },
  {
    q: 'Are flexible fee payment and EMI options provided?',
    a: 'Yes, flexible 0% interest EMI options are available through partner financial institutions. Meritorious students may also qualify for merit-based scholarship fee waivers.',
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-200 mb-3.5 ${
        isOpen
          ? 'border-[#00737a] bg-white shadow-md'
          : 'border-[#00737a]/20 bg-[#f8fafc] hover:border-[#00737a]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`font-bold text-base sm:text-lg leading-snug transition-colors ${
            isOpen ? 'text-[#00737a]' : 'text-[#0f172a]'
          }`}
        >
          {faq.q}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border border-[#00737a]/20 ${
            isOpen ? 'bg-[#00737a] text-white rotate-180' : 'bg-[#f8fafc] text-[#00737a]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 sm:px-6 pb-6 pt-1 text-[#475569] text-sm sm:text-base leading-relaxed font-normal border-t border-slate-100">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 bg-[#f8fafc] relative" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight mb-4">
            Frequently Asked <span className="text-[#00737a]">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-xl mx-auto font-normal">
            Everything you need to know about joining and attending the free live demo &amp; full programs.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-1">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>

        {/* Bottom Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-8 rounded-3xl bg-white border border-[#00737a]/20 shadow-sm text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-2">
            Have Additional Questions?
          </h3>
          <p className="text-[#334155] text-sm max-w-md mx-auto mb-6 font-normal">
            Our admissions counselors in Surat are available 9 AM – 7 PM to guide you on track selection, batch timings, and scholarships.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919712358689?text=Hi%20TarkAI!%20I%20have%20a%20question%20about%20admission."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+919712358689"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00737a] hover:bg-[#005a60] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Call Admissions Desk</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
