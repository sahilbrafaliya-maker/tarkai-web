import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaGraduationCap } from "@react-icons/all-files/fa/FaGraduationCap";

export default function HeroVisual() {
  return (
    <div className="relative hidden md:flex w-full h-full min-h-100 sm:min-h-125 lg:min-h-150 xl:min-h-162.5 items-end justify-center lg:justify-end pointer-events-none animate-slide-up z-0">
      
      {/* Primary Visual: Students (White background removed via mix-blend) */}
      <div className="relative z-10 w-[110%] sm:w-full lg:w-[125%] xl:w-[145%] lg:-ml-12 xl:-ml-16 mt-10 lg:mt-0 transition-transform duration-700 ease-out animate-fade-in flex items-end scale-110 lg:scale-[1.15] xl:scale-[1.2] origin-bottom">
         <Image 
            src="/images/hero-students-clean.png" 
            alt="TARK AI Students" 
            width={1200} 
            height={900} 
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto object-contain object-bottom mix-blend-darken"
            priority
            fetchPriority="high"
         />
      </div>

      {/* Grounding Info Box to hide cutoff */}
      <div className="absolute bottom-0 left-[5%] right-[5%] lg:-left-12 lg:-right-6 bg-white/95 backdrop-blur-md border-t-4 border-brand-accent shadow-[0_-5px_40px_rgba(45,165,163,0.15)] rounded-t-3xl rounded-b-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 z-20 pointer-events-auto transition-transform duration-300">
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
             <FaCheckCircle className="text-brand-accent text-lg" />
           </div>
           <span className="text-brand-darkest font-bold text-[13px] sm:text-sm">IIIT Lucknow Alumni Faculty</span>
         </div>
         <div className="hidden sm:block w-px h-10 bg-brand-accent/20"></div>
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
             <FaGraduationCap className="text-brand-accent text-xl" />
           </div>
           <span className="text-brand-darkest font-bold text-[13px] sm:text-sm">Exclusive Placement Support</span>
         </div>
      </div>
      
    </div>
  );
}
