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
            question: "What is TARK AI EdTech?",
            answer: "TARK AI EdTech Private Limited is a premier, future-focused educational platform in India that delivers concept-driven, mentor-led programs in Artificial Intelligence, Machine Learning, Data Science, and Climate Analytics. We focus on conceptual clarity, real-world application, and building lasting engineering skills."
        },
        {
            question: "How does the TARK AI Career Guidance Portal work?",
            answer: "The portal uses intelligent skill mapping and personalized guidance to analyze a learner's strengths and professional aspirations. It generates structured, step-by-step career roadmaps that help students and professionals transition from foundational basics to industry-ready mastery."
        },
        {
            question: "What is the 'Why First, Then How' learning philosophy?",
            answer: "It is TARK AI's signature instructional methodology. Instead of jumping straight into syntax or tools, we guide learners through the logical 'Why' behind algorithms and architectures first. We move systematically from Concept → Code → Production-level Case Studies to foster deep engineering intuition."
        },
        {
            question: "Who are the mentors and instructors at TARK AI?",
            answer: "Our courses are designed and taught by highly qualified co-founders and data science professionals, including academic scholars holding M.Sc. degrees in Artificial Intelligence, Machine Learning, and Climate Analytics from prestigious national institutes like the Indian Institute of Information Technology (IIIT), Lucknow."
        },
        {
            question: "Does TARK AI provide placement and career readiness support?",
            answer: "Yes. All our major career programs include a comprehensive 1-Month Placement Ready Program. This covers ATS-friendly resume creation, LinkedIn profile optimization, mock technical and HR interviews, active portfolio reviews (GitHub and live site audits), and career coaching."
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
