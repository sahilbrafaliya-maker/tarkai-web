"use client";

import { useState } from "react";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaExclamationCircle } from "@react-icons/all-files/fa/FaExclamationCircle";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import SuccessModal from "./SuccessModal";
import GeometricShapes from "./GeometricShapes";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default first item open

    const faqs: FAQItem[] = [
        {
            question: "What is the best AI institute in Surat in 2026?",
            answer: "TarkAI EdTech Private Limited is one of the top-rated AI institutes in Surat, Gujarat. Located at Kyros Business Center, Sarthana Jakat Naka, it offers structured programs in AI/ML, Data Science, and Climate Analytics — all taught by co-founders holding M.Sc. degrees in AI and Machine Learning from IIIT Lucknow. Unlike most coaching centres in Surat, TarkAI maintains small batch sizes for personalised mentorship and includes a 1-Month Placement Ready Program with every major course."
        },
        {
            question: "What AI and Data Science courses does TarkAI offer in Surat?",
            answer: "TarkAI EdTech in Surat offers four programs: (1) AI/ML Architect Program (6 months) — agentic AI, LLMs, full-stack AI systems; (2) Data Science & Strategic Analytics (6 months) — Python, SQL, data engineering, ML-powered decisions; (3) Green Intelligence – Climate Analytics (3 months) — carbon markets, ESG analytics, emissions; and (4) Future Founders – AI Foundation (3 months) — for teens and beginners with zero prior experience. All programs follow a Concept → Code → Case Studies methodology and include hands-on projects."
        },
        {
            question: "How long does it take to complete an AI course at TarkAI?",
            answer: "Programs at TarkAI Surat range from 3 to 6 months. The AI/ML Architect Program and the Data Science & Strategic Analytics program each run for 6 months. The Climate Analytics and Foundation programs run for 3 months each. Every major program also includes a dedicated 1-Month Placement Ready Program at the end, covering ATS resume building, LinkedIn optimisation, mock technical and HR interviews, and GitHub portfolio review — bringing total engagement to 4–7 months depending on the track."
        },
        {
            question: "Do I need a coding background to join TarkAI's AI programs in Surat?",
            answer: "No prior coding background is required for TarkAI's Foundation and beginner tracks. The Future Founders program is designed specifically for teens and first-time builders. For the AI/ML Architect Program, basic familiarity with programming is helpful but not mandatory — the curriculum begins with foundational reasoning before introducing code, following the 'Why First, Then How' approach. Students from BSc, BCom, BBA, and non-technical backgrounds across Surat and Gujarat regularly enroll and succeed."
        },
        {
            question: "What placement and career support does TarkAI Surat provide?",
            answer: "All major TarkAI programs include a comprehensive 1-Month Placement Ready Program at no extra cost. This covers: ATS-optimised resume creation, LinkedIn profile makeover, mock technical and HR interview rounds, GitHub and portfolio review, and one-on-one career coaching. Faculty are M.Sc. AI/ML graduates from IIIT Lucknow who actively guide students through job search strategy. To book a free demo class and ask about placement outcomes, WhatsApp TarkAI at +91 97123 58689 or visit Kyros Business Center, 404&405, beside Ashirwad Society, Sarthana Jakat Naka, Surat, Gujarat 395013."
        }
    ];

    // Form state
    const [question, setQuestion] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [feedback, setFeedback] = useState("");

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleQuestionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question.trim()) {
            setStatus('error');
            setFeedback('Please enter a question first.');
            return;
        }

        setStatus('loading');
        setFeedback('');

        try {
            const res = await fetch('/api/faq-question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFeedback(data.message || 'Question sent! We will get back to you soon.');
                setQuestion('');
                setTimeout(() => {
                    setFeedback('');
                    setStatus('idle');
                }, 5000);
            } else {
                setStatus('error');
                setFeedback(data.error || 'Failed to send question.');
            }
        } catch (error) {
            setStatus('error');
            setFeedback('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <section id="faq" className="pt-10 pb-16 md:py-24 bg-[#F7FBFB] relative overflow-hidden">
            <GeometricShapes hideTopLeftHexagon={true} variant="light" />
            {/* Background Details */}
            <div className="absolute top-0 left-0 w-125 h-125 bg-[#1B9FA1]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center justify-start gap-4 mb-6">
                            <div className="w-8 h-px bg-[#1B9FA1]/40"></div>
                            <div className="px-5 py-1.5 rounded-full bg-[#1B9FA1]/10 text-[#1B9FA1] border border-[#1B9FA1]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                                Frequently Asked Questions
                            </div>
                            <div className="w-8 h-px bg-[#1B9FA1]/40"></div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#10233A] mb-4">
                            Everything You Need to Know About <span className="text-[#1B9FA1]">Your AI Journey</span>
                        </h2>
                        <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 mb-8 max-w-2xl">
                            Find clear answers about our AI programs, learning experience, and placement support at TarkAI.
                        </p>

                        {/* Ask Question Card */}
                        <div className="bg-[#F8FBFC] border border-[#E2E8F0] rounded-2xl p-8 shadow-sm">
                            <h3 className="text-xl sm:text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#1A365D] mb-4">
                                Still have questions?
                            </h3>
                            <p className="text-[#64748B] text-sm sm:text-[15px] font-normal leading-[1.6] mb-6">
                                Can&apos;t find the answers to your Questions? Drop your Question here and we will get to you as soon as possible!
                            </p>

                            <form onSubmit={handleQuestionSubmit} className="relative flex flex-col gap-4">
                                <div className="relative flex items-center w-full bg-white border border-[#E2E8F0] rounded-full p-1 focus-within:border-[#1D9C9A] focus-within:ring-1 focus-within:ring-[#1D9C9A] transition-all shadow-sm">
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="What's on your mind?"
                                        className="w-full bg-transparent border-none focus:outline-none px-4 text-sm text-[#0D1C2E] placeholder-[#94A3B8]"
                                        disabled={status === 'loading'}
                                    />
                                    <button
                                        suppressHydrationWarning
                                        type="submit"
                                        disabled={status === 'loading'}
                                        aria-label="Submit question"
                                        className={`w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 transition-colors ${status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#1A365D] hover:bg-[#0D1C2E]'
                                            }`}
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <FaArrowRight className="text-sm" aria-hidden="true" focusable="false" />
                                        )}
                                    </button>
                                </div>

                                {/* Premium Success/Error Popup Alert */}
                                {feedback && status === 'error' && (
                                    <div className="flex items-start gap-2 p-3 rounded-xl text-[14px] font-normal border bg-white text-red-500 border-red-500 transition-all duration-500">
                                        <FaExclamationCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <div className="flex-1 leading-relaxed">
                                            {feedback}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Right Column (Accordion) */}
                    <div className="lg:col-span-7">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => {
                                const isOpen = activeIndex === index;
                                return (
                                    <div
                                        key={index}
                                        className={`rounded-xl transition-all duration-300 overflow-hidden ${isOpen
                                                ? 'bg-[#1D9C9A] text-white shadow-md'
                                                : 'bg-[#F4FAFA] text-[#0D1C2E] hover:bg-[#EDF6F6]'
                                            }`}
                                    >
                                        <button
                                            suppressHydrationWarning
                                            onClick={() => toggleAccordion(index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                                            aria-expanded={isOpen}
                                        >
                                            <span className={`text-base sm:text-lg font-semibold leading-[1.4] pr-4`}>
                                                {faq.question}
                                            </span>
                                            <FaChevronDown
                                                className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-[#64748B]'}`}
                                                size={14}
                                                aria-hidden="true" focusable="false"
                                            />
                                        </button>

                                        <div
                                            className={`transition-all duration-300 ease-in-out px-6 ${isOpen
                                                    ? 'max-h-125 opacity-100 pb-6'
                                                    : 'max-h-0 opacity-0 pb-0'
                                                }`}
                                        >
                                            <div className={`text-sm sm:text-[15px] font-normal leading-[1.65] ${isOpen ? 'text-white/90' : 'text-slate-600'}`}>
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <SuccessModal 
                isOpen={status === 'success'} 
                onClose={() => { setFeedback(''); setStatus('idle'); }} 
                message={feedback}
            />
        </section>
    );
}
