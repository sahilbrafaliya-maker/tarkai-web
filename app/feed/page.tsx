'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaPlay, FaInstagram, FaTimes, FaEye, FaClock,
  FaChevronLeft, FaChevronRight, FaWhatsapp,
} from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';


interface ReelItem {
  _id?: string;
  id: number;
  title: string;
  category: string;
  videoUrl?: string;
  coverImage: string;
  views?: string;
  duration?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}



// Category badge colors cycle through this palette
const BADGE_PALETTE = [
  'bg-teal-50 text-teal-600 border-teal-200',
  'bg-violet-50 text-violet-600 border-violet-200',
  'bg-amber-50 text-amber-600 border-amber-200',
  'bg-emerald-50 text-emerald-600 border-emerald-200',
  'bg-rose-50 text-rose-600 border-rose-200',
  'bg-blue-50 text-blue-600 border-blue-200',
];

function getCategoryBadge(cat: string, allCats: string[]): string {
  const idx = allCats.indexOf(cat);
  return BADGE_PALETTE[idx % BADGE_PALETTE.length];
}

function ReelCard({ reel, onClick }: { reel: ReelItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => {
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
      }}
      onMouseLeave={() => {
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
      }}
      className="group relative min-w-[270px] max-w-[270px] sm:min-w-[300px] sm:max-w-[300px] rounded-[32px] overflow-hidden bg-brand-dark shadow-2xl transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,115,122,0.3)] hover:-translate-y-2 aspect-[9/16] shrink-0 cursor-pointer"
    >
      <div className="relative w-full h-full bg-black">
        {reel.videoUrl ? (
          <video
            ref={videoRef}
            src={`${reel.videoUrl}#t=0.001`}
            preload="metadata"
            loop
            playsInline
            className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : reel.coverImage ? (
          <NextImage
            src={reel.coverImage}
            alt={reel.title || 'Life at TarkAI Video'}
            fill
            className="object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
            <FaPlay className="text-3xl text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Carousel Component ────────────────────────────────────────── */
function ReelCarousel({
  reels,
  onSelect,
}: {
  reels: ReelItem[];
  onSelect: (r: ReelItem) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const CARD_WIDTH = 316; // card + gap

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el.removeEventListener('scroll', checkScroll);
  }, [reels, checkScroll]);

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? CARD_WIDTH * 2 : -CARD_WIDTH * 2, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      {/* Prev arrow */}
      <AnimatePresence>
        {canPrev && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            onClick={() => scroll('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20
              w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md
              flex items-center justify-center text-gray-600
              hover:border-brand-accent/40 hover:text-brand-accent
              transition-colors duration-200 cursor-pointer"
          >
            <FaChevronLeft className="text-xs" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next arrow */}
      <AnimatePresence>
        {canNext && (
          <motion.button
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            onClick={() => scroll('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20
              w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md
              flex items-center justify-center text-gray-600
              hover:border-brand-accent/40 hover:text-brand-accent
              transition-colors duration-200 cursor-pointer"
          >
            <FaChevronRight className="text-xs" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Left fade */}
      {canPrev && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
      )}
      {/* Right fade */}
      {canNext && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto py-4 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {reels.map((reel) => (
          <div key={reel.id} style={{ scrollSnapAlign: 'start' }}>
            <ReelCard reel={reel} onClick={() => onSelect(reel)} />
          </div>
        ))}
      </div>

      {/* Counter */}
      <p className="text-right text-[11px] text-gray-400 font-medium mt-1 pr-1">
        {reels.length} videos
      </p>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────── */
export default function PublicFeedPage() {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Dynamic categories derived from actual data
  const uniqueCategories = Array.from(new Set(reels.map((r) => r.category).filter(Boolean)));
  const allCategories = ['All', ...uniqueCategories];

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/reels');
        const data = await res.json();
        if (Array.isArray(data)) setReels(data);
      } catch { /* ignore */ }
    }
    load();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveReel(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = activeCategory === 'All'
    ? reels
    : reels.filter((r) => r.category === activeCategory);

  // Group by category for "All" view — uses dynamic categories
  const grouped = uniqueCategories.map((cat) => ({
    category: cat,
    items: reels.filter((r) => r.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <p className="text-brand-accent text-[11px] font-extrabold uppercase tracking-widest mb-2">
                TARKAI EdTech · Surat
              </p>
              <h1 className="text-3xl sm:text-4xl font-black text-brand-darkest tracking-tight leading-tight">
                Life at TarkAI
              </h1>

            </div>

            <div className="flex gap-2.5 shrink-0">
              <a
                href="https://www.instagram.com/tarkaiedtech/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold text-xs hover:border-pink-300 hover:text-pink-600 transition-colors duration-200"
              >
                <FaInstagram className="text-pink-500" /> Instagram
              </a>
              <a
                href="https://wa.me/919712358689"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs hover:bg-brand-dark transition-colors duration-200 shadow-sm"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Carousel Content ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        <AnimatePresence mode="wait">
          {activeCategory === 'All' ? (
            /* Grouped by category */
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {grouped.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.08 }}
                >
                  {/* Section label */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-black text-brand-darkest">{group.category}</h2>
                      <span className="text-xs text-gray-400 font-semibold">{group.items.length} videos</span>
                    </div>
                  </div>

                  <ReelCarousel reels={group.items} onSelect={setActiveReel} />

                  {gi < grouped.length - 1 && (
                    <div className="mt-12 h-px bg-gray-100" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Single category carousel */
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg font-black text-brand-darkest">{activeCategory}</h2>
                <span className="text-xs text-gray-400 font-semibold">{filtered.length} videos</span>
              </div>

              {filtered.length > 0 ? (
                <ReelCarousel reels={filtered} onSelect={setActiveReel} />
              ) : (
                <div className="flex flex-col items-center py-24 text-center space-y-2">
                  <p className="text-gray-400 font-semibold text-sm">No videos in this category yet.</p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="text-brand-accent text-sm font-bold hover:underline cursor-pointer"
                  >
                    View all →
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>


      </div>

      {/* ── Video Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReel(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[320px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close */}
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm
                  text-gray-500 flex items-center justify-center
                  hover:bg-red-50 hover:text-red-500 hover:border-red-200
                  transition-colors duration-200 cursor-pointer"
              >
                <FaTimes className="text-xs" />
              </button>

              {/* Media */}
              <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden">
                {activeReel.videoUrl ? (
                  <video
                    key={activeReel._id || activeReel.id}
                    ref={(el) => {
                      if (el) {
                        el.muted = false;
                        el.volume = 1.0;
                        el.play().catch(() => {});
                      }
                    }}
                    src={activeReel.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <NextImage
                    src={activeReel.coverImage}
                    alt={activeReel.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Info panel */}
              <div className="p-4 space-y-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block bg-teal-50 text-teal-700 border-teal-200">
                  {activeReel.category}
                </span>
                <h3 className="text-sm font-bold text-brand-darkest leading-snug">
                  {activeReel.title}
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                  {activeReel.views && (
                    <span className="flex items-center gap-1">
                      <FaEye className="text-[10px]" /> {activeReel.views}
                    </span>
                  )}
                  {activeReel.duration && (
                    <span className="flex items-center gap-1">
                      <FaClock className="text-[10px]" /> {activeReel.duration}
                    </span>
                  )}
                </div>

                {(activeReel.instagramUrl || activeReel.youtubeUrl) && (
                  <div className="flex gap-2 pt-1 border-t border-gray-100">
                    {activeReel.instagramUrl && (
                      <a href={activeReel.instagramUrl} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-90 transition-opacity"
                      >
                        <FaInstagram /> Instagram
                      </a>
                    )}
                    {activeReel.youtubeUrl && (
                      <a href={activeReel.youtubeUrl} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-500 text-white font-bold text-xs hover:opacity-90 transition-opacity"
                      >
                        <FaYoutube /> YouTube
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
