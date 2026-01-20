import { Metadata } from "next";
import Link from "next/link";
import { FaBrain, FaChartLine, FaMapMarkedAlt } from "react-icons/fa";

export const metadata: Metadata = {
    title: "AI Career Guidance Portal | Intelligent Career Roadmaps – TARK AI",
    description: "AI Career Guidance Portal for Future Careers. Get personalized AI-powered career roadmaps, intelligent skill mapping, and career path recommendations.",
    keywords: ["AI Career Guidance Portal", "AI Career Assessment", "AI Career Roadmap", "Intelligent Career Guidance", "AI Skill Mapping"],
    alternates: {
        canonical: "https://tarkaiedtech.com/ai-career-guider",
    },
};

export default function AICareerGuiderPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-brand-lightest overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-darkest mb-6 leading-tight animate-fade-in-up">
                        AI Career Guidance Portal <br />
                        <span className="text-brand-accent">for Your Future</span>
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-100">
                        Discover your potential with TARK AI's intelligent career assessment. Get a personalized roadmap tailored to your skills and aspirations.
                    </p>
                    <div className="animate-fade-in-up delay-200">
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-4 bg-brand-accent text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all duration-300 transform hover:scale-105"
                        >
                            Start Your Assessment
                        </Link>
                    </div>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-brand-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                            <div className="w-16 h-16 mx-auto bg-brand-lightest text-brand-accent rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                <FaBrain />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-darkest mb-4">Intelligent Assessment</h3>
                            <p className="text-gray-600">
                                Our AI analyzes your interests, strengths, and goals to suggest the perfect career paths.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                            <div className="w-16 h-16 mx-auto bg-brand-lightest text-brand-accent rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                <FaMapMarkedAlt />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-darkest mb-4">Personalized Roadmap</h3>
                            <p className="text-gray-600">
                                Get a step-by-step guide from zero to mastery in your chosen field, curated by experts.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                            <div className="w-16 h-16 mx-auto bg-brand-lightest text-brand-accent rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                <FaChartLine />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-darkest mb-4">Market Insights</h3>
                            <p className="text-gray-600">
                                Stay ahead with real-time data on industry trends, salary benchmarks, and hiring demand.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-dark text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Ready to Design Your Future?</h2>
                    <p className="text-lg text-brand-light/80 mb-10">
                        Join thousands of students using TARK AI to navigate their careers with confidence.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-10 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-white hover:text-brand-accent transition-all duration-300 shadow-lg"
                    >
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
