'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaCheckCircle, FaQuoteLeft, FaShieldAlt } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface ReviewItem {
  _id?: string;
  id: number;
  author: string;
  role?: string;
  avatar?: string;
  rating: number;
  reviewText: string;
  isVerified?: boolean;
}

export default function GoogleReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<{ averageRating: string; totalReviews: string }>({
    averageRating: '4.9',
    totalReviews: '226',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [reviewsRes, settingsRes] = await Promise.all([
          fetch('/api/reviews'),
          fetch('/api/settings'),
        ]);

        if (reviewsRes.ok) {
          const data = await reviewsRes.json();
          if (Array.isArray(data)) setReviews(data);
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setStats({
            averageRating: settingsData.averageRating || '4.9',
            totalReviews: settingsData.totalReviews || '226',
          });
        }
      } catch {
        // fallback
      }
    }
    loadData();
  }, []);

  if (reviews.length === 0) return null;

  // Duplicate for infinite continuous smooth marquee loop
  const marqueeReviews = reviews.length > 2 ? [...reviews, ...reviews, ...reviews] : reviews;

  return (
    <section
      className="py-10 sm:py-14 relative overflow-hidden"
      id="google-reviews"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-darkest tracking-tight leading-tight">
          What Our{' '}
          <span className="bg-gradient-to-r from-brand-accent via-teal-600 to-brand-dark bg-clip-text text-transparent">
            Community
          </span>{' '}
          Says
        </h2>
        <p className="text-gray-600 text-sm sm:text-base font-normal max-w-2xl mx-auto mt-2 sm:mt-3 leading-relaxed">
          Real verified Google reviews from students and parents transformed by TarkAI EdTech learning tracks.
        </p>
      </div>

      {/* Main Container: Fixed Google Stats Card + Smooth Marquee */}
      <div className="w-full max-w-[1536px] mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4">

          {/* FIXED NON-SCROLLING 1ST CARD (Exact same size: w-[280px] sm:w-[290px], h-[280px] sm:h-[290px]) */}
          <div className="w-[280px] sm:w-[290px] h-[280px] sm:h-[290px] shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-[#001724] via-[#002433] to-[#001724] text-white rounded-[28px] p-5 border border-white/10 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:border-brand-accent/40 transition-all duration-300">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                  <FcGoogle className="text-sm shrink-0" />
                  <span className="text-[11px] font-black tracking-wide text-white">Google Rating</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <FaCheckCircle className="text-xs" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Score & Stars & Count */}
              <div className="py-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                    {stats.averageRating}
                  </span>
                  <span className="text-xs font-extrabold text-brand-light/70">/ 5.0</span>
                </div>

                <div className="flex text-amber-400 text-sm gap-0.5 my-1.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-brand-light text-[10px] font-extrabold border border-white/10">
                  <span>{stats.totalReviews}+ Google Reviews</span>
                </div>
              </div>

              {/* Micro trust highlights */}
              <div className="border-t border-white/10 pt-2 space-y-1 text-[11px] text-brand-light/85 font-medium">
                <div className="flex items-center gap-1.5 truncate">
                  <FaShieldAlt className="text-brand-accent text-xs shrink-0" />
                  <span className="truncate">100% Genuine Student Reviews</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <FaCheckCircle className="text-teal-300 text-xs shrink-0" />
                  <span className="truncate">Surat&apos;s Highest Rated AI Institute</span>
                </div>
              </div>

              {/* Write a Google Review CTA Button */}
              <div className="pt-2 border-t border-white/10">
                <a
                  href="https://g.page/r/CTJVKuGqIzwxEAI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-brand-darkest font-black text-xs transition-all duration-300 shadow-md shadow-amber-400/20 flex items-center justify-center gap-1.5 group-hover:scale-[1.02] cursor-pointer"
                >
                  <FcGoogle className="text-base bg-white rounded-full p-0.5 shrink-0" />
                  <span>Write a Google Review</span>
                </a>
              </div>
            </div>
          </div>

          {/* SCROLLING MARQUEE ROW FOR STUDENT REVIEWS (Exact same size: w-[280px] sm:w-[290px], h-[280px] sm:h-[290px]) */}
          <div className="relative flex-1 overflow-hidden min-w-0">
            {/* Continuous Marquee Track */}
            <div className="flex gap-3 sm:gap-4 animate-continuous-marquee hover:[animation-play-state:paused] py-1">
              {marqueeReviews.map((review, idx) => (
                <div
                  key={`${review.id || review._id || idx}-${idx}`}
                  className="w-[280px] sm:w-[290px] h-[280px] sm:h-[290px] shrink-0 bg-white rounded-[28px] p-5 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative group cursor-pointer"
                >
                  <div>
                    {/* Top Row: Stars + Google Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <FcGoogle className="text-base opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Quotation Watermark & Text */}
                    <div className="relative my-1">
                      <FaQuoteLeft className="text-brand-accent/20 text-lg mb-1 -ml-0.5 group-hover:text-brand-accent/40 transition-colors" />
                      <p className="text-xs sm:text-[13px] font-medium text-gray-700 leading-relaxed line-clamp-4 group-hover:text-gray-900 transition-colors">
                        &ldquo;{review.reviewText}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Author / Student Footer */}
                  <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-accent via-teal-400 to-brand-light text-white font-black flex items-center justify-center shrink-0 text-xs overflow-hidden">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        review.author?.charAt(0)?.toUpperCase() || 'T'
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-black text-brand-darkest text-xs sm:text-sm leading-tight truncate group-hover:text-brand-accent transition-colors">
                        {review.author}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 mt-0.5">
                        <FaCheckCircle className="text-emerald-500 text-[10px] shrink-0" />
                        <span className="truncate">{review.role || 'Student'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
