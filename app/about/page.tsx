import { FaEye, FaRocket } from 'react-icons/fa';
import { Metadata } from 'next';
import GeometricShapes from '../components/GeometricShapes';
import BackgroundText from '../components/BackgroundText';

export const metadata: Metadata = {
    title: "About TARK AI | Leading AI EdTech Company in India",
    description: "TARK AI EdTech Private Limited democratizes access to intelligent career guidance. Learn how we prepare learners for the future of work.",
    alternates: {
        canonical: "https://tarkaiedtech.com/about",
    },
};

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen pb-20 pt-28 relative overflow-hidden">
            <GeometricShapes />
            <div className="bg-brand-lightest py-20 relative overflow-hidden">
                <BackgroundText text="ABOUT TARK" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-8 animate-slide-up">
                        About TARK AI EdTech - Leading AI Education Platform
                    </h1>
                    <div className="max-w-3xl mx-auto space-y-6 text-xl text-gray-700 leading-relaxed animate-slide-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <p>
                            Founded in 2026 and headquartered in Surat, Gujarat, TARK AI EdTech Private Limited is a future-focused education company. TARK AI is India's leading AI-powered career guidance platform, built on the belief that learning should go beyond certificates and create meaningful impact.
                        </p>
                        <p>
                            TarkAI was established to address gaps in modern education, where tools are often prioritized over deep understanding, problem-solving, and real-world readiness. We focus on conceptual clarity, practical application, and long-term career value.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 border border-gray-100 animate-slide-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-darkest mb-6">Our Philosophy</h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                We offer structured programs in AI & ML, Data Science, Climate Technology, and Foundation learning for students, professionals, and career switchers through a founder-led, mentor-driven approach.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Our philosophy follows <span className="font-bold text-brand-accent">Why first, then How</span>, moving from concept → code → case studies, with small batches and hands-on projects that build skills, confidence, and career readiness.
                            </p>
                        </div>
                        <div className="bg-brand-lightest/50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl"></div>
                            <h3 className="text-2xl font-bold text-brand-darkest mb-4">Core Focus Areas</h3>
                            <ul className="space-y-3">
                                {[
                                    "Artificial Intelligence & Machine Learning",
                                    "Data Science & Strategic Analytics",
                                    "Climate Technology (Green Intelligence)",
                                    "Foundation Learning for Future Founders"
                                ].map((area, i) => (
                                    <li key={i} className="flex items-center text-gray-700 font-medium">
                                        <span className="w-2 h-2 bg-brand-accent rounded-full mr-3"></span>
                                        {area}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12 md:mt-20">
                    {/* Vision */}
                    <div className="bg-brand-dark text-white rounded-3xl p-6 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110"></div>
                        <h2 className="text-3xl font-bold mb-6 relative z-10 flex items-center">
                            <span className="bg-white/10 p-2 rounded-lg mr-4"><FaEye size={24} /></span>
                            Our Vision
                        </h2>
                        <p className="text-lg text-gray-200 leading-relaxed relative z-10 mb-4">
                            To build a future-focused EdTech ecosystem that nurtures curiosity, critical thinking and real-world problem solving, empowering learners to become skilled professionals, ethical innovators, and confident leaders in Artificial Intelligence, Data Science, and Climate Technology.
                        </p>
                        <p className="text-lg text-gray-200 leading-relaxed relative z-10">
                            We envision education that goes beyond certificates—education that creates impact, responsibility, and long-term value for individuals and society.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white border-2 border-brand-lightest rounded-3xl p-6 md:p-10 hover:-translate-y-1 transition-transform duration-300 hover:border-brand-accent/30 hover:shadow-lg">
                        <h2 className="text-3xl font-bold text-brand-darkest mb-6 flex items-center">
                            <span className="bg-brand-lightest p-2 rounded-lg mr-4 text-brand-accent"><FaRocket size={24} /></span>
                            Our Mission
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "To deliver industry-relevant, concept-driven education beyond rote learning",
                                "To bridge the gap between academic knowledge and real-world application",
                                "To mentor learners with a founder-led, hands-on approach",
                                "To create future-ready professionals and innovators across AI, Data Science, and Climate Tech"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="shrink-0 w-2 h-2 bg-brand-accent rounded-full mt-2.5 mr-4"></span>
                                    <span className="text-lg text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
