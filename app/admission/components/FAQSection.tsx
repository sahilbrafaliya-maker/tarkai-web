'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const faqs = [
  {
    q: 'Who can apply to TARK AI programs?',
    a: 'Anyone with basic computer knowledge can apply — school students, college students, graduates, and working professionals. We offer programs tailored for every background, from 10th grade students to senior engineers looking to transition into AI.',
  },
  {
    q: 'What is the format of the free demo class?',
    a: 'The free demo is a 3-day immersive session (online or in-person) where you get to experience our teaching methodology firsthand. You\'ll solve real AI problems, interact with our faculty, and get a clear picture of what the full program entails — absolutely no strings attached.',
  },
  {
    q: 'Do I need prior programming experience?',
    a: 'Not necessarily. Our Future Founders and introductory tracks start from absolute zero. For advanced programs like AI/ML Architect, basic familiarity with any programming language is helpful but not required. We assess your background during the counselling call.',
  },
  {
    q: 'What is the batch size?',
    a: 'We maintain small batches of 10–15 students maximum. This ensures every student receives personalized attention from day one — not the 200-student classroom experience typical of other institutes.',
  },
  {
    q: 'Is the program online, offline, or both?',
    a: 'We offer flexible hybrid options. Most programs run online + offline (Surat center at Kyros Business Center). Purely online options are available for students outside Surat. Weekend batches are available for working professionals.',
  },
  {
    q: 'What does the placement support include?',
    a: 'Our 1-Month Placement Ready Program (included in major programs) covers: ATS-optimized resume writing, LinkedIn profile optimization, GitHub portfolio review, 5+ mock interview sessions, job referrals through our industry network, and dedicated placement coordinator support until you land a job.',
  },
  {
    q: 'What is the fee structure?',
    a: 'Fees vary by program (₹15,000 – ₹65,000 depending on duration and track). EMI options are available with 0% interest through our banking partners. Scholarships are available for meritorious students. Exact fee details are shared during the counselling call.',
  },
  {
    q: 'How do I get the Google Sheet with admission data?',
    a: 'Every application is automatically captured in our secure Google Sheet in real-time via our Google Apps Script integration. Admission team members receive instant email notifications with complete applicant details.',
  },
];

function FAQItem({ faq, isOpen, onToggle, index }: {
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
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-brand-accent/40 shadow-lg shadow-brand-accent/5'
          : 'border-brand-darkest/10 hover:border-brand-accent/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-brand-lightest/50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-brand-darkest pr-4 leading-tight">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isOpen ? 'bg-brand-accent text-white' : 'bg-brand-lightest text-brand-dark'
          } transition-colors duration-200`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 bg-white">
              <div className="h-px bg-brand-accent/10 mb-4" />
              <p className="text-brand-dark/80 leading-relaxed">{faq.a}</p>
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
    <section ref={ref} className="py-24 bg-brand-lightest relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-4 tracking-tight">
            Questions? We Have{' '}
            <span className="text-brand-accent">Answers.</span>
          </h2>
          <p className="text-lg text-brand-dark/70">
            Everything you need to know before applying.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-darkest via-[#0b2428] to-brand-dark border border-brand-accent/25 shadow-2xl relative overflow-hidden text-center text-white"
        >
          {/* Decorative Background Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            {/* Support Badge */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center text-brand-accent shadow-inner">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              Still Have Questions?
            </h3>
            <p className="text-brand-light/90 text-sm sm:text-base mb-8 font-medium leading-relaxed">
              Our education counselors are here to help you find the right track. Available 9 AM – 7 PM, Mon–Sat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%20have%20a%20question%20about%20admission."
                target="_blank"
                rel="noopener noreferrer"
                id="faq-whatsapp-cta"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+919712358689"
                id="faq-call-cta"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm sm:text-base backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Admission Desk</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
