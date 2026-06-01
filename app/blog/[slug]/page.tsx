import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    try {
        await dbConnect();
        const blog = await Blog.findOne({ slug });
        if (!blog) return {};

        const imageUrl = blog.coverImage || blog.image || 'https://tarkaiedtech.com/Logo.png';
        const pageUrl = `https://tarkaiedtech.com/blog/${slug}`;

        return {
            title: `${blog.title} | TARK AI Blog`,
            description: blog.description || `Read "${blog.title}" on TARK AI EdTech. Learn about the frontier of Artificial Intelligence and Data Science.`,
            keywords: [blog.title, blog.tag || 'AI Trends', 'TARK AI Blog', 'AI Insights'],
            alternates: {
                canonical: pageUrl,
            },
            openGraph: {
                title: `${blog.title} | TARK AI Blog`,
                description: blog.description,
                url: pageUrl,
                siteName: 'TARK AI EdTech',
                images: [
                    {
                        url: imageUrl.startsWith('http') ? imageUrl : `https://tarkaiedtech.com${imageUrl}`,
                        alt: blog.title,
                    }
                ],
                type: 'article',
                publishedTime: blog.date ? new Date(blog.date).toISOString() : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title: `${blog.title} | TARK AI Blog`,
                description: blog.description,
                images: [imageUrl.startsWith('http') ? imageUrl : `https://tarkaiedtech.com${imageUrl}`],
            }
        };
    } catch (e) {
        console.error('Error generating blog metadata:', e);
        return {};
    }
}

export default async function BlogDetailPage({ params }: { params: Params }) {
    const { slug } = await params;
    let blogData: any = null;
    let otherPostsData: any[] = [];

    try {
        await dbConnect();
        const blog = await Blog.findOne({ slug });
        if (!blog) {
            return notFound();
        }
        blogData = JSON.parse(JSON.stringify(blog));

        // Fetch other posts
        const otherPosts = await Blog.find({ slug: { $ne: slug } }).limit(3);
        otherPostsData = JSON.parse(JSON.stringify(otherPosts)).sort(
            (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
        console.error('Error fetching blog detail data:', error);
        return notFound();
    }

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `https://tarkaiedtech.com/blog/${slug}/#breadcrumb`,
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://tarkaiedtech.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://tarkaiedtech.com/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": blogData.title,
                "item": `https://tarkaiedtech.com/blog/${slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <BlogDetailClient blog={blogData} otherPosts={otherPostsData} />
        </>
    );
}
