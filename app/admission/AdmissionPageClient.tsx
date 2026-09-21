'use client';

import { useRef } from 'react';
import HeroSection from '@/app/admission/components/HeroSection';
import BenefitsSection from '@/app/admission/components/BenefitsSection';
import AdmissionTimeline from '@/app/admission/components/AdmissionTimeline';
import TestimonialsSection from '@/app/admission/components/TestimonialsSection';
import ProgramsSection from '@/app/admission/components/ProgramsSection';
import FAQSection from '@/app/admission/components/FAQSection';
import FloatingWidgets from '@/app/admission/components/FloatingWidgets';
import PageHeader from '@/app/components/PageHeader';

export default function AdmissionPageClient() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-[#edf2f6] text-[#0f172a] overflow-x-hidden font-sans">
      <PageHeader 
        badge="ADMISSION"
        title={
          <span className="block max-w-2xl mx-auto">
            Become Industry  
            <span className="text-[#20A6A8]"> Ready with AI</span>
          </span>
        }
        description={
          <span className="block max-w-3xl mx-auto">
            Master Artificial Intelligence & Data Science under IIIT Lucknow alumni mentors. Join Surat's premier AI institute to learn generative AI, fine-tuning LLMs, Agentic workflows, and statistical modeling with 100% placement support.
          </span>
        }
      />
      <HeroSection onApplyNow={scrollToForm} formRef={formRef} />
      <BenefitsSection />
      <ProgramsSection onEnroll={scrollToForm} />
      <AdmissionTimeline />
      <TestimonialsSection />
      <FAQSection />
      <FloatingWidgets onApplyNow={scrollToForm} />
    </main>
  );
}
