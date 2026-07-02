import { programs } from "@/data/programsData";
import RoadmapViewer from "@/components/RoadmapViewer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
    return programs.map((program) => ({
        slug: program.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

// Map slugs to local SEO-optimised title prefixes
const localTitleMap: Record<string, string> = {
    "ai-ml-architect-program": "AI/ML Course in Surat",
    "data-science-strategic-analytics": "Data Science Course in Surat",
    "future-founders-ai-foundation": "AI Foundation Course Surat",
    "green-intelligence-climate-analytics": "Climate Analytics Course Surat",
};

// Map slugs to local SEO keyword arrays
const localKeywordMap: Record<string, string[]> = {
    "ai-ml-architect-program": [
        "AI ML course in Surat", "Machine Learning institute Surat",
        "AI course with placement Surat", "agentic AI course Gujarat",
        "LLM training Surat", "best AI ML program Surat", "TARK AI"
    ],
    "data-science-strategic-analytics": [
        "Best Data Science classes in Surat", "Data Science course Surat Gujarat",
        "Python SQL course Surat", "data analytics program Gujarat",
        "data science with placement Surat", "TARK AI"
    ],
    "future-founders-ai-foundation": [
        "AI Foundation course Surat", "AI course for beginners Surat",
        "teen AI course Surat Gujarat", "AI course for students Surat",
        "beginner AI program Gujarat", "TARK AI"
    ],
    "green-intelligence-climate-analytics": [
        "Climate Analytics course Surat", "Climate tech course Gujarat",
        "ESG analytics program India", "carbon markets course Surat",
        "sustainability analytics course", "TARK AI"
    ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const program = programs.find((p) => p.slug === slug);
    if (!program) return {};

    const localPrefix = localTitleMap[slug] || "AI Course in Surat";
    const localKeywords = localKeywordMap[slug] || ["AI course Surat", "TARK AI"];

    return {
        title: `${localPrefix} | ${program.title} – TARK AI EdTech`,
        description: `${program.subtitle} — IIIT Lucknow faculty, small batches & 1-Month Placement Ready Program. ${program.description[0].substring(0, 80)}...`,
        keywords: [
            ...localKeywords,
            program.title,
            program.subtitle,
            "AI Education Programs Surat",
            "IIIT Lucknow faculty"
        ],
        alternates: {
            canonical: `https://tarkaiedtech.com/programs/${program.slug}`,
        },
        openGraph: {
            title: `${localPrefix} | ${program.title} – TARK AI EdTech`,
            description: `${program.subtitle} — IIIT Lucknow faculty, small batches & 1-Month Placement Ready Program in Surat, Gujarat.`,
            url: `https://tarkaiedtech.com/programs/${program.slug}`,
            type: "website",
        },
    };
}

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = programs.find((p) => p.slug === slug);

    if (!program) {
        return notFound();
    }

    const durationMap: Record<string, string> = {
        "ai-ml-architect-program": "P6M",
        "data-science-strategic-analytics": "P6M",
        "future-founders-ai-foundation": "P3M",
        "green-intelligence-climate-analytics": "P3M",
    };

    const teachesMap: Record<string, string[]> = {
        "ai-ml-architect-program": ["Artificial Intelligence", "Machine Learning", "LLMs", "Agentic AI Systems", "Python", "Deep Learning"],
        "data-science-strategic-analytics": ["Python", "SQL", "Data Analysis", "Machine Learning", "Business Intelligence"],
        "future-founders-ai-foundation": ["Python Basics", "AI Fundamentals", "Digital Literacy", "Creative Coding"],
        "green-intelligence-climate-analytics": ["Carbon Markets", "ESG Analytics", "Climate Data Science", "Emissions Accounting"],
    };

    const courseJsonLd = {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `https://tarkaiedtech.com/programs/${program.slug}/#course`,
      "name": program.title,
      "description": program.description.join(" "),
      "url": `https://tarkaiedtech.com/programs/${program.slug}`,
      "inLanguage": "en-IN",
      "courseMode": "Blended",
      "timeToComplete": durationMap[program.slug] || "P6M",
      "teaches": teachesMap[program.slug] || ["Artificial Intelligence", "Machine Learning"],
      "educationalCredentialAwarded": `Certificate of Completion in ${program.title}`,
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Blended",
        "location": {
          "@type": "Place",
          "name": "TARK AI EdTech — Kyros Business Center, Surat",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kyros Business Center, 404 & 405, beside Ashirwad Society, Sarthana Jakat Naka",
            "addressLocality": "Surat",
            "addressRegion": "Gujarat",
            "postalCode": "395013",
            "addressCountry": "IN"
          }
        }
      },
      "provider": {
        "@type": "EducationalOrganization",
        "@id": "https://tarkaiedtech.com/#organization",
        "name": "TARK AI EdTech Private Limited",
        "url": "https://tarkaiedtech.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Surat",
          "addressRegion": "Gujarat",
          "postalCode": "395013",
          "addressCountry": "IN"
        }
      },
      "about": [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Climate Technology"
      ]
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
        <div className="bg-white min-h-screen pt-28 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/programs" className="text-brand-dark hover:text-brand-accent font-medium flex items-center transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Back to Programs
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Content Side */}
                    <div className="flex-1 space-y-10">
                        <div>
                            <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold tracking-wider mb-4 ${program.color}`}>
                                {program.duration}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-4">{program.title}</h1>
                            <h2 className="text-2xl text-brand-accent font-medium">{program.subtitle}</h2>
                        </div>

                        <div className="space-y-4">
                            {program.description.map((desc, i) => (
                                <p key={i} className="text-gray-600 text-lg leading-relaxed border-l-4 border-gray-100 pl-4">
                                    {desc}
                                </p>
                            ))}
                        </div>

                        <RoadmapViewer roadmap={program.roadmap} benefits={(program as any).benefits} />
                    </div>

                    {/* Sticky Sidebar / Image Side */}
                    <div className="lg:w-1/3 relative">
                        <div className="sticky top-32 rounded-3xl overflow-hidden shadow-2xl p-8 bg-brand-lightest/30 border border-brand-accent/10">
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl text-white mb-6 shadow-lg ${program.color}`}>
                                {program.icon}
                            </div>

                            <h3 className="text-xl font-bold text-brand-darkest mb-4">Program Details</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-semibold text-brand-darkest">{program.duration}</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Modules</span>
                                    <span className="font-semibold text-brand-darkest">{program.roadmap.length} Modules</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Mentorship</span>
                                    <span className="font-semibold text-brand-darkest">Included</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="block w-full text-center bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-accent hover:shadow-lg transition-all duration-300"
                            >
                                Apply Now
                            </Link>

                            {/* <p className="text-xs text-center text-gray-400 mt-4">
                                Limited seats available for next cohort.
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
