'use client';

import { useRef } from 'react';
import HeroSection from '@/app/admission/components/HeroSection';
import BenefitsSection from '@/app/admission/components/BenefitsSection';
import AdmissionTimeline from '@/app/admission/components/AdmissionTimeline';
import TestimonialsSection from '@/app/admission/components/TestimonialsSection';
import ProgramsSection from '@/app/admission/components/ProgramsSection';
import FAQSection from '@/app/admission/components/FAQSection';
import FloatingWidgets from '@/app/admission/components/FloatingWidgets';

export default function AdmissionPageClient() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-[#edf2f6] text-[#0f172a] overflow-x-hidden font-sans">
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
