import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const dataFilePath = path.join(process.cwd(), 'data/blogs.json');

async function getBlogs() {
    const jsonData = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(jsonData);
}

async function saveBlogs(blogs: any[]) {
    await fs.writeFile(dataFilePath, JSON.stringify(blogs, null, 2));
}

export async function GET() {
    try {
        const blogs = await getBlogs();
        // Sort blogs by date (newest first)
        blogs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newBlog = await request.json();
        const blogs = await getBlogs();

        // Simple ID generation
        const newId = blogs.length > 0 ? Math.max(...blogs.map((b: any) => b.id)) + 1 : 1;
        const blogWithId = { ...newBlog, id: newId };

        blogs.push(blogWithId);
        await saveBlogs(blogs);

        return NextResponse.json(blogWithId, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
