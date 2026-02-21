import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
        }

        const uploadPromises = files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return new Promise<string>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'tarkai-blogs',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve((result as any).secure_url);
                    }
                ).end(buffer);
            });
        });

        const urls = await Promise.all(uploadPromises);
        return NextResponse.json({ urls }, { status: 201 });
    } catch (error) {
        console.error('Error uploading files:', error);
        return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
    }
}
