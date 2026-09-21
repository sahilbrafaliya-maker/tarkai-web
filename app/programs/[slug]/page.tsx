import { programs } from "@/data/programsData";
import RoadmapViewer from "@/components/RoadmapViewer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FaBook } from "@react-icons/all-files/fa/FaBook";
import { FaUserTie } from "@react-icons/all-files/fa/FaUserTie";
import { FaCode } from "@react-icons/all-files/fa/FaCode";
import { FaBullseye } from "@react-icons/all-files/fa/FaBullseye";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";

export async function generateStaticParams() {
    return programs.map((program) => ({
        slug: program.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const program = programs.find(p => p.slug === slug);
    
    if (!program) {
        return {
            title: 'Program Not Found'
        }
    }

    return {
        title: `${program.title} | Tark AI`,
        description: program.description[0],
    }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = programs.find(p => p.slug === slug);

    if (!program) {
        notFound();
    }

    // JSON-LD structured data for the course
    const courseJsonLd = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": program.title,
      "description": program.description[0],
      "provider": {
        "@type": "Organization",
        "name": "Tark AI",
        "sameAs": "https://tarkaiedtech.com"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": program.duration
      }
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarkaiedtech.com" },
        { "@type": "ListItem", "position": 2, "name": "Programs", "item": "https://tarkaiedtech.com/programs" },
        { "@type": "ListItem", "position": 3, "name": program.title, "item": `https://tarkaiedtech.com/programs/${program.slug}` }
      ]
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Dark Premium Hero Section */}
            <div className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-brand-darkest text-white">
                {/* Amazing Premium Glow Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-brand-accent/20 via-brand-darkest to-brand-darkest z-0"></div>
                <div className="absolute top-0 right-0 w-150 h-150 bg-brand-accent/15 rounded-full blur-[100px] -mr-40 -mt-40 z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-125 h-125 bg-teal-400/10 rounded-full blur-[80px] -ml-20 -mb-20 z-0 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay z-0 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Link */}
                    <div className="mb-10 md:mb-12">
                        <Link href="/programs" className="inline-flex items-center text-[13px] sm:text-[14px] font-semibold text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            Back to Programs
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between">
                        {/* Left Side Content */}
                        <div className="flex-1 max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-white text-[12px] font-bold tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.3)] bg-brand-accent`}>
                                    {program.duration}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-4">
                                {program.title}
                            </h1>
                            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold leading-snug tracking-[-0.01em] text-transparent bg-clip-text bg-linear-to-r from-brand-accent to-teal-200 mb-8 max-w-2xl">
                                {program.subtitle}
                            </h2>
                            
                            <div className="space-y-4 max-w-2xl mb-12">
                                {program.description.map((desc, i) => (
                                    <p key={i} className="text-[15px] sm:text-[16px] leading-[1.7] text-gray-300">
                                        {desc}
                                    </p>
                                ))}
                            </div>

                            {/* 4 Feature Pills */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                {[
                                    { icon: <FaBook className="text-brand-accent text-lg"/>, text: `${program.roadmap.length} Modules` },
                                    { icon: <FaUserTie className="text-brand-accent text-lg"/>, text: "Live Mentorship" },
                                    { icon: <FaCode className="text-brand-accent text-lg"/>, text: "Real Projects" },
                                    { icon: <FaBullseye className="text-brand-accent text-lg"/>, text: "Industry Ready" },
                                ].map((pill, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:-translate-y-1 duration-300">
                                        {pill.icon}
                                        <span className="text-[13px] sm:text-[14px] font-semibold text-white tracking-wide">{pill.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Glassmorphic Card */}
                        <div className="w-full lg:w-105 relative mt-12 lg:mt-0 shrink-0">
                            {/* Premium Glowing Card */}
                            <div className="relative rounded-[2.5rem] p-px bg-linear-to-b from-brand-accent/60 to-white/10 shadow-[0_0_80px_-15px_rgba(32,166,168,0.4)]">
                                <div className="bg-brand-darkest/90 backdrop-blur-3xl rounded-[calc(2.5rem-1px)] p-8 sm:p-10 relative overflow-hidden border border-white/5">
                                    {/* Card Background Glow */}
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-dark/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
                                    
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white mb-8 shadow-lg bg-linear-to-br from-brand-accent to-brand-dark relative z-10`}>
                                        {program.icon}
                                    </div>

                                    <h3 className="text-[24px] sm:text-[28px] font-bold leading-tight tracking-[-0.02em] text-white mb-8 relative z-10">Program Details</h3>

                                    <div className="space-y-6 mb-10 relative z-10">
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <FaCalendarAlt className="text-lg" />
                                                <span className="text-[15px] font-medium tracking-wide">Duration</span>
                                            </div>
                                            <span className="text-[15px] font-bold text-white">{program.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <FaBook className="text-lg" />
                                                <span className="text-[15px] font-medium tracking-wide">Modules</span>
                                            </div>
                                            <span className="text-[15px] font-bold text-white">{program.roadmap.length} Modules</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <FaUserTie className="text-lg" />
                                                <span className="text-[15px] font-medium tracking-wide">Mentorship</span>
                                            </div>
                                            <span className="text-[15px] font-bold text-white">Included</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <FaCode className="text-lg" />
                                                <span className="text-[15px] font-medium tracking-wide">Real-world Projects</span>
                                            </div>
                                            <span className="text-[15px] font-bold text-white">Yes</span>
                                        </div>
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="block w-full text-center text-[16px] bg-linear-to-r from-brand-accent to-brand-dark text-white font-bold py-4 rounded-xl hover:shadow-[0_8px_25px_-8px_rgba(32,166,168,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative z-10"
                                    >
                                        Apply Now &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="flex flex-col">
                    {/* Content Side (Full Width) */}
                    <div className="w-full space-y-16">
                        <RoadmapViewer roadmap={program.roadmap} benefits={program.benefits} />
                    </div>
                </div>
            </div>
        </div>
    );
}
