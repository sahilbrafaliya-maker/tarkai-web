'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaVideo } from 'react-icons/fa';

interface ReelItem {
  _id?: string;
  id: number | string;
  name?: string;
  title?: string;
  role?: string;
  platform?: string;
  category?: string;
  poster?: string;
  coverImage?: string;
  video?: string;
  videoUrl?: string;
  tag?: string;
}

function ReelCard({ reel }: { reel: ReelItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative min-w-[270px] max-w-[270px] sm:min-w-[300px] sm:max-w-[300px] rounded-[32px] overflow-hidden bg-brand-dark shadow-2xl transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,115,122,0.3)] hover:-translate-y-2 aspect-[9/16] shrink-0 flex flex-col justify-between"
    >
      <div className="relative w-full h-full bg-black">
        {/* Only Video / Image Preview */}
        {reel.video ? (
          <video
            ref={videoRef}
            src={`${reel.video}#t=0.001`}
            preload="metadata"
            loop
            playsInline
            className="w-full h-full object-cover brightness-75 opacity-85 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : reel.poster ? (
          <Image
            src={reel.poster}
            alt="Life at TarkAI Video"
            fill
            className="object-cover brightness-75 opacity-85 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
            <FaVideo className="text-3xl text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReelsSection() {
  const [videoReels, setVideoReels] = useState<ReelItem[]>([]);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadReels() {
      try {
        const res = await fetch('/api/reels');
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped = data.map((r: ReelItem) => ({
            id: r.id,
            name: r.title || r.name || 'Life at TarkAI',
            role: r.platform || r.category || 'Student Story',
            poster: r.coverImage || r.poster || '/Logo.png',
            video: r.videoUrl || r.video || '',
            tag: r.platform || r.category || 'Reel',
          }));
          setVideoReels(mapped);
        }
      } catch {
        setVideoReels([]);
      }
    }
    loadReels();
  }, []);

  if (videoReels.length === 0) return null;

  const displayReels = videoReels.length > 2 ? [...videoReels, ...videoReels] : videoReels;

  return (
    <section className="py-18 bg-gradient-to-b from-brand-darkest via-[#002b3d] to-brand-darkest text-white relative overflow-hidden" id="life-at-tarkai">
      {/* Decorative Glow Effects */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-brand-accent/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Life at <span className="bg-gradient-to-r from-brand-accent via-teal-300 to-brand-light bg-clip-text text-transparent">TarkAI</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-light/90 max-w-xl mx-auto mt-2 font-normal">
            Watch real video stories, hands-on learning moments, and student reviews from our Surat campus.
          </p>
        </div>

        {/* Continuous Animated Marquee Video Reels Carousel Track */}
        <div className="overflow-hidden relative w-full">
          <div
            ref={scrollTrackRef}
            className="animate-continuous-marquee flex gap-6 py-2 hover:[animation-play-state:paused]"
          >
            {displayReels.map((reel, index) => (
              <ReelCard key={`${reel.id}-${index}`} reel={reel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
