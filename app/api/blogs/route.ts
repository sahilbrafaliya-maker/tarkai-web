import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
    try {
        await dbConnect();
        // Sort blogs by date (newest first)
        // We fetch all then sort in memory because date is a string. 
        // Ideally schema should use Date type for better sorting, but string compatibility is safest for now.
        const blogs = await Blog.find({});

        const sortedBlogs = blogs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json(sortedBlogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: 'Failed to fetch blogs', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const newBlog = await request.json();

        // Generate ID
        // Find existing max ID
        const lastBlog = await Blog.findOne().sort({ id: -1 });
        const newId = lastBlog ? lastBlog.id + 1 : 1;

        const blogData = { ...newBlog, id: newId };

        const createdBlog = await Blog.create(blogData);

        return NextResponse.json(createdBlog, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
