import Link from "next/link";

import HeroBackground from "./components/HeroBackground";
import { FaChalkboardTeacher, FaLightbulb, FaRocket, FaMapMarkerAlt, FaWhatsapp, FaPhone } from "react-icons/fa";
import ScrollToTop from "./components/ScrollToTop";
import HomeWaypoints from "./components/HomeWaypoints";
import GeometricShapes from "./components/GeometricShapes";
import SignaturePrograms from "./components/SignaturePrograms";
import FAQSection from "./components/FAQSection";
import { Metadata } from "next";

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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-lightest min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4 gsap-fade-up">
              Surat&apos;s Premier AI &amp; ML Institute
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-darkest tracking-tight mb-6 md:mb-8 gsap-fade-up">
              TARK AI EdTech<br /><span className="text-brand-accent">Where Intelligence Meets Education</span><br className="hidden sm:block" />
            </h1>
            <p className="text-xl sm:text-2xl text-brand-dark max-w-3xl mx-auto mb-4 gsap-fade-up">
              AI &amp; ML courses in Surat taught by IIIT Lucknow M.Sc. graduates. Small batches, hands-on projects, and a 1-Month Placement Ready Program included.
            </p>
            <p className="text-base text-brand-dark/70 max-w-2xl mx-auto mb-10 gsap-fade-up">
              Serving students &amp; professionals across Surat, Gujarat — Foundation to Advanced AI tracks available.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 gsap-fade-up px-4 sm:px-0">
              <a
                href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-brand-darkest text-white border-2 border-brand-darkest hover:bg-brand-dark hover:border-brand-dark"
                id="hero-whatsapp-cta"
              >
                <FaWhatsapp className="text-lg" />
                Book a Free Demo Class
              </a>
              <Link
                href="/programs"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-brand-accent text-white border-2 border-brand-accent hover:bg-brand-dark hover:border-brand-dark"
                id="hero-explore-programs"
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm text-brand-darkest border-2 border-brand-darkest/20 hover:border-brand-darkest hover:bg-brand-darkest hover:text-white"
                id="hero-learn-more"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-brand-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-brand-dark rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
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
              <FaMapMarkerAlt className="text-brand-accent shrink-0" />
              <span>Kyros Business Center, 404 &amp; 405, Sarthana Jakat Naka, Surat 395013</span>
            </a>
            <span className="hidden md:block text-brand-accent/30">|</span>
            <a
              href="tel:+919712358689"
              className="flex items-center gap-2 text-brand-light/80 hover:text-white transition-colors"
              id="trust-strip-phone"
            >
              <FaPhone className="text-brand-accent shrink-0" />
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
              <FaWhatsapp className="text-lg shrink-0" />
              <span>WhatsApp Us — Book a Free Demo</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        <GeometricShapes hideBigHexagon={true} hideTriangle={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 gsap-fade-up">
            <h2 className="text-3xl font-extrabold text-brand-darkest mb-4">Why TARK AI is Surat&apos;s Best Choice for AI Education</h2>
            <p className="text-lg text-brand-dark max-w-2xl mx-auto">
              Specific credentials, not vague promises — here&apos;s exactly what separates TARK AI from other institutes in Surat and Gujarat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 gsap-stagger">
            {[
              {
                title: "IIIT Lucknow Faculty",
                description: "Your instructors are co-founders holding M.Sc. degrees in AI, Machine Learning, and Climate Analytics from IIIT Lucknow — not just corporate trainers.",
                icon: <FaChalkboardTeacher />
              },
              {
                title: "Concept → Code → Case Studies",
                description: "Our 'Why First, Then How' methodology builds deep engineering intuition. Small batches ensure every student gets personal attention from day one.",
                icon: <FaLightbulb />
              },
              {
                title: "1-Month Placement Ready Program",
                description: "ATS resume, LinkedIn optimization, mock interviews, GitHub portfolio review, and career coaching — all included in major programs at no extra cost.",
                icon: <FaRocket />
              }
            ].map((feature, index) => (
              <div key={index} className="group relative p-6 md:p-8 rounded-2xl transition-all duration-300 hover:bg-brand-lightest/50 border border-transparent hover:border-brand-accent/20 text-center">
                <div className="w-20 h-20 mx-auto bg-brand-lightest rounded-full flex items-center justify-center text-4xl text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-darkest mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Waypoints Journey */}
      <HomeWaypoints />

      {/* Signature Programs Section */}
      <SignaturePrograms />

      {/* Why Now Section - Redesigned */}
      <section id="why-now" className="py-20 bg-brand-darkest text-white relative overflow-hidden">
        <GeometricShapes hideBigHexagon={true} hideTopLeftHexagon={true} />
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-light/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20 gsap-fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Why Now? <br />
              <span className="text-brand-accent">The Intelligence Shift.</span>
            </h2>
            <p className="text-xl text-brand-light/70 leading-relaxed">
              Industries are pivoting. The gap between &quot;AI-curious&quot; and &quot;AI-capable&quot; is where the biggest opportunities lie today. TarkAI bridges that gap.
            </p>
          </div>

          <div className="space-y-6 gsap-stagger">
            {[
              {
                id: "01",
                title: "AI transforms every workflow",
                description: "Companies now ship AI copilots and agentic tools across finance, healthcare, and design. Teams need builders who can translate business queries into intelligent systems."
              },
              {
                id: "02",
                title: "Data literacy is the new baseline",
                description: "Leaders demand professionals who can clean, analyze, and narrate data fluidly. Those skills turn dashboards into decisions and experiments into revenue."
              },
              {
                id: "03",
                title: "Talent gaps are widening fast",
                description: "Over 70% of employers report difficulty hiring AI & analytics talent. Programmatic upskilling with mentorship is the quickest route to the front of the queue."
              }
            ].map((item, index) => (
              <div key={index} className="group relative bg-white/5 hover:bg-white/10 border-l-4 border-transparent hover:border-brand-accent transition-all duration-500 rounded-r-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                <div className="text-6xl font-black text-white/5 group-hover:text-brand-accent/20 transition-colors duration-500 font-mono">
                  {item.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                  <p className="text-lg text-brand-light/60 max-w-3xl group-hover:text-brand-light/90 transition-colors duration-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-white text-brand-darkest relative overflow-hidden">
        <GeometricShapes hideBigHexagon={true} />
        <div className="max-w-4xl mx-auto px-4 text-center gsap-scale relative z-10">
          <h2 className="text-3xl font-extrabold mb-3">Ready to Start Your AI Career in Surat?</h2>
          <p className="text-xl text-brand-dark mb-2">
            Talk to our mentors. Ask about programs, fees, batch dates, and placement support.
          </p>
          <p className="text-base text-brand-dark/60 mb-8">
            TARK AI EdTech · Kyros Business Center, Sarthana Jakat Naka, Surat 395013
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-brand-darkest text-white border-2 border-brand-darkest hover:bg-brand-dark hover:border-brand-dark"
              id="cta-whatsapp-demo"
            >
              <FaWhatsapp className="text-xl" />
              Book a Free Demo Class
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-brand-accent text-white border-2 border-brand-accent hover:bg-brand-dark hover:border-brand-dark"
              id="cta-contact"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />

      <ScrollToTop />
    </div>
  );
}
