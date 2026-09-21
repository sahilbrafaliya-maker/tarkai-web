"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import GeometricShapes from "./GeometricShapes";

interface ReelData {
  id: number;
  name: string;
  thumbnail: string;
  videoUrl: string;
}

export default function StudentReelsSection() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "dqogtelop";

  const reels: ReelData[] = [
    {
      id: 1,
      name: "Denisha",
      thumbnail: `https://res.cloudinary.com/${cloudinaryName}/image/upload/v1789988596/tarkai_reels/Denisha.jpg`,
      videoUrl: `https://res.cloudinary.com/${cloudinaryName}/video/upload/v1789988593/tarkai_reels/Denisha-final.mp4`,
    },
    {
      id: 2,
      name: "Garvi",
      thumbnail: `https://res.cloudinary.com/${cloudinaryName}/image/upload/v1789988610/tarkai_reels/Garvi.jpg`,
      videoUrl: `https://res.cloudinary.com/${cloudinaryName}/video/upload/v1789988607/tarkai_reels/Garvi-final.mp4`,
    },
    {
      id: 3,
      name: "Riya",
      thumbnail: `https://res.cloudinary.com/${cloudinaryName}/image/upload/v1789988683/tarkai_reels/Riya.jpg`,
      videoUrl: `https://res.cloudinary.com/${cloudinaryName}/video/upload/v1789988620/tarkai_reels/Riya.mp4`,
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#EAF7F7] relative overflow-hidden">
      <GeometricShapes variant="student-journeys" />
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-[#20A6A8]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-white/40 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching TARK AI Theme */}
        <div className="text-center max-w-5xl mx-auto mb-16 gsap-fade-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#20A6A8]/40"></div>
            <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-sm font-medium">
              Student Journeys
            </div>
            <div className="w-8 h-px bg-[#20A6A8]/40"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-6">
            Stories of Growth and <span className="text-[#20A6A8]">Career Transformation</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] text-slate-500 max-w-3xl mx-auto">
            Discover how learners from different backgrounds are building practical AI skills, gaining confidence, and moving closer to their career goals through their journey with TARK AI.
          </p>
        </div>

        {/* Reels Container: Right-to-Left Scrolling Marquee */}
        <div className="relative w-full overflow-hidden mt-10 py-4">
          <div
            className="flex items-center w-max"
            style={{
              animation: 'scroll-marquee-reverse 20s linear infinite',
              animationPlayState: isHovered || playingId !== null ? 'paused' : 'running'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 sm:gap-8 lg:gap-12 px-3 sm:px-4 lg:px-6">
                {reels.map((reel) => (
                  <div key={`${setIndex}-${reel.id}`} className="relative group cursor-pointer shrink-0 w-65 sm:w-72 lg:w-85" onClick={() => setPlayingId(reel.id)}>
                    <div 
                      className="relative aspect-9/16 bg-black rounded-4xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(45,165,163,0.2)] border border-[#E2E8F0] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(45,165,163,0.3)]"
                    >
                      {playingId === reel.id ? (
                        <video 
                          src={reel.videoUrl} 
                          autoPlay 
                          playsInline
                          loop
                          className="w-full h-full object-cover"
                          onClick={(e) => {
                            e.stopPropagation();
                            const videoElement = e.target as HTMLVideoElement;
                            if (videoElement.paused) {
                              videoElement.play();
                            } else {
                              videoElement.pause();
                              setPlayingId(null);
                            }
                          }}
                        />
                      ) : (
                        <>
                          <Image 
                            src={reel.thumbnail} 
                            alt={`${reel.name}'s Journey`} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </>
                      )}
                    </div>

                    {playingId !== reel.id && (
                      <div className="absolute -bottom-5 left-4 right-4 flex items-center justify-between pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 z-10">
                        <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-md border border-[#E2E8F0] text-[#0D1C2E] font-bold text-[15px] tracking-wide">
                          {reel.name}
                        </div>
                        <div className="w-13 h-13 rounded-full bg-[#20A6A8] border-4 border-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <FaPlay className="text-white ml-1 text-[16px]" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
        }
        `
      }} />
    </section>
  );
}
