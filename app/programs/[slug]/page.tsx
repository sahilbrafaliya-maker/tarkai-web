import { programs } from "@/data/programsData";
import RoadmapViewer, { CompleteJourney } from "@/components/RoadmapViewer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FaBook } from "@react-icons/all-files/fa/FaBook";
import { FaUserTie } from "@react-icons/all-files/fa/FaUserTie";
import { FaCode } from "@react-icons/all-files/fa/FaCode";
import { FaBullseye } from "@react-icons/all-files/fa/FaBullseye";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaTag } from "@react-icons/all-files/fa/FaTag";
import { FaLayerGroup } from "@react-icons/all-files/fa/FaLayerGroup";

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
            title: 'Program Not Found | TARK AI',
            description: 'The requested program could not be found.',
        };
    }

    const pageUrl = `https://tarkaiedtech.com/programs/${program.slug}`;
    const imageUrl = program.image
        ? (program.image.startsWith('http') ? program.image : `https://tarkaiedtech.com${program.image}`)
        : 'https://tarkaiedtech.com/Logo.png';
    const pageTitle = `${program.title} | TARK AI EdTech`;
    const pageDescription = program.description[0];

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: [
            program.title,
            `${program.title} Surat`,
            `${program.title} Gujarat`,
            program.subtitle,
            "AI Course Surat",
            "Data Science Program Surat",
            "Machine Learning Course Gujarat",
            "TARK AI Programs"
        ],
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: pageUrl,
            siteName: "TARK AI EdTech",
            type: "website",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: program.title,
                }
            ],
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
            images: [imageUrl],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
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
      "url": `https://tarkaiedtech.com/programs/${program.slug}`,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "TARK AI EdTech Private Limited",
        "sameAs": "https://tarkaiedtech.com"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Blended",
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
        <div className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Dark Premium Hero Section */}
            <div className="relative pt-16 pb-8 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-brand-darkest text-white">
                {/* Amazing Premium Glow Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-brand-accent/20 via-brand-darkest to-brand-darkest z-0"></div>
                <div className="absolute top-0 right-0 w-150 h-150 bg-brand-accent/15 rounded-full blur-[100px] -mr-40 -mt-40 z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-125 h-125 bg-teal-400/10 rounded-full blur-[80px] -ml-20 -mb-20 z-0 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay z-0 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Link */}
                    <div className="mb-3.5 sm:mb-10 md:mb-12">
                        <Link href="/programs" className="inline-flex items-center text-[12px] sm:text-[14px] font-semibold text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            Back to Programs
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-12 lg:gap-8 items-center justify-between">
                        {/* Left Side Content */}
                        <div className="flex-1 max-w-3xl">
                            {((program as any).level || (program as any).fee) && (
                                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-6">
                                    {(program as any).level && (
                                        <span className="inline-block px-4 py-1.5 rounded-full text-white text-[12px] font-bold tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.3)] bg-white/10 border border-white/20">
                                            Level: {(program as any).level}
                                        </span>
                                    )}
                                    {(program as any).fee && (
                                        <span className="inline-block px-4 py-1.5 rounded-full text-brand-accent text-[12px] font-bold tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.3)] bg-brand-accent/20 border border-brand-accent/40">
                                            Fee: {(program as any).fee}
                                        </span>
                                    )}
                                </div>
                            )}
                            
                            <h1 className="text-2xl sm:text-4xl lg:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-2 sm:mb-4">
                                {program.title}
                            </h1>
                            <h2 className="text-[16px] sm:text-[20px] lg:text-[28px] font-semibold leading-snug tracking-[-0.01em] text-transparent bg-clip-text bg-linear-to-r from-brand-accent to-teal-200 mb-3 sm:mb-8 max-w-2xl">
                                {program.subtitle}
                            </h2>
                            
                            <div className="space-y-2.5 sm:space-y-4 max-w-2xl mb-4 sm:mb-12">
                                {program.description.map((desc, i) => (
                                    <p key={i} className="text-[13px] sm:text-[16px] leading-[1.65] sm:leading-[1.7] text-gray-300">
                                        {desc}
                                    </p>
                                ))}
                            </div>

                            {/* 4 Feature Pills */}
                            <div className="flex flex-wrap gap-2.5 sm:gap-4 mt-3.5 sm:mt-8">
                                {[
                                    { icon: <FaBook className="text-brand-accent text-[15px] sm:text-lg"/>, text: `${program.roadmap.length} Modules` },
                                    { icon: <FaUserTie className="text-brand-accent text-[15px] sm:text-lg"/>, text: "Live Mentorship" },
                                    { icon: <FaCode className="text-brand-accent text-[15px] sm:text-lg"/>, text: "Real Projects" },
                                    { icon: <FaBullseye className="text-brand-accent text-[15px] sm:text-lg"/>, text: "Industry Ready" },
                                ].map((pill, idx) => (
                                    <div key={idx} className="flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:-translate-y-1 duration-300">
                                        {pill.icon}
                                        <span className="text-[12px] sm:text-[14px] font-semibold text-white tracking-wide">{pill.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Glassmorphic Card */}
                        <div className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 lg:max-w-none lg:w-84 xl:w-88 relative mt-6 sm:mt-10 lg:mt-0 shrink-0">
                            {/* Premium Glowing Card */}
                            <div className="relative rounded-2xl sm:rounded-3xl p-px bg-linear-to-b from-brand-accent/60 to-white/10 shadow-[0_0_60px_-15px_rgba(32,166,168,0.35)]">
                                <div className="bg-brand-darkest/90 backdrop-blur-3xl rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] p-4 sm:p-6 lg:p-7 relative overflow-hidden border border-white/5">
                                    {/* Card Background Glow */}
                                    <div className="absolute top-0 right-0 w-36 h-36 bg-brand-accent/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-brand-dark/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
                                    
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl text-white mb-2.5 sm:mb-4 shadow-md bg-linear-to-br from-brand-accent to-brand-dark relative z-10`}>
                                        {program.icon}
                                    </div>

                                    <h3 className="text-[18px] sm:text-[22px] font-bold leading-tight tracking-tight text-white mb-3 sm:mb-4 relative z-10">Program Details</h3>

                                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 relative z-10">
                                        <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/10">
                                            <div className="flex items-center gap-2.5 text-gray-400">
                                                <FaCalendarAlt className="text-[15px] sm:text-base" />
                                                <span className="text-[13px] sm:text-[14px] font-medium tracking-wide">Duration</span>
                                            </div>
                                            <span className="text-[13px] sm:text-[14px] font-bold text-white">{program.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/10">
                                            <div className="flex items-center gap-2.5 text-gray-400">
                                                <FaBook className="text-[15px] sm:text-base" />
                                                <span className="text-[13px] sm:text-[14px] font-medium tracking-wide">Modules</span>
                                            </div>
                                            <span className="text-[13px] sm:text-[14px] font-bold text-white">{program.roadmap.length} Modules</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/10">
                                            <div className="flex items-center gap-2.5 text-gray-400">
                                                <FaUserTie className="text-[15px] sm:text-base" />
                                                <span className="text-[13px] sm:text-[14px] font-medium tracking-wide">Mentorship</span>
                                            </div>
                                            <span className="text-[13px] sm:text-[14px] font-bold text-white">Included</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/10">
                                            <div className="flex items-center gap-2.5 text-gray-400">
                                                <FaCode className="text-[15px] sm:text-base" />
                                                <span className="text-[13px] sm:text-[14px] font-medium tracking-wide">Real-world Projects</span>
                                            </div>
                                            <span className="text-[13px] sm:text-[14px] font-bold text-white">Yes</span>
                                        </div>
                                        {(program as any).level && (
                                            <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/10">
                                                <div className="flex items-center gap-2.5 text-gray-400">
                                                    <FaLayerGroup className="text-[15px] sm:text-base" />
                                                    <span className="text-[13px] sm:text-[14px] font-medium tracking-wide">Level</span>
                                                </div>
                                                <span className="text-[13px] sm:text-[14px] font-bold text-white">{(program as any).level}</span>
                                            </div>
                                        )}
                                        {(program as any).fee && (
                                            <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/10">
                                                <div className="flex items-center gap-2.5 text-gray-400">
                                                    <FaTag className="text-[15px] sm:text-base" />
                                                    <span className="text-[13px] sm:text-[14px] font-medium tracking-wide">Fee</span>
                                                </div>
                                                <span className="text-[13px] sm:text-[14px] font-bold text-brand-accent">{(program as any).fee}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="block w-full text-center text-[13px] sm:text-[14px] bg-linear-to-r from-brand-accent to-brand-dark text-white font-bold py-2.5 sm:py-3 rounded-xl hover:shadow-[0_8px_25px_-8px_rgba(32,166,168,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative z-10"
                                    >
                                        Apply Now &rarr;
                                    </Link>

                                    <a
                                        href={encodeURI((program as any).brochure || '/TarkAI Edtech Brochure.pdf')}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2.5 w-full text-center text-[12px] sm:text-[13px] bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold py-2 sm:py-2.5 rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center gap-2 group/brochure"
                                    >
                                        <span>Download Brochure</span>
                                        <svg className="w-4 h-4 opacity-70 group-hover/brochure:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-10">
                <div className="flex flex-col">
                    {/* Content Side (Full Width) */}
                    <div className="w-full">
                        <RoadmapViewer roadmap={program.roadmap} />
                    </div>
                </div>
            </div>

            {/* The Complete Journey Section */}
            {program.benefits && (
                <CompleteJourney benefits={program.benefits} />
            )}
        </div>
    );
}
