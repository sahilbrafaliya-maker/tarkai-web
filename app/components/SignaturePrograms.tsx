"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRocket } from "@react-icons/all-files/fa/FaRocket";
import { FaChalkboardTeacher } from "@react-icons/all-files/fa/FaChalkboardTeacher";
import { FaLightbulb } from "@react-icons/all-files/fa/FaLightbulb";
import { FaLeaf } from "@react-icons/all-files/fa/FaLeaf";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";

import GeometricShapes from "./GeometricShapes";

// --- Data ---
const programs = [
  {
    id: "ai-architect",
    title: "AI / ML Architect Program",
    subtitle: "Architect the Future",
    duration: "7 Months",
    description: "From intelligent databases to agentic systems—craft full-stack AI experiences that are production ready. Master the art of building scalable, efficient, and ethical AI solutions driving the next generation of software.",
    highlights: ["Full-stack ML systems", "LLM fine-tuning", "Agent orchestration", "Production Deployment"],
    icon: <FaRocket />,
    color: "bg-[#20A6A8]",
    image: "/AI_ML.png",
    featured: true
  },
  {
    id: "data-science",
    title: "Data Science & Strategic Analytics",
    subtitle: "Decipher the Data",
    duration: "7 Months",
    description: "Transform noisy data into boardroom narratives and predictive models leaders can act on instantly. Learn advanced statistical analysis, machine learning pipelines, and the art of data storytelling.",
    highlights: ["Analytics storytelling", "Spark-powered ML pipelines", "Big Data Visualization", "Business Intelligence"],
    icon: <FaChalkboardTeacher />,
    color: "bg-[#20A6A8]",
    image: "/Data_Science.png"
  },
  {
    id: "future-founders",
    title: "Future Founders – AI Foundation",
    subtitle: "Build Your Vision",
    duration: "3 Months",
    description: "A playful launchpad for teens and first-time builders to code, analyze, and present their first AI ideas. We nurture the entrepreneurial spirit combined with technical prowess to create the founders of tomorrow.",
    highlights: ["Creative coding sprints", "Responsible AI mindset", "Prototype Development", "Pitching & Strategy"],
    icon: <FaLightbulb />,
    color: "bg-[#20A6A8]",
    image: "/Future_Founder.png"
  },
  {
    id: "green-intel",
    title: "Green Intelligence – Climate Analytics",
    subtitle: "Sustain the Planet",
    duration: "3 Months",
    description: "Decode carbon markets, architect ESG dashboards, and advise on climate-positive strategies with data. Use technology to solve the most pressing challenges of our time.",
    highlights: ["Emission analytics", "Carbon market storytelling", "ESG Reporting", "Climate Modeling"],
    icon: <FaLeaf />,
    color: "bg-[#20A6A8]",
    image: "/Climate_Analytics.png"
  }
];

import { motion } from "motion/react";

export default function SignaturePrograms() {
  return (
    <section className="bg-[#FFFFFF] pb-8 lg:pb-16 z-30 relative">
      <GeometricShapes variant="curriculum" />
      
      <div className="relative">
        {/* Absolute wrapper that ends earlier, so the sticky header gets pushed up at the same time as the last card */}
        <div className="absolute inset-x-0 top-0 z-40 pointer-events-none" style={{ bottom: '500px' }}>
          <div className="relative top-0 pt-4 md:pt-6 lg:pt-8 pb-3 md:pb-4 bg-[#FFFFFF]/95 backdrop-blur-sm w-full border-b border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] pointer-events-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-5xl mx-auto gsap-fade-up">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                  <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                    Our Curriculum
                  </div>
                  <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-3">
                   Master the Skills That Shape the <span className="text-[#20A6A8]">Future of Tech</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-3xl mx-auto">
                  Build real-world expertise in AI, emerging technologies, and modern digital skills through designed to prepare you for the future of technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-55 md:pt-60 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {programs.map((program, idx) => (
            <div 
              key={program.id}
              className="sticky w-full mb-8 md:mb-10 flex justify-center [--card-top:20px] sm:[--card-top:40px] md:[--card-top:40px] lg:[--card-top:40px]"
              style={{ top: `calc(var(--card-top) + ${idx * 16}px)`, zIndex: 20 + idx }}
            >
              <ProgramCard program={program} idx={idx} />
            </div>
          ))}
          {/* Spacer to allow the last card to stick for a while before the section scrolls away */}
          <div className="h-[5vh] md:h-[10vh] w-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}

// Sub-component to handle card rendering
const ProgramCard = ({ program, idx }: any) => {
  return (
    <div
      className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center bg-white p-6 md:p-8 lg:p-10 rounded-4xl border border-gray-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden group hover:shadow-[0_20px_50px_-10px_rgba(32,166,168,0.1)] hover:border-[#20A6A8]/20 transition-all duration-500 origin-top h-auto md:h-128"
    >
      {/* Text Content */}
      <div className="space-y-4 md:space-y-5 relative z-10 flex flex-col justify-center h-full">
        <div>
          <div className="inline-block px-3 py-1.5 rounded-full bg-[#20A6A8]/10 border border-[#20A6A8]/20 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#20A6A8]">
              {program.subtitle}
            </span>
          </div>
          <h3 className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold leading-[1.2] tracking-tight text-[#0D1C2E] mb-3">
            {program.title}
          </h3>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.6] text-slate-500">
            {program.description}
          </p>
        </div>
        
        <div className="space-y-2.5 pt-1">
          {program.highlights.map((highlight: string, hIdx: number) => (
            <div key={hIdx} className="flex items-center gap-3 text-[#0D1C2E]/80">
              <FaCheckCircle className="text-[#20A6A8] text-lg shrink-0" />
              <span className="text-[13px] sm:text-[14px] font-semibold leading-normal">{highlight}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-3">
          <Link
            href={`/programs#${program.id}`}
            className="inline-flex items-center justify-center gap-2 bg-[#0D1C2E] hover:bg-[#20A6A8] text-white font-bold text-[14px] sm:text-[15px] leading-[1.2] rounded-xl px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-[0_15px_30px_rgba(32,166,168,0.3)] hover:-translate-y-1 group"
          >
            Explore Program
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Image - 50% split with 4/3 aspect ratio */}
      <div className="relative group z-10 w-full flex items-center justify-center">
        <Link href={`/programs#${program.id}`} className="block w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 transform transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(32,166,168,0.2)] aspect-4/3 relative">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            draggable="false"
          />
        </Link>
      </div>
    </div>
  );
}
