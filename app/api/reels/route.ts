import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const reels = await Reel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(reels);
  } catch (error) {
    console.error('Error fetching reels:', error);
    return NextResponse.json({ error: 'Failed to fetch reels' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const last = await Reel.findOne().sort({ id: -1 });
    const newId = last ? last.id + 1 : 1;

    const created = await Reel.create({ ...body, id: newId });
    revalidatePath('/');
    revalidatePath('/feed');
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating reel:', error);
    return NextResponse.json({ error: 'Failed to create reel' }, { status: 500 });
  }
}
