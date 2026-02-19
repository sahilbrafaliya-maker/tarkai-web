import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaCalendarAlt, FaArrowLeft, FaTag } from 'react-icons/fa';
import dbConnect from '@/lib/mongodb';
import Blog, { IBlog } from '@/models/Blog';
import GeometricShapes from '../../components/GeometricShapes';

// Force dynamic rendering if necessary, or use revalidate
export const revalidate = 60; // Revalidate every minute

interface Props {
    params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<IBlog | null> {
    await dbConnect();
    // Logic to find by slug. failing that, check if it's an ID for backward compatibility?
    // For now, strict slug check.
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) {
        // Fallback: try ID if slug looks like a number (optional, but good for migration)
        if (!isNaN(Number(slug))) {
            return Blog.findOne({ id: Number(slug) }).lean();
        }
    }
    return blog as IBlog | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | TARK AI Blog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date, // Note: post.date is string in DB, usually formatted
            authors: ['TARK AI Team'],
            images: [
                {
                    url: post.image || '/Logo.png',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-20 pt-28 relative overflow-hidden">
            <GeometricShapes />

            {/* Hero Section */}
            <div className={`relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden`}>
                <div className={`absolute inset-0 bg-linear-to-br ${post.color || 'from-blue-600 to-purple-700'} opacity-90`} />

                {/* Background Image */}
                {post.image && (
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover mix-blend-overlay opacity-50"
                        priority
                    />
                )}

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold mb-4 border border-white/30 uppercase tracking-wider">
                        {post.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-sm md:text-base font-medium text-white/90">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTag />
                            <span>{post.category}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-brand-accent transition-colors mb-8 group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Insights
                    </Link>

                    <article className="prose prose-lg md:prose-xl max-w-none prose-headings:text-brand-darkest prose-a:text-brand-accent prose-img:rounded-2xl">
                        {post.content ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.content}
                            </ReactMarkdown>
                        ) : (
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p className="font-medium text-xl text-gray-500 italic border-l-4 border-brand-accent pl-4">
                                    [This post currently has no detailed content. It serves as a placeholder for the title and description.]
                                </p>
                                <p>{post.description}</p>
                            </div>
                        )}
                    </article>

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-brand-darkest mb-4">Share this article</h3>
                        <div className="flex gap-4">
                            {/* Social Share Buttons can be added here */}
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                                LinkedIn
                            </button>
                            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-bold hover:bg-sky-600 transition-colors">
                                Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
