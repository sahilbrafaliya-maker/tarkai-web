import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { promises as fs } from 'fs';
import path from 'path';
// Helper to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url: string) => {
    try {
        const parts = url.split('/');
        const filenameWithExt = parts[parts.length - 1];
        const publicId = filenameWithExt.split('.')[0];
        // If it's in a folder, we might need to handle that, but typically regular upload returns straight public_id in response.
        // However, secure_url includes folder path. 
        // Example: https://res.cloudinary.com/demo/image/upload/v1/tarkai-blogs/sample.jpg
        // We need 'tarkai-blogs/sample'

        // Better approach: regex to capture everything after 'upload/v<version>/' or 'upload/' until extension
        const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
};

import cloudinary from '@/lib/cloudinary';

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
            // Delete old image if it exists and is a Cloudinary image
            if (existingBlog.image && existingBlog.image.includes('cloudinary')) {
                const publicId = getPublicIdFromUrl(existingBlog.image);
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId);
                        console.log(`Deleted old Cloudinary image: ${publicId}`);
                    } catch (err) {
                        console.error(`Failed to delete old Cloudinary image: ${publicId}`, err);
                    }
                }
            } else if (existingBlog.image && existingBlog.image.startsWith('/uploads/')) {
                // Fallback for old local images
                const oldImagePath = path.join(process.cwd(), 'public', existingBlog.image);
                try {
                    await fs.unlink(oldImagePath);
                } catch (e) { }
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
        if (deletedBlog.image) {
            if (deletedBlog.image.includes('cloudinary')) {
                const publicId = getPublicIdFromUrl(deletedBlog.image);
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId);
                        console.log(`Deleted Cloudinary image: ${publicId}`);
                    } catch (err) {
                        console.error(`Failed to delete Cloudinary image: ${publicId}`, err);
                    }
                }
            } else if (deletedBlog.image.startsWith('/uploads/')) {
                // Fallback for old local images
                const imagePath = path.join(process.cwd(), 'public', deletedBlog.image);
                try {
                    await fs.unlink(imagePath);
                } catch (e) { }
            }
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
