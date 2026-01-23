import Link from "next/link";
import HeroBackground from "./components/HeroBackground";
import { FaChalkboardTeacher, FaLightbulb, FaRocket } from "react-icons/fa";
import ScrollToTop from "./components/ScrollToTop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Career Guidance Platform | AI-Powered Education – TARK AI",
  description: "TARK AI is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs.",
  alternates: {
    canonical: "https://tarkaiedtech.com",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-lightest min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-darkest tracking-tight mb-6 md:mb-8 gsap-fade-up">
              TARK AI: AI-Powered Career Guidance Platform<br className="hidden sm:block" />
              <span className="text-brand-accent"> for Students & Professionals</span>
            </h1>
            <p className="text-xl sm:text-2xl text-brand-dark max-w-3xl mx-auto mb-10 gsap-fade-up">
              <span className="font-bold block mb-2">Welcome to TARK AI, your AI-powered career guidance platform.</span>
              Begin inside our intelligent career portal. Transforming education through innovation, personalized learning, and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 gsap-fade-up px-4 sm:px-0">
              <Link
                href="/ai-career-guider"
                className="w-full sm:w-auto px-6 py-3 text-sm md:text-base md:px-8 md:py-4 bg-brand-dark text-white font-bold rounded-lg hover:bg-brand-accent transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg text-center flex items-center justify-center gap-2"
              >
                <FaRocket className="text-sm" />
                Launch AI Career Guide
              </Link>
              <Link
                href="/programs"
                className="w-full sm:w-auto px-6 py-3 text-sm md:text-base md:px-8 md:py-4 bg-brand-accent text-white font-bold rounded-lg hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg text-center"
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-6 py-3 text-sm md:text-base md:px-8 md:py-4 bg-white text-brand-dark font-bold rounded-lg border-2 border-brand-accent hover:bg-brand-light hover:text-brand-darkest transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-center"
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 gsap-fade-up">
            <h2 className="text-3xl font-bold text-brand-darkest mb-4">Why Choose TarkAI?</h2>
            <p className="text-lg text-brand-dark max-w-2xl mx-auto">
              We focus on delivering high-quality education that is accessible, engaging, and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 gsap-stagger">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from industry leaders and experienced educators dedicated to your success.",
                icon: <FaChalkboardTeacher />
              },
              {
                title: "Interactive Learning",
                description: "Engage with dynamic content, quizzes, and live sessions that make learning fun.",
                icon: <FaLightbulb />
              },
              {
                title: "Career Focus",
                description: "Curriculum designed to equip you with the skills needed for today's job market.",
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

      {/* Signature Programs Section */}
      <section className="py-20 bg-brand-lightest relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 gsap-fade-up">
            <h2 className="text-3xl font-bold text-brand-darkest mb-4">Signature Programs</h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 gsap-stagger">
            {[
              {
                title: "AI / ML Architect Program",
                duration: "7 Months · Placement Mentorship",
                description: "From intelligent databases to agentic systems—craft full-stack AI experiences that are production ready.",
                highlights: ["Full-stack ML systems", "LLM fine-tuning & agent orchestration"],
                icon: <FaRocket />
              },
              {
                title: "Data Science & Strategic Analytics",
                duration: "7 Months · Placement Mentorship",
                description: "Transform noisy data into boardroom narratives and predictive models leaders can act on instantly.",
                highlights: ["Analytics storytelling", "Spark-powered ML pipelines"],
                icon: <FaChalkboardTeacher />
              },
              {
                title: "Future Founders – AI Foundation",
                duration: "2 Months",
                description: "A playful launchpad for teens and first-time builders to code, analyze, and present their first AI ideas.",
                highlights: ["Creative coding sprints", "Responsible AI mindset"],
                icon: <FaLightbulb />
              },
              {
                title: "Green Intelligence – Climate Analytics",
                duration: "2 Months",
                description: "Decode carbon markets, architect ESG dashboards, and advise on climate-positive strategies with data.",
                highlights: ["Emission analytics", "Carbon market storytelling"],
                icon: <FaLightbulb />
              }
            ].map((program, index) => (
              <div key={index} className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-light/20 flex flex-col items-start text-left hover:-translate-y-1">
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="p-3 bg-brand-lightest rounded-lg text-brand-darkest text-2xl group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                    {program.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full">
                    {program.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-brand-darkest mb-3 group-hover:text-brand-accent transition-colors">{program.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                <ul className="mb-8 space-y-2 w-full">
                  {program.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-brand-dark font-medium">
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <Link href="/programs" className="mt-auto flex items-center text-brand-darkest font-bold group-hover:text-brand-accent transition-colors">
                  Explore syllabus <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section - Redesigned */}
      <section className="py-24 bg-brand-darkest text-white relative overflow-hidden">
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
              Industries are pivoting. The gap between "AI-curious" and "AI-capable" is where the biggest opportunities lie today. TarkAI bridges that gap.
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
                <div className="flex flex-col gap-2 shrink-0">
                  {["AI Surge", "Data-Driven", "Mentored"].map((tag, i) => (
                    <span key={i} className="text-xs font-bold uppercase tracking-wider text-brand-darkest bg-brand-light/80 hover:bg-brand-accent hover:text-white transition-colors px-3 py-1 rounded text-center cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-brand-darkest">
        <div className="max-w-4xl mx-auto px-4 text-center gsap-scale">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-brand-dark mb-10">
            Join thousands of students who are already learning with TarkAI.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-brand-dark hover:text-white transition-all duration-300 hover:scale-110 shadow-lg animate-pulse"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
