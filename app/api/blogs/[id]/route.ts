import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';

// Helper to extract Cloudinary public ID from URL
const getPublicIdFromUrl = (url: string) => {
    try {
        const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
};

const deleteCloudinaryImage = async (url: string) => {
    if (url && url.includes('cloudinary')) {
        const publicId = getPublicIdFromUrl(url);
        if (publicId) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error(`Failed to delete Cloudinary image: ${publicId}`, err);
            }
        }
    }
};

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const updatedData = await request.json();

        const existingBlog = await Blog.findOne({ id: parseInt(id) });

        if (!existingBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Delete old coverImage if it changed
        if (updatedData.coverImage && updatedData.coverImage !== existingBlog.coverImage) {
            await deleteCloudinaryImage(existingBlog.coverImage);
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

        // Delete coverImage from Cloudinary
        if (deletedBlog.coverImage) {
            await deleteCloudinaryImage(deletedBlog.coverImage);
        }

        // Delete all gallery images from Cloudinary
        if (deletedBlog.images && deletedBlog.images.length > 0) {
            for (const imgUrl of deletedBlog.images) {
                await deleteCloudinaryImage(imgUrl);
            }
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
