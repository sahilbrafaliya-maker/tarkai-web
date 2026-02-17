import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '_' + file.name.replaceAll(' ', '_');
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        try {
            await writeFile(path.join(uploadDir, filename), buffer);
            return NextResponse.json({ url: `/uploads/${filename}` });
        } catch (error) {
            console.error("Error writing file", error);
            return NextResponse.json({ error: 'Failed to write file.' }, { status: 500 });
        }

    } catch (error) {
        console.error("Error handling upload", error);
        return NextResponse.json({ error: 'Failed to handle upload' }, { status: 500 });
    }
}
