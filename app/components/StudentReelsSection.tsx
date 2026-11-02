"use client";

import { useState, useRef, useEffect } from "react";
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
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isTouchingRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only run mobile auto-scroll when section is in viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          setPlayingKey(null);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // On load on mobile, start from set 1 to enable infinite swiping in both directions
  useEffect(() => {
    if (!scrollRef.current || !isMobile) return;
    const setInitialPos = () => {
      if (scrollRef.current) {
        const oneSet = scrollRef.current.scrollWidth / 4;
        if (oneSet > 0 && scrollRef.current.scrollLeft === 0) {
          scrollRef.current.scrollLeft = oneSet;
        }
      }
    };
    setInitialPos();
    const timer = setTimeout(setInitialPos, 300);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Continuous auto-scroll on mobile when not interacting
  useEffect(() => {
    if (!isMobile) return;
    let animationFrameId: number;
    let lastTime = performance.now();
    let cachedOneSet = 0;

    const updateMetrics = () => {
      if (scrollRef.current) {
        cachedOneSet = scrollRef.current.scrollWidth / 4;
      }
    };
    updateMetrics();
    window.addEventListener('resize', updateMetrics);

    const playScroll = (time: number) => {
      if (isVisibleRef.current && !isTouchingRef.current && !isHoveredRef.current && playingKey === null && scrollRef.current) {
        if (time - lastTime >= 16) {
          if (!cachedOneSet) updateMetrics();
          const el = scrollRef.current;
          if (cachedOneSet > 0) {
            if (el.scrollLeft >= cachedOneSet * 2) {
              el.scrollLeft -= cachedOneSet;
            } else {
              el.scrollLeft += 1;
            }
          }
          lastTime = time;
        }
      }
      animationFrameId = requestAnimationFrame(playScroll);
    };

    animationFrameId = requestAnimationFrame(playScroll);
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateMetrics);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isMobile, playingKey]);

  const handleTouchStart = () => {
    isTouchingRef.current = true;
    isHoveredRef.current = true;
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = 'x mandatory';
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isTouchingRef.current) {
        if (scrollRef.current) {
          scrollRef.current.style.scrollSnapType = 'none';
        }
        isHoveredRef.current = false;
      }
    }, 2000);
  };

  const handleScroll = () => {
    if (!scrollRef.current || !isMobile) return;
    const el = scrollRef.current;
    const oneSet = el.scrollWidth / 4;
    if (oneSet > 0) {
      // Seamless infinite wrapping on user manual swipes
      if (el.scrollLeft >= oneSet * 3) {
        el.scrollLeft -= oneSet;
      } else if (el.scrollLeft <= 50) {
        el.scrollLeft += oneSet;
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-10 sm:py-16 lg:py-28 bg-[#EAF7F7] relative overflow-hidden">
      <GeometricShapes variant="student-journeys" />
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-[#20A6A8]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-white/40 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching TARK AI Theme */}
        <div className="text-center max-w-5xl mx-auto mb-6 sm:mb-12 lg:mb-16 gsap-fade-up">
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
            <div className="w-8 h-px bg-[#20A6A8]/40"></div>
            <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-sm font-medium">
              Student Journeys
            </div>
            <div className="w-8 h-px bg-[#20A6A8]/40"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-3 sm:mb-6">
            Stories of Growth and <span className="text-[#20A6A8]">Career Transformation</span>
          </h2>
          <p className="text-[14.5px] sm:text-[16px] font-normal leading-[1.6] sm:leading-[1.65] text-slate-500 max-w-3xl mx-auto">
            Discover how learners from different backgrounds are building practical AI skills, gaining confidence, and moving closer to their career goals through their journey with TarkAI.
          </p>
        </div>

        {/* Reels Container: Right-to-Left Scrolling Marquee on Desktop, Smooth Touch Scroll on Mobile */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative w-full max-w-full overflow-x-auto overflow-y-hidden md:overflow-hidden mt-4 sm:mt-10 pt-2 sm:pt-4 pb-8 sm:pb-8 lg:pb-12 touch-auto overscroll-x-contain sm:overscroll-x-auto custom-scrollbar-hide [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseEnter={() => { if (!isMobile) isHoveredRef.current = true; }}
          onMouseLeave={() => { if (!isMobile) isHoveredRef.current = false; }}
        >
          {/* Fade edges only on desktop to prevent mobile edge white artifacts */}
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-8 sm:w-24 bg-linear-to-r from-[#EAF7F7] to-transparent z-20 pointer-events-none" />
          <div className="hidden md:block absolute top-0 bottom-0 right-0 w-8 sm:w-24 bg-linear-to-l from-[#EAF7F7] to-transparent z-20 pointer-events-none" />
          
          <div
            className="flex items-center w-max md:animate-[scroll-marquee-reverse_20s_linear_infinite] hover:[animation-play-state:paused]"
            style={{
              animationPlayState: playingKey !== null ? 'paused' : undefined
            }}
          >
            {[0, 1, 2, 3].map((setIndex) => (
              <div key={setIndex} className="flex items-center gap-4 sm:gap-8 lg:gap-12 px-3 sm:px-4 lg:px-6">
                {reels.map((reel) => {
                  const cardKey = `${setIndex}-${reel.id}`;
                  const isCurrentPlaying = playingKey === cardKey;

                  return (
                    <div 
                      key={cardKey} 
                      className="relative group cursor-pointer shrink-0 w-56 sm:w-72 lg:w-85 pb-6 sm:pb-0 snap-start sm:snap-align-none transform-[translateZ(0)]" 
                      onClick={() => {
                        if (isCurrentPlaying) {
                          setPlayingKey(null);
                        } else {
                          // Pause any other video in the document
                          if (typeof document !== 'undefined') {
                            document.querySelectorAll('video').forEach((v) => {
                              try { v.pause(); } catch (_) {}
                            });
                          }
                          setPlayingKey(cardKey);
                        }
                      }}
                    >
                      <div 
                        className="relative aspect-9/16 bg-black rounded-4xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(45,165,163,0.2)] border border-[#E2E8F0] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(45,165,163,0.3)]"
                      >
                        {isCurrentPlaying ? (
                          <video 
                            src={reel.videoUrl} 
                            autoPlay 
                            playsInline
                            onEnded={() => setPlayingKey(null)}
                            className="w-full h-full object-cover"
                            onClick={(e) => {
                              e.stopPropagation();
                              const videoElement = e.target as HTMLVideoElement;
                              if (videoElement.paused) {
                                videoElement.play();
                              } else {
                                videoElement.pause();
                                setPlayingKey(null);
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

                      {!isCurrentPlaying && (
                        <div className="absolute bottom-1 sm:-bottom-5 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 z-10">
                          <div className="bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-md border border-[#E2E8F0] text-[#0D1C2E] font-bold text-sm sm:text-[15px] tracking-wide">
                            {reel.name}
                          </div>
                          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#20A6A8] border-3 sm:border-4 border-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 shrink-0">
                            <FaPlay className="text-white ml-0.5 sm:ml-1 text-[13px] sm:text-[16px]" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
