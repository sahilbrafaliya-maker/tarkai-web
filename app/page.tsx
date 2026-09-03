import { Metadata } from "next";

import HeroSection from "./components/HeroSection";
import ScrollToTop from "./components/ScrollToTop";
import SignaturePrograms from "./components/SignaturePrograms";
import GoogleReviewsSection from "./components/GoogleReviewsSection";
import ReelsSection from "./components/ReelsSection";
import WhyChooseSection from "./components/WhyChooseSection";
import MentorsSection from "./components/MentorsSection";
import VnsguMouSection from "./components/VnsguMouSection";
import HomeBlogsSection from "./components/HomeBlogsSection";
import HomeCTASection from "./components/HomeCTASection";

export const metadata: Metadata = {
  title: "Best AI Institute in Surat | AI & ML Courses – TARKAI EdTech",
  description: "Top-rated AI & ML institute in Surat, Gujarat. IIIT Lucknow faculty, small batches, hands-on projects & 1-Month Placement Ready Program. Book a free demo class.",
  alternates: {
    canonical: "https://tarkaiedtech.com",
  },
  openGraph: {
    title: "Best AI Institute in Surat | AI & ML Courses – TARKAI EdTech",
    description: "Top-rated AI & ML institute in Surat, Gujarat. IIIT Lucknow faculty, small batches, hands-on projects & 1-Month Placement Ready Program. Book a free demo class.",
    url: "https://tarkaiedtech.com",
    type: "website",
  },
};

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best AI institute in Surat in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TARKAI EdTech Private Limited is widely regarded as one of the best AI institutes in Surat, Gujarat. Located at Kyros Business Center, Sarthana Jakat Naka, TARKAI offers structured programs in AI/ML, Data Science, and Climate Analytics taught by co-founders holding M.Sc. degrees in AI and Machine Learning from IIIT Lucknow. All major programs include a 1-Month Placement Ready Program covering resume building, mock interviews, LinkedIn optimization, and career coaching."
      }
    },
    {
      "@type": "Question",
      "name": "What AI and Data Science courses are available at TARKAI in Surat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TARKAI EdTech in Surat offers four structured programs: (1) AI/ML Architect Program — a 6-month deep dive into agentic AI, LLMs, and full-stack AI systems; (2) Data Science & Strategic Analytics — a 6-month program covering Python, SQL, data engineering, and ML-powered decisions; (3) Green Intelligence – Climate Analytics — a 3-month program on carbon markets, emissions analytics, and ESG strategy; and (4) Future Founders – AI Foundation — a 3-month beginner track for teens and first-time builders. All programs are mentor-led with hands-on, project-based learning."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to complete an AI course at TARKAI Surat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At TARKAI Surat, program durations range from 3 to 6 months depending on the track. The AI/ML Architect Program and Data Science & Strategic Analytics program are each 6 months long. The Green Intelligence – Climate Analytics program and the Future Founders – AI Foundation program are each 3 months. All programs follow a Concept to Code to Case Study learning structure and include a dedicated 1-Month Placement Ready Program at the end of the core curriculum."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a coding background to join TARKAI AI courses in Surat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No prior coding background is required to join TARKAI's Foundation or beginner-friendly tracks. The Future Founders program is specifically designed for teens and first-time builders with zero prior experience. For the AI/ML Architect Program, basic familiarity with programming concepts is helpful but not mandatory — the curriculum starts from foundational principles using the 'Why First, Then How' methodology, teaching the reasoning behind algorithms before writing any code. Surat residents and students from across Gujarat regularly enroll without prior coding experience."
      }
    },
    {
      "@type": "Question",
      "name": "What career support does TARKAI Surat provide after course completion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TARKAI EdTech includes a comprehensive 1-Month Placement Ready Program in all major career tracks. This includes: ATS-friendly resume building, LinkedIn profile optimization, mock technical and HR interviews, GitHub and portfolio review, and one-on-one career coaching sessions. TARKAI's faculty — M.Sc. AI/ML graduates from IIIT Lucknow — actively mentor students throughout the program. To inquire about placement support or book a free demo class, WhatsApp TARKAI at +91-9712358689."
      }
    }
  ]
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* High-Impact Hero Section */}
      <HeroSection />

      {/* 1. Google Reviews Section (Loved by our students and parents) */}
      <GoogleReviewsSection />

      {/* 2. Reels Carousel Section (Life at TarkAI) */}
      <ReelsSection />

      {/* 3. Why Choose TarkAI Section */}
      <WhyChooseSection />

      {/* Signature Programs Section */}
      <SignaturePrograms />

      {/* 4. Mentors Section (Meet your mentors) */}
      <MentorsSection />

      {/* VNSGU Department of Statistics Historic MoU Section */}
      <VnsguMouSection />

      {/* 5. Blogs Section (From our blog) */}
      <HomeBlogsSection />

      {/* 6. CTA Section (Ready to give your child an AI head start?) */}
      <HomeCTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />

      <ScrollToTop />
    </div>
  );
}
