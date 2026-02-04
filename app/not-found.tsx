"use client";

import Link from "next/link";
import GeometricShapes from "./components/GeometricShapes";

export default function NotFound() {
    return (
        <div className="relative min-h-screen bg-brand-darkest text-white flex flex-col items-center justify-center overflow-hidden px-4">
            {/* Background Decorations */}
            <GeometricShapes hideBigHexagon={false} hideTriangle={false} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-light/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Large 404 */}
                <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-brand-light/10 to-transparent select-none">
                    404
                </h1>

                {/* Message */}
                <div className="mt-[-40px] md:mt-[-60px]">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-6">
                        Page Not Found
                    </h2>
                    <p className="text-lg md:text-xl text-brand-light/60 mb-10 max-w-lg mx-auto leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    {/* Action Button */}
                    <Link
                        href="/"
                        className="inline-block px-10 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-white hover:text-brand-darkest transition-all duration-300 hover:scale-105 shadow-lg border border-transparent hover:border-brand-accent"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
