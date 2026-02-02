import { programs } from "@/data/programsData";
import RoadmapViewer from "@/components/RoadmapViewer";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return programs.map((program) => ({
        slug: program.slug,
    }));
}

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = programs.find((p) => p.slug === slug);

    if (!program) {
        return notFound();
    }

    return (
        <div className="bg-white min-h-screen pt-28 pb-20">
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

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Limited seats available for next cohort.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
