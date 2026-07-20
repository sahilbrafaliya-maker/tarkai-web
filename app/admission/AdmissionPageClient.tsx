'use client';

import { useRef } from 'react';
import HeroSection from '@/app/admission/components/HeroSection';
import BenefitsSection from '@/app/admission/components/BenefitsSection';
import AdmissionTimeline from '@/app/admission/components/AdmissionTimeline';
import TestimonialsSection from '@/app/admission/components/TestimonialsSection';
import ProgramsSection from '@/app/admission/components/ProgramsSection';
import FAQSection from '@/app/admission/components/FAQSection';
import AdmissionForm from '@/app/admission/components/AdmissionForm';
import FloatingWidgets from '@/app/admission/components/FloatingWidgets';

export default function AdmissionPageClient() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="overflow-x-hidden">
      <HeroSection onApplyNow={scrollToForm} />
      <div ref={formRef}>
        <AdmissionForm />
      </div>
      <BenefitsSection />
      <ProgramsSection onEnroll={scrollToForm} />
      <AdmissionTimeline />
      <TestimonialsSection />
      <FAQSection />
      <FloatingWidgets onApplyNow={scrollToForm} />
    </main>
  );
}
