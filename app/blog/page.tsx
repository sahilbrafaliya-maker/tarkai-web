"use client";

import { useState, useEffect } from 'react';
import GeometricShapes from '../components/GeometricShapes';
import BackgroundText from '../components/BackgroundText';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

// Type definition for Blog Post
interface BlogPost {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    description: string;
    color: string;
}

export default function BlogPage() {

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const data = await res.json();

                if (Array.isArray(data)) {
                    // Ensure client-side sorting as well
                    data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    setBlogPosts(data);
                } else {
                    console.error("API returned non-array data:", data);
                    setBlogPosts([]);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
            setIsLoading(false);
        };

        fetchBlogs();
    }, []);

    return (
        <div className="bg-white min-h-screen pb-20 pt-28 relative overflow-hidden">
            <GeometricShapes />

            {/* Header Section */}
            <div className="bg-brand-lightest py-20 relative overflow-hidden">
                <BackgroundText text="BLOGS" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-8 animate-slide-up">
                        INSIGHTS & IDEAS
                    </h1>
                    <p
                        className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed animate-slide-up animate-delay-200 opacity-0"
                        style={{ animationFillMode: 'forwards' }}
                    >
                        Explore the frontier of Artificial Intelligence, Data Science, and the future of work.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
                {isLoading ? (
                    <div className="text-center py-20 text-xl text-gray-500">Loading insights...</div>
                ) : blogPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-gray-50 rounded-3xl p-10 max-w-2xl mx-auto border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Content Yet</h3>
                            <p className="text-gray-500">Stay tuned! Insightful articles are coming soon.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BlogCard({ post, index }: { post: BlogPost, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-[450px] w-full perspective-1000"
        >
            <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/10 backdrop-blur-md rounded-4xl border border-white/50 shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-brand-accent/30">

                {/* Image Section with Overlay */}
                <div className="relative h-1/2 overflow-hidden clip-path-slant">
                    <div className={`absolute inset-0 bg-linear-to-br ${post.color} opacity-20 mix-blend-overlay z-10`} />
                    {/* Fallback image logic if needed, or ensuring valid paths */}
                    <Image
                        src={post.image || '/Logo.png'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Floating Date Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-dark shadow-sm z-20 flex items-center gap-1">
                        <FaCalendarAlt className="text-brand-accent" />
                        {post.date}
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-4 left-4 z-20">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-linear-to-r ${post.color} shadow-lg backdrop-blur-md`}>
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 h-1/2 flex flex-col relative z-20">
                    <h3 className="text-xl font-bold text-brand-darkest mb-3 leading-tight group-hover:text-brand-accent transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed grow">
                        {post.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-brand-dark/5 flex items-center justify-between">
                        <Link href="#" className="flex items-center gap-2 text-sm font-bold text-brand-dark group-hover:text-brand-accent transition-all pl-0 group-hover:pl-2">
                            Read Article
                            <span className="bg-brand-lightest rounded-full p-1 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                <FaArrowRight size={12} />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Decorative Glow */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-linear-to-br ${post.color} opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-500`} />
            </div>
        </motion.div>
    );
}
