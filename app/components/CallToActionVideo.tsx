import React from "react";
import Link from "next/link";

export default function CallToActionVideo() {
  return (
    <section className="relative w-full h-[60vh] min-h-100 flex items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black/20">
        <video 
          src="/video/video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Blue-ish Overlay matching the reference image */}
        <div className="absolute inset-0 bg-[#1e293b]/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-brand-darkest/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.15] tracking-[-0.02em] text-white mb-6 max-w-4xl mx-auto">
          Driving Education <span className="text-[#20A6A8]">Through Innovation</span>
        </h1>
        
        {/* Description */}
        <p className="text-[15px] sm:text-[16px] lg:text-[18px] font-normal leading-[1.65] text-white/90 max-w-4xl mx-auto">
          Founded in 2026 and headquartered in Surat, Gujarat, TarkAI EdTech Private Limited is India's leading AI-powered career guidance platform, built on the belief that learning should go beyond certificates and create meaningful impact.
        </p>
      </div>
      
    </section>
  );
}
