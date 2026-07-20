import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tarkaiedtech.com';

    // ── Static pages — highest priority first ────────────────────────────
    const coreRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/programs`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/admission`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'daily',
            priority: 0.80,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.70,
        },
        {
            url: `${baseUrl}/ai-career-guider`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.65,
        },
    ];

    // ── Legal / utility pages — low priority ─────────────────────────────
    const legalRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'yearly',
            priority: 0.30,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'yearly',
            priority: 0.30,
        },
        {
            url: `${baseUrl}/cookies`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'yearly',
            priority: 0.20,
        },
    ];

    // ── Dynamic program course pages ─────────────────────────────────────
    const programRoutes: MetadataRoute.Sitemap = [
        'ai-ml-architect-program',
        'data-science-strategic-analytics',
        'future-founders-ai-foundation',
        'green-intelligence-climate-analytics'
    ].map((slug) => ({
        url: `${baseUrl}/programs/${slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.90,
    }));

    // ── Dynamic blog posts ────────────────────────────────────────────────
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        await dbConnect();
        const blogs = await Blog.find({}, 'slug id date updatedAt').lean();

        blogRoutes = blogs.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug || post.id}`,
            lastModified: new Date(post.updatedAt || post.date).toISOString().split('T')[0],
            changeFrequency: 'monthly' as const,
            priority: 0.70,
        }));
    } catch (error) {
        console.error('Sitemap generation error:', error);
    }

    return [...coreRoutes, ...programRoutes, ...blogRoutes, ...legalRoutes];
}
