import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
    try {
        await dbConnect();

        const dataFilePath = path.join(process.cwd(), 'data/blogs.json');

        let jsonData: any[] = [];
        try {
            const fileContent = await fs.readFile(dataFilePath, 'utf8');
            jsonData = JSON.parse(fileContent);
        } catch (error) {
            console.warn("No blogs.json found or failed to read.", error);
            return NextResponse.json({ message: 'No local data found to migrate.' });
        }

        if (jsonData.length === 0) {
            return NextResponse.json({ message: 'No data in blogs.json.' });
        }

        let migratedCount = 0;
        let skippedCount = 0;

        for (const blogData of jsonData) {
            // Check if blog with this ID already exists
            const exists = await Blog.findOne({ id: blogData.id });
            if (!exists) {
                await Blog.create(blogData);
                migratedCount++;
            } else {
                skippedCount++;
            }
        }

        return NextResponse.json({
            message: 'Migration complete',
            migrated: migratedCount,
            skipped: skippedCount
        });

    } catch (error) {
        console.error("Migration failed:", error);
        return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
    }
}
