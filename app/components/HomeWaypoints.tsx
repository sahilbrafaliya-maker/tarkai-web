import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FiSearch, FiGrid, FiCode, FiZap } from "react-icons/fi";
import GeometricShapes from "./GeometricShapes";

export default function HomeWaypoints() {
    const steps = [
        {
            icon: FiSearch,
            title: "Discover",
            desc: "We audit your current skills, goals, and industry demands to identify exactly which AI career path will create the most measurable impact for your future."
        },
        {
            icon: FiGrid,
            title: "Learn",
            desc: "Our expert instructors design the right approach—hands-on coding, cloud tools, or AI integration—based on real-world projects and your actual learning constraints."
        },
        {
            icon: FiCode,
            title: "Connect",
            desc: "We build your network by pairing you with industry experts and simulating real workflows, ensuring you collaborate and build alongside the leaders of tomorrow."
        },
        {
            icon: FiZap,
            title: "Launch",
            desc: "We deploy your talent directly into the industry with resume optimization, mock interviews, and strategic placement assistance to accelerate your career."
        },
    ];

    return (
                <section className="py-20 lg:py-28 bg-[#EAF7F7] relative overflow-hidden" id="journey">
            <GeometricShapes variant="your-journey" />
       
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-5xl mx-auto mb-16 gsap-fade-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                        <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal">
                            Your Journey
                        </div>
                        <div className="w-8 h-px bg-[#20A6A8]/40"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-6">
                        Your Journey with <span className="text-[#20A6A8]">TarkAI</span>
                    </h2>
                    <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-3xl mx-auto">
                        A clear path from curiosity to mastery. Discover how our structured curriculum takes you from fundamentals to advanced AI applications.
                    </p>
                </div>
            </div>

            {/* Zigzag Timeline Layout */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12">
                <div className="flex flex-col gap-6 lg:gap-8 relative">

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={`relative z-10 w-full lg:w-[60%] flex ${isEven ? 'self-start gsap-fade-right' : 'self-end gsap-fade-left'}`}>

                                {/* SVG Connector for Left side cards (01, 03) */}
                                {isEven && index < steps.length - 1 && (
                                    <svg className="absolute hidden lg:block pointer-events-none -z-10 opacity-30" style={{ left: '100%', top: '50%', width: '160px', height: '140px' }} viewBox="0 0 160 140" fill="none">
                                        <path d="M -10,0 L 130,0 Q 150,0 150,20 L 150,130" stroke="#20A6A8" strokeWidth="2" strokeDasharray="4 4" />
                                        <path d="M 145,125 L 150,130 L 155,125" stroke="#20A6A8" strokeWidth="2" fill="none" />
                                    </svg>
                                )}

                                {/* SVG Connector for Right side cards (02) */}
                                {!isEven && index < steps.length - 1 && (
                                    <svg className="absolute hidden lg:block pointer-events-none -z-10 opacity-30" style={{ right: '100%', top: '50%', width: '160px', height: '140px' }} viewBox="0 0 160 140" fill="none">
                                        <path d="M 170,0 L 30,0 Q 10,0 10,20 L 10,130" stroke="#20A6A8" strokeWidth="2" strokeDasharray="4 4" />
                                        <path d="M 5,125 L 10,130 L 15,125" stroke="#20A6A8" strokeWidth="2" fill="none" />
                                    </svg>
                                )}

                                {/* Card */}
                                <div className="bg-[#20A6A8]/10 w-full rounded-3xl p-5 lg:p-6 flex flex-row items-center gap-4 sm:gap-5 shadow-sm border border-[#20A6A8]/10 transition-colors duration-500">

                                    {/* Left Vertical Pill */}
                                    <div className="w-10 lg:w-11 min-h-24 lg:min-h-28 rounded-full bg-[#20A6A8] flex items-center justify-center shrink-0 shadow-inner">
                                        <span className="-rotate-90 text-white font-mono font-bold text-[11px] lg:text-[12px] tracking-[0.2em] whitespace-nowrap">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    {/* Right Content */}
                                    <div className="flex flex-col flex-1 py-1">
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className="text-[#20A6A8]">
                                                <Icon size={18} strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-lg lg:text-[18px] font-bold text-[#0F1C1E]">
                                                {step.title}
                                            </h3>
                                        </div>

                                        <p className="text-[#4A5568] text-[13px] sm:text-[14px] leading-[1.6]">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
