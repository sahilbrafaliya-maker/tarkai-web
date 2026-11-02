"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import dynamic from "next/dynamic";

const GeometricShapes = dynamic(() => import("./GeometricShapes"));

interface BlogPost {
    id: number;
    slug?: string;
    title: string;
    tag: string;
    category?: string;
    date: string;
    coverImage?: string;
    image?: string;
    description: string;
    color?: string;
}

interface HomeBlogSectionProps {
    latestBlogs?: BlogPost[];
}

export default function HomeBlogSection({ latestBlogs }: HomeBlogSectionProps) {
    const isHoveredRef = useRef(false);
    const isVisibleRef = useRef(true);
    const sectionRef = useRef<HTMLElement>(null);
    const [fetchedBlogs, setFetchedBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(!latestBlogs || latestBlogs.length === 0);
    const [isMobile, setIsMobile] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isTouchingRef = useRef(false);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
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
            },
            { threshold: 0.05 }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // On load on mobile, start from middle to enable swiping both directions
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
            if (isVisibleRef.current && !isTouchingRef.current && !isHoveredRef.current && scrollRef.current) {
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
    }, [isMobile]);

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
            if (el.scrollLeft >= oneSet * 3) {
                el.scrollLeft -= oneSet;
            } else if (el.scrollLeft <= 50) {
                el.scrollLeft += oneSet;
            }
        }
    };

    useEffect(() => {
        if (!latestBlogs || latestBlogs.length === 0) {
            fetch('/api/blogs')
                .then(res => res.json())
                .then(data => {
                    const sorted = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
                    setFetchedBlogs(sorted);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [latestBlogs]);

    const displayBlogs = (latestBlogs && latestBlogs.length > 0) ? latestBlogs : fetchedBlogs;

    if (!loading && displayBlogs.length === 0) return null;

    const featuredPost = displayBlogs[0];
    const scrollBlogs = displayBlogs.slice(1);

    return (
        <section ref={sectionRef} className="pt-8 pb-10 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28 bg-[#EAF7F7] relative z-20 overflow-hidden">
            <GeometricShapes />
            <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                
                {/* Header Container */}
                <div className="relative mb-6 sm:mb-12 lg:mb-16 max-w-full mx-auto flex flex-col items-center">
                    
                    {/* Centered Content */}
                    <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                        <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                            <div className="w-12 h-px bg-[#20A6A8]/40"></div>
                            <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal tracking-wide">
                                Latest Updates
                            </div>
                            <div className="w-12 h-px bg-[#20A6A8]/40"></div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-[#0F1C1E] mb-3 sm:mb-6">
                            Discover Latest <span className="text-[#20A6A8]">Insights & News</span>
                        </h2>
                        
                        <p className="text-[15px] sm:text-[16px] lg:text-[17px] font-normal leading-relaxed text-slate-500 max-w-3xl mx-auto px-4">
                            Stay up-to-date with the latest trends, expert insights, and success stories. Learn about industry shifts, technical tutorials, and career advice to accelerate your learning journey and stay ahead in the AI revolution.
                        </p>
                    </div>

                    {/* Right-aligned Link (Desktop) */}
                    <div className="hidden lg:flex absolute right-0 bottom-2 items-center">
                        <Link href="/blog" className="text-[#20A6A8] hover:text-[#188082] text-[15px] font-semibold transition-colors duration-300 group flex items-center gap-1.5">
                            View all articles 
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right-aligned Link (Mobile/Tablet fallback - placed below text) */}
                    <div className="lg:hidden mt-3 sm:mt-6 flex justify-end w-full px-4">
                        <Link href="/blog" className="text-[#20A6A8] hover:text-[#188082] text-sm font-semibold transition-colors duration-300 group flex items-center gap-1.5">
                            View all articles 
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 w-full items-stretch">
                    
                    {/* Left Column (Featured Blog) */}
                    <div className="lg:w-1/3 flex flex-col justify-start z-30">
                        {featuredPost && (
                            <Link href={`/blog/${featuredPost.slug || featuredPost.id}`} className="block h-92 sm:h-115 w-full group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-white/50">
                                {/* Background Image */}
                                <Image
                                    src={featuredPost.coverImage || featuredPost.image || '/Logo.png'}
                                    alt={featuredPost.title || "TARK AI Featured Article"}
                                    fill
                                    className="object-cover transition-all duration-700 lg:group-hover:scale-105 lg:group-hover:blur-[3px]"
                                />
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#0F1C1E] via-[#0F1C1E]/40 to-transparent pointer-events-none z-10 transition-opacity duration-300"></div>
                                
                                {/* Hover Dark Overlay (Just for darkening the blurred image) */}
                                <div className="absolute inset-0 bg-[#0F1C1E]/50 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Top-Right Badge */}
                                <div className="absolute top-5 right-5 z-30 pointer-events-none">
                                    <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-[#0F1C1E] bg-white shadow-lg">
                                       {featuredPost.tag || featuredPost.category || 'Featured'}
                                    </span>
                                </div>
                                
                                {/* Content on top */}
                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex flex-col gap-2 z-30">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug transition-colors duration-300">
                                        {featuredPost.title}
                                    </h3>
                                    
                                    {/* Hover Reveal Button Below Heading */}
                                    <div className="flex justify-end w-full overflow-hidden h-0 group-hover:h-8 group-hover:mt-2 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                                        <div className="inline-flex items-center gap-2 text-[#20A6A8] hover:text-white font-semibold text-[14px] transition-colors">
                                            Read Article 
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Right Column (Auto-Scroll on Desktop, Touch-Swipeable on Mobile) */}
                    <div className="w-full max-w-full min-w-0 lg:w-2/3 overflow-hidden relative pt-4 lg:pt-0">
                        {/* Fade edges */}
                        <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-linear-to-r from-[#EAF7F7] to-transparent z-10 pointer-events-none" />
                        <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-linear-to-l from-[#EAF7F7] to-transparent z-10 pointer-events-none" />
                        
                        <div 
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex overflow-x-auto overflow-y-hidden lg:overflow-hidden items-center h-full w-full max-w-full touch-auto overscroll-x-contain sm:overscroll-x-auto custom-scrollbar-hide [&::-webkit-scrollbar]:hidden"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                            onMouseEnter={() => { if (!isMobile) isHoveredRef.current = true; }}
                            onMouseLeave={() => { if (!isMobile) isHoveredRef.current = false; }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={handleTouchEnd}
                        >
                            <div 
                                className="flex gap-4 sm:gap-6 shrink-0 w-max lg:animate-[scroll-marquee-left_25s_linear_infinite] hover:[animation-play-state:paused]"
                                
                            >
                                {[0, 1, 2, 3].map((setIndex) => (
                                    <div key={setIndex} className="flex gap-6 shrink-0">
                                        {scrollBlogs.map((post) => (
                                            <div key={`${setIndex}-${post.id}`} className="w-68 sm:w-87.5 shrink-0 h-96 sm:h-110 flex snap-start sm:snap-align-none transform-[translateZ(0)]">
                                                <BlogCard post={post} />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                `
            }} />
        </section>
    );
}

function BlogCard({ post }: { post: BlogPost }) {
    const imageUrl = post.coverImage || post.image || '/Logo.png';
    const displayCategory = post.tag || post.category || 'Blog';

    return (
        <div className="group w-full h-full flex flex-col cursor-pointer">
            <Link href={`/blog/${post.slug || post.id}`} className="block h-full flex-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full relative border border-gray-100">

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden shrink-0 bg-gray-50/50">
                        {/* Crisp contained foreground image */}
                        <Image
                            src={imageUrl}
                            alt={post.title || "TARK AI Blog Article"}
                            fill
                            className="object-contain transition-transform duration-700 relative z-10"
                            draggable={false}
                        />

                        {/* Hover Overlay with Read Article */}
                        <div className="hidden lg:flex absolute inset-0 bg-[#0F1C1E]/70 backdrop-blur-[2px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                            <div className="inline-flex items-center gap-2 text-white font-semibold text-[13px] translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                Read Article 
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>

                        {/* Tag on image top-right */}
                        <div className="absolute top-3 right-3 z-20">
                            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] text-white bg-brand-accent shadow-md">
                                {displayCategory}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-2 flex-1 relative z-10">
                        {/* Date between image and title */}
                        <span className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-gray-400">
                            <FaCalendarAlt className="text-brand-accent" size={10} />
                            {post.date}
                        </span>
                        <div className="border-t border-gray-100" />
                        <h3 className="text-[18px] sm:text-[20px] font-semibold text-brand-darkest leading-snug">
                            {post.title}
                        </h3>
                        <p className="text-[13px] sm:text-[14px] font-normal leading-[1.65] text-gray-600 line-clamp-3 mb-2">
                            {post.description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
