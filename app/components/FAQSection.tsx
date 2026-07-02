"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import GeometricShapes from "./GeometricShapes";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: "What is the best AI institute in Surat in 2026?",
            answer: "TARK AI EdTech Private Limited is one of the top-rated AI institutes in Surat, Gujarat. Located at Kyros Business Center, Sarthana Jakat Naka, it offers structured programs in AI/ML, Data Science, and Climate Analytics — all taught by co-founders holding M.Sc. degrees in AI and Machine Learning from IIIT Lucknow. Unlike most coaching centres in Surat, TARK AI maintains small batch sizes for personalised mentorship and includes a 1-Month Placement Ready Program with every major course."
        },
        {
            question: "What AI and Data Science courses does TARK AI offer in Surat?",
            answer: "TARK AI EdTech in Surat offers four programs: (1) AI/ML Architect Program (6 months) — agentic AI, LLMs, full-stack AI systems; (2) Data Science & Strategic Analytics (6 months) — Python, SQL, data engineering, ML-powered decisions; (3) Green Intelligence – Climate Analytics (3 months) — carbon markets, ESG analytics, emissions; and (4) Future Founders – AI Foundation (3 months) — for teens and beginners with zero prior experience. All programs follow a Concept → Code → Case Studies methodology and include hands-on projects."
        },
        {
            question: "How long does it take to complete an AI course at TARK AI?",
            answer: "Programs at TARK AI Surat range from 3 to 6 months. The AI/ML Architect Program and the Data Science & Strategic Analytics program each run for 6 months. The Climate Analytics and Foundation programs run for 3 months each. Every major program also includes a dedicated 1-Month Placement Ready Program at the end, covering ATS resume building, LinkedIn optimisation, mock technical and HR interviews, and GitHub portfolio review — bringing total engagement to 4–7 months depending on the track."
        },
        {
            question: "Do I need a coding background to join TARK AI's AI programs in Surat?",
            answer: "No prior coding background is required for TARK AI's Foundation and beginner tracks. The Future Founders program is designed specifically for teens and first-time builders. For the AI/ML Architect Program, basic familiarity with programming is helpful but not mandatory — the curriculum begins with foundational reasoning before introducing code, following the 'Why First, Then How' approach. Students from BSc, BCom, BBA, and non-technical backgrounds across Surat and Gujarat regularly enroll and succeed."
        },
        {
            question: "What placement and career support does TARK AI Surat provide?",
            answer: "All major TARK AI programs include a comprehensive 1-Month Placement Ready Program at no extra cost. This covers: ATS-optimised resume creation, LinkedIn profile makeover, mock technical and HR interview rounds, GitHub and portfolio review, and one-on-one career coaching. Faculty are M.Sc. AI/ML graduates from IIIT Lucknow who actively guide students through job search strategy. To book a free demo class and ask about placement outcomes, WhatsApp TARK AI at +91-9712358689 or visit Kyros Business Center, Sarthana Jakat Naka, Surat 395013."
        }
    ];


    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-brand-lightest/40 relative overflow-hidden">
            {/* Background Details */}
            <GeometricShapes hideBigHexagon={true} hideTriangle={true} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-light/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-accent uppercase font-bold tracking-widest text-sm bg-brand-accent/10 px-4 py-1.5 rounded-full">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-brand-darkest mt-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-brand-dark max-w-2xl mx-auto mt-4">
                        Everything you need to know about TARK AI EdTech programs, career portals, and mentorship.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-100 hover:border-brand-accent/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-hidden cursor-pointer"
                                >
                                    <span className="text-lg font-bold text-brand-darkest leading-snug pr-4">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`w-8 h-8 rounded-full bg-brand-lightest flex items-center justify-center text-brand-accent transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-brand-accent text-white" : ""}`}
                                    >
                                        <FaChevronDown size={12} />
                                    </span>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] opacity-100 border-t border-gray-50" : "max-h-0 opacity-0 overflow-hidden"}`}
                                >
                                    <div className="px-6 py-5 text-gray-600 leading-relaxed text-base">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
