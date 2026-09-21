"use client";

import React, { useState, useEffect } from "react";
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
    const [isHovered, setIsHovered] = useState(false);
    const [fetchedBlogs, setFetchedBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(!latestBlogs || latestBlogs.length === 0);

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
        <section className="py-20 lg:py-28 bg-[#EAF7F7] relative z-20 overflow-hidden">
            <GeometricShapes />
            <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                
                {/* Header Container */}
                <div className="relative mb-16 max-w-full mx-auto flex flex-col items-center">
                    
                    {/* Centered Content */}
                    <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-px bg-[#20A6A8]/40"></div>
                            <div className="px-5 py-1.5 rounded-full bg-[#20A6A8]/10 text-[#20A6A8] border border-[#20A6A8]/20 text-[13px] sm:text-[14px] font-medium leading-normal tracking-wide uppercase">
                                Latest Updates
                            </div>
                            <div className="w-12 h-px bg-[#20A6A8]/40"></div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight text-[#0F1C1E] mb-6">
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
                    <div className="lg:hidden mt-6 flex justify-end w-full px-4">
                        <Link href="/blog" className="text-[#20A6A8] hover:text-[#188082] text-sm font-semibold transition-colors duration-300 group flex items-center gap-1.5">
                            View all articles 
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full items-stretch">
                    
                    {/* Left Column (Featured Blog) */}
                    <div className="lg:w-1/3 flex flex-col justify-start z-30">
                        {featuredPost && (
                            <Link href={`/blog/${featuredPost.slug || featuredPost.id}`} className="block h-112.5 w-full group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-white/50">
                                {/* Background Image */}
                                <Image
                                    src={featuredPost.coverImage || featuredPost.image || '/Logo.png'}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[3px]"
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
                                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-2 z-30">
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

                    {/* Right Column (Auto-Scroll) */}
                    <div className="lg:w-2/3 overflow-hidden relative pt-4 lg:pt-0">
                        {/* Fade edges */}
                        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-linear-to-r from-[#EAF7F7] to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-linear-to-l from-[#EAF7F7] to-transparent z-10 pointer-events-none" />
                        
                        <div 
                            className="flex overflow-hidden items-center h-full w-full"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onTouchStart={() => setIsHovered(true)}
                            onTouchEnd={() => setIsHovered(false)}
                        >
                            <div 
                                className="flex gap-6 shrink-0 w-max"
                                style={{
                                    animation: 'scroll-marquee-left 25s linear infinite',
                                    animationPlayState: isHovered ? 'paused' : 'running'
                                }}
                            >
                                {[0, 1].map((setIndex) => (
                                    <div key={setIndex} className="flex gap-6 shrink-0">
                                        {scrollBlogs.map((post) => (
                                            <div key={`${setIndex}-${post.id}`} className="w-75 sm:w-87.5 shrink-0 h-112.5 flex">
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
                <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-sm overflow-hidden flex flex-col h-full relative border border-gray-100">

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden shrink-0 bg-gray-50/50">
                        {/* Blurred background image to prevent empty spaces */}
                        <Image
                            src={imageUrl}
                            alt=""
                            fill
                            className="object-cover blur-md opacity-25 scale-105 pointer-events-none"
                            draggable={false}
                        />
                        {/* Crisp contained foreground image */}
                        <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-contain transition-transform duration-700 relative z-10"
                            draggable={false}
                        />

                        {/* Hover Overlay with Read Article */}
                        <div className="absolute inset-0 bg-[#0F1C1E]/70 backdrop-blur-[2px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                        <p className="text-[13px] sm:text-[14px] font-normal leading-[1.65] text-gray-600 flex-1 line-clamp-3">
                            {post.description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
