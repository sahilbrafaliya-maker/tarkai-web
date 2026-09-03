import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const reel = await Reel.findOne({ id: parseInt(id, 10) });
    if (!reel) return NextResponse.json({ error: 'Reel not found' }, { status: 404 });
    return NextResponse.json(reel);
  } catch (error) {
    console.error('Error fetching reel:', error);
    return NextResponse.json({ error: 'Failed to fetch reel' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const updated = await Reel.findOneAndUpdate({ id: parseInt(id, 10) }, body, { new: true });
    revalidatePath('/');
    revalidatePath('/feed');
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating reel:', error);
    return NextResponse.json({ error: 'Failed to update reel' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Reel.findOneAndDelete({ id: parseInt(id, 10) });
    revalidatePath('/');
    revalidatePath('/feed');
    return NextResponse.json({ message: 'Reel deleted successfully' });
  } catch (error) {
    console.error('Error deleting reel:', error);
    return NextResponse.json({ error: 'Failed to delete reel' }, { status: 500 });
  }
}
