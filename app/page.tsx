import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import HeroVisual from "./components/HeroVisual";
import { FaChalkboardTeacher } from "@react-icons/all-files/fa/FaChalkboardTeacher";
import { FaLightbulb } from "@react-icons/all-files/fa/FaLightbulb";
import { FaRocket } from "@react-icons/all-files/fa/FaRocket";
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
const HomeAnnouncementPopup = dynamic(() => import("./components/HomeAnnouncementPopup"));
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
      <HomeAnnouncementPopup />
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
      <section id="features" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
        
        {/* Background Decorations matching the reference */}
        <div className="absolute -bottom-37.5 -right-37.5 w-100 h-100 bg-[#FFFFFF]/40 rounded-full pointer-events-none blur-[2px]"></div>
        
        <GeometricShapes variant="why-choose-us" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Area */}
          <div className="text-center max-w-5xl mx-auto mb-16 gsap-fade-up relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#20A6A8]/40"></div>
              <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                Why Choose Us
              </div>
              <div className="w-8 h-px bg-[#20A6A8]/40"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-6">
              Why TarkAI is Surat&apos;s <span className="text-[#20A6A8]">Best Choice</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-2xl mx-auto">
              Specific credentials, not vague promises — here&apos;s exactly what separates<br className="hidden sm:block" /> TarkAI from other institutes in Surat and Gujarat.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 gsap-stagger mt-12 relative z-10">
            {[
              {
                title: "IIIT Lucknow Faculty",
                description: "Your instructors are co-founders holding M.Sc. degrees in AI, Machine Learning, and Climate Analytics from IIIT Lucknow — not just corporate trainers.",
                icon: <FaChalkboardTeacher className="w-6 h-6" aria-hidden="true" focusable="false" />
              },
              {
                title: "Concept → Code → Case Studies",
                description: "Our 'Why First, Then How' methodology builds deep engineering intuition. Small batches ensure every student gets personal attention from day one.",
                icon: <FaLightbulb className="w-6 h-6" aria-hidden="true" focusable="false" />
              },
              {
                title: "1-Month Placement Ready Program",
                description: "ATS resume, LinkedIn optimization, mock interviews, GitHub portfolio review, and career coaching — all included in major programs at no extra cost.",
                icon: <FaRocket className="w-6 h-6" aria-hidden="true" focusable="false" />
              }
            ].map((feature, index) => {
              const isActive = index === 1;
              return (
                <div 
                  key={index} 
                  className={`group relative bg-white border rounded-4xl p-8 sm:p-10 transition-all duration-300 overflow-hidden flex flex-col ${isActive ? 'border-[#20A6A8] shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'border-[#0F1C1E]/20 hover:border-[#20A6A8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'}`}
                >
                  {/* Background glow on hover */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-[#20A6A8]/10 to-transparent transition-opacity duration-500 rounded-bl-full pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  <div className={`absolute inset-0 bg-linear-to-br from-[#20A6A8]/2 to-transparent transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 relative z-10 mb-8 border border-[#20A6A8]/10 ${isActive ? 'bg-[#20A6A8] text-white' : 'bg-[#20A6A8]/5 text-[#20A6A8] group-hover:bg-[#20A6A8] group-hover:text-white'}`}>
                    {feature.icon}
                  </div>
                  
                  {/* Text Content */}
                  <h3 className={`text-xl sm:text-[22px] font-semibold mb-4 relative z-10 transition-colors duration-300 ${isActive ? 'text-[#20A6A8]' : 'text-[#0F1C1E] group-hover:text-[#20A6A8]'}`}>
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-[15px] sm:text-[16px] leading-[1.65] relative z-10">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Home Waypoints Journey */}
      <HomeWaypoints />

      {/* Full Curriculum Highlight */}
      <SignaturePrograms />

      {/* Why Now Section - Light Theme Redesign */}
      <section id="why-now" className="pt-8 md:pt-16 pb-24 bg-[#F8FCFC] relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-[#20A6A8]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-150 h-150 bg-[#20A6A8]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <GeometricShapes variant="why-now" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-5xl mx-auto mb-8 md:mb-20 gsap-fade-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#20A6A8]/40"></div>
              <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                Why Now?
              </div>
              <div className="w-8 h-px bg-[#20A6A8]/40"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-6">
              The Intelligence Shift is <span className="text-[#20A6A8]">Reshaping Work</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-2xl mx-auto">
              With AI transforming every industry and talent gaps widening, <br className="hidden sm:block" />now is the perfect time to build your technical edge.
            </p>
          </div>

          {/* Centered Cards Layout */}
          <div className="relative max-w-4xl mx-auto">
              <div className="flex flex-col gap-6 gsap-slide-up-stagger">
                {[
                  {
                    id: "01",
                    title: "AI transforms every workflow",
                    description: "Companies now ship AI copilots and agentic tools across finance, healthcare, and design. Teams need builders who can translate business queries into intelligent systems.",
                    icon: <FaMicrochip size={32} />
                  },
                  {
                    id: "02",
                    title: "Data literacy is the new baseline",
                    description: "Leaders demand professionals who can clean, analyze, and narrate data fluently. Those skills turn dashboards into decisions and experiments into revenue.",
                    icon: <FaChartLine size={32} />
                  },
                  {
                    id: "03",
                    title: "Talent gaps are widening fast",
                    description: "Over 70% of employers report difficulty hiring AI & analytics talent. Programmatic upskilling with mentorship is the quickest route to the front of the queue.",
                    icon: <FaUsers size={32} />
                  }
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    {/* Modern Card Design - All White */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 w-full flex flex-col hover:-translate-y-2 transition-all duration-500 overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(32,166,168,0.1)]">
                      
                      {/* Decorative Background Blob on Hover */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 bg-linear-to-br from-[#20A6A8]/10 to-transparent"></div>

                      <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                        {/* Icon Block */}
                        <div className="shrink-0 hidden md:block">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#20A6A8] shadow-inner transition-transform duration-500 group-hover:scale-110 bg-linear-to-br from-[#20A6A8]/10 to-[#1B9FA1]/20">
                            {item.icon}
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[#20A6A8] font-bold text-sm bg-[#20A6A8]/10 px-2.5 py-1 rounded-lg">{item.id}</span>
                            <h3 className="text-xl sm:text-[22px] font-bold text-[#0F1C1E]">
                              {item.title}
                            </h3>
                          </div>
                          
                          <p className="leading-[1.65] text-[15px] sm:text-[16px] text-slate-500">
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
