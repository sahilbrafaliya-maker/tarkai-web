import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// Params type definition for dynamic route
type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const updatedData = await request.json();

        // Ensure we update based on the 'id' field, not '_id' unless we switched
        // We are using 'id' (number) for compatibility
        const blog = await Blog.findOneAndUpdate({ id: parseInt(id) }, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const deletedBlog = await Blog.findOneAndDelete({ id: parseInt(id) });

        if (!deletedBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
