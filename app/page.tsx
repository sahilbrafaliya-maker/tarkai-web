import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import HeroVisual from "./components/HeroVisual";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaPhone } from "@react-icons/all-files/fa/FaPhone";
import { FaMicrochip } from "@react-icons/all-files/fa/FaMicrochip";
import { FaChartLine } from "@react-icons/all-files/fa/FaChartLine";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import ScrollToTop from "./components/ScrollToTop";
import dynamic from "next/dynamic";

const HomeWaypoints = dynamic(() => import("./components/HomeWaypoints"));
const GeometricShapes = dynamic(() => import("./components/GeometricShapes"));
const SignaturePrograms = dynamic(() => import("./components/SignaturePrograms"));
const StudentReelsSection = dynamic(() => import("./components/StudentReelsSection"));
const FAQSection = dynamic(() => import("./components/FAQSection"));
const HomeContactSection = dynamic(() => import("./components/HomeContactSection"));
const PlacementStoriesSection = dynamic(() => import("./components/PlacementStoriesSection"));
const TestimonialsSection = dynamic(() => import("./admission/components/TestimonialsSection"));
const DiwaliOfferPopup = dynamic(() => import("./components/DiwaliOfferPopup"));
import HomeBlogSection from "./components/HomeBlogSection";

import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";


export const metadata: Metadata = {
  title: "Best AI Institute in Surat | AI & ML Courses – TARK AI EdTech",
  description: "Top-rated AI & ML institute in Surat, Gujarat. IIIT Lucknow faculty, small batches, hands-on projects & 1-Month Placement Ready Program. Book a free demo class.",
  alternates: {
    canonical: "https://tarkaiedtech.com",
  },
  openGraph: {
    title: "Best AI Institute in Surat | AI & ML Courses – TARK AI EdTech",
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
        "text": "TARK AI EdTech Private Limited is widely regarded as one of the best AI institutes in Surat, Gujarat. Located at Kyros Business Center, Sarthana Jakat Naka, TARK AI offers structured programs in AI/ML, Data Science, and Climate Analytics taught by co-founders holding M.Sc. degrees in AI and Machine Learning from IIIT Lucknow. All major programs include a 1-Month Placement Ready Program covering resume building, mock interviews, LinkedIn optimization, and career coaching."
      }
    },
    {
      "@type": "Question",
      "name": "What AI and Data Science courses are available at TARK AI in Surat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TARK AI EdTech in Surat offers four structured programs: (1) AI/ML Architect Program — a 6-month deep dive into agentic AI, LLMs, and full-stack AI systems; (2) Data Science & Strategic Analytics — a 6-month program covering Python, SQL, data engineering, and ML-powered decisions; (3) Green Intelligence – Climate Analytics — a 3-month program on carbon markets, emissions analytics, and ESG strategy; and (4) Future Founders – AI Foundation — a 3-month beginner track for teens and first-time builders. All programs are mentor-led with hands-on, project-based learning."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to complete an AI course at TARK AI Surat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At TARK AI Surat, program durations range from 3 to 6 months depending on the track. The AI/ML Architect Program and Data Science & Strategic Analytics program are each 6 months long. The Green Intelligence – Climate Analytics program and the Future Founders – AI Foundation program are each 3 months. All programs follow a Concept to Code to Case Study learning structure and include a dedicated 1-Month Placement Ready Program at the end of the core curriculum."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a coding background to join TARK AI AI courses in Surat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No prior coding background is required to join TARK AI's Foundation or beginner-friendly tracks. The Future Founders program is specifically designed for teens and first-time builders with zero prior experience. For the AI/ML Architect Program, basic familiarity with programming concepts is helpful but not mandatory — the curriculum starts from foundational principles using the 'Why First, Then How' methodology, teaching the reasoning behind algorithms before writing any code. Surat residents and students from across Gujarat regularly enroll without prior coding experience."
      }
    },
    {
      "@type": "Question",
      "name": "What career support does TARK AI Surat provide after course completion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TARK AI EdTech includes a comprehensive 1-Month Placement Ready Program in all major career tracks. This includes: ATS-friendly resume building, LinkedIn profile optimization, mock technical and HR interviews, GitHub and portfolio review, and one-on-one career coaching sessions. TARK AI's faculty — M.Sc. AI/ML graduates from IIIT Lucknow — actively mentor students throughout the program. To inquire about placement support or book a free demo class, WhatsApp TARK AI at +91-9712358689."
      }
    }
  ]
};

export default async function Home() {
  let latestBlogs: any[] = [];
  try {
      await dbConnect();
      const blogs = await Blog.find({}).sort({ date: -1 }).limit(4).lean();
      latestBlogs = JSON.parse(JSON.stringify(blogs));
  } catch (error) {
      console.error('Failed to pre-render home blogs server-side:', error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DiwaliOfferPopup />
      {/* Old Hero Section */}
      <section className="relative bg-linear-to-b from-white to-[#E8F8F8] min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-10 md:pb-18 lg:pb-26">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,165,163,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,165,163,0.03)_1px,transparent_1px)] bg-size-[30px_30px] mask-[linear-gradient(to_right,black_0%,black_45%,transparent_55%)]" />
          
          <div className="absolute top-0 right-10 w-100 h-100 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-100 h-100 bg-brand-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob [animation-delay:2s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[48%_52%] gap-8 lg:gap-0 items-center">
            
            <div className="text-left flex flex-col justify-center max-w-2xl mx-auto md:mx-0 w-full z-10 order-1 mt-4 lg:mt-12 xl:mt-16">
              <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-accent mb-4 animate-slide-up">
                Surat's Premier AI & ML Institute
              </p>
              <h1 className="text-4xl sm:text-[42px] md:text-[52px] lg:text-[60px] font-bold text-brand-darkest tracking-[-0.04em] mb-5 leading-[1.06] max-w-155 animate-slide-up">
                TarkAI EdTech<br /> Where Intelligence <span className="text-brand-accent">Meets Education</span><br className="hidden sm:block" />
              </h1>
              <p className="text-[16px] sm:text-[18px] font-normal text-brand-dark/90 leading-[1.65] max-w-140 mb-6 animate-slide-up animate-delay-200">
                AI & ML courses in Surat taught by IIIT Lucknow M.Sc. graduates. Small batches, hands-on projects, and a 1-Month Placement Ready Program included.
              </p>
              
              <div className="flex items-start gap-3 mb-8 animate-slide-up animate-delay-300">
                <span className="text-brand-dark font-medium text-[14px] sm:text-[15px] leading-[1.6] max-w-md">Serving students & professionals across Surat, Gujarat — Foundation to Advanced AI tracks available.</span>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-slide-up animate-delay-400 w-full">
                <a
                  href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 h-12.5 sm:h-13.5 text-[15px] sm:text-[16px] font-semibold leading-[1.2] rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(45,165,163,0.3)] hover:shadow-[0_6px_20px_rgba(45,165,163,0.4)] hover:-translate-y-0.5 bg-linear-to-r from-brand-accent to-[#1d8280] text-white"
                  id="hero-whatsapp-cta"
                >
                  <FaWhatsapp className="text-lg" aria-hidden="true" focusable="false" />
                  Book a Free Demo Class
                </a>
                <Link
                  href="/programs"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 h-12.5 sm:h-13.5 text-[15px] sm:text-[16px] font-semibold leading-[1.2] rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-white text-brand-darkest border-2 border-brand-accent/20 hover:border-brand-accent"
                  id="hero-explore-programs"
                >
                  Explore Programs
                </Link>
              </div>
            </div>

            <div className="w-full h-full hidden md:flex items-center justify-center order-2 lg:-mt-16 xl:-mt-20">
              <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* Local Trust Signals Strip */}
      <section className="bg-brand-darkest text-white py-5 border-t border-brand-accent/20" aria-label="Contact and location information">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-sm">
            <a
              href="https://maps.google.com/?q=Kyros+Business+Center+Sarthana+Jakat+Naka+Surat+Gujarat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-light/80 hover:text-white transition-colors"
              id="address-map-link"
            >
              <FaMapMarkerAlt className="text-brand-accent shrink-0" aria-hidden="true" focusable="false" />
              <span>Kyros Business Center, 404 &amp; 405, Sarthana Jakat Naka, Surat 395013</span>
            </a>
            <span className="hidden md:block text-brand-accent/30">|</span>
            <a
              href="tel:+919712358689"
              className="flex items-center gap-2 text-brand-light/80 hover:text-white transition-colors"
              id="trust-strip-phone"
            >
              <FaPhone className="text-brand-accent shrink-0" aria-hidden="true" focusable="false" />
              <span>+91 97123 58689</span>
            </a>
            <span className="hidden md:block text-brand-accent/30">|</span>
            <a
              href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 font-bold transition-colors"
              id="trust-strip-whatsapp"
            >
              <FaWhatsapp className="text-lg shrink-0" aria-hidden="true" focusable="false" />
              <span>WhatsApp Us — Book a Free Demo</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden">
        <GeometricShapes variant="why-choose-us" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-14 gsap-fade-up relative z-10">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-px bg-[#20A6A8]/40" />
              <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                Why Choose Us
              </div>
              <div className="w-8 h-px bg-[#20A6A8]/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-5">
              Why TarkAI is Surat&apos;s <span className="text-[#20A6A8]">Best Choice</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-2xl mx-auto">
              Specific credentials, not vague promises — here&apos;s exactly what separates
              <br className="hidden sm:block" /> TarkAI from other institutes in Surat and Gujarat.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 gsap-stagger mt-8 sm:mt-10 relative z-10 w-full">
            {[
              {
                title: "IIIT Lucknow Faculty",
                description:
                  "Your instructors are co-founders holding M.Sc. degrees in AI, Machine Learning, and Climate Analytics from IIIT Lucknow — not just corporate trainers.",
                href: "/team",
                icon: (
                  <div className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Glowing amber radiant rays */}
                      <line x1="24" y1="3" x2="24" y2="7" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="9" y1="9" x2="12" y2="12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="39" y1="9" x2="36" y2="12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="3" y1="23" x2="7" y2="23" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="45" y1="23" x2="41" y2="23" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Translucent Bulb body */}
                      <path
                        d="M16 23C16 18.5817 19.5817 15 24 15C28.4183 15 32 18.5817 32 23C32 26.1325 30.1983 28.8447 27.5911 30.1557C26.6042 30.652 26 31.6628 26 32.7639V34H22V32.7639C22 31.6628 21.3958 30.652 20.4089 30.1557C17.8017 28.8447 16 26.1325 16 23Z"
                        fill="white"
                        fillOpacity="0.95"
                        stroke="#2DA5A3"
                        strokeWidth="1.75"
                      />
                      {/* Bulb base with warm amber finish */}
                      <rect x="20" y="35" width="8" height="3" rx="1.5" fill="#F59E0B" />
                      <rect x="21" y="39" width="6" height="2" rx="1" fill="#F59E0B" opacity="0.8" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Concept → Code → Case Studies",
                description:
                  "Our 'Why First, Then How' methodology builds deep engineering intuition. Small batches ensure every student gets personal attention from day one.",
                href: "/programs",
                icon: (
                  <div className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Metallic Precision Dial Base */}
                      <circle cx="24" cy="24" r="18" fill="url(#dialGradient)" stroke="#94A3B8" strokeWidth="1.5" />
                      {/* Inner Dial Track */}
                      <circle cx="24" cy="24" r="12" fill="#334155" fillOpacity="0.35" />
                      <circle cx="24" cy="24" r="7" fill="#E2E8F0" />
                      {/* Signature Vibrant Magenta/Pink Arc */}
                      <path
                        d="M24 6 A 18 18 0 0 1 42 24"
                        stroke="#F43F5E"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="dialGradient" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#F1F5F9" />
                          <stop offset="0.5" stopColor="#CBD5E1" />
                          <stop offset="1" stopColor="#94A3B8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                ),
              },
              {
                title: "1-Month Placement Ready Program",
                description:
                  "ATS resume, LinkedIn optimization, mock interviews, GitHub portfolio review, and career coaching — all included in major programs at no extra cost.",
                href: "/programs",
                icon: (
                  <div className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* 3 Rising Bar Pillars */}
                      <rect x="8" y="27" width="7" height="15" rx="3.5" fill="#CBD5E1" fillOpacity="0.85" />
                      <rect x="18" y="19" width="7" height="23" rx="3.5" fill="#94A3B8" fillOpacity="0.85" />
                      <rect x="28" y="13" width="7" height="29" rx="3.5" fill="#64748B" fillOpacity="0.85" />
                      {/* Vibrant Emerald/Mint Green Rising Arrow */}
                      <path
                        d="M12 25L23 15L33 9M33 9H25M33 9V17"
                        stroke="#10B981"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ),
              },
            ].map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="why-tarkai-card group relative rounded-[28px] sm:rounded-4xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between min-h-75 sm:min-h-80 lg:min-h-85 cursor-pointer overflow-hidden
                  bg-[#EAF7F7]
                  shadow-[0_4px_20px_rgba(24,100,116,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(24,100,116,0.28)]
                  transition-shadow duration-700 ease-in-out
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20A6A8]"
              >
                {/* Smooth Hover Gradient Wave (Spreading from top-right corner to bottom-left) */}
                <div
                  className="absolute inset-0 bg-linear-to-b from-[#186474] to-[#114E5B] card-hover-wave pointer-events-none"
                  aria-hidden="true"
                />

                {/* Inverted Corner Cutout SVG matching the notched contour */}
                <svg
                  className="absolute -top-px -right-px w-26 h-26 sm:w-28 sm:h-28 pointer-events-none z-10"
                  viewBox="0 0 100 100"
                  fill="#FFFFFF"
                  aria-hidden="true"
                >
                  <path d="M 100 0 L 0 0 A 20 20 0 0 1 20 20 L 20 60 A 20 20 0 0 0 40 80 L 80 80 A 20 20 0 0 1 100 100 L 100 0 Z" />
                </svg>

                {/* Top-Right Circular Arrow Button */}
                <div
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-13.5 h-13.5 sm:w-14 sm:h-14 lg:w-15 lg:h-15 rounded-full bg-[#EAF7F7] group-hover:bg-[#FFFFFF] flex items-center justify-center text-[#186474] z-20 shadow-xs transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:shadow-md"
                  aria-hidden="true"
                >
                  <svg
                    className="w-5.5 h-5.5 sm:w-6 sm:h-6 lg:w-6.5 lg:h-6.5 transition-transform duration-700 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>

                {/* Top Left Icon Container */}
                <div className={`relative z-10 transition-transform duration-700 ease-in-out group-hover:scale-105 ${index === 0 ? 'mb-5 sm:mb-6' : 'mb-6 sm:mb-7'}`}>
                  {feature.icon}
                </div>

                {/* Title and Description */}
                <div className="relative z-10 flex flex-col justify-start grow">
                  <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-bold tracking-tight mb-2.5 sm:mb-3 text-[#0F1C1E] group-hover:text-white group-active:text-white transition-colors duration-700 ease-in-out leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-[#4D666D] group-hover:text-white group-active:text-white text-[14.5px] sm:text-[15px] lg:text-[15.5px] leading-[1.65] transition-colors duration-700 ease-in-out">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Home Waypoints Journey */}
      <HomeWaypoints />

      {/* Full Curriculum Highlight */}
      <SignaturePrograms />

      {/* Why Now Section - Light Theme Redesign */}
      <section id="why-now" className="pt-6 sm:pt-8 md:pt-16 pb-12 sm:pb-16 md:pb-24 bg-[#F8FCFC] relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-[#20A6A8]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-150 h-150 bg-[#20A6A8]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <GeometricShapes variant="why-now" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-20 gsap-fade-up">
            <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-px bg-[#20A6A8]/40"></div>
              <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                Why Now?
              </div>
              <div className="w-8 h-px bg-[#20A6A8]/40"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-3 sm:mb-6">
              The Intelligence Shift is <span className="text-[#20A6A8]">Reshaping Work</span>
            </h2>
            <p className="text-[14.5px] sm:text-[16px] font-normal leading-[1.6] sm:leading-[1.65] text-slate-500 max-w-2xl mx-auto">
              With AI transforming every industry and talent gaps widening, <br className="hidden sm:block" />now is the perfect time to build your technical edge.
            </p>
          </div>

          {/* Centered Cards Layout */}
          <div className="relative max-w-4xl mx-auto">
              <div className="flex flex-col gap-4 sm:gap-6 gsap-slide-up-stagger">
                {[
                  {
                    title: "AI transforms every workflow",
                    description: "Companies now ship AI copilots and agentic tools across finance, healthcare, and design. Teams need builders who can translate business queries into intelligent systems.",
                    icon: <FaMicrochip size={32} />
                  },
                  {
                    title: "Data literacy is the new baseline",
                    description: "Leaders demand professionals who can clean, analyze, and narrate data fluently. Those skills turn dashboards into decisions and experiments into revenue.",
                    icon: <FaChartLine size={32} />
                  },
                  {
                    title: "Talent gaps are widening fast",
                    description: "Over 70% of employers report difficulty hiring AI & analytics talent. Programmatic upskilling with mentorship is the quickest route to the front of the queue.",
                    icon: <FaUsers size={32} />
                  }
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    {/* Modern Card Design - All White */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 w-full flex flex-col hover:-translate-y-2 transition-all duration-500 overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(32,166,168,0.1)]">
                      
                      {/* Decorative Background Blob on Hover */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 bg-linear-to-br from-[#20A6A8]/10 to-transparent"></div>

                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative z-10">
                        {/* Icon Block */}
                        <div className="shrink-0 hidden md:block">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#20A6A8] shadow-inner transition-transform duration-500 group-hover:scale-110 bg-linear-to-br from-[#20A6A8]/10 to-[#1B9FA1]/20">
                            {item.icon}
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col">
                          <h3 className="text-lg sm:text-[22px] font-bold text-[#0F1C1E] mb-1.5 sm:mb-2">
                            {item.title}
                          </h3>
                          
                          <p className="leading-[1.6] sm:leading-[1.65] text-[14px] sm:text-[16px] text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>

        </div>
      </section>

      {/* Placement Stories Showcase */}
      <PlacementStoriesSection />

      {/* Student Reels Section */}
      <StudentReelsSection />

      {/* Blog Section */}
      <HomeBlogSection latestBlogs={latestBlogs} />

      {/* Student Success Stories */}
      <TestimonialsSection 
        title={<>What Our Students Say About <span className="text-[#20A6A8]">Their Learning</span></>}
      />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact / CTA Section */}
      <HomeContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />

      <ScrollToTop />
    </div>
  );
}
