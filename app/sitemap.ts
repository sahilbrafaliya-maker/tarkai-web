import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tarkaiedtech.com';

    // Static pages
    const routes = [
        '',
        '/ai-career-guider',
        '/programs',
        '/about',
        '/team',
        '/contact',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic blog posts
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        await dbConnect();
        const blogs = await Blog.find({}, 'slug id date updatedAt').lean();

        blogRoutes = blogs.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug || post.id}`,
            lastModified: new Date(post.updatedAt || post.date).toISOString().split('T')[0],
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Sitemap generation error:', error);
    }

    return [...routes, ...blogRoutes];
}
