import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { promises as fs } from 'fs';
import path from 'path';

// Params type definition for dynamic route
type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const updatedData = await request.json();

        // Ensure we update based on the 'id' field, not '_id' unless we switched
        // We are using 'id' (number) for compatibility
        // Find the existing blog first to get the old image
        const existingBlog = await Blog.findOne({ id: parseInt(id) });

        if (!existingBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Check if image is being updated and is different
        if (updatedData.image && updatedData.image !== existingBlog.image) {
            // Delete old image if it exists and is a local upload
            if (existingBlog.image && existingBlog.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(process.cwd(), 'public', existingBlog.image);
                try {
                    await fs.unlink(oldImagePath);
                    console.log(`Deleted old image: ${oldImagePath}`);
                } catch (err) {
                    console.error(`Failed to delete old image: ${oldImagePath}`, err);
                    // Continue with update even if file deletion fails
                }
            }
        }

        const blog = await Blog.findOneAndUpdate({ id: parseInt(id) }, updatedData, {
            new: true,
            runValidators: true,
        });

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

        // Delete associated image if it exists
        if (deletedBlog.image && deletedBlog.image.startsWith('/uploads/')) {
            const imagePath = path.join(process.cwd(), 'public', deletedBlog.image);
            try {
                await fs.unlink(imagePath);
                console.log(`Deleted blog image: ${imagePath}`);
            } catch (err) {
                console.error(`Failed to delete blog image: ${imagePath}`, err);
            }
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
