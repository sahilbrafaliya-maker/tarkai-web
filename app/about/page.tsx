import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaRocket } from "@react-icons/all-files/fa/FaRocket";
import { FaLightbulb } from "@react-icons/all-files/fa/FaLightbulb";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import Image from 'next/image';
import { Metadata } from 'next';
import BackgroundText from '../components/BackgroundText';
import PageHeader from '../components/PageHeader';
import GeometricShapes from '../components/GeometricShapes';
import CallToActionVideo from '../components/CallToActionVideo';

export const metadata: Metadata = {
    title: "About TARK AI | Leading AI EdTech Company in India",
    description: "TARK AI EdTech Private Limited democratizes access to intelligent career guidance. Learn how we prepare learners for the future of work.",
    alternates: {
        canonical: "https://tarkaiedtech.com/about",
    },
};

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen pb-20 relative overflow-hidden">
            <GeometricShapes hideTopLeftHexagon={true} hideTriangle={true} variant="about-page" />
            
            {/* New Hero Section with Video */}
            <div className="pt-20 sm:pt-24 lg:pt-28">
                <CallToActionVideo />
            </div>

            <div className="bg-brand-lightest py-10 relative overflow-hidden hidden">
                <BackgroundText text="ABOUT TARK" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 md:pt-16">
                <div className="space-y-16 md:space-y-24">
                    {/* About Company Section */}
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="order-2 md:order-1 flex flex-col justify-center">
                            <div className="flex items-center justify-start gap-4 mb-4">
                                <div className="w-8 h-px bg-brand-accent/40"></div>
                                <div className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Who We Are</div>
                            </div>
                            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold leading-tight tracking-tight text-brand-darkest mb-6">
                                About TarkAI EdTech
                            </h2>
                            <p className="text-[16px] font-normal leading-[1.7] text-gray-600 mb-5">
                                TarkAI EdTech Private Limited is a forward-thinking education technology company dedicated to democratizing access to intelligent career guidance and future-ready skills. We bridge the gap between academic learning and industry demands.
                            </p>
                            <p className="text-[16px] font-normal leading-[1.7] text-gray-600">
                                Through our founder-led, mentor-driven approach, we equip students, professionals, and career switchers with the practical expertise needed to thrive in rapidly evolving sectors like Artificial Intelligence, Data Science, and Climate Technology.
                            </p>
                        </div>
                        <div className="order-1 md:order-2 relative aspect-video w-full mx-auto rounded-4xl overflow-hidden shadow-2xl border border-gray-100/50">
                            <Image src="/company-about.jpg" alt="About TARK AI" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                        </div>
                    </div>

                    {/* Vision, Mission, Core Focus & Philosophy - Zigzag Layout */}
                    <div className="max-w-5xl mx-auto space-y-16 md:space-y-24 py-12">
                        {/* 1. Vision Row (Icon Left, Text Right) */}
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Icon Side */}
                            <div className="md:w-5/12 flex justify-center order-1 md:order-1">
                                <div className="group relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] cursor-pointer">
                                    {/* Decorative Arcs */}
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-t-brand-accent border-r-brand-accent rounded-full -rotate-45 group-hover:border-brand-accent group-hover:rotate-0 transition-all duration-700"></div>
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-b-brand-accent rounded-full rotate-45 opacity-30 group-hover:border-brand-accent group-hover:rotate-0 group-hover:opacity-100 transition-all duration-700"></div>
                                    
                                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-gray-100 flex items-center justify-center bg-brand-lightest/20 group-hover:bg-brand-accent/5 transition-colors duration-700">
                                        <FaEye className="text-[50px] md:text-[60px] text-brand-darkest group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                            {/* Text Side */}
                            <div className="md:w-7/12 order-2 md:order-2 text-center md:text-left">
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-8 h-px bg-brand-accent/40 hidden md:block"></div>
                                        <div className="text-brand-accent text-sm font-semibold tracking-widest uppercase">The Future</div>
                                    </div>
                                    <h2 className="text-[28px] sm:text-[32px] font-black leading-tight tracking-tight text-brand-darkest mb-6">
                                        Our Vision
                                    </h2>
                                </div>
                                <p className="text-[16px] font-normal leading-[1.7] text-gray-600 mb-5">
                                    To build a future-focused EdTech ecosystem that nurtures curiosity, critical thinking, and real-world problem solving. We aim to empower learners to become highly skilled professionals, ethical innovators, and confident leaders in the rapidly evolving fields of Artificial Intelligence, Data Science, and Climate Technology.
                                </p>
                                <p className="text-[16px] font-normal leading-[1.7] text-gray-600">
                                    We envision education that transcends traditional certificates—an education designed to create lasting impact, cultivate responsibility, and generate long-term value for both individuals and the global society.
                                </p>
                            </div>
                        </div>

                        {/* 2. Mission Row (Text Left, Icon Right) */}
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Text Side */}
                            <div className="md:w-7/12 order-2 md:order-1 text-center md:text-right">
                                <div className="flex flex-col items-center md:items-end w-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-brand-accent text-sm font-semibold tracking-widest uppercase">The Goal</div>
                                        <div className="w-8 h-px bg-brand-accent/40 hidden md:block"></div>
                                    </div>
                                    <h2 className="text-[28px] sm:text-[32px] font-black leading-tight tracking-tight text-brand-darkest mb-6">
                                        Our Mission
                                    </h2>
                                </div>
                                <p className="text-[16px] font-normal leading-[1.7] text-gray-600 mb-5">
                                    Our mission is to deliver industry-relevant, concept-driven education that moves beyond rote memorization. We strive to bridge the persistent gap between academic knowledge and practical real-world application. By mentoring ambitious learners with a hands-on, founder-led approach that guarantees quality, we are dedicated to creating the next generation of future-ready professionals and innovators across AI and Climate Tech.
                                </p>
                            </div>
                            {/* Icon Side */}
                            <div className="md:w-5/12 flex justify-center order-1 md:order-2">
                                <div className="group relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] cursor-pointer">
                                    {/* Decorative Arcs */}
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-t-[#20A6A8] border-l-[#20A6A8] rounded-full rotate-135 group-hover:border-[#20A6A8] group-hover:rotate-0 transition-all duration-700"></div>
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-b-[#20A6A8] rounded-full rotate-45 opacity-30 group-hover:border-[#20A6A8] group-hover:rotate-0 group-hover:opacity-100 transition-all duration-700"></div>
                                    
                                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-gray-100 flex items-center justify-center bg-brand-lightest/20 group-hover:bg-brand-accent/5 transition-colors duration-700">
                                        <FaRocket className="text-[50px] md:text-[60px] text-brand-darkest group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Core Focus Row (Icon Left, Text Right) */}
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Icon Side */}
                            <div className="md:w-5/12 flex justify-center order-1 md:order-1">
                                <div className="group relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] cursor-pointer">
                                    {/* Decorative Arcs */}
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-t-brand-accent border-r-brand-accent rounded-full -rotate-45 group-hover:border-brand-accent group-hover:rotate-0 transition-all duration-700"></div>
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-b-brand-accent rounded-full rotate-45 opacity-30 group-hover:border-brand-accent group-hover:rotate-0 group-hover:opacity-100 transition-all duration-700"></div>
                                    
                                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-gray-100 flex items-center justify-center bg-brand-lightest/20 group-hover:bg-brand-accent/5 transition-colors duration-700">
                                        <FaCheckCircle className="text-[50px] md:text-[60px] text-brand-darkest group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                            {/* Text Side */}
                            <div className="md:w-7/12 order-2 md:order-2 text-center md:text-left">
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-8 h-px bg-brand-accent/40 hidden md:block"></div>
                                        <div className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Our Focus</div>
                                    </div>
                                    <h2 className="text-[28px] sm:text-[32px] font-black leading-tight tracking-tight text-brand-darkest mb-6">
                                        Core Focus Areas
                                    </h2>
                                </div>
                                <ul className="space-y-4 text-left inline-block">
                                    {[
                                        "Artificial Intelligence & Machine Learning",
                                        "Data Science & Strategic Analytics",
                                        "Climate Technology (Green Intelligence)",
                                        "Foundation Learning for Future Founders"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center text-[16px] md:text-[18px] font-medium text-gray-700">
                                            <span className="w-2.5 h-2.5 bg-brand-accent rounded-full mr-4 shadow-sm shadow-brand-accent/50 shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 4. Philosophy Row (Text Left, Icon Right) */}
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Text Side */}
                            <div className="md:w-7/12 order-2 md:order-1 text-center md:text-right">
                                <div className="flex flex-col items-center md:items-end w-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-brand-accent text-sm font-semibold tracking-widest uppercase">The Approach</div>
                                        <div className="w-8 h-px bg-brand-accent/40 hidden md:block"></div>
                                    </div>
                                    <h2 className="text-[28px] sm:text-[32px] font-black leading-tight tracking-tight text-brand-darkest mb-6">
                                        Our Philosophy
                                    </h2>
                                </div>
                                <p className="text-[16px] font-normal leading-[1.7] text-gray-600 mb-5">
                                    We offer structured programs in AI & ML, Data Science, Climate Technology, and Foundation learning for students, professionals, and career switchers through a founder-led, mentor-driven approach.
                                </p>
                                <p className="text-[16px] font-normal leading-[1.7] text-gray-600">
                                    Our philosophy follows <span className="font-bold text-brand-accent">Why first, then How</span>, moving from concept → code → case studies, with small batches and hands-on projects that build skills, confidence, and career readiness.
                                </p>
                            </div>
                            {/* Icon Side */}
                            <div className="md:w-5/12 flex justify-center order-1 md:order-2">
                                <div className="group relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] cursor-pointer">
                                    {/* Decorative Arcs */}
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-t-[#20A6A8] border-l-[#20A6A8] rounded-full rotate-135 group-hover:border-[#20A6A8] group-hover:rotate-0 transition-all duration-700"></div>
                                    <div className="absolute -inset-3 border-[5px] border-transparent border-b-[#20A6A8] rounded-full rotate-45 opacity-30 group-hover:border-[#20A6A8] group-hover:rotate-0 group-hover:opacity-100 transition-all duration-700"></div>
                                    
                                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-gray-100 flex items-center justify-center bg-brand-lightest/20 group-hover:bg-brand-accent/5 transition-colors duration-700">
                                        <FaLightbulb className="text-[50px] md:text-[60px] text-brand-darkest group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
