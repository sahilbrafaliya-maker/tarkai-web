import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: 'Insights & Blog | TARK AI EdTech',
    description: 'Explore the latest insights on Artificial Intelligence, Data Science, and Career Development from TARK AI Industry Experts.',
    keywords: ['AI Blog', 'Data Science Blog', 'Climate Technology Insights', 'TARK AI Blog', 'AI Career Insights'],
    alternates: {
        canonical: 'https://tarkaiedtech.com/blog',
    },
    openGraph: {
        type: 'website',
        title: 'TARK AI Insights & Blog',
        description: 'Expert articles on AI, ML, Data Science, and the future of work.',
        url: 'https://tarkaiedtech.com/blog',
        siteName: 'TARK AI EdTech',
        images: [
            {
                url: 'https://tarkaiedtech.com/Logo.png',
                alt: 'TARK AI EdTech Logo',
            }
        ]
    }
};

export default async function BlogPage() {
    let blogPosts: any[] = [];
    try {
        await dbConnect();
        // Fetch all blog posts
        const blogs = await Blog.find({});
        // Stringify Mongoose documents to avoid Next.js server-to-client transfer errors
        blogPosts = JSON.parse(JSON.stringify(blogs)).sort(
            (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
        console.error('Failed to pre-render blogs server-side:', error);
    }

    return <BlogPageClient initialBlogs={blogPosts} />;
}
