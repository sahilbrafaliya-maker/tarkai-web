import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

type Params = Promise<{ slug: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
    try {
        await dbConnect();
        const { slug } = await params;

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
    }
}
