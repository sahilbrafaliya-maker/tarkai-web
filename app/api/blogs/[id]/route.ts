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

// Params type definition for dynamic route
type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
    try {
        const { id } = await params;
        const updatedData = await request.json();
        const blogs = await getBlogs();

        const index = blogs.findIndex((b: any) => b.id === parseInt(id));

        if (index === -1) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Update fields
        blogs[index] = { ...blogs[index], ...updatedData };
        await saveBlogs(blogs);

        return NextResponse.json(blogs[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    try {
        const { id } = await params;
        let blogs = await getBlogs();

        const initialLength = blogs.length;
        blogs = blogs.filter((b: any) => b.id !== parseInt(id));

        if (blogs.length === initialLength) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        await saveBlogs(blogs);

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
