'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaGraduationCap } from 'react-icons/fa';

interface MentorItem {
  _id?: string;
  id?: number | string;
  name: string;
  role?: string;
  educationBadge?: string;
  image?: string;
  avatar?: string;
  companyLogo?: string;
}

export default function MentorsSection() {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadMentors() {
      try {
        const res = await fetch('/api/mentors');
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped: MentorItem[] = data.map((m: MentorItem, idx: number) => ({
            id: m.id || m._id || idx,
            name: m.name,
            role: m.role,
            educationBadge: m.educationBadge,
            image: m.avatar || m.image || '/Logo.png',
            companyLogo: m.companyLogo || '/Logo.png',
          }));
          setMentors(mapped);
        }
      } catch {
        setMentors([]);
      }
    }
    loadMentors();
  }, []);

  if (mentors.length === 0) return null;

  // Duplicate items for continuous smooth marquee loop
  const displayMentors = mentors.length > 2 ? [...mentors, ...mentors, ...mentors] : [...mentors, ...mentors, ...mentors, ...mentors];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#001c29] via-[#002738] to-[#001724] text-white relative overflow-hidden" id="mentors">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-brand-accent/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-light text-xs font-extrabold uppercase tracking-widest mb-3 border border-white/20 backdrop-blur-md shadow-md">
            <FaGraduationCap className="text-sm text-brand-accent" />
            <span>Academic &amp; Industry Leaders</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Meet your <span className="bg-gradient-to-r from-brand-accent via-teal-300 to-emerald-300 bg-clip-text text-transparent">mentors</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-light/90 max-w-xl mx-auto mt-2.5 font-normal leading-relaxed">
            Master AI &amp; Data Science with hands-on 1-on-1 guidance from industry leaders.
          </p>
        </div>

        {/* Continuous Animated Marquee Mentor Cards Carousel Track */}
        <div className="overflow-hidden relative w-full py-3">
          <div
            ref={scrollTrackRef}
            className="animate-continuous-marquee flex gap-6 hover:[animation-play-state:paused]"
          >
            {displayMentors.map((mentor, index) => (
              <div
                key={`${mentor.id}-${index}`}
                className="group relative w-[260px] sm:w-[280px] shrink-0 rounded-[28px] bg-white text-brand-darkest p-5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(45,165,163,0.35)] transition-all duration-400 hover:-translate-y-2 border border-gray-100 hover:border-brand-accent/60 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  {/* Round Shape Profile Photo */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-4 bg-brand-lightest shadow-md border-4 border-brand-accent/20 group-hover:border-brand-accent transition-all duration-500">
                    <Image
                      src={mentor.image || '/sahil_rafaliya.jpeg'}
                      alt={mentor.name}
                      fill
                      sizes="(max-width: 640px) 128px, 144px"
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Mentor Name */}
                  <h3 className="text-lg sm:text-xl font-black text-brand-darkest group-hover:text-brand-accent transition-colors leading-tight text-center truncate w-full">
                    {mentor.name}
                  </h3>
                </div>

                {/* Organization Logo Footer */}
                <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-center">
                  <Image
                    src={mentor.companyLogo || '/Logo.png'}
                    alt="TarkAI Logo"
                    width={100}
                    height={32}
                    className="h-7 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
