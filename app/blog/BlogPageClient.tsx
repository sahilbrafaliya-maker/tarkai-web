"use client";

import { useState } from 'react';
import GeometricShapes from '../components/GeometricShapes';
import BackgroundText from '../components/BackgroundText';
import PageHeader from '../components/PageHeader';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";

// Type definition for Blog Post
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

interface BlogPageClientProps {
    initialBlogs: BlogPost[];
}

export default function BlogPageClient({ initialBlogs }: BlogPageClientProps) {
    const [blogPosts] = useState<BlogPost[]>(initialBlogs);
    const [showAll, setShowAll] = useState(false);

    const visiblePosts = showAll ? blogPosts : blogPosts.slice(0, 3);

    return (
        <div className="bg-white min-h-screen pb-20 relative overflow-hidden">
            <GeometricShapes hideTopLeftHexagon={true} hideTriangle={true} variant="page-background" />
            <PageHeader 
                badge="OUR BLOG"
                title={<>INSIGHTS &amp; <span className="text-[#20A6A8]">IDEAS</span></>}
                description="Explore the frontier of Artificial Intelligence, Data Science, and the future of work."
            />

            {/* Header Section */}
            <div className="bg-brand-lightest py-20 relative overflow-hidden hidden">
                <BackgroundText text="BLOGS" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
                {blogPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-gray-50 rounded-3xl p-10 max-w-2xl mx-auto border border-gray-100">
                            <h3 className="text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-gray-400 mb-2">No Content Yet</h3>
                            <p className="text-[15px] sm:text-[16px] text-gray-500">Stay tuned! Insightful articles are coming soon.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6 w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full bg-brand-accent" />
                                <h2 className="text-2xl sm:text-3xl font-bold text-brand-darkest tracking-tight">Latest <span className="text-brand-accent">Articles</span></h2>
                            </div>
                            {!showAll && blogPosts.length > 3 && (
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-brand-darkest font-semibold tracking-wide text-[13px] sm:text-[14px] rounded-full border border-gray-200 overflow-hidden transition-all duration-500 hover:border-brand-accent hover:shadow-[0_8px_25px_-10px_rgba(32,166,168,0.4)] hover:-translate-y-0.5 cursor-pointer shrink-0"
                                >
                                    <div className="absolute inset-0 bg-brand-lightest/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                                    <span className="relative z-10">View All Articles</span>
                                    <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-500">
                                        <svg className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </button>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {visiblePosts.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </div>
                        {showAll && blogPosts.length > 3 && (
                            <div className="flex justify-center mt-12 mb-4 w-full">
                                <button
                                    onClick={() => setShowAll(false)}
                                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-brand-darkest font-semibold tracking-wide text-[13px] sm:text-[14px] rounded-full border border-gray-200 overflow-hidden transition-all duration-500 hover:border-brand-accent hover:shadow-[0_8px_25px_-10px_rgba(32,166,168,0.4)] hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-brand-lightest/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                                    <span className="relative z-10">View Less Articles</span>
                                    <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-500">
                                        <svg className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function BlogCard({ post, index }: { post: BlogPost, index: number }) {
    const imageUrl = post.coverImage || post.image || '/Logo.png';
    const displayCategory = post.tag || post.category || 'Blog';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group w-full"
        >
            <Link href={`/blog/${post.slug || post.id}`} className="block h-full">
                <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-sm overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-brand-accent/30 flex flex-col h-full relative">

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
                            className="object-contain transition-transform duration-700 group-hover:scale-105 relative z-10"
                            draggable={false}
                        />
                        {/* Tag on image top-right */}
                        <div className="absolute top-3 right-3 z-20">
                            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] text-white bg-brand-accent shadow-md">
                                {displayCategory}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-2 flex-1">
                        {/* Date between image and title */}
                        <span className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-gray-400">
                            <FaCalendarAlt className="text-brand-accent" size={10} />
                            {post.date}
                        </span>
                        <div className="border-t border-gray-100" />
                        <h3 className="text-[18px] sm:text-[20px] font-semibold text-brand-darkest leading-snug group-hover:text-brand-accent transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-[13px] sm:text-[14px] font-normal leading-[1.65] text-gray-600 flex-1">
                            {post.description}
                        </p>
                    </div>

                    {/* Glow */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-accent opacity-10 blur-3xl rounded-full group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                </div>
            </Link>
        </motion.div>
    );
}
