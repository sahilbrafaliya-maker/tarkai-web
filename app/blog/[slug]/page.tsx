import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ slug: string }>;

const blogSeoTitles: Record<string, string> = {
    'tark-ai-edtech-signs-mou-with-vnsgu-department-of-statistics-to-advance-ai-data-science-machine-learning-education':
        'TARK AI Signs MoU with VNSGU for AI & Data Science',
    'ai-course-fees-duration-surat-gujarat':
        'AI Course Fees & Duration in Surat (2026) | TARK AI',
    'how-to-become-ai-engineer-surat':
        'How to Become an AI Engineer in Surat | TARK AI',
    'best-ai-institute-in-surat-checklist':
        'Best AI Institute in Surat: 8 Things to Check | TARK AI',
    'the-tech-reality-check-career-current-market-ai-future':
        'The Tech Reality Check: Careers & AI Future | TARK AI',
    'how-ai-ml-engineers-will-be-hired-in-the-next-3-years':
        'How AI & ML Engineers Will Be Hired | TARK AI',
    'green-data-revolution-ai-statistics-carbon-markets':
        'Green Data Revolution: AI & Carbon Markets | TARK AI',
};

function getOptimizedBlogTitle(title: string, slug?: string): string {
    if (slug && blogSeoTitles[slug]) {
        return blogSeoTitles[slug];
    }
    const cleanTitle = title.trim();
    if (cleanTitle.length <= 44) {
        return `${cleanTitle} | TARK AI`;
    }
    const truncated = cleanTitle.slice(0, 41).replace(/\s+\S*$/, '');
    return `${truncated} | TARK AI`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    try {
        await dbConnect();
        const blog = await Blog.findOne({ slug });
        if (!blog) return {};

        const imageUrl = blog.coverImage || blog.image || 'https://tarkaiedtech.com/Logo.png';
        const pageUrl = `https://tarkaiedtech.com/blog/${slug}`;
        const seoTitle = getOptimizedBlogTitle(blog.title, slug);

        return {
            title: {
                absolute: seoTitle,
            },
            description: blog.description || `Read "${blog.title}" on TARK AI EdTech. Learn about the frontier of Artificial Intelligence and Data Science.`,
            keywords: [blog.title, blog.tag || 'AI Trends', 'TARK AI Blog', 'AI Insights'],
            alternates: {
                canonical: pageUrl,
            },
            openGraph: {
                title: seoTitle,
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
                title: seoTitle,
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

    const imageUrl = blogData.coverImage || blogData.image || 'https://tarkaiedtech.com/Logo.png';
    const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://tarkaiedtech.com${imageUrl}`;

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `https://tarkaiedtech.com/blog/${slug}/#article`,
        "headline": blogData.title,
        "description": blogData.description || `Read insights on ${blogData.title} from TARK AI EdTech, Surat's leading AI institute.`,
        "url": `https://tarkaiedtech.com/blog/${slug}`,
        "inLanguage": "en-IN",
        "datePublished": blogData.date ? new Date(blogData.date).toISOString() : new Date().toISOString(),
        "dateModified": blogData.updatedAt ? new Date(blogData.updatedAt).toISOString() : (blogData.date ? new Date(blogData.date).toISOString() : new Date().toISOString()),
        "image": {
            "@type": "ImageObject",
            "url": fullImageUrl,
            "caption": blogData.title
        },
        "keywords": blogData.tag ? [blogData.tag, "AI EdTech Surat", "TARK AI Blog"] : ["AI Insights", "AI EdTech Surat", "TARK AI Blog"],
        "author": {
            "@type": "Organization",
            "@id": "https://tarkaiedtech.com/#organization",
            "name": "TARK AI EdTech Private Limited",
            "url": "https://tarkaiedtech.com"
        },
        "publisher": {
            "@type": "Organization",
            "@id": "https://tarkaiedtech.com/#organization",
            "name": "TARK AI EdTech Private Limited",
            "url": "https://tarkaiedtech.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://tarkaiedtech.com/Logo.png",
                "width": 600,
                "height": 60
            }
        },
        "isPartOf": { "@id": "https://tarkaiedtech.com/#website" },
        "mainEntityOfPage": { "@id": `https://tarkaiedtech.com/blog/${slug}/#article` }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <BlogDetailClient blog={blogData} otherPosts={otherPostsData} />
        </>
    );
}
