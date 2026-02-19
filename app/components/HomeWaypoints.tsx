"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GeometricShapes from "./GeometricShapes";
import { FaGraduationCap, FaNetworkWired, FaRocket, FaUsers } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);


export default function HomeWaypoints() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-300vw",
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top",
                    scrub: 0.6,
                    pin: true,
                },
            }
        );

        return () => {
            pin.kill();
        };
    }, { scope: triggerRef });

    const steps = [
        {
            icon: <FaNetworkWired />,
            title: "Discover",
            desc: "Explore AI-driven career paths tailored to your potential.",
            color: "bg-blue-500"
        },
        {
            icon: <FaGraduationCap />,
            title: "Learn",
            desc: "Master skills with our intelligent, adaptive curriculum.",
            color: "bg-purple-500"
        },
        {
            icon: <FaUsers />,
            title: "Connect",
            desc: "Join a community of builders and future leaders.",
            color: "bg-emerald-500"
        },
        {
            icon: <FaRocket />,
            title: "Launch",
            desc: "Deploy your skills and accelerate your career.",
            color: "bg-orange-500"
        },
    ];

    return (
        <section className="overflow-hidden relative">
            <GeometricShapes />
            <div ref={triggerRef}>
                <div className="absolute top-28 left-0 w-full text-center z-20 pointer-events-none">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-darkest mb-4">
                        Your Journey with TarkAI
                    </h2>
                    <p className="text-lg text-brand-dark max-w-2xl mx-auto px-4">
                        A clear path from curiosity to mastery.
                    </p>
                </div>
                <div
                    ref={sectionRef}
                    className="h-screen w-[400vw] pt-30 pb-10 flex flex-row relative"
                >
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="w-screen h-full flex flex-col justify-center items-center relative p-4 pt-20 md:pt-32"
                        >
                            {/* Background Number */}
                            <div className={`absolute top-1/2 -translate-y-1/2 text-[8rem] md:text-[15rem] font-bold text-black/5 select-none z-0 ${index % 2 === 0 ? 'left-[20%]' : 'right-[20%]'} -translate-x-1/2`}>
                                0{index + 1}
                            </div>

                            <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                                {/* Text Content */}
                                <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2 text-right'}`}>
                                    <span className="text-xl font-bold text-brand-accent tracking-widest uppercase mb-4 block">Step 0{index + 1}</span>
                                    <h2 className="text-3xl md:text-5xl font-extrabold text-brand-darkest mb-4 leading-tight">
                                        {step.title}
                                    </h2>
                                    <p className="text-xl md:text-2xl text-brand-dark leading-relaxed max-w-xl">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Visual Content (Card) */}
                                <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1 flex justify-end'}`}>
                                    <div className={`w-full max-w-xs mx-auto md:max-w-none md:mx-0 aspect-square md:w-72 md:h-72 ${step.color} rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-500`}>
                                        <div className="text-white text-6xl md:text-8xl">
                                            {step.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
