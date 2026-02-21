'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaInstagram, FaLinkedin, FaTwitter, FaTimes } from 'react-icons/fa';
import GeometricShapes from '@/app/components/GeometricShapes';

interface Blog {
    _id: string;
    id: number;
    slug: string;
    title: string;
    description: string;
    date: string;
    tag: string;
    coverImage: string;
    paragraph: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    images: string[];
    // legacy
    image?: string;
    category?: string;
    color?: string;
}

function formatDate(dateStr: string) {
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        return dateStr;
    }
}

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lightboxImg, setLightboxImg] = useState<string | null>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [otherPosts, setOtherPosts] = useState<Blog[]>([]);

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/blogs/slug/${slug}`)
            .then(r => {
                if (!r.ok) throw new Error('Not found');
                return r.json();
            })
            .then(data => { setBlog(data); setLoading(false); })
            .catch(() => { setError('Blog post not found.'); setLoading(false); });
    }, [slug]);

    useEffect(() => {
        fetch('/api/blogs')
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const others = data
                        .filter((p: Blog) => p.slug !== slug)
                        .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 3);
                    setOtherPosts(others);
                }
            })
            .catch(() => { });
    }, [slug]);

    const displayTag = blog?.tag || blog?.category || '';
    const cardColor = (blog as any)?.color || 'from-violet-400 to-indigo-600';

    const totalSlides = blog?.images?.length ?? 0;
    const prevSlide = useCallback(() => setSlideIndex(i => (i - 1 + totalSlides) % totalSlides), [totalSlides]);
    const nextSlide = useCallback(() => setSlideIndex(i => (i + 1) % totalSlides), [totalSlides]);

    const socialLinks = blog ? [
        { key: 'instagram', url: blog.instagram, label: 'Instagram', icon: <FaInstagram />, style: 'hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 text-gray-500' },
        { key: 'linkedin', url: blog.linkedin, label: 'LinkedIn', icon: <FaLinkedin />, style: 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-gray-500' },
        { key: 'twitter', url: blog.twitter, label: 'Twitter / X', icon: <FaTwitter />, style: 'hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 text-gray-500' },
    ].filter(s => s.url && s.url.trim() !== '') : [];

    // ─── Loading ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-28 pb-20 relative overflow-hidden">
                <GeometricShapes />
                <div className="max-w-3xl mx-auto px-4 relative z-10">
                    <div className="bg-gray-100 rounded-3xl h-72 animate-pulse mb-8" />
                    <div className="space-y-4">
                        {[80, 65, 50, 40].map((w, i) => (
                            <div key={i} className="bg-gray-100 rounded-xl h-4 animate-pulse" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ─── Not Found ────────────────────────────────────────────────────────────
    if (error || !blog) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-4">
                <GeometricShapes />
                <div className="relative z-10 text-center">
                    <p className="text-6xl mb-4">🔍</p>
                    <h1 className="text-2xl font-bold text-brand-darkest mb-2">Post Not Found</h1>
                    <p className="text-gray-500 mb-6">{error || "This blog post doesn't exist."}</p>
                    <Link href="/blog" className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl transition hover:bg-brand-accent font-medium">
                        <FaArrowLeft size={12} /> Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    // ─── Detail Page ─────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <GeometricShapes />

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setLightboxImg(null)}
                    >
                        <button
                            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center transition"
                            onClick={() => setLightboxImg(null)}
                        >
                            <FaTimes />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-5xl max-h-[88vh] w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <Image
                                src={lightboxImg}
                                alt="Full view"
                                width={1400}
                                height={900}
                                className="object-contain rounded-2xl max-h-[85vh] w-auto mx-auto shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <article className="max-w-4xl mx-auto px-4 pt-24 md:pt-32 pb-24 relative z-10">

                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-brand-dark/60 hover:text-brand-accent text-sm font-medium transition mb-8 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={11} />
                    Back to Blog
                </Link>

                {/* Image Slider — TOP */}
                {blog.images && blog.images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        {/* Slider */}
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-gray-100 h-[280px] sm:h-[420px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={slideIndex}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={blog.images[slideIndex]}
                                        alt={`Gallery image ${slideIndex + 1}`}
                                        fill
                                        className="object-cover cursor-zoom-in"
                                        priority
                                        onClick={() => setLightboxImg(blog.images[slideIndex])}
                                    />
                                    <div className="absolute bottom-4 right-4">
                                        <span className="bg-white/80 backdrop-blur-sm text-brand-darkest text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                                            Click to enlarge
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {blog.images.length > 1 && (
                                <>
                                    <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow flex items-center justify-center text-brand-dark transition hover:scale-110">
                                        <FaArrowLeft size={13} />
                                    </button>
                                    <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow flex items-center justify-center text-brand-dark transition hover:scale-110">
                                        <FaArrowRight size={13} />
                                    </button>
                                </>
                            )}

                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {slideIndex + 1} / {blog.images.length}
                                </span>
                            </div>
                        </div>

                        {blog.images.length > 1 && (
                            <>
                                <div className="flex justify-center gap-2 mt-4">
                                    {blog.images.map((_, i) => (
                                        <button key={i} onClick={() => setSlideIndex(i)}
                                            className={`rounded-full transition-all duration-300 ${i === slideIndex ? 'w-5 h-2 bg-brand-accent' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
                                        />
                                    ))}
                                </div>
                                {/* <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                                    {blog.images.map((imgUrl, i) => (
                                        <div key={i} onClick={() => setSlideIndex(i)}
                                            className={`relative shrink-0 w-16 h-12 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${i === slideIndex ? 'ring-2 ring-brand-accent scale-105' : 'opacity-60 hover:opacity-100'}`}
                                        >
                                            <Image src={imgUrl} alt={`Thumb ${i + 1}`} fill className="object-cover" />
                                        </div>
                                    ))}
                                </div> */}
                            </>
                        )}
                    </motion.div>
                )}

                {/* Tag & Date row */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    {displayTag && (
                        <span className="text-xs font-bold text-white bg-brand-accent px-3 py-1.5 rounded-full shadow-sm tracking-wide">
                            {displayTag}
                        </span>
                    )}
                    {blog.date && (
                        <span className="flex items-center gap-1.5 text-sm text-gray-500">
                            <FaCalendarAlt className="text-brand-accent" size={11} />
                            {formatDate(blog.date)}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-darkest leading-[1.15] mb-6">
                    {blog.title}
                </h1>

                {/* Description */}
                {blog.description && (
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 border-l-4 border-brand-accent/30 pl-5">
                        {blog.description}
                    </p>
                )}


                {/* Markdown Paragraph */}
                {blog.paragraph && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-10"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => <h1 className="text-xl sm:text-2xl font-extrabold text-brand-darkest mt-8 mb-3 leading-tight">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-lg sm:text-xl font-bold text-brand-darkest mt-7 mb-2 leading-snug">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-base sm:text-lg font-bold text-brand-dark mt-6 mb-2">{children}</h3>,
                                p: ({ children }) => <p className="text-gray-700 leading-relaxed text-base">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-gray-700">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-gray-700">{children}</ol>,
                                li: ({ children }) => <li className="text-gray-700 leading-relaxed marker:text-brand-accent">{children}</li>,
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-brand-accent/50 pl-4 my-4 text-gray-600 italic bg-brand-lightest/30 py-2 rounded-r-xl">
                                        {children}
                                    </blockquote>
                                ),
                                code: ({ inline, children }: any) =>
                                    inline
                                        ? <code className="bg-brand-lightest text-brand-accent text-sm px-1.5 py-0.5 rounded font-mono">{children}</code>
                                        : <code className="block bg-gray-50 border border-gray-200 text-gray-800 text-sm p-4 rounded-2xl overflow-x-auto font-mono mb-4 whitespace-pre">{children}</code>,
                                pre: ({ children }) => <pre className="mb-4 rounded-2xl overflow-hidden">{children}</pre>,
                                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline font-medium">{children}</a>,
                                hr: () => <hr className="border-gray-200 my-6" />,
                                strong: ({ children }) => <strong className="font-bold text-brand-darkest">{children}</strong>,
                                em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
                                img: ({ src, alt }) => (
                                    <span className="block my-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={src} alt={alt} className="rounded-2xl max-w-full shadow-md" />
                                    </span>
                                ),
                            }}
                        >
                            {blog.paragraph}
                        </ReactMarkdown>
                    </motion.div>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-10"
                    >
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Follow &amp; Connect</h3>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {socialLinks.map(social => (
                                <a
                                    key={social.key}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl border border-gray-200 bg-white text-xs md:text-sm font-semibold shadow-sm transition-all duration-200 ${social.style}`}
                                >
                                    <span className="text-sm md:text-base">{social.icon}</span>
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}

            </article>

            {/* ── More Posts ── */}
            {otherPosts.length > 0 && (
                <section className="max-w-5xl mx-auto px-4 pb-24 relative z-10">
                    <div className="border-t border-gray-100 pt-12 mb-8 flex items-center gap-4">
                        <h2 className="text-xl font-extrabold text-brand-darkest">More Posts</h2>
                        <Link href="/blog" className="ml-auto text-sm font-semibold text-brand-accent hover:underline flex items-center gap-1">
                            View all <FaArrowRight size={10} />
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {otherPosts.map((post, index) => {
                            const imageUrl = post.coverImage || post.image || '/Logo.png';
                            return (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link href={`/blog/${post.slug || post.id}`} className="group block relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ height: '220px' }}>
                                        {/* Cover image */}
                                        <Image
                                            src={imageUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        {/* Title */}
                                        <div className="absolute bottom-0 inset-x-0 p-4">
                                            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-brand-lightest transition-colors">
                                                {post.title}
                                            </h3>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
