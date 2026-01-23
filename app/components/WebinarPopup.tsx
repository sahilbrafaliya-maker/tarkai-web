"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";

export default function WebinarPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const popupRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if user has already seen the popup in this session
        const hasSeen = sessionStorage.getItem("tarkai_webinar_seen");
        if (!hasSeen) {
            // Small delay to ensure client-side hydration doesn't conflict
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Countdown Logic -> Jan 25, 2026 2:00 PM IST
    useEffect(() => {
        if (!isVisible) return;

        const targetDate = new Date("2026-01-25T14:00:00+05:30").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible]);

    // Animation
    useGSAP(() => {
        if (isVisible && popupRef.current && backdropRef.current) {
            gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            gsap.fromTo(
                popupRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [isVisible]);

    const handleClose = () => {
        if (popupRef.current && backdropRef.current) {
            gsap.to(popupRef.current, { scale: 0.8, opacity: 0, duration: 0.3 });
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    setIsVisible(false);
                    sessionStorage.setItem("tarkai_webinar_seen", "true");
                },
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 opacity-0"
            onClick={handleClose}
        >
            <div
                ref={popupRef}
                className="relative w-auto max-w-[90vw] bg-white rounded-2xl overflow-hidden shadow-2xl opacity-0 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                >
                    <FaTimes />
                </button>

                <div className="relative max-h-[85vh] w-auto overflow-hidden group">
                    {/* Using img tag to respect natural aspect ratio without complex sizing logic */}
                    <img
                        src="/Webinar.jpeg"
                        alt="Exclusive Webinar"
                        className="object-contain max-h-[85vh] w-auto max-w-full"
                    />

                    {/* Hover Overlay with Countdown & Registration */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-6 text-center">

                        <h3 className="text-2xl font-bold mb-2">Webinar Starts In</h3>

                        {/* Timer */}
                        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="flex flex-col items-center">
                                    <span className="text-3xl sm:text-4xl font-mono font-bold bg-white/10 backdrop-blur-md rounded-lg p-3 min-w-[70px] border border-white/20 shadow-lg">
                                        {String(value).padStart(2, '0')}
                                    </span>
                                    <span className="text-xs text-brand-accent mt-2 uppercase tracking-wide font-bold">{unit}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSd0oBPmDJT9sUlPibyOG2LEGBSCsaNUpon7dCjCTEZtCJUYgw/viewform?usp=send_form"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-accent text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-brand-accent/90 hover:scale-105 transition-all duration-300"
                        >
                            Register Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
